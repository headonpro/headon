import { Metadata } from 'next'
import { getCityPage } from '@/lib/content/content-api'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://headon.pro'

interface GenerateMetadataProps {
  params: Promise<{
    city: string
  }>
}

/**
 * Generate dynamic metadata for city landing pages
 * Optimized for local SEO with city name and keywords
 */
export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  const { city } = await params

  // Load city page
  const cityPage = await getCityPage(city)

  // Fallback metadata if city not found
  if (!cityPage) {
    return {
      title: 'Stadt nicht gefunden | HEADON.pro',
      description: 'Die gesuchte Stadt-Seite konnte nicht gefunden werden.',
    }
  }

  const { frontmatter } = cityPage

  // Build absolute URL for canonical and OpenGraph
  const pageUrl = `${baseUrl}/regionen/${city}`

  // Build OpenGraph image URL (use default logo)
  const ogImageUrl = `${baseUrl}/headon-logo.svg`

  // Create SEO-optimized title with city name and main keyword
  const title = `Webentwicklung ${frontmatter.name} | HEADON.pro`

  // Create description with local keywords
  const description = `Professionelle Webentwicklung in ${frontmatter.name}, ${frontmatter.state}. ${frontmatter.description}`

  return {
    title,
    description,
    keywords: frontmatter.localKeywords,
    openGraph: {
      title,
      description,
      url: pageUrl,
      type: 'website',
      locale: 'de_DE',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `Webentwicklung ${frontmatter.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: pageUrl,
    },
  }
}
