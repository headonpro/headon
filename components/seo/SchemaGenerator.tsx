/**
 * Schema.org JSON-LD Generator Components
 *
 * Server components for injecting Schema.org structured data into pages.
 * Supports all Schema.org types with type-safe builders and validation.
 *
 * Components:
 * - SchemaGenerator: Universal schema injector (default export)
 * - ArticleSchema: Blog article wrapper
 * - FAQSchema: FAQ page wrapper
 * - CreativeWorkSchema: Portfolio project wrapper
 * - PersonSchema: Author/team profile wrapper
 * - ReviewSchema: Testimonial wrapper
 * - BreadcrumbSchema: Navigation breadcrumb wrapper
 * - ServiceSchema: Service page wrapper
 * - ItemListSchema: Item list wrapper (services, products, etc.)
 */

import Script from 'next/script'
import type { FAQ } from '@/lib/types/content'
import type { BlogContentResult, PortfolioContentResult } from '@/lib/content/mdx-loader'
import {
  buildArticleSchema,
  buildFAQPageSchema,
  buildCreativeWorkSchema,
  buildPersonSchema,
  buildReviewSchema,
  buildBreadcrumbListSchema,
  buildServiceSchema,
  buildItemListSchema,
  type PersonInput,
  type ReviewInput,
  type BreadcrumbInput,
  type ServiceInput,
  type ItemListInput,
} from '@/lib/seo/schema-builder'

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Generate unique ID for schema script tag
 * Supports multiple schemas of the same type on one page
 */
function generateSchemaId(schemaType: string): string {
  // Use timestamp for uniqueness (server-side stable during render)
  const timestamp = Date.now()
  return `schema-${schemaType.toLowerCase()}-${timestamp}`
}

/**
 * Validate schema has required @context and @type fields
 */
function validateSchema(schema: unknown): schema is Record<string, unknown> {
  if (!schema || typeof schema !== 'object') {
    console.warn('[SchemaGenerator] Schema is not a valid object:', schema)
    return false
  }

  const schemaObj = schema as Record<string, unknown>

  if (!schemaObj['@context']) {
    console.warn('[SchemaGenerator] Schema missing @context:', schema)
    return false
  }

  if (!schemaObj['@type']) {
    console.warn('[SchemaGenerator] Schema missing @type:', schema)
    return false
  }

  return true
}

// ============================================================================
// Universal SchemaGenerator Component
// ============================================================================

export interface SchemaGeneratorProps {
  schema: object | null | undefined
}

/**
 * Universal Schema.org JSON-LD injector component
 *
 * Renders a script tag with JSON-LD structured data.
 * Validates schema and supports multiple schemas per page.
 *
 * @example
 * ```tsx
 * <SchemaGenerator schema={buildArticleSchema(post)} />
 * ```
 */
export default function SchemaGenerator({ schema }: SchemaGeneratorProps) {
  // Don't render if schema is null/undefined
  if (!schema) {
    return null
  }

  // Validate schema structure
  if (!validateSchema(schema)) {
    return null
  }

  // Get schema type for unique ID
  const schemaType = (schema as Record<string, unknown>)['@type'] as string
  const schemaId = generateSchemaId(schemaType)

  // Safely stringify schema for HTML injection
  // JSON.stringify handles escaping automatically
  const schemaJson = JSON.stringify(schema)

  return (
    <Script
      id={schemaId}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: schemaJson }}
    />
  )
}

// ============================================================================
// Specific Schema Wrapper Components
// ============================================================================

/**
 * Article Schema wrapper for blog posts
 *
 * @example
 * ```tsx
 * <ArticleSchema post={blogPost} />
 * ```
 */
export function ArticleSchema({ post }: { post: BlogContentResult }) {
  const schema = buildArticleSchema(post)
  return <SchemaGenerator schema={schema} />
}

/**
 * FAQ Schema wrapper for FAQ sections
 *
 * @example
 * ```tsx
 * <FAQSchema faqs={servicePage.frontmatter.faqs} />
 * ```
 */
export function FAQSchema({ faqs }: { faqs: FAQ[] }) {
  if (!faqs || faqs.length === 0) {
    return null
  }

  const schema = buildFAQPageSchema(faqs)
  return <SchemaGenerator schema={schema} />
}

/**
 * CreativeWork Schema wrapper for portfolio projects
 *
 * @example
 * ```tsx
 * <CreativeWorkSchema project={portfolioProject} />
 * ```
 */
export function CreativeWorkSchema({ project }: { project: PortfolioContentResult }) {
  const schema = buildCreativeWorkSchema(project)
  return <SchemaGenerator schema={schema} />
}

/**
 * Person Schema wrapper for author/team profiles
 *
 * @example
 * ```tsx
 * <PersonSchema person={{ name: "Onur Cirakoglu", jobTitle: "Founder & CEO" }} />
 * ```
 */
export function PersonSchema({ person }: { person: PersonInput }) {
  const schema = buildPersonSchema(person)
  return <SchemaGenerator schema={schema} />
}

/**
 * Review Schema wrapper for testimonials
 *
 * @example
 * ```tsx
 * <ReviewSchema review={{
 *   itemReviewed: { type: 'Service', name: 'Web Development' },
 *   rating: 5,
 *   author: 'John Doe',
 *   reviewBody: 'Excellent work!'
 * }} />
 * ```
 */
export function ReviewSchema({ review }: { review: ReviewInput }) {
  const schema = buildReviewSchema(review)
  return <SchemaGenerator schema={schema} />
}

/**
 * Breadcrumb Schema wrapper for navigation breadcrumbs
 *
 * @example
 * ```tsx
 * <BreadcrumbSchema items={[
 *   { name: 'Home', url: '/' },
 *   { name: 'Blog', url: '/blog' },
 *   { name: 'Article Title' }
 * ]} />
 * ```
 */
export function BreadcrumbSchema({ items }: { items: BreadcrumbInput[] }) {
  if (!items || items.length === 0) {
    return null
  }

  const schema = buildBreadcrumbListSchema(items)
  return <SchemaGenerator schema={schema} />
}

/**
 * Service Schema wrapper for service pages
 *
 * @example
 * ```tsx
 * <ServiceSchema service={{
 *   name: 'Web Development',
 *   description: 'Professional web development services',
 *   serviceType: 'Web Development',
 *   url: '/services/web-development',
 *   areaServed: ['Bad Mergentheim', 'Lauda-Königshofen'],
 *   price: { from: 2500, currency: 'EUR' }
 * }} />
 * ```
 */
export function ServiceSchema({ service }: { service: ServiceInput }) {
  const schema = buildServiceSchema(service)
  return <SchemaGenerator schema={schema} />
}

/**
 * ItemList Schema wrapper for lists of services, products, etc.
 *
 * @example
 * ```tsx
 * <ItemListSchema itemList={{
 *   name: 'HEADON Services',
 *   description: 'Professional digital services',
 *   items: [
 *     { name: 'Web Development', url: '/services/web-development', description: '...' },
 *     { name: 'Mobile Development', url: '/services/mobile-development', description: '...' }
 *   ]
 * }} />
 * ```
 */
export function ItemListSchema({ itemList }: { itemList: ItemListInput }) {
  const schema = buildItemListSchema(itemList)
  return <SchemaGenerator schema={schema} />
}
