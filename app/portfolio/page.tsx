import type { Metadata } from 'next'
import PortfolioContent from '@/components/sections/PortfolioContent'
import { getAllPortfolioProjects } from '@/lib/content/content-api'

export const metadata: Metadata = {
  title: 'Portfolio - Erfolgreiche Projekte & Case Studies | HEADON',
  description:
    'Unser Portfolio: SV Viktoria Website-Relaunch, KLARTEXT KI-App, SaaS Dashboards & Healthcare Plattformen. Erfolgreiche digitale Projekte von HEADON.',
  keywords:
    'Portfolio Digitalagentur, Website Relaunch, Mobile App Entwicklung, KI Sprachassistent, SaaS Dashboard, Healthcare Platform, Web Development Projekte, Lauda-Königshofen',
  openGraph: {
    title: 'Portfolio - Erfolgreiche digitale Projekte von HEADON',
    description:
      'Von Website-Relaunches bis hin zu KI-Apps - Entdecken Sie unsere erfolgreichen digitalen Projekte und Case Studies.',
    url: 'https://headon.pro/portfolio',
    siteName: 'HEADON.pro',
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: '/og-images/services.jpg',
        width: 1200,
        height: 630,
        alt: 'HEADON.pro - Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio - HEADON Digitalprojekte',
    description:
      'Erfolgreiche Web- und Mobile-Projekte: SV Viktoria, KLARTEXT App, SaaS Dashboards',
    images: ['/og-images/services.jpg'],
  },
  alternates: {
    canonical: 'https://headon.pro/portfolio',
  },
}

/**
 * Portfolio Page
 * Server component that loads all portfolio projects
 */
export default async function PortfolioPage() {
  // Load all portfolio projects from content API
  const projects = await getAllPortfolioProjects()

  return <PortfolioContent projects={projects} />
}
