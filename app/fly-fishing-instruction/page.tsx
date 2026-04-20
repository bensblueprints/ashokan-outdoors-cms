import type { Metadata } from 'next'
import PageContent from './content'

export const metadata: Metadata = {
  title: 'Catskills Fly Fishing Instruction | Learn to Fly Fish | Ashokan Outdoors',
  description:
    'Learn to fly fish in the Catskill Mountains with licensed instructors. 90-minute casting lessons, all equipment provided. Perfect for beginners and intermediate anglers. Book your Catskills fly fishing lesson today.',
  keywords: [
    'fly fishing instruction', 'learn to fly fish', 'Catskills fly fishing lessons',
    'fly casting lessons', 'beginner fly fishing', 'Catskill Mountains fishing',
    'fly fishing class New York', 'Ashokan Outdoors instruction',
  ],
  openGraph: {
    title: 'Catskills Fly Fishing Instruction | Ashokan Outdoors',
    description: 'Learn to fly fish in the birthplace of American fly fishing. Expert instruction in the Catskill Mountains.',
    url: 'https://ashokan.advancedmarketing.co/fly-fishing-instruction',
  },
}

export default function Page() {
  return <PageContent />
}
