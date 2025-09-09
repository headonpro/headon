import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Unsere Services | HEADON.pro - Web Development, Apps & Design',
  description: 'Professionelle Web-Entwicklung, Mobile Apps, UI/UX Design und Cloud-Lösungen. Maßgeschneiderte digitale Services für Ihr Unternehmen in Freiburg und deutschlandweit.',
  keywords: 'Web Development Freiburg, App Entwicklung, UI/UX Design, React Entwicklung, Next.js Agentur, TypeScript Experten, Cloud Solutions, API Integration',
  openGraph: {
    title: 'Digital Services | HEADON.pro',
    description: 'Von der Idee zur fertigen Lösung - Wir bieten Full-Service Digitalentwicklung',
    url: 'https://headon.pro/services',
    type: 'website',
    images: [
      {
        url: 'https://headon.pro/images/services-og.jpg',
        width: 1200,
        height: 630,
        alt: 'HEADON.pro Services',
      },
    ],
  },
  alternates: {
    canonical: 'https://headon.pro/services',
  },
}