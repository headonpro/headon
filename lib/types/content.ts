/**
 * Content Type Definitions for Enterprise SEO
 *
 * Comprehensive TypeScript interfaces for all content types:
 * - BlogPost: Blog articles with full metadata
 * - PortfolioProject: Case studies with metrics and testimonials
 * - ServicePage: Service detail pages with pricing and FAQs
 * - CityPage: Local SEO landing pages
 */

// ============================================================================
// Common Types
// ============================================================================

export interface TOCItem {
  id: string
  title: string
  level: 2 | 3 // H2 or H3
}

export interface ImageMetadata {
  url: string
  alt: string
  width?: number
  height?: number
}

export interface Author {
  name: string
  avatar?: string
  bio?: string
}

// ============================================================================
// BlogPost Types
// ============================================================================

export type BlogCategory = 'development' | 'design' | 'performance' | 'mobile'

export interface BlogPostFrontmatter {
  title: string
  description: string
  publishedAt: string // ISO 8601
  updatedAt?: string // ISO 8601
  author: Author
  tags: string[]
  category: BlogCategory
  image: ImageMetadata
  readingTime: number // minutes
  featured?: boolean
}

export interface BlogPost {
  slug: string
  frontmatter: BlogPostFrontmatter
  content: string // MDX source
  toc: TOCItem[] // Table of Contents
}

// ============================================================================
// PortfolioProject Types
// ============================================================================

export type PortfolioCategory = 'web' | 'mobile' | 'ui-ux' | 'full-stack'

export interface ClientInfo {
  name: string
  logo?: string
  industry: string
  website?: string
}

export interface ProjectMetric {
  label: string
  value: string
  improvement?: string // e.g. "+300%"
}

export interface Testimonial {
  quote: string
  author: string
  role: string
  rating: number // 1-5
}

export interface PortfolioProjectFrontmatter {
  title: string
  description: string
  client: ClientInfo
  date: string // ISO 8601 (project completion)
  category: PortfolioCategory
  tags: string[] // Technologies used
  image: ImageMetadata
  metrics: ProjectMetric[]
  testimonial?: Testimonial
  liveUrl?: string
  githubUrl?: string
}

export interface PortfolioProject {
  slug: string
  frontmatter: PortfolioProjectFrontmatter
  content: string // Case study details (MDX)
}

// ============================================================================
// ServicePage Types
// ============================================================================

export type PricingUnit = 'project' | 'hour' | 'month'

export interface Pricing {
  from: number
  currency: 'EUR'
  unit: PricingUnit
}

export interface ProcessStep {
  title: string
  description: string
  duration: string
}

export interface FAQ {
  question: string
  answer: string
}

export interface ServicePageFrontmatter {
  title: string
  description: string
  icon: string // Lucide icon name
  pricing: Pricing
  deliverables: string[]
  processSteps: ProcessStep[]
  faqs: FAQ[]
  relatedCaseStudies: string[] // Slugs
}

export interface ServicePage {
  slug: string // 'web-development', 'mobile-development', etc.
  frontmatter: ServicePageFrontmatter
  content: string // Long-form service description (MDX)
}

// ============================================================================
// CityPage Types
// ============================================================================

export interface Coordinates {
  lat: number
  lng: number
}

export interface CityPageFrontmatter {
  name: string // 'Bad Mergentheim'
  state: string // 'Baden-Württemberg'
  coordinates: Coordinates
  population: number
  description: string // Short intro
  services: string[] // Service slugs relevant for this city
  caseStudies: string[] // Project slugs from this region
  localKeywords: string[] // e.g. ['Webentwicklung Bad Mergentheim', ...]
}

export interface CityPage {
  slug: string // 'bad-mergentheim', 'lauda-koenigshofen', etc.
  frontmatter: CityPageFrontmatter
  content: string // Local content (MDX)
}
