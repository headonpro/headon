import { getAllBranchePages } from '@/lib/content/content-api'
import BranchenOverviewContent from '@/components/sections/BranchenOverviewContent'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Branchen-Lösungen | HEADON - Enterprise Web Development',
  description:
    'Spezialisierte Website-Lösungen mit Enterprise-Architektur. Next.js 15, TypeScript, Performance-optimiert. Für Gastronomie, Handwerk, Einzelhandel, Beratung, Immobilien und Fitness.',
  alternates: {
    canonical: 'https://headon.pro/branchen',
  },
  openGraph: {
    title: 'Branchen-Lösungen | HEADON - Enterprise Web Development',
    description:
      'Spezialisierte Website-Lösungen mit Enterprise-Architektur. Performance-optimiert, skalierbar und sicher.',
    url: 'https://headon.pro/branchen',
    type: 'website',
  },
}

/**
 * Branchen Overview Page
 * Displays all available industry-specific landing pages with enterprise-level features
 */
export default async function BranchenPage() {
  const branchePages = await getAllBranchePages()

  return <BranchenOverviewContent branchePages={branchePages} />
}
