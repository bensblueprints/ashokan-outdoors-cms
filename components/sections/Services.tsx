'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Fish, Mountain, Compass, type LucideIcon } from 'lucide-react'

interface ServiceData {
  id: number
  title: string
  description: string
  image: string
  icon: string
  href: string
  sort_order: number
}

interface ServicesProps {
  services: ServiceData[]
}

const iconMap: Record<string, LucideIcon> = {
  Fish,
  Mountain,
  Compass,
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0.85, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Services({ services }: ServicesProps) {
  return (
    <section
      id="services"
      className="relative py-28 md:py-36 overflow-hidden bg-forest-950"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full bg-forest-500/[0.04] blur-[120px] pointer-events-none" />

      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-forest-500/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 1, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20 max-w-3xl mx-auto"
        >
          <span className="inline-block text-creek-400 font-body text-sm uppercase tracking-[0.25em] mb-4">
            What We Offer
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-stone-100 mb-6">
            Our Guiding Services
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-forest-500 to-creek-400 mx-auto mb-6" />
          <p className="font-body text-lg text-stone-400 leading-relaxed">
            Our Professional Guide Team provides safe, enjoyable experiences for all skill levels.
          </p>
        </motion.div>

        {/* Service cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service) => {
            const IconComponent = iconMap[service.icon] || Fish
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className={cn(
                  'group relative rounded-2xl overflow-hidden',
                  'bg-white/[0.03] backdrop-blur-sm',
                  'border border-white/[0.06]',
                  'hover:border-forest-500/30',
                  'transition-all duration-700',
                  'hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(61,139,61,0.15)]'
                )}
              >
                {/* Card image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Image overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/40 to-transparent" />

                  {/* Icon badge */}
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-forest-950/60 backdrop-blur-md border border-white/10 flex items-center justify-center transition-colors duration-500 group-hover:bg-forest-500/20 group-hover:border-forest-500/30">
                    <IconComponent className="w-5 h-5 text-amber-500/80" />
                  </div>

                  {/* Title overlaid on image */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 pb-5">
                    <h3 className="font-display text-2xl text-stone-100 group-hover:text-amber-400/90 transition-colors duration-500">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Card body */}
                <div className="p-6 pt-4">
                  <p className="font-body text-stone-400 leading-relaxed text-[0.95rem] mb-6">
                    {service.description}
                  </p>

                  {/* Learn More link */}
                  <a
                    href={service.href}
                    className={cn(
                      'inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-wider',
                      'text-creek-400 hover:text-creek-300',
                      'transition-colors duration-300 group/link'
                    )}
                  >
                    <span>Learn More</span>
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </div>

                {/* Hover glow border effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none border border-forest-500/20" />
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
