'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function Accordion({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="space-y-4">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div 
            key={item.question}
            className={`rounded-2xl border transition-all duration-300 ${
              isOpen 
                ? 'glass-panel border-cyan-300 bg-white shadow-pearl-shadow' 
                : 'border-slate-200 bg-slate-50/60 hover:border-slate-300'
            }`}
          >
            <button
              className="flex w-full items-center justify-between gap-4 p-6 text-left"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className={`font-display text-lg font-bold transition-colors ${isOpen ? 'text-slate-900' : 'text-slate-700'}`}>
                {item.question}
              </span>
              <span className={`flex h-8 w-8 items-center justify-center rounded-xl transition-all duration-300 ${isOpen ? 'rotate-180 bg-cyan-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                <ChevronDown size={18} />
              </span>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-sm font-body text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
