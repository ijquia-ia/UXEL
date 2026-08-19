'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Cookie, X } from 'lucide-react'
import Link from 'next/link'

export function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('uxel_cookie_consent')
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('uxel_cookie_consent', 'accepted')
    setShow(false)
  }

  const handleDecline = () => {
    localStorage.setItem('uxel_cookie_consent', 'declined')
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 25 }}
          className="fixed bottom-5 left-5 right-5 sm:left-6 sm:right-auto sm:max-w-md z-50 pointer-events-auto"
          role="dialog"
          aria-live="polite"
          aria-label="Aviso de privacidad y cookies"
        >
          <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#0c0c0c]/95 shadow-2xl backdrop-blur-xl space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5 text-cyan-700 dark:text-cyan-400 font-mono text-xs font-bold tracking-wider">
                <Cookie size={18} className="text-cyan-500 animate-spin-slow" />
                <span>PRIVACIDAD & COOKIES</span>
              </div>
              <button
                onClick={handleDecline}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                aria-label="Cerrar aviso"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 font-body leading-relaxed">
              Utilizamos cookies técnicas y analíticas para optimizar tu experiencia y brindarte soluciones a medida, conforme a la{' '}
              <strong className="text-slate-800 dark:text-white">Ley 1581 de 2012 (Habeas Data)</strong> y normativas de protección de datos en Latinoamérica.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-1">
              <Link
                href="/politica-de-privacidad"
                className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 underline underline-offset-4 hover:text-cyan-700 dark:hover:text-cyan-300 py-1"
              >
                Ver Política de Privacidad
              </Link>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleDecline}
                  className="px-3.5 py-2 rounded-xl text-[11px] font-mono font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors border border-slate-200 dark:border-white/10"
                >
                  Solo Necesarias
                </button>
                <button
                  onClick={handleAccept}
                  className="px-4 py-2 rounded-xl text-[11px] font-mono font-bold !bg-[#0077b6] hover:!bg-[#0096c7] text-white shadow-md shadow-cyan-500/20 transition-all flex items-center gap-1.5"
                >
                  <ShieldCheck size={14} />
                  Aceptar Todo
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
