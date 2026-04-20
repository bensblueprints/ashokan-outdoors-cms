'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FaqData {
  id: number
  question: string
  answer: string
  sort_order: number
}

interface FAQProps {
  faqs: FaqData[]
}

function FAQItem({ faq, index }: { faq: FaqData; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 1, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className={cn(
        'glass rounded-xl overflow-hidden transition-colors duration-300',
        open && 'border-forest-500/30'
      )}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-6 text-left cursor-pointer group"
        aria-expanded={open}
      >
        <span
          className={cn(
            'font-display text-lg md:text-xl transition-colors duration-300',
            open ? 'text-forest-300' : 'text-white group-hover:text-forest-200'
          )}
        >
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="flex-shrink-0"
        >
          <ChevronDown
            className={cn(
              'w-5 h-5 transition-colors duration-300',
              open ? 'text-forest-400' : 'text-stone-500 group-hover:text-stone-300'
            )}
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0">
              <div className="w-full h-px bg-gradient-to-r from-forest-500/40 via-forest-500/10 to-transparent mb-4" />
              <p className="font-body text-stone-300 leading-relaxed">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ({ faqs }: FAQProps) {
  return (
    <section id="faq" className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-forest-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 1, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-forest-400 font-body font-semibold tracking-widest uppercase text-sm mb-4">
            Common Questions
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Frequently <span className="gradient-text">Asked</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-forest-500 to-creek-400 mx-auto rounded-full" />
        </motion.div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem key={faq.id} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
