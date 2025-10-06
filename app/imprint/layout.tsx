import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impressum | HEADON.pro',
  description:
    'Rechtliche Angaben gemäß § 5 TMG: HEADON Kreativagentur - Onur Cirakoglu, Am Vogelsberg 8, 97922 Lauda-Königshofen. Kontakt, Umsatzsteuer-ID und weitere rechtliche Informationen.',
  keywords:
    'Impressum, HEADON Kreativagentur, Onur Cirakoglu, Lauda-Königshofen, Rechtliche Angaben, Kontakt',
  alternates: {
    canonical: 'https://headon.pro/imprint',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Impressum | HEADON.pro',
    description: 'Rechtliche Angaben und Kontaktdaten der HEADON Kreativagentur',
    url: 'https://headon.pro/imprint',
    siteName: 'HEADON.pro',
    locale: 'de_DE',
    type: 'website',
  },
}

export default function ImprintLayout({ children }: { children: React.ReactNode }) {
  return children
}
