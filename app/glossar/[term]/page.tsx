import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Tag, Link2, CheckCircle2 } from 'lucide-react'
import { glossaryTerms, getTermById } from '@/lib/content/glossary'
import { generatePageMetadata } from '@/lib/seo/meta-builder'

/**
 * Dynamic Glossary Term Page
 *
 * Individual pages for each glossary term with full content.
 * Optimized for "Was ist [term]?" search queries.
 * Uses Static Site Generation (SSG) via generateStaticParams.
 */

interface GlossaryTermPageProps {
  params: Promise<{
    term: string
  }>
}

// ============================================================================
// Static Site Generation
// ============================================================================

/**
 * Generate static params for all glossary terms
 * This enables SSG for all term pages at build time
 */
export async function generateStaticParams() {
  return glossaryTerms.map((term) => ({
    term: term.id,
  }))
}

// ============================================================================
// Metadata Generation
// ============================================================================

/**
 * Generate metadata for each term page
 * Title format: "[Term] - Glossar | HEADON.pro"
 */
export async function generateMetadata({ params }: GlossaryTermPageProps): Promise<Metadata> {
  const { term: termId } = await params
  const term = getTermById(termId)

  if (!term) {
    return {
      title: 'Begriff nicht gefunden | HEADON.pro',
    }
  }

  // Create SEO-optimized title and description
  const title = `${term.term} - Glossar | HEADON.pro`
  const description = `Was ist ${term.term}? ${term.shortDefinition} ✓ Umfassende Erklärung ✓ Vorteile ✓ Verwandte Begriffe. Jetzt mehr erfahren!`

  return generatePageMetadata({
    title,
    description,
    slug: `glossar/${termId}`,
    image: '/og-images/services.jpg',
  })
}

// ============================================================================
// Page Component
// ============================================================================

export default async function GlossaryTermPage({ params }: GlossaryTermPageProps) {
  const { term: termId } = await params
  const term = getTermById(termId)

  // Return 404 if term not found
  if (!term) {
    notFound()
  }

  // Get category label in German
  const categoryLabel = {
    technology: 'Technologie',
    design: 'Design',
    development: 'Entwicklung',
    marketing: 'Marketing',
  }[term.category]

  return (
    <main className="min-h-screen bg-white">
      {/* Header Navigation */}
      <section className="bg-primary-600/10 py-4">
        <div className="container">
          <Link
            href="/glossar"
            className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück zum Glossar
          </Link>
        </div>
      </section>

      {/* Term Header */}
      <section className="from-primary-600 via-primary-500 to-secondary-500 relative overflow-hidden bg-gradient-to-br py-16 md:py-24">
        <div className="from-primary-600 via-primary-500 to-secondary-500 absolute inset-0 bg-gradient-to-br" />

        <div className="relative z-10 container">
          <div className="mx-auto max-w-4xl">
            {/* Category Badge */}
            <div className="mb-4 flex items-center gap-2">
              <Tag className="h-4 w-4 text-white/80" />
              <span className="bg-accent text-primary rounded-full px-3 py-1 text-sm font-medium capitalize">
                {categoryLabel}
              </span>
            </div>

            {/* Term Title */}
            <h1 className="font-heading mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {term.term}
            </h1>

            {/* Short Definition */}
            <p className="text-xl leading-relaxed text-white/90">{term.shortDefinition}</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container">
          <div className="mx-auto max-w-4xl">
            <div className="space-y-12">
              {/* Full Explanation */}
              <div>
                <h2 className="mb-6 text-2xl font-bold text-gray-900">Ausführliche Erklärung</h2>
                <div className="prose prose-neutral max-w-none">
                  {term.fullExplanation.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 leading-relaxed text-gray-700">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              {term.benefits.length > 0 && (
                <div>
                  <h2 className="mb-6 text-2xl font-bold text-gray-900">Vorteile & Nutzen</h2>
                  <ul className="space-y-4">
                    {term.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="text-primary-600 mt-1 h-5 w-5 shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Related Terms */}
              {term.relatedTerms.length > 0 && (
                <div>
                  <h2 className="mb-6 text-2xl font-bold text-gray-900">Verwandte Begriffe</h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {term.relatedTerms.map((related) => (
                      <Link
                        key={related.id}
                        href={`/glossar/${related.id}`}
                        className="group hover:border-primary-500 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:shadow-md"
                      >
                        <div className="flex items-center gap-2">
                          <span className="group-hover:text-primary-600 font-medium text-gray-900">
                            {related.term}
                          </span>
                          <svg
                            className="h-4 w-4 text-gray-500 transition-transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Resources */}
              {term.resources && term.resources.length > 0 && (
                <div>
                  <h2 className="mb-6 text-2xl font-bold text-gray-900">
                    Weiterführende Ressourcen
                  </h2>
                  <ul className="space-y-3">
                    {term.resources.map((resource, index) => (
                      <li key={index}>
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group text-primary-600 hover:text-primary-700 inline-flex items-center gap-2 transition-colors"
                        >
                          <Link2 className="h-4 w-4" />
                          <span className="decoration-primary-600/30 group-hover:decoration-primary-600/60 underline">
                            {resource.title}
                          </span>
                          <svg
                            className="h-4 w-4 opacity-70"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="from-primary-600 via-primary-500 to-secondary-500 relative overflow-hidden bg-gradient-to-br py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading mb-4 text-3xl font-bold text-white md:text-4xl">
              Möchten Sie {term.term} in Ihrem Projekt einsetzen?
            </h2>
            <p className="mb-8 text-lg text-white/90">
              Unser Expertenteam berät Sie gerne, welche Technologien und Ansätze für Ihr konkretes
              Projekt am besten geeignet sind.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="bg-accent hover:bg-accent/90 text-primary inline-flex items-center justify-center rounded-lg px-8 py-3 text-base font-semibold shadow-xl transition-all duration-300 hover:shadow-2xl"
              >
                Kostenlose Beratung vereinbaren
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white bg-transparent px-8 py-3 text-base font-semibold text-white transition-all duration-300 hover:bg-white/10"
              >
                Unsere Services entdecken
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
