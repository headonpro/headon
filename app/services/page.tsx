import type { Metadata } from 'next'
import ServicesContent from '@/components/sections/ServicesContent'

export const metadata: Metadata = {
  title: 'Services - Web Development, Mobile Apps & UI/UX Design | HEADON',
  description: 'Professionelle Digitallösungen von HEADON: Web Development mit Next.js, Mobile Apps für iOS/Android, UI/UX Design und Backend-Entwicklung. End-to-End Service für Ihr digitales Projekt.',
  keywords: 'Web Development Services, Mobile App Entwicklung, UI/UX Design Agentur, Backend Entwicklung, Next.js, React Native, API Development, Kreativagentur Lauda-Königshofen',
  openGraph: {
    title: 'Services - Digitale Lösungen von HEADON',
    description: 'Von Web Development bis Mobile Apps - Entdecken Sie unsere professionellen Services für Ihr digitales Projekt.',
    url: 'https://headon.pro/services',
    siteName: 'HEADON.pro',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services - HEADON Digitalagentur',
    description: 'Professionelle Web Development, Mobile Apps und UI/UX Design Services',
  },
  alternates: {
    canonical: 'https://headon.pro/services',
  },
}

export default function ServicesPage() {
  return <ServicesContent />
}