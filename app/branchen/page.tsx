import { getAllBranchePages } from '@/lib/content/content-api'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import * as Icons from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Branchen-Lösungen | HEADON - Webdesign für jede Branche',
  description:
    'Spezialisierte Website-Lösungen für Gastronomie, Handwerk, Einzelhandel, Beratung, Immobilien und Fitness. Maßgeschneidert für Ihre Branche.',
  alternates: {
    canonical: 'https://headon.pro/branchen',
  },
  openGraph: {
    title: 'Branchen-Lösungen | HEADON - Webdesign für jede Branche',
    description:
      'Spezialisierte Website-Lösungen für Gastronomie, Handwerk, Einzelhandel, Beratung, Immobilien und Fitness.',
    url: 'https://headon.pro/branchen',
    type: 'website',
  },
}

/**
 * Branchen Overview Page
 * Displays all available industry-specific landing pages
 */
export default async function BranchenPage() {
  const branchePages = await getAllBranchePages()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
              Website-Lösungen für Ihre Branche
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-white/90">
              Spezialisierte Websites, die auf die Anforderungen Ihrer Branche zugeschnitten sind.
              Von der Gastronomie bis zum Immobiliengeschäft – wir kennen Ihre Bedürfnisse.
            </p>
          </div>
        </div>
      </section>

      {/* Branchen Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {branchePages.map((branche) => {
              const IconComponent = Icons[branche.frontmatter.icon as keyof typeof Icons] as
                | React.ComponentType<{ className?: string }>
                | undefined

              return (
                <Link
                  key={branche.slug}
                  href={`/branchen/${branche.slug}`}
                  className="group"
                  aria-label={`Zur ${branche.frontmatter.name} Seite`}
                >
                  <div className="h-full rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:border-primary-500 hover:shadow-xl">
                    {/* Icon */}
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-primary-100 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                      {IconComponent && <IconComponent className="h-8 w-8" />}
                    </div>

                    {/* Content */}
                    <h2 className="mb-3 text-2xl font-bold text-gray-900 transition-colors group-hover:text-primary-600">
                      {branche.frontmatter.name}
                    </h2>
                    <p className="mb-4 text-gray-600">{branche.frontmatter.description}</p>

                    {/* Pricing */}
                    <div className="mb-6 text-sm font-semibold text-primary-600">
                      ab {branche.frontmatter.pricing.from.toLocaleString('de-DE')}{' '}
                      {branche.frontmatter.pricing.currency}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center text-primary-600 transition-colors group-hover:text-primary-700">
                      <span className="font-semibold">Mehr erfahren</span>
                      <Icons.ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Ihre Branche nicht dabei?
            </h2>
            <p className="mb-8 text-xl text-gray-600">
              Wir entwickeln maßgeschneiderte Lösungen für jede Branche. Sprechen Sie uns an!
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/contact">
                <Button size="lg" className="text-white">
                  Jetzt Beratung anfragen
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button size="lg" variant="outline">
                  Portfolio ansehen
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
