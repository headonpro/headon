import type { Metadata } from 'next'
import AboutContent from '@/components/sections/AboutContent'

export const metadata: Metadata = {
  title: 'Über uns - HEADON Digitalagentur aus Lauda-Königshofen',
  description: 'Lernen Sie HEADON kennen: Moderne Kreativagentur für innovative digitale Lösungen. 10+ Jahre Erfahrung, KI-gestützte Entwicklung, 100% Kundenzufriedenheit. Mission, Werte und unser agiler Entwicklungsprozess.',
  keywords: 'Über HEADON, Digitalagentur Lauda-Königshofen, Kreativagentur Team, Mission Vision Werte, agile Entwicklung, KI-gestützte Lösungen, Kundenzufriedenheit, Innovation Qualität',
  openGraph: {
    title: 'Über HEADON - Ihre Digitalagentur aus Lauda-Königshofen',
    description: 'Moderne Kreativagentur mit 10+ Jahren Erfahrung. Innovative digitale Lösungen durch KI-gestützte Entwicklung und agile Methoden.',
    url: 'https://headon.pro/about',
    siteName: 'HEADON.pro',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Über HEADON - Digitalagentur',
    description: '10+ Jahre Erfahrung, KI-gestützte Entwicklung, 100% Kundenzufriedenheit',
  },
  alternates: {
    canonical: 'https://headon.pro/about',
  },
}

export default function AboutPage() {
  return <AboutContent />
}