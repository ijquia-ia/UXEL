'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Cpu, Rocket, Users, ArrowRight, CheckCircle, Terminal, Bot, Sparkles, CloudCog } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FadeInWhenVisible } from '@/components/ui/FadeInWhenVisible'

const serviceCategories = [
  {
    id: 'software-ia',
    number: '01',
    title: 'Desarrollo Full Stack & Productos Digitales',
    subtitle: 'WEB · BACKEND · APIs · BASES DE DATOS',
    description: 'Construyo sitios web, plataformas y aplicativos a la medida. Integro frontend, backend, bases de datos y APIs para convertir un proceso de negocio en un producto digital funcional.',
    outcome: 'Una solución conectada de punta a punta: interfaz, lógica de negocio, integraciones y mantenimiento técnico.',
    tags: ['SITIOS WEB', 'APLICACIONES WEB', 'BACKEND', 'API INTEGRATIONS'],
    color: 'cyan',
    icon: Cpu,
    demoType: 'ai-prompt'
  },
  {
    id: 'n8n-automations',
    number: '02',
    title: 'Automatización n8n, Bots & Mensajería IA',
    subtitle: 'GMAIL · WHATSAPP · TELEGRAM · SMS',
    description: 'Automatizamos la comunicación y operación de tu empresa con n8n e Inteligencia Artificial: bots inteligentes para WhatsApp y Telegram que contestan consultas 24/7, auto-respuesta y redacción de correos en Gmail, generación y envío automático de emails, y notificaciones por mensajes de texto (SMS).',
    outcome: 'Elimina tareas repetitivas de mensajería y correo, atendiendo a cada cliente en segundos con precisión.',
    tags: ['N8N WORKFLOWS', 'WHATSAPP BOTS', 'GMAIL AUTOMÁTICO', 'TELEGRAM BOTS', 'SMS ALERTS'],
    color: 'emerald',
    icon: Bot,
    demoType: 'n8n-preview'
  },
  {
    id: 'marca-b2b',
    number: '03',
    title: 'Estrategia de Marca & Posicionamiento B2B',
    subtitle: 'NARRATIVA · PITCH · DISEÑO DE SISTEMAS',
    description: 'Transformamos la forma en que tu empresa comunica su propuesta de valor. Creamos narrativas comerciales claras, decks de ventas de alto impacto y activos digitales.',
    outcome: 'Aumenta la tasa de cierre en reuniones comerciales y clarifica la diferenciación de mercado.',
    tags: ['BRAND STRATEGY', 'PITCH DECKS', 'UX WRITING', 'DESIGN SYSTEMS'],
    color: 'emerald',
    icon: Rocket,
    demoType: 'pitch-preview'
  },
  {
    id: 'cx-transformation',
    number: '04',
    title: 'Transformación de Experiencia (CX)',
    subtitle: 'JOURNEY MAPPING · TRIAGE · OPERACIÓN',
    description: 'Rediseñamos la experiencia de cliente de punta a punta. Diagnosticamos puntos de fricción y automatizamos el soporte sin perder la calidez humana.',
    outcome: 'Reduce tiempos de primera respuesta de horas a segundos manteniendo CSAT > 95%.',
    tags: ['CUSTOMER JOURNEY', 'TRIAGE AUTOMATIZADO', 'CSAT AUDITS', 'HELPDESK IA'],
    color: 'purple',
    icon: Users,
    demoType: 'cx-triage'
  }
]

