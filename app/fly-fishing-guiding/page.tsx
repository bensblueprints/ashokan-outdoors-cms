import type { Metadata } from 'next'
import PageContent from './content'

export const metadata: Metadata = {
  title: 'Guided Fly Fishing in the Catskills | Esopus Creek & More | Ashokan Outdoors',
  description:
    'Expert guided fly fishing on the Esopus Creek, Woodland Valley Creek, Rondout Creek and legendary Catskill trout streams. Half and full day trips with all equipment provided. Brook, brown, and rainbow trout.',
  keywords: [
    'guided fly fishing Catskills', 'Esopus Creek fly fishing', 'Catskill trout fishing guide',
    'fly fishing guide New York', 'Catskill Mountains fishing', 'brown trout Catskills',
    'rainbow trout Esopus Creek', 'Ashokan Reservoir fishing',
  ],
  openGraph: {
    title: 'Guided Fly Fishing in the Catskills | Ashokan Outdoors',
    description: 'Fish legendary Catskill waters with expert local guides. Half and full day trips available.',
    url: 'https://ashokan.advancedmarketing.co/fly-fishing-guiding',
  },
}

export default function Page() {
  return <PageContent />
}
