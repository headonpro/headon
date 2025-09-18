import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Über uns | HEADON.pro - Ihre Digitalagentur in Lauda-Königshofen',
  description: 'Lernen Sie HEADON.pro kennen - Ein junges, dynamisches Team von Digital-Experten in Lauda-Königshofen. Wir verbinden Kreativität mit modernster Technologie.',
  keywords: 'Digitalagentur Lauda-Königshofen, Webagentur Baden-Württemberg, Team, Über uns, Digital Experten, Kreativagentur, Full-Service Agentur',
  openGraph: {
    title: 'Über HEADON.pro | Digitalagentur Lauda-Königshofen',
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