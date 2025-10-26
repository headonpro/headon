# Design Document

## Overview

This design document outlines the technical architecture for implementing comprehensive SEO optimization across the HEADON.pro website. The implementation builds upon an **existing, well-structured SEO infrastructure** including schema generators, metadata builders, and structured data components. Rather than rebuilding, we'll **extend, enhance, and optimize** existing systems while adding missing pieces like OG images, FAQ pages, and content hubs.

**Key Design Principles:**

1. **Leverage Existing Infrastructure** - Reuse StructuredData, SchemaGenerator, and meta-builder utilities
2. **Incremental Enhancement** - Add missing schemas and metadata without disrupting existing functionality
3. **Performance-First** - Ensure SEO enhancements don't negatively impact Core Web Vitals
4. **Type Safety** - Maintain strict TypeScript types for all SEO components
5. **Maintainability** - Keep SEO concerns modular and colocated with page components

**Architecture Overview:**
The SEO optimization feature spans multiple layers:

- **Component Layer**: Schema components, metadata generators, OG image components
- **Utility Layer**: Schema builders, meta builders, validation utilities
- **Content Layer**: FAQ pages, glossary, comparison articles, enhanced service pages
- **Asset Layer**: OG images (1200x630px), optimized for social media

## Steering Document Alignment

### Technical Standards (tech.md)

**Framework Compliance:**

- **Next.js 15 App Router**: Utilize built-in Metadata API for SEO optimization
- **TypeScript Strict Mode**: All SEO utilities maintain type safety with explicit interfaces
- **Server Components**: Schema generators render on server for zero client-side cost
- **Performance Requirements**: All changes must maintain Lighthouse 95+ and LCP < 1.5s

**Technology Integration:**

- **Supabase**: No changes required - SEO is purely presentational layer
- **Tailwind CSS**: Use for FAQ page, glossary, and comparison article styling
- **Framer Motion**: Minimal use for FAQ accordion animations (optional)
- **Next.js Image**: Use for OG image optimization and delivery

**Build Process:**

- **Standalone Output**: SEO enhancements compatible with Docker deployment
- **Static Generation**: FAQ, glossary, and comparison pages use SSG for optimal performance
- **Metadata Generation**: Leverage Next.js Metadata API for automatic tag injection

**Code Quality:**

- **ESLint/Prettier**: All new code follows existing formatting standards
- **Type Safety**: Schemas use `@/lib/types/schema` interfaces
- **Validation**: Runtime schema validation in development, fail-safe in production

### Project Structure (structure.md)

**Directory Organization:**

```
app/
├── faq/
│   └── page.tsx                    # NEW: Dedicated FAQ page with FAQPage schema
├── glossar/
│   ├── page.tsx                    # NEW: Glossary listing page
│   └── [term]/page.tsx             # NEW: Individual glossary term pages
├── vergleiche/
│   ├── page.tsx                    # NEW: Comparison articles listing
│   └── [slug]/page.tsx             # NEW: Individual comparison articles
├── page.tsx                        # ENHANCE: Already has metadata, verify H1
└── services/
    └── [service]/page.tsx          # ENHANCE: Add FAQ sections with schema

components/
├── seo/
│   ├── StructuredData.tsx          # EXISTS: Organization, LocalBusiness, Service, Breadcrumb
│   ├── SchemaGenerator.tsx         # EXISTS: Universal generator with wrappers
│   ├── WebsiteSchema.tsx           # EXISTS: WebSite schema with SearchAction
│   ├── Breadcrumbs.tsx             # EXISTS: Breadcrumb UI component
│   ├── PageHeader.tsx              # EXISTS: Page header component
│   └── FAQAccordion.tsx            # NEW: Reusable FAQ accordion with schema
├── sections/
│   ├── HeroSection.tsx             # VERIFY: H1 tag populated (already done?)
│   ├── FAQSection.tsx              # EXISTS: FAQ section component
│   └── StatsSection.tsx            # NEW: "About us in numbers" for AI SEO
└── content/
    ├── GlossaryCard.tsx            # NEW: Glossary term card component
    ├── ComparisonTable.tsx         # NEW: Feature comparison table
    └── CaseStudyCard.tsx           # ENHANCE: Portfolio card with enhanced schema

lib/
├── seo/
│   ├── schema-builder.ts           # EXISTS: Type-safe schema builders
│   ├── meta-builder.ts             # EXISTS: SEO-optimized metadata generators
│   ├── og-image-generator.ts       # NEW: OG image generation utility
│   └── keyword-analyzer.ts         # NEW: Keyword density analysis tool
├── content/
│   ├── glossary.ts                 # NEW: Glossary data source
│   ├── comparisons.ts              # NEW: Comparison articles data
│   └── faq-data.ts                 # NEW: Centralized FAQ data
└── types/
    ├── schema.ts                   # EXISTS: Schema.org type definitions
    └── content.ts                  # ENHANCE: Add Glossary, Comparison types

public/
└── og-images/                      # NEW: Social media images
    ├── home.jpg                    # 1200x630, < 100KB
    ├── services.jpg
    ├── web-dev.jpg
    ├── mobile-dev.jpg
    ├── design.jpg
    ├── backend.jpg
    ├── blog.jpg
    ├── contact.jpg
    └── about.jpg
```

**Pattern Consistency:**

- **Metadata Location**: Colocated with page component using Next.js Metadata API
- **Schema Location**: Rendered in page component body (Server Component)
- **Content Types**: Use MDX for glossary terms, TypeScript data files for structured content
- **Image Assets**: Store OG images in `/public/og-images/`, optimize before commit

## Code Reuse Analysis

### Existing Components to Leverage

1. **StructuredData Component** (`components/seo/StructuredData.tsx`)
   - **Current Capabilities**: Organization, LocalBusiness, Service, Breadcrumb schemas
   - **Reuse Strategy**: Continue using for global schemas in layout.tsx
   - **No Changes Needed**: Component is well-designed and functional
   - **Note**: LocalBusiness schema already includes areaServed, geo, openingHours

2. **SchemaGenerator System** (`components/seo/SchemaGenerator.tsx`)
   - **Current Capabilities**: Universal schema injector with specialized wrappers (ArticleSchema, FAQSchema, CreativeWorkSchema, PersonSchema, ReviewSchema, BreadcrumbSchema)
   - **Reuse Strategy**: Use existing FAQSchema wrapper for FAQ sections
   - **Integration Points**: Add FAQSchema to service pages and new FAQ page
   - **No New Components Needed**: Existing system handles all requirements

3. **Schema Builder Utilities** (`lib/seo/schema-builder.ts`)
   - **Current Capabilities**: Type-safe builders for Article, FAQ, CreativeWork, Person, Review, AggregateRating, Breadcrumb
   - **Reuse Strategy**: Use buildFAQPageSchema for FAQ sections, buildPersonSchema for team pages, buildAggregateRatingSchema for reviews
   - **Extension Needed**: None - all required builders exist
   - **Integration**: Import and use in new pages

4. **Meta Builder Utilities** (`lib/seo/meta-builder.ts`)
   - **Current Capabilities**: Metadata generators for Blog, Portfolio, Service, City, generic pages; automatic truncation to optimal lengths
   - **Reuse Strategy**: Use generatePageMetadata for FAQ, glossary, comparison pages
   - **Extension Needed**: Add generateGlossaryMetadata, generateComparisonMetadata for specialized titles
   - **Benefits**: Consistent metadata format, automatic Open Graph generation, truncation

5. **WebsiteSchema Component** (`components/seo/WebsiteSchema.tsx`)
   - **Status**: Already implemented with SearchAction for sitelinks
   - **Reuse Strategy**: Keep as-is in layout.tsx
   - **No Changes Needed**: Meets all requirements from SEO plan

6. **HeroSection Component** (`components/sections/HeroSection.tsx`)
   - **Status**: H1 tag exists and is populated (lines 212-266)
   - **Content**: "Full-Service Digitalagentur für Webentwicklung, Apps & kreatives Design"
   - **Analysis**: Already contains target keywords - may need minor optimization
   - **Action**: Verify in live HTML; adjust wording if needed for keyword balance

7. **Homepage Metadata** (`app/page.tsx`)
   - **Status**: Already implemented with comprehensive keywords
   - **Content**: Title, description, keywords array, OpenGraph tags
   - **Analysis**: Follows SEO best practices - meets P1 requirements
   - **Action**: Verify OG image exists at referenced path; update if needed

### Integration Points

1. **Root Layout** (`app/layout.tsx`)
   - **Current Integration**: StructuredData components (Organization, LocalBusiness), WebsiteSchema
   - **Status**: Complete - no changes needed
   - **Verification**: Ensure 4+ JSON-LD scripts render (Organization, LocalBusiness, WebSite, any page-specific)

2. **Service Pages** (`app/services/[service]/page.tsx`)
   - **Current State**: Service metadata exists (via MDX frontmatter)
   - **Enhancement Needed**: Add FAQ sections with FAQSchema
   - **Integration**: Import { FAQSchema } from '@/components/seo/SchemaGenerator', render with service-specific FAQ data
   - **Data Source**: Create lib/content/service-faqs.ts with FAQs per service

3. **Blog Posts** (`app/blog/[slug]/page.tsx`)
   - **Current Integration**: ArticleSchema via SchemaGenerator
   - **Status**: Complete - no changes needed
   - **Verification**: Ensure Article schema renders on all blog posts

4. **Portfolio Projects** (`app/portfolio/[slug]/page.tsx`)
   - **Current Integration**: CreativeWorkSchema via SchemaGenerator
   - **Enhancement**: Add testimonial Review schema if client testimonials exist
   - **Integration**: Import { ReviewSchema } from SchemaGenerator, render per testimonial

## Architecture

### Modular Design Principles

**1. Single File Responsibility:**

- **Schema Components**: Each schema component handles one schema type (FAQSchema, ArticleSchema, etc.)
- **Page Components**: Pages compose schemas rather than implementing them
- **Utility Functions**: Builders focus on schema construction, validators on validation
- **Content Files**: Separate data from presentation (faq-data.ts, glossary.ts)

**2. Component Isolation:**

- **FAQAccordion**: Self-contained FAQ UI with integrated schema generation
- **ComparisonTable**: Standalone comparison table with structured data
- **StatsSection**: Isolated "About in numbers" section for AI SEO
- **GlossaryCard**: Reusable card for glossary term display

**3. Service Layer Separation:**

- **Data Layer**: Content files (faq-data.ts, glossary.ts, comparisons.ts)
- **Business Logic**: Schema builders (schema-builder.ts) and metadata generators (meta-builder.ts)
- **Presentation Layer**: React components consuming data and generating UI
- **Validation Layer**: Runtime schema validation in development (validateSchema in SchemaGenerator)

**4. Utility Modularity:**

- **schema-builder.ts**: Schema construction (buildFAQPageSchema, buildPersonSchema, etc.)
- **meta-builder.ts**: Metadata construction (generatePageMetadata, truncateTitle, etc.)
- **og-image-generator.ts**: NEW - OG image URL generation and validation
- **keyword-analyzer.ts**: NEW - Keyword density analysis for development

### Architecture Diagram

```mermaid
graph TD
    A[User Request] --> B{Page Type}

    B -->|Home| C[app/page.tsx]
    B -->|Service| D[app/services/[service]/page.tsx]
    B -->|FAQ| E[app/faq/page.tsx]
    B -->|Glossary| F[app/glossar/page.tsx]
    B -->|Comparison| G[app/vergleiche/[slug]/page.tsx]

    C --> H[Metadata API]
    D --> H
    E --> H
    F --> H
    G --> H

    C --> I[Schema Components]
    D --> I
    E --> I
    F --> I
    G --> I

    H --> J[meta-builder.ts]
    J --> K[generatePageMetadata]
    J --> L[truncateTitle/Description]

    I --> M[SchemaGenerator]
    M --> N[buildFAQPageSchema]
    M --> O[buildPersonSchema]
    M --> P[buildArticleSchema]
    M --> Q[buildBreadcrumbListSchema]

    N --> R[schema-builder.ts]
    O --> R
    P --> R
    Q --> R

    R --> S[Rendered JSON-LD]
    K --> T[Rendered Meta Tags]

    S --> U[Search Engine]
    T --> U

    style C fill:#e1f5fe
    style D fill:#e1f5fe
    style E fill:#c8e6c9
    style F fill:#c8e6c9
    style G fill:#c8e6c9
    style I fill:#fff9c4
    style J fill:#fff9c4
    style R fill:#ffecb3
```

**Data Flow:**

1. **Request**: User/crawler requests a page
2. **Route**: Next.js router matches page component
3. **Metadata Generation**: Page exports `metadata` object via Metadata API
4. **Schema Generation**: Page renders Schema components (Server Components)
5. **Builder Invocation**: Schema components call schema-builder functions
6. **Validation**: Schemas validated (dev only), rendered as JSON-LD scripts
7. **HTML Output**: Complete HTML with meta tags and structured data
8. **Indexing**: Search engines parse and index content

## Components and Interfaces

### Component 1: FAQAccordion

- **Purpose:** Reusable FAQ accordion UI component with integrated FAQPage schema generation
- **Location:** `components/seo/FAQAccordion.tsx`
- **Type:** Client Component (uses Framer Motion for animation)
- **Interfaces:**

  ```typescript
  interface FAQAccordionProps {
    faqs: FAQ[]
    includeSchema?: boolean // Default: true
    className?: string
  }

  interface FAQ {
    question: string
    answer: string
  }
  ```

- **Dependencies:**
  - `@/lib/types/content` (FAQ type)
  - `@/components/seo/SchemaGenerator` (FAQSchema wrapper)
  - `framer-motion` (accordion animation)
  - `lucide-react` (ChevronDown icon)
- **Reuses:**
  - Existing `FAQSchema` component for schema generation
  - Existing `buildFAQPageSchema` utility from schema-builder
- **Behavior:**
  - Renders collapsible FAQ items with smooth animations
  - Automatically generates FAQPage schema if `includeSchema=true`
  - Keyboard accessible (Enter/Space to toggle, Arrow keys to navigate)
  - Mobile-optimized touch targets

### Component 2: OG Image Generator Utility

- **Purpose:** Generate and validate Open Graph image URLs for social media
- **Location:** `lib/seo/og-image-generator.ts`
- **Type:** Server-side utility (no React component)
- **Interfaces:**

  ```typescript
  interface OGImageOptions {
    page:
      | 'home'
      | 'services'
      | 'web-dev'
      | 'mobile-dev'
      | 'design'
      | 'backend'
      | 'blog'
      | 'contact'
      | 'about'
      | 'custom'
    customFilename?: string // For 'custom' page type
  }

  function getOGImageUrl(options: OGImageOptions): string
  function validateOGImageExists(url: string): boolean // Dev-only check
  ```

- **Dependencies:**
  - `fs` (Node.js) for file existence validation
  - `path` for URL construction
- **Reuses:**
  - Base URL from `process.env.NEXT_PUBLIC_SITE_URL`
- **Behavior:**
  - Returns absolute OG image URL for specified page
  - Validates image exists in development (logs warning if missing)
  - Falls back to default logo if custom image missing
  - Ensures URLs are properly formatted for Open Graph tags

### Component 3: Glossary Page

- **Purpose:** Display glossary of technical terms with structured data
- **Location:** `app/glossar/page.tsx`
- **Type:** Server Component (SSG)
- **Interfaces:**

  ```typescript
  interface GlossaryTerm {
    id: string
    term: string
    shortDefinition: string
    fullExplanation: string
    benefits: string[]
    relatedTerms: { term: string; id: string }[]
    resources?: { title: string; url: string }[]
  }

  export async function generateStaticParams(): Promise<{ term: string }[]>
  export async function generateMetadata(): Promise<Metadata>
  ```

- **Dependencies:**
  - `@/lib/content/glossary` (glossary data source)
  - `@/lib/seo/meta-builder` (metadata generation)
  - `@/components/content/GlossaryCard` (term card UI)
- **Reuses:**
  - `generatePageMetadata` for meta tag generation
  - Existing layout and typography styles
- **Behavior:**
  - Renders A-Z indexed glossary with anchor navigation
  - Generates metadata with long-tail keywords ("Was ist React?")
  - Uses SSG for fast page loads and optimal SEO
  - Links to related terms and external resources

### Component 4: Comparison Article Page

- **Purpose:** Detailed comparison articles (React vs Vue, Native vs Cross-Platform, etc.)
- **Location:** `app/vergleiche/[slug]/page.tsx`
- **Type:** Server Component (SSG)
- **Interfaces:**

  ```typescript
  interface ComparisonArticle {
    slug: string
    title: string
    description: string
    publishedAt: string
    items: {
      name: string
      features: Record<string, string | boolean>
      pros: string[]
      cons: string[]
      useCase: string
      recommendation: string
    }[]
    featureCategories: string[]
    conclusion: string
    relatedService: { name: string; url: string }
  }

  export async function generateStaticParams(): Promise<{ slug: string }[]>
  export async function generateMetadata({ params }): Promise<Metadata>
  ```

- **Dependencies:**
  - `@/lib/content/comparisons` (comparison data source)
  - `@/lib/seo/meta-builder` (metadata generation)
  - `@/components/content/ComparisonTable` (feature table UI)
  - `@/components/seo/SchemaGenerator` (Article schema)
- **Reuses:**
  - `buildArticleSchema` for structured data
  - `generatePageMetadata` with article-specific enhancements
  - Existing Button component for CTA to service pages
- **Behavior:**
  - Renders interactive feature comparison table
  - Includes pros/cons lists, use case examples, recommendations
  - CTA links to relevant service page
  - Article schema for SEO visibility
  - Mobile-responsive table with horizontal scroll

### Component 5: Enhanced Service Pages

- **Purpose:** Add FAQ sections to existing service pages
- **Location:** `app/services/[service]/page.tsx` (enhancement)
- **Type:** Server Component (existing, enhanced)
- **Interfaces:**
  ```typescript
  // Extend existing service page frontmatter
  interface ServicePageFrontmatter {
    // ... existing fields
    faqs?: FAQ[] // NEW: Service-specific FAQs
  }
  ```
- **Dependencies:**
  - `@/lib/content/service-faqs` (service-specific FAQ data)
  - `@/components/seo/FAQAccordion` (FAQ UI + schema)
- **Reuses:**
  - Existing service page structure and styling
  - Existing metadata generation from frontmatter
  - Existing Service schema from StructuredData component
- **Behavior:**
  - Renders FAQ section below service description
  - Automatically generates FAQPage schema for service FAQs
  - Each service has 5-7 FAQs answering common questions
  - FAQs optimized for featured snippets

### Component 6: Stats Section (AI SEO)

- **Purpose:** "About us in numbers" section with structured data for AI search engines
- **Location:** `components/sections/StatsSection.tsx`
- **Type:** Client Component (for number count-up animation)
- **Interfaces:**

  ```typescript
  interface Stat {
    value: string | number
    label: string
    unit?: string
    schemaProperty?: string // For Organization schema integration
  }

  interface StatsSectionProps {
    stats: Stat[]
    title?: string
    includeSchema?: boolean // Add to Organization schema
  }
  ```

- **Dependencies:**
  - `framer-motion` (count-up animation)
  - `react-intersection-observer` (trigger animation on scroll)
- **Reuses:**
  - Existing grid and card styles
  - Brand colors and typography
- **Behavior:**
  - Displays key metrics (50+ projects, 10+ years, 4x faster, 100% satisfaction)
  - Animates numbers when section enters viewport
  - Optionally extends Organization schema with QuantitativeValue properties
  - Mobile-responsive grid layout

## Data Models

### Model 1: FAQ Data Structure

```typescript
// lib/types/content.ts (existing, already defined)
export interface FAQ {
  question: string
  answer: string
}

// lib/content/faq-data.ts (NEW)
export interface FAQCollection {
  general: FAQ[] // Homepage and /faq page
  webDevelopment: FAQ[]
  mobileDevelopment: FAQ[]
  uiUxDesign: FAQ[]
  backendSolutions: FAQ[]
}

// Example data:
export const faqData: FAQCollection = {
  general: [
    {
      question: 'Was kostet eine professionelle Website?',
      answer:
        'Eine professionelle Website kostet bei uns ab 2.500€. Der finale Preis hängt vom Funktionsumfang ab. Nach unserem kostenlosen 15-Minuten-Beratungsgespräch erhalten Sie ein transparentes Festpreis-Angebot.',
    },
    // ... 6 more general FAQs
  ],
  webDevelopment: [
    {
      question: 'Welche Technologien nutzt ihr für Webentwicklung?',
      answer:
        'Wir setzen auf moderne, zukunftssichere Technologien: React und Next.js für Websites, TypeScript für Type-Safety und Tailwind CSS für performantes Styling.',
    },
    // ... 4-6 more web-specific FAQs
  ],
  // ... other service-specific FAQs
}
```

**Storage:** TypeScript data file (`lib/content/faq-data.ts`)
**Access Pattern:** Import and consume in FAQ page and service pages
**Type Safety:** Strict TypeScript interfaces ensure consistency
**Maintainability:** Centralized data source prevents duplication

### Model 2: Glossary Term Structure

```typescript
// lib/types/content.ts (ENHANCE)
export interface GlossaryTerm {
  id: string // Slug for URL (e.g., "api", "responsive-design")
  term: string // Display name (e.g., "API", "Responsive Design")
  category: 'technology' | 'design' | 'development' | 'marketing'
  shortDefinition: string // 1 sentence for preview cards
  fullExplanation: string // 2-3 paragraphs for detail page
  benefits: string[] // Bullet points of advantages
  relatedTerms: Array<{ term: string; id: string }> // Links to other glossary entries
  resources?: Array<{ title: string; url: string }> // External links (optional)
  keywords: string[] // For SEO and search functionality
}

// lib/content/glossary.ts (NEW)
export const glossaryTerms: GlossaryTerm[] = [
  {
    id: 'api',
    term: 'API (Application Programming Interface)',
    category: 'technology',
    shortDefinition:
      'Eine Programmierschnittstelle ermöglicht die Kommunikation zwischen verschiedenen Softwareanwendungen.',
    fullExplanation:
      'Eine API (Application Programming Interface) ist eine klar definierte Schnittstelle, die es verschiedenen Softwareanwendungen ermöglicht, miteinander zu kommunizieren und Daten auszutauschen...\n\n[2-3 paragraphs total]',
    benefits: [
      'Wiederverwendbarkeit von Funktionalitäten',
      'Modulare Architektur für bessere Wartbarkeit',
      'Integration von Drittanbieter-Services',
    ],
    relatedTerms: [
      { term: 'REST API', id: 'rest-api' },
      { term: 'GraphQL', id: 'graphql' },
    ],
    resources: [{ title: 'REST API Tutorial', url: 'https://example.com/rest' }],
    keywords: ['api', 'schnittstelle', 'integration', 'backend'],
  },
  // ... 29+ more terms
]
```

**Storage:** TypeScript data file with static data
**Access Pattern:** Import entire array, filter by category or search
**Type Safety:** Strict interface prevents missing fields
**Scalability:** Can migrate to CMS (Contentful, Sanity) later if needed

### Model 3: Comparison Article Structure

