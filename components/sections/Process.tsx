'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Code2, Cpu, CheckCircle2, ShieldCheck } from 'lucide-react'
import { FadeInWhenVisible } from '@/components/ui/FadeInWhenVisible'

const processSteps = [
  {
    number: '01',
    badge: 'RIESGO: CERO',
    title: 'Diagnóstico & Auditoría',
    icon: Search,
    timeframe: 'Semana 1',
    summary: 'Auditoría profunda de procesos, datos e interacciones con el cliente.',
    details: 'Mapeamos los cuellos de botella exactos, evaluamos la preparación del stack técnico e identificamos las 3 intervenciones con mayor ROI inmediato.',
    deliverable: 'Mapa de Fricción & Hoja de Ruta de Arquitectura'
  },
  {
    number: '02',
    badge: 'COMPROMISO: BAJO',
    title: 'Diseño de Arquitectura',
    icon: Code2,
    timeframe: 'Semana 1-2',
    summary: 'Definición del alcance, integraciones y modelos de IA a desplegar.',
    details: 'Diseñamos la solución sin fricciones para tu equipo. Especificamos la infraestructura, APIs, promps y lógica de negocio con presupuesto fijo.',
    deliverable: 'Especificación Técnica & Prototipo Interactivo'
  },
  {
    number: '03',
    badge: 'EJECUCIÓN RÁPIDA',
    title: 'Construcción & Agentes',
    icon: Cpu,
    timeframe: 'Semana 2-3',
    summary: 'Desarrollo de software, configuración n8n y entrenamiento de Agentes.',
    details: 'Desarrollo ágil en sprints de 5 días. Conectamos bases de datos, entrenamos agentes LLM y configuramos alertas automáticas en tiempo real.',
    deliverable: 'Sistema de Software Desplegado & Agentes Operativos'
  },
  {
    number: '04',
    badge: 'ADOPCIÓN TOTAL',
    title: 'Despliegue & Optimización',
    icon: CheckCircle2,
    timeframe: 'Semana 4+',
    summary: 'Transferencia de conocimiento, monitoreo y acompañamiento.',
    details: 'Capacitamos a tu equipo, monitoreamos latencias y precisión de la IA, y ajustamos la operación para asegurar cero tiempo de inactividad.',
    deliverable: 'Manuales de Operación & Monitoreo 24/7'
  }
]

export function Process() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section id="proceso" className="section-pad relative overflow-hidden bg-slate-50/80 border-b border-slate-200">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-purple/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="mx-auto max-w-[78rem] relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <FadeInWhenVisible delay={0}>
            <span className="eyebrow mb-3">02 / Metodología de Ejecución</span>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mt-2">
              Proceso ágil. <span className="text-gradient-cyan">Cero fricción.</span>
            </h2>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.15}>
            <p className="max-w-md text-sm text-slate-600 font-mono leading-relaxed">
              Sin incertidumbre ni proyectos eternos: entregamos sistemas funcionales en ciclos iterativos de 3 a 4 semanas.
            </p>
          </FadeInWhenVisible>
        </div>

        {/* Step Selector Horizontal Timeline Bar */}
        <div className="relative mb-12">
          {/* Glowing connecting line */}
          <div className="absolute top-8 left-6 right-6 hidden md:block h-[2px] bg-slate-200">
            <motion.div 
              className="h-full bg-gradient-to-r from-cyan via-emerald to-purple"
              initial={{ width: '0%' }}
              animate={{ width: `${(activeStep / (processSteps.length - 1)) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
            {processSteps.map((step, index) => {
              const isActive = activeStep === index
              return (
                <FadeInWhenVisible key={step.number} delay={0.1 + index * 0.1}>
                  <button
                    onClick={() => setActiveStep(index)}
                    className={`w-full group flex flex-col p-6 rounded-3xl border text-left transition-all duration-300 ${
                      isActive
                        ? 'glass-panel border-cyan-300 bg-white shadow-bright-glow transform -translate-y-1'
                        : 'border-slate-200 bg-white/80 hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className={`flex h-10 w-10 items-center justify-center rounded-2xl font-mono text-xs font-bold transition-colors ${
                        isActive ? '!bg-[#0077b6] text-white shadow-sm' : 'bg-slate-100 text-slate-600 group-hover:text-cyan-700'
                      }`}>
                        {step.number}
                      </span>
                      <span className="font-mono text-[10px] text-emerald-700 font-bold tracking-wider">{step.timeframe}</span>
                    </div>

                    <span className="font-mono text-[10px] text-slate-400 font-bold block mb-1">{step.badge}</span>
                    <h3 className={`font-display text-lg font-bold ${isActive ? 'text-slate-900' : 'text-slate-700 group-hover:text-cyan-800'}`}>
                      {step.title}
                    </h3>
                  </button>
                </FadeInWhenVisible>
              )
            })}
          </div>
        </div>

        {/* Detailed Active Step View */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="glass-panel-interactive p-8 md:p-10 rounded-3xl border border-slate-200 bg-white shadow-pearl-shadow grid md:grid-cols-12 gap-8 items-center"
          >
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 font-mono text-xs font-bold">
                  FASE {processSteps[activeStep].number}
                </span>
                <span className="text-slate-500 font-mono text-xs font-semibold">Duración: {processSteps[activeStep].timeframe}</span>
              </div>

              <h3 className="font-display text-3xl font-extrabold text-slate-900">
                {processSteps[activeStep].title}
              </h3>

              <p className="text-base text-slate-600 font-body leading-relaxed">
                {processSteps[activeStep].details}
              </p>

              <div className="pt-4 flex items-center gap-2 text-emerald-700 font-mono text-xs font-bold">
                <ShieldCheck size={18} />
                <span>ENTREGABLE: {processSteps[activeStep].deliverable}</span>
              </div>
            </div>

            <div className="md:col-span-5 glass-panel p-6 rounded-2xl border border-slate-200 bg-slate-50 space-y-4">
              <h4 className="font-mono text-xs text-cyan-800 font-bold tracking-wider">¿QUÉ LOGRAMOS EN ESTA ETAPA?</h4>
              <p className="text-xs text-slate-600 font-body leading-relaxed">
                {processSteps[activeStep].summary}
              </p>
              <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-[11px] font-mono text-slate-500">
                <span>Garantía UXEL de Cumplimiento</span>
                <span className="text-emerald-700 font-bold">100% Validado</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
