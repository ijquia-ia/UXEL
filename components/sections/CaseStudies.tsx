'use client'

import { ArrowUpRight, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { FadeInWhenVisible } from '@/components/ui/FadeInWhenVisible'

const demonstrations = [
  {
    type: 'DEMO INTERACTIVA / Lógica de Ventas B2B',
    badge: 'AGENTE IA',
    title: 'Calificador Inteligente de Leads & Enrutador CRM',
    metric: 'TIEMPO DE RESPUESTA: 24h → 45 segundos',
    copy: 'Visualiza cómo clasificamos automáticamente el tamaño del cliente, presupuesto e intención para direccionar la oportunidad al vendedor correcto al instante.',
    href: '/demos/calificador-leads',
    action: 'Lanzar Calificador de Leads',
    tags: ['Next.js', 'OpenAI', 'Slack API', 'HubSpot']
  },
  {
    type: 'DEMO INTERACTIVA / Soporte & CX Operacional',
    badge: 'TRIAGE AUTÓNOMO',
    title: 'Sistema de Triage & Priorización de Soporte CX',
    metric: 'TIEMPO DE RESOLUCIÓN: -65%',
    copy: 'Explora un motor ilustrativo que analiza urgencia, sentimiento y valor del cliente para resolver tickets rutinarios sin intervención humana.',
    href: '/demos/triage-cx',
    action: 'Lanzar Consola de Triage CX',
    tags: ['n8n', 'Zendesk', 'Claude 3.5', 'Webhooks']
  }
] as const

export function CaseStudies() {
  return (
    <section id="casos" className="section-pad relative overflow-hidden bg-white border-b border-slate-200">
      {/* Glow background */}
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="mx-auto max-w-[78rem] relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <FadeInWhenVisible delay={0}>
            <span className="eyebrow mb-3">03 / Pruebas de Capacidad Técnica</span>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mt-2">
              Prueba el criterio antes de <span className="text-gradient-cyan">solicitar propuesta.</span>
            </h2>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.15}>
            <p className="max-w-md text-sm text-slate-600 font-mono leading-relaxed">
              Demostraciones interactivas en vivo que ilustran la arquitectura y precisión de nuestros agentes y sistemas.
            </p>
          </FadeInWhenVisible>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {demonstrations.map((demo, index) => (
            <FadeInWhenVisible
              key={demo.href}
              delay={0.1 + index * 0.15}
              className="group glass-panel-interactive p-8 md:p-10 rounded-3xl border border-slate-200 bg-white shadow-pearl-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-6">
                  <span className="font-mono text-xs text-cyan-800 font-bold tracking-wider">{demo.type}</span>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-[10px] font-bold">
                    {demo.badge}
                  </span>
                </div>

                <h3 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 group-hover:text-cyan-700 transition-colors leading-tight">
                  {demo.title}
                </h3>

                <div className="mt-6 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200">
                  <span className="font-mono text-xs font-bold text-emerald-800 flex items-center gap-2">
                    <Zap size={15} /> IMPULSO MEDIBLE: {demo.metric}
                  </span>
                </div>

                <p className="mt-5 text-sm text-slate-600 font-body leading-relaxed">
                  {demo.copy}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {demo.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[10px] font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 border border-slate-200">
                      {tag}
                    </span>
                  ))}
                </div>

                <a href={demo.href}>
                  <Button className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-700 text-white font-mono text-xs font-bold px-5 py-3 rounded-xl transition-all shadow-bright-glow flex items-center justify-center gap-2">
                    {demo.action} <ArrowUpRight size={16} />
                  </Button>
                </a>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  )
}
