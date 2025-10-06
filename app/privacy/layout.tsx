import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | HEADON.pro',
  description:
    'Datenschutzerklärung der HEADON Kreativagentur: Transparente Informationen über die Verarbeitung personenbezogener Daten, DSGVO-konforme Datenverarbeitung, Cookie-freie Webanalyse und Ihre Rechte.',
  keywords:
    'Datenschutz, DSGVO, Datenschutzerklärung, HEADON, Cookie-frei, Umami Analytics, Persönliche Daten',
  alternates: {
    canonical: 'https://headon.pro/privacy',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Datenschutzerklärung | HEADON.pro',
    description:
      'Datenschutz und Transparenz: Informationen über unsere DSGVO-konforme Datenverarbeitung',
    url: 'https://headon.pro/privacy',
    siteName: 'HEADON.pro',
    locale: 'de_DE',
    type: 'website',
  },
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children
}
