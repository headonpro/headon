import { notFound } from 'next/navigation'
import { getCityPage, getServicePage, getPortfolioProject } from '@/lib/content/content-api'
import { compileMDXContent } from '@/lib/content/mdx-compiler'
import { generateMetadata } from './metadata'
import CityPageContent from '@/components/sections/CityPageContent'
import Schema from '@/components/seo/Schema'
import {
  buildLocalBusinessSchema,
  buildServiceSchema,
  buildFAQPageSchema,
  buildBreadcrumbListSchema,
} from '@/lib/seo/schema-builder'
import { getCityFAQs } from '@/lib/content/city-faq-data'

// Export metadata generator
export { generateMetadata }

/**
 * Generate static params for all city pages at build time
 */
export async function generateStaticParams() {
  return [
    { city: 'bad-mergentheim' },
    { city: 'lauda-koenigshofen' },
    { city: 'tauberbischofsheim' },
    { city: 'wertheim' },
    { city: 'marktheidenfeld' },
    { city: 'wuerzburg' },
    { city: 'heilbronn' },
    { city: 'mosbach' },
    { city: 'crailsheim' },
    { city: 'aschaffenburg' },
  ]
}

interface CityPageProps {
  params: Promise<{
    city: string
  }>
}

/**
 * City Landing Page
 * Server component that renders local SEO pages for each city
 */
export default async function CityPage({ params }: CityPageProps) {
  const { city } = await params

  // Load city page
  const cityPage = await getCityPage(city)

  // Return 404 if city not found
  if (!cityPage) {
    notFound()
  }

  // Compile MDX content
  const { content: CompiledContent } = await compileMDXContent(cityPage.content)

  // Load related services
  const services = await Promise.all(
    cityPage.frontmatter.services.map((slug) => getServicePage(slug))
  )
  const validServices = services.filter((s) => s !== null)

  // Load local case studies
  const caseStudies = await Promise.all(
    cityPage.frontmatter.caseStudies.map((slug) => getPortfolioProject(slug))
  )
  const validCaseStudies = caseStudies.filter((c) => c !== null)

  // Generate city-specific FAQs for schema
  const faqs = getCityFAQs(cityPage.frontmatter.name, 'Main-Tauber-Kreis')

  // Breadcrumbs for schema and UI
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Service-Regionen', url: '/regionen' },
    { name: cityPage.frontmatter.name, url: `/regionen/${city}` },
  ]

  // Build schemas for SEO
  const localBusinessSchema = buildLocalBusinessSchema({
    name: 'HEADON.pro',
    description: `Professionelle Webentwicklung und App-Entwicklung in ${cityPage.frontmatter.name}. Moderne Technologien, transparente Preise, persönliche Betreuung.`,
    url: `/regionen/${city}`,
    image: '/headon-logo.svg',
    email: 'hallo@headon.pro',
    address: {
      city: cityPage.frontmatter.name,
      region: cityPage.frontmatter.state,
      country: 'DE',
    },
    coordinates: {
      lat: cityPage.frontmatter.coordinates.lat,
      lng: cityPage.frontmatter.coordinates.lng,
    },
    serviceArea: [
      'Bad Mergentheim',
      'Lauda-Königshofen',
      'Tauberbischofsheim',
      'Wertheim',
      'Main-Tauber-Kreis',
    ],
    priceRange: '€€€',
    openingHours: ['Mo-Fr 09:00-18:00'],
  })

  const serviceSchemas = validServices.map((service) =>
    buildServiceSchema({
      name: service!.frontmatter.title,
      description: service!.frontmatter.description,
      serviceType: service!.frontmatter.title, // Use title as serviceType since category doesn't exist
      url: `/services/${service!.slug}`,
      areaServed: [cityPage.frontmatter.name, 'Main-Tauber-Kreis'],
      price: {
        from: service!.frontmatter.pricing.from,
        currency: service!.frontmatter.pricing.currency,
      },
    })
  )

  const faqSchema = buildFAQPageSchema(faqs)

  const breadcrumbSchema = buildBreadcrumbListSchema(breadcrumbItems)

  return (
    <>
      {/* Schema markup for SEO */}
      <Schema
        schema={[localBusinessSchema, ...serviceSchemas, faqSchema, breadcrumbSchema]}
      />

      <CityPageContent
        cityPage={cityPage}
        CompiledContent={CompiledContent}
        services={validServices}
        caseStudies={validCaseStudies}
        breadcrumbs={{
          items: breadcrumbItems,
        }}
      />
    </>
  )
}
