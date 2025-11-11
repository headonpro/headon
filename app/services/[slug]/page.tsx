import { notFound } from 'next/navigation'
import { getServicePage, getRelatedPortfolioProjects } from '@/lib/content/content-api'
import { compileMDXContent } from '@/lib/content/mdx-compiler'
import { generateMetadata } from './metadata'
import MDXContent from '@/components/content/MDXContent'
import { Check, Clock, Code2, Smartphone, Palette, Database, LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { ModernFAQAccordion } from '@/components/seo/ModernFAQAccordion'
import { faqData } from '@/lib/content/faq-data'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { BreadcrumbSchema, ServiceSchema } from '@/components/seo/SchemaGenerator'
import type { FAQ } from '@/lib/types/content'

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
  const relatedProjects = await getRelatedPortfolioProjects(service.frontmatter.relatedCaseStudies)

  // Get the Lucide icon component based on frontmatter
  const iconMap: Record<string, LucideIcon> = {
    Code2,
    Smartphone,
    Palette,
    Database,
  }
  const IconComponent = iconMap[service.frontmatter.icon] || Code2

  // Map service slug to FAQ data
  const serviceFaqMap: Record<string, FAQ[]> = {
    'web-development': faqData.webDevelopment,
    'mobile-development': faqData.mobileDevelopment,
    'ui-ux-design': faqData.uiUxDesign,
    'backend-solutions': faqData.backendSolutions,
  }
  const serviceFaqs = serviceFaqMap[slug] || []

  // Map service slug to service type for Schema
  const serviceTypeMap: Record<string, string> = {
    'web-development': 'Web Development',
    'mobile-development': 'Mobile App Development',
    'ui-ux-design': 'UI/UX Design',
    'backend-solutions': 'Backend Development',
  }

  return (
    <main className="min-h-screen">
      {/* Breadcrumb Schema for SEO */}
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
          { name: service.frontmatter.title, url: `/services/${slug}` },
        ]}
      />

      {/* Service Schema for SEO */}
      <ServiceSchema
        service={{
          name: service.frontmatter.title,
          description: service.frontmatter.description,
          serviceType: serviceTypeMap[slug] || 'Professional Service',
          url: `/services/${slug}`,
          areaServed: [
            'Bad Mergentheim',
            'Lauda-Königshofen',
            'Tauberbischofsheim',
            'Wertheim',
            'Marktheidenfeld',
            'Würzburg',
          ],
          price: {
            from: service.frontmatter.pricing.from,
            currency: service.frontmatter.pricing.currency,
            priceRange: `ab ${service.frontmatter.pricing.from} ${service.frontmatter.pricing.currency}`,
          },
        }}
      />

      {/* Hero Section with Animated Gradient Background */}
      <section className="bg-primary-600 relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Static gradient for base */}
        <div className="from-primary-600 via-primary-500 to-secondary-500 absolute inset-0 bg-gradient-to-br" />

        {/* Breadcrumbs - in normal flow at top */}
        <div className="absolute top-24 right-0 left-0 z-20">
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
            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
              <IconComponent className="h-20 w-20 text-white md:h-24 md:w-24" />
            </div>
          </div>

          {/* Title */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl">
            {service.frontmatter.title}
          </h1>

          {/* Description */}
          <p className="mx-auto mb-8 max-w-3xl text-xl text-white/90 md:text-2xl">
            {service.frontmatter.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/contact">
              <Button
                size="lg"
                className="from-accent-500 to-secondary-500 hover:from-accent-600 hover:to-secondary-600 text-primary bg-gradient-to-r font-semibold shadow-xl transition-all duration-300 hover:shadow-2xl"
              >
                Projekt anfragen
              </Button>
            </Link>
            <Link href="#pricing">
              <Button
                size="lg"
                className="border border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
              >
                Preise ansehen
              </Button>
            </Link>
          </div>
        </div>

        {/* Wave at bottom */}
        <div className="absolute right-0 bottom-0 left-0">
          <svg
            className="h-16 w-full fill-white md:h-24"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
          >
            <path d="M0,40 C480,100 960,0 1440,60 L1440,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* Pricing Card */}
      <section id="pricing" className="container mx-auto bg-white px-4 py-16 md:py-20">
        <div className="mx-auto max-w-2xl">
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
            <div className="from-primary-600 via-primary-500 to-secondary-500 bg-gradient-to-br p-8 text-white">
              <h2 className="mb-2 text-3xl font-bold">Investition</h2>
              <p className="text-white/90">Transparente Preisgestaltung</p>
              <div className="mt-6 text-5xl font-bold">
                ab {service.frontmatter.pricing.from.toLocaleString('de-DE')}{' '}
                {service.frontmatter.pricing.currency}
                <span className="ml-2 text-xl font-normal text-white/80">
                  /{' '}
                  {service.frontmatter.pricing.unit === 'project'
                    ? 'Projekt'
                    : service.frontmatter.pricing.unit === 'hour'
                      ? 'Stunde'
                      : 'Monat'}
                </span>
              </div>
            </div>
            <div className="p-8">
              <p className="text-muted-foreground mb-4 text-sm">
                Exakte Kosten nach kostenlosem 15-Minuten Beratungsgespräch
              </p>
              <Link href="/contact">
                <Button className="from-accent-500 to-secondary-500 hover:from-accent-600 hover:to-secondary-600 text-primary w-full bg-gradient-to-r font-semibold shadow-xl transition-all duration-300 hover:shadow-2xl">
                  Kostenloses Beratungsgespräch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables Section */}
      <section className="container mx-auto bg-gray-50 px-4 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">Was Sie erhalten</h2>
          <p className="text-muted-foreground mx-auto mb-12 max-w-2xl text-center">
            Alle Leistungen im Überblick – transparent und vollständig
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {service.frontmatter.deliverables.map((deliverable, index) => (
              <div
                key={index}
                className="hover:border-primary flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4 transition-all duration-300 hover:shadow-md"
              >
                <Check className="mt-0.5 h-6 w-6 flex-shrink-0 text-green-500" />
                <span className="font-medium text-gray-900">{deliverable}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="container mx-auto bg-white px-4 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">Unser Prozess</h2>
          <p className="text-muted-foreground mx-auto mb-12 max-w-2xl text-center">
            Von der Konzeption bis zum Launch – strukturiert und transparent
          </p>
          <div className="relative">
            {/* Vertical line */}
            <div className="from-primary-600 to-secondary-500 absolute top-0 bottom-0 left-8 hidden w-0.5 bg-gradient-to-b md:block" />

            <div className="space-y-8">
              {service.frontmatter.processSteps.map((step, index) => (
                <div key={index} className="relative flex items-start gap-6">
                  {/* Step number circle */}
                  <div className="from-primary-600 via-primary-500 to-secondary-500 z-10 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-xl font-bold text-white shadow-lg">
                    {index + 1}
                  </div>

                  {/* Step content */}
                  <div className="flex-1 rounded-lg border border-gray-200 bg-gray-50 p-6 shadow-sm transition-shadow duration-300 hover:shadow-md">
                    <h3 className="mb-2 text-xl font-semibold text-gray-900">{step.title}</h3>
                    <p className="mb-3 text-gray-600">{step.description}</p>
                    <div className="text-primary flex items-center gap-2 text-sm font-semibold">
                      <Clock className="h-4 w-4" />
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
      <section className="container mx-auto bg-gray-50 px-4 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <MDXContent>{CompiledContent}</MDXContent>
        </div>
      </section>

      {/* FAQ Section */}
      {serviceFaqs.length > 0 && (
        <section className="container mx-auto bg-white px-4 py-16 md:py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">
              Häufig gestellte Fragen
            </h2>
            <p className="text-muted-foreground mx-auto mb-12 max-w-2xl text-center">
              Antworten auf die wichtigsten Fragen zu {service.frontmatter.title.toLowerCase()}
            </p>
            <ModernFAQAccordion faqs={serviceFaqs} includeSchema={true} heading="" />
          </div>
        </section>
      )}

      {/* Related Case Studies */}
      {relatedProjects.length > 0 && (
        <section className="container mx-auto bg-gray-50 px-4 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl">Erfolgsgeschichten</h2>
            <p className="text-muted-foreground mx-auto mb-12 max-w-2xl text-center">
              Sehen Sie, wie wir ähnliche Projekte erfolgreich umgesetzt haben
            </p>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedProjects.map((project) => (
                <Link key={project.slug} href={`/portfolio/${project.slug}`} className="group">
                  <div className="hover:border-primary overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:shadow-lg">
                    {/* Project Image */}
                    {project.frontmatter.image && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={project.frontmatter.image.url}
                          alt={project.frontmatter.image.alt}
                          width={600}
                          height={400}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}

                    {/* Project Info */}
                    <div className="p-6">
                      <div className="text-muted-foreground mb-2 text-sm">
                        {project.frontmatter.client.name}
                      </div>
                      <h3 className="group-hover:text-primary mb-2 text-xl font-semibold transition-colors">
                        {project.frontmatter.title}
                      </h3>
                      <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                        {project.frontmatter.description}
                      </p>

                      {/* Metrics */}
                      {project.frontmatter.metrics.length > 0 && (
                        <div className="grid grid-cols-2 gap-3 border-t border-gray-200 pt-4">
                          {project.frontmatter.metrics.slice(0, 2).map((metric, idx) => (
                            <div key={idx} className="text-center">
                              <div className="text-primary text-2xl font-bold">{metric.value}</div>
                              <div className="text-muted-foreground text-xs">{metric.label}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link href="/portfolio">
                <Button
                  className="from-accent-500 to-secondary-500 hover:from-accent-600 hover:to-secondary-600 text-primary bg-gradient-to-r font-semibold shadow-xl transition-all duration-300 hover:shadow-2xl"
                  size="lg"
                >
                  Alle Projekte ansehen
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      <section className="container mx-auto bg-white px-4 py-16 md:py-24">
        <div className="from-primary-600 via-primary-500 to-secondary-500 mx-auto max-w-4xl rounded-2xl bg-gradient-to-br p-12 text-center text-white shadow-2xl">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Bereit, Ihr Projekt zu starten?</h2>
          <p className="mb-8 text-xl text-white/90">
            Lassen Sie uns gemeinsam Ihre Vision verwirklichen
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/contact">
              <Button
                size="lg"
                className="text-primary bg-white font-semibold shadow-xl transition-all duration-300 hover:bg-gray-100 hover:shadow-2xl"
              >
                Kostenloses Erstgespräch
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button
                size="lg"
                className="border border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
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
