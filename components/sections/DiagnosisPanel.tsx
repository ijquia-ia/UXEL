'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ArrowRight, CheckCircle2, RotateCcw, AlertTriangle, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FadeInWhenVisible } from '@/components/ui/FadeInWhenVisible'

type StepOption = {
  label: string
  points: number
  recommendation?: string
}

type Step = {
  id: number
  title: string
  subtitle: string
  options: StepOption[]
}

const steps: Step[] = [
  {
    id: 1,
    title: '¿Cuál es el mayor cuello de botella actual en tu empresa?',
    subtitle: 'Selecciona la fricción operacional con mayor impacto negativo',
    options: [
      { label: 'Calificación y respuesta lenta a Leads entrantes', points: 30, recommendation: 'Agente de IA Calificador + Ruteo a WhatsApp/CRM' },
      { label: 'Procesos manuales repetitivos en Excel o herramientas aisladas', points: 35, recommendation: 'Flujo de Automatización n8n + Integración API Custom' },
      { label: 'Fricción en atención al cliente / Soporte saturado', points: 25, recommendation: 'Triage de Tickets con Agente LLM para CX' },
      { label: 'Falta de claridad en propuesta de valor y pitch comercial B2B', points: 20, recommendation: 'Rediseño de Posicionamiento & Deck de Ventas' }
    ]
  },
  {
    id: 2,
    title: '¿Cuántas horas semanales estima que pierde su equipo en esta tarea?',
    subtitle: 'Cálculo del desperdicio de recursos humanos y tiempo operativo',
    options: [
      { label: 'Menos de 10 horas / semana', points: 15 },
      { label: 'Entre 10 y 30 horas / semana', points: 30 },
      { label: 'Más de 30 horas / semana (Crítico)', points: 45 }
    ]
  },
  {
    id: 3,
    title: '¿Cuál es su nivel de automatización actual?',
    subtitle: 'Nivel de madurez técnica del stack de herramientas',
    options: [
      { label: 'Totalmente manual (WhatsApp, Gmail, hojas de cálculo)', points: 40 },
      { label: 'Herramientas aisladas (CRM básico, sin integraciones)', points: 25 },
      { label: 'Intentos de automatización previa (Zapier o n8n básico)', points: 15 }
    ]
  }
]

