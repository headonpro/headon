import type { Metadata } from 'next'
import ServicesContent from '@/components/sections/ServicesContent'

export const metadata: Metadata = {
  title: 'Services - Web, Mobile Apps & UI/UX Design | HEADON',
  description:
    'Professionelle Digitallösungen: Web Development mit Next.js, Mobile Apps iOS/Android, UI/UX Design, Backend-Entwicklung. End-to-End Service.',
  keywords:
    'Web Development Services, Mobile App Entwicklung, UI/UX Design Agentur, Backend Entwicklung, Next.js, React Native, API Development, Kreativagentur Lauda-Königshofen',
  openGraph: {
    title: 'Services - Digitale Lösungen von HEADON',
    description:
      'Von Web Development bis Mobile Apps - Entdecken Sie unsere professionellen Services für Ihr digitales Projekt.',
    url: 'https://headon.pro/services',
    siteName: 'HEADON.pro',
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: '/og-images/services.jpg',
        width: 1200,
        height: 630,
        alt: 'HEADON.pro - Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services - HEADON Digitalagentur',
    description: 'Professionelle Web Development, Mobile Apps und UI/UX Design Services',
    images: ['/og-images/services.jpg'],
  },
  alternates: {
    canonical: 'https://headon.pro/services',
  },
}

export default function ServicesPage() {
  return <ServicesContent />
}
