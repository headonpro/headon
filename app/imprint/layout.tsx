import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum - Rechtliche Angaben | HEADON.pro',
  description:
    'Impressum von HEADON Kreativagentur: Rechtliche Angaben gemäß § 5 TMG. Kontakt, Umsatzsteuer-ID, Verantwortlich für Inhalte nach § 55 RStV.',
  openGraph: {
    title: 'Impressum | HEADON.pro',
    description: 'Rechtliche Angaben gemäß § 5 TMG',
    url: 'https://headon.pro/imprint',
    siteName: 'HEADON.pro',
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: '/og-images/services.jpg',
        width: 1200,
        height: 630,
        alt: 'HEADON.pro - Impressum',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Impressum | HEADON.pro',
    description: 'Rechtliche Angaben gemäß § 5 TMG',
    images: ['/og-images/services.jpg'],
  },
  alternates: {
    canonical: 'https://headon.pro/imprint',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function ImprintLayout({ children }: { children: React.ReactNode }) {
  return children
}
