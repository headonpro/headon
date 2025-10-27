import { getAllTechnologyPages } from '@/lib/content/content-api'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Technologien | HEADON - Unsere Tech-Stack',
  description:
    'Moderne Webtechnologien für zukunftssichere Projekte. Next.js, React, TypeScript, Supabase, Headless CMS und Tailwind CSS - Expertise für Ihre digitale Transformation.',
  openGraph: {
    title: 'Technologien | HEADON - Unsere Tech-Stack',
    description:
      'Moderne Webtechnologien für zukunftssichere Projekte. Next.js, React, TypeScript und mehr.',
    url: 'https://headon.pro/technologie',
    type: 'website',
  },
}

/**
 * Technologies Overview Page
 * Displays all available technology showcase pages
 */
export default async function TechnologiePage() {
  const technologyPages = await getAllTechnologyPages()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 py-24 text-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl">
              Unsere Technologien
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-white/90">
              Moderne, bewährte Technologien für zukunftssichere und performante digitale Lösungen.
              Wir setzen auf Best-in-Class Tools für Ihre Projekte.
            </p>
          </div>
        </div>
      </section>

      {/* Technology Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {technologyPages.map((tech) => (
              <Link
                key={tech.slug}
                href={`/technologie/${tech.slug}`}
                className="group"
                aria-label={`Zur ${tech.frontmatter.name} Seite`}
              >
                <div className="h-full rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:border-primary-500 hover:shadow-xl">
                  {/* Logo */}
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-xl bg-white p-3 shadow-md">
                    <Image
                      src={tech.frontmatter.logo}
                      alt={tech.frontmatter.officialName}
                      width={64}
                      height={64}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  {/* Content */}
                  <h2 className="mb-2 text-2xl font-bold text-gray-900 transition-colors group-hover:text-primary-600">
                    {tech.frontmatter.name}
                  </h2>
                  {tech.frontmatter.version && (
                    <p className="mb-3 text-sm font-semibold text-gray-500">
                      Version {tech.frontmatter.version}
                    </p>
                  )}
                  <p className="mb-4 text-gray-600">{tech.frontmatter.description}</p>

                  {/* Benefits Count */}
                  <div className="mb-6 flex items-center gap-4 text-sm text-gray-500">
                    <span>{tech.frontmatter.benefits.length} Vorteile</span>
                    <span>•</span>
                    <span>{tech.frontmatter.useCases.length} Use Cases</span>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center text-primary-600 transition-colors group-hover:text-primary-700">
                    <span className="font-semibold">Mehr erfahren</span>
                    <svg
                      className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why These Technologies Section */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
              Warum diese Technologien?
            </h2>
            <p className="mb-12 text-xl text-gray-600">
              Wir wählen unsere Tools nicht nach Trends, sondern nach bewährter Qualität,
              Langlebigkeit und dem besten Ergebnis für unsere Kunden.
            </p>

            <div className="grid gap-8 text-left md:grid-cols-3">
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">Performance</h3>
                <p className="text-gray-600">
                  Schnelle Ladezeiten, optimierte Performance und hervorragende User Experience.
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">Sicherheit</h3>
                <p className="text-gray-600">
                  Enterprise-grade Sicherheit mit modernsten Standards und Best Practices.
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">Skalierbarkeit</h3>
                <p className="text-gray-600">
                  Wächst mit Ihrem Geschäft - von der MVP bis zur Enterprise-Lösung.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Bereit für moderne Technologien?
            </h2>
            <p className="mb-8 text-xl text-gray-600">
              Lassen Sie uns gemeinsam die beste Tech-Lösung für Ihr Projekt finden.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/contact">
                <Button size="lg" className="text-white">
                  Kostenloses Beratungsgespräch
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button size="lg" variant="outline">
                  Projekte ansehen
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
