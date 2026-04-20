export const dynamic = 'force-dynamic'
export const revalidate = 0

import type { Metadata } from 'next'
import { getSection, getSettings } from '@/lib/db'
import PageContent from './content'

export const metadata: Metadata = {
  title: 'Catskills Fly Fishing Instruction | Learn to Fly Fish | Ashokan Outdoors',
  description:
    'Learn to fly fish in the Catskill Mountains with licensed instructors. 90-minute casting lessons, all equipment provided. Perfect for beginners and intermediate anglers.',
  keywords: [
    'fly fishing instruction', 'learn to fly fish', 'Catskills fly fishing lessons',
    'fly casting lessons', 'beginner fly fishing', 'Catskill Mountains fishing',
  ],
  openGraph: {
    title: 'Catskills Fly Fishing Instruction | Ashokan Outdoors',
    description: 'Learn to fly fish with expert Catskill Mountain guides. 90-minute lessons, all equipment provided.',
    url: 'https://ashokan2.advancedmarketing.co/fly-fishing-instruction',
  },
}

export default function Page() {
  const section = getSection('page_fly_fishing_instruction')
  const settings = getSettings()
  return <PageContent section={section || null} settings={settings} />
}
