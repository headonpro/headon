import { Metadata } from 'next'
import { getServicePage } from '@/lib/content/content-api'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://headon.pro'

interface GenerateMetadataProps {
  params: Promise<{
    slug: string
  }>
}

/**
 * Generate dynamic metadata for service pages
 */
export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  const { slug } = await params

  // Load service page
  const service = await getServicePage(slug)

  // Fallback metadata if service not found
  if (!service) {
    return {
      title: 'Service nicht gefunden | HEADON.pro',
      description: 'Die gesuchte Service-Seite konnte nicht gefunden werden.',
    }
  }

  const { frontmatter } = service

  // Build absolute URL for canonical and OpenGraph
  const pageUrl = `${baseUrl}/services/${slug}`

  // Map slug to OG image
  const ogImageMap: Record<string, string> = {
    'web-development': '/og-images/web-dev.jpg',
    'mobile-development': '/og-images/mobile-dev.jpg',
    'ui-ux-design': '/og-images/design.jpg',
    'backend-solutions': '/og-images/backend.jpg',
  }
  const ogImageUrl = ogImageMap[slug] || '/og-images/services.jpg'

  return {
    title: `${frontmatter.title} | HEADON.pro`,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url: pageUrl,
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: frontmatter.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: pageUrl,
    },
  }
}