```typescript
// lib/types/content.ts (ENHANCE)
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
  items: Array<{
    name: string // e.g., "React", "Vue.js"
    logo?: string // Logo image URL
    features: Record<string, string | boolean | number> // Feature values
    pros: string[] // Advantages
    cons: string[] // Disadvantages
    useCase: string // Best use case description
    recommendation: string // When to choose this option
  }>

  // Feature categories for table headers
  featureCategories: Array<{
    category: string // e.g., "Performance", "Ecosystem"
    features: string[] // e.g., ["Bundle Size", "Rendering Speed"]
  }>

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

// lib/content/comparisons.ts (NEW)
export const comparisonArticles: ComparisonArticle[] = [
  {
    slug: 'react-vs-vue',
    title: 'React vs Vue.js: Der große Framework-Vergleich 2025',
    description:
      'Detaillierter Vergleich von React und Vue.js: Performance, Lernkurve, Ecosystem und Use Cases. Welches Framework passt zu Ihrem Projekt?',
    publishedAt: '2025-01-15',
    author: { name: 'HEADON Team' },
    items: [
      {
        name: 'React',
        logo: '/logos/react.svg',
        features: {
          Lernkurve: 'Mittel',
          'Bundle Size': '42 KB (gzipped)',
          Performance: 'Sehr hoch',
          Community: 'Sehr groß',
          'TypeScript Support': true,
          'Job Market': 'Exzellent',
        },
        pros: [
          'Riesiges Ecosystem mit unzähligen Libraries',
          'Sehr gute Job-Aussichten',
          'Flexible Architektur',
        ],
        cons: ['Steile Lernkurve für Anfänger', 'Viele Entscheidungen notwendig'],
        useCase: 'Enterprise-Anwendungen, komplexe UIs, große Teams',
        recommendation: 'Wählen Sie React für große, langlebige Projekte mit mehreren Entwicklern.',
      },
      {
        name: 'Vue.js',
        logo: '/logos/vue.svg',
        features: {
          Lernkurve: 'Niedrig',
          'Bundle Size': '34 KB (gzipped)',
          Performance: 'Sehr hoch',
          Community: 'Groß',
          'TypeScript Support': true,
          'Job Market': 'Gut',
        },
        pros: [
          'Einfache Lernkurve, schneller Einstieg',
          'Hervorragende Dokumentation',
          'Weniger Boilerplate-Code',
        ],
        cons: ['Kleineres Ecosystem als React', 'Weniger Enterprise-Adoption'],
        useCase: 'Prototypen, mittelgroße Anwendungen, Solo-Entwickler',
        recommendation: 'Wählen Sie Vue für schnelle Entwicklung und einfache Wartung.',
      },
    ],
    featureCategories: [
      {
        category: 'Technische Aspekte',
        features: ['Lernkurve', 'Bundle Size', 'Performance'],
      },
      {
        category: 'Ecosystem & Support',
        features: ['Community', 'TypeScript Support', 'Job Market'],
      },
    ],
    introduction:
      'React und Vue.js sind zwei der beliebtesten JavaScript-Frameworks im Jahr 2025...',
    conclusion: 'Beide Frameworks sind exzellente Optionen. Die Wahl hängt von Ihrem Projekt ab...',
    relatedService: {
      name: 'Web Development',
      url: '/services/web-development',
      cta: 'Website mit React oder Vue entwickeln lassen',
    },
    keywords: ['react vs vue', 'javascript framework vergleich', 'react oder vue 2025'],
  },
  // ... 4+ more comparison articles
]
```

**Storage:** TypeScript data files for structured comparisons
**Access Pattern:** Import array, filter by slug for dynamic routes
**Type Safety:** Strict interface ensures all fields present
**Extensibility:** Easy to add new comparisons or features

### Model 4: Open Graph Image Metadata

```typescript
// lib/types/seo.ts (NEW)
export interface OGImageMetadata {
  page: string // Page identifier
  url: string // Absolute URL to image
  width: number // Image width (1200)
  height: number // Image height (630)
  alt: string // Alt text for accessibility
  fileSize?: number // File size in bytes (< 100KB)
  format: 'jpg' | 'png' | 'webp' // Image format
}

// lib/seo/og-images.ts (NEW)
export const ogImages: Record<string, OGImageMetadata> = {
  home: {
    page: 'home',
    url: 'https://headon.pro/og-images/home.jpg',
    width: 1200,
    height: 630,
    alt: 'HEADON.pro - Full-Service Digitalagentur für Web & App Entwicklung',
    format: 'jpg',
  },
  services: {
    page: 'services',
    url: 'https://headon.pro/og-images/services.jpg',
    width: 1200,
    height: 630,
    alt: 'HEADON.pro Services - Web, Mobile, Design & Backend',
    format: 'jpg',
  },
  // ... more pages
}
```

**Storage:** TypeScript configuration object
**Access Pattern:** Import and lookup by page key
**Type Safety:** Ensures correct image dimensions and URLs
**Validation:** Dev-only validation checks image file existence

## Error Handling

### Error Scenario 1: Missing Schema Data

- **Description:** FAQ, glossary, or comparison data is undefined or empty
- **Handling:**
  - Schema builders return `null` if data is invalid (existing behavior in buildFAQPageSchema)
  - SchemaGenerator component checks for null and skips rendering
  - Log warning in development: `console.warn('No FAQs provided to buildFAQPageSchema')`
  - Fail gracefully: Page renders without schema rather than crashing
- **User Impact:** Page renders normally, but missing structured data means no rich snippets in search results

### Error Scenario 2: Invalid Metadata

