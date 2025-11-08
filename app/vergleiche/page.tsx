/**
 * Comparison Articles Listing Page
 *
 * Displays all comparison articles in a card grid layout.
 * Optimized for SEO with proper metadata and SSG.
 */

import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { comparisonArticles } from '@/lib/content/comparisons'
import { VergleicheHero } from '@/components/sections/VergleicheHero'
import { ComparisonCard } from '@/components/sections/ComparisonCard'

// ============================================================================
// Metadata
// ============================================================================

export const metadata: Metadata = {
  title: 'Technologie-Vergleiche für bessere Entscheidungen | HEADON',
  description:
    'Ausführliche Technologie-Vergleiche für fundierte Entscheidungen: React vs Vue, Native vs Cross-Platform, Website vs Web-App, WordPress vs Custom Development.',
  keywords: [
    'technologie vergleich',
    'react vs vue',
    'native vs cross platform',
    'website vs web app',
    'wordpress vs custom development',
    'framework vergleich',
    'entwicklung entscheidungen',
  ].join(', '),
  alternates: {
    canonical: 'https://headon.pro/vergleiche',
  },
  openGraph: {
    title: 'Technologie-Vergleiche für bessere Entscheidungen',
    description:
      'Detaillierte Vergleiche von Frameworks, Technologien und Ansätzen. Fundierte Entscheidungen für Ihr Projekt treffen.',
    url: 'https://headon.pro/vergleiche',
    type: 'website',
    siteName: 'HEADON.pro',
    locale: 'de_DE',
    images: [
      {
        url: '/og-images/services.jpg',
        width: 1200,
        height: 630,
        alt: 'HEADON.pro Technologie-Vergleiche',
      },
    ],
  },
}

// ============================================================================
// Component
// ============================================================================

export default function VergleichePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section with integrated content */}
      <VergleicheHero />

      {/* Comparison Articles Grid */}
      <section className="relative overflow-hidden py-20 md:py-32">
        {/* Subtle Background Pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(0,0,0)_1px,transparent_0)] [background-size:24px_24px]" />
        </div>

        <div className="relative container mx-auto max-w-6xl px-4">
          {/* Section Header */}
          <div className="mb-12 text-center md:mb-16">
            <div className="border-primary-200 bg-primary-50 mb-4 inline-flex items-center gap-2 rounded-full border-2 px-4 py-2">
              <span className="text-primary-700 text-sm font-semibold">
                {comparisonArticles.length} ausführliche Vergleiche
              </span>
            </div>
            <h2 className="font-heading mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Unsere Vergleiche
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Fundierte Analysen basierend auf realen Projekterfahrungen. Finden Sie die richtige
              Technologie für Ihr Projekt.
            </p>
          </div>

          {/* Grid */}
          <div className="grid gap-8 md:grid-cols-2">
            {comparisonArticles.map((article, index) => (
              <ComparisonCard key={article.slug} article={article} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="from-primary-600 via-primary-500 to-secondary-500 relative overflow-hidden bg-gradient-to-br py-24">
        {/* Decorative Elements */}
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 h-64 w-64 rounded-full bg-white blur-3xl" />
          <div className="absolute right-10 bottom-10 h-80 w-80 rounded-full bg-white blur-3xl" />
        </div>

        {/* Animated dots pattern */}
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:40px_40px]" />
        </div>

        <div className="relative container mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading mb-6 text-3xl font-bold text-white md:text-4xl">
            Noch Fragen zur richtigen Technologie?
          </h2>
          <p className="mb-8 text-lg text-white/90 md:text-xl">
            Wir beraten Sie gerne bei der Auswahl der optimalen Technologien für Ihr Projekt.
          </p>

          {/* Trust Badges */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-4 text-sm text-white/90 md:gap-6">
            <div className="flex items-center gap-2">
              <div className="bg-accent h-2 w-2 rounded-full" />
              <span>15min Beratung</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-accent h-2 w-2 rounded-full" />
              <span>Unverbindlich</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-accent h-2 w-2 rounded-full" />
              <span>Kostenlos</span>
            </div>
          </div>

          <Link
            href="/contact"
            className="bg-accent hover:bg-accent/90 text-primary inline-flex items-center gap-2 rounded-lg px-8 py-4 text-lg font-semibold shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            Kostenlose Beratung anfragen
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  )
}
