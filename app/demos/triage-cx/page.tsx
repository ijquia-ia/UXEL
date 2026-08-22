import { Metadata } from 'next'
import { TriageDemo } from '@/components/demos/TriageDemo'

export const metadata: Metadata = {
  title: 'Demo Triage de Soporte CX',
  description: 'Simulador de clasificación (Triage) de tickets de soporte con Inteligencia Artificial. Optimiza la experiencia del cliente priorizando urgencias.',
}
export default function TriagePage(){return <main className="min-h-screen px-6 py-10 md:px-10"><div className="mx-auto max-w-4xl"><a href="/" className="font-mono text-xs text-ink/60 hover:text-ink">← VOLVER A UXEL</a><p className="mt-14 font-mono text-sm text-emerald">DEMO / TRIAGE CX</p><h1 className="mt-4 font-display text-5xl font-bold tracking-tight">Priorización que no deja a nadie esperando.</h1><p className="mt-5 max-w-2xl leading-7 text-ink/70">Un panel ilustrativo para ordenar tickets según una señal de urgencia simulada.</p><p className="mt-8 border-l-2 border-cyan bg-secondary p-4 text-sm text-ink/70">Este cálculo es una simulación local ilustrativa; no es un sistema en producción.</p><TriageDemo/></div></main>}