- **Description:** Metadata generation fails (e.g., title is empty, image URL is malformed)
- **Handling:**
  - meta-builder validates required fields before returning Metadata object
  - Falls back to root layout metadata if page metadata is invalid
  - Truncation functions handle edge cases (empty strings, single words)
  - Logs error in development: `console.error('Invalid metadata for page:', pageName)`
- **User Impact:** Page displays with default site-wide metadata instead of page-specific metadata

### Error Scenario 3: OG Image Not Found

- **Description:** Referenced OG image file doesn't exist at specified path
- **Handling:**
  - Development: `validateOGImageExists()` checks file existence, logs warning
  - Production: No validation (performance), falls back to default logo if image fails to load
  - Browser handles missing images gracefully (shows placeholder or nothing)
  - Social media platforms fall back to first image on page or site logo
- **User Impact:** Social media shares show default logo instead of custom OG image; reduced click-through rate but no broken functionality

### Error Scenario 4: Schema Validation Failure

- **Description:** Generated schema is malformed or missing required fields (@context, @type)
- **Handling:**
  - `validateSchema()` in SchemaGenerator checks structure before rendering
  - Returns false if invalid, component returns null (no rendering)
  - Logs warning: `console.warn('[SchemaGenerator] Schema missing @context:', schema)`
  - Page renders normally without the invalid schema
- **User Impact:** Search engines don't receive structured data for that specific schema, but page remains functional

### Error Scenario 5: Build-Time Data Loading Failure

- **Description:** Static data files (glossary.ts, comparisons.ts) fail to import or parse
- **Handling:**
  - TypeScript compilation catches syntax errors
  - Runtime: try/catch around data imports in generateStaticParams()
  - Falls back to empty array if import fails
  - Logs error: `console.error('Failed to load glossary data:', error)`
  - Page returns 404 instead of crashing build
- **User Impact:** Glossary or comparison pages return 404 until data is fixed; other pages unaffected

### Error Scenario 6: Keyword Density Analysis Failure

- **Description:** Keyword analyzer utility throws error on malformed HTML or missing content
- **Handling:**
  - Only used in development for analysis, not in production
  - Wrapped in try/catch in analysis scripts
  - Returns default values (0% density) if analysis fails
  - Logs detailed error for debugging
- **User Impact:** No user impact (dev-only tool); developers see warning but can continue work

## Testing Strategy

### Unit Testing

**Approach:** Playwright unit tests for utility functions and schema builders

**Key Components to Test:**

1. **Schema Builders** (`lib/seo/schema-builder.ts`)
   - `buildFAQPageSchema()`: Validates output matches FAQPage schema spec
   - `buildPersonSchema()`: Checks all fields are properly formatted
   - `buildBreadcrumbListSchema()`: Ensures positions start at 1, URLs are absolute
   - Edge cases: Empty arrays, missing optional fields, special characters in text

2. **Meta Builders** (`lib/seo/meta-builder.ts`)
   - `truncateTitle()`: Verifies truncation at word boundaries, 60 char limit
   - `truncateDescription()`: Checks 160 char limit, ellipsis placement
   - `buildMetaTags()`: Validates Open Graph structure, canonical URLs, image dimensions
   - Edge cases: Very short strings, strings without spaces, special characters

3. **OG Image Generator** (`lib/seo/og-image-generator.ts`)
   - `getOGImageUrl()`: Returns correct absolute URLs for each page type
   - `validateOGImageExists()`: Correctly identifies missing files in development
   - Edge cases: Custom filenames, malformed paths, missing page types

4. **Keyword Analyzer** (`lib/seo/keyword-analyzer.ts`)
   - Calculates keyword density accurately
   - Handles HTML entities and special characters
   - Edge cases: Empty content, very short content, case sensitivity

**Test Framework:** Playwright (already configured in project)
**Coverage Goal:** 80%+ for utility functions
**Run Command:** `pnpm test:unit` (to be added)

### Integration Testing

**Approach:** Test schema generation in context of actual page components

**Key Flows to Test:**

1. **FAQ Page Rendering**
   - Test: Navigate to `/faq`, verify FAQPage schema in HTML
   - Assertions:
     - FAQPage schema exists in HTML with @type "FAQPage"
     - All FAQ questions and answers present in schema
     - Page metadata includes "FAQ" in title
     - Accordion UI renders and is interactive
   - Tools: Playwright E2E test

2. **Service Page with FAQs**
   - Test: Navigate to `/services/web-development`, verify FAQ section + schema
   - Assertions:
     - Service page renders successfully
     - FAQ section appears below service description
     - FAQPage schema includes service-specific questions
     - Both Service schema (from StructuredData) and FAQPage schema present
   - Tools: Playwright E2E test

3. **Glossary Term Page**
   - Test: Navigate to `/glossar/api`, verify content and metadata
   - Assertions:
     - Term definition renders correctly
     - Metadata includes term name in title
     - Related terms link to other glossary pages
     - Proper heading hierarchy (H1, H2, H3)
   - Tools: Playwright E2E test

