'use client'

import { Menu, X, Sparkles, Moon, Sun } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/ThemeProvider'


const links = [
  ['Servicios', '#servicios'],
  ['Calculadora ROI', '#roi'],
  ['Proceso', '#proceso'],
  ['Casos', '#casos'],
  ['FAQ', '#faq']
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggle } = useTheme()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed left-0 right-0 top-0 z-50 transition-all duration-300">
      {/* Scroll progress bar with glowing neon aura */}
      <motion.div 
        className="h-[3.5px] bg-gradient-to-r from-cyan-500 via-emerald-400 to-purple-500 shadow-[0_0_12px_rgba(0,180,216,0.8)] origin-left z-50"
        style={{ scaleX }}
      />

      <div className={`px-4 py-3 md:px-8 transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}>
        <nav className={`mx-auto flex max-w-[78rem] items-center justify-between rounded-2xl transition-all duration-300 ${
          scrolled 
            ? 'glass-panel border-slate-200/90 bg-white/90 px-6 py-3 shadow-pearl-shadow' 
            : 'border border-slate-200/60 bg-white/70 px-6 py-4 backdrop-blur-md shadow-sm'
        }`}>
          {/* Brand */}
          <a href="#inicio" className="flex items-center gap-2 group">
            <span className="font-display text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
              UXEL<span className="text-cyan group-hover:text-emerald transition-colors">/</span>
            </span>
          </a>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setOpen(!open)} 
            className="md:hidden text-slate-700 hover:text-cyan transition-colors" 
            aria-label="Abrir menú"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Links & Action */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {links.map(([name, href]) => (
                <a 
                  key={name} 
                  href={href} 
                  className="font-mono text-xs tracking-wider text-slate-700 hover:text-cyan-700 transition-colors relative py-1 font-medium group"
                >
                  {name}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-cyan-600 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            <div className="h-4 w-[1px] bg-slate-200 dark:bg-white/10" />

            {/* Dark / Light toggle */}
            <button
              onClick={toggle}
              aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
              className="relative w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/[0.05] hover:bg-slate-100 dark:hover:bg-white/10 transition-all text-slate-700 dark:text-slate-300 shadow-sm"
            >
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0,   opacity: 1, scale: 1   }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
              >
                {theme === 'dark' ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-slate-600" />}
              </motion.div>
            </button>

            {/* WhatsApp Top Button */}
            <a
              href="https://wa.me/573225850242"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-mono text-xs font-bold transition-all shadow-md shadow-emerald-500/20"
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.3z" />
              </svg>
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile Dropdown Menu */}
          {open && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute left-4 right-4 top-[calc(100%+8px)] flex flex-col gap-4 glass-panel border-slate-200 dark:border-white/10 bg-white/95 dark:bg-slate-900/95 p-6 rounded-2xl shadow-2xl md:hidden"
            >
              {links.map(([name, href]) => (
                <a 
                  onClick={() => setOpen(false)} 
                  key={name} 
                  href={href} 
                  className="font-mono text-sm tracking-wider text-slate-800 dark:text-slate-200 hover:text-cyan py-2 border-b border-slate-100 dark:border-white/10 font-medium"
                >
                  {name}
                </a>
              ))}
              <a
                onClick={() => setOpen(false)}
                href="https://wa.me/573225850242"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-mono text-xs font-bold py-3 rounded-xl shadow-md"
              >
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.3z" />
                </svg>
                <span>WhatsApp · 322 585 0242</span>
              </a>
            </motion.div>
          )}
        </nav>
      </div>
    </header>
  )
}
