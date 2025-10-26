import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datenschutz - Datenschutzerklärung | HEADON.pro',
  description:
    'Datenschutzerklärung von HEADON: Transparente Informationen über Datenerhebung, -verarbeitung und -nutzung gemäß DSGVO. Ihre Privatsphäre ist uns wichtig.',
  openGraph: {
    title: 'Datenschutzerklärung | HEADON.pro',
    description: 'Informationen zur Datenverarbeitung gemäß DSGVO',
    url: 'https://headon.pro/privacy',
    siteName: 'HEADON.pro',
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: '/og-images/services.jpg',
        width: 1200,
        height: 630,
        alt: 'HEADON.pro - Datenschutz',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Datenschutzerklärung | HEADON.pro',
    description: 'Informationen zur Datenverarbeitung gemäß DSGVO',
    images: ['/og-images/services.jpg'],
  },
  alternates: {
    canonical: 'https://headon.pro/privacy',
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children
}
