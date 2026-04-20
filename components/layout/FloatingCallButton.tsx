'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, X } from 'lucide-react'

export default function FloatingCallButton() {
  const [expanded, setExpanded] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past the hero
      setVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
        >
          {/* Expanded contact card */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-forest-950/95 backdrop-blur-xl border border-forest-500/30 rounded-2xl p-5 shadow-2xl shadow-black/40 min-w-[240px]"
              >
                <p className="font-display text-lg text-white mb-1">Call Us Now</p>
                <p className="font-body text-stone-400 text-xs mb-3">John Yanzek - Owner &amp; Lead Guide</p>
                <a
                  href="tel:+19172329951"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 transition-colors group"
                >
                  <Phone className="w-5 h-5 text-forest-950" />
                  <span className="font-body font-bold text-forest-950 text-lg">(917) 232-9951</span>
                </a>
                <a
                  href="mailto:ashokanoutdoors@gmail.com"
                  className="block mt-2 text-center font-body text-creek-400 hover:text-creek-300 text-sm transition-colors"
                >
                  ashokanoutdoors@gmail.com
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          {/* FAB button */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="group relative w-14 h-14 rounded-full bg-amber-500 hover:bg-amber-400 shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-all duration-300 flex items-center justify-center hover:scale-110"
            aria-label={expanded ? 'Close phone menu' : 'Call us'}
          >
            <AnimatePresence mode="wait">
              {expanded ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="w-6 h-6 text-forest-950" />
                </motion.div>
              ) : (
                <motion.div
                  key="phone"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Phone className="w-6 h-6 text-forest-950" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pulse ring */}
            {!expanded && (
              <span className="absolute inset-0 rounded-full bg-amber-500/40 animate-ping pointer-events-none" />
            )}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