4. **Comparison Article Page**
   - Test: Navigate to `/vergleiche/react-vs-vue`, verify comparison table + schema
   - Assertions:
     - Comparison table renders with all features
     - Pros/cons lists display correctly
     - Article schema includes headline, author, datePublished
     - CTA button links to related service page
   - Tools: Playwright E2E test

5. **Multiple Schemas Per Page**
   - Test: Homepage should render Organization, LocalBusiness, WebSite schemas
   - Assertions:
     - Exactly 3+ JSON-LD scripts present in HTML
     - Each has unique @type
     - All schemas validate against schema.org spec
   - Tools: Playwright + schema validator API call

**Test Framework:** Playwright
**Coverage Goal:** All new pages and enhanced pages tested
**Run Command:** `pnpm test:integration` or `pnpm test`

### End-to-End Testing

**Approach:** Simulate real user journeys and search engine crawler behavior

**User Scenarios to Test:**

1. **SEO Crawler Simulation**
   - **Scenario:** Search engine bot crawls homepage
   - **Steps:**
     1. Fetch homepage HTML (user-agent: Googlebot)
     2. Parse and count JSON-LD scripts
     3. Validate each schema against schema.org
     4. Check meta tags (title length, description length, og:image)
     5. Verify H1 tag exists and contains keywords
   - **Expected Results:**
     - 4+ valid JSON-LD schemas
     - Meta tags within optimal lengths
     - Single H1 tag with primary keywords
     - Open Graph image URL returns 200 status
   - **Tools:** Playwright with custom Googlebot user-agent

2. **FAQ User Journey**
   - **Scenario:** User searches Google, finds FAQ snippet, clicks through
   - **Steps:**
     1. Navigate to FAQ page
     2. Verify FAQ schema in HTML
     3. Click accordion item to expand
     4. Read answer content
     5. Click related link to service page
   - **Expected Results:**
     - FAQ page loads in < 2 seconds (LCP)
     - Accordion animation smooth (60fps)
     - Service page link navigates correctly
     - No layout shift during accordion animation (CLS < 0.1)
   - **Tools:** Playwright with performance profiling

3. **Social Media Share**
   - **Scenario:** User shares homepage on Twitter/Facebook
   - **Steps:**
     1. Fetch homepage Open Graph metadata
     2. Verify og:image URL is absolute and accessible
     3. Check image dimensions (1200x630)
     4. Verify og:title, og:description present
   - **Expected Results:**
     - OG image returns 200 status
     - Image file size < 100KB
     - Metadata matches expected values
     - No CORS issues for image loading
   - **Tools:** Playwright + Open Graph validator API

4. **Content Hub Navigation**
   - **Scenario:** User browses glossary, clicks related term, reads comparison article
   - **Steps:**
     1. Navigate to `/glossar`
     2. Click glossary term (e.g., "React")
     3. Read term definition
     4. Click related term link
     5. Navigate to comparison article
     6. Click CTA to service page
   - **Expected Results:**
     - All pages load quickly (< 2s LCP)
     - Internal links work correctly
     - No broken links or 404 errors
     - Breadcrumb navigation reflects current location
   - **Tools:** Playwright with link crawler

5. **Mobile SEO Experience**
   - **Scenario:** Mobile user searches Google, visits site
   - **Steps:**
     1. Navigate to homepage on mobile viewport (375x667)
     2. Check mobile-specific metadata (viewport tag)
     3. Verify tap targets are 48x48px minimum
     4. Test FAQ accordion on touch device
     5. Check Core Web Vitals
   - **Expected Results:**
     - Mobile-friendly meta tags present
     - All interactive elements tappable
     - No horizontal scrolling
     - FID < 100ms, CLS < 0.1, LCP < 2.5s
   - **Tools:** Playwright with mobile emulation + Lighthouse

**Test Framework:** Playwright with custom helpers
**Coverage Goal:** 5 critical user journeys tested
**Run Command:** `pnpm test:e2e`
**CI/CD Integration:** Run E2E tests on PR to main branch

### Validation Strategy

**Development Validation:**

- **Pre-commit hook:** Run TypeScript type check on SEO files
- **Build validation:** Ensure all pages build successfully with new schemas
- **Schema validation:** Runtime validation in development (validateSchema in SchemaGenerator)
- **Lighthouse audit:** Run on localhost before committing major changes

**Production Validation:**

- **Google Rich Results Test:** Validate structured data after deployment
- **Schema.org Validator:** Verify JSON-LD syntax is correct
- **Google Search Console:** Monitor coverage errors and rich snippets
- **Meta Tags Preview:** Use metatags.io to verify Open Graph rendering

**Monitoring & Alerts:**

- **Weekly:** Check Google Search Console for schema errors
- **Bi-weekly:** Run Lighthouse audits on production URLs
- **Monthly:** Review keyword rankings, organic traffic trends
- **Alerts:** Set up notifications for sudden ranking drops or schema errors
