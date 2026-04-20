'use client'

import { useState, useEffect, useCallback, createContext, useContext } from 'react'
import {
  LogIn, LayoutDashboard, FileText, Briefcase, DollarSign,
  HelpCircle, BookOpen, Image, Users, Settings, Menu, X,
  ChevronRight, Activity, TrendingUp, Clock
} from 'lucide-react'
import SectionEditor from '@/components/admin/SectionEditor'
import ServiceEditor from '@/components/admin/ServiceEditor'
import RateEditor from '@/components/admin/RateEditor'
import FAQEditor from '@/components/admin/FAQEditor'
import BlogEditor from '@/components/admin/BlogEditor'
import ImageManager from '@/components/admin/ImageManager'
import LeadManager from '@/components/admin/LeadManager'
import SettingsEditor from '@/components/admin/SettingsEditor'

/* ─── Toast system ─── */
interface Toast {
  id: number
  message: string
  type: 'success' | 'error'
}

interface ToastContextType {
  addToast: (message: string, type: 'success' | 'error') => void
}

export const ToastContext = createContext<ToastContextType>({
  addToast: () => {},
})

export function useToast() {
  return useContext(ToastContext)
}

/* ─── Auth helper ─── */
export function getPassword(): string {
  if (typeof window === 'undefined') return ''
  return sessionStorage.getItem('admin_password') || ''
}

export async function adminFetch(url: string, options: RequestInit = {}) {
  const password = getPassword()
  const headers: Record<string, string> = {
    'x-admin-password': password,
    ...(options.headers as Record<string, string> || {}),
  }
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }
  return fetch(url, { ...options, headers })
}

/* ─── Tabs ─── */
const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'sections', label: 'Sections', icon: FileText },
  { id: 'services', label: 'Services', icon: Briefcase },
  { id: 'rates', label: 'Rates', icon: DollarSign },
  { id: 'faqs', label: 'FAQs', icon: HelpCircle },
  { id: 'blog', label: 'Blog / Reports', icon: BookOpen },
  { id: 'images', label: 'Images', icon: Image },
  { id: 'leads', label: 'Leads', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
] as const

type TabId = (typeof TABS)[number]['id']

