import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getPosts, getSettings } from '@/lib/db'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ArrowLeft, ArrowRight, Calendar, User } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Fishing & Hiking Reports | Ashokan Outdoors',
  description:
    'Latest fishing reports, hiking conditions, and outdoor adventures from the Catskill Mountains. Stay informed about river conditions, hatches, and trail updates.',
}

export default function ReportsPage() {
  const posts = getPosts(undefined, true)
  const settings = getSettings()

  return (
    <main>
      <Navbar settings={settings} />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/fly-fishing-creek.jpg"
            alt="Catskill Mountains fishing report"
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
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4">
            Fishing & Hiking{' '}
            <span className="gradient-text">Reports</span>
          </h1>
          <p className="font-body text-lg sm:text-xl text-stone-300 max-w-2xl">
            Latest conditions, catches, and adventures from the Catskill Mountains.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-body text-stone-400 text-lg">
                No reports published yet. Check back soon for fishing and hiking updates!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/reports/${post.slug}`}
                  className="group relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.06] hover:border-forest-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_rgba(61,139,61,0.15)]"
                >
                  {/* Cover Image */}
                  <div className="relative h-52 overflow-hidden">
                    {post.cover_image ? (
                      <Image
                        src={post.cover_image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-forest-800 to-forest-950" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/40 to-transparent" />
                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-body font-medium bg-forest-950/60 backdrop-blur-md border border-white/10 text-forest-300 uppercase tracking-wider">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h2 className="font-display text-xl text-stone-100 group-hover:text-amber-400/90 transition-colors duration-500 mb-3 line-clamp-2">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="font-body text-stone-400 text-sm leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-stone-500">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-creek-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer settings={settings} />
    </main>
  )
}
