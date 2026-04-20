'use client'

import { useState, useEffect } from 'react'
import { Save, Plus, Trash2, Loader2, DollarSign } from 'lucide-react'
import { adminFetch } from '@/app/admin/dashboard'
import { useToast } from '@/app/admin/dashboard'

interface Rate {
  id: number
  category: string
  label: string
  price: string
  details: string | null
  sort_order: number
  updated_at: string
}

const CATEGORY_LABELS: Record<string, string> = {
  instruction: 'Instruction',
  guiding_half_day: 'Guiding Half Day',
  guiding_full_day: 'Guiding Full Day',
  hiking_half_day: 'Hiking Half Day',
  hiking_full_day: 'Hiking Full Day',
}

const CATEGORY_COLORS: Record<string, string> = {
  instruction: 'border-creek-500/30 bg-creek-500/10',
  guiding_half_day: 'border-forest-500/30 bg-forest-500/10',
  guiding_full_day: 'border-forest-600/30 bg-forest-600/10',
  hiking_half_day: 'border-amber-500/30 bg-amber-500/10',
  hiking_full_day: 'border-amber-600/30 bg-amber-600/10',
}

export default function RateEditor() {
  const { addToast } = useToast()
  const [grouped, setGrouped] = useState<Record<string, Rate[]>>({})
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState<number | null>(null)
  const [addingTo, setAddingTo] = useState<string | null>(null)
  const [newRate, setNewRate] = useState({ label: '', price: '', details: '' })
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null)

  useEffect(() => { loadRates() }, [])

  async function loadRates() {
    setLoading(true)
    try {
      const res = await adminFetch('/api/rates')
      if (res.ok) setGrouped(await res.json())
    } catch { /* ignore */ }
    setLoading(false)
  }

  function updateLocal(id: number, field: string, value: string) {
    setGrouped((prev) => {
      const next = { ...prev }
      for (const cat of Object.keys(next)) {
        next[cat] = next[cat].map((r) =>
          r.id === id ? { ...r, [field]: value } : r
        )
      }
      return next
    })
  }

  async function saveRate(rate: Rate) {
    setSavingId(rate.id)
    try {
      const res = await adminFetch(`/api/rates/${rate.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          label: rate.label,
          price: rate.price,
          details: rate.details,
        }),
      })
      if (res.ok) {
        addToast('Rate saved!', 'success')
      } else {
        addToast('Failed to save rate', 'error')
      }
    } catch {
      addToast('Failed to save rate', 'error')
    }
    setSavingId(null)
  }

  async function addRate(category: string) {
    if (!newRate.label.trim() || !newRate.price.trim()) {
      addToast('Label and price are required', 'error')
      return
    }
    try {
      const res = await adminFetch('/api/rates', {
        method: 'POST',
        body: JSON.stringify({ category, ...newRate }),
      })
      if (res.ok) {
        addToast('Rate added!', 'success')
        setNewRate({ label: '', price: '', details: '' })
        setAddingTo(null)
        loadRates()
      } else {
        addToast('Failed to add rate', 'error')
      }
    } catch {
      addToast('Failed to add rate', 'error')
    }
  }

  async function deleteRate(id: number) {
    try {
      const res = await adminFetch(`/api/rates/${id}`, { method: 'DELETE' })
      if (res.ok) {
        addToast('Rate deleted', 'success')
        loadRates()
      } else {
        addToast('Failed to delete rate', 'error')
      }
    } catch {
      addToast('Failed to delete rate', 'error')
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

  const categories = Object.keys(CATEGORY_LABELS)

  return (
    <div className="space-y-6">
      {categories.map((cat) => {
        const rates = grouped[cat] || []
        return (
          <div key={cat} className="glass rounded-xl overflow-hidden">
            <div className={`px-5 py-3 border-b border-white/10 ${CATEGORY_COLORS[cat] || ''}`}>
              <h3 className="font-display text-base text-white flex items-center gap-2">
                <DollarSign size={16} />
                {CATEGORY_LABELS[cat] || cat}
                <span className="text-xs text-white/40 font-body ml-2">({rates.length} rate{rates.length !== 1 ? 's' : ''})</span>
              </h3>
            </div>

            <div className="p-4 space-y-3">
              {rates.map((rate) => (
                <div key={rate.id} className="bg-white/5 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs text-white/50 block mb-1">Label</label>
                      <input
                        type="text"
                        value={rate.label}
                        onChange={(e) => updateLocal(rate.id, 'label', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-forest-500 transition"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-white/50 block mb-1">Price</label>
                      <input
                        type="text"
                        value={rate.price}
                        onChange={(e) => updateLocal(rate.id, 'price', e.target.value)}
                        placeholder="$250"
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-forest-500 transition"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-white/50 block mb-1">Details</label>
                      <input
                        type="text"
                        value={rate.details || ''}
                        onChange={(e) => updateLocal(rate.id, 'details', e.target.value)}
                        placeholder="Optional details"
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-forest-500 transition"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-3">
                    {deleteConfirm === rate.id ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-red-400">Delete this rate?</span>
                        <button onClick={() => deleteRate(rate.id)} className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-500 transition cursor-pointer">Yes</button>
                        <button onClick={() => setDeleteConfirm(null)} className="px-2 py-1 text-xs bg-white/10 text-white rounded hover:bg-white/20 transition cursor-pointer">No</button>
                      </div>
                    ) : (
                      <button onClick={() => setDeleteConfirm(rate.id)} className="p-1.5 hover:bg-red-500/20 rounded transition cursor-pointer text-red-400/50 hover:text-red-400">
                        <Trash2 size={14} />
                      </button>
                    )}
                    <button
                      onClick={() => saveRate(rate)}
                      disabled={savingId === rate.id}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-forest-600 text-white text-xs rounded-lg hover:bg-forest-500 transition cursor-pointer disabled:opacity-50"
                    >
                      {savingId === rate.id ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
                      Save
                    </button>
                  </div>
                </div>
              ))}

              {rates.length === 0 && !addingTo && (
                <p className="text-white/30 text-sm text-center py-4">No rates in this category</p>
              )}

              {addingTo === cat ? (
                <div className="bg-white/5 rounded-lg p-4 border border-dashed border-white/20">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs text-white/50 block mb-1">Label *</label>
                      <input
                        type="text"
                        value={newRate.label}
                        onChange={(e) => setNewRate({ ...newRate, label: e.target.value })}
                        placeholder="e.g. 1 Person"
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-forest-500 transition"
                        autoFocus
                      />
                    </div>
                    <div>
                      <label className="text-xs text-white/50 block mb-1">Price *</label>
                      <input
                        type="text"
                        value={newRate.price}
                        onChange={(e) => setNewRate({ ...newRate, price: e.target.value })}
                        placeholder="$250"
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-forest-500 transition"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-white/50 block mb-1">Details</label>
                      <input
                        type="text"
                        value={newRate.details}
                        onChange={(e) => setNewRate({ ...newRate, details: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-forest-500 transition"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-3">
                    <button onClick={() => { setAddingTo(null); setNewRate({ label: '', price: '', details: '' }) }} className="px-3 py-1.5 text-xs text-white/50 hover:text-white transition cursor-pointer">Cancel</button>
                    <button onClick={() => addRate(cat)} className="flex items-center gap-1.5 px-3 py-1.5 bg-forest-600 text-white text-xs rounded-lg hover:bg-forest-500 transition cursor-pointer">
                      <Plus size={12} /> Add
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => { setAddingTo(cat); setNewRate({ label: '', price: '', details: '' }) }}
                  className="w-full py-2 text-xs text-white/40 hover:text-white/70 hover:bg-white/5 rounded-lg transition cursor-pointer flex items-center justify-center gap-1"
                >
                  <Plus size={14} /> Add Rate
                </button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
