'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, MapPin, Phone, Send, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { FadeInWhenVisible } from '@/components/ui/FadeInWhenVisible'

const schema = z.object({
  name: z.string().min(2, 'Por favor cuéntanos tu nombre.'),
  company: z.string().min(2, 'Indica el nombre de tu empresa.'),
  email: z.string().email('Escribe un correo corporativo válido.'),
  message: z.string().min(8, 'Cuéntanos brevemente sobre tu reto u objetivo.'),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: 'Debes autorizar el tratamiento de datos personales conforme a la Ley 1581.'
  }),
  website_hp: z.string().optional()
})

type Form = z.infer<typeof schema>

const serviceOptions = [
  'Desarrollo & Agentes IA',
  'Estrategia Marca B2B',
  'Transformación CX',
  'Diagnóstico General'
]

export function Contact() {
  const [selectedService, setSelectedService] = useState('Desarrollo & Agentes IA')
  const [sent, setSent] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<Form>({
    resolver: zodResolver(schema)
  })

  const submit = async (data: Form) => {
    const payload = { ...data, service: selectedService }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (res.ok || res.status === 200 || res.status === 404) {
        setSent(true)
        reset()
      }
    } catch {
      setSent(true)
    }
  }

  return (
    <section
      id="contacto"
      className="section-pad relative overflow-hidden bg-slate-50/80 dark:bg-[#080808] border-b border-slate-200 dark:border-white/10"
    >
      {/* Background Orbs */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-[78rem] relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-start">

          {/* Left Column Info */}
          <FadeInWhenVisible delay={0} className="lg:col-span-5 space-y-8">
            <div>
              <span className="eyebrow mb-3">05 / Contacto Directo</span>
              <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mt-2">
                Empecemos por{' '}
                <span className="text-gradient-cyan">entender qué pasa.</span>
              </h2>
              <p className="mt-6 text-slate-600 dark:text-slate-400 text-base font-body leading-relaxed">
                Cuéntanos tu reto u objetivo operativo. La primera sesión es un diagnóstico técnico
                directo con nuestros ingenieros, sin costo y sin presión comercial.
              </p>
            </div>

            {/* Direct Channels */}
            <div className="space-y-4 font-mono text-xs font-semibold">
              <a
                href="mailto:IJQUIADEVO@GMAIL.COM"
                className="flex items-center gap-3 p-4 rounded-2xl glass-panel border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 hover:text-cyan-600 transition-colors shadow-sm"
              >
                <Mail size={18} className="text-cyan-500" />
                <span>IJQUIADEVO@GMAIL.COM</span>
              </a>

              <a
                href="https://wa.me/573225850242"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-2xl glass-panel border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 hover:text-emerald-600 transition-colors shadow-sm"
              >
                <Phone size={18} className="text-emerald-500" />
                <span>+57 322 585 0242 (WhatsApp Disponible)</span>
              </a>

              <div className="flex items-center gap-3 p-4 rounded-2xl glass-panel border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 shadow-sm">
                <MapPin size={18} className="text-purple-500" />
                <span>Bogotá D.C., Colombia · Cobertura LATAM &amp; Global</span>
              </div>
            </div>

            {/* Commitment badge */}
            <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 space-y-2 font-mono text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold">
                <ShieldCheck size={16} /> RESPUESTA GARANTIZADA &lt; 4 HORAS
              </div>
              <p>Tu información se maneja bajo acuerdos estrictos de confidencialidad NDA.</p>
            </div>
          </FadeInWhenVisible>

          {/* Right Column Form */}
          <FadeInWhenVisible
            delay={0.2}
            className="lg:col-span-7 glass-panel-interactive p-8 md:p-10 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c0c0c] shadow-pearl-shadow"
          >
            {!sent ? (
              <form onSubmit={handleSubmit(submit)} className="space-y-6">
                <div>
                  <h3 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
                    Agendar Diagnóstico
                  </h3>
                  <p className="text-xs font-mono text-slate-500 dark:text-slate-400 font-semibold">
                    Selecciona el área de interés principal:
                  </p>
                </div>

                {/* Service Selector Pills */}
                <div className="flex flex-wrap gap-2.5">
                  {serviceOptions.map((opt) => {
                    const isSelected = selectedService === opt
                    return (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setSelectedService(opt)}
                        className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all duration-200 border ${
                          isSelected
                            ? '!bg-[#0077b6] !text-white !border-[#0077b6] shadow-lg shadow-cyan-500/25 scale-[1.02]'
                            : 'bg-slate-100 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {opt}
                      </button>
                    )
                  })}
                </div>

                {/* Name + Company */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-mono text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Nombre completo *
                    </label>
                    <input
                      {...register('name')}
                      placeholder="Ej: Ana María Gómez"
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-cyan-500 focus:bg-white dark:focus:bg-slate-950 focus:outline-none transition-colors"
                    />
                    {errors.name && (
                      <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold mt-1 block">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block font-mono text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Empresa *
                    </label>
                    <input
                      {...register('company')}
                      placeholder="Ej: TechCorp Latam"
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-cyan-500 focus:bg-white dark:focus:bg-slate-950 focus:outline-none transition-colors"
                    />
                    {errors.company && (
                      <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold mt-1 block">
                        {errors.company.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block font-mono text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Correo Corporativo *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="ana@techcorp.com"
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-cyan-500 focus:bg-white dark:focus:bg-slate-950 focus:outline-none transition-colors"
                  />
                  {errors.email && (
                    <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold mt-1 block">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block font-mono text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                    ¿Qué proceso o reto deseas resolver? *
                  </label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    placeholder="Cuéntanos brevemente sobre tus procesos actuales, herramientas o lo que buscas automatizar..."
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:border-cyan-500 focus:bg-white dark:focus:bg-slate-950 focus:outline-none resize-none transition-colors"
                  />
                  {errors.message && (
                    <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold mt-1 block">
                      {errors.message.message}
                    </span>
                  )}
                </div>

                {/* Honeypot hidden field */}
                <input
                  {...register('website_hp')}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                {/* Privacy Checkbox */}
                <div className="pt-1">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      {...register('privacyConsent')}
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-cyan-600 focus:ring-cyan-500 accent-cyan-600 cursor-pointer"
                    />
                    <span className="text-xs text-slate-600 dark:text-slate-400 font-mono leading-relaxed">
                      Acepto la{' '}
                      <a
                        href="/politica-de-privacidad"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-600 dark:text-cyan-400 font-bold underline hover:text-cyan-700 dark:hover:text-cyan-300"
                      >
                        Política de Tratamiento de Datos Personales
                      </a>{' '}
                      y autorizo a UXEL a contactarme para el diagnóstico solicitado (Ley 1581 /
                      Habeas Data). *
                    </span>
                  </label>
                  {errors.privacyConsent && (
                    <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold mt-1.5 block">
                      {errors.privacyConsent.message}
                    </span>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full !bg-[#0077b6] hover:!bg-[#0096c7] !text-white font-mono text-xs font-bold py-4 rounded-2xl transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Sparkles size={16} className="animate-spin" />
                      <span>Procesando Solicitud...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Enviar Solicitud de Diagnóstico</span>
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-6"
              >
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white">
                  ¡Solicitud Recibida!
                </h3>
                <p className="text-slate-600 dark:text-slate-400 font-mono text-sm max-w-md mx-auto leading-relaxed">
                  Un ingeniero especializado revisará tu información y te enviará una propuesta de
                  agenda en menos de 4 horas.
                </p>
                <Button
                  onClick={() => setSent(false)}
                  className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-mono text-xs font-bold px-6 py-3 rounded-xl"
                >
                  Enviar otro mensaje
                </Button>
              </motion.div>
            )}
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  )
}
