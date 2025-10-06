import { getAllCityPages } from '@/lib/content/content-api'
import { Metadata } from 'next'
import RegionenContent from '@/components/sections/RegionenContent'

export const metadata: Metadata = {
  title: 'Service-Regionen | HEADON.pro',
  description:
    'HEADON.pro bietet professionelle Webentwicklung in der Region Main-Tauber-Kreis. Wir kommen persönlich zu Ihnen nach Bad Mergentheim, Wertheim, Tauberbischofsheim, Würzburg und weitere Städte.',
  openGraph: {
    title: 'Service-Regionen | HEADON.pro',
    description:
      'HEADON.pro bietet professionelle Webentwicklung in der Region Main-Tauber-Kreis. Persönlicher Service vor Ort.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://headon.pro/regionen',
  },
}

export default async function RegionenPage() {
  const cities = await getAllCityPages()

  return <RegionenContent cities={cities} />
}
