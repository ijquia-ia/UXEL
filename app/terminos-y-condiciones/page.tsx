import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Scale, CheckCircle2, ShieldAlert } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos y Condiciones de Uso | UXEL',
  description: 'Términos y condiciones para la prestación de servicios de software, automatizaciones n8n y agentes de IA de UXEL.',
}

export default function TerminosCondicionesPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#080808] text-slate-800 dark:text-slate-200 py-16 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:underline mb-8"
        >
          <ArrowLeft size={16} /> Volver al Inicio
        </Link>

        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0c0c0c] shadow-pearl-shadow space-y-8">
          <div className="border-b border-slate-200 dark:border-white/10 pb-6">
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-mono text-xs font-bold tracking-wider mb-2">
              <Scale size={18} /> MARCO CONTRACTUAL & SERVICIOS
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Términos y Condiciones de Servicio
            </h1>
            <p className="mt-2 text-xs font-mono text-slate-500 dark:text-slate-400">
              Vigente para Colombia y clientes corporativos en Latinoamérica
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
              1. Objeto y Alcance
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Los presentes términos regulan el acceso, navegación y contratación de servicios de consultoría, desarrollo de software a medida, automatización de flujos con n8n, integración de APIs y despliegue de Agentes de Inteligencia Artificial ofrecidos por <strong>UXEL</strong>.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
              2. Metodología de Trabajo y Entregables
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Los proyectos se ejecutan bajo metodología ágil estructurada por hitos técnicos verificables:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-slate-600 dark:text-slate-300 pl-2">
              <li><strong>Diagnóstico & Arquitectura:</strong> Definición de especificación técnica, modelos de datos y alcance cerrado.</li>
              <li><strong>Construcción & Validación:</strong> Desarrollo de código, configuración de pipelines n8n y pruebas de guardrails de IA.</li>
              <li><strong>Despliegue & Transferencia:</strong> Publicación en infraestructura cloud del cliente con documentación y garantía de soporte.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-500" /> 3. Confidencialidad y Propiedad Intelectual
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Toda la información operativa, bases de datos y credenciales proporcionadas por el cliente están amparadas por acuerdos de no divulgación (NDA). Una vez completado el pago del proyecto, los derechos patrimoniales sobre el software y automatizaciones desarrolladas a la medida se ceden en su totalidad al cliente.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldAlert size={18} className="text-purple-500" /> 4. Uso Responsable de Modelos de IA
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Los agentes de IA implementados cuentan con directivas de seguridad para mitigar errores y alucinaciones. No obstante, el cliente es responsable de definir los límites operacionales y la supervisión humana requerida para procesos críticos de negocio.
            </p>
          </section>

          <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-white/10">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
              5. Contacto Legal
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 font-mono text-xs">
              Para consultas contractuales o términos de servicio: <strong>IJQUIADEVO@GMAIL.COM</strong> · WhatsApp: <strong>+57 322 585 0242</strong>
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
