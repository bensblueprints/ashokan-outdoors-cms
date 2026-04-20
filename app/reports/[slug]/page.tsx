import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getPost, getPosts, getSettings } from '@/lib/db'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { ArrowLeft, ArrowRight, Calendar, User, Tag } from 'lucide-react'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return { title: 'Report Not Found' }

  return {
    title: `${post.title} | Ashokan Outdoors`,
    description: post.excerpt || `Read about ${post.title} from Ashokan Outdoors.`,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      images: post.cover_image ? [post.cover_image] : undefined,
    },
  }
}

export default async function ReportPage({ params }: PageProps) {
  const { slug } = await params
  const post = getPost(slug)
  const settings = getSettings()

  if (!post || !post.published) {
    notFound()
  }

  // Get related posts (same category, exclude current)
  const relatedPosts = getPosts(post.category, true)
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3)

  const bodyParagraphs = post.body?.split('\n\n').filter(Boolean) || []

  return (
    <main>
      <Navbar settings={settings} />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          {post.cover_image ? (
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              quality={90}
              sizes="100vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-forest-800 to-forest-950" />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/50 to-forest-950/30" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-32 w-full">
          <Link
            href="/reports"
            className="inline-flex items-center gap-2 text-sm font-body text-forest-300 hover:text-forest-200 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> All Reports
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-body font-medium bg-forest-950/60 backdrop-blur-md border border-white/10 text-forest-300 uppercase tracking-wider">
              {post.category}
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 font-body text-sm text-stone-400">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(post.created_at).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {post.excerpt && (
                <p className="font-body text-stone-300 text-xl leading-relaxed mb-8 border-l-2 border-forest-500/40 pl-6">
                  {post.excerpt}
                </p>
              )}

              <div className="space-y-6">
                {bodyParagraphs.map((para, i) => (
                  <p
                    key={i}
                    className="font-body text-stone-300 text-lg leading-relaxed"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="glass rounded-2xl p-6 sticky top-24">
                <h3 className="font-display text-xl text-white mb-4">About the Author</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-forest-500/20 flex items-center justify-center">
                    <User className="w-6 h-6 text-forest-400" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-white text-sm">{post.author}</p>
                    <p className="font-body text-stone-400 text-xs">Guide & Writer</p>
                  </div>
                </div>
                <p className="font-body text-stone-400 text-sm leading-relaxed mb-6">
                  Sharing knowledge and experiences from decades of guiding in the Catskill Mountains.
                </p>

                <a
                  href="/#contact"
                  className="inline-flex items-center gap-2 w-full justify-center px-6 py-3 rounded-lg font-body text-sm font-semibold bg-forest-500/10 border border-forest-500/30 text-forest-400 hover:bg-forest-500/20 hover:border-forest-500/50 hover:text-forest-300 transition-all duration-300"
                >
                  Book a Trip
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="glass rounded-2xl p-6">
                  <h3 className="font-display text-lg text-white mb-4">Related Reports</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((related) => (
                      <Link
                        key={related.id}
                        href={`/reports/${related.slug}`}
                        className="block group"
                      >
                        <h4 className="font-body font-semibold text-stone-300 text-sm group-hover:text-forest-300 transition-colors line-clamp-2">
                          {related.title}
                        </h4>
                        <p className="font-body text-stone-500 text-xs mt-1">
                          {new Date(related.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer settings={settings} />
    </main>
  )
}
