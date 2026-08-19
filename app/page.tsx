import { Navbar } from '@/components/Navbar'
import { StickyDiagnosticCTA } from '@/components/StickyDiagnosticCTA'
import { DrumSection } from '@/components/DrumSection'
import { CaseStudies } from '@/components/sections/CaseStudies'
import { Contact } from '@/components/sections/Contact'
import { DiagnosisPanel } from '@/components/sections/DiagnosisPanel'
import { FAQ } from '@/components/sections/FAQ'
import { Hero } from '@/components/sections/Hero'
import { Process } from '@/components/sections/Process'
import { RoiCalculator } from '@/components/sections/RoiCalculator'
import { Services } from '@/components/sections/Services'

export default function Home() {
  return (
    <div className="spacetime-page text-slate-900 dark:text-slate-100 min-h-screen selection:bg-cyan-100 selection:text-cyan-800 dark:selection:bg-cyan-900/40 dark:selection:text-cyan-300 transition-colors duration-500 relative z-10">
      <Navbar />
      <StickyDiagnosticCTA />
      <main>
        {/* Hero always full — no drum on first section */}
        <Hero />

        <DrumSection id="diagnostico">
          <DiagnosisPanel />
        </DrumSection>

        <DrumSection id="servicios">
          <Services />
        </DrumSection>

        <DrumSection id="roi">
          <RoiCalculator />
        </DrumSection>

        <DrumSection id="proceso">
          <Process />
        </DrumSection>

        <DrumSection id="casos">
          <CaseStudies />
        </DrumSection>

        <DrumSection id="faq">
          <FAQ />
        </DrumSection>

        <DrumSection id="contacto">
          <Contact />
        </DrumSection>
      </main>

      <footer className="spacetime-footer border-t border-slate-200 dark:border-white/[0.06] py-10 text-center font-mono text-xs text-slate-500 dark:text-slate-600 transition-colors duration-500">
        <div className="mx-auto max-w-[78rem] flex flex-col sm:flex-row items-center justify-between gap-4 px-6">
          <div className="font-display text-lg font-bold text-slate-900 dark:text-white">
            UXEL<span className="text-cyan-500">/</span>
          </div>
          <div>
            © {new Date().getFullYear()} UXEL · Software, Agentes IA & CX · Bogotá, Colombia
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-600 dark:text-slate-400 font-semibold text-[11px]">
            <a href="#inicio" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Inicio</a>
            <a href="#servicios" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Servicios</a>
            <a href="#contacto" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Contacto</a>
            <span className="text-slate-300 dark:text-white/20">·</span>
            <a href="/politica-de-privacidad" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Privacidad & Habeas Data</a>
            <a href="/terminos-y-condiciones" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">Términos</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
