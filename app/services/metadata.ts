import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Unsere Services | HEADON.pro - Web Development, Apps & Design',
  description: 'Professionelle Web-Entwicklung, Mobile Apps, UI/UX Design und Cloud-Lösungen. Digitalagentur für Bad Mergentheim, Lauda-Königshofen, Tauberbischofsheim, Wertheim, Marktheidenfeld und Würzburg.',
  keywords: 'Web Development Bad Mergentheim, Digitalagentur Lauda-Königshofen, App Entwicklung Tauberbischofsheim, UI/UX Design Wertheim, Next.js Agentur Marktheidenfeld, TypeScript Experten Würzburg, Cloud Solutions',
  openGraph: {
    title: 'Digital Services | HEADON.pro',
    description: 'Von der Idee zur fertigen Lösung - Wir bieten Full-Service Digitalentwicklung',
    url: 'https://headon.pro/services',
    type: 'website',
    images: [
      {
        url: 'https://headon.pro/headon-logo.svg',
        width: 1200,
        height: 630,
        alt: 'HEADON.pro Services - Digitalagentur Lauda-Königshofen',
      },
    ],
  },
  alternates: {
    canonical: 'https://headon.pro/services',
  },
}