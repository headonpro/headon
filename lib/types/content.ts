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

// ============================================================================
// Glossary Types
// ============================================================================

export type GlossaryCategory = 'technology' | 'design' | 'development' | 'marketing'

export interface GlossaryTerm {
  id: string // Slug for URL (e.g., "api", "responsive-design")
  term: string // Display name (e.g., "API", "Responsive Design")
  category: GlossaryCategory
  shortDefinition: string // 1 sentence for preview cards
  fullExplanation: string // 2-3 paragraphs for detail page
  benefits: string[] // Bullet points of advantages
  relatedTerms: Array<{ term: string; id: string }> // Links to other glossary entries
  resources?: Array<{ title: string; url: string }> // External links (optional)
  keywords: string[] // For SEO and search functionality
}

// ============================================================================
// Comparison Article Types
// ============================================================================

export interface ComparisonItem {
  name: string // e.g., "React", "Vue.js"
  logo?: string // Logo image URL
  features: Record<string, string | boolean | number> // Feature values
  pros: string[] // Advantages
  cons: string[] // Disadvantages
  useCase: string // Best use case description
  recommendation: string // When to choose this option
}

export interface FeatureCategory {
  category: string // e.g., "Performance", "Ecosystem"
  features: string[] // e.g., ["Bundle Size", "Rendering Speed"]
}

export interface ComparisonArticle {
  slug: string // URL slug (e.g., "react-vs-vue")
  title: string // SEO-optimized title
  description: string // Meta description
  publishedAt: string // ISO 8601 date
  updatedAt?: string // For dateModified in Article schema
  author: {
    name: string
    image?: string
  }

  // Items being compared (2-5 items)
  items: ComparisonItem[]

  // Feature categories for table headers
  featureCategories: FeatureCategory[]

  // Article content
  introduction: string
  conclusion: string

  // Related service CTA
  relatedService?: {
    name: string
    url: string
    cta: string
  }

  // SEO
  keywords: string[]
  ogImage?: string
}

// ============================================================================
// Stats Section Types (AI SEO)
// ============================================================================

export interface Stat {
  value: string | number
  label: string
  unit?: string
  suffix?: string // e.g., "+", "x", "%"
  schemaProperty?: string // For Organization schema integration
}

export interface StatsSectionProps {
  stats: Stat[]
  title?: string
  description?: string
  includeSchema?: boolean // Add to Organization schema
  className?: string
}
