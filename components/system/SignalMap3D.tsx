'use client'

import React, { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

// 1. Natural Ocean Wave Surface (Thick Glossy Waves reacting to cursor)
function NaturalOceanWaves() {
  const meshRef = useRef<THREE.Mesh>(null!)

  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(16, 16, 64, 64)
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    const time = state.clock.getElapsedTime()
    const posAttr = meshRef.current.geometry.attributes.position
    const pointerX = state.pointer.x * 3.0
    const pointerY = state.pointer.y * 3.0

    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i)
      const y = posAttr.getY(i)

      // Multi-frequency ocean wave displacement
      const wave1 = Math.sin(x * 0.5 + time * 1.2) * 0.25
      const wave2 = Math.cos(y * 0.6 + time * 0.9) * 0.25
      const wave3 = Math.sin((x + y) * 0.35 + time * 1.5) * 0.16

      // Interactive mouse ripple
      const dist = Math.sqrt((x - pointerX) ** 2 + (y - pointerY) ** 2)
      const mouseRipple = Math.sin(dist * 2.2 - time * 2.8) * Math.exp(-dist * 0.3) * 0.32

      posAttr.setZ(i, wave1 + wave2 + wave3 + mouseRipple)
    }

    posAttr.needsUpdate = true
    meshRef.current.geometry.computeVertexNormals()
  })

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2.7, 0, 0]} position={[0, -2.0, -1]}>
      <meshPhysicalMaterial
        color="#f8fafc"
        emissive="#00b4d8"
        emissiveIntensity={0.15}
        roughness={0.08}
        metalness={0.1}
        clearcoat={1.0}
        clearcoatRoughness={0.05}
        reflectivity={0.95}
      />
    </mesh>
  )
}

// 2. Interactive Node Sphere (Reacting to cursor + scroll)
interface NodeProps {
  position: [number, number, number]
  label: string
  subLabel: string
  color: string
  emissiveColor: string
  targetPos: [number, number, number]
}

function InteractiveNode({ position, label, subLabel, color, emissiveColor, targetPos }: NodeProps) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const groupRef = useRef<THREE.Group>(null!)
  const [hovered, setHovered] = useState(false)
  const targetScale = hovered ? 1.4 : 1.0

  useFrame((state, delta) => {
    if (!meshRef.current || !groupRef.current) return

    // Smooth hover scale interpolation
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 9)

    // Cursor magnetic pull response
    const targetX = position[0] + state.pointer.x * 0.3
    const targetY = position[1] + state.pointer.y * 0.3
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.05)
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.05)
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Node Sphere */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={emissiveColor}
          emissiveIntensity={hovered ? 3.0 : 1.2}
          roughness={0.15}
          metalness={0.7}
        />
      </mesh>

      {/* Glowing Outer Ring */}
      <mesh>
        <ringGeometry args={[0.55, 0.62, 32]} />
        <meshBasicMaterial color={emissiveColor} transparent opacity={hovered ? 0.9 : 0.4} side={THREE.DoubleSide} />
      </mesh>

      {/* Floating 3D Text Label */}
      <Text
        position={[0, 0.78, 0]}
        fontSize={0.25}
        color="#0f172a"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
      <Text
        position={[0, 0.54, 0]}
        fontSize={0.13}
        color="#00b4d8"
        anchorX="center"
        anchorY="middle"
      >
        {subLabel}
      </Text>

      {/* Data Connection Line */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            itemSize={3}
            array={new Float32Array([0, 0, 0, targetPos[0] - position[0], targetPos[1] - position[1], targetPos[2] - position[2]])}
          />
        </bufferGeometry>
        <lineDashedMaterial color="#00b4d8" dashSize={0.2} gapSize={0.1} transparent opacity={0.6} />
      </line>
    </group>
  )
}

// 3. Central Priority Core (Oscillating & Cursor Reactive)
function CentralPriorityCore({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null!)
  const outerRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!groupRef.current || !outerRef.current) return
    const time = state.clock.getElapsedTime()

    // Harmonic Y oscillation + subtle mouse tracking
    const targetY = position[1] + Math.sin(time * 2.2) * 0.25 + state.pointer.y * 0.2
    const targetX = position[0] + state.pointer.x * 0.2
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.08)
    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, 0.08)

    // Outer wireframe rotation
    outerRef.current.rotation.x = time * 0.6
    outerRef.current.rotation.y = time * 0.9
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Inner Glowing Nucleus */}
      <mesh>
        <sphereGeometry args={[0.58, 32, 32]} />
        <meshStandardMaterial
          color="#00b4d8"
          emissive="#00e5ff"
          emissiveIntensity={2.2}
          roughness={0.1}
        />
      </mesh>

      {/* Outer Rotating Wireframe Frame */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[0.86, 1]} />
        <meshStandardMaterial
          color="#0f172a"
          emissive="#00b4d8"
          emissiveIntensity={0.8}
          wireframe
        />
      </mesh>

      <Text
        position={[0, 1.15, 0]}
        fontSize={0.28}
        color="#0f172a"
        anchorX="center"
        anchorY="middle"
      >
        PRIORIDAD
      </Text>
      <Text
        position={[0, 0.92, 0]}
        fontSize={0.14}
        color="#059669"
        anchorX="center"
        anchorY="middle"
      >
        ● NÚCLEO DE DIAGNÓSTICO
      </Text>
    </group>
  )
}

