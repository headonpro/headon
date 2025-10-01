# Design Document

## Overview

Die Enterprise-SEO-Optimierung erweitert HEADON.pro um ein vollständiges Content-Management-System (MDX-based), dynamische Schema-Generierung, erweiterte Sitemap-Funktionalität und lokale SEO-Pages. Das Design folgt der bestehenden Next.js 15 App Router Architektur und integriert sich nahtlos in die vorhandene Component-Struktur.

**Kern-Module:**
1. **Content-System** (`lib/content/`) - MDX-Loading, Parsing, Metadata-Extraction
2. **SEO-System** (`lib/seo/`) - Schema-Generierung, Sitemap-Generierung, Meta-Tag-Builder
3. **Dynamic Routes** (`app/blog/[slug]`, `app/portfolio/[slug]`, etc.) - Server Components für Content-Rendering
4. **SEO Components** (`components/seo/`) - Reusable SEO-Components (Breadcrumbs, Schema-Injector, etc.)

## Steering Document Alignment

### Technical Standards (tech.md)

**Next.js 15 App Router (tech.md Zeile 21-23)**
- Design nutzt Server Components als Default für alle Content-Pages
- Client Components nur für interaktive Features (Table of Contents Navigation, Reading Progress Bar)
- Metadata API für type-safe SEO (tech.md Zeile 85)

**TypeScript Strict Mode (tech.md Zeile 8-13)**
- Alle neuen Module haben vollständige Type-Safety
- Zod-Schemas für Content-Frontmatter Validation
- Type-generated Interfaces für Schema.org Markups

**Performance Requirements (tech.md Zeile 240-246)**
- Static Generation für Blog/Portfolio (Pre-rendering at Build Time)
- Incremental Static Regeneration (ISR) für Content-Updates
- Image Optimization mit next/image (WebP/AVIF auto-generation)
- Bundle Size < 200KB durch Code Splitting

**Supabase Integration (tech.md Zeile 46-49, 89-93)**
- Bestehende Supabase-Integration wird NICHT für Content verwendet
- Content bleibt file-based (MDX) für bessere Developer Experience
- Supabase nur für User-Generated Content (Testimonials, optional)

### Project Structure (structure.md)

**Directory Organization (structure.md Zeile 3-108)**
```
app/
├── blog/[slug]/          # Neue dynamische Route
│   ├── page.tsx
│   └── metadata.ts
├── portfolio/[slug]/     # Neue dynamische Route
│   ├── page.tsx
│   └── metadata.ts
├── services/[slug]/      # Neue dynamische Route
│   ├── page.tsx
│   └── metadata.ts
├── standorte/            # Neue Route für Stadt-Pages
│   ├── page.tsx          # Übersicht mit Karte
│   └── [city]/
│       ├── page.tsx
│       └── metadata.ts

components/
├── content/              # NEUE: Content-spezifische Components
│   ├── MDXContent.tsx    # MDX Renderer mit Syntax Highlighting
│   ├── TableOfContents.tsx
│   ├── ReadingProgress.tsx
│   └── RelatedArticles.tsx
├── seo/                  # ERWEITERT
│   ├── SchemaGenerator.tsx  # NEUE Universal Schema Generator
│   ├── FAQSchema.tsx        # NEUE FAQ-spezifisch
│   ├── ArticleSchema.tsx    # NEUE Article-spezifisch
│   └── (bestehend: StructuredData.tsx, Breadcrumbs.tsx)

lib/
├── content/              # NEUE: Content-Management
│   ├── mdx-loader.ts     # MDX-Dateien laden & parsen
│   ├── content-api.ts    # High-level Content API
│   └── frontmatter.ts    # Frontmatter Validation
├── seo/                  # NEUE: SEO-Utilities
│   ├── schema-builder.ts # Schema.org JSON-LD Builder
│   ├── sitemap-generator.ts
│   ├── rss-generator.ts
│   └── meta-builder.ts   # Meta-Tag Helper

content/                  # NEUE: Content-Dateien
├── blog/
│   ├── article-1.mdx
│   ├── article-2.mdx
│   └── ...
├── portfolio/
│   ├── project-1.mdx
│   └── ...
└── cities/
    ├── bad-mergentheim.mdx
    └── ...
```

