import { notFound } from 'next/navigation'
import { getServicePage, getRelatedPortfolioProjects } from '@/lib/content/content-api'
import { compileMDXContent } from '@/lib/content/mdx-compiler'
import { generateMetadata } from './metadata'
import MDXContent from '@/components/content/MDXContent'
import { Check, Clock, Code2, Smartphone, Palette, Database, LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import FAQSection from '@/components/sections/FAQSection'
import { FAQSchema } from '@/components/seo/SchemaGenerator'
import Breadcrumbs from '@/components/seo/Breadcrumbs'

// Export metadata generator
export { generateMetadata }

/**
 * Generate static params for all service pages at build time
 */
export async function generateStaticParams() {
  return [
    { slug: 'web-development' },
    { slug: 'mobile-development' },
    { slug: 'ui-ux-design' },
    { slug: 'backend-solutions' },
  ]
}

interface ServicePageProps {
  params: Promise<{
    slug: string
  }>
}

/**
 * Service Detail Page
 * Server component that renders service pages with pricing, FAQs, and case studies
 */
export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params

  // Load service page
  const service = await getServicePage(slug)

  // Return 404 if service not found
  if (!service) {
    notFound()
  }

  // Compile MDX content
  const { content: CompiledContent } = await compileMDXContent(service.content)

  // Get related case studies
  const relatedProjects = await getRelatedPortfolioProjects(
    service.frontmatter.relatedCaseStudies
  )

  // Get the Lucide icon component based on frontmatter
  const iconMap: Record<string, LucideIcon> = {
    Code2,
    Smartphone,
    Palette,
    Database,
  }
  const IconComponent = iconMap[service.frontmatter.icon] || Code2

  return (
    <main className="min-h-screen">
      {/* Schema.org FAQ markup */}
      {service.frontmatter.faqs.length > 0 && (
        <FAQSchema faqs={service.frontmatter.faqs} />
      )}

      {/* Hero Section with Animated Gradient Background */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-primary-600">
        {/* Static gradient for base */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500" />

        {/* Breadcrumbs - in normal flow at top */}
        <div className="absolute top-24 left-0 right-0 z-20">
          <div className="container mx-auto px-4">
            <Breadcrumbs
              variant="dark"
              items={[
                { name: 'Home', url: '/' },
                { name: 'Services', url: '/services' },
                { name: service.frontmatter.title, url: `/services/${slug}` },
              ]}
            />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 pt-32 pb-24 text-center">
          {/* Large Icon */}
          <div className="mb-8 flex justify-center">
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <IconComponent className="w-20 h-20 md:w-24 md:h-24 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
            {service.frontmatter.title}
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            {service.frontmatter.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-gradient-to-r from-accent-500 to-secondary-500 hover:from-accent-600 hover:to-secondary-600 text-primary font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Projekt anfragen
              </Button>
            </Link>
            <Link href="#pricing">
              <Button
                size="lg"
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
              >
                Preise ansehen
              </Button>
            </Link>
          </div>
        </div>

        {/* Wave at bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 md:h-24 fill-white" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,40 C480,100 960,0 1440,60 L1440,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* Pricing Card */}
      <section id="pricing" className="bg-white container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="p-8 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 text-white">
              <h2 className="text-3xl font-bold mb-2">Investition</h2>
              <p className="text-white/90">Transparente Preisgestaltung</p>
              <div className="text-5xl font-bold mt-6">
                ab {service.frontmatter.pricing.from.toLocaleString('de-DE')}{' '}
                {service.frontmatter.pricing.currency}
                <span className="text-xl font-normal text-white/80 ml-2">
                  / {service.frontmatter.pricing.unit === 'project' ? 'Projekt' : service.frontmatter.pricing.unit === 'hour' ? 'Stunde' : 'Monat'}
                </span>
              </div>
            </div>
            <div className="p-8">
              <p className="text-sm text-muted-foreground mb-4">
                Exakte Kosten nach kostenlosem 15-Minuten Beratungsgespräch
              </p>
              <Link href="/contact">
                <Button className="w-full bg-gradient-to-r from-accent-500 to-secondary-500 hover:from-accent-600 hover:to-secondary-600 text-primary font-semibold shadow-xl hover:shadow-2xl transition-all duration-300">
                  Kostenloses Beratungsgespräch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables Section */}
      <section className="bg-gray-50 container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Was Sie erhalten
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Alle Leistungen im Überblick – transparent und vollständig
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {service.frontmatter.deliverables.map((deliverable, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-lg bg-white border border-gray-200 hover:border-primary hover:shadow-md transition-all duration-300"
              >
                <Check className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-900 font-medium">
                  {deliverable}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="bg-white container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Unser Prozess
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Von der Konzeption bis zum Launch – strukturiert und transparent
          </p>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-600 to-secondary-500 hidden md:block" />

            <div className="space-y-8">
              {service.frontmatter.processSteps.map((step, index) => (
                <div key={index} className="relative flex gap-6 items-start">
                  {/* Step number circle */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 text-white flex items-center justify-center font-bold text-xl z-10 shadow-lg">
                    {index + 1}
                  </div>

                  {/* Step content */}
                  <div className="flex-1 bg-gray-50 rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {step.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-primary font-semibold">
                      <Clock className="w-4 h-4" />
                      <span>{step.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content (MDX) */}
      <section className="bg-gray-50 container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <MDXContent>{CompiledContent}</MDXContent>
        </div>
      </section>

      {/* FAQ Section */}
      {service.frontmatter.faqs.length > 0 && (
        <section className="bg-white container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-4xl mx-auto">
            <FAQSection faqs={service.frontmatter.faqs} />
          </div>
        </section>
      )}

      {/* Related Case Studies */}
      {relatedProjects.length > 0 && (
        <section className="bg-gray-50 container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Erfolgsgeschichten
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Sehen Sie, wie wir ähnliche Projekte erfolgreich umgesetzt haben
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProjects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/portfolio/${project.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-primary transition-all hover:shadow-lg">
                    {/* Project Image */}
                    {project.frontmatter.image && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={project.frontmatter.image.url}
                          alt={project.frontmatter.image.alt}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}

                    {/* Project Info */}
                    <div className="p-6">
                      <div className="text-sm text-muted-foreground mb-2">
                        {project.frontmatter.client.name}
                      </div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {project.frontmatter.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                        {project.frontmatter.description}
                      </p>

                      {/* Metrics */}
                      {project.frontmatter.metrics.length > 0 && (
                        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
                          {project.frontmatter.metrics.slice(0, 2).map((metric, idx) => (
                            <div key={idx} className="text-center">
                              <div className="text-2xl font-bold text-primary">
                                {metric.value}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {metric.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/portfolio">
                <Button className="bg-gradient-to-r from-accent-500 to-secondary-500 hover:from-accent-600 hover:to-secondary-600 text-primary font-semibold shadow-xl hover:shadow-2xl transition-all duration-300" size="lg">
                  Alle Projekte ansehen
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      <section className="bg-white container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 text-white rounded-2xl p-12 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Bereit, Ihr Projekt zu starten?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Lassen Sie uns gemeinsam Ihre Vision verwirklichen
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Kostenloses Erstgespräch
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button
                size="lg"
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20"
              >
                Portfolio ansehen
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
