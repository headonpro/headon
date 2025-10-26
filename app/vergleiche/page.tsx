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
import { cn } from '@/lib/utils'
import { VergleicheHero } from '@/components/sections/VergleicheHero'

// ============================================================================
// Metadata
// ============================================================================

export const metadata: Metadata = {
  title: 'Vergleiche: React vs Vue, Native vs Cross-Platform & mehr | HEADON.pro',
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
  openGraph: {
    title: 'Technologie-Vergleiche für bessere Entscheidungen',
    description:
      'Detaillierte Vergleiche von Frameworks, Technologien und Ansätzen. Fundierte Entscheidungen für Ihr Projekt treffen.',
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
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {comparisonArticles.map((article) => (
              <ComparisonCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="from-primary-600 via-primary-500 to-secondary-500 relative overflow-hidden bg-gradient-to-br py-24">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-heading mb-6 text-3xl font-bold text-white md:text-4xl">
            Noch Fragen zur richtigen Technologie?
          </h2>
          <p className="mb-8 text-lg text-white/90 md:text-xl">
            Wir beraten Sie gerne bei der Auswahl der optimalen Technologien für Ihr Projekt.
            Kostenlose 15-Minuten-Beratung.
          </p>
          <Link
            href="/contact"
            className="bg-accent hover:bg-accent/90 text-primary inline-flex items-center gap-2 rounded-lg px-8 py-4 text-lg font-semibold shadow-xl transition-all duration-300 hover:shadow-2xl"
          >
            Kostenlose Beratung anfragen
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </main>
  )
}

// ============================================================================
// Comparison Card Component
// ============================================================================

interface ComparisonCardProps {
  article: (typeof comparisonArticles)[0]
}

function ComparisonCard({ article }: ComparisonCardProps) {
  // Extract item names for the "vs" display
  const itemNames = article.items.map((item) => item.name).join(' vs ')

  return (
    <Link
      href={`/vergleiche/${article.slug}`}
      className={cn(
        'group block rounded-xl border-2 border-gray-200 bg-white p-6 shadow-md',
        'hover:border-primary-500 transition-all duration-300 hover:shadow-xl'
      )}
    >
      {/* Header */}
      <div className="mb-4">
        <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
          <span className="bg-primary-100 text-primary-700 rounded-md px-2 py-1 font-medium">
            {article.items.length} Optionen
          </span>
          <span>•</span>
          <time dateTime={article.publishedAt}>
            {new Date(article.publishedAt).toLocaleDateString('de-DE', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </div>
        <h2 className="group-hover:text-primary-600 mb-2 text-2xl font-bold text-gray-900 transition-colors">
          {itemNames}
        </h2>
        <p className="line-clamp-2 text-gray-600">{article.description}</p>
      </div>

      {/* Items Preview */}
      <div className="mb-4 flex flex-wrap gap-2">
        {article.items.map((item, index) => (
          <span
            key={index}
            className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700"
          >
            {item.name}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">
          {article.featureCategories.reduce((acc, cat) => acc + cat.features.length, 0)} Features
          verglichen
        </span>
        <span className="text-primary-600 flex items-center gap-1 font-medium transition-all group-hover:gap-2">
          Vergleich lesen
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}
