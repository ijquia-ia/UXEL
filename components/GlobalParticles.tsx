'use client'

import { useEffect, useRef, useCallback, useState } from 'react'

/**
 * GlobalParticles — canvas fijo que cubre TODA la página siempre.
 * En móvil (< 768px) se desactiva completamente para no saturar la GPU.
 */
export function GlobalParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const [isMobile, setIsMobile] = useState(true) // default true to avoid flash

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const onMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
  }, [])

  useEffect(() => {
    if (isMobile) return // No particles on mobile

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let W = (canvas.width = window.innerWidth)
    let H = (canvas.height = window.innerHeight)

    const onResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouseMove)

    const PALETTE = [
      'rgba(0,180,216,',
      'rgba(16,185,129,',
      'rgba(124,58,237,',
      'rgba(0,119,182,',
      'rgba(5,150,105,',
    ]

    // Reduced particle count for better desktop performance
    const COUNT = 45
    const pts = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 1.2 + Math.random() * 2.5,
      vx: (Math.random() - 0.5) * 0.22,
      vy: -0.10 - Math.random() * 0.30,
      a: 0.18 + Math.random() * 0.42,
      c: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      ph: Math.random() * Math.PI * 2,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      const mx = mouseRef.current.x * W
      const my = mouseRef.current.y * H
      const gOrb = ctx.createRadialGradient(mx, my, 0, mx, my, 320)
      gOrb.addColorStop(0, 'rgba(0,180,216,0.07)')
      gOrb.addColorStop(0.6, 'rgba(124,58,237,0.03)')
      gOrb.addColorStop(1, 'transparent')
      ctx.fillStyle = gOrb
      ctx.fillRect(0, 0, W, H)

      pts.forEach((p) => {
        p.ph += 0.016
        p.x += p.vx + (mouseRef.current.x - 0.5) * 0.07
        p.y += p.vy

        if (p.y < -25) { p.y = H + 12; p.x = Math.random() * W }
        if (p.x < -25) p.x = W + 12
        if (p.x > W + 25) p.x = -12

        const alpha = p.a * (0.65 + 0.35 * Math.sin(p.ph))

        const gr = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4)
        gr.addColorStop(0, `${p.c}${(alpha * 0.9).toFixed(2)})`)
        gr.addColorStop(1, `${p.c}0)`)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2)
        ctx.fillStyle = gr
        ctx.fill()

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `${p.c}${Math.min(alpha * 1.6, 0.9).toFixed(2)})`
        ctx.fill()
      })

      // Reduced connection distance (80px instead of 105px) = fewer line calculations
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 80) {
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(0,180,216,${(0.06 * (1 - d / 80)).toFixed(3)})`
            ctx.lineWidth = 0.7
            ctx.stroke()
          }
        }
      }

      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [isMobile, onMouseMove])

  if (isMobile) return null

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
      aria-hidden="true"
    />
  )
}