**Naming Conventions (structure.md Zeile 110-167)**
- Route Folders: `kebab-case` (z.B. `blog/[slug]`)
- Components: `PascalCase.tsx` (z.B. `MDXContent.tsx`)
- Utilities: `camelCase.ts` (z.B. `mdx-loader.ts`)
- Content Files: `kebab-case.mdx` (z.B. `next-js-performance.mdx`)

**Import Patterns (structure.md Zeile 169-229)**
```typescript
// 1. React/Next.js
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

// 2. External Dependencies
import { compileMDX } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'

// 3. Internal Components
import { MDXContent } from '@/components/content/MDXContent'
import { ArticleSchema } from '@/components/seo/ArticleSchema'

// 4. Utilities
import { loadMDX } from '@/lib/content/mdx-loader'
import { generateArticleSchema } from '@/lib/seo/schema-builder'

// 5. Types
import type { BlogPost, Frontmatter } from '@/lib/types'
```

## Code Reuse Analysis

### Existing Components to Leverage

**1. Layout System**
- **Header.tsx** (components/layout/Header.tsx:5-102) - Wiederverwendet für alle neuen Pages
- **Footer.tsx** (components/layout/Footer.tsx:5-78) - Unverändert für alle neuen Pages
- **Integration**: Neue Routes nutzen bestehende Root-Layout (app/layout.tsx:66-103)

**2. UI Components (shadcn/ui)**
- **Button** (components/ui/button.tsx) - CTAs auf Content-Pages
- **Accordion** (components/ui/accordion.tsx) - FAQ-Sections auf Service-Pages
- **Dialog** (components/ui/dialog.tsx) - Lightbox für Portfolio-Bilder
- **Alle Komponenten** bleiben unverändert, werden nur importiert

**3. Styling System**
- **cn() Utility** (lib/utils.ts:4-6) - Für conditional Tailwind classes
- **Tailwind Config** (tailwind.config.ts) - Bestehende Design-Tokens
- **Global CSS** (app/globals.css) - Bestehende CSS-Variablen

**4. SEO Foundation**
- **StructuredData.tsx** (components/seo/StructuredData.tsx:1-258) - ERWEITERN für neue Schema-Typen
  - Aktuell: Organization, LocalBusiness, Service
  - Neu: Article, FAQPage, CreativeWork, Person, Review, Breadcrumb
- **sitemap.ts** (app/sitemap.ts:1-65) - KOMPLETT NEU SCHREIBEN für dynamische Generation
- **robots.ts** (app/robots.ts:1-28) - Unverändert (bereits optimal)

**5. Metadata Pattern**
- **Existing Pattern**: Separate `metadata.ts` Files (z.B. app/services/metadata.ts:1-24)
- **Reuse**: Gleiche Struktur für alle neuen Routes
- **Extend**: Dynamische Metadata-Generierung aus MDX-Frontmatter

### Integration Points

**1. Next.js App Router**
- **generateStaticParams()**: Für alle dynamischen Routes ([slug])
- **Dynamic Metadata**: generateMetadata() aus MDX-Frontmatter
- **Server Components**: Content-Loading direkt in Page-Component

**2. File System (MDX Content)**
- **Content Storage**: `content/` directory als Single Source of Truth
- **Build-Time Processing**: MDX wird zu Build-Zeit kompiliert
- **No Database**: Content ist file-based für bessere Git-Integration

**3. Image Pipeline**
- **next/image** (tech.md Zeile 14): Auto-Optimization für alle Content-Bilder
- **Public Assets**: Content-Bilder in `public/images/blog/`, `public/images/portfolio/`
- **Responsive Images**: Automatisches srcset via next/image

**4. Analytics (Existing)**
- **Plausible Analytics** (app/layout.tsx:81-86) - Bereits vorhanden, trackt automatisch neue Pages
- **Web Vitals** (components/web-vitals-reporter.tsx) - Tracks LCP/CLS für neue Content-Pages

## Architecture

### Modular Design Principles

**Single File Responsibility**
- `mdx-loader.ts`: NUR MDX-Dateien laden
- `schema-builder.ts`: NUR Schema.org JSON-LD generieren
- `sitemap-generator.ts`: NUR Sitemap XML generieren
- `MDXContent.tsx`: NUR MDX rendern (kein Schema, keine Metadata)

