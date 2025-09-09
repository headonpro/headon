import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Über uns | HEADON.pro - Ihre Digitalagentur in Freiburg',
  description: 'Lernen Sie HEADON.pro kennen - Ein junges, dynamisches Team von Digital-Experten in Freiburg. Wir verbinden Kreativität mit modernster Technologie.',
  keywords: 'Digitalagentur Freiburg, Webagentur Baden-Württemberg, Team, Über uns, Digital Experten, Kreativagentur, Full-Service Agentur',
  openGraph: {
    title: 'Über HEADON.pro | Digitalagentur Freiburg',
    description: 'Passion für digitale Exzellenz - Lernen Sie unser Team kennen',
    url: 'https://headon.pro/about',
    type: 'website',
    images: [
      {
        url: 'https://headon.pro/images/team-og.jpg',
        width: 1200,
        height: 630,
        alt: 'HEADON.pro Team',
      },
    ],
  },
  alternates: {
    canonical: 'https://headon.pro/about',
  },
}