'use client'

import React from 'react'
import { Mail } from 'lucide-react'
import { motion } from 'framer-motion'

function WhatsAppIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.3z" />
    </svg>
  )
}

export function StickyDiagnosticCTA() {
  return (
    <div className="fixed bottom-6 right-5 sm:right-7 z-50 flex flex-col items-end gap-3 pointer-events-auto">
      {/* WhatsApp Floating Button */}
      <motion.a
        href="https://wa.me/573225850242"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp: +57 322 585 0242"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl shadow-emerald-500/30 transition-colors"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-white" />
        </span>
        <WhatsAppIcon className="w-7 h-7 fill-white" />

        {/* Tooltip on hover */}
        <span className="pointer-events-none absolute right-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 px-3 py-1.5 rounded-xl bg-slate-900/90 text-white font-mono text-xs font-semibold whitespace-nowrap shadow-md backdrop-blur-sm border border-white/10">
          WhatsApp · 322 585 0242
        </span>
      </motion.a>

      {/* Email Floating Button */}
      <motion.a
        href="mailto:IJQUIADEVO@GMAIL.COM"
        aria-label="Enviar correo a IJQUIADEVO@GMAIL.COM"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.3 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#0077b6] hover:bg-[#0096c7] text-white shadow-xl shadow-cyan-500/30 transition-colors"
      >
        <Mail className="w-6 h-6 text-white" />

        {/* Tooltip on hover */}
        <span className="pointer-events-none absolute right-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 px-3 py-1.5 rounded-xl bg-slate-900/90 text-white font-mono text-xs font-semibold whitespace-nowrap shadow-md backdrop-blur-sm border border-white/10">
          IJQUIADEVO@GMAIL.COM
        </span>
      </motion.a>
    </div>
  )
}
