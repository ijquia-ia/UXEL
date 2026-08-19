'use client'

import { motion } from 'framer-motion'
import { Accordion } from '@/components/ui/accordion'

const items = [
  {
    question: '¿Cuánto tiempo toma implementar una automatización o agente con UXEL?',
    answer: 'Nuestras iteraciones duran de 2 a 4 semanas. Un agente o flujo n8n puntual suele estar listo y desplegado en producción en 15 días.'
  },
  {
    question: '¿Cómo funciona la estructura de pagos?',
    answer: 'Trabajamos con esquema por hitos (50% al inicio y 50% tras la aprobación final y despliegue). Así garantizamos resultados medibles en cada etapa.'
  },
  {
    question: '¿Se firman acuerdos de confidencialidad (NDA)?',
    answer: 'Sí. Toda la información de tu empresa, datos operacionales, credenciales y lógica de negocio quedan protegidos bajo contratos de confidencialidad estrictos.'
  },
  {
    question: '¿Qué garantía tenemos sobre la precisión de los Agentes de IA?',
    answer: 'Auditamos y testeamos la IA antes de conectarla a clientes reales. Los agentes cuentan con barreras de seguridad (guardrails) para evitar alucinaciones.'
  }
]

import { FadeInWhenVisible } from '@/components/ui/FadeInWhenVisible'

export function FAQ() {
  return (
    <section id="faq" className="section-pad relative overflow-hidden bg-white border-b border-slate-200">
      {/* Background Glow */}
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="mx-auto max-w-[78rem] relative z-10">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <FadeInWhenVisible delay={0}>
            <span className="eyebrow mb-3">04 / Preguntas Frecuentes</span>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-slate-900 mt-2 leading-tight">
              Respuestas claras, <span className="text-gradient-cyan">sin rodeos.</span>
            </h2>
            <p className="mt-4 text-sm font-mono text-slate-600 leading-relaxed">
              Resolvemos tus dudas principales sobre implementación, costos, confidencialidad y tiempos de entrega.
            </p>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.2}>
            <Accordion items={items} />
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  )
}
