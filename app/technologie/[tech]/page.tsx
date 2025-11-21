import { notFound } from 'next/navigation'
import { getTechnologyPage } from '@/lib/content/content-api'
import { compileMDXContent } from '@/lib/content/mdx-compiler'
import { listContentSlugs } from '@/lib/content/mdx-loader'
import TechnologyPageContent from '@/components/sections/TechnologyPageContent'
import type { Metadata } from 'next'

/**
 * Generate static params for all technology pages at build time
 * Dynamically loads all slugs from content/technologie/
 */
export async function generateStaticParams() {
  const slugs = await listContentSlugs('technologie')
  return slugs.map((tech) => ({ tech }))
}

interface TechnologyPageProps {
  params: Promise<{
    tech: string
  }>
}

/**
 * Generate metadata for technology page
 */
export async function generateMetadata({ params }: TechnologyPageProps): Promise<Metadata> {
  const { tech } = await params
  const technologyPage = await getTechnologyPage(tech)

  if (!technologyPage) {
    return {
      title: 'Technologie nicht gefunden',
    }
  }

  return {
    title: `${technologyPage.frontmatter.officialName} Agentur | HEADON`,
    description: technologyPage.frontmatter.description,
    openGraph: {
      title: `${technologyPage.frontmatter.officialName} Agentur | HEADON`,
      description: technologyPage.frontmatter.description,
      url: `https://headon.pro/technologie/${tech}`,
      type: 'website',
      images: [
        {
          url: `/og-images/technologie-${tech}.jpg`,
          width: 1200,
          height: 630,
          alt: technologyPage.frontmatter.officialName,
        },
      ],
    },
  }
}

/**
 * Technology Page
 * Server component that renders technology expertise showcase pages
 */
export default async function TechnologyPage({ params }: TechnologyPageProps) {
  const { tech } = await params

  // Load technology page
  const technologyPage = await getTechnologyPage(tech)

  // Return 404 if technology not found
  if (!technologyPage) {
    notFound()
  }

  // Compile MDX content
  const { content: CompiledContent } = await compileMDXContent(technologyPage.content)

  return (
    <TechnologyPageContent
      technologyPage={technologyPage}
      CompiledContent={CompiledContent}
      breadcrumbs={{
        items: [
          { name: 'Home', url: '/' },
          { name: 'Technologien', url: '/technologie' },
          { name: technologyPage.frontmatter.name, url: `/technologie/${tech}` },
        ],
      }}
    />
  )
}
