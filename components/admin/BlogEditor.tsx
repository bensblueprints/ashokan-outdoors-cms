'use client'

import { useState, useEffect } from 'react'
import {
  Save, Plus, Trash2, Loader2, BookOpen, Eye, EyeOff,
  ChevronLeft, ExternalLink, Fish, Mountain
} from 'lucide-react'
import { adminFetch } from '@/app/admin/dashboard'
import { useToast } from '@/app/admin/dashboard'

interface Post {
  id: string
  title: string
  slug: string
  excerpt: string | null
  body: string | null
  cover_image: string | null
  category: string
  published: number
  author: string
  created_at: string
  updated_at: string
}

const CATEGORY_OPTIONS = [
  { value: 'fishing_report', label: 'Fishing Report', icon: Fish, color: 'bg-creek-500/20 text-creek-300 border-creek-500/30' },
  { value: 'hiking_report', label: 'Hiking Report', icon: Mountain, color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
]

export default function BlogEditor() {
  const { addToast } = useToast()
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Post | null>(null)
  const [creating, setCreating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    body: '',
    cover_image: '',
    category: 'fishing_report',
    published: false,
    author: 'John Yanzek',
  })

  useEffect(() => { loadPosts() }, [])

  async function loadPosts() {
    setLoading(true)
    try {
      const res = await adminFetch('/api/posts')
      if (res.ok) setPosts(await res.json())
    } catch { /* ignore */ }
    setLoading(false)
  }

  function startEdit(post: Post) {
    setEditing(post)
    setCreating(false)
    setForm({
      title: post.title || '',
      excerpt: post.excerpt || '',
      body: post.body || '',
      cover_image: post.cover_image || '',
      category: post.category || 'fishing_report',
      published: !!post.published,
      author: post.author || 'John Yanzek',
    })
  }

  function startCreate() {
    setEditing(null)
    setCreating(true)
    setForm({
      title: '',
      excerpt: '',
      body: '',
      cover_image: '',
      category: 'fishing_report',
      published: false,
      author: 'John Yanzek',
    })
  }

  async function handleSave() {
    if (!form.title.trim()) {
      addToast('Title is required', 'error')
      return
    }
    setSaving(true)
    try {
      if (creating) {
        const res = await adminFetch('/api/posts', {
          method: 'POST',
          body: JSON.stringify(form),
        })
        if (res.ok) {
          addToast('Post created!', 'success')
          setCreating(false)
          loadPosts()
        } else {
          const err = await res.json()
          addToast(err.error || 'Failed to create post', 'error')
        }
      } else if (editing) {
        const res = await adminFetch(`/api/posts/${editing.slug}`, {
          method: 'PUT',
          body: JSON.stringify(form),
        })
        if (res.ok) {
          addToast('Post saved!', 'success')
          loadPosts()
          const updated = await res.json()
          setEditing(updated)
        } else {
          addToast('Failed to save post', 'error')
        }
      }
    } catch {
      addToast('Failed to save', 'error')
    }
    setSaving(false)
  }

  async function togglePublish(post: Post) {
    try {
      const res = await adminFetch(`/api/posts/${post.slug}`, {
        method: 'PUT',
        body: JSON.stringify({ published: !post.published }),
      })
      if (res.ok) {
        addToast(post.published ? 'Post unpublished' : 'Post published!', 'success')
        loadPosts()
        if (editing?.slug === post.slug) {
          const updated = await res.json()
          setEditing(updated)
          setForm((prev) => ({ ...prev, published: !!updated.published }))
        }
      }
    } catch {
      addToast('Failed to update', 'error')
    }
  }

  async function deletePost(slug: string) {
    try {
      const res = await adminFetch(`/api/posts/${slug}`, { method: 'DELETE' })
      if (res.ok) {
        addToast('Post deleted', 'success')
        if (editing?.slug === slug) {
          setEditing(null)
          setCreating(false)
        }
        loadPosts()
      } else {
        addToast('Failed to delete post', 'error')
      }
    } catch {
      addToast('Failed to delete post', 'error')
    }
    setDeleteConfirm(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="animate-spin text-forest-400" />
      </div>
    )
  }

  // Editor view
  if (editing || creating) {
    return (
      <div>
        <button
          onClick={() => { setEditing(null); setCreating(false) }}
          className="flex items-center gap-2 text-white/50 hover:text-white text-sm mb-6 transition cursor-pointer"
        >
          <ChevronLeft size={16} /> Back to Posts
        </button>

        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-lg text-white">
              {creating ? 'New Report' : `Edit: ${editing!.title}`}
            </h3>
            {editing && (
              <a
                href={`/blog/${editing.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-creek-400 flex items-center gap-1 hover:underline"
              >
                Preview <ExternalLink size={12} />
              </a>
            )}
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-white/60 block mb-1.5">Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-forest-500 transition"
                />
              </div>
              <div>
                <label className="text-sm text-white/60 block mb-1.5">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-forest-500 transition appearance-none cursor-pointer"
                >
                  {CATEGORY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-forest-950">{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm text-white/60 block mb-1.5">Author</label>
              <input
                type="text"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-forest-500 transition"
              />
            </div>

            <div>
              <label className="text-sm text-white/60 block mb-1.5">
                Excerpt
                <span className="text-white/30 ml-2">(short summary shown in post listing)</span>
              </label>
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-forest-500 transition resize-y"
              />
            </div>

            <div>
              <label className="text-sm text-white/60 block mb-1.5">
                Body
                <span className="text-white/30 ml-2">(supports markdown: **bold**, *italic*, ## headings, - lists)</span>
              </label>
              <textarea
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                rows={16}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-forest-500 transition resize-y font-mono text-sm leading-relaxed"
              />
            </div>

            <div>
              <label className="text-sm text-white/60 block mb-1.5">Cover Image URL</label>
              <input
                type="text"
                value={form.cover_image}
                onChange={(e) => setForm({ ...form, cover_image: e.target.value })}
                placeholder="/api/uploads/filename.jpg"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-forest-500 transition"
              />
              {form.cover_image && (
                <div className="mt-3 rounded-lg overflow-hidden border border-white/10 max-w-sm">
                  <img src={form.cover_image} alt="Cover preview" className="w-full h-auto" onError={(e) => (e.currentTarget.style.display = 'none')} />
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
              <button
                onClick={() => setForm({ ...form, published: !form.published })}
                className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${form.published ? 'bg-emerald-600' : 'bg-white/20'}`}
              >
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform ${form.published ? 'left-6' : 'left-0.5'}`} />
              </button>
              <span className="text-sm text-white/70">
                {form.published ? 'Published (visible to visitors)' : 'Draft (only visible in admin)'}
              </span>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => { setEditing(null); setCreating(false) }}
                className="px-4 py-3 text-sm text-white/50 hover:text-white transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="btn-primary flex items-center gap-2 !px-6 !py-3 disabled:opacity-50"
              >
                {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                <span>{creating ? 'Create Post' : 'Save Changes'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // List view
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-white/50 text-sm">{posts.length} post{posts.length !== 1 ? 's' : ''}</p>
        <button
          onClick={startCreate}
          className="flex items-center gap-2 px-4 py-2 bg-forest-600 text-white text-sm rounded-lg hover:bg-forest-500 transition cursor-pointer"
        >
          <Plus size={16} /> New Report
        </button>
      </div>

      <div className="space-y-3">
        {posts.map((post) => {
          const catOption = CATEGORY_OPTIONS.find((c) => c.value === post.category)
          return (
            <div key={post.id} className="glass rounded-xl p-5 hover:border-white/20 transition-all group">
              <div className="flex items-start justify-between gap-4">
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => startEdit(post)}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="font-medium text-white group-hover:text-forest-300 transition">{post.title}</h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {catOption && (
                      <span className={`px-2 py-0.5 rounded-full text-xs border ${catOption.color}`}>
                        {catOption.label}
                      </span>
                    )}
                    <span className={`px-2 py-0.5 rounded-full text-xs border ${
                      post.published
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : 'bg-white/10 text-white/40 border-white/10'
                    }`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                    <span className="text-xs text-white/30">
                      {new Date(post.updated_at).toLocaleDateString()}
                    </span>
                  </div>
                  {post.excerpt && (
                    <p className="text-sm text-white/50 line-clamp-2">{post.excerpt}</p>
                  )}
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => togglePublish(post)}
                    className="p-2 hover:bg-white/10 rounded-lg transition cursor-pointer"
                    title={post.published ? 'Unpublish' : 'Publish'}
                  >
                    {post.published ? <EyeOff size={16} className="text-white/50" /> : <Eye size={16} className="text-emerald-400" />}
                  </button>
                  {deleteConfirm === post.slug ? (
                    <div className="flex items-center gap-1">
                      <button onClick={() => deletePost(post.slug)} className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-500 transition cursor-pointer">Delete</button>
                      <button onClick={() => setDeleteConfirm(null)} className="px-2 py-1 text-xs bg-white/10 text-white rounded hover:bg-white/20 transition cursor-pointer">Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => setDeleteConfirm(post.slug)} className="p-2 hover:bg-red-500/20 rounded-lg transition cursor-pointer text-red-400/50 hover:text-red-400">
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
        {posts.length === 0 && (
          <div className="text-center py-16">
            <BookOpen size={40} className="mx-auto text-white/20 mb-4" />
            <p className="text-white/40 mb-2">No posts yet</p>
            <button
              onClick={startCreate}
              className="text-forest-400 text-sm hover:underline cursor-pointer"
            >
              Create your first fishing or hiking report
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
