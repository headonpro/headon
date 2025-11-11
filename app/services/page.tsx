import type { Metadata } from 'next'
import ServicesContent from '@/components/sections/ServicesContent'
import { ItemListSchema } from '@/components/seo/SchemaGenerator'

export const metadata: Metadata = {
  title: 'Digitalagentur Services: Web, Mobile Apps & UI/UX | Main-Tauber-Kreis',
  description:
    'Full-Service Digitalagentur aus Main-Tauber-Kreis: Webentwicklung mit Next.js & React, Mobile Apps iOS/Android, UI/UX Design, Cloud-Backend. Festpreise ab 1.500€. Persönliche Betreuung in Bad Mergentheim, Lauda-Königshofen & Region.',
  keywords:
    'Digitalagentur Main-Tauber-Kreis, Webentwicklung Bad Mergentheim, Mobile App Entwicklung Lauda-Königshofen, UI/UX Design Tauberbischofsheim, Full-Stack Entwicklung Wertheim, Next.js Agentur Baden-Württemberg, React Native Entwickler, Backend Entwicklung Würzburg, Progressive Web Apps Main-Tauber, E-Commerce Entwicklung Region Würzburg, Responsive Webdesign, API Development, Cloud Solutions Supabase, TypeScript Entwicklung, Moderne Webanwendungen, Kreativagentur Marktheidenfeld',
  openGraph: {
    title: 'Digitalagentur Services - Web, Mobile Apps & UI/UX | HEADON Main-Tauber-Kreis',
    description:
      'Professionelle Digitallösungen aus dem Main-Tauber-Kreis: Webentwicklung, Mobile Apps, UI/UX Design und Cloud-Backend. End-to-End Service mit Festpreisen ab 1.500€.',
    url: 'https://headon.pro/services',
    siteName: 'HEADON.pro',
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: '/og-images/services.jpg',
        width: 1200,
        height: 630,
        alt: 'HEADON Digitalagentur Services - Web Development, Mobile Apps, UI/UX Design',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HEADON Services: Web, Mobile Apps & UI/UX | Main-Tauber-Kreis',
    description:
      'Full-Service Digitalagentur: Webentwicklung, Mobile Apps, UI/UX Design. Persönliche Betreuung, transparente Festpreise.',
    images: ['/og-images/services.jpg'],
  },
  alternates: {
    canonical: 'https://headon.pro/services',
  },
}

export default function ServicesPage() {
  return (
    <>
      <ItemListSchema
        itemList={{
          name: 'HEADON Services',
          description:
            'Professionelle Digitallösungen: Web Development, Mobile Apps, UI/UX Design und Backend-Entwicklung',
          items: [
            {
              name: 'Webentwicklung',
              url: '/services/web-development',
              description:
                'Professionelle Webentwicklung mit Next.js & React. Performant, SEO-optimiert und skalierbar.',
              image: '/og-images/web-dev.jpg',
            },
            {
              name: 'Mobile App Entwicklung',
              url: '/services/mobile-development',
              description:
                'Native und Cross-Platform Apps für iOS und Android mit React Native und Flutter.',
              image: '/og-images/mobile-dev.jpg',
            },
            {
              name: 'UI/UX Design',
              url: '/services/ui-ux-design',
              description:
                'User-zentriertes Design mit Fokus auf Usability und Ästhetik. Von Wireframes bis zum finalen Design System.',
              image: '/og-images/design.jpg',
            },
            {
              name: 'Backend Solutions',
              url: '/services/backend-solutions',
              description:
                'Skalierbare Cloud-Infrastruktur und API-Entwicklung mit Supabase, PostgreSQL und Node.js.',
              image: '/og-images/backend.jpg',
            },
          ],
        }}
      />
      <ServicesContent />
    </>
  )
}
