import type { Metadata } from 'next'

/**
 * FAQ Page Metadata
 *
 * Optimized for search engines and social sharing
 * Targets common FAQ-related search queries
 */
export const metadata: Metadata = {
  title: 'Häufig gestellte Fragen (FAQ) | HEADON.pro',
  description:
    'Antworten auf über 40 häufig gestellte Fragen zu Web-Entwicklung, Mobile Apps, UI/UX Design, Backend-Lösungen und Preisen. Schnelle Hilfe für Ihre Fragen.',
  keywords: [
    'FAQ',
    'Häufig gestellte Fragen',
    'Web Entwicklung Fragen',
    'App Entwicklung Kosten',
    'Website Preise',
    'HEADON FAQ',
    'Digitalagentur Fragen',
    'Bad Mergentheim',
    'Main-Tauber-Kreis',
    'Next.js Agentur',
    'React Entwicklung',
  ],
  openGraph: {
    title: 'FAQ - Alle Antworten auf Ihre Fragen | HEADON.pro',
    description:
      'Finden Sie schnelle Antworten zu Services, Preisen, Technologien und Abläufen. Über 40 Fragen in 5 Kategorien.',
    type: 'website',
    url: 'https://headon.pro/faq',
    siteName: 'HEADON.pro',
    locale: 'de_DE',
    images: [
      {
        url: '/og-image-faq.png',
        width: 1200,
        height: 630,
        alt: 'HEADON.pro FAQ - Häufig gestellte Fragen',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ | HEADON.pro',
    description: 'Antworten auf über 40 häufig gestellte Fragen zu unseren Services.',
    images: ['/og-image-faq.png'],
  },
  alternates: {
    canonical: 'https://headon.pro/faq',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}
