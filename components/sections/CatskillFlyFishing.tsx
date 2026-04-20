'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

interface CatskillFlyFishingProps {
  section: {
    id: string
    slug: string
    title: string
    subtitle: string | null
    body: string | null
    image: string | null
  } | null
}

const images = [
  { src: '/images/double-rainbow.webp', alt: 'Double rainbow over a Catskill river with an angler fishing' },
  { src: '/images/trout-net.jpg', alt: 'Trout caught in a net' },
  { src: '/images/fly-fishing-creek.jpg', alt: 'Fly fishing on a Catskill creek' },
]

// Pull quotes to extract from specific paragraphs
const pullQuoteMatches = [
  'The Neversink River was the birthplace of the modern dry fly technique',
  'The Catskills remain a bucket-list destination',
]

function ParallaxImage({
  src,
  alt,
  className,
  index,
}: {
  src: string
  alt: string
  className?: string
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 1, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'relative overflow-hidden rounded-2xl border border-white/[0.06]',
        className
      )}
    >
      <motion.div style={{ y }} className="absolute inset-[-15%]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </motion.div>
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950/40 to-transparent" />
    </motion.div>
  )
}

export default function CatskillFlyFishing({ section }: CatskillFlyFishingProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const title = section?.title || 'Catskill Fly Fishing'
  const subtitle = section?.subtitle || 'Heritage & Waters'
  const body = section?.body || ''
  const paragraphs = body.split('\n\n').filter(Boolean)

  // For each paragraph, check if it contains a pull quote match
  const paragraphsWithQuotes = paragraphs.map((text) => {
    let pullQuote: string | null = null
    for (const match of pullQuoteMatches) {
      if (text.includes(match)) {
        // Extract a sentence containing the match
        const sentences = text.split(/(?<=\.)\s+/)
        const matchingSentence = sentences.find(s => s.includes(match))
        if (matchingSentence) {
          pullQuote = matchingSentence.trim()
        }
        break
      }
    }
    return { text, pullQuote }
  })

  return (
    <section
      id="catskill"
      ref={sectionRef}
      aria-label="Catskill Fly Fishing Heritage and Waters"
      className="relative py-24 sm:py-32 bg-forest-950 overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_left,rgba(58,165,218,0.04),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(61,139,61,0.04),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 1, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 sm:mb-20"
        >
          <span className="inline-block font-body text-xs tracking-[0.25em] uppercase text-creek-400 mb-4">
            {subtitle}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-stone-100 mb-4">
            {title}
          </h2>
          <div className="w-16 h-0.5 bg-gradient-to-r from-forest-500 via-creek-400 to-amber-500 mx-auto" />
        </motion.div>

        {/* Main Content: Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Image Gallery */}
          <div className="grid grid-cols-2 gap-4 lg:sticky lg:top-28">
            <ParallaxImage
              src={images[0].src}
              alt={images[0].alt}
              className="col-span-2 aspect-[16/10]"
              index={0}
            />
            <ParallaxImage
              src={images[1].src}
              alt={images[1].alt}
              className="aspect-[4/5]"
              index={1}
            />
            <ParallaxImage
              src={images[2].src}
              alt={images[2].alt}
              className="aspect-[4/5]"
              index={2}
            />
          </div>

          {/* Right: Text Content */}
          <div className="space-y-8">
            {paragraphsWithQuotes.map((para, i) => (
              <div key={i}>
                {/* Pull Quote (before the paragraph it belongs to) */}
                {para.pullQuote && (
                  <motion.blockquote
                    initial={{ opacity: 1, x: 8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{
                      duration: 0.7,
                      delay: 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={cn(
                      'relative pl-6 mb-6',
                      'border-l-2 border-amber-500/60'
                    )}
                  >
                    <p className="font-display text-lg sm:text-xl text-amber-500/90 italic leading-relaxed">
                      &ldquo;{para.pullQuote}&rdquo;
                    </p>
                  </motion.blockquote>
                )}

                <motion.p
                  initial={{ opacity: 1, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{
                    duration: 0.7,
                    delay: i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="font-body text-stone-400 text-base sm:text-lg leading-relaxed"
                >
                  {para.text}
                </motion.p>
              </div>
            ))}

            {/* CTA */}
            <motion.div
              initial={{ opacity: 1, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="pt-4"
            >
              <a
                href="#contact"
                className={cn(
                  'inline-flex items-center gap-3',
                  'px-8 py-4 rounded-lg',
                  'bg-gradient-to-r from-forest-500 to-forest-600',
                  'text-stone-100 font-body font-semibold text-base',
                  'hover:from-forest-400 hover:to-forest-500',
                  'shadow-lg shadow-forest-500/20 hover:shadow-forest-500/30',
                  'transition-all duration-300 group'
                )}
              >
                Join Us
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
