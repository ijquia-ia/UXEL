import React from 'react'
import Link from 'next/link'
import { ShieldCheck, ArrowLeft, Lock, FileText, CheckCircle2 } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Tratamiento de Datos Personales | UXEL',
  description: 'Política de Privacidad y Tratamiento de Datos Personales de UXEL, conforme a la Ley 1581 de 2012 y normativas de Latinoamérica.',
}

export default function PoliticaPrivacidadPage() {
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
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold tracking-wider mb-2">
              <ShieldCheck size={18} /> CUMPLIMIENTO LEY 1581 DE 2012 & HABEAS DATA
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Política de Tratamiento de Datos Personales
            </h1>
            <p className="mt-2 text-xs font-mono text-slate-500 dark:text-slate-400">
              Última actualización: Agosto {new Date().getFullYear()} · Aplicable para Colombia y Latinoamérica
            </p>
          </div>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Lock size={18} className="text-cyan-500" /> 1. Identificación del Responsable del Tratamiento
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <strong>UXEL</strong> (en adelante, &ldquo;La Empresa&rdquo;), con domicilio en Bogotá D.C., Colombia, y cobertura de servicios en Latinoamérica, es responsable del tratamiento de los datos personales recolectados a través de este portal web, formularios de contacto, demos interactivas y canales de mensajería (WhatsApp, correo electrónico).
            </p>
            <p className="text-sm font-mono text-xs text-slate-500 dark:text-slate-400">
              Canal de contacto oficial para Habeas Data: <strong>IJQUIADEVO@GMAIL.COM</strong> · WhatsApp: <strong>+57 322 585 0242</strong>
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText size={18} className="text-cyan-500" /> 2. Marco Legal y Ámbito de Aplicación
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              La presente política se rige por las disposiciones contenidas en la <strong>Ley Estatutaria 1581 de 2012</strong>, el <strong>Decreto Reglamentario 1377 de 2013</strong> de la República de Colombia, y los estándares iberoamericanos de protección de datos personales. Aplica a cualquier dato personal registrado en nuestras bases de datos en calidad de cliente, prospecto, aliado comercial o usuario de la plataforma.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 size={18} className="text-cyan-500" /> 3. Finalidades de la Recolección de Datos
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Los datos personales solicitados (nombre, empresa, correo electrónico, teléfono y requerimientos técnicos) serán tratados exclusivamente para:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-slate-600 dark:text-slate-300 pl-2">
              <li>Responder oportunamente a solicitudes de diagnóstico técnico, cotizaciones y propuestas comerciales.</li>
              <li>Coordinar reuniones estratégicas y demostraciones de software o automatizaciones con Agentes IA y n8n.</li>
              <li>Gestionar la relación contractual, técnica y de soporte de proyectos de software.</li>
              <li>Cumplir con acuerdos de confidencialidad (NDA) y obligaciones legales o tributarias aplicables.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck size={18} className="text-cyan-500" /> 4. Derechos del Titular (Derechos ARCO)
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Como titular de sus datos personales, usted tiene derecho en cualquier momento a:
            </p>
            <div className="grid sm:grid-cols-2 gap-3 pt-2 font-mono text-xs">
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03]">
                <strong className="text-cyan-700 dark:text-cyan-400 block mb-1">Conocer y Acceder:</strong>
                Solicitar prueba de la autorización otorgada y consultar los datos bajo tratamiento.
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03]">
                <strong className="text-emerald-700 dark:text-emerald-400 block mb-1">Actualizar y Rectificar:</strong>
                Modificar datos parciales, inexactos, incompletos o desactualizados.
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03]">
                <strong className="text-purple-700 dark:text-purple-400 block mb-1">Revocar y Suprimir:</strong>
                Solicitar la eliminación de sus datos cuando no exista deber legal o contractual de conservarlos.
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03]">
                <strong className="text-cyan-700 dark:text-cyan-400 block mb-1">Presentar Quejas:</strong>
                Acudir ante la Superintendencia de Industria y Comercio (SIC) de Colombia o autoridad competente en su país.
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
              5. Política de Cookies y Almacenamiento Local
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Nuestro sitio emplea cookies de sesión y almacenamiento local estrictamente necesarias para el funcionamiento del modo oscuro/claro, preferencias de usuario y análisis de navegación anónimo. En ningún caso comercializamos ni transferimos información de cookies a terceros no autorizados.
            </p>
          </section>

          <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-white/10">
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
              6. Procedimiento para Ejercer sus Derechos
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Para ejercer cualquiera de sus derechos de Habeas Data, envíe un correo electrónico a <strong>IJQUIADEVO@GMAIL.COM</strong> con el asunto &ldquo;Consulta / Reclamo Habeas Data&rdquo;, indicando su nombre completo, documento de identificación y descripción de la solicitud. Recibirá respuesta formal en un término máximo de 10 a 15 días hábiles.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
