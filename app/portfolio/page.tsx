import type { Metadata } from 'next'
import PortfolioContent from '@/components/sections/PortfolioContent'

export const metadata: Metadata = {
  title: 'Portfolio - Erfolgreiche Projekte & Case Studies | HEADON',
  description: 'Entdecken Sie unser Portfolio: SV Viktoria Wertheim Website-Relaunch, KLARTEXT KI-Sprachassistent App, SaaS Dashboards und Healthcare Plattformen. Erfolgreiche digitale Projekte von HEADON.',
  keywords: 'Portfolio Digitalagentur, Website Relaunch, Mobile App Entwicklung, KI Sprachassistent, SaaS Dashboard, Healthcare Platform, Web Development Projekte, Lauda-Königshofen',
  openGraph: {
    title: 'Portfolio - Erfolgreiche digitale Projekte von HEADON',
    description: 'Von Website-Relaunches bis hin zu KI-Apps - Entdecken Sie unsere erfolgreichen digitalen Projekte und Case Studies.',
    url: 'https://headon.pro/portfolio',
    siteName: 'HEADON.pro',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio - HEADON Digitalprojekte',
    description: 'Erfolgreiche Web- und Mobile-Projekte: SV Viktoria, KLARTEXT App, SaaS Dashboards',
  },
  alternates: {
    canonical: 'https://headon.pro/portfolio',
  },
}

export default function PortfolioPage() {
  return <PortfolioContent />
}