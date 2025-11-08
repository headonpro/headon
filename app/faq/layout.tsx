import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ - Häufig gestellte Fragen | HEADON',
  description:
    'Antworten auf häufige Fragen zu Web Development, Mobile Apps, Preisen, Technologien und Projektabläufen. Transparente Informationen für Ihre Entscheidung.',
  keywords:
    'FAQ, Häufige Fragen, Webentwicklung Fragen, App Entwicklung Kosten, Projektablauf, Technologie Beratung, HEADON Digitalagentur',
  openGraph: {
    title: 'FAQ - Häufig gestellte Fragen | HEADON',
    description:
      'Antworten auf häufige Fragen zu Web Development, Mobile Apps, Preisen, Technologien und Projektabläufen.',
    url: 'https://headon.pro/faq',
    siteName: 'HEADON.pro',
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: '/og-images/services.jpg',
        width: 1200,
        height: 630,
        alt: 'HEADON.pro - FAQ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ - Häufig gestellte Fragen | HEADON',
    description:
      'Antworten auf häufige Fragen zu Web Development, Mobile Apps und Projektabläufen.',
    images: ['/og-images/services.jpg'],
  },
  alternates: {
    canonical: 'https://headon.pro/faq',
  },
}

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children
}
