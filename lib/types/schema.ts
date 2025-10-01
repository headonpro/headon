/**
 * Schema.org Type Definitions for SEO
 *
 * TypeScript interfaces for Schema.org JSON-LD structured data:
 * - ArticleSchema: Blog articles
 * - FAQSchema: FAQ pages
 * - CreativeWorkSchema: Portfolio projects
 * - PersonSchema: Author/Team profiles
 * - ReviewSchema: Testimonials
 * - AggregateRatingSchema: Aggregated ratings
 * - BreadcrumbSchema: Navigation breadcrumbs
 *
 * All types follow Schema.org specifications and Google Rich Results requirements.
 */

// ============================================================================
// Common Schema Types
// ============================================================================

export interface ImageObject {
  '@type': 'ImageObject'
  url: string
  width?: number
  height?: number
}

export interface Organization {
  '@type': 'Organization'
  name: string
  url?: string
  logo?: ImageObject
}

// ============================================================================
// ArticleSchema - For Blog Posts
// ============================================================================

export interface ArticleSchema {
  '@context': 'https://schema.org'
  '@type': 'Article'
  headline: string
  description: string
  image: string[] | string
  datePublished: string // ISO 8601
  dateModified?: string // ISO 8601
  author: {
    '@type': 'Person'
    name: string
    url?: string
  }
  publisher: Organization
}

// ============================================================================
// FAQSchema - For FAQ Sections
// ============================================================================

export interface FAQSchema {
  '@context': 'https://schema.org'
  '@type': 'FAQPage'
  mainEntity: {
    '@type': 'Question'
    name: string
    acceptedAnswer: {
      '@type': 'Answer'
      text: string
    }
  }[]
}

// ============================================================================
// CreativeWorkSchema - For Portfolio Projects
// ============================================================================

export interface CreativeWorkSchema {
  '@context': 'https://schema.org'
  '@type': 'CreativeWork'
  name: string
  description: string
  image?: string | string[]
  creator?: {
    '@type': 'Person' | 'Organization'
    name: string
  }
  dateCreated?: string // ISO 8601
  keywords?: string | string[]
  url?: string
}

// ============================================================================
// PersonSchema - For Author/Team Profiles
// ============================================================================

export interface PersonSchema {
  '@context': 'https://schema.org'
  '@type': 'Person'
  name: string
  url?: string
  image?: string
  jobTitle?: string
  worksFor?: Organization
  sameAs?: string[] // Social media URLs
  description?: string
}

// ============================================================================
// ReviewSchema - For Testimonials
// ============================================================================

export interface ReviewSchema {
  '@context': 'https://schema.org'
  '@type': 'Review'
  itemReviewed: {
    '@type': string // e.g., 'Product', 'Service', 'Organization'
    name: string
  }
  reviewRating: {
    '@type': 'Rating'
    ratingValue: number // 1-5
    bestRating?: number
    worstRating?: number
  }
  author: {
    '@type': 'Person'
    name: string
  }
  reviewBody?: string
  datePublished?: string // ISO 8601
}

// ============================================================================
// AggregateRatingSchema - For Multiple Reviews
// ============================================================================

export interface AggregateRatingSchema {
  '@context': 'https://schema.org'
  '@type': 'AggregateRating'
  ratingValue: number
  ratingCount: number
  reviewCount?: number
  bestRating?: number
  worstRating?: number
}

// ============================================================================
// BreadcrumbSchema - For Navigation Breadcrumbs
// ============================================================================

export interface BreadcrumbItem {
  '@type': 'ListItem'
  position: number
  name: string
  item?: string // URL
}

export interface BreadcrumbSchema {
  '@context': 'https://schema.org'
  '@type': 'BreadcrumbList'
  itemListElement: BreadcrumbItem[]
}

// ============================================================================
// Union Types for Schema Builders
// ============================================================================

export type SchemaType =
  | ArticleSchema
  | FAQSchema
  | CreativeWorkSchema
  | PersonSchema
  | ReviewSchema
  | AggregateRatingSchema
  | BreadcrumbSchema

// ============================================================================
// Helper Types
// ============================================================================

export interface SchemaGeneratorProps {
  schema: SchemaType
}
