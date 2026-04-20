import type { Metadata } from 'next'
import AdminDashboard from './dashboard'

export const metadata: Metadata = { title: 'Admin | Ashokan Outdoors CMS' }

export default function Page() {
  return <AdminDashboard />
}
