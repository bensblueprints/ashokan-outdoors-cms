export const dynamic = 'force-dynamic'
export const revalidate = 0

import { getSettings, getServices, getRates, getFaqs, getSection, getPosts } from '@/lib/db'
import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Services from '@/components/sections/Services'
import Rates from '@/components/sections/Rates'
import CatskillFlyFishing from '@/components/sections/CatskillFlyFishing'
import BeforeYouFish from '@/components/sections/BeforeYouFish'
import FAQ from '@/components/sections/FAQ'
import Reviews from '@/components/sections/Reviews'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/layout/Footer'
import RecentReports from '@/components/sections/RecentReports'
import FishingReport from '@/components/sections/FishingReport'
import FloatingCallButton from '@/components/layout/FloatingCallButton'

export default function Home() {
  const settings = getSettings()
  const services = getServices()
  const rates = getRates()
  const faqs = getFaqs()
  const heroSection = getSection('hero')
  const aboutSection = getSection('about')
  const catskillSection = getSection('catskill_fly_fishing')
  const beforeYouFishSection = getSection('before_you_fish')
  const recentPosts = getPosts(undefined, true)

  return (
    <main className="relative">
      <Navbar settings={settings} />
      <Hero
        title={heroSection?.title || 'Guided Fly Fishing & Hiking in the Catskills'}
        subtitle={heroSection?.subtitle || ''}
      />
      <About section={aboutSection || null} />
      <Services services={services} />
      <Rates rates={rates} />
      <CatskillFlyFishing section={catskillSection || null} />
      <BeforeYouFish section={beforeYouFishSection || null} />
      <FAQ faqs={faqs} />
      <Reviews />
      <FishingReport />
      <RecentReports posts={recentPosts} />
      <Contact settings={settings} />
      <Footer settings={settings} />
      <FloatingCallButton />
    </main>
  )
}
