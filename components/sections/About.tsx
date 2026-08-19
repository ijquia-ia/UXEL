'use client'

import { ShieldCheck, Sparkles, Terminal, Code2, CloudCog, Smartphone } from 'lucide-react'
import { FadeInWhenVisible } from '@/components/ui/FadeInWhenVisible'

export function About() {
  return (
    <section id="nosotros" className="section-pad relative overflow-hidden bg-slate-50/80 border-b border-slate-200">
      {/* Glow background */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-80 h-80 bg-cyan/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-[78rem] relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <FadeInWhenVisible delay={0}>
            <span className="eyebrow mb-3">04 / Equipo & Criterio</span>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mt-2">
              Ingeniería que entiende la <span className="text-gradient-cyan">operación real.</span>
            </h2>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.15}>
            <p className="max-w-md text-sm text-slate-600 font-mono leading-relaxed">
              Desarrollo full stack con criterio operativo: desde una página web hasta una aplicación conectada, desplegada y lista para usar.
            </p>
          </FadeInWhenVisible>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <FadeInWhenVisible
            delay={0.1}
            className="glass-panel-interactive p-8 md:p-10 rounded-3xl border border-slate-200 bg-white shadow-pearl-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs text-cyan-800 font-bold tracking-wider flex items-center gap-2">
                  <Terminal size={16} /> DESARROLLADOR FULL STACK
                </span>
                <span className="px-3 py-1 rounded-full bg-cyan-50 text-cyan-800 font-mono text-[10px] border border-cyan-200 font-bold">
                  WEB · MÓVIL · CLOUD
                </span>
              </div>

              <h3 className="font-display text-3xl font-extrabold text-slate-900 mb-4">Isaias Quintero</h3>

              <p className="text-slate-600 font-body text-base leading-relaxed">
                Tecnólogo en Desarrollo de Software y Aplicaciones Móviles, próximo a graduarse del Politécnico Internacional. Diseña y desarrolla páginas web, aplicaciones, automatizaciones con n8n, integraciones API y agentes de IA. Su experiencia en transformación digital y atención al usuario conecta la tecnología con la operación real.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200 flex items-center gap-2 text-emerald-700 font-mono text-xs font-bold">
              <ShieldCheck size={16} />
              <span>Full stack · Automatización · Integraciones · IA</span>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible
            delay={0.25}
            className="glass-panel-interactive p-8 md:p-10 rounded-3xl border border-slate-200 bg-white shadow-pearl-shadow flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-xs text-emerald-800 font-bold tracking-wider flex items-center gap-2">
                  <Sparkles size={16} /> CAPACIDAD DE PRODUCTO
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-mono text-[10px] border border-emerald-200 font-bold">
                  DELIVERY END-TO-END
                </span>
              </div>

              <h3 className="font-display text-3xl font-extrabold text-slate-900 mb-4">De la idea a producción</h3>

              <p className="text-slate-600 font-body text-base leading-relaxed">
                El trabajo no termina en una interfaz. Cada solución puede incluir diseño web, lógica de negocio, APIs, automatización, una experiencia móvil o de escritorio y preparación para despliegue en la nube.
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200 flex items-center gap-2 text-cyan-800 font-mono text-xs font-bold">
              <ShieldCheck size={16} />
              <span>Web <Code2 size={14} /> Móvil <Smartphone size={14} /> Cloud <CloudCog size={14} /></span>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  )
}
