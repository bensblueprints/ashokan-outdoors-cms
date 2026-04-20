'use client'

import { useState, useEffect } from 'react'
import { Save, FileText, ChevronLeft, Clock, Loader2 } from 'lucide-react'
import { adminFetch } from '@/app/admin/dashboard'
import { useToast } from '@/app/admin/dashboard'

interface Section {
  slug: string
  title: string
  subtitle: string | null
  body: string | null
  image: string | null
  updated_at: string
}

const SECTION_LABELS: Record<string, string> = {
  hero: 'Hero Banner',
  about: 'About Section',
  catskill_fly_fishing: 'Catskill Fly Fishing',
  before_you_fish: 'Before You Fish',
}

export default function SectionEditor() {
  const { addToast } = useToast()
  const [sections, setSections] = useState<Section[]>([])
  const [editing, setEditing] = useState<Section | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    body: '',
    image: '',
  })

  useEffect(() => {
    loadSections()
  }, [])

  async function loadSections() {
    setLoading(true)
    try {
      const res = await adminFetch('/api/sections')
      if (res.ok) setSections(await res.json())
    } catch { /* ignore */ }
    setLoading(false)
  }

  function startEdit(section: Section) {
    setEditing(section)
    setForm({
      title: section.title || '',
      subtitle: section.subtitle || '',
      body: section.body || '',
      image: section.image || '',
    })
  }

  async function handleSave() {
    if (!editing) return
    setSaving(true)
    try {
      const res = await adminFetch(`/api/sections/${editing.slug}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: form.title || undefined,
          subtitle: form.subtitle || undefined,
          body: form.body || undefined,
          image: form.image || undefined,
        }),
      })
      if (res.ok) {
        addToast('Section saved successfully!', 'success')
        const updated = await res.json()
        setSections((prev) => prev.map((s) => (s.slug === updated.slug ? updated : s)))
        setEditing(updated)
      } else {
        const err = await res.json()
        addToast(err.error || 'Failed to save section', 'error')
      }
    } catch {
      addToast('Failed to save section', 'error')
    }
    setSaving(false)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="animate-spin text-forest-400" />
      </div>
    )
  }

  if (editing) {
    return (
      <div>
        <button
          onClick={() => setEditing(null)}
          className="flex items-center gap-2 text-white/50 hover:text-white text-sm mb-6 transition cursor-pointer"
        >
          <ChevronLeft size={16} /> Back to Sections
        </button>

        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-lg text-white">
              {SECTION_LABELS[editing.slug] || editing.slug}
            </h3>
            {editing.updated_at && (
              <span className="text-xs text-white/40 flex items-center gap-1">
                <Clock size={12} />
                Last updated: {new Date(editing.updated_at).toLocaleString()}
              </span>
            )}
          </div>

          <div className="space-y-5">
            <div>
              <label className="text-sm text-white/60 block mb-1.5">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-forest-500 transition"
              />
            </div>

            <div>
              <label className="text-sm text-white/60 block mb-1.5">Subtitle</label>
              <input
                type="text"
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-forest-500 transition"
              />
            </div>

            <div>
              <label className="text-sm text-white/60 block mb-1.5">
                Body Content
                <span className="text-white/30 ml-2">(separate paragraphs with blank lines)</span>
              </label>
              <textarea
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
                rows={12}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-forest-500 transition resize-y font-mono text-sm leading-relaxed"
              />
            </div>

            <div>
              <label className="text-sm text-white/60 block mb-1.5">Image URL</label>
              <input
                type="text"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="/api/uploads/filename.jpg or external URL"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-forest-500 transition"
              />
              {form.image && (
                <div className="mt-3 rounded-lg overflow-hidden border border-white/10 max-w-xs">
                  <img src={form.image} alt="Preview" className="w-full h-auto" onError={(e) => (e.currentTarget.style.display = 'none')} />
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={handleSave}
                disabled={saving}
                className="btn-primary flex items-center gap-2 !px-6 !py-3 disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Save size={18} />
                )}
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {sections.map((section) => (
        <button
          key={section.slug}
          onClick={() => startEdit(section)}
          className="w-full glass rounded-xl p-5 hover:border-white/20 transition-all text-left cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-forest-600/20 flex items-center justify-center">
                <FileText size={18} className="text-forest-400" />
              </div>
              <div>
                <p className="font-medium text-white group-hover:text-forest-300 transition">
                  {SECTION_LABELS[section.slug] || section.slug}
                </p>
                <p className="text-sm text-white/40 mt-0.5">
                  {section.title || 'No title set'}
                </p>
              </div>
            </div>
            <ChevronLeft size={18} className="text-white/30 rotate-180 group-hover:text-white/60 transition" />
          </div>
        </button>
      ))}
      {sections.length === 0 && (
        <p className="text-center text-white/40 py-12">No sections found</p>
      )}
    </div>
  )
}