/* ─── Dashboard Overview ─── */
function DashboardOverview() {
  const [stats, setStats] = useState<{
    leads: number; newLeads: number; posts: number; images: number
  }>({ leads: 0, newLeads: 0, posts: 0, images: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [leadsRes, postsRes, imagesRes] = await Promise.all([
          adminFetch('/api/leads'),
          adminFetch('/api/posts'),
          adminFetch('/api/images'),
        ])
        const leads = leadsRes.ok ? await leadsRes.json() : []
        const posts = postsRes.ok ? await postsRes.json() : []
        const images = imagesRes.ok ? await imagesRes.json() : []
        setStats({
          leads: leads.length,
          newLeads: leads.filter((l: { status: string }) => l.status === 'new').length,
          posts: posts.length,
          images: images.length,
        })
      } catch { /* ignore */ }
      setLoading(false)
    }
    load()
  }, [])

  const cards = [
    { label: 'Total Leads', value: stats.leads, icon: Users, color: 'text-creek-400' },
    { label: 'New Leads', value: stats.newLeads, icon: Activity, color: 'text-emerald-400' },
    { label: 'Blog Posts', value: stats.posts, icon: BookOpen, color: 'text-amber-400' },
    { label: 'Images', value: stats.images, icon: Image, color: 'text-purple-400' },
  ]

  return (
    <div>
      <h2 className="font-display text-2xl text-white mb-6">Welcome Back</h2>
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-forest-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {cards.map((c) => (
              <div key={c.label} className="glass rounded-xl p-5 hover:border-white/20 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-white/50">{c.label}</span>
                  <c.icon size={18} className={c.color} />
                </div>
                <p className={`text-3xl font-bold ${c.color}`}>{c.value}</p>
              </div>
            ))}
          </div>
          <div className="glass rounded-xl p-6">
            <h3 className="font-display text-lg text-white mb-4 flex items-center gap-2">
              <Clock size={18} className="text-white/50" /> Quick Tips
            </h3>
            <div className="space-y-3 text-white/70 text-sm">
              <p className="flex items-start gap-2">
                <ChevronRight size={14} className="mt-1 text-forest-400 shrink-0" />
                Use the <strong className="text-white">Sections</strong> tab to edit hero text, about page content, and more.
              </p>
              <p className="flex items-start gap-2">
                <ChevronRight size={14} className="mt-1 text-forest-400 shrink-0" />
                Upload images in the <strong className="text-white">Images</strong> tab, then paste the URL into section or blog image fields.
              </p>
              <p className="flex items-start gap-2">
                <ChevronRight size={14} className="mt-1 text-forest-400 shrink-0" />
                Write blog posts and fishing reports in the <strong className="text-white">Blog / Reports</strong> tab. Use markdown for formatting.
              </p>
              <p className="flex items-start gap-2">
                <ChevronRight size={14} className="mt-1 text-forest-400 shrink-0" />
                Check your <strong className="text-white">Leads</strong> daily to follow up with new inquiries.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

/* ─── Main Admin Dashboard ─── */
export default function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<TabId>('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [checkingSession, setCheckingSession] = useState(true)

  const addToast = useCallback((message: string, type: 'success' | 'error') => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000)
  }, [])

  // Check for existing session
  useEffect(() => {
    const stored = sessionStorage.getItem('admin_password')
    if (stored) {
      fetch('/api/leads', { headers: { 'x-admin-password': stored } })
        .then((res) => {
          if (res.ok) setAuthenticated(true)
          setCheckingSession(false)
        })
        .catch(() => setCheckingSession(false))
    } else {
      setCheckingSession(false)
    }
  }, [])

  const handleLogin = async () => {
    setLoginLoading(true)
    setLoginError('')
    try {
      const res = await fetch('/api/leads', {
        headers: { 'x-admin-password': passwordInput },
      })
      if (res.ok) {
        sessionStorage.setItem('admin_password', passwordInput)
        setAuthenticated(true)
      } else {
        setLoginError('Invalid password. Please try again.')
      }
    } catch {
      setLoginError('Connection failed. Please try again.')
    }
    setLoginLoading(false)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_password')
    setAuthenticated(false)
    setPasswordInput('')
  }

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-forest-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-forest-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-forest-950 flex items-center justify-center p-4">
        <div className="glass rounded-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-forest-600 to-forest-400 flex items-center justify-center mx-auto mb-4">
              <TrendingUp size={28} className="text-white" />
            </div>
            <h1 className="font-display text-2xl text-white">Ashokan Outdoors</h1>
            <p className="text-white/50 text-sm mt-1">Content Management System</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-white/60 block mb-1.5">Admin Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-forest-500 transition"
                autoFocus
              />
            </div>
            {loginError && (
              <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {loginError}
              </p>
            )}
            <button
              onClick={handleLogin}
              disabled={loginLoading || !passwordInput}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loginLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={18} /> <span>Sign In</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    )
  }

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardOverview />
      case 'sections': return <SectionEditor />
      case 'services': return <ServiceEditor />
      case 'rates': return <RateEditor />
      case 'faqs': return <FAQEditor />
      case 'blog': return <BlogEditor />
      case 'images': return <ImageManager />
      case 'leads': return <LeadManager />
      case 'settings': return <SettingsEditor />
    }
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      <div className="min-h-screen bg-forest-950 flex">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-forest-950/95 backdrop-blur-xl border-r border-white/5 flex flex-col transition-transform lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-5 border-b border-white/5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-forest-600 to-forest-400 flex items-center justify-center">
                  <TrendingUp size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Ashokan CMS</p>
                  <p className="text-white/40 text-xs">Admin Panel</p>
                </div>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 text-white/50 hover:text-white">
                <X size={20} />
              </button>
            </div>
          </div>

          <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id)
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-forest-600/30 text-forest-300 border border-forest-500/30'
                    : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </nav>

          <div className="p-3 border-t border-white/5">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/10 transition cursor-pointer"
            >
              <LogIn size={18} className="rotate-180" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <header className="sticky top-0 z-30 bg-forest-950/80 backdrop-blur-xl border-b border-white/5 px-4 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 glass rounded-lg hover:bg-white/10 transition cursor-pointer"
              >
                <Menu size={20} />
              </button>
              <h1 className="font-display text-xl text-white">
                {TABS.find((t) => t.id === activeTab)?.label}
              </h1>
            </div>
          </header>

          <div className="p-4 lg:p-8 max-w-7xl">
            {renderTab()}
          </div>
        </main>

        {/* Toast container */}
        <div className="fixed bottom-4 right-4 z-[100] space-y-2">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`px-4 py-3 rounded-lg text-sm font-medium shadow-xl animate-in flex items-center gap-2 ${
                toast.type === 'success'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-red-600 text-white'
              }`}
            >
              {toast.message}
              <button
                onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                className="ml-2 text-white/70 hover:text-white"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  )
}
