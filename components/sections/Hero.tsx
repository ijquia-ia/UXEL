'use client'

import { ArrowDownRight, Calendar, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { MagneticButton } from '@/components/ui/magnetic-button'

export function Hero() {
  return (
    <section id="inicio" className="hero-bright relative isolate min-h-[100dvh] overflow-hidden px-6 pb-0 pt-32 md:px-10 md:pt-40 border-b border-slate-200/60 dark:border-white/[0.06]">
      {/* Animated gradient mesh */}
      <div aria-hidden="true" className="hero-mesh absolute inset-0" />
      {/* Grid */}
      <div aria-hidden="true" className="hero-grid absolute inset-0" />
      {/* Shimmer streaks */}
      <div aria-hidden="true" className="hero-shimmer absolute inset-0" />
      <div className="relative mx-auto max-w-[78rem] pb-[220px]">
        <div className="pt-2">
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 dark:bg-cyan-900/25 border border-cyan-200 dark:border-cyan-700/40 text-cyan-800 dark:text-cyan-300 font-mono text-xs mb-6 shadow-sm">
              <Sparkles size={14} className="animate-spin-slow text-cyan-500" />
              <span className="font-bold">FULL STACK · WEB · MÓVIL · CLOUD · IA</span>
            </div>

            <h1 className="font-display text-[clamp(2.1rem,8vw,5.5rem)] font-extrabold leading-[1.05] md:leading-[0.94] tracking-tight">
              Software que convierte<br />
              ideas en <span className="text-gradient-cyan">productos reales.</span>
            </h1>

            <p className="mt-6 text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
              Desarrollo soluciones full stack: páginas web, aplicaciones empresariales, productos móviles y de escritorio, automatizaciones con n8n, agentes de IA e integraciones API. Del diseño y código al despliegue en la nube.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#contacto">
                <MagneticButton className="!bg-[#0077b6] hover:!bg-[#0096c7] text-white font-mono text-xs font-bold px-7 py-4 rounded-2xl flex items-center gap-3 transition-all shadow-lg shadow-cyan-500/25">
                  <Calendar size={18} />
                  Hablemos de tu proyecto
                </MagneticButton>
              </a>
              <a href="#casos" className="group inline-flex items-center gap-3 font-mono text-xs tracking-wider text-slate-700 dark:text-slate-300 hover:text-cyan-600 transition px-5 py-3.5 rounded-2xl border border-slate-200 dark:border-white/10 hover:border-cyan-300 bg-white/70 dark:bg-white/[0.04] backdrop-blur-md shadow-sm">
                EXPLORAR DEMOS EN VIVO
                <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-slate-100 dark:bg-white/10 transition group-hover:bg-cyan-600 group-hover:text-white">
                  <ArrowDownRight size={15} />
                </span>
              </a>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-6 border-t border-slate-200/80 dark:border-white/[0.06] pt-6">
              <div>
                <div className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">FULL STACK</div>
                <div className="font-mono text-[11px] text-slate-500 mt-1 font-semibold">WEB · BACKEND · APIs</div>
              </div>
              <div>
                <div className="font-display text-2xl md:text-3xl font-extrabold text-cyan-600 dark:text-cyan-400">MULTIPLATAFORMA</div>
                <div className="font-mono text-[11px] text-slate-500 mt-1 font-semibold">MÓVIL · ESCRITORIO</div>
              </div>
              <div>
                <div className="font-display text-2xl md:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">CLOUD</div>
                <div className="font-mono text-[11px] text-slate-500 mt-1 font-semibold">DESPLIEGUE Y SOPORTE</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  )
}
