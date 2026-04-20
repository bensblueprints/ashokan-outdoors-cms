'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, User } from 'lucide-react'

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string | null
  cover_image: string | null
  category: string
  author: string
  created_at: string
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function RecentReports({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null

  return (
    <section
      id="reports"
      aria-label="Recent Fishing and Hiking Reports"
      className="section-padding relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-forest-500/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-forest-400 font-body font-semibold tracking-widest uppercase text-sm mb-4">
            From the Field
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6">
            Latest{' '}
            <span className="gradient-text">Reports</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-forest-500 to-creek-400 mx-auto rounded-full" />
        </motion.div>

        {/* Posts grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {posts.slice(0, 3).map((post) => (
            <motion.div key={post.id} variants={itemVariants}>
              <Link
                href={`/reports/${post.slug}`}
                className="group relative block rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.06] hover:border-forest-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_rgba(61,139,61,0.15)]"
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
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-body font-medium bg-forest-950/60 backdrop-blur-md border border-white/10 text-forest-300 uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display text-xl text-stone-100 group-hover:text-amber-400/90 transition-colors duration-500 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
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
            </motion.div>
          ))}
        </motion.div>

        {/* View all link */}
        {posts.length > 3 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link
              href="/reports"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white/[0.05] border border-white/[0.08] hover:border-forest-500/30 hover:bg-white/[0.08] text-stone-300 hover:text-white font-body font-semibold transition-all duration-300 group"
            >
              View All Reports
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  )
}
