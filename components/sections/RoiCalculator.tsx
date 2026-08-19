'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Zap, TrendingUp, Clock, DollarSign, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

import { FadeInWhenVisible } from '@/components/ui/FadeInWhenVisible'

function formatNumber(val: number): string {
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function RoiCalculator() {
  const [teamSize, setTeamSize] = useState(12)
  const [hoursPerWeek, setHoursPerWeek] = useState(14)
  const [hourlyRate, setHourlyRate] = useState(25)

  // Calculations
  const weeklyHoursLost = teamSize * hoursPerWeek
  const yearlyHoursSaved = Math.round(weeklyHoursLost * 52 * 0.75) // 75% automation efficiency
  const yearlyMoneySaved = yearlyHoursSaved * hourlyRate
  const speedGain = Math.round((hoursPerWeek / (hoursPerWeek * 0.25)) * 100)

  return (
    <section id="roi" className="section-pad relative overflow-hidden bg-slate-50/80 border-y border-slate-200">
      {/* Ambient Orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-cyan/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-purple/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="mx-auto max-w-[78rem] relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <FadeInWhenVisible delay={0}>
            <span className="eyebrow mb-3">Calculadora de Impacto Operacional</span>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mt-2">
              Mide el costo real del <span className="text-gradient-cyan">trabajo manual.</span>
            </h2>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.15}>
            <p className="max-w-md text-sm text-slate-600 leading-relaxed font-mono">
              Ajusta las variables de tu equipo y simula cuánto tiempo y presupuesto recuperas implementando agentes e integraciones de UXEL.
            </p>
          </FadeInWhenVisible>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Controls Column */}
          <FadeInWhenVisible delay={0.2} className="lg:col-span-6 glass-panel-interactive p-8 md:p-10 rounded-3xl border border-slate-200 bg-white">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
              <Calculator className="text-cyan w-6 h-6" />
              <h3 className="font-display text-xl font-bold text-slate-900">Parámetros de Operación</h3>
            </div>

            {/* Slider 1: Team Size */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3 font-mono text-sm">
                <span className="text-slate-700 font-medium">Integrantes en el equipo</span>
                <span className="text-cyan-800 font-bold text-base px-3.5 py-1 bg-cyan-50 rounded-xl border border-cyan-200">{teamSize} personas</span>
              </div>
              <input 
                type="range" 
                min="3" 
                max="100" 
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1.5">
                <span>3 pers</span>
                <span>50 pers</span>
                <span>100 pers</span>
              </div>
            </div>

            {/* Slider 2: Hours/Week per person */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3 font-mono text-sm">
                <span className="text-slate-700 font-medium">Horas repetitivas / semana por persona</span>
                <span className="text-emerald-800 font-bold text-base px-3.5 py-1 bg-emerald-50 rounded-xl border border-emerald-200">{hoursPerWeek}h / semana</span>
              </div>
              <input 
                type="range" 
                min="2" 
                max="25" 
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1.5">
                <span>2 hrs (Bajo)</span>
                <span>12 hrs (Medio)</span>
                <span>25 hrs (Crítico)</span>
              </div>
            </div>

            {/* Slider 3: Hourly Rate */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3 font-mono text-sm">
                <span className="text-slate-700 font-medium">Costo promedio por hora (USD)</span>
                <span className="text-purple-800 font-bold text-base px-3.5 py-1 bg-purple-50 rounded-xl border border-purple-200">${hourlyRate} / h</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="120" 
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1.5">
                <span>$10/h</span>
                <span>$60/h</span>
                <span>$120/h</span>
              </div>
            </div>
          </FadeInWhenVisible>

          {/* Live Results Column */}
          <FadeInWhenVisible delay={0.3} className="lg:col-span-6 flex flex-col gap-6">
            <div className="glass-panel p-8 rounded-3xl border border-emerald-200 relative overflow-hidden bg-gradient-to-br from-white to-emerald-50/50 shadow-pearl-shadow">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <TrendingUp className="w-32 h-32 text-emerald-600" />
              </div>
              
              <div className="flex items-center gap-2 text-emerald-700 font-mono text-xs font-bold tracking-wider mb-2">
                <Clock className="w-4 h-4" /> RECAPTURABLE ANUALMENTE
              </div>
              <div className="font-display text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
                {formatNumber(yearlyHoursSaved)} <span className="text-emerald-700 text-2xl md:text-3xl font-mono">horas / año</span>
              </div>
              <p className="text-xs font-mono text-slate-600 mt-2 leading-relaxed">
                Equivalente a recuperar el trabajo a tiempo completo de <span className="text-slate-900 font-bold">{Math.round((yearlyHoursSaved / 1920) * 10) / 10} personas</span> dedicadas solo a crear valor estratégico.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="glass-panel p-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center gap-2 text-cyan-700 font-mono text-xs font-bold tracking-wider mb-1">
                  <DollarSign className="w-4 h-4" /> RETORNO FINANCIERO EST.
                </div>
                <div className="font-display text-3xl font-bold text-slate-900">
                  ${formatNumber(yearlyMoneySaved)} <span className="text-cyan-700 text-sm font-mono">USD</span>
                </div>
                <p className="text-[11px] font-mono text-slate-500 mt-1">Ahorro operacional neto anual</p>
              </div>

              <div className="glass-panel p-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center gap-2 text-purple-700 font-mono text-xs font-bold tracking-wider mb-1">
                  <Zap className="w-4 h-4" /> VELOCIDAD DE EJECUCIÓN
                </div>
                <div className="font-display text-3xl font-bold text-slate-900">
                  +{speedGain}%
                </div>
                <p className="text-[11px] font-mono text-slate-500 mt-1">Reducción del tiempo de ciclo</p>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-slate-200 bg-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div>
                <p className="font-display text-base font-bold text-slate-900">¿Listo para automatizar estas fricciones?</p>
                <p className="text-xs text-slate-500 font-mono">Construimos la arquitectura adaptada a tu Stack en 3 semanas.</p>
              </div>
              <a href="#contacto">
                <Button className="bg-cyan-600 hover:bg-cyan-700 text-white font-mono text-xs font-bold px-5 py-3 rounded-xl transition-all shadow-bright-glow flex items-center gap-2 whitespace-nowrap">
                  Obtener Hoja de Ruta <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  )
}
