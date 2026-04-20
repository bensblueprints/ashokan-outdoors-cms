'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, CheckCircle, Mountain, MapPin, Clock, Users, Shield, TreePine } from 'lucide-react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const peaks = [
  { name: 'Slide Mountain', elevation: "4,190'", desc: 'Highest peak in the Catskills. Spectacular views of the Hudson Valley.' },
  { name: 'Peekamoose Mountain', elevation: "3,843'", desc: 'Remote wilderness peak with pristine forest trails.' },
  { name: 'Wittenberg Mountain', elevation: "3,780'", desc: 'Part of the Burroughs Range with stunning ledge views.' },
  { name: 'Cornell Mountain', elevation: "3,860'", desc: 'Challenging scramble with rewarding summit panoramas.' },
  { name: 'Table Mountain', elevation: "3,847'", desc: 'Flat-topped summit with dense spruce-fir forest.' },
  { name: 'Ashokan High Point', elevation: "3,080'", desc: 'Panoramic Reservoir views. Plane wreck site on trail.' },
]

export default function PageContent() {
  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/hiking.jpg" alt="Guided hiking in the Catskill Mountains" fill className="object-cover" priority quality={90} sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/50 to-forest-950/30" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-32 w-full">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-body text-forest-300 hover:text-forest-200 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4">
            Guided Catskill <span className="gradient-text">Hikes</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="font-body text-lg sm:text-xl text-stone-300 max-w-2xl">
            Summit breathtaking Catskill peaks with certified guides who know every trail and ridge.
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
                <h2 className="font-display text-3xl text-white mb-6">Explore the Catskill High Peaks</h2>
                <p className="font-body text-stone-300 text-lg leading-relaxed mb-6">
                  Discover the breathtaking beauty of the Catskill High Peaks, or opt for a more manageable hiking experience tailored to your preferences. Our trained and certified hiking guides prioritize your safety and preparation to ensure a worry-free adventure. Join us for an unforgettable journey where you can immerse yourself into the great Catskill outdoors.
                </p>
                <p className="font-body text-stone-300 text-lg leading-relaxed mb-6">
                  Ashokan Outdoors is perfectly situated at the foot of the Burroughs Range — a series of mountains and trails that hold some of the best hiking and nature one can experience in the Catskills. Whether you want to summit a 3,500-foot Catskill Peak or take a more leisurely hike, our guides know great trails and would be happy to help you choose a suitable hike, prepare your route, and prioritize safety.
                </p>
              </div>

              {/* Peaks Grid */}
              <div className="glass rounded-2xl p-8">
                <h3 className="font-display text-2xl text-white mb-6">Peaks &amp; Trails We Guide</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {peaks.map((peak, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-forest-500/20 transition-colors">
                      <div className="flex items-start gap-3">
                        <Mountain className="w-5 h-5 text-forest-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-body font-semibold text-white text-sm">{peak.name}</p>
                          <p className="font-body text-amber-400 text-xs mb-1">{peak.elevation}</p>
                          <p className="font-body text-stone-400 text-xs">{peak.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image */}
              <div className="relative h-80 rounded-2xl overflow-hidden">
                <Image src="/images/catskill-stream.jpg" alt="Catskill Mountain hiking trails" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 66vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/40 to-transparent" />
              </div>

              {/* Guide Credentials */}
              <div>
                <h3 className="font-display text-2xl text-white mb-6">Your Safety Is Our Priority</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { icon: Shield, label: 'NYS Licensed', desc: 'Licensed New York State Outdoor Guides' },
                    { icon: CheckCircle, label: 'CPR Certified', desc: 'Trained in CPR, Water Safety & First Aid' },
                    { icon: TreePine, label: 'Leave No Trace', desc: 'Committed to preserving wilderness beauty' },
                  ].map((cred, i) => (
                    <div key={i} className="glass rounded-xl p-5 text-center">
                      <cred.icon className="w-8 h-8 text-forest-400 mx-auto mb-3" />
                      <h4 className="font-body font-semibold text-white text-sm mb-1">{cred.label}</h4>
                      <p className="font-body text-stone-400 text-xs">{cred.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Difficulty Levels */}
              <div className="glass rounded-2xl p-8">
                <h3 className="font-display text-2xl text-white mb-6">Hikes for Every Level</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 rounded-full bg-forest-400 mt-1.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-body font-semibold text-forest-400 mb-1">Easy Access</h4>
                      <p className="font-body text-stone-300 text-sm">Fairly flat entries and gentle trails — perfect for families and casual hikers.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-body font-semibold text-amber-400 mb-1">Moderate</h4>
                      <p className="font-body text-stone-300 text-sm">Established trails to scenic viewpoints and summits. Good fitness required.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-body font-semibold text-red-400 mb-1">Challenging</h4>
                      <p className="font-body text-stone-300 text-sm">Off-grid spots requiring substantial hiking, scrambles, and bushwhacks. For the adventurous.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* What to Bring */}
              <div>
                <h3 className="font-display text-2xl text-white mb-4">What to Bring</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    'Sturdy hiking boots/shoes',
                    'Layered clothing (weather changes fast)',
                    'Rain jacket',
                    'Water bottle',
                    'Sunscreen & insect repellent',
                    'Hat with brim',
                    'Snacks/energy bars',
                    'Waterproof phone case',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-forest-400 flex-shrink-0" />
                      <span className="font-body text-stone-300 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cell Service Note */}
              <div className="glass rounded-xl p-6 border-amber-500/20">
                <p className="font-body text-stone-300 text-sm">
                  <span className="text-amber-400 font-semibold">Cell Service Note:</span> Cellular phone service can be sketchy in the Catskills and in many of the areas we will be hiking it will be non-existent. Around the Ashokan Reservoir you will get service until just past Boiceville with occasional service in Phoenicia. Be prepared to be off the network for a while.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="glass rounded-2xl p-8 sticky top-24">
                <div className="h-1 w-full bg-amber-500 rounded-full -mt-8 mb-6 mx-[-2rem] w-[calc(100%+4rem)]" />
                <h3 className="font-display text-2xl text-white mb-6">Hiking Rates</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-stone-300">
                    <Users className="w-5 h-5 text-amber-400" />
                    <span className="font-body">Small Group (4 or less)</span>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-4 space-y-4 mb-6">
                  <div className="flex justify-between items-center py-2">
                    <div>
                      <span className="font-body text-stone-300">Half Day</span>
                      <span className="block text-xs text-stone-500">~4 hours</span>
                    </div>
                    <span className="font-display text-2xl text-white">$250</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-t border-white/5">
                    <div>
                      <span className="font-body text-stone-300">Full Day</span>
                      <span className="block text-xs text-stone-500">~8 hours</span>
                    </div>
                    <span className="font-display text-2xl text-white">$400</span>
                  </div>
                </div>

                <p className="font-body text-xs text-stone-500 italic mb-6">
                  Custom group rates with additional guides available upon request.
                </p>

                <a href="/#contact" className="btn-gold w-full flex items-center justify-center gap-2">
                  <span className="relative z-10">Book a Hike</span>
                  <ArrowRight className="w-4 h-4 relative z-10" />
                </a>

                <p className="font-body text-xs text-stone-500 mt-4 text-center">
                  20% deposit required. Balance due day of trip.
                </p>

                <div className="border-t border-white/10 mt-6 pt-4">
                  <p className="font-body text-stone-400 text-xs text-center">
                    Personalized gift certificates available for full and half day trips or for a specified amount.
                  </p>
                </div>
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