// 4. Dynamic Particle Stream (Responding to mouse position & scrolling)
function ParticleStream({ count = 90 }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const radius = 2.5 + Math.random() * 2.5
      const angle = Math.random() * Math.PI * 2
      pos[i * 3] = Math.cos(angle) * radius
      pos[i * 3 + 1] = Math.sin(angle) * radius
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.5
    }
    return [pos]
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    const posAttr = pointsRef.current.geometry.attributes.position
    const mx = state.pointer.x * 0.15
    const my = state.pointer.y * 0.15

    for (let i = 0; i < count; i++) {
      let x = posAttr.getX(i)
      let y = posAttr.getY(i)

      // Move particle towards center (0,0) with mouse influence
      x = (x + mx) * 0.984
      y = (y + my) * 0.984

      // Reset when particle arrives at center
      if (Math.abs(x) < 0.12 && Math.abs(y) < 0.12) {
        const radius = 3.2 + Math.random() * 1.5
        const angle = Math.random() * Math.PI * 2
        x = Math.cos(angle) * radius
        y = Math.sin(angle) * radius
      }

      posAttr.setX(i, x)
      posAttr.setY(i, y)
    }
    posAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.09}
        color="#00e5ff"
        transparent
        opacity={0.85}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// 5. Parallax Scene Wrapper with Scroll & Mouse Parallax
function ParallaxScene() {
  const sceneRef = useRef<THREE.Group>(null!)
  const centralPos: [number, number, number] = [0, 0, 0]

  useFrame((state) => {
    if (!sceneRef.current) return

    // Scroll progress influence (reads window scroll position)
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0
    const scrollOffset = Math.min(scrollY / 600, 1)

    // Combined Mouse + Scroll parallax tilt
    const targetX = -state.pointer.y * 0.28 + scrollOffset * 0.15
    const targetY = state.pointer.x * 0.28 + scrollOffset * 0.2
    sceneRef.current.rotation.x = THREE.MathUtils.lerp(sceneRef.current.rotation.x, targetX, 0.07)
    sceneRef.current.rotation.y = THREE.MathUtils.lerp(sceneRef.current.rotation.y, targetY, 0.07)
  })

  return (
    <group ref={sceneRef}>
      <NaturalOceanWaves />

      <InteractiveNode
        position={[-3.0, 1.6, 0.4]}
        label="VENTAS"
        subLabel="Señal Lead B2B"
        color="#00b4d8"
        emissiveColor="#00e5ff"
        targetPos={centralPos}
      />
      <InteractiveNode
        position={[3.0, 1.6, 0.4]}
        label="OPERACIÓN"
        subLabel="Workflows n8n"
        color="#10b981"
        emissiveColor="#00ff87"
        targetPos={centralPos}
      />
      <InteractiveNode
        position={[-3.0, -1.4, 0.4]}
        label="CX"
        subLabel="Triage Soporte"
        color="#7c3aed"
        emissiveColor="#a855f7"
        targetPos={centralPos}
      />
      <InteractiveNode
        position={[3.0, -1.4, 0.4]}
        label="SISTEMAS"
        subLabel="Agentes IA"
        color="#0077b6"
        emissiveColor="#00b4d8"
        targetPos={centralPos}
      />

      <CentralPriorityCore position={centralPos} />
      <ParticleStream count={95} />
    </group>
  )
}

export function SignalMap3D() {
  return (
    <div className="w-full h-[450px] md:h-[550px] relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] dark:from-[#09090e] dark:via-[#0c0c14] dark:to-[#050508] border border-slate-200 dark:border-white/10 shadow-2xl shadow-cyan-500/10">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Lighting for glossy 3D depth */}
        <ambientLight intensity={1.4} />
        <directionalLight position={[10, 15, 10]} intensity={2.0} color="#ffffff" castShadow />
        <pointLight position={[-10, -10, 5]} intensity={1.5} color="#00e5ff" />
        <pointLight position={[10, 10, 5]} intensity={1.2} color="#10b981" />

        <ParallaxScene />
      </Canvas>

      {/* Overlay caption */}
      <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 pointer-events-none">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
          ESCENA 3D EN TIEMPO REAL · REACCIONA AL SCROLL & CURSOR
        </span>
        <span className="hidden sm:inline">Pasa el cursor sobre las esferas o mueve el ratón</span>
      </div>
    </div>
  )
}
