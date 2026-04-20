import type { Metadata } from 'next'
import { Playfair_Display, Source_Sans_3 } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Ashokan Outdoors | Guided Fly Fishing & Hiking in the Catskill Mountains',
  description:
    'Experience guided fly fishing and hiking trips in the Catskill Mountains of New York. Expert guides, all equipment provided, 30+ years of local knowledge. Book your Catskill adventure today.',
  keywords: [
    'fly fishing', 'Catskill Mountains', 'guided fishing', 'hiking', 'Esopus Creek',
    'trout fishing', 'Catskills guide', 'New York fishing', 'Ashokan Reservoir',
  ],
  openGraph: {
    title: 'Ashokan Outdoors | Guided Fly Fishing & Hiking in the Catskills',
    description: 'Expert guided fly fishing and hiking in the birthplace of American fly fishing.',
    url: 'https://ashokan.advancedmarketing.co',
    siteName: 'Ashokan Outdoors',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ashokan Outdoors | Catskill Fly Fishing & Hiking',
    description: 'Expert guided fly fishing and hiking in the birthplace of American fly fishing.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Ashokan Outdoors',
              description: 'Guided fly fishing and hiking trips in the Catskill Mountains of New York.',
              url: 'https://ashokan.advancedmarketing.co',
              telephone: '+1-917-232-9951',
              email: 'ashokanoutdoors@gmail.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '187 Watson Hollow Road',
                addressLocality: 'West Shokan',
                addressRegion: 'NY',
                postalCode: '12494',
                addressCountry: 'US',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 41.96762,
                longitude: -74.28697,
              },
              priceRange: '$150 - $1000',
              openingHours: 'Mo-Su 06:00-20:00',
              sameAs: [
                'https://www.instagram.com/ashokanoutdoors/',
                'https://www.facebook.com/ashokanoutdoors',
                'https://nysoga.org/guide/ashokan-outdoors',
              ],
            }),
          }}
        />
      </head>
      <body className={`${sourceSans.className} noise antialiased`}>
        {children}
      </body>
    </html>
  )
}