export function Services() {
  const [activeTab, setActiveTab] = useState(0)
  const [promptText, setPromptText] = useState('Analizar lead entrante: Empresa SaaS de 50 empleados buscando automatizar soporte')
  const [aiOutput, setAiOutput] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const currentService = serviceCategories[activeTab]

  const handleTestAgent = () => {
    setIsProcessing(true)
    setAiOutput(null)
    setTimeout(() => {
      setAiOutput('✅ Lead Calificado [Score 94/100]: Empresa SaaS objetivo. Agendando reunión en Calendar & enviando propuesta personalizada.')
      setIsProcessing(false)
    }, 1200)
  }

  return (
    <section id="servicios" className="section-pad relative overflow-hidden bg-white border-b border-slate-200">
      {/* Background glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-emerald/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-[78rem] relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <FadeInWhenVisible delay={0}>
            <span className="eyebrow mb-3">01 / Rutas de Intervención</span>
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mt-2">
              Menos ruido. <span className="text-gradient-cyan">Sistemas que ejecutan.</span>
            </h2>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.15}>
            <p className="max-w-md text-sm text-slate-600 font-mono leading-relaxed">
              Desde la arquitectura de marca B2B hasta el código y los agentes de IA que operan en segundo plano.
            </p>
          </FadeInWhenVisible>
        </div>

        {/* Interactive Tab Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-10">
          {serviceCategories.map((service, index) => {
            const Icon = service.icon
            const isActive = activeTab === index
            return (
              <FadeInWhenVisible key={service.id} delay={0.1 + index * 0.1}>
                <button
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-4 p-5 rounded-2xl border text-left transition-all duration-300 w-full ${
                    isActive
                      ? 'glass-panel border-cyan-300 bg-white shadow-bright-glow'
                      : 'border-slate-200 bg-slate-50/60 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <div className={`p-3 rounded-xl ${isActive ? 'bg-cyan-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                    <Icon size={22} />
                  </div>
                  <div>
                    <span className="font-mono text-[11px] text-cyan-800 font-bold block">{service.number} / {service.subtitle.split('·')[0]}</span>
                    <span className={`font-display text-base font-bold block mt-0.5 ${isActive ? 'text-slate-900' : 'text-slate-700'}`}>
                      {service.title.split('&')[0]}
                    </span>
                  </div>
                </button>
              </FadeInWhenVisible>
            )
          })}
        </div>

        {/* Tab Detail & Live Interactive Demo Card */}
        <div
          className="glass-panel-interactive p-8 md:p-12 rounded-3xl border border-slate-200 bg-white shadow-pearl-shadow overflow-hidden"
          style={{ perspective: '1400px', perspectiveOrigin: 'center bottom' }}
        >
          <motion.div
            key={currentService.id}
            initial={{ opacity: 0, y: 44, scale: 0.94, rotateX: -12, z: -120, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0, z: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.68, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'center bottom', transformStyle: 'preserve-3d' }}
            className="grid lg:grid-cols-12 gap-8"
          >
            {/* Service Information */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 font-mono text-xs text-cyan-800 font-bold mb-4">
                  <Sparkles size={16} />
                  <span>{currentService.subtitle}</span>
                </div>

                <h3 className="font-display text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                  {currentService.title}
                </h3>

                <p className="mt-6 text-base text-slate-600 leading-relaxed font-body">
                  {currentService.description}
                </p>

                <div className="mt-8 p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200">
                  <div className="font-mono text-xs text-emerald-800 font-bold mb-1 flex items-center gap-2">
                    <CheckCircle size={16} /> RESULTADO CLAVE ENTREGABLE
                  </div>
                  <p className="text-sm font-mono text-slate-800">{currentService.outcome}</p>
                </div>
              </div>

              {/* Tags & Action */}
              <div className="mt-10 pt-6 border-t border-slate-200">
                <div className="flex flex-wrap gap-2 mb-6">
                  {currentService.tags.map((tag) => (
                    <span key={tag} className="font-mono text-[11px] font-bold tracking-wider px-3 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
                      {tag}
                    </span>
                  ))}
                </div>

                <a href="#contacto">
                  <Button className="bg-cyan-600 hover:bg-cyan-700 text-white font-mono text-xs font-bold px-6 py-3.5 rounded-xl transition-all shadow-bright-glow flex items-center gap-2">
                    Consultar esta Solución <ArrowRight size={16} />
                  </Button>
                </a>
              </div>
            </div>

            {/* Service Live Interactive Mini Demo */}
            <div className="lg:col-span-6 glass-panel p-6 rounded-2xl border border-slate-200 bg-slate-900 text-slate-100 flex flex-col justify-between shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-2 text-cyan-400 font-bold">
                  <Terminal size={15} /> DEMO INTERACTIVA EN TIEMPO REAL
                </span>
                <span className="text-emerald-400 font-bold">● MODULO ACTIVO</span>
              </div>

              {currentService.demoType === 'ai-prompt' && (
                <div className="my-6 space-y-4">
                  <label className="block text-xs font-mono text-slate-300">Prueba el Agente de Calificación de Leads UXEL:</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={promptText}
                      onChange={(e) => setPromptText(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-xs font-mono text-slate-100 focus:border-cyan-400 focus:outline-none"
                    />
                    <button
                      onClick={handleTestAgent}
                      disabled={isProcessing}
                      className="mt-3 w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-mono text-xs font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      {isProcessing ? <Sparkles size={14} className="animate-spin" /> : <Bot size={16} />}
                      {isProcessing ? 'Ejecutando Agente IA...' : 'Simular Calificación con IA'}
                    </button>
                  </div>

                  {aiOutput && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 font-mono text-xs text-emerald-400 leading-relaxed"
                    >
                      {aiOutput}
                    </motion.div>
                  )}
                </div>
              )}

              {currentService.demoType === 'pitch-preview' && (
                <div className="my-6 space-y-3 font-mono text-xs">
                  <p className="text-slate-400">Simulador de Pitch & Posicionamiento B2B:</p>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="text-slate-500">Antes: "Hacemos desarrollo de software y consultoría tecnológica"</div>
                    <div className="text-cyan-400 font-bold">Después (UXEL): "Diseñamos la señal de software que convierte fricciones operativas en automatizaciones de alto margen."</div>
                  </div>
                  <div className="p-3 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-[11px] text-center font-bold">
                    🚀 Aumento promedio del 40% en retención de propuesta comercial
                  </div>
                </div>
              )}

              {currentService.demoType === 'n8n-preview' && (
                <div className="my-6 space-y-3 font-mono text-xs">
                  <p className="text-slate-400">Canales e integraciones automatizadas con n8n:</p>
                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold">
                        <span>💬 WhatsApp & Telegram</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px]">BOT CONVERSACIONAL 24/7</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/30 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-cyan-400 font-bold">
                        <span>✉️ Gmail & Outlook</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px]">AUTO-RESPUESTA Y ENVÍO IA</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-purple-500/30 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-purple-400 font-bold">
                        <span>📱 Mensajería de Texto (SMS)</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px]">ALERTAS TRANSACCIONALES</span>
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-[11px] text-center font-bold">
                    ⚡ Flujos activos en producción con monitoreo en tiempo real
                  </div>
                </div>
              )}

              {currentService.demoType === 'cx-triage' && (
                <div className="my-6 space-y-3 font-mono text-xs">
                  <p className="text-slate-400">Ruteo Inteligente de Fricciones CX:</p>
                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/30 flex justify-between items-center">
                      <span className="text-slate-300">Ticket #8492: Falla de pago API</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">PRIORIDAD ALTA → DEV TEAM</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
                      <span className="text-slate-400">Ticket #8493: Consulta de plan</span>
                      <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 text-[10px] font-bold">AGENTE AUTO-RESPUESTA</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400 flex justify-between">
                <span>Web · Móvil · Escritorio · Cloud · IA</span>
                <span className="text-cyan-400 font-bold">UXEL Engine</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
