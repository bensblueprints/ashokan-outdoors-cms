export const dynamic = 'force-dynamic'
export const revalidate = 0

import type { Metadata } from 'next'
import { getSection, getSettings } from '@/lib/db'
import PageContent from './content'

export const metadata: Metadata = {
  title: 'Guided Catskill Hikes | Summit 3500ft Peaks | Ashokan Outdoors',
  description:
    'Guided hiking in the Catskill Mountains. Summit the 3500ft High Peaks — Slide, Peekamoose, Wittenberg, Cornell, Table. Half and full day hikes for all skill levels with certified NYS guides.',
  keywords: [
    'guided Catskill hikes', 'Catskill Mountains hiking guide', 'Catskill High Peaks',
    'Slide Mountain hiking', 'Peekamoose Mountain', 'Burroughs Range hiking',
  ],
  openGraph: {
    title: 'Guided Catskill Hikes | Ashokan Outdoors',
    description: 'Summit breathtaking Catskill peaks with certified guides. Half and full day hikes available.',
    url: 'https://ashokan2.advancedmarketing.co/guided-catskill-hikes',
  },
}

export default function Page() {
  const section = getSection('page_guided_hikes')
  const settings = getSettings()
  return <PageContent section={section || null} settings={settings} />
}
