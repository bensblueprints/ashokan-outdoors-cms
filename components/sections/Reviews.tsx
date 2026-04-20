'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { cn } from '@/lib/utils'

const reviews = [
  {
    name: 'Andrew Emrich',
    date: 'April 2026',
    text: "John approaches perfection when it comes to creating a unique Catskill experience for his clients. He loves everything fly fishing and Catskill Mountains and it was apparent from the minute I met him. He can't guarantee biting fish or perfect weather, but you can count on an exceptional experience to remember!",
  },
  {
    name: 'Brian Roesch',
    date: 'October 2025',
    text: "In October 2025, John gave expert guide service to our 2-person party on day-long fishing in Catskills. For our 1st time fly fisher, he gave solid instruction on casting. By mid-morning, her good casts were getting hits from fish. By the end of the day, she was making excellent casts. For me, with lots of prior fly casting, I appreciated John guiding us into beautiful spots with good fish & fun, intriguing water to cast in. My highest recommendation for Ashokan Outdoors fly fishing.",
  },
  {
    name: 'Peter Curry',
    date: 'April 2026',
    text: "My wife and I had a great day on the river with John. He was extremely knowledgeable of the river and local history. John was very interested in our experience. He wanted us to enjoy all aspects of the fishing. We left the day with so much more than we expected.",
  },
  {
    name: 'Bruce Broadbelt',
    date: 'November 2025',
    text: "We had never fly fished before and John was the perfect guide. He was very patient with us and tried all his tips and tricks to get us to cast correctly. We had a great time and, thanks to John, we are hooked and can't wait to try again.",
  },
  {
    name: 'Sam Chaffin',
    date: 'April 2026',
    text: "John was a spectacular guide. He knows the rivers and the history of the area, and is a wealth of knowledge generally. Perfect person to go with to learn the area and how to fish it.",
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const cardVariants = {
  hidden: { opacity: 0.85, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

function StarRating() {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  )
}

export default function Reviews() {
  return (
    <section id="reviews" aria-label="Client Reviews and Testimonials" className="relative py-24 md:py-32 overflow-hidden bg-forest-950">
      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-amber-500/[0.03] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 1, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="inline-block text-amber-400 font-body text-sm uppercase tracking-[0.25em] mb-4">
            What Our Clients Say
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-stone-100 mb-6">
            5-Star <span className="gradient-text-gold">Reviews</span>
          </h2>
          <div className="w-24 h-0.5 bg-gradient-to-r from-amber-500 to-creek-400 mx-auto mb-6" />
          <div className="flex items-center justify-center gap-2 mb-2">
            <StarRating />
            <span className="font-body text-stone-400 text-sm ml-2">5.0 on Google</span>
          </div>
        </motion.div>

        {/* Featured review */}
        <motion.div
          initial={{ opacity: 0.85, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="mb-10"
        >
          <div className={cn(
            'relative rounded-2xl p-8 md:p-10',
            'bg-gradient-to-br from-amber-500/[0.08] to-forest-500/[0.05]',
            'border border-amber-500/20',
          )}>
            <Quote className="absolute top-6 right-6 w-12 h-12 text-amber-500/10" />
            <StarRating />
            <p className="font-display text-xl md:text-2xl text-stone-100 italic leading-relaxed mt-4 mb-6">
              &ldquo;{reviews[0].text}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                <span className="font-display text-amber-400 text-lg">{reviews[0].name[0]}</span>
              </div>
              <div>
                <p className="font-body font-semibold text-white text-sm">{reviews[0].name}</p>
                <p className="font-body text-stone-500 text-xs">{reviews[0].date}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Review grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid md:grid-cols-2 gap-6"
        >
          {reviews.slice(1).map((review) => (
            <motion.div
              key={review.name}
              variants={cardVariants}
              className={cn(
                'group relative rounded-2xl p-6 md:p-8',
                'bg-white/[0.03] backdrop-blur-sm',
                'border border-white/[0.06]',
                'hover:border-amber-500/20',
                'transition-all duration-500',
              )}
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-white/[0.04] group-hover:text-amber-500/10 transition-colors duration-500" />
              <StarRating />
              <p className="font-body text-stone-300 leading-relaxed mt-4 mb-5 text-[0.95rem]">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-forest-500/20 flex items-center justify-center">
                  <span className="font-display text-forest-400 text-sm">{review.name[0]}</span>
                </div>
                <div>
                  <p className="font-body font-semibold text-white text-sm">{review.name}</p>
                  <p className="font-body text-stone-500 text-xs">{review.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Google badge */}
        <motion.div
          initial={{ opacity: 0.85, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-10"
        >
          <a
            href="https://www.google.com/maps/place/Ashokan+Outdoors"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border-white/10 hover:border-amber-500/30 transition-all duration-300 group"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="font-body text-stone-300 text-sm font-medium group-hover:text-white transition-colors">
              Read More Reviews on Google
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
