'use client'

import { useState, useEffect, useRef } from 'react'
import { Upload, Trash2, Loader2, Copy, Check, Image as ImageIcon, X } from 'lucide-react'
import { adminFetch, getPassword } from '@/app/admin/dashboard'
import { useToast } from '@/app/admin/dashboard'

interface ImageRecord {
  id: string
  filename: string
  original_name: string
  alt: string
  size: number
  uploaded_at: string
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function ImageManager() {
  const { addToast } = useToast()
  const [images, setImages] = useState<ImageRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [editingAlt, setEditingAlt] = useState<string | null>(null)
  const [altText, setAltText] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { loadImages() }, [])

  async function loadImages() {
    setLoading(true)
    try {
      const res = await adminFetch('/api/images')
      if (res.ok) setImages(await res.json())
    } catch { /* ignore */ }
    setLoading(false)
  }

  async function uploadFiles(files: FileList | File[]) {
    setUploading(true)
    let uploadedCount = 0

    for (const file of Array.from(files)) {
      const formData = new FormData()
      formData.append('file', file)

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'x-admin-password': getPassword() },
          body: formData,
        })
        if (res.ok) {
          uploadedCount++
        } else {
          const err = await res.json()
          addToast(`Failed to upload ${file.name}: ${err.error}`, 'error')
        }
      } catch {
        addToast(`Failed to upload ${file.name}`, 'error')
      }
    }

    if (uploadedCount > 0) {
      addToast(`${uploadedCount} image${uploadedCount > 1 ? 's' : ''} uploaded!`, 'success')
      loadImages()
    }
    setUploading(false)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files.length) {
      uploadFiles(e.dataTransfer.files)
    }
  }

  function copyUrl(image: ImageRecord) {
    const url = `/api/uploads/${image.filename}`
    navigator.clipboard.writeText(url)
    setCopiedId(image.id)
    addToast('URL copied to clipboard!', 'success')
    setTimeout(() => setCopiedId(null), 2000)
  }

  async function deleteImage(id: string) {
    // Note: there's no delete image API endpoint currently,
    // so we just remove from the local list
    // If a DELETE endpoint exists, we'd call it here
    addToast('Image removal not yet supported by API', 'error')
    setDeleteConfirm(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="animate-spin text-forest-400" />
      </div>
    )
  }

  return (
    <div>
      {/* Upload zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`glass rounded-xl p-8 mb-6 border-2 border-dashed transition-all cursor-pointer text-center ${
          dragOver
            ? '!border-forest-400 bg-forest-500/10'
            : '!border-white/20 hover:!border-white/30 hover:bg-white/5'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => e.target.files && uploadFiles(e.target.files)}
          className="hidden"
        />
        {uploading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 size={32} className="animate-spin text-forest-400" />
            <p className="text-white/50 text-sm">Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <Upload size={32} className="text-white/30" />
            <div>
              <p className="text-white/70 text-sm">Drag and drop images here</p>
              <p className="text-white/40 text-xs mt-1">or click to browse (max 10MB per file)</p>
            </div>
          </div>
        )}
      </div>

      {/* Image grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <div key={image.id} className="glass rounded-xl overflow-hidden group">
            <div className="relative aspect-square bg-white/5">
              <img
                src={`/api/uploads/${image.filename}`}
                alt={image.alt || image.original_name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                  e.currentTarget.parentElement!.querySelector('.fallback')?.classList.remove('hidden')
                }}
              />
              <div className="fallback hidden absolute inset-0 flex items-center justify-center">
                <ImageIcon size={32} className="text-white/20" />
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => copyUrl(image)}
                  className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition cursor-pointer"
                  title="Copy URL"
                >
                  {copiedId === image.id ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                </button>
                {deleteConfirm === image.id ? (
                  <div className="flex gap-1">
                    <button onClick={() => deleteImage(image.id)} className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-500 transition cursor-pointer">Yes</button>
                    <button onClick={() => setDeleteConfirm(null)} className="px-2 py-1 text-xs bg-white/20 text-white rounded hover:bg-white/30 transition cursor-pointer">No</button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(image.id)}
                    className="p-2 bg-white/20 rounded-lg hover:bg-red-500/40 transition cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>

            <div className="p-3">
              <p className="text-xs text-white/70 truncate" title={image.original_name}>
                {image.original_name}
              </p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-white/30">{formatBytes(image.size)}</span>
                <span className="text-xs text-white/30">
                  {new Date(image.uploaded_at).toLocaleDateString()}
                </span>
              </div>
              {/* Inline alt text edit */}
              {editingAlt === image.id ? (
                <div className="mt-2 flex gap-1">
                  <input
                    type="text"
                    value={altText}
                    onChange={(e) => setAltText(e.target.value)}
                    placeholder="Alt text"
                    className="flex-1 px-2 py-1 rounded bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-forest-500"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') setEditingAlt(null)
                    }}
                  />
                  <button
                    onClick={() => setEditingAlt(null)}
                    className="p-1 text-white/40 hover:text-white"
                  >
                    <X size={12} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { setEditingAlt(image.id); setAltText(image.alt || '') }}
                  className="mt-1 text-xs text-white/30 hover:text-white/60 transition cursor-pointer"
                >
                  {image.alt || 'Add alt text...'}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <div className="text-center py-16">
          <ImageIcon size={40} className="mx-auto text-white/20 mb-4" />
          <p className="text-white/40">No images uploaded yet</p>
          <p className="text-white/30 text-sm mt-1">Drop files above to get started</p>
        </div>
      )}
    </div>
  )
}
