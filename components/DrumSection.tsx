'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'

interface DrumSectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

/**
 * DrumSection — efecto cilindro multi-cara al hacer scroll.
 * En móvil (< 768px) se desactiva el efecto 3D para proteger el rendimiento.
 */
export function DrumSection({ children, className = '', id }: DrumSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 92%', 'end 8%'],
  })

  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    [-22, 0, 0, 22],
  )

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.78, 1],
    [0.15, 1, 1, 0.15],
  )

  const scale = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    [0.93, 1, 1, 0.93],
  )

  const blurRaw = useTransform(
    scrollYProgress,
    [0, 0.20, 0.80, 1],
    [6, 0, 0, 6],
  )
  const blurSmooth = useSpring(blurRaw, { stiffness: 120, damping: 22 })
  const filter = useTransform(blurSmooth, (v: number) => `blur(${v.toFixed(1)}px)`)

  const y = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    [24, 0, 0, -24],
  )

  // On mobile: no 3D effects, just render children directly
  if (isMobile) {
    return (
      <div id={id} ref={ref} className={`w-full ${className}`}>
        {children}
      </div>
    )
  }

  return (
    <div
      id={id}
      ref={ref}
      style={{ perspective: '900px', perspectiveOrigin: '50% 40%' }}
      className={`w-full ${className}`}
    >
      <motion.div
        style={{
          rotateX,
          opacity,
          scale,
          y,
          filter,
          transformOrigin: 'center top',
          transformStyle: 'preserve-3d',
          willChange: 'transform, opacity, filter',
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

