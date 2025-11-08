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
// LocalBusinessSchema - For Local SEO
// ============================================================================

export interface PostalAddress {
  '@type': 'PostalAddress'
  streetAddress?: string
  addressLocality: string // City
  addressRegion?: string // State/Province
  postalCode?: string
  addressCountry?: string
}

export interface GeoCoordinates {
  '@type': 'GeoCoordinates'
  latitude: number
  longitude: number
}

export interface LocalBusinessSchema {
  '@context': 'https://schema.org'
  '@type': 'LocalBusiness' | 'ProfessionalService'
  name: string
  description?: string
  url?: string
  image?: string | string[]
  telephone?: string
  email?: string
  address: PostalAddress
  geo: GeoCoordinates
  areaServed?: string[] | { '@type': 'City' | 'State'; name: string }[]
  priceRange?: string // e.g., "€€€"
  openingHours?: string[] // e.g., ["Mo-Fr 09:00-18:00"]
  sameAs?: string[] // Social media URLs
}

// ============================================================================
// ServiceSchema - For Professional Services
// ============================================================================

export interface ServiceSchema {
  '@context': 'https://schema.org'
  '@type': 'Service'
  name: string
  description: string
  provider: Organization
  serviceType: string
  areaServed?: string | string[] | { '@type': 'City' | 'State'; name: string }[]
  offers?: {
    '@type': 'Offer'
    price?: string
    priceCurrency?: string
    priceRange?: string
    availability?: string
  }
  image?: string | string[]
  url?: string
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
  | LocalBusinessSchema
  | ServiceSchema

// ============================================================================
// Helper Types
// ============================================================================

export interface SchemaGeneratorProps {
  schema: SchemaType
}
