'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Shield, Award, Heart } from 'lucide-react'

interface AboutProps {
  section: {
    id: string
    slug: string
    title: string
    subtitle: string | null
    body: string | null
    image: string | null
  } | null
}

const credentials = [
  {
    icon: Shield,
    title: 'NYS Licensed Guide',
    description: 'Certified in CPR, Water Safety & First Aid',
  },
  {
    icon: Award,
    title: 'NYSOGA Member',
    description: 'NYS Outdoor Guides Association',
  },
  {
    icon: Heart,
    title: 'Trout Unlimited',
    description: 'Ashokan-Pepacton Chapter Leaders',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0.85, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const imageVariants = {
  hidden: { opacity: 0.85, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function About({ section }: AboutProps) {
  const title = section?.title || 'About Ashokan Outdoors'
  const subtitle = section?.subtitle || 'Meet Your Guide'
  const body = section?.body || ''
  const paragraphs = body.split('\n\n').filter(Boolean)

  // First two paragraphs go in the featured card
  const featuredParagraphs = paragraphs.slice(0, 2)
  // The rest go in the body section
  const bodyParagraphs = paragraphs.slice(2)

  return (
    <section
      id="about"
      aria-label="About Ashokan Outdoors"
      className="relative py-28 md:py-36 overflow-hidden bg-forest-950"
    >
      {/* Subtle top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-forest-500/30 to-transparent" />

      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('/images/noise.png')] bg-repeat pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 1, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block text-creek-400 font-body text-sm uppercase tracking-[0.25em] mb-4">
            {subtitle}
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-stone-100 mb-4">
            {title}
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-forest-500 to-creek-400 mx-auto" />
        </motion.div>

        {/* Featured Guide Card */}
        <motion.div
          initial={{ opacity: 0.85, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative glass rounded-3xl overflow-hidden mb-16 md:mb-20"
        >
          <div className="grid md:grid-cols-5 gap-0">
            {/* Guide Photo */}
            <div className="md:col-span-2 relative h-80 md:h-auto min-h-[400px]">
              <Image
                src={section?.image || '/images/john-yanzek.webp'}
                alt="John Yanzek - Owner and Head Guide of Ashokan Outdoors"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 40vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-forest-950/30" />
            </div>

            {/* Guide Info */}
            <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center">
              <span className="inline-block text-amber-500 font-body text-xs uppercase tracking-[0.3em] mb-3">
                Owner & Head Guide
              </span>
              <h3 className="font-display text-5xl md:text-6xl lg:text-7xl text-white mb-4 leading-[1.05]">
                John <span className="gradient-text-gold">Yanzek</span>
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-amber-500 to-creek-400 rounded-full mb-6" />
              {featuredParagraphs.map((para, i) => (
                <p key={i} className={cn(
                  'font-body leading-relaxed',
                  i === 0 ? 'text-stone-300 text-lg mb-4' : 'text-stone-400 text-base mb-6'
                )}>
                  {para}
                </p>
              ))}

              {/* Credential badges inline */}
              <div className="flex flex-wrap gap-3">
                {credentials.map((cred) => (
                  <div
                    key={cred.title}
                    className={cn(
                      'inline-flex items-center gap-2 px-4 py-2 rounded-full',
                      'bg-white/[0.06] border border-white/[0.08]',
                      'hover:bg-white/[0.10] hover:border-forest-500/20',
                      'transition-all duration-300'
                    )}
                  >
                    <cred.icon className="w-4 h-4 text-amber-500/80" />
                    <span className="font-body text-xs text-stone-300 font-medium">{cred.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="space-y-6"
          >
            {bodyParagraphs.map((para, i) => {
              // Check if this is the "specialize in fly fishing" paragraph for the pull quote
              if (para.includes('We specialize in fly fishing')) {
                return (
                  <div key={i}>
                    <motion.blockquote
                      variants={itemVariants}
                      className="relative my-10 pl-6 border-l-2 border-amber-500/60"
                    >
                      <div className="absolute -left-3 -top-2 text-amber-500/20 text-6xl font-display leading-none select-none">
                        &ldquo;
                      </div>
                      <p className="font-display text-xl md:text-2xl text-stone-100 italic leading-relaxed">
                        {para}
                      </p>
                    </motion.blockquote>
                  </div>
                )
              }
              // Check if this is the last paragraph (closing statement)
              if (i === bodyParagraphs.length - 1 && para.includes('we love to connect people')) {
                return (
                  <motion.p key={i} variants={itemVariants} className="font-body text-amber-500/90 text-xl font-medium italic leading-relaxed">
                    {para}
                  </motion.p>
                )
              }
              return (
                <motion.p key={i} variants={itemVariants} className="font-body text-stone-300 text-lg leading-relaxed">
                  {para}
                </motion.p>
              )
            })}
          </motion.div>

          {/* Right: Staggered image grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="space-y-6 lg:sticky lg:top-28"
          >
            {/* Staggered images */}
            <div className="grid grid-cols-2 gap-4">
              {/* Large image - spans both columns */}
              <motion.div
                variants={imageVariants}
                className="col-span-2 relative h-72 md:h-80 rounded-2xl overflow-hidden group"
              >
                <Image
                  src="/images/about-1.jpg"
                  alt="Ashokan Outdoors guiding in the Catskills"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/60 via-transparent to-transparent" />
              </motion.div>

              {/* Bottom-left image */}
              <motion.div
                variants={imageVariants}
                className="relative h-52 md:h-64 rounded-2xl overflow-hidden group -mt-2"
              >
                <Image
                  src="/images/esopus-casting.jpg"
                  alt="Fly casting on the Esopus Creek"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/50 via-transparent to-transparent" />
              </motion.div>

              {/* Bottom-right image - offset for stagger */}
              <motion.div
                variants={imageVariants}
                className="relative h-52 md:h-64 rounded-2xl overflow-hidden group mt-6"
              >
                <Image
                  src="/images/esopus-rainbow.jpg"
                  alt="Rainbow trout caught in Catskill waters"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/50 via-transparent to-transparent" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
