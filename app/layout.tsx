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
    'Expert guided fly fishing and hiking trips in the Catskill Mountains, NY. Fish the Esopus Creek, Beaverkill, and legendary Catskill trout streams with 30+ years of local knowledge. All equipment provided. Book your Catskill adventure today.',
  keywords: [
    'guided fly fishing catskills',
    'catskill mountain hiking guide',
    'esopus creek fly fishing',
    'catskill fly fishing guide',
    'fly fishing instruction catskills',
    'guided trout fishing new york',
    'catskill mountains outdoor guide',
    'learn to fly fish catskills',
    'catskill high peaks hiking',
    'beaverkill river fly fishing',
    'neversink river fishing guide',
    'catskill wilderness hiking tours',
    'brown trout fishing catskills',
    'catskill fly casting lessons',
    'west shokan fishing guide',
    'ashokan reservoir fishing',
    'catskill mountain adventures',
    'new york state fishing guide',
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://ashokan2.advancedmarketing.co',
  },
  openGraph: {
    title: 'Ashokan Outdoors | Guided Fly Fishing & Hiking in the Catskill Mountains',
    description:
      'Expert guided fly fishing and hiking in the birthplace of American fly fishing. 30+ years of Catskill Mountain experience. All equipment provided.',
    url: 'https://ashokan2.advancedmarketing.co',
    siteName: 'Ashokan Outdoors',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://ashokan2.advancedmarketing.co/images/hero-main.jpg',
        width: 1200,
        height: 630,
        alt: 'Guided fly fishing in the Catskill Mountains with Ashokan Outdoors',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ashokan Outdoors | Guided Fly Fishing & Hiking in the Catskill Mountains',
    description:
      'Expert guided fly fishing and hiking in the birthplace of American fly fishing. 30+ years of Catskill Mountain experience.',
    images: ['https://ashokan2.advancedmarketing.co/images/hero-main.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': 'https://ashokan2.advancedmarketing.co/#business',
      name: 'Ashokan Outdoors',
      description:
        'Guided fly fishing and hiking in the Catskill Mountains with over 30 years of experience',
      url: 'https://ashokan2.advancedmarketing.co',
      telephone: '+19172329951',
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
        latitude: 41.9714,
        longitude: -74.2847,
      },
      founder: {
        '@type': 'Person',
        name: 'John Yanzek',
        jobTitle: 'Owner & Lead Guide',
      },
      areaServed: {
        '@type': 'Place',
        name: 'Catskill Mountains, New York',
      },
      priceRange: '$150-$1000',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5.0',
        reviewCount: '5',
        bestRating: '5',
      },
      review: [
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'Andrew Emrich' },
          reviewRating: { '@type': 'Rating', ratingValue: '5' },
          reviewBody:
            'John approaches perfection when it comes to creating a unique Catskill experience...',
        },
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'Brian Roesch' },
          reviewRating: { '@type': 'Rating', ratingValue: '5' },
          reviewBody:
            'John gave expert guide service to our 2-person party on day-long fishing in Catskills...',
        },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Guiding Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Fly Fishing Instruction',
              description: '90-minute fly casting and fly fishing instruction',
            },
            price: '150.00',
            priceCurrency: 'USD',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Guided Fly Fishing - Half Day',
            },
            price: '400.00',
            priceCurrency: 'USD',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Guided Fly Fishing - Full Day',
            },
            price: '550.00',
            priceCurrency: 'USD',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Guided Catskill Hikes - Half Day',
            },
            price: '250.00',
            priceCurrency: 'USD',
          },
        ],
      },
      sameAs: [
        'https://www.instagram.com/ashokanoutdoors/',
        'https://www.facebook.com/ashokanoutdoors',
      ],
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '06:00',
        closes: '20:00',
      },
      image: 'https://ashokan2.advancedmarketing.co/images/hero-main.jpg',
    },
    {
      '@type': 'WebSite',
      name: 'Ashokan Outdoors',
      url: 'https://ashokan2.advancedmarketing.co',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Will you be driving us?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. We will meet at beginning of our trip and from there we will move around as needed.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is it customary to tip a fishing guide?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "Whether the fish are biting or not, it's customary to tip a helpful, hard working, and knowledgeable guide.",
          },
        },
        {
          '@type': 'Question',
          name: 'Will there be cell service?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Cellular phone service can be sketchy in the Catskills and in many of the areas we will be fishing it will be non-existent.',
          },
        },
      ],
    },
  ],
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
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body className={`${sourceSans.className} noise antialiased`}>
        {children}
      </body>
    </html>
  )
}
