'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'

interface DrumSectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

/**
 * DrumSection — efecto cilindro multi-cara al hacer scroll.
 *
 * Diseño:
 *  - Ángulo pequeño (±22°) simula un cilindro con MUCHAS caras (suave, circular).
 *  - La sección entrante empieza en 0 opacity + ligeramente borrosa y va apareciendo.
 *  - La sección saliente se desvanece (opacity 1→0) y se va difuminando.
 *  - El efecto combinado da la ilusión de un drum suave girando.
 */
export function DrumSection({ children, className = '', id }: DrumSectionProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    // Start: cuando la parte superior llega al 92% del viewport (justo antes de entrar)
    // End:   cuando la parte superior sale por el 8% del viewport (recién salió)
    offset: ['start 92%', 'end 8%'],
  })

  /* ─── Rotation ───────────────────────────────────────────────
     ±22° = cilindro con muchas caras (si fuera 60° parecería cuadrado).
     0–18%: entra girando desde detrás (abajo)
     18–82%: visible, plano
     82–100%: gira hacia atrás (arriba) y desaparece  */
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    [-22, 0, 0, 22],
  )

  /* ─── Opacity ────────────────────────────────────────────────
     Entra de 0→1 gradualmente, sale de 1→0 gradualmente.
     El fade es lo que hace que parezca que la cara del cilindro
     aparece desde "atrás" de la cara actual, no desde abajo. */
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.78, 1],
    [0.15, 1, 1, 0.15],
  )

  /* ─── Scale ──────────────────────────────────────────────────
     Pequeña reducción de escala al entrar/salir refuerza la
     sensación de que el objeto está "detrás" de la pantalla */
  const scale = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    [0.93, 1, 1, 0.93],
  )

  /* ─── Blur ───────────────────────────────────────────────────
     La cara entrante está un poco desenfocada y va aclarando.
     La saliente se vuelve borrosa al desaparecer.
     Esto refuerza la ilusión de profundidad del cilindro. */
  const blurRaw = useTransform(
    scrollYProgress,
    [0, 0.20, 0.80, 1],
    [6, 0, 0, 6],
  )
  // Suavizar el blur con spring para que no sea mecánico
  const blurSmooth = useSpring(blurRaw, { stiffness: 120, damping: 22 })
  const filter = useTransform(blurSmooth, (v: number) => `blur(${v.toFixed(1)}px)`)

  /* ─── Y translate ────────────────────────────────────────────
     Pequeño desplazamiento vertical complementa la rotación
     para dar mayor sensación de profundidad circular */
  const y = useTransform(
    scrollYProgress,
    [0, 0.18, 0.82, 1],
    [24, 0, 0, -24],
  )

  return (
    <div
      id={id}
      ref={ref}
      // perspective aquí → el hijo ve el espacio 3D desde este punto de vista
      // Un valor menor (900px) hace el efecto más pronunciado
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
