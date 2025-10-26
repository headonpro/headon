/**
 * SEO Meta Tag Builder Utilities
 *
 * Provides helper functions for consistent, SEO-optimized metadata generation
 * across all pages. Ensures titles/descriptions meet Google's best practices.
 */

import { Metadata } from 'next'
import type { BlogPost, PortfolioProject, ServicePage, CityPage } from '@/lib/types/content'

// ============================================================================
// Configuration
// ============================================================================

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://headon.pro'
const SITE_NAME = 'HEADON.pro'
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-images/services.jpg`
const TWITTER_HANDLE = process.env.NEXT_PUBLIC_TWITTER_HANDLE // Optional

// ============================================================================
// Truncation Helpers
// ============================================================================

/**
 * Truncates a title to maxLength while preserving word boundaries
 * @param title - The title to truncate
 * @param maxLength - Maximum length (default: 60 chars per Google guidelines)
 * @returns Truncated title with ellipsis if needed
 */
export function truncateTitle(title: string, maxLength = 60): string {
  if (title.length <= maxLength) {
    return title
  }

  // Find the last space before maxLength to avoid cutting words
  const truncated = title.slice(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')

  // If no space found, just cut at maxLength (rare edge case)
  if (lastSpace === -1) {
    return truncated.slice(0, maxLength - 1) + '…'
  }

  return truncated.slice(0, lastSpace) + '…'
}

/**
 * Truncates a description to maxLength while preserving word boundaries
 * @param description - The description to truncate
 * @param maxLength - Maximum length (default: 160 chars per Google guidelines)
 * @returns Truncated description with ellipsis if needed
 */
export function truncateDescription(description: string, maxLength = 160): string {
  if (description.length <= maxLength) {
    return description
  }

  // Find the last space before maxLength to avoid cutting words
  const truncated = description.slice(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')

  // If no space found, just cut at maxLength (rare edge case)
  if (lastSpace === -1) {
    return truncated.slice(0, maxLength - 1) + '…'
  }

  return truncated.slice(0, lastSpace) + '…'
}

/**
 * Ensures image URLs are absolute
 * @param imageUrl - Image URL (relative or absolute)
 * @returns Absolute image URL
 */
function ensureAbsoluteUrl(imageUrl: string): string {
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl
  }

  // Remove leading slash if present to avoid double slashes
  const cleanUrl = imageUrl.startsWith('/') ? imageUrl.slice(1) : imageUrl
  return `${BASE_URL}/${cleanUrl}`
}

// ============================================================================
// Meta Tag Builder
// ============================================================================

export interface MetaTagOptions {
  title: string
  description: string
  image?: string
  url: string
  type?: 'website' | 'article' | 'profile'
  publishedTime?: string // ISO 8601 for articles
  modifiedTime?: string // ISO 8601 for articles
  author?: string
  tags?: string[]
}

/**
 * Builds complete Metadata object with optimized meta tags
 * @param options - Meta tag options
 * @returns Next.js Metadata object
 */
export function buildMetaTags(options: MetaTagOptions): Metadata {
  const {
    title,
    description,
    image = DEFAULT_OG_IMAGE,
    url,
    type = 'website',
    publishedTime,
    modifiedTime,
    author,
    tags,
  } = options

  // Truncate title and description to optimal lengths
  const optimizedTitle = truncateTitle(title, 60)
  const optimizedDescription = truncateDescription(description, 160)

  // Ensure URLs are absolute
  const absoluteUrl = ensureAbsoluteUrl(url)
  const absoluteImage = ensureAbsoluteUrl(image)

  // Base metadata
  const metadata: Metadata = {
    title: optimizedTitle,
    description: optimizedDescription,
    alternates: {
      canonical: absoluteUrl,
    },
    openGraph: {
      title: optimizedTitle,
      description: optimizedDescription,
      url: absoluteUrl,
      type,
      siteName: SITE_NAME,
      images: [
        {
          url: absoluteImage,
          width: 1200,
          height: 630,
          alt: optimizedTitle,
        },
      ],
      locale: 'de_DE',
    },
  }

  // Add article-specific metadata
  if (type === 'article') {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: author ? [author] : undefined,
      tags,
    }
  }

  // Add Twitter card metadata (optional, only if Twitter handle configured)
  if (TWITTER_HANDLE) {
    metadata.twitter = {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title: optimizedTitle,
      description: optimizedDescription,
      images: [absoluteImage],
    }
  }

  return metadata
}

// ============================================================================
// Content-Specific Metadata Generators
// ============================================================================

/**
 * Generates metadata from BlogPost frontmatter
 * @param post - Blog post with frontmatter
 * @returns Next.js Metadata object
 */
export function generateBlogMetadata(post: BlogPost): Metadata {
  const { frontmatter, slug } = post

  return buildMetaTags({
    title: `${frontmatter.title} | ${SITE_NAME}`,
    description: frontmatter.description,
    image: frontmatter.image.url,
    url: `/blog/${slug}`,
    type: 'article',
    publishedTime: frontmatter.publishedAt,
    modifiedTime: frontmatter.updatedAt,
    author: frontmatter.author.name,
    tags: frontmatter.tags,
  })
}

/**
 * Generates metadata from PortfolioProject frontmatter
 * @param project - Portfolio project with frontmatter
 * @returns Next.js Metadata object
 */
export function generatePortfolioMetadata(project: PortfolioProject): Metadata {
  const { frontmatter, slug } = project

  // Create SEO-friendly title
  const title = `${frontmatter.title} - ${frontmatter.client.name} | ${SITE_NAME}`

  return buildMetaTags({
    title,
    description: frontmatter.description,
    image: frontmatter.image.url,
    url: `/portfolio/${slug}`,
    type: 'article', // CreativeWork, shown as article for better OG support
    publishedTime: frontmatter.date,
    tags: frontmatter.tags,
  })
}

/**
 * Generates metadata from ServicePage frontmatter
 * @param service - Service page with frontmatter
 * @returns Next.js Metadata object
 */
export function generateServiceMetadata(service: ServicePage): Metadata {
  const { frontmatter, slug } = service

  // Enhance description with pricing info
  const descriptionWithPricing = `${frontmatter.description} Ab ${frontmatter.pricing.from}€/${frontmatter.pricing.unit === 'project' ? 'Projekt' : frontmatter.pricing.unit === 'hour' ? 'Stunde' : 'Monat'}.`

  return buildMetaTags({
    title: `${frontmatter.title} | ${SITE_NAME}`,
    description: truncateDescription(descriptionWithPricing, 160),
    url: `/services/${slug}`,
    type: 'website',
  })
}

/**
 * Generates metadata from CityPage frontmatter
 * @param city - City page with frontmatter
 * @returns Next.js Metadata object
 */
export function generateCityMetadata(city: CityPage): Metadata {
  const { frontmatter, slug } = city

  // Local SEO optimized title with city name
  const title = `Webentwicklung ${frontmatter.name} | ${SITE_NAME}`

  // Include state in description for better local SEO
  const description = `${frontmatter.description} Professionelle Digitalagentur in ${frontmatter.name}, ${frontmatter.state}.`

  return buildMetaTags({
    title,
    description: truncateDescription(description, 160),
    url: `/regionen/${slug}`,
    image: '/og-images/services.jpg',
    type: 'website',
  })
}

/**
 * Generates metadata for generic content
 * Useful for pages without specific content types
 * @param content - Generic content object
 * @returns Next.js Metadata object
 */
export function generatePageMetadata(content: {
  title: string
  description: string
  slug?: string
  image?: string
}): Metadata {
  const url = content.slug ? `/${content.slug}` : '/'

  return buildMetaTags({
    title: content.title,
    description: content.description,
    image: content.image,
    url,
    type: 'website',
  })
}
