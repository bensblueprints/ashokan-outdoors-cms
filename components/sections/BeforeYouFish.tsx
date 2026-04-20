'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Fish, ShieldCheck, Backpack, Info, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BeforeYouFishProps {
  section: {
    id: string
    slug: string
    title: string
    subtitle: string | null
    body: string | null
    image: string | null
  } | null
}

const weProvide = [
  'Fishing rods, reels, lines, flies, snacks and drinks',
  'Lunch (for full day trips)',
  'Inventory of many common sizes of chest waders and boots',
  "If we don't have your size in shop — we will help find them for you",
]

const licenses = [
  {
    name: 'New York State Fishing License',
    detail:
      'This is mandatory for anglers age 16 and over. There are single and multi-day license options for NY resident or non-resident.',
    url: 'https://www.dec.ny.gov/permits/6091.html',
    linkText: 'Get your license online',
  },
  {
    name: 'NYC DEP Watershed Recreation Permit',
    detail:
      'Ashokan Outdoors is licensed (by NYC DEP) to guide clients on NYC watershed properties but permits are required to enter these lands. Luckily the NYC Watershed Permit is free.',
    url: 'https://a826-web01.nyc.gov/recpermitapp/',
    linkText: 'Get your free permit',
  },
]

const checklist = [
  'Sunglasses (polarized best for seeing river bottom and fish)',
  'Rain jacket (short jacket best when wading)',
  'Hat with brim for rain and sun',
  'Long comfortable leggings (polyester or fleece, avoid heavy cotton)',
  'Non-cotton socks (bring a couple pair)',
  'Extra set of clothes',
  'Something warm (fleece/wool jacket, pullover, or vest)',
  'Sunscreen',
  'Bandana for sun and insects',
  'Insect repellent',
  'Waterproof case/lanyard for cell phone',
  'Fingerless gloves (seasonal)',
  'Headlamp/flashlight',
]

const miscAdvice = [
  'Dress in layers, weather changes suddenly',
  'Most anglers change waders roadside',
  'UV strong along water',
  'Insect repellent important in recent years',
  'Bathrooms at area restaurants; remote spots less accessible',
  'Full day: picnic lunch. Half-day: snacks and cooler. Special dietary needs accommodated. Food allergies: bring your lunch.',
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0.85, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function BeforeYouFish({ section }: BeforeYouFishProps) {
  const title = section?.title || 'Before You Go Fly Fishing'
  const subtitle = section?.subtitle || 'Preparation Guide'
  return (
    <section id="prepare" aria-label="Preparation Guide - Before You Go Fly Fishing" className="section-padding relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-forest-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 1, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-forest-400 font-body font-semibold tracking-widest uppercase text-sm mb-4">
            {subtitle}
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Before You Go{' '}
            <span className="gradient-text">Fly Fishing</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-forest-500 to-creek-400 mx-auto rounded-full" />
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-10 mb-14">
          {/* LEFT COLUMN: We Provide + Licenses */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="space-y-10"
          >
            {/* We Provide */}
            <motion.div variants={itemVariants} className="glass rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-forest-500/20 flex items-center justify-center">
                  <Fish className="w-5 h-5 text-forest-400" />
                </div>
                <h3 className="font-display text-2xl text-white">What We Provide</h3>
              </div>
              <p className="font-body text-stone-300 leading-relaxed">
                Fishing rods, reels, lines, flies, snacks and drinks. Lunch (for full day trips). We
                also have inventory of many common sizes of chest waders and boots. If we don&apos;t
                have your size in shop &mdash; we will help find them for you.
              </p>
            </motion.div>

            {/* Required Licenses */}
            <motion.div variants={itemVariants} className="glass rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="font-display text-2xl text-white">Required Licenses</h3>
              </div>
              <div className="space-y-5">
                {licenses.map((lic, i) => (
                  <div key={i} className="border-l-2 border-amber-500/40 pl-4">
                    <h4 className="font-body font-semibold text-amber-300 mb-1">{lic.name}</h4>
                    <p className="font-body text-stone-400 text-sm leading-relaxed mb-2">{lic.detail}</p>
                    <a href={lic.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-creek-400 hover:text-creek-300 text-sm font-medium transition-colors">
                      {lic.linkText} <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Own Equipment */}
            <motion.div variants={itemVariants} className="glass rounded-2xl p-8 border-creek-400/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-creek-400/20 flex items-center justify-center">
                  <Info className="w-5 h-5 text-creek-400" />
                </div>
                <h3 className="font-display text-xl text-white">Bringing Your Own Equipment?</h3>
              </div>
              <p className="font-body text-stone-300 text-sm leading-relaxed">
                8.5 or 9-foot rod with a 5 or 6 weight forward floating line is most versatile for
                Catskill rivers and streams. 3-4 weight rod can be appropriate for smaller streams.
              </p>
            </motion.div>
          </motion.div>

          {/* RIGHT COLUMN: Gear Checklist */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="glass rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-lg bg-forest-500/20 flex items-center justify-center">
                <Backpack className="w-5 h-5 text-forest-400" />
              </div>
              <h3 className="font-display text-2xl text-white">What to Bring</h3>
            </div>
            <ul className="space-y-4">
              {checklist.map((item, i) => (
                <motion.li
                  key={i}
                  variants={itemVariants}
                  className="flex items-start gap-3 group"
                >
                  <CheckCircle className="w-5 h-5 text-forest-400 mt-0.5 flex-shrink-0 transition-colors group-hover:text-forest-300" />
                  <span className="font-body text-stone-300 text-sm leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom: Misc Advice */}
        <motion.div
          initial={{ opacity: 1, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-2xl p-8 md:p-10"
        >
          <h3 className="font-display text-2xl text-white mb-6 text-center">Good to Know</h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {miscAdvice.map((tip, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className={cn(
                  'flex items-start gap-3 p-4 rounded-xl',
                  'bg-white/[0.03] border border-white/[0.06]',
                  'hover:border-forest-500/20 transition-colors duration-300'
                )}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-forest-400 mt-2 flex-shrink-0" />
                <span className="font-body text-stone-400 text-sm leading-relaxed">{tip}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