export function DiagnosisPanel() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [selectedRecommendations, setSelectedRecommendations] = useState<string[]>([])
  const [isCompleted, setIsCompleted] = useState(false)

  const handleSelectOption = (points: number, recommendation?: string) => {
    const nextAnswers = [...answers, points]
    setAnswers(nextAnswers)

    if (recommendation) {
      setSelectedRecommendations([...selectedRecommendations, recommendation])
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsCompleted(true)
    }
  }

  const handleReset = () => {
    setCurrentStep(0)
    setAnswers([])
    setSelectedRecommendations([])
    setIsCompleted(false)
  }

  const totalScore = answers.reduce((a, b) => a + b, 0)
  const getFrictionLevel = (score: number) => {
    if (score >= 80) return { text: 'CRÍTICO · Intervención urgente requerida', color: 'text-red-700', bg: 'bg-red-50 border-red-200' }
    if (score >= 50) return { text: 'MODERADO · Oportunidad alta de automatización', color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' }
    return { text: 'OPTIMIZABLE · Ajustes puntuales recomendados', color: 'text-cyan-800', bg: 'bg-cyan-50 border-cyan-200' }
  }

  return (
    <section id="diagnostico" className="section-pad relative overflow-hidden bg-white border-b border-slate-200">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-[78rem] relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <FadeInWhenVisible delay={0}>
            <span className="eyebrow mb-3">00 / Diagnóstico Inteligente Express</span>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mt-2">
              Evaluador de <span className="text-gradient-cyan">Fricción Operacional.</span>
            </h2>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.15}>
            <p className="max-w-md text-sm text-slate-600 font-mono leading-relaxed">
              Responde 3 preguntas breves y nuestro motor generará un diagnóstico de fricción y la arquitectura sugerida para tu empresa.
            </p>
          </FadeInWhenVisible>
        </div>

        <FadeInWhenVisible delay={0.25} className="glass-panel-interactive p-8 md:p-12 rounded-3xl border border-slate-200 bg-white shadow-pearl-shadow">
          {!isCompleted ? (
            <div>
              {/* Progress Indicator */}
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 font-mono text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-cyan animate-pulse" />
                  <span className="font-bold text-slate-700">PASO 0{currentStep + 1} DE 03</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan to-emerald transition-all duration-300"
                      style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                    />
                  </div>
                  <span className="text-cyan-800 font-bold">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
                </div>
              </div>

              {/* Step Question */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={steps[currentStep].id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <h3 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">
                    {steps[currentStep].title}
                  </h3>
                  <p className="text-sm font-mono text-slate-500 mb-8">
                    {steps[currentStep].subtitle}
                  </p>

                  <div className="grid gap-4">
                    {steps[currentStep].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(option.points, option.recommendation)}
                        className="group flex items-center justify-between p-5 rounded-2xl border border-slate-200 bg-slate-50/70 text-left transition-all hover:border-cyan-400 hover:bg-cyan-50/50 hover:shadow-sm"
                      >
                        <span className="font-body text-base font-medium text-slate-800 group-hover:text-slate-950 transition-colors">
                          {option.label}
                        </span>
                        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-500 group-hover:bg-cyan-600 group-hover:text-white group-hover:border-cyan-600 transition-all">
                          <ChevronRight size={18} />
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          ) : (
            /* Results View */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 font-mono text-xs">
                <span className="text-emerald-700 font-bold flex items-center gap-2">
                  <CheckCircle2 size={16} /> DIAGNÓSTICO COMPLETADO
                </span>
                <button 
                  onClick={handleReset}
                  className="text-slate-500 hover:text-cyan-700 flex items-center gap-1 font-bold transition-colors"
                >
                  <RotateCcw size={14} /> Reiniciar Test
                </button>
              </div>

              <div className="grid md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-5 text-center md:text-left">
                  <span className="font-mono text-xs text-slate-500 font-bold block mb-1">ÍNDICE DE FRICCIÓN ESTIMADO</span>
                  <div className="font-display text-6xl md:text-7xl font-extrabold text-slate-900">
                    {totalScore}<span className="text-cyan-700 text-3xl font-mono">/100</span>
                  </div>
                  <div className={`mt-3 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-xs border ${getFrictionLevel(totalScore).bg} ${getFrictionLevel(totalScore).color} font-bold`}>
                    <AlertTriangle size={14} />
                    <span>{getFrictionLevel(totalScore).text}</span>
                  </div>
                </div>

                <div className="md:col-span-7 space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                  <h4 className="font-mono text-xs text-cyan-800 font-bold tracking-wider">
                    ARQUITECTURA DE SOLUCIÓN RECOMENDADA:
                  </h4>
                  <div className="space-y-2 font-mono text-sm text-slate-800">
                    {selectedRecommendations.length > 0 ? (
                      selectedRecommendations.map((rec, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 text-emerald-700 font-semibold">
                          <CheckCircle2 size={16} />
                          <span>{rec}</span>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center gap-2.5 text-emerald-700 font-semibold">
                        <CheckCircle2 size={16} />
                        <span>Orquestador n8n + Agente de Atención con IA</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 font-body leading-relaxed pt-2 border-t border-slate-200">
                    Tu empresa presenta un nivel significativo de fricción manual que puede ser automatizado en menos de 3 semanas.
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-display text-lg font-bold text-slate-900">¿Deseas validar esta hoja de ruta con un ingeniero?</h4>
                  <p className="text-xs font-mono text-slate-500">Reunión de 20 min sin costo para presentar el plan de implementación.</p>
                </div>
                <a href="#contacto">
                  <Button className="bg-cyan-600 hover:bg-cyan-700 text-white font-mono text-xs font-bold px-6 py-4 rounded-2xl transition-all shadow-bright-glow flex items-center gap-2 whitespace-nowrap">
                    Agendar Revisión Técnica <ArrowRight size={16} />
                  </Button>
                </a>
              </div>
            </motion.div>
          )}
        </FadeInWhenVisible>
      </div>
    </section>
  )
}
