'use client'

import { Component, type ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

class SpacetimeErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.warn('SpacetimeGrid fallback:', error)
  }

  render() {
    return this.state.hasError ? null : this.props.children
  }
}

const vertexShader = `
  uniform vec2 uMouse;
  uniform float uMass;
  uniform float uRadius;
  uniform float uTime;

  varying float vWell;
  varying float vWave;
  varying float vViscosity;
  varying vec2 vUv;

  void main() {
    vec3 pos = position;
    float dist = distance(position.xy, uMouse.xy);
    float pull = uMass / (1.0 + (dist * dist) / (uRadius * uRadius));
    pos.z -= pull;

    // The inverse quadratic above is the gravity well. These low-frequency
    // ripples make its edge read as a dense, moving fluid rather than a grid.
    float viscosity = 1.0 - smoothstep(uRadius * 0.45, uRadius * 1.55, dist);
    pos.z -= sin(dist * 2.6 - uTime * 2.1) * viscosity * 0.18;

    float ripple = sin(position.x * 0.5 + uTime) * 0.02
                 + sin(position.y * 0.5 + uTime * 0.8) * 0.02;
    pos.z += ripple;

    vWell = pull / uMass;
    vWave = ripple;
    vViscosity = viscosity;
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const liquidFragmentShader = `
  uniform float uTime;

  varying float vWell;
  varying float vWave;
  varying float vViscosity;
  varying vec2 vUv;

  void main() {
    float slowFlow = 0.5 + 0.5 * sin((vUv.x * 5.0 - vUv.y * 4.0) + uTime * 0.55 + vWave * 30.0);
    float caustic = pow(0.5 + 0.5 * sin(vUv.x * 17.0 + vUv.y * 11.0 - uTime * 0.8), 5.0);
    float well = smoothstep(0.08, 1.0, vWell);
    float rim = smoothstep(0.22, 0.58, vViscosity) * (1.0 - smoothstep(0.58, 0.96, vViscosity));
    vec3 fog = vec3(0.77, 0.84, 0.87);
    vec3 water = vec3(0.14, 0.48, 0.57);
    vec3 abyss = vec3(0.015, 0.10, 0.15);
    vec3 color = mix(fog, water, 0.18 + slowFlow * 0.20 + vViscosity * 0.20);
    color = mix(color, abyss, well * 0.76);
    color += vec3(0.20, 0.48, 0.53) * rim * 0.55;
    color += vec3(0.68, 0.95, 1.0) * caustic * (0.08 + vViscosity * 0.20);
    gl_FragColor = vec4(color, 0.20 + vViscosity * 0.36 + well * 0.28);
  }
`

const wireFragmentShader = `
  uniform float uTime;

  varying float vWell;
  varying vec2 vUv;

  void main() {
    float pulse = 0.5 + 0.5 * sin(uTime * 1.2 + vUv.x * 7.0);
    vec3 color = mix(vec3(0.10, 0.65, 0.78), vec3(0.20, 0.95, 1.0), vWell);
    gl_FragColor = vec4(color, 0.025 + vWell * 0.08 + pulse * 0.018);
  }
`

function LiquidSpacetimeSurface() {
  const { camera, raycaster } = useThree()
  const surfaceRef = useRef<THREE.Mesh>(null!)
  const pointerNdc = useRef(new THREE.Vector2())
  const targetMouse = useRef(new THREE.Vector2(0, 0))
  const currentMouse = useRef(new THREE.Vector2(0, 0))
  const [segments, setSegments] = useState(50)

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uMass: { value: 3.25 },
    uRadius: { value: 4.8 },
  }), [])

  useEffect(() => {
    const updateSegments = () => setSegments(window.innerWidth < 768 ? 30 : 50)
    updateSegments()
    window.addEventListener('resize', updateSegments)
    return () => window.removeEventListener('resize', updateSegments)
  }, [])

  useEffect(() => {
    const trackPointer = (event: PointerEvent) => {
      pointerNdc.current.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
      )
    }

    window.addEventListener('pointermove', trackPointer, { passive: true })
    return () => window.removeEventListener('pointermove', trackPointer)
  }, [])

  useFrame((state, delta) => {
    const surface = surfaceRef.current
    if (!surface) return

    // NDC is used only to raycast; uMouse receives real local plane coordinates.
    raycaster.setFromCamera(pointerNdc.current, camera)
    const hit = raycaster.intersectObject(surface, false)[0]
    if (hit) {
      const localPoint = surface.worldToLocal(hit.point.clone())
      targetMouse.current.set(localPoint.x, localPoint.y)
    }

    currentMouse.current.lerp(targetMouse.current, 1 - Math.pow(0.001, delta))
    uniforms.uMouse.value.copy(currentMouse.current)
    uniforms.uTime.value = state.clock.getElapsedTime()
  })

  const transform = {
    rotation: [-Math.PI / 2.65, 0, 0] as [number, number, number],
    position: [0, -2.1, -1.6] as [number, number, number],
  }

  return (
    <>
      <mesh ref={surfaceRef} {...transform}>
        <planeGeometry args={[30, 30, segments, segments]} />
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={liquidFragmentShader}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh {...transform} renderOrder={1}>
        <planeGeometry args={[30, 30, segments, segments]} />
        <shaderMaterial
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={wireFragmentShader}
          wireframe
          transparent
          depthWrite={false}
        />
      </mesh>
    </>
  )
}

export function SpacetimeGrid() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <SpacetimeErrorBoundary>
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <Canvas
          camera={{ position: [0, 1.15, 9], fov: 44 }}
          gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
          shadows={false}
          dpr={[1, 1.5]}
        >
          <LiquidSpacetimeSurface />
        </Canvas>
      </div>
    </SpacetimeErrorBoundary>
  )
}

export default SpacetimeGrid