**Component Isolation**
- Jede Content-Section ist eigene Component (RelatedArticles, TableOfContents, etc.)
- Schema-Components sind wiederverwendbar und unabhängig vom Content-Typ
- Error Boundaries um kritische Components

**Service Layer Separation**
```
Presentation Layer (components/)
    ↓
Business Logic Layer (lib/content/, lib/seo/)
    ↓
Data Layer (file system MDX, Supabase optional)
```

**Utility Modularity**
- Schema-Builder hat einzelne Functions pro Schema-Typ
- Content-API abstrahiert File-System-Details
- Meta-Builder generiert Meta-Tags unabhängig von Content-Typ

### Architecture Diagram

```mermaid
graph TD
    A[User Request: /blog/article-slug] --> B[Next.js App Router]
    B --> C[app/blog/slug/page.tsx]
    C --> D[loadMDX slug]
    D --> E[content/blog/article-slug.mdx]
    E --> F[Parse Frontmatter + MDX]
    F --> G[Compile MDX to React]
    G --> H[Generate Metadata]
    G --> I[Generate Schema]
    H --> J[Return Page with SEO]
    I --> J
    J --> K[Render to User]

    L[Build Time] --> M[generateStaticParams]
    M --> N[Scan content/ directory]
    N --> O[Generate all /blog/slug routes]
    O --> P[Pre-render Pages]

    Q[/sitemap.xml Request] --> R[Dynamic Route Handler]
    R --> S[Scan all content/]
    S --> T[Generate XML]
    T --> U[Return Sitemap]
```

### Data Flow

**1. Content Authoring Flow**
```
Developer writes article.mdx
    ↓
Commit to Git
    ↓
CI/CD Trigger
    ↓
Next.js Build scans content/
    ↓
generateStaticParams() creates routes
    ↓
Static Pages pre-rendered
    ↓
Deploy to Production
```

**2. Runtime Content Request Flow**
```
User requests /blog/my-article
    ↓
Next.js matches app/blog/[slug]/page.tsx
    ↓
loadMDX('my-article') called
    ↓
Read content/blog/my-article.mdx from filesystem
    ↓
Parse Frontmatter (title, date, tags, etc.)
    ↓
Compile MDX to React Components
    ↓
Generate Metadata + Schema from Frontmatter
    ↓
Render Page with Content + SEO
    ↓
Return to User (Cached via CDN)
```

## Components and Interfaces

### Component 1: MDXContent

- **Purpose:** Renders compiled MDX with syntax highlighting, custom components, and responsive images
- **File:** `components/content/MDXContent.tsx`
- **Interfaces:**
  ```typescript
  interface MDXContentProps {
    source: MDXRemoteSerializeResult
    components?: MDXComponents
  }
  ```
- **Dependencies:** next-mdx-remote, rehype-pretty-code, next/image
- **Reuses:** Existing Tailwind styles, Typography scale from globals.css

### Component 2: SchemaGenerator

- **Purpose:** Universal Schema.org JSON-LD generator for all schema types
- **File:** `components/seo/SchemaGenerator.tsx`
- **Interfaces:**
  ```typescript
  interface SchemaGeneratorProps {
    type: 'Article' | 'FAQPage' | 'CreativeWork' | 'Person' | 'Review' | 'BreadcrumbList'
    data: Record<string, any>
    context?: string // Custom @context if needed
  }
  ```
- **Dependencies:** Next.js Script component
- **Reuses:** Pattern from existing StructuredData.tsx (components/seo/StructuredData.tsx:250-257)

### Component 3: TableOfContents

- **Purpose:** Client component for sticky ToC with scroll-spy highlighting
- **File:** `components/content/TableOfContents.tsx`
- **Interfaces:**
  ```typescript
  interface TOCItem {
    id: string
    title: string
    level: 2 | 3 // H2 or H3
  }

  interface TableOfContentsProps {
    items: TOCItem[]
  }
  ```
- **Dependencies:** React hooks (useState, useEffect), Framer Motion
- **Reuses:** Existing scroll-spy pattern, Framer Motion animations

### Component 4: ReadingProgress

- **Purpose:** Client component for reading progress bar in header
- **File:** `components/content/ReadingProgress.tsx`
- **Interfaces:**
  ```typescript
  interface ReadingProgressProps {
    contentRef: React.RefObject<HTMLElement>
  }
  ```
