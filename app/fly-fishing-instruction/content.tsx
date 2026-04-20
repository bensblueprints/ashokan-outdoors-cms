'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, CheckCircle, Clock, DollarSign, Users, Fish } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function PageContent() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/hiking.jpg" alt="Fly fishing instruction in the Catskill Mountains" fill className="object-cover" priority quality={90} sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/50 to-forest-950/30" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-32 w-full">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-body text-forest-300 hover:text-forest-200 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4">
            Catskills Fly Fishing Instruction
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="font-body text-lg sm:text-xl text-stone-300 max-w-2xl">
            Learn to fly fish in the birthplace of American fly fishing with licensed Catskill Mountain guides.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div className="prose-custom">
                <h2 className="font-display text-3xl text-white mb-6">Learn the Art of Fly Casting</h2>
                <p className="font-body text-stone-300 text-lg leading-relaxed mb-6">
                  Whether you are looking to refine your fly fishing skills or if you are just starting out — our knowledgeable fly fishing instructors will help you enhance your proficiency. When you are ready, we can take your new skills to the Catskill waters. We promise an unforgettable experience. Join us and confidently embark on your next fly fishing journey.
                </p>
                <p className="font-body text-stone-300 text-lg leading-relaxed mb-6">
                  Learn and/or develop your fly casting skills on land with an Ashokan Outdoors Licensed Instructor. Our Guides will teach you about different fly rods, reels, lines, and how to use each of them. You can learn the basics or enhance your current skills. This instruction is conducted without hooks on open lawn so we can get a little crazy.
                </p>
              </div>

              {/* What You'll Learn */}
              <div className="glass rounded-2xl p-8">
                <h3 className="font-display text-2xl text-white mb-6">What You&apos;ll Learn</h3>
                <ul className="space-y-4">
                  {[
                    'Proper fly casting technique and form',
                    'Understanding different fly rods, reels, and lines',
                    'How to read water and identify fish-holding spots',
                    'Fly selection based on local insect hatches',
                    'Knot tying and rigging fundamentals',
                    'Catch and release best practices',
                    'Catskill fly fishing history and traditions',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-forest-400 mt-0.5 flex-shrink-0" />
                      <span className="font-body text-stone-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Equipment */}
              <div>
                <h3 className="font-display text-2xl text-white mb-4">Equipment Provided</h3>
                <p className="font-body text-stone-300 leading-relaxed mb-4">
                  We provide all the equipment you need — fishing rods, reels, lines, and flies. We also have inventory of many common sizes of chest waders and boots. If we don&apos;t have your size in shop, we will help find them for you.
                </p>
                <p className="font-body text-stone-300 leading-relaxed">
                  If you wish to bring your own equipment, please let us know in advance so we can review your gear. An 8.5 or 9-foot rod with a 5 or 6 weight forward floating line is most versatile for Catskill rivers and streams. A 3-4 weight rod can be appropriate for smaller streams.
                </p>
              </div>

              {/* Required Licenses */}
              <div className="glass rounded-2xl p-8 border-amber-500/20">
                <h3 className="font-display text-2xl text-white mb-6">Required Licenses &amp; Permits</h3>
                <div className="space-y-5">
                  <div className="border-l-2 border-amber-500/40 pl-4">
                    <h4 className="font-body font-semibold text-amber-300 mb-1">New York State Fishing License</h4>
                    <p className="font-body text-stone-400 text-sm leading-relaxed mb-2">
                      Mandatory for anglers age 16 and over. Single and multi-day options available for NY residents and non-residents.
                    </p>
                    <a href="https://www.dec.ny.gov/permits/6091.html" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-creek-400 hover:text-creek-300 text-sm font-medium transition-colors">
                      Get your license online <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="border-l-2 border-amber-500/40 pl-4">
                    <h4 className="font-body font-semibold text-amber-300 mb-1">NYC DEP Watershed Recreation Permit</h4>
                    <p className="font-body text-stone-400 text-sm leading-relaxed mb-2">
                      Ashokan Outdoors is licensed by NYC DEP to guide clients on NYC watershed properties, but permits are required to enter these lands. The NYC Watershed Permit is free.
                    </p>
                    <a href="https://a826-web01.nyc.gov/recpermitapp/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-creek-400 hover:text-creek-300 text-sm font-medium transition-colors">
                      Get your free permit <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative h-80 rounded-2xl overflow-hidden">
                <Image src="/images/casting-lesson.jpg" alt="Fly casting lesson on Catskill streams" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 66vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/50 to-transparent" />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Pricing Card */}
              <div className="glass rounded-2xl p-8 sticky top-24">
                <div className="h-1 w-full bg-forest-500 rounded-full -mt-8 mb-6 mx-[-2rem] w-[calc(100%+4rem)]" />
                <h3 className="font-display text-2xl text-white mb-6">Instruction Rates</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-stone-300">
                    <Clock className="w-5 h-5 text-forest-400" />
                    <span className="font-body">90 minutes</span>
                  </div>
                  <div className="flex items-center gap-3 text-stone-300">
                    <Users className="w-5 h-5 text-forest-400" />
                    <span className="font-body">Individual or small group</span>
                  </div>
                  <div className="flex items-center gap-3 text-stone-300">
                    <Fish className="w-5 h-5 text-forest-400" />
                    <span className="font-body">All equipment included</span>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-6 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-body text-stone-300">Each Angler</span>
                    <span className="font-display text-3xl text-white">$150</span>
                  </div>
                </div>

                <a href="/#contact" className="btn-gold w-full flex items-center justify-center gap-2">
                  <span className="relative z-10">Book Instruction</span>
                  <ArrowRight className="w-4 h-4 relative z-10" />
                </a>

                <p className="font-body text-xs text-stone-500 mt-4 text-center">
                  20% deposit required upon booking. Balance due day of trip.
                </p>
              </div>

              {/* Contact Info */}
              <div className="glass rounded-2xl p-6">
                <h4 className="font-body font-semibold text-white mb-3">Questions?</h4>
                <p className="font-body text-stone-400 text-sm mb-3">
                  Call or email us to discuss your instruction needs.
                </p>
                <a href="tel:+19172329951" className="block font-body text-creek-400 hover:text-creek-300 text-sm mb-1 transition-colors">(917) 232-9951</a>
                <a href="mailto:ashokanoutdoors@gmail.com" className="block font-body text-creek-400 hover:text-creek-300 text-sm transition-colors">ashokanoutdoors@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
