import type { Metadata } from 'next'
import AboutContent from '@/components/sections/AboutContent'
import { PersonSchema } from '@/components/seo/SchemaGenerator'

export const metadata: Metadata = {
  title: 'Über uns - HEADON Digitalagentur aus Lauda-Königshofen',
  description:
    'Moderne Digitalagentur für Web, Mobile & KI-Integration. Technologie-agnostisch mit Next.js, React, Vue, Flutter und mehr. Regional verwurzelt in Lauda-Königshofen.',
  keywords:
    'Digitalagentur Lauda-Königshofen, Web Development, Mobile Apps, AI Integration, Next.js, React, Flutter, TypeScript, Docker, DevOps, Bad Mergentheim, Tauberbischofsheim',
  openGraph: {
    title: 'Über HEADON - Moderne Digitalagentur aus Lauda-Königshofen',
    description:
      'Technologie-agnostisch. Performance-fokussiert. Regional verwurzelt. Web, Mobile & KI-Integration mit modernsten Technologien.',
    url: 'https://headon.pro/about',
    siteName: 'HEADON.pro',
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: '/og-images/about.jpg',
        width: 1200,
        height: 630,
        alt: 'HEADON.pro - Über uns',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Über HEADON - Digitalagentur',
    description: 'Moderne Web & Mobile Development mit KI-Integration aus Lauda-Königshofen',
    images: ['/og-images/about.jpg'],
  },
  alternates: {
    canonical: 'https://headon.pro/about',
  },
}

export default function AboutPage() {
  return (
    <>
      {/* Schema.org Person markup for founder */}
      <PersonSchema
        person={{
          name: 'Onur Cirakoglu',
          jobTitle: 'Founder',
          description:
            'Founder of HEADON.pro, a digital agency for modern web and mobile development with AI integration.',
          url: '/about',
        }}
      />

      <AboutContent />
    </>
  )
}
