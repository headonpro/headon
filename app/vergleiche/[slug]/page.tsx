/**
 * Comparison Article Detail Page
 *
 * Dynamic route for individual comparison articles.
 * Features:
 * - SSG with generateStaticParams
 * - Article schema for SEO
 * - Interactive comparison table
 * - Pros/cons lists
 * - CTA to related service
 */

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Check, X, Calendar, User } from 'lucide-react'
import { comparisonArticles } from '@/lib/content/comparisons'
import ComparisonTable from '@/components/content/ComparisonTable'
import SchemaGenerator, { BreadcrumbSchema } from '@/components/seo/SchemaGenerator'
import { buildArticleSchema } from '@/lib/seo/schema-builder'

// ============================================================================
// Static Generation
// ============================================================================

/**
 * Generate static params for all comparison articles
 * Enables SSG at build time
 */
export async function generateStaticParams() {
  return comparisonArticles.map((article) => ({
    slug: article.slug,
  }))
}

/**
 * Generate metadata for each comparison article
 * Optimized for SEO and social sharing
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = comparisonArticles.find((a) => a.slug === slug)

  if (!article) {
    return {
      title: 'Vergleich nicht gefunden | HEADON.pro',
    }
  }

  const itemNames = article.items.map((item) => item.name).join(' vs ')
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://headon.pro'
  const pageUrl = `${baseUrl}/vergleiche/${slug}`

  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords.join(', '),
    authors: [{ name: article.author.name }],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      url: pageUrl,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author.name],
      images: article.ogImage
        ? [
            {
              url: article.ogImage,
              width: 1200,
              height: 630,
              alt: itemNames,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: article.ogImage ? [article.ogImage] : undefined,
    },
  }
}

// ============================================================================
// Page Component
// ============================================================================

export default async function ComparisonArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = comparisonArticles.find((a) => a.slug === slug)

  if (!article) {
    notFound()
  }

  const itemNames = article.items.map((item) => item.name).join(' vs ')

  // Build Article schema for SEO
  const articleSchema = buildArticleSchema({
    frontmatter: {
      title: article.title,
      description: article.description,
      publishedAt: article.publishedAt,
      updatedAt: article.updatedAt,
      author: article.author,
      tags: article.keywords,
      category: 'development' as const,
      image: {
        url: article.ogImage || '/og-images/services.jpg',
        alt: itemNames,
      },
      readingTime: 8, // Estimate
      featured: false,
    },
    slug: article.slug,
    content: article.introduction + '\n\n' + article.conclusion,
  })

  return (
    <>
      {/* Article Schema */}
      <SchemaGenerator schema={articleSchema} />

      {/* Breadcrumb Schema for SEO */}
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Vergleiche', url: '/vergleiche' },
          { name: itemNames, url: `/vergleiche/${slug}` },
        ]}
      />

      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="from-primary-600 via-primary-500 to-secondary-500 relative overflow-hidden bg-gradient-to-br py-16 md:py-24">
          <div className="from-primary-600 via-primary-500 to-secondary-500 absolute inset-0 bg-gradient-to-br" />

          <div className="relative z-10 container mx-auto max-w-4xl px-4">
            {/* Breadcrumb */}
            <nav className="mb-6 text-sm text-white/80">
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
              <span className="mx-2">›</span>
              <Link href="/vergleiche" className="transition-colors hover:text-white">
                Vergleiche
              </Link>
              <span className="mx-2">›</span>
              <span className="text-white">{itemNames}</span>
            </nav>

            {/* Title */}
            <h1 className="font-heading mb-6 text-3xl font-bold text-white md:text-5xl">
              {article.title}
            </h1>

            {/* Meta Info */}
            <div className="mb-6 flex flex-wrap items-center gap-6 text-sm text-white/80">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{article.author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={article.publishedAt}>
                  {new Date(article.publishedAt).toLocaleDateString('de-DE', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-accent text-primary rounded-full px-3 py-1 font-medium">
                  {article.items.length} Optionen
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg leading-relaxed text-white/90 md:text-xl">
              {article.description}
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="prose prose-lg max-w-none">
              <p className="leading-relaxed text-gray-700">{article.introduction}</p>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="bg-gray-50 py-12 md:py-16">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
              Feature-Vergleich im Detail
            </h2>
            <ComparisonTable items={article.items} featureCategories={article.featureCategories} />
          </div>
        </section>

        {/* Pros & Cons for each item */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
              Vor- und Nachteile im Detail
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {article.items.map((item, index) => (
                <ItemProsCons key={index} item={item} />
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases & Recommendations */}
        <section className="bg-gray-50 py-12 md:py-16">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
              Wann welche Option wählen?
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {article.items.map((item, index) => (
                <div key={index} className="rounded-xl border-2 border-gray-200 bg-white p-6">
                  <h3 className="mb-4 text-xl font-bold text-gray-900">{item.name}</h3>
                  <div className="mb-4">
                    <h4 className="mb-2 text-sm font-semibold tracking-wide text-gray-700 uppercase">
                      Ideal für:
                    </h4>
                    <p className="text-sm text-gray-600">{item.useCase}</p>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="mb-2 text-sm font-semibold tracking-wide text-gray-700 uppercase">
                      Empfehlung:
                    </h4>
                    <p className="text-sm text-gray-600">{item.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Conclusion */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto max-w-4xl px-4">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Fazit</h2>
            <div className="prose prose-lg max-w-none">
              <p className="leading-relaxed text-gray-700">{article.conclusion}</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {article.relatedService && (
          <section className="from-primary-600 via-primary-500 to-secondary-500 relative overflow-hidden bg-gradient-to-br py-16 md:py-24">
            <div className="container mx-auto max-w-4xl px-4 text-center">
              <h2 className="font-heading mb-6 text-3xl font-bold text-white md:text-4xl">
                Benötigen Sie Unterstützung bei der Umsetzung?
              </h2>
              <p className="mb-8 text-lg text-white/90">
                Wir helfen Ihnen gerne bei der Auswahl und Umsetzung der optimalen Lösung für Ihr
                Projekt.
              </p>
              <Link
                href={article.relatedService.url}
                className="bg-accent hover:bg-accent/90 text-primary inline-flex items-center gap-2 rounded-lg px-8 py-4 font-semibold shadow-xl transition-colors hover:shadow-2xl"
              >
                {article.relatedService.cta}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </section>
        )}

        {/* Related Articles */}
        <section className="bg-gray-50 py-12 md:py-16">
          <div className="container mx-auto max-w-6xl px-4">
            <h2 className="mb-8 text-2xl font-bold text-gray-900">Weitere Vergleiche</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {comparisonArticles
                .filter((a) => a.slug !== article.slug)
                .slice(0, 3)
                .map((relatedArticle) => (
                  <Link
                    key={relatedArticle.slug}
                    href={`/vergleiche/${relatedArticle.slug}`}
                    className="hover:border-primary-500 block rounded-lg border border-gray-200 bg-white p-4 transition-all hover:shadow-md"
                  >
                    <h3 className="mb-2 font-semibold text-gray-900">
                      {relatedArticle.items.map((item) => item.name).join(' vs ')}
                    </h3>
                    <p className="line-clamp-2 text-sm text-gray-600">
                      {relatedArticle.description}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

// ============================================================================
// Item Pros/Cons Component
// ============================================================================

interface ItemProsConsProps {
  item: (typeof comparisonArticles)[0]['items'][0]
}

function ItemProsCons({ item }: ItemProsConsProps) {
  return (
    <div className="rounded-xl border-2 border-gray-200 bg-white p-6">
      <h3 className="mb-6 text-xl font-bold text-gray-900">{item.name}</h3>

      {/* Pros */}
      <div className="mb-6">
        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold tracking-wide text-green-700 uppercase">
          <Check className="h-4 w-4" />
          Vorteile
        </h4>
        <ul className="space-y-2">
          {item.pros.map((pro, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
              <span>{pro}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Cons */}
      <div>
        <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold tracking-wide text-red-700 uppercase">
          <X className="h-4 w-4" />
          Nachteile
        </h4>
        <ul className="space-y-2">
          {item.cons.map((con, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
              <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
              <span>{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
