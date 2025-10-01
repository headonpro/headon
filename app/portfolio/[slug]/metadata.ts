import { Metadata } from 'next'
import { getPortfolioProject } from '@/lib/content/content-api'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://headon.pro'

interface GenerateMetadataProps {
  params: Promise<{
    slug: string
  }>
}

/**
 * Generate dynamic metadata for portfolio project pages
 */
export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const { slug } = await params

  // Load portfolio project
  const project = await getPortfolioProject(slug)

  // Fallback metadata if project not found
  if (!project) {
    return {
      title: 'Projekt nicht gefunden | HEADON.pro Portfolio',
      description: 'Das gesuchte Portfolio-Projekt konnte nicht gefunden werden.',
    }
  }

  const { frontmatter } = project

  // Build absolute URL for canonical and OpenGraph
  const pageUrl = `${baseUrl}/portfolio/${slug}`

  // Build OpenGraph image URL (use absolute URL)
  const ogImageUrl = frontmatter.image
    ? frontmatter.image.url.startsWith('http')
      ? frontmatter.image.url
      : `${baseUrl}${frontmatter.image.url}`
    : `${baseUrl}/headon-logo.svg`

  // Build meta description with client and category
  const description = frontmatter.description

  return {
    title: `${frontmatter.title} | HEADON.pro Portfolio`,
    description,
    keywords: [
      ...frontmatter.tags,
      frontmatter.category,
      frontmatter.client.name,
      frontmatter.client.industry,
    ].join(', '),
    openGraph: {
      title: frontmatter.title,
      description,
      url: pageUrl,
      type: 'article',
      publishedTime: frontmatter.date,
      tags: frontmatter.tags,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: frontmatter.image?.alt || frontmatter.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: pageUrl,
    },
  }
}
