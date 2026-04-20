import type { Metadata } from 'next'
import PageContent from './content'

export const metadata: Metadata = {
  title: 'Guided Catskill Hikes | Summit 3500ft Peaks | Ashokan Outdoors',
  description:
    'Guided hiking in the Catskill Mountains. Summit the 3500ft High Peaks — Slide, Peekamoose, Wittenberg, Cornell, Table. Half and full day hikes for all skill levels with certified NYS guides.',
  keywords: [
    'guided Catskill hikes', 'Catskill Mountains hiking guide', 'Catskill High Peaks',
    'Slide Mountain hiking', 'Peekamoose Mountain', 'Burroughs Range hiking',
    'Catskill 3500 Club', 'guided hiking New York', 'Catskill trail guide',
  ],
  openGraph: {
    title: 'Guided Catskill Hikes | Ashokan Outdoors',
    description: 'Explore the breathtaking Catskill High Peaks with certified local guides.',
    url: 'https://ashokan.advancedmarketing.co/guided-catskill-hikes',
  },
}

export default function Page() {
  return <PageContent />
}
