import { notFound } from 'next/navigation'
import { getBranchePage } from '@/lib/content/content-api'
import { compileMDXContent } from '@/lib/content/mdx-compiler'
import BrancheContent from '@/components/sections/BrancheContent'
import type { Metadata } from 'next'

/**
 * Generate static params for all branche pages at build time
 */
export async function generateStaticParams() {
  return [
    { branche: 'gastronomie' },
    { branche: 'handwerk' },
    { branche: 'einzelhandel' },
    { branche: 'beratung' },
    { branche: 'immobilien' },
    { branche: 'fitness' },
  ]
}

interface BranchePageProps {
  params: Promise<{
    branche: string
  }>
}

/**
 * Generate metadata for branche page
 */
export async function generateMetadata({ params }: BranchePageProps): Promise<Metadata> {
  const { branche } = await params
  const branchePage = await getBranchePage(branche)

  if (!branchePage) {
    return {
      title: 'Branche nicht gefunden',
    }
  }

  return {
    title: `${branchePage.frontmatter.heroTitle} | HEADON`,
    description: branchePage.frontmatter.description,
    openGraph: {
      title: `${branchePage.frontmatter.heroTitle} | HEADON`,
      description: branchePage.frontmatter.description,
      url: `https://headon.pro/branchen/${branche}`,
      type: 'website',
      images: [
        {
          url: `/og-images/branchen-${branche}.jpg`,
          width: 1200,
          height: 630,
          alt: branchePage.frontmatter.heroTitle,
        },
      ],
    },
  }
}

/**
 * Branche Landing Page
 * Server component that renders industry-specific landing pages
 */
export default async function BranchePage({ params }: BranchePageProps) {
  const { branche } = await params

  // Load branche page
  const branchePage = await getBranchePage(branche)

  // Return 404 if branche not found
  if (!branchePage) {
    notFound()
  }

  // Compile MDX content
  const { content: CompiledContent } = await compileMDXContent(branchePage.content)

  return (
    <BrancheContent
      branchePage={branchePage}
      CompiledContent={CompiledContent}
      breadcrumbs={{
        items: [
          { name: 'Home', url: '/' },
          { name: 'Branchen', url: '/branchen' },
          { name: branchePage.frontmatter.name, url: `/branchen/${branche}` },
        ],
      }}
    />
  )
}
