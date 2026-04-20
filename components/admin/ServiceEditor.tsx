'use client'

import { useState, useEffect } from 'react'
import { Save, Plus, Trash2, ChevronUp, ChevronDown, Loader2, Briefcase } from 'lucide-react'
import { adminFetch } from '@/app/admin/dashboard'
import { useToast } from '@/app/admin/dashboard'

interface Service {
  id: number
  title: string
  description: string | null
  image: string | null
  icon: string | null
  href: string | null
  sort_order: number
  updated_at: string
}

export default function ServiceEditor() {
  const { addToast } = useToast()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [savingId, setSavingId] = useState<number | null>(null)
  const [adding, setAdding] = useState(false)
  const [newService, setNewService] = useState({ title: '', description: '', image: '', href: '' })
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null)

  useEffect(() => { loadServices() }, [])

  async function loadServices() {
    setLoading(true)
    try {
      const res = await adminFetch('/api/services')
      if (res.ok) setServices(await res.json())
    } catch { /* ignore */ }
    setLoading(false)
  }

  function updateLocal(id: number, field: string, value: string) {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    )
  }

  async function saveService(service: Service) {
    setSavingId(service.id)
    try {
      const res = await adminFetch(`/api/services/${service.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title: service.title,
          description: service.description,
          image: service.image,
          href: service.href,
        }),
      })
      if (res.ok) {
        addToast('Service saved!', 'success')
      } else {
        addToast('Failed to save service', 'error')
      }
    } catch {
      addToast('Failed to save service', 'error')
    }
    setSavingId(null)
  }

  async function addService() {
    if (!newService.title.trim()) {
      addToast('Title is required', 'error')
      return
    }
    setAdding(true)
    try {
      const res = await adminFetch('/api/services', {
        method: 'POST',
        body: JSON.stringify(newService),
      })
      if (res.ok) {
        addToast('Service added!', 'success')
        setNewService({ title: '', description: '', image: '', href: '' })
        loadServices()
      } else {
        addToast('Failed to add service', 'error')
      }
    } catch {
      addToast('Failed to add service', 'error')
    }
    setAdding(false)
  }

  async function deleteService(id: number) {
    try {
      const res = await adminFetch(`/api/services/${id}`, { method: 'DELETE' })
      if (res.ok) {
        addToast('Service deleted', 'success')
        setServices((prev) => prev.filter((s) => s.id !== id))
      } else {
        addToast('Failed to delete service', 'error')
      }
    } catch {
      addToast('Failed to delete service', 'error')
    }
    setDeleteConfirm(null)
  }

  async function reorder(id: number, direction: 'up' | 'down') {
    const idx = services.findIndex((s) => s.id === id)
    if ((direction === 'up' && idx === 0) || (direction === 'down' && idx === services.length - 1)) return

    const newList = [...services]
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1
    ;[newList[idx], newList[swapIdx]] = [newList[swapIdx], newList[idx]]
    setServices(newList)

    try {
      await adminFetch('/api/services', {
        method: 'PUT',
        body: JSON.stringify({ order: newList.map((s) => s.id) }),
      })
      addToast('Order updated', 'success')
    } catch {
      addToast('Failed to reorder', 'error')
      loadServices()
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
    <div className="space-y-4">
      {services.map((service, idx) => (
        <div key={service.id} className="glass rounded-xl p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-forest-600/20 flex items-center justify-center text-forest-400 text-sm font-bold">
                {idx + 1}
              </div>
              <Briefcase size={18} className="text-white/40" />
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => reorder(service.id, 'up')} disabled={idx === 0} className="p-1.5 hover:bg-white/10 rounded transition cursor-pointer disabled:opacity-20">
                <ChevronUp size={16} />
              </button>
              <button onClick={() => reorder(service.id, 'down')} disabled={idx === services.length - 1} className="p-1.5 hover:bg-white/10 rounded transition cursor-pointer disabled:opacity-20">
                <ChevronDown size={16} />
              </button>
              {deleteConfirm === service.id ? (
                <div className="flex items-center gap-2 ml-2">
                  <span className="text-xs text-red-400">Delete?</span>
                  <button onClick={() => deleteService(service.id)} className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-500 transition cursor-pointer">Yes</button>
                  <button onClick={() => setDeleteConfirm(null)} className="px-2 py-1 text-xs bg-white/10 text-white rounded hover:bg-white/20 transition cursor-pointer">No</button>
                </div>
              ) : (
                <button onClick={() => setDeleteConfirm(service.id)} className="p-1.5 hover:bg-red-500/20 rounded transition cursor-pointer text-red-400/50 hover:text-red-400 ml-2">
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-white/50 block mb-1">Title</label>
              <input
                type="text"
                value={service.title || ''}
                onChange={(e) => updateLocal(service.id, 'title', e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-forest-500 transition"
              />
            </div>
            <div>
              <label className="text-xs text-white/50 block mb-1">Link (href)</label>
              <input
                type="text"
                value={service.href || ''}
                onChange={(e) => updateLocal(service.id, 'href', e.target.value)}
                placeholder="/fly-fishing-guiding"
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-forest-500 transition"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-white/50 block mb-1">Description</label>
              <textarea
                value={service.description || ''}
                onChange={(e) => updateLocal(service.id, 'description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-forest-500 transition resize-y"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs text-white/50 block mb-1">Image URL</label>
              <input
                type="text"
                value={service.image || ''}
                onChange={(e) => updateLocal(service.id, 'image', e.target.value)}
                placeholder="/api/uploads/filename.jpg"
                className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-forest-500 transition"
              />
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={() => saveService(service)}
              disabled={savingId === service.id}
              className="flex items-center gap-2 px-4 py-2 bg-forest-600 text-white text-sm rounded-lg hover:bg-forest-500 transition cursor-pointer disabled:opacity-50"
            >
              {savingId === service.id ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
              Save
            </button>
          </div>
        </div>
      ))}

      {/* Add new service */}
      <div className="glass rounded-xl p-5 border-dashed !border-white/20">
        <h3 className="font-display text-base text-white mb-4 flex items-center gap-2">
          <Plus size={18} className="text-forest-400" /> Add New Service
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-white/50 block mb-1">Title *</label>
            <input
              type="text"
              value={newService.title}
              onChange={(e) => setNewService({ ...newService, title: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-forest-500 transition"
            />
          </div>
          <div>
            <label className="text-xs text-white/50 block mb-1">Link (href)</label>
            <input
              type="text"
              value={newService.href}
              onChange={(e) => setNewService({ ...newService, href: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-forest-500 transition"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs text-white/50 block mb-1">Description</label>
            <textarea
              value={newService.description}
              onChange={(e) => setNewService({ ...newService, description: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-forest-500 transition resize-y"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs text-white/50 block mb-1">Image URL</label>
            <input
              type="text"
              value={newService.image}
              onChange={(e) => setNewService({ ...newService, image: e.target.value })}
              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-forest-500 transition"
            />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={addService}
            disabled={adding}
            className="flex items-center gap-2 px-4 py-2 bg-forest-600 text-white text-sm rounded-lg hover:bg-forest-500 transition cursor-pointer disabled:opacity-50"
          >
            {adding ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
            Add Service
          </button>
        </div>
      </div>
    </div>
  )
}
