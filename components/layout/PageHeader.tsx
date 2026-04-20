'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

export default function PageHeader({
  title,
  subtitle,
  image,
  imageAlt,
}: {
  title: string
  subtitle: string
  image: string
  imageAlt: string
}) {
  return (
    <section className="relative min-h-[60vh] flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover"
          priority
          quality={90}
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/50 to-forest-950/30" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-32 w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-body text-forest-300 hover:text-forest-200 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-body text-lg sm:text-xl text-stone-300 max-w-2xl"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  )
}
