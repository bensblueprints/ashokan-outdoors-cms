'use client'

import { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValue,
  useSpring,
} from 'framer-motion'
import { cn } from '@/lib/utils'

interface HeroProps {
  title: string
  subtitle: string
}

const stats = [
  { value: 30, suffix: '+', label: 'Years Experience' },
  { value: 4, suffix: '', label: 'Activities Offered' },
  { value: 100, suffix: '%', label: 'Equipment Provided' },
]

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const motionVal = useMotionValue(0)
  const springVal = useSpring(motionVal, { stiffness: 60, damping: 20, duration: 2 })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (isInView) {
      motionVal.set(target)
    }
  }, [isInView, motionVal, target])

  useEffect(() => {
    const unsubscribe = springVal.on('change', (v) => {
      setDisplay(Math.round(v).toString())
    })
    return unsubscribe
  }, [springVal])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

export default function Hero({ title, subtitle }: HeroProps) {
  // Split title on " & " to create two lines, fallback to splitting in half
  const ampersandIndex = title.indexOf(' & ')
  let headline1Words: string[]
  let headline2Words: string[]
  if (ampersandIndex !== -1) {
    headline1Words = (title.substring(0, ampersandIndex) + ' &').split(' ')
    headline2Words = title.substring(ampersandIndex + 3).split(' ')
  } else {
    const words = title.split(' ')
    const mid = Math.ceil(words.length / 2)
    headline1Words = words.slice(0, mid)
    headline2Words = words.slice(mid)
  }
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.6])

  return (
    <section
      id="hero"
      ref={sectionRef}
      aria-label="Hero - Guided Fly Fishing and Hiking in the Catskills"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background: Video on desktop, static image on mobile */}
      <div className="absolute inset-0 z-0">
        {/* Static image for mobile (always present, hidden on lg+) */}
        <div className="block lg:hidden absolute inset-0">
          <Image
            src="/images/hero-main.jpg"
            alt="Catskill Mountains fly fishing"
            fill
            className="object-cover"
            priority
            quality={90}
            sizes="100vw"
          />
        </div>
        {/* Video for desktop (hidden on mobile to save bandwidth) */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="hidden lg:block absolute inset-0 w-full h-full object-cover"
          poster="/images/hero-main.jpg"
        >
          <source src="/images/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Gradient Overlay */}
      <motion.div
        className="absolute inset-0 z-[1] bg-gradient-to-b from-forest-950/60 via-forest-950/30 to-forest-950/70"
        style={{ opacity: overlayOpacity }}
      />

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        <div className="absolute top-[15%] left-[8%] w-64 h-64 rounded-full bg-forest-500/8 blur-3xl animate-float" />
        <div className="absolute bottom-[20%] right-[10%] w-80 h-80 rounded-full bg-creek-400/6 blur-3xl animate-float-delay" />
        <div className="absolute top-[40%] right-[25%] w-40 h-40 rounded-full bg-forest-400/5 blur-2xl animate-float" />
        <div className="absolute bottom-[35%] left-[20%] w-48 h-48 rounded-full bg-creek-500/4 blur-2xl animate-float-delay" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-32">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs sm:text-sm font-body font-medium tracking-widest uppercase text-forest-300">
            <span className="w-1.5 h-1.5 rounded-full bg-forest-400 animate-pulse-glow" />
            Catskill Mountains, New York
          </span>
        </motion.div>

        {/* Headline Line 1 */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
          <span className="block mb-1 md:mb-2">
            {headline1Words.map((word, i) => (
              <motion.span
                key={`h1-${i}`}
                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.5,
                  delay: 0.4 + i * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="inline-block mr-[0.25em] text-white"
              >
                {word}
              </motion.span>
            ))}
          </span>

          {/* Headline Line 2 */}
          <span className="block">
            {headline2Words.map((word, i) => (
              <motion.span
                key={`h2-${i}`}
                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.5,
                  delay: 0.7 + i * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="inline-block mr-[0.25em] text-white"
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-6 md:mt-8 max-w-2xl mx-auto text-base sm:text-lg md:text-xl font-body font-semibold text-white leading-relaxed text-balance drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
        >
          {subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#contact" className="btn-gold group inline-flex items-center gap-2">
            <span className="relative z-10">Book Your Adventure</span>
            <svg
              className="relative z-10 w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a
            href="#services"
            className={cn(
              'inline-flex items-center gap-2 px-8 py-4 rounded-lg font-body font-semibold',
              'glass border-white/10 text-stone-200',
              'hover:border-forest-500/40 hover:text-forest-300 hover:bg-forest-500/5',
              'transition-all duration-300 hover:-translate-y-0.5'
            )}
          >
            Explore Our Services
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.6 }}
          className="mt-16 md:mt-24 grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={cn(
                'flex flex-col items-center gap-1 md:gap-2',
                i < stats.length - 1 && 'border-r border-white/10'
              )}
            >
              <span className="text-3xl sm:text-4xl md:text-5xl font-display font-bold gradient-text-gold">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </span>
              <span className="text-xs sm:text-sm font-body text-stone-400 tracking-wide uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-body text-stone-500 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-stone-600 flex items-start justify-center p-1"
        >
          <div className="w-1 h-2 rounded-full bg-forest-400" />
        </motion.div>
      </motion.div>
    </section>
  )
}
