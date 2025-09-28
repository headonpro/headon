import type { Metadata } from 'next'
import ContactContent from './ContactContent'

export const metadata: Metadata = {
  title: 'Kontakt - Kostenloses Erstgespräch & Projektanfrage | HEADON',
  description: 'Kontaktieren Sie HEADON für Ihr digitales Projekt. Kostenlose Erstberatung in 15 Minuten, Antwort innerhalb von 2 Stunden. Direkt Termin buchen oder Anfrage senden. Tel: +49 176 630 402 41',
  keywords: 'HEADON Kontakt, Erstberatung kostenlos, Projektanfrage, Termin buchen, Digitalagentur Lauda-Königshofen, +49 176 630 402 41, hallo@headon.pro',
  openGraph: {
    title: 'Kontakt HEADON - Kostenlose Erstberatung in 15 Minuten',
    description: 'Lassen Sie uns Ihr digitales Projekt besprechen. Kostenlose Erstberatung, schnelle Antwort, transparente Preise.',
    url: 'https://headon.pro/contact',
    siteName: 'HEADON.pro',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kontakt HEADON - Erstberatung',
    description: 'Kostenlose Erstberatung in 15 Minuten - unverbindlich und transparent',
  },
  alternates: {
    canonical: 'https://headon.pro/contact',
  },
}

export default function ContactPage() {
  return <ContactContent />
}