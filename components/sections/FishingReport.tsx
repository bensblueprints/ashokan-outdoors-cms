'use client'

import { motion } from 'framer-motion'
import { Fish } from 'lucide-react'

export default function FishingReport() {
  return (
    <section
      id="fishing-report"
      aria-label="Fishing Report"
      className="relative py-20 md:py-28 overflow-hidden bg-forest-950"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-creek-400/30 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-creek-400/[0.04] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-creek-400 font-body text-sm uppercase tracking-[0.25em] mb-4">
            From the Water
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-stone-100 mb-6">
            Fishing Report
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-forest-500 to-creek-400 mx-auto mb-8" />
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full glass border-white/10">
            <Fish className="w-5 h-5 text-creek-400" />
            <span className="font-body font-semibold text-stone-200 tracking-wide">
              Coming Soon
            </span>
          </div>
          <p className="mt-6 font-body text-stone-400 max-w-xl mx-auto leading-relaxed">
            Weekly updates on Catskill water levels, hatches, and what&apos;s biting — check back soon.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