- **Dependencies:** React hooks, Framer Motion
- **Reuses:** Existing motion patterns from HeroSection.tsx

### Component 5: RelatedArticles

- **Purpose:** Server component displaying related articles based on tags
- **File:** `components/content/RelatedArticles.tsx`
- **Interfaces:**
  ```typescript
  interface RelatedArticlesProps {
    currentSlug: string
    tags: string[]
    maxResults?: number
  }
  ```
- **Dependencies:** Content API (lib/content/content-api.ts)
- **Reuses:** Existing card patterns from BlogContent.tsx

### Component 6: CityMap

- **Purpose:** Interactive map showing all 6 cities (Bad Mergentheim, Lauda, etc.)
- **File:** `components/sections/CityMap.tsx`
- **Interfaces:**
  ```typescript
  interface City {
    slug: string
    name: string
    lat: number
    lng: number
  }

  interface CityMapProps {
    cities: City[]
    highlightedCity?: string
  }
  ```
- **Dependencies:** Leaflet or Mapbox (lightweight map library)
- **Reuses:** Existing card styling, Framer Motion for hover effects

## Data Models

### BlogPost Model

```typescript
// lib/types.ts
interface BlogPost {
  slug: string
  frontmatter: {
    title: string
    description: string
    publishedAt: string // ISO 8601
    updatedAt?: string // ISO 8601
    author: {
      name: string
      avatar?: string
      bio?: string
    }
    tags: string[]
    category: 'development' | 'design' | 'performance' | 'mobile'
    image: {
      url: string
      alt: string
      width: number
      height: number
    }
    readingTime: number // minutes
    featured?: boolean
  }
  content: string // Compiled MDX
  toc: TOCItem[] // Table of Contents
}
```

### PortfolioProject Model

```typescript
interface PortfolioProject {
  slug: string
  frontmatter: {
    title: string
    description: string
    client: {
      name: string
      logo?: string
      industry: string
      website?: string
    }
    date: string // ISO 8601 (project completion)
    category: 'web' | 'mobile' | 'ui-ux' | 'full-stack'
    tags: string[] // Technologies used
    image: {
      url: string
      alt: string
    }
    metrics: {
      label: string
      value: string
      improvement?: string // e.g. "+300%"
    }[]
    testimonial?: {
      quote: string
      author: string
      role: string
      rating: number // 1-5
    }
    liveUrl?: string
    githubUrl?: string
  }
  content: string // Case study details (MDX)
}
```

### ServicePage Model

```typescript
interface ServicePage {
  slug: string // 'web-development', 'mobile-development', etc.
  frontmatter: {
    title: string
    description: string
    icon: string // Lucide icon name
    pricing: {
      from: number
      currency: 'EUR'
      unit: 'project' | 'hour' | 'month'
    }
    deliverables: string[]
    processSteps: {
      title: string
      description: string
      duration: string
    }[]
    faqs: {
      question: string
      answer: string
    }[]
    relatedCaseStudies: string[] // Slugs
  }
  content: string // Long-form service description (MDX)
}
```

### CityPage Model

```typescript
interface CityPage {
  slug: string // 'bad-mergentheim', 'lauda-koenigshofen', etc.
  frontmatter: {
    name: string // 'Bad Mergentheim'
    state: string // 'Baden-Württemberg'
    coordinates: {
      lat: number
      lng: number
    }
    population: number
    description: string // Short intro
    services: string[] // Service slugs relevant for this city
    caseStudies: string[] // Project slugs from this region
    localKeywords: string[] // e.g. ['Webentwicklung Bad Mergentheim', ...]
  }
  content: string // Local content (MDX)
}
```

### Schema Models

```typescript
// lib/types/schema.ts
interface ArticleSchema {
  '@context': 'https://schema.org'
  '@type': 'Article'
  headline: string
  description: string
  image: string[]
  datePublished: string
  dateModified?: string
  author: {
    '@type': 'Person'
    name: string
    url?: string
  }
  publisher: {
    '@type': 'Organization'
    name: string
    logo: {
      '@type': 'ImageObject'
      url: string
    }
  }
}

interface FAQSchema {
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

// ... weitere Schema-Types
```

## Error Handling

### Error Scenarios

