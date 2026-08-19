'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LetterConfig {
  char: string
  initialX: number
  initialY: number
  initialRotateX: number
  initialRotateY: number
  initialRotateZ: number
  delay: number
  color: string
}

const letters: LetterConfig[] = [
  {
    char: 'U',
    initialX: -180,
    initialY: -120,
    initialRotateX: 360,
    initialRotateY: 270,
    initialRotateZ: -180,
    delay: 0.1,
    color: 'from-cyan-400 to-blue-500',
  },
  {
    char: 'X',
    initialX: -60,
    initialY: 160,
    initialRotateX: -270,
    initialRotateY: 360,
    initialRotateZ: 210,
    delay: 0.25,
    color: 'from-cyan-300 to-emerald-400',
  },
  {
    char: 'E',
    initialX: 70,
    initialY: -150,
    initialRotateX: 290,
    initialRotateY: -270,
    initialRotateZ: -150,
    delay: 0.4,
    color: 'from-emerald-400 to-teal-500',
  },
  {
    char: 'L',
    initialX: 190,
    initialY: 130,
    initialRotateX: -360,
    initialRotateY: 320,
    initialRotateZ: 180,
    delay: 0.55,
    color: 'from-teal-300 to-cyan-400',
  },
]

export function BrandPreloader() {
  const [loading, setLoading] = useState(true)
  const [assembled, setAssembled] = useState(false)

  useEffect(() => {
    // Stage 1: Assembled letters
    const timerAssembled = setTimeout(() => {
      setAssembled(true)
    }, 1500)

    // Stage 2: Dismiss preloader
    const timerDismiss = setTimeout(() => {
      setLoading(false)
    }, 2500)

    return () => {
      clearTimeout(timerAssembled)
      clearTimeout(timerDismiss)
    }
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="brand-preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: 'blur(8px)',
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#06080d] text-white overflow-hidden select-none pointer-events-auto"
          style={{ perspective: 1200 }}
        >
          {/* Subtle Cyber Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f2fe08_1px,transparent_1px),linear-gradient(to_bottom,#00f2fe08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

          {/* Central Pulsing Glow Core */}
          <motion.div
            animate={{
              scale: assembled ? [1, 1.4, 1.1] : [0.8, 1, 0.8],
              opacity: assembled ? [0.6, 0.9, 0.7] : [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-cyan-500/20 via-emerald-500/15 to-transparent blur-[90px] pointer-events-none"
          />

          {/* 3D Kinetic Letters Assembling Stage */}
          <div className="relative flex items-center justify-center font-display font-black text-6xl sm:text-8xl md:text-9xl tracking-tight z-10">
            {letters.map((item) => (
              <motion.div
                key={item.char}
                initial={{
                  x: item.initialX,
                  y: item.initialY,
                  z: -300,
                  rotateX: item.initialRotateX,
                  rotateY: item.initialRotateY,
                  rotateZ: item.initialRotateZ,
                  opacity: 0,
                  scale: 0.3,
                }}
                animate={{
                  x: 0,
                  y: 0,
                  z: 0,
                  rotateX: 0,
                  rotateY: 0,
                  rotateZ: 0,
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  duration: 1.1,
                  delay: item.delay,
                  type: 'spring',
                  stiffness: 110,
                  damping: 14,
                }}
                className="relative inline-block px-1"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <span
                  className={`bg-gradient-to-b ${item.color} bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(0,180,216,0.5)]`}
                >
                  {item.char}
                </span>
              </motion.div>
            ))}

            {/* Neon Slash Character */}
            <motion.span
              initial={{ scaleY: 0, opacity: 0, rotate: -45 }}
              animate={{ scaleY: 1, opacity: 1, rotate: 0 }}
              transition={{ delay: 0.8, duration: 0.5, ease: 'easeOut' }}
              className="text-cyan-400 drop-shadow-[0_0_20px_rgba(0,242,254,0.8)] ml-1 text-5xl sm:text-7xl md:text-8xl"
            >
              /
            </motion.span>
          </div>

          {/* Subtitle & Loading Status */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-8 flex flex-col items-center gap-2 z-10 font-mono text-center"
          >
            <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 font-semibold tracking-widest uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
              <span>Tecnología que empieza por entender</span>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-slate-500 tracking-wider">
              <span>SOFTWARE</span>
              <span>·</span>
              <span>AGENTES IA</span>
              <span>·</span>
              <span>AUTOMATIZACIÓN</span>
            </div>

            {/* Micro Progress Bar */}
            <div className="w-40 sm:w-52 h-[2px] bg-slate-800 rounded-full mt-4 overflow-hidden relative">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full h-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
