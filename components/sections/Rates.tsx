'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '@/lib/utils'
import { Fish, Mountain, Compass, ArrowRight, Mail } from 'lucide-react'

interface RateData {
  id: number
  category: string
  label: string
  price: string
  details: string | null
  sort_order: number
}

interface RatesProps {
  rates: RateData[]
}

function PriceRow({
  label,
  price,
  sublabel,
  note,
}: {
  label: string
  price: string
  sublabel?: string
  note?: string
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 group">
      <div>
        <span className="font-body text-stone-300 text-sm sm:text-base group-hover:text-stone-100 transition-colors">
          {label}
        </span>
        {sublabel && (
          <span className="block text-xs text-stone-500 mt-0.5">{sublabel}</span>
        )}
      </div>
      <span className="font-display text-xl sm:text-2xl text-stone-100 tracking-tight">
        {price}
        {note && <sup className="text-amber-500 text-xs ml-0.5">{note}</sup>}
      </span>
    </div>
  )
}

const cardVariants = {
  hidden: { opacity: 0.85, y: 12, scale: 0.98 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: i * 0.2,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

export default function Rates({ rates }: RatesProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  // Group rates by category
  const instructionRates = rates.filter(r => r.category === 'instruction')
  const guidingHalfRates = rates.filter(r => r.category === 'guiding_half')
  const guidingFullRates = rates.filter(r => r.category === 'guiding_full')
  const hikingHalfRates = rates.filter(r => r.category === 'hiking_half')
  const hikingFullRates = rates.filter(r => r.category === 'hiking_full')

  return (
    <section
      id="rates"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-forest-950 overflow-hidden"
    >
      {/* Background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(61,139,61,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(58,165,218,0.04),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 1, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="inline-block font-body text-xs tracking-[0.25em] uppercase text-forest-400 mb-4">
            Pricing
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-stone-100 mb-6">
            Service Rates
          </h2>
          <p className="font-body text-stone-400 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Our Team provides safe, enjoyable experiences for all skill levels.
            Discover nature and gain some valuable knowledge and skills.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1: Fly Fishing Instruction */}
          <motion.div
            custom={0}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className={cn(
              'relative rounded-2xl overflow-hidden',
              'bg-white/[0.03] backdrop-blur-sm',
              'border border-white/[0.06]',
              'hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-500',
              'hover:shadow-xl',
              'shadow-forest-500/20'
            )}
          >
            {/* Accent top border */}
            <div className="h-1 w-full bg-forest-500" />

            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center',
                    'bg-forest-500/10 border border-forest-500/20'
                  )}
                >
                  <Fish className="w-5 h-5 text-forest-400" />
                </div>
                <div>
                  <h3 className="font-display text-xl sm:text-2xl text-stone-100">
                    Fly Fishing Instruction
                  </h3>
                </div>
              </div>

              <div className="mb-4">
                <p className="font-body text-sm text-forest-400 font-medium mb-1">
                  Introduction to Fly Fishing and Casting
                </p>
                <p className="font-body text-xs text-stone-500">
                  90 minutes
                </p>
              </div>

              <div className="mb-6">
                {instructionRates.map((r) => (
                  <PriceRow key={r.id} label={r.label} price={r.price} sublabel={r.details || undefined} />
                ))}
              </div>

              <p className="font-body text-sm text-stone-400 leading-relaxed mb-8">
                Learn and/or develop your fly casting skills on land with an Ashokan Outdoors Licensed Instructor. Our Guides will teach you about different fly rods, reels, lines, and how to use each of them. You can learn the basics or enhance your current skills. This instruction is conducted without hooks on open lawn so we can get a little crazy.
              </p>

              <a
                href="#contact"
                className={cn(
                  'inline-flex items-center gap-2 w-full justify-center',
                  'px-6 py-3 rounded-lg font-body text-sm font-semibold',
                  'bg-forest-500/10 border border-forest-500/30 text-forest-400',
                  'hover:bg-forest-500/20 hover:border-forest-500/50 hover:text-forest-300',
                  'transition-all duration-300 group'
                )}
              >
                Book Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Card 2: Guided Fly Fishing */}
          <motion.div
            custom={1}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className={cn(
              'relative rounded-2xl overflow-hidden',
              'bg-white/[0.03] backdrop-blur-sm',
              'border border-white/[0.06]',
              'hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-500',
              'hover:shadow-xl',
              'shadow-creek-400/20',
              'lg:scale-[1.03] lg:z-10'
            )}
          >
            {/* Accent top border */}
            <div className="h-1 w-full bg-creek-400" />

            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center',
                    'bg-creek-400/10 border border-creek-400/20'
                  )}
                >
                  <Compass className="w-5 h-5 text-creek-400" />
                </div>
                <h3 className="font-display text-xl sm:text-2xl text-stone-100">
                  Guided Fly Fishing
                </h3>
              </div>

              {/* Half Day */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-creek-400/30 to-transparent" />
                  <span className="font-body text-xs tracking-[0.15em] uppercase text-creek-400 font-medium">
                    Half Day
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-l from-creek-400/30 to-transparent" />
                </div>
                {guidingHalfRates.map((r) => (
                  <PriceRow
                    key={r.id}
                    label={r.label}
                    price={r.price}
                    note={r.details && r.details.startsWith('*') ? '*' : undefined}
                  />
                ))}
              </div>

              {/* Full Day */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-creek-400/30 to-transparent" />
                  <span className="font-body text-xs tracking-[0.15em] uppercase text-creek-400 font-medium">
                    Full Day
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-l from-creek-400/30 to-transparent" />
                </div>
                {guidingFullRates.map((r) => (
                  <PriceRow
                    key={r.id}
                    label={r.label}
                    price={r.price}
                    note={r.details && r.details.startsWith('*') ? '*' : undefined}
                  />
                ))}
              </div>

              <p className="font-body text-xs text-stone-500 italic mb-6">
                * May Require Two Guides
              </p>

              <a
                href="#contact"
                className={cn(
                  'inline-flex items-center gap-2 w-full justify-center',
                  'px-6 py-3 rounded-lg font-body text-sm font-semibold',
                  'bg-creek-400/10 border border-creek-400/30 text-creek-400',
                  'hover:bg-creek-400/20 hover:border-creek-400/50 hover:text-creek-300',
                  'transition-all duration-300 group'
                )}
              >
                Book Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          {/* Card 3: Guided Hikes */}
          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className={cn(
              'relative rounded-2xl overflow-hidden',
              'bg-white/[0.03] backdrop-blur-sm',
              'border border-white/[0.06]',
              'hover:bg-white/[0.05] hover:border-white/[0.1] transition-all duration-500',
              'hover:shadow-xl',
              'shadow-amber-500/20'
            )}
          >
            {/* Accent top border */}
            <div className="h-1 w-full bg-amber-500" />

            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center',
                    'bg-amber-500/10 border border-amber-500/20'
                  )}
                >
                  <Mountain className="w-5 h-5 text-amber-500" />
                </div>
                <h3 className="font-display text-xl sm:text-2xl text-stone-100">
                  Guided Hikes
                </h3>
              </div>

              <div className="mb-6">
                {hikingHalfRates.map((r) => (
                  <PriceRow
                    key={r.id}
                    label={r.label}
                    sublabel={r.details || undefined}
                    price={r.price}
                  />
                ))}
                {hikingFullRates.map((r) => (
                  <PriceRow
                    key={r.id}
                    label={r.label}
                    sublabel={r.details || undefined}
                    price={r.price}
                  />
                ))}
              </div>

              <p className="font-body text-xs text-stone-500 italic mb-8">
                *Custom group rates with additional guides available upon request
              </p>

              {/* Spacer to push button to similar position */}
              <div className="mt-auto">
                <a
                  href="#contact"
                  className={cn(
                    'inline-flex items-center gap-2 w-full justify-center',
                    'px-6 py-3 rounded-lg font-body text-sm font-semibold',
                    'bg-amber-500/10 border border-amber-500/30 text-amber-500',
                    'hover:bg-amber-500/20 hover:border-amber-500/50 hover:text-amber-400',
                    'transition-all duration-300 group'
                  )}
                >
                  Book Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Important Notes */}
        <motion.div
          initial={{ opacity: 1, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 sm:mt-16 max-w-3xl mx-auto"
        >
          <div
            className={cn(
              'rounded-xl p-6 sm:p-8',
              'bg-white/[0.02] border border-white/[0.06]',
              'backdrop-blur-sm'
            )}
          >
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                <p className="font-body text-sm text-stone-400 leading-relaxed">
                  <span className="text-stone-300 font-medium">20% Deposit</span> required
                  upon booking reservation; balance due on the day of the trip.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-forest-500 mt-2 shrink-0" />
                <p className="font-body text-sm text-stone-400 leading-relaxed">
                  <span className="text-stone-300 font-medium">
                    Personalized Gift certificates
                  </span>{' '}
                  are available for both full and half day guiding trips or for a specified
                  amount.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-creek-400 mt-2 shrink-0" />
                <p className="font-body text-sm text-stone-400 leading-relaxed">
                  <Mail className="w-4 h-4 inline-block mr-1.5 text-creek-400 -mt-0.5" />
                  Email us at:{' '}
                  <a
                    href="mailto:ashokanoutdoors@gmail.com"
                    className="text-creek-400 hover:text-creek-300 transition-colors underline underline-offset-2"
                  >
                    ashokanoutdoors@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
