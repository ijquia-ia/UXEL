'use client'

import { motion } from 'framer-motion'
import { BrainCircuit, Code2, Workflow, Cpu, ShieldCheck } from 'lucide-react'

const facts = [
  ['RESPALDO TÉCNICO', 'Politécnico Internacional · Tecnología en Desarrollo de Software'],
  ['EXPERIENCIA OPERACIONAL', 'Transformación digital de middle office & automatización B2B']
]

export function SocialProof() {
  return (
    <section className="border-y border-slate-200 bg-slate-50/80 px-6 py-10 md:px-10">
      <motion.div 
        initial={{ opacity: 0, y: 16 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }} 
        className="mx-auto grid max-w-[78rem] gap-8 md:grid-cols-3 md:items-center"
      >
        {facts.map(([label, text]) => (
          <div key={label} className="glass-panel p-5 rounded-2xl border border-slate-200 bg-white shadow-sm">
            <p className="font-mono text-xs text-cyan-800 font-bold tracking-wider flex items-center gap-2">
              <ShieldCheck size={15} /> {label}
            </p>
            <p className="mt-2 font-mono text-xs leading-relaxed text-slate-700">{text}</p>
          </div>
        ))}

        <div className="glass-panel p-5 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <p className="font-mono text-xs text-emerald-700 font-bold tracking-wider flex items-center gap-2">
            <Cpu size={15} /> STACK CORE & TECNOLOGÍAS
          </p>
          <div className="mt-3 flex items-center gap-4 text-cyan-800 font-bold">
            <div className="flex items-center gap-1.5 font-mono text-xs text-slate-800">
              <Code2 size={18} className="text-cyan" /> Three.js
            </div>
            <div className="flex items-center gap-1.5 font-mono text-xs text-slate-800">
              <Workflow size={18} className="text-emerald" /> n8n
            </div>
            <div className="flex items-center gap-1.5 font-mono text-xs text-slate-800">
              <BrainCircuit size={18} className="text-purple" /> Agentes IA
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
