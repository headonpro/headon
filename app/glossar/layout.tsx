import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Glossar - Web Development Fachbegriffe erklärt | HEADON',
  description:
    'Verständliche Erklärungen zu 30+ Fachbegriffen aus Webentwicklung, App-Development, UI/UX Design und Digital Marketing. Von API bis TypeScript.',
  keywords:
    'Web Development Glossar, Fachbegriffe Webentwicklung, API Erklärung, React Definition, TypeScript Begriffe, App Entwicklung Lexikon, Digital Marketing Glossar',
  openGraph: {
    title: 'Glossar - Web Development Fachbegriffe | HEADON',
    description:
      'Verständliche Erklärungen zu 30+ Fachbegriffen aus Webentwicklung, App-Development und UI/UX Design.',
    url: 'https://headon.pro/glossar',
    siteName: 'HEADON.pro',
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: '/og-images/services.jpg',
        width: 1200,
        height: 630,
        alt: 'HEADON.pro - Glossar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Glossar - Web Development Fachbegriffe | HEADON',
    description:
      'Verständliche Erklärungen zu 30+ Fachbegriffen aus Webentwicklung und App-Development.',
    images: ['/og-images/services.jpg'],
  },
  alternates: {
    canonical: 'https://headon.pro/glossar',
  },
}

export default function GlossarLayout({ children }: { children: React.ReactNode }) {
  return children
}
