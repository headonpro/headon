import { getAllCityPages } from '@/lib/content/content-api'
import { Metadata } from 'next'
import RegionenContent from '@/components/sections/RegionenContent'

export const metadata: Metadata = {
  title: 'Regionen - Webentwicklung Main-Tauber-Kreis | HEADON',
  description:
    'Professionelle Webentwicklung in Main-Tauber-Kreis: Bad Mergentheim, Wertheim, Tauberbischofsheim, Würzburg. Persönlicher Service vor Ort.',
  keywords:
    'Webentwicklung Main-Tauber-Kreis, Digitalagentur Bad Mergentheim, Kreativagentur Wertheim, App Entwicklung Tauberbischofsheim, Webdesign Würzburg',
  openGraph: {
    title: 'Service-Regionen Main-Tauber-Kreis | HEADON.pro',
    description:
      'Professionelle Webentwicklung in Main-Tauber-Kreis. Persönlicher Service in Bad Mergentheim, Wertheim, Tauberbischofsheim und Würzburg.',
    type: 'website',
    url: 'https://headon.pro/regionen',
    siteName: 'HEADON.pro',
    locale: 'de_DE',
    images: [
      {
        url: '/og-images/services.jpg',
        width: 1200,
        height: 630,
        alt: 'HEADON.pro - Service-Regionen',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Service-Regionen | HEADON.pro',
    description: 'Webentwicklung in Main-Tauber-Kreis - Persönlicher Service vor Ort',
    images: ['/og-images/services.jpg'],
  },
  alternates: {
    canonical: 'https://headon.pro/regionen',
  },
}

export default async function RegionenPage() {
  const cities = await getAllCityPages()

  return <RegionenContent cities={cities} />
}
