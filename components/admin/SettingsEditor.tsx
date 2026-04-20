'use client'

import { useState, useEffect } from 'react'
import { Save, Loader2, Settings } from 'lucide-react'
import { adminFetch } from '@/app/admin/dashboard'
import { useToast } from '@/app/admin/dashboard'

const SETTING_FIELDS = [
  { key: 'site_name', label: 'Site Name', placeholder: 'Ashokan Outdoors', type: 'text' },
  { key: 'tagline', label: 'Tagline', placeholder: 'Fly Fishing & Hiking in the Catskills', type: 'text' },
  { key: 'owner_name', label: 'Owner Name', placeholder: 'John Yanzek', type: 'text' },
  { key: 'owner_title', label: 'Owner Title', placeholder: 'Guide & Instructor', type: 'text' },
  { key: 'phone', label: 'Phone Number', placeholder: '(555) 123-4567', type: 'tel' },
  { key: 'email', label: 'Email Address', placeholder: 'info@ashokanoutdoors.com', type: 'email' },
  { key: 'address', label: 'Address', placeholder: 'Catskill Mountains, NY', type: 'text' },
  { key: 'instagram_url', label: 'Instagram URL', placeholder: 'https://instagram.com/ashokanoutdoors', type: 'url' },
  { key: 'facebook_url', label: 'Facebook URL', placeholder: 'https://facebook.com/ashokanoutdoors', type: 'url' },
]

export default function SettingsEditor() {
  const { addToast } = useToast()
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => { loadSettings() }, [])

  async function loadSettings() {
    setLoading(true)
    try {
      const res = await adminFetch('/api/settings')
      if (res.ok) {
        const data = await res.json()
        // Settings come back as either { key: value } or as array - handle both
        if (Array.isArray(data)) {
          const obj: Record<string, string> = {}
          data.forEach((item: { key: string; value: string }) => {
            obj[item.key] = item.value
          })
          setSettings(obj)
        } else {
          setSettings(data)
        }
      }
    } catch { /* ignore */ }
    setLoading(false)
  }

  function updateField(key: string, value: string) {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSave() {
    setSaving(true)
    try {
      const res = await adminFetch('/api/settings', {
        method: 'PUT',
        body: JSON.stringify({ settings }),
      })
      if (res.ok) {
        addToast('Settings saved successfully!', 'success')
        const data = await res.json()
        if (Array.isArray(data)) {
          const obj: Record<string, string> = {}
          data.forEach((item: { key: string; value: string }) => {
            obj[item.key] = item.value
          })
          setSettings(obj)
        } else {
          setSettings(data)
        }
      } else {
        addToast('Failed to save settings', 'error')
      }
    } catch {
      addToast('Failed to save settings', 'error')
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

  return (
    <div className="max-w-2xl">
      <div className="glass rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-forest-600/20 flex items-center justify-center">
            <Settings size={18} className="text-forest-400" />
          </div>
          <div>
            <h3 className="font-display text-lg text-white">Site Settings</h3>
            <p className="text-xs text-white/40">Configure your website&apos;s basic information</p>
          </div>
        </div>

        <div className="space-y-5">
          {SETTING_FIELDS.map((field) => (
            <div key={field.key}>
              <label className="text-sm text-white/60 block mb-1.5">{field.label}</label>
              <input
                type={field.type}
                value={settings[field.key] || ''}
                onChange={(e) => updateField(field.key, e.target.value)}
                placeholder={field.placeholder}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/25 focus:outline-none focus:border-forest-500 transition"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-8 pt-5 border-t border-white/10">
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
            <span>Save All Settings</span>
          </button>
        </div>
      </div>
    </div>
  )
}
