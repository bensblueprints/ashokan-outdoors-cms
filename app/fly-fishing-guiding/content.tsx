'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, CheckCircle, Fish, MapPin, Clock, Users, Compass } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const halfDay = [
  { anglers: 'One Angler', price: '$400' },
  { anglers: 'Two Anglers', price: '$500' },
  { anglers: 'Three Anglers', price: '$750', note: '*' },
  { anglers: 'Four Anglers', price: '$900', note: '*' },
]

const fullDay = [
  { anglers: 'One Angler', price: '$550' },
  { anglers: 'Two Anglers', price: '$750' },
  { anglers: 'Three Anglers', price: '$900', note: '*' },
  { anglers: 'Four Anglers', price: '$1000', note: '*' },
]

export default function PageContent() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/fly-fishing-guide.jpg" alt="Guided fly fishing on the Esopus Creek" fill className="object-cover" priority quality={90} sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/50 to-forest-950/30" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-32 w-full">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-body text-forest-300 hover:text-forest-200 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4">
            Guided Fly Fishing <span className="gradient-text">in the Catskills</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="font-body text-lg sm:text-xl text-stone-300 max-w-2xl">
            Fish legendary Catskill streams with expert local guides who&apos;ve spent three decades mastering these waters.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-display text-3xl text-white mb-6">Fish the Birthplace of American Fly Fishing</h2>
                <p className="font-body text-stone-300 text-lg leading-relaxed mb-6">
                  Experience the thrill of fly fishing on the legendary rivers and streams of the Catskills. Our expert guides will help you discover and navigate these pristine waters, ensuring you safely make the most of your fishing adventure. We provide all rods, reels, and flies you will need to catch a trout on a fly. Join us for an unforgettable day on the water, surrounded by breathtaking scenery.
                </p>
                <p className="font-body text-stone-300 text-lg leading-relaxed mb-6">
                  The Catskill region of New York&apos;s Hudson Valley is often called the &ldquo;Birthplace of American Fly Fishing,&rdquo; a title earned through its pristine waters, rich history, and legendary anglers. Some of the most famous trout streams in the country flow through these mountains, including the Beaverkill, Willowemoc, Esopus Creek, and Neversink River — all known for their wild and stocked trout populations.
                </p>
                <p className="font-body text-stone-300 text-lg leading-relaxed">
                  The Catskills&apos; cold, oxygen-rich waters support thriving populations of brook, brown, and rainbow trout, providing anglers with the opportunity to test their skills against fish that are as cunning as they are beautiful.
                </p>
              </div>

              {/* Waters We Fish */}
              <div className="glass rounded-2xl p-8">
                <h3 className="font-display text-2xl text-white mb-6">Waters We Fish</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { name: 'Esopus Creek', desc: 'Wild rainbow & brown trout, trophy fish 20"+' },
                    { name: 'Woodland Valley Creek', desc: 'Pristine mountain stream, native brook trout' },
                    { name: 'Rondout Creek', desc: 'Scenic freestone stream with diverse hatches' },
                    { name: 'Peekamoose Valley Streams', desc: 'Remote, less-traveled tributaries' },
                    { name: 'Bush Kill Creek', desc: 'Flows into Upper Ashokan Reservoir' },
                    { name: 'Ashokan Reservoir', desc: 'NYC Watershed permit required (free)' },
                  ].map((water, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <MapPin className="w-5 h-5 text-creek-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-body font-semibold text-white text-sm">{water.name}</p>
                        <p className="font-body text-stone-400 text-xs">{water.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image Gallery */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-64 rounded-2xl overflow-hidden">
                  <Image src="/images/esopus-rainbow.jpg" alt="Rainbow trout caught in the Esopus Creek" fill className="object-cover" sizes="50vw" />
                </div>
                <div className="relative h-64 rounded-2xl overflow-hidden">
                  <Image src="/images/fall-fishing.jpg" alt="Fall fly fishing on Catskill streams" fill className="object-cover" sizes="50vw" />
                </div>
                <div className="relative h-64 col-span-2 rounded-2xl overflow-hidden">
                  <Image src="/images/fly-fishing-creek.jpg" alt="Fly fishing a pristine Catskill creek" fill className="object-cover" sizes="100vw" />
                </div>
              </div>

              {/* What's Included */}
              <div>
                <h3 className="font-display text-2xl text-white mb-4">What&apos;s Included</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    'Fishing rods, reels, lines & flies',
                    'Snacks and drinks',
                    'Lunch (full day trips)',
                    'Chest waders and boots',
                    'Expert local guide knowledge',
                    'Fish identification & insect matching',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-forest-400 flex-shrink-0" />
                      <span className="font-body text-stone-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Species */}
              <div className="glass rounded-2xl p-8">
                <h3 className="font-display text-2xl text-white mb-6">Target Species</h3>
                <div className="grid sm:grid-cols-3 gap-6">
                  {[
                    { name: 'Rainbow Trout', desc: 'Wild populations in the Esopus, averaging 8-12" with trophy fish 20"+', color: 'text-creek-400' },
                    { name: 'Brown Trout', desc: 'Over 200,000 stocked annually by NYSDEC. Cunning and challenging.', color: 'text-amber-400' },
                    { name: 'Brook Trout', desc: 'Native to Catskill streams. Found in cold, oxygen-rich headwaters.', color: 'text-forest-400' },
                  ].map((fish, i) => (
                    <div key={i} className="text-center">
                      <Fish className={`w-8 h-8 ${fish.color} mx-auto mb-3`} />
                      <h4 className="font-display text-lg text-white mb-2">{fish.name}</h4>
                      <p className="font-body text-stone-400 text-sm">{fish.desc}</p>
                    </div>
                  ))}
                </div>
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
                      Required to enter NYC watershed properties. Ashokan Outdoors is licensed by NYC DEP to guide on these lands. The permit is free.
                    </p>
                    <a href="https://a826-web01.nyc.gov/recpermitapp/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-creek-400 hover:text-creek-300 text-sm font-medium transition-colors">
                      Get your free permit <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Experience Levels */}
              <div>
                <h3 className="font-display text-2xl text-white mb-4">For All Experience Levels</h3>
                <div className="space-y-4">
                  <div className="glass rounded-xl p-6">
                    <h4 className="font-body font-semibold text-forest-400 mb-2">Experienced Anglers</h4>
                    <p className="font-body text-stone-300 text-sm">
                      We understand that the experienced angler values time on the water above all else. We&apos;ll guide you to great (some remote) spots, show you what insects the fish are interested in, and get out of your way.
                    </p>
                  </div>
                  <div className="glass rounded-xl p-6">
                    <h4 className="font-body font-semibold text-creek-400 mb-2">Beginners</h4>
                    <p className="font-body text-stone-300 text-sm">
                      We love teaching beginners. It is a great feeling to help a beginning angler catch their first trout on a fly. We&apos;ll provide patient, hands-on instruction every step of the way.
                    </p>
                  </div>
                  <div className="glass rounded-xl p-6">
                    <h4 className="font-body font-semibold text-amber-400 mb-2">Mixed Groups</h4>
                    <p className="font-body text-stone-300 text-sm">
                      One guide can usually handle up to three people. Beyond that, we&apos;ll arrange a second guide to make sure everyone gets the attention they require.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="glass rounded-2xl p-8 sticky top-24">
                <div className="h-1 w-full bg-creek-400 rounded-full -mt-8 mb-6 mx-[-2rem] w-[calc(100%+4rem)]" />
                <h3 className="font-display text-2xl text-white mb-6">Guiding Rates</h3>

                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-creek-400" />
                    <span className="font-body text-xs tracking-[0.15em] uppercase text-creek-400 font-medium">Half Day</span>
                  </div>
                  {halfDay.map((r) => (
                    <div key={r.anglers} className="flex justify-between py-2 border-b border-white/5 last:border-0">
                      <span className="font-body text-stone-300 text-sm">{r.anglers}</span>
                      <span className="font-display text-lg text-white">{r.price}{r.note && <sup className="text-amber-500 text-xs ml-0.5">{r.note}</sup>}</span>
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Compass className="w-4 h-4 text-creek-400" />
                    <span className="font-body text-xs tracking-[0.15em] uppercase text-creek-400 font-medium">Full Day</span>
                  </div>
                  {fullDay.map((r) => (
                    <div key={r.anglers} className="flex justify-between py-2 border-b border-white/5 last:border-0">
                      <span className="font-body text-stone-300 text-sm">{r.anglers}</span>
                      <span className="font-display text-lg text-white">{r.price}{r.note && <sup className="text-amber-500 text-xs ml-0.5">{r.note}</sup>}</span>
                    </div>
                  ))}
                </div>

                <p className="font-body text-xs text-stone-500 italic mb-6">* May require two guides</p>

                <a href="/#contact" className="btn-gold w-full flex items-center justify-center gap-2">
                  <span className="relative z-10">Book a Trip</span>
                  <ArrowRight className="w-4 h-4 relative z-10" />
                </a>

                <p className="font-body text-xs text-stone-500 mt-4 text-center">
                  20% deposit required. Balance due day of trip.
                </p>
              </div>

              <div className="glass rounded-2xl p-6">
                <h4 className="font-body font-semibold text-white mb-3">Questions?</h4>
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