**1. MDX File Not Found**
- **Handling:** Check if file exists before loading, return 404 via Next.js `notFound()`
- **User Impact:** Custom 404 page with search and navigation
- **Implementation:**
  ```typescript
  // app/blog/[slug]/page.tsx
  const post = await loadMDX(slug)
  if (!post) notFound()
  ```

**2. Invalid MDX Frontmatter**
- **Handling:** Validate with Zod schema, throw error at build time (fail fast)
- **User Impact:** Build fails, developer sees clear validation error
- **Implementation:**
  ```typescript
  // lib/content/frontmatter.ts
  const frontmatterSchema = z.object({ ... })
  const validated = frontmatterSchema.parse(frontmatter) // Throws if invalid
  ```

**3. MDX Compilation Error**
- **Handling:** Catch compilation error, show helpful error message
- **User Impact:** Build fails with line number and error description
- **Implementation:**
  ```typescript
  try {
    const compiled = await compileMDX({ source, options })
  } catch (error) {
    throw new Error(`Failed to compile ${slug}: ${error.message}`)
  }
  ```

**4. Schema Generation Failure**
- **Handling:** Log warning, render page without schema (graceful degradation)
- **User Impact:** Page loads normally, schema just missing (no user-facing error)
- **Implementation:**
  ```typescript
  try {
    const schema = generateArticleSchema(data)
    return <SchemaGenerator data={schema} />
  } catch {
    console.warn('Schema generation failed, continuing without schema')
    return null
  }
  ```

**5. Image Not Found in Content**
- **Handling:** next/image shows placeholder, log warning
- **User Impact:** Placeholder image shown, no broken layout
- **Implementation:** Built-in next/image error handling

**6. Sitemap Generation Timeout**
- **Handling:** Implement pagination for large content sets, cache results
- **User Impact:** Sitemap loads within timeout, possibly paginated
- **Implementation:**
  ```typescript
  // app/sitemap.xml/route.ts
  export const maxDuration = 30 // seconds
  export const revalidate = 3600 // 1 hour cache
  ```

## Testing Strategy

**WICHTIG:** User hat explizit gesagt "Wir brauchen keine Tests". Daher fokussiert sich diese Section auf **manuelle Validierung** statt automatisierte Tests.

### Build-Time Validation

**Frontmatter Schema Validation**
- Alle MDX-Files werden bei Build-Time via Zod validiert
- Build schlägt fehl bei invaliden Frontmatter
- Developer sieht sofort klare Fehlermeldungen

**Schema.org Validation (Manuell)**
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema.org Validator: https://validator.schema.org/
- Manuelle Checks nach jedem neuen Schema-Typ

**Lighthouse Checks (Manuell)**
- `pnpm build && pnpm start` für Production-Build
- Lighthouse Audit für min. 5 repräsentative Pages
- Target: 95+ Score in allen Kategorien

### Development Verification

**Hot Reload Testing**
- MDX-Änderungen müssen sofort in dev server sichtbar sein
- Schema-Änderungen müssen nach reload korrekt sein
- Keine build errors bei Änderungen an Content

**Visual Regression (Manuell)**
- Neue Components in Storybook-ähnlichem Setup testen
- Oder: Manuelle Browser-Tests Chrome/Firefox/Safari
- Mobile-Ansicht via Chrome DevTools testen

### Production Verification

**Post-Deployment Checks (Manuell)**
1. `/sitemap.xml` aufrufen → alle URLs enthalten?
2. `/rss.xml` aufrufen → valides XML?
3. Google Search Console → Coverage Report checken
4. Bing Webmaster Tools → Sitemap submitten
5. Random Blog-Artikel aufrufen → LCP < 1.5s?

**SEO Monitoring (Extern)**
- Google Search Console für Rankings
- Google Analytics/Plausible für Traffic
- Manual Keyword-Checks 1x weekly

### No Automated Tests

**Begründung (von User):**
- Project ist Template/Portfolio, keine Mission-Critical App
- Manuelle Tests sind bei Content-Changes ausreichend
- Build-Time Validation via Zod ist ausreichend für Type-Safety
- Focus auf schnelle Iteration statt Test-Coverage

**Alternativen:**
- TypeScript Strict Mode ersetzt viele Unit Tests
- Zod-Schemas ersetzen Input-Validation-Tests
- Build Success = Integration Test
- Google Tools ersetzen SEO-Tests
