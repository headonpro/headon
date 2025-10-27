import { notFound } from 'next/navigation'
import { getCityPage, getServicePage, getPortfolioProject } from '@/lib/content/content-api'
import { compileMDXContent } from '@/lib/content/mdx-compiler'
import { generateMetadata } from './metadata'
import CityPageContent from '@/components/sections/CityPageContent'

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

  return (
    <CityPageContent
      cityPage={cityPage}
      CompiledContent={CompiledContent}
      services={validServices}
      caseStudies={validCaseStudies}
      breadcrumbs={{
        items: [
          { name: 'Home', url: '/' },
          { name: 'Service-Regionen', url: '/regionen' },
          { name: cityPage.frontmatter.name, url: `/regionen/${city}` },
        ],
      }}
    />
  )
}
