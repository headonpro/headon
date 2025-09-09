import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontakt | HEADON.pro - Kostenloses Beratungsgespräch',
  description: 'Kontaktieren Sie uns für ein kostenloses Beratungsgespräch. Wir helfen Ihnen, Ihre digitale Vision zu verwirklichen. ☎️ Jetzt anfragen!',
  keywords: 'Kontakt HEADON, Beratungsgespräch, Angebot anfordern, Webentwicklung Anfrage, App Entwicklung Kontakt, Freiburg Digitalagentur',
  openGraph: {
    title: 'Kontakt | HEADON.pro - Lassen Sie uns sprechen',
    description: 'Kostenloses Erstgespräch - Wir freuen uns auf Ihr Projekt',
    url: 'https://headon.pro/contact',
    type: 'website',
    images: [
      {
        url: 'https://headon.pro/images/contact-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Kontaktieren Sie HEADON.pro',
      },
    ],
  },
  alternates: {
    canonical: 'https://headon.pro/contact',
  },
}