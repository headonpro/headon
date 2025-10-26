import type { Metadata } from 'next'
import AboutContent from '@/components/sections/AboutContent'
import { PersonSchema } from '@/components/seo/SchemaGenerator'

export const metadata: Metadata = {
  title: 'Über uns - HEADON Digitalagentur aus Lauda-Königshofen',
  description:
    'Lernen Sie HEADON kennen: Moderne Kreativagentur für innovative digitale Lösungen. 10+ Jahre Erfahrung, KI-gestützte Entwicklung, 100% Kundenzufriedenheit.',
  keywords:
    'Über HEADON, Digitalagentur Lauda-Königshofen, Kreativagentur Team, Mission Vision Werte, agile Entwicklung, KI-gestützte Lösungen, Kundenzufriedenheit, Innovation Qualität',
  openGraph: {
    title: 'Über HEADON - Ihre Digitalagentur aus Lauda-Königshofen',
    description:
      'Moderne Kreativagentur mit 10+ Jahren Erfahrung. Innovative digitale Lösungen durch KI-gestützte Entwicklung und agile Methoden.',
    url: 'https://headon.pro/about',
    siteName: 'HEADON.pro',
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: '/og-images/about.jpg',
        width: 1200,
        height: 630,
        alt: 'HEADON.pro - Über uns',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Über HEADON - Digitalagentur',
    description: '10+ Jahre Erfahrung, KI-gestützte Entwicklung, 100% Kundenzufriedenheit',
    images: ['/og-images/about.jpg'],
  },
  alternates: {
    canonical: 'https://headon.pro/about',
  },
}

export default function AboutPage() {
  return (
    <>
      {/* Schema.org Person markup for founder */}
      <PersonSchema
        person={{
          name: 'Onur Cirakoglu',
          jobTitle: 'Founder & CEO',
          description:
            'Founder and CEO of HEADON.pro, a modern digital agency specializing in AI-powered web and mobile development.',
          url: '/about',
        }}
      />

      <AboutContent />
    </>
  )
}
