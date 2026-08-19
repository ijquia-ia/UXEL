'use client'

import React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'

interface FadeInWhenVisibleProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  delay?: number
  yOffset?: number
  className?: string
}

export function FadeInWhenVisible({
  children,
  delay = 0,
  yOffset = 30,
  className = '',
  ...props
}: FadeInWhenVisibleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
