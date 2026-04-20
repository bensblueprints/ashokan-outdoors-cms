'use client'

import { useState, useEffect } from 'react'
import { Save, Plus, Trash2, ChevronUp, ChevronDown, Loader2, HelpCircle } from 'lucide-react'
import { adminFetch } from '@/app/admin/dashboard'
import { useToast } from '@/app/admin/dashboard'

interface FAQ {
  id: number
  question: string
  answer: string
  sort_order: number
  updated_at: string
}

export default function FAQEditor() {
  const { addToast } = useToast()
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState<number | null>(null)
  const [adding, setAdding] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newFaq, setNewFaq] = useState({ question: '', answer: '' })
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null)

  useEffect(() => { loadFaqs() }, [])

  async function loadFaqs() {
    setLoading(true)
    try {
      const res = await adminFetch('/api/faqs')
      if (res.ok) setFaqs(await res.json())
    } catch { /* ignore */ }
    setLoading(false)
  }

  function updateLocal(id: number, field: string, value: string) {
    setFaqs((prev) => prev.map((f) => (f.id === id ? { ...f, [field]: value } : f)))
  }

  async function saveFaq(faq: FAQ) {
    setSavingId(faq.id)
    try {
      const res = await adminFetch(`/api/faqs/${faq.id}`, {
        method: 'PUT',
        body: JSON.stringify({ question: faq.question, answer: faq.answer }),
      })
      if (res.ok) {
        addToast('FAQ saved!', 'success')
      } else {
        addToast('Failed to save FAQ', 'error')
      }
    } catch {
      addToast('Failed to save FAQ', 'error')
    }
    setSavingId(null)
  }

  async function addFaq() {
    if (!newFaq.question.trim() || !newFaq.answer.trim()) {
      addToast('Question and answer are required', 'error')
      return
    }
    setAdding(true)
    try {
      const res = await adminFetch('/api/faqs', {
        method: 'POST',
        body: JSON.stringify(newFaq),
      })
      if (res.ok) {
        addToast('FAQ added!', 'success')
        setNewFaq({ question: '', answer: '' })
        setShowAddForm(false)
        loadFaqs()
      } else {
        addToast('Failed to add FAQ', 'error')
      }
    } catch {
      addToast('Failed to add FAQ', 'error')
    }
    setAdding(false)
  }

  async function deleteFaq(id: number) {
    try {
      const res = await adminFetch(`/api/faqs/${id}`, { method: 'DELETE' })
      if (res.ok) {
        addToast('FAQ deleted', 'success')
        setFaqs((prev) => prev.filter((f) => f.id !== id))
      } else {
        addToast('Failed to delete FAQ', 'error')
      }
    } catch {
      addToast('Failed to delete FAQ', 'error')
    }
    setDeleteConfirm(null)
  }

  async function reorder(id: number, direction: 'up' | 'down') {
    const idx = faqs.findIndex((f) => f.id === id)
    if ((direction === 'up' && idx === 0) || (direction === 'down' && idx === faqs.length - 1)) return

    const newList = [...faqs]
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1
    ;[newList[idx], newList[swapIdx]] = [newList[swapIdx], newList[idx]]
    setFaqs(newList)

    try {
      await adminFetch('/api/faqs', {
        method: 'PUT',
        body: JSON.stringify({ order: newList.map((f) => f.id) }),
      })
      addToast('Order updated', 'success')
    } catch {
      addToast('Failed to reorder', 'error')
      loadFaqs()
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="animate-spin text-forest-400" />
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {faqs.map((faq, idx) => (
        <div key={faq.id} className="glass rounded-xl p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <HelpCircle size={16} className="text-amber-400/60" />
              <span className="text-xs text-white/30">#{idx + 1}</span>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => reorder(faq.id, 'up')} disabled={idx === 0} className="p-1 hover:bg-white/10 rounded transition cursor-pointer disabled:opacity-20">
                <ChevronUp size={14} />
              </button>
              <button onClick={() => reorder(faq.id, 'down')} disabled={idx === faqs.length - 1} className="p-1 hover:bg-white/10 rounded transition cursor-pointer disabled:opacity-20">
                <ChevronDown size={14} />
              </button>
              {deleteConfirm === faq.id ? (
                <div className="flex items-center gap-2 ml-2">
                  <span className="text-xs text-red-400">Delete?</span>
                  <button onClick={() => deleteFaq(faq.id)} className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-500 transition cursor-pointer">Yes</button>
                  <button onClick={() => setDeleteConfirm(null)} className="px-2 py-1 text-xs bg-white/10 text-white rounded hover:bg-white/20 transition cursor-pointer">No</button>
                </div>
              ) : (
                <button onClick={() => setDeleteConfirm(faq.id)} className="p-1 hover:bg-red-500/20 rounded transition cursor-pointer text-red-400/50 hover:text-red-400 ml-1">
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-white/50 block mb-1">Question</label>
              <input
                type="text"
                value={faq.question}
                onChange={(e) => updateLocal(faq.id, 'question', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-forest-500 transition"
              />
            </div>
            <div>
              <label className="text-xs text-white/50 block mb-1">Answer</label>
              <textarea
                value={faq.answer}
                onChange={(e) => updateLocal(faq.id, 'answer', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-forest-500 transition resize-y"
              />
            </div>
          </div>

          <div className="flex justify-end mt-3">
            <button
              onClick={() => saveFaq(faq)}
              disabled={savingId === faq.id}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-forest-600 text-white text-xs rounded-lg hover:bg-forest-500 transition cursor-pointer disabled:opacity-50"
            >
              {savingId === faq.id ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
              Save
            </button>
          </div>
        </div>
      ))}

      {showAddForm ? (
        <div className="glass rounded-xl p-5 border-dashed !border-white/20">
          <h3 className="font-display text-base text-white mb-4">New FAQ</h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-white/50 block mb-1">Question *</label>
              <input
                type="text"
                value={newFaq.question}
                onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-forest-500 transition"
                autoFocus
              />
            </div>
            <div>
              <label className="text-xs text-white/50 block mb-1">Answer *</label>
              <textarea
                value={newFaq.answer}
                onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-forest-500 transition resize-y"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button onClick={() => { setShowAddForm(false); setNewFaq({ question: '', answer: '' }) }} className="px-4 py-2 text-sm text-white/50 hover:text-white transition cursor-pointer">Cancel</button>
            <button
              onClick={addFaq}
              disabled={adding}
              className="flex items-center gap-2 px-4 py-2 bg-forest-600 text-white text-sm rounded-lg hover:bg-forest-500 transition cursor-pointer disabled:opacity-50"
            >
              {adding ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
              Add FAQ
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowAddForm(true)}
          className="w-full glass rounded-xl p-4 border-dashed !border-white/20 text-white/40 hover:text-white/70 hover:border-white/30 transition cursor-pointer flex items-center justify-center gap-2 text-sm"
        >
          <Plus size={16} /> Add New FAQ
        </button>
      )}
    </div>
  )
}
