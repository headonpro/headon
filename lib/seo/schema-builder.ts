/**
 * Schema.org Builder Utility
 *
 * Type-safe builders for generating Schema.org JSON-LD structured data.
 * All schemas comply with Schema.org specifications and Google Rich Results requirements.
 *
 * Builders:
 * - buildArticleSchema: Blog articles
 * - buildFAQPageSchema: FAQ sections
 * - buildCreativeWorkSchema: Portfolio projects
 * - buildPersonSchema: Author/Team profiles
 * - buildReviewSchema: Testimonials
 * - buildAggregateRatingSchema: Aggregated ratings
 * - buildBreadcrumbListSchema: Navigation breadcrumbs
 */

import type { FAQ } from '@/lib/types/content'
import type { BlogContentResult, PortfolioContentResult } from '@/lib/content/mdx-loader'
import type {
  ArticleSchema,
  FAQSchema,
  CreativeWorkSchema,
  PersonSchema,
  ReviewSchema,
  AggregateRatingSchema,
  BreadcrumbSchema,
  Organization,
} from '@/lib/types/schema'

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get the base URL for the application
 */
function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 'https://headon.pro'
}

/**
 * Convert relative URL to absolute URL
 * If URL is already absolute, return as-is
 */
function toAbsoluteUrl(url: string): string {
  if (!url) return url
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  const baseUrl = getBaseUrl()
  return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`
}

/**
 * Get the organization object for publisher/worksFor
 */
function getOrganization(): Organization {
  return {
    '@type': 'Organization',
    name: 'HEADON.pro',
    url: getBaseUrl(),
    logo: {
      '@type': 'ImageObject',
      url: toAbsoluteUrl('/images/logo.png'),
    },
  }
}

/**
 * Generate JSON-LD script string from schema object
 * Use this in <script type="application/ld+json">
 */
export function generateSchemaScript(schema: object): string {
  // Validate schema has required @context and @type
  if (!schema || typeof schema !== 'object') {
    console.warn('Schema is not a valid object:', schema)
    return ''
  }

  const schemaObj = schema as Record<string, unknown>
  if (!schemaObj['@context'] || !schemaObj['@type']) {
    console.warn('Schema missing @context or @type:', schema)
    return ''
  }

  return JSON.stringify(schema, null, 0)
}

// ============================================================================
// Schema Builder Functions
// ============================================================================

/**
 * Build Article Schema for blog posts
 * @see https://schema.org/Article
 */
export function buildArticleSchema(post: BlogContentResult): ArticleSchema {
  const { frontmatter } = post

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: frontmatter.title,
    description: frontmatter.description,
    image: toAbsoluteUrl(frontmatter.image.url),
    datePublished: frontmatter.publishedAt,
    dateModified: frontmatter.updatedAt || frontmatter.publishedAt,
    author: {
      '@type': 'Person',
      name: frontmatter.author.name,
      url: frontmatter.author.avatar ? toAbsoluteUrl(frontmatter.author.avatar) : undefined,
    },
    publisher: getOrganization(),
  }
}

/**
 * Build FAQPage Schema for FAQ sections
 * @see https://schema.org/FAQPage
 */
export function buildFAQPageSchema(faqs: FAQ[]): FAQSchema {
  if (!faqs || faqs.length === 0) {
    console.warn('No FAQs provided to buildFAQPageSchema')
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Build CreativeWork Schema for portfolio projects
 * @see https://schema.org/CreativeWork
 */
export function buildCreativeWorkSchema(project: PortfolioContentResult): CreativeWorkSchema {
  const { frontmatter } = project

  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: frontmatter.title,
    description: frontmatter.description,
    image: toAbsoluteUrl(frontmatter.image.url),
    creator: {
      '@type': 'Organization',
      name: 'HEADON.pro',
    },
    dateCreated: frontmatter.date,
    keywords: frontmatter.tags.join(', '),
    url: frontmatter.liveUrl ? toAbsoluteUrl(frontmatter.liveUrl) : undefined,
  }
}

/**
 * Build Person Schema for author/team profiles
 * @see https://schema.org/Person
 */
export interface PersonInput {
  name: string
  url?: string
  image?: string
  jobTitle?: string
  description?: string
  sameAs?: string[] // Social media URLs
}

export function buildPersonSchema(person: PersonInput): PersonSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.name,
    url: person.url ? toAbsoluteUrl(person.url) : undefined,
    image: person.image ? toAbsoluteUrl(person.image) : undefined,
    jobTitle: person.jobTitle,
    worksFor: getOrganization(),
    sameAs: person.sameAs,
    description: person.description,
  }
}

/**
 * Build Review Schema for testimonials
 * @see https://schema.org/Review
 */
export interface ReviewInput {
  itemReviewed: {
    type: 'Product' | 'Service' | 'Organization'
    name: string
  }
  rating: number // 1-5
  author: string
  reviewBody?: string
  datePublished?: string
}

export function buildReviewSchema(review: ReviewInput): ReviewSchema {
  // Validate rating is in 1-5 range
  const rating = Math.max(1, Math.min(5, review.rating))

  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': review.itemReviewed.type,
      name: review.itemReviewed.name,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: rating,
      bestRating: 5,
      worstRating: 1,
    },
    author: {
      '@type': 'Person',
      name: review.author,
    },
    reviewBody: review.reviewBody,
    datePublished: review.datePublished,
  }
}

/**
 * Build AggregateRating Schema for multiple reviews
 * @see https://schema.org/AggregateRating
 */
export interface AggregateRatingInput {
  ratingValue: number // Average rating
  ratingCount: number // Total number of ratings
  reviewCount?: number // Total number of reviews (optional, can be different from ratings)
}

export function buildAggregateRatingSchema(rating: AggregateRatingInput): AggregateRatingSchema {
  // Validate rating is in 1-5 range
  const ratingValue = Math.max(1, Math.min(5, rating.ratingValue))

  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue,
    ratingCount: rating.ratingCount,
    reviewCount: rating.reviewCount,
    bestRating: 5,
    worstRating: 1,
  }
}

/**
 * Build BreadcrumbList Schema for navigation breadcrumbs
 * @see https://schema.org/BreadcrumbList
 */
export interface BreadcrumbInput {
  name: string
  url?: string // URL is optional for the last item (current page)
}

export function buildBreadcrumbListSchema(items: BreadcrumbInput[]): BreadcrumbSchema {
  if (!items || items.length === 0) {
    console.warn('No breadcrumb items provided to buildBreadcrumbListSchema')
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1, // Positions start at 1, not 0
      name: item.name,
      item: item.url ? toAbsoluteUrl(item.url) : undefined,
    })),
  }
}
