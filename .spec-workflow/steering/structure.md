# Project Structure

## Directory Organization

```
headon/
├── app/                        # Next.js 15 App Router (Pages & Routes)
│   ├── (routes)/              # Page directories
│   │   ├── about/            # About page
│   │   ├── blog/             # Blog listing
│   │   ├── contact/          # Contact page with multi-step form
│   │   ├── portfolio/        # Portfolio showcase
│   │   ├── services/         # Services overview
│   │   ├── imprint/          # Legal: Impressum
│   │   └── privacy/          # Legal: Datenschutz
│   ├── api/                  # API Routes (Server-side)
│   │   ├── contact/          # Form submission endpoint
│   │   └── health/           # Health check for deployment
│   ├── layout.tsx            # Root layout with Header/Footer
│   ├── page.tsx              # Homepage
│   ├── not-found.tsx         # 404 error page
│   ├── robots.ts             # robots.txt configuration
│   ├── sitemap.ts            # sitemap.xml generation
│   └── globals.css           # Global styles
│
├── content/                  # MDX Content (6 Content Types)
│   ├── blog/                # Blog posts with frontmatter
│   │   └── *.mdx           # Individual blog articles
│   ├── portfolio/           # Project case studies
│   │   └── *.mdx           # Portfolio project pages
│   ├── services/            # Service descriptions
│   │   └── *.mdx           # Individual service pages
│   ├── cities/              # Regional landing pages
│   │   └── *.mdx           # City-specific pages (Bad Mergentheim, etc.)
│   ├── branchen/            # Industry-specific pages
│   │   └── *.mdx           # Industry landing pages
│   └── technologie/         # Technology pages
│       └── *.mdx           # Technology explanation pages
│
├── components/               # Reusable React Components
│   ├── ui/                  # shadcn/ui Primitives (Radix-based)
│   │   ├── button.tsx       # Button component with variants
│   │   ├── input.tsx        # Form input component
│   │   ├── label.tsx        # Form label component
│   │   ├── select.tsx       # Select dropdown component
│   │   ├── accordion.tsx    # Collapsible content
│   │   ├── dialog.tsx       # Modal dialog
│   │   └── ...              # Other UI primitives
│   ├── content/             # Content-specific Components
│   │   ├── TableOfContents.tsx
│   │   ├── MDXContent.tsx
│   │   └── ReadingTime.tsx
│   ├── layout/              # Layout Components
│   │   ├── Header.tsx       # Global navigation header
│   │   └── Footer.tsx       # Global footer
│   ├── sections/            # Page Section Components
│   │   ├── HeroSection.tsx
│   │   ├── ServicesContent.tsx
│   │   ├── ProcessSection.tsx
│   │   ├── PricingSection.tsx
│   │   ├── SuccessStoriesSection.tsx
│   │   ├── TechnologyTrustSection.tsx
│   │   ├── TrustPersonalitySection.tsx
│   │   ├── ProblemSolutionSection.tsx
│   │   ├── KIAdvantageSection.tsx
│   │   ├── FinalCTASection.tsx
│   │   ├── AboutContent.tsx
│   │   ├── PortfolioContent.tsx
│   │   ├── BlogContent.tsx
│   │   └── IndustryNavigator.tsx
│   ├── contact/             # Contact-specific Components
│   │   ├── CalendlyWidget.tsx
│   │   └── FileUploadZone.tsx
│   ├── seo/                 # SEO Components
│   │   ├── Breadcrumbs.tsx
│   │   ├── PageHeader.tsx
│   │   └── StructuredData.tsx
│   ├── showcase/            # Premium Showcase Components
│   │   ├── PhoneMockup3D.tsx
│   │   ├── PremiumShowcase.tsx
│   │   ├── BeforeAfterSlider.tsx
│   │   └── placeholders.tsx
│   └── icons/               # Custom Icon Components
│       └── AnimatedRobot.tsx
│
├── lib/                      # Utilities & Configuration
│   ├── content/             # Content Processing System
│   │   ├── mdx-loader.ts   # Loads and parses MDX files
│   │   ├── mdx-compiler.ts # Compiles MDX to React components
│   │   ├── content-api.ts  # High-level content API (getBlogPosts, etc.)
│   │   ├── frontmatter.ts  # Zod schemas for frontmatter validation
│   │   ├── glossary.ts     # Technical glossary data (30+ terms)
│   │   ├── faq-data.ts     # FAQ data by category
│   │   └── comparisons/    # Comparison tables as TypeScript data
│   │       ├── index.ts    # Barrel export
│   │       ├── react-vs-vue.ts
│   │       ├── nextjs-vs-spa.ts
│   │       └── ...         # 12+ comparison files
│   ├── seo/                # SEO Utilities
│   │   ├── meta-builder.ts    # Next.js metadata generation
│   │   ├── schema-builder.ts  # JSON-LD structured data
│   │   └── og-image-generator.ts  # Dynamic OG images
│   ├── email-templates.ts  # HTML email templates (lead notifications)
│   ├── supabase.ts         # Supabase client initialization
│   ├── utils.ts            # Utility functions (cn, etc.)
│   └── validations.ts      # Zod validation schemas
│
├── types/                    # TypeScript Type Definitions
│   └── supabase.ts          # Database type definitions
│
├── public/                   # Static Assets (Served as-is)
│   ├── icons/               # Favicons and app icons
│   ├── images/              # Images and graphics
│   └── headon-logo.svg      # Brand logo
│
├── deploy/                   # Deployment Configuration
│   └── nginx/               # Nginx reverse proxy config
│
├── scripts/                  # Build & Automation Scripts
│
├── docs/                     # Documentation
│
├── .spec-workflow/          # Spec Workflow System
│   ├── steering/            # Project steering documents
│   ├── specs/               # Feature specifications
│   ├── templates/           # Document templates
│   └── approvals/           # Approval tracking
│
├── .github/                  # GitHub Configuration
│   └── workflows/           # CI/CD GitHub Actions
│
├── package.json             # Dependencies & Scripts
├── pnpm-lock.yaml           # pnpm lockfile
├── tsconfig.json            # TypeScript configuration
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── postcss.config.mjs       # PostCSS configuration
├── components.json          # shadcn/ui configuration
├── .eslintrc.json           # ESLint configuration
├── .prettierrc              # Prettier configuration
├── CLAUDE.md                # Claude Code instructions
└── README.md                # Project documentation
```

## Naming Conventions

### Files

#### Pages & Routes (app/)

- **Route Folders**: `kebab-case` (e.g., `contact/`, `about/`)
- **Page Components**: `page.tsx` (Next.js convention)
- **Layout Components**: `layout.tsx` (Next.js convention)
- **Metadata Files**: `metadata.ts` (separate metadata exports)
- **Route Handlers**: `route.ts` (API route handlers)
- **Special Files**: `not-found.tsx`, `error.tsx`, `loading.tsx`

#### Components (components/)

- **Component Files**: `PascalCase.tsx` (e.g., `HeroSection.tsx`, `Button.tsx`)
- **Multi-word Components**: `PascalCase` with no separators (e.g., `MultiStepForm.tsx`)
- **Client Components**: Explicit `'use client'` directive at top
- **Server Components**: No directive (default in Next.js 15)

#### Utilities & Libraries (lib/)

- **Utility Files**: `camelCase.ts` (e.g., `utils.ts`, `validations.ts`)
- **Client Files**: `camelCase.ts` (e.g., `supabase.ts`)

#### Types (types/)

- **Type Definition Files**: `camelCase.ts` (e.g., `supabase.ts`)

#### Configuration Files

- **Config Files**: `kebab-case.config.ts` (e.g., `next.config.ts`)
- **RC Files**: `.{tool}rc` or `.{tool}rc.json`

### Code

#### TypeScript Types & Interfaces

- **Interfaces**: `PascalCase` (e.g., `ButtonProps`, `FormData`)
- **Types**: `PascalCase` (e.g., `Variant`, `Size`)
- **Type Props Suffix**: Component props end with `Props` (e.g., `HeroSectionProps`)
- **Enums**: `PascalCase` for name, `SCREAMING_SNAKE_CASE` for values

#### Functions & Methods

- **Functions**: `camelCase` (e.g., `getUserData`, `validateForm`)
- **React Components**: `PascalCase` (e.g., `Button`, `HeroSection`)
- **Event Handlers**: `handle{Event}` prefix (e.g., `handleSubmit`, `handleClick`)
- **Boolean Functions**: `is/has/should` prefix (e.g., `isValid`, `hasError`)

#### Constants

- **Global Constants**: `SCREAMING_SNAKE_CASE` (e.g., `MAX_FILE_SIZE`, `API_ENDPOINT`)
- **Component Constants**: `camelCase` for local, `SCREAMING_SNAKE_CASE` for exports
- **Config Objects**: `camelCase` (e.g., `buttonVariants`, `formConfig`)

#### Variables

- **Variables**: `camelCase` (e.g., `userName`, `isLoading`, `formData`)
- **React State**: `camelCase` (e.g., `isOpen`, `selectedOption`)
- **Props Destructuring**: `camelCase` matching interface definition

#### CSS Classes (Tailwind)

- **Class Utilities**: Tailwind utility classes (e.g., `flex`, `justify-center`)
- **Custom Classes**: `kebab-case` in globals.css (e.g., `custom-scrollbar`)
- **CSS Variables**: `--kebab-case` (e.g., `--font-outfit`, `--primary-600`)

## Import Patterns

### Import Order (Enforced by ESLint + Prettier)

1. **React/Next.js Core**

   ```typescript
   import React from 'react'
   import { useState, useEffect } from 'react'
   import type { Metadata } from 'next'
   import Link from 'next/link'
   import Image from 'next/image'
   ```

2. **External Dependencies**

   ```typescript
   import { motion } from 'framer-motion'
   import { useForm } from 'react-hook-form'
   import { zodResolver } from '@hookform/resolvers/zod'
   import { z } from 'zod'
   ```

3. **Internal Components (Absolute Imports via @/)**

   ```typescript
   import { Button } from '@/components/ui/button'
   import Header from '@/components/layout/Header'
   import HeroSection from '@/components/sections/HeroSection'
   ```

4. **Utilities & Libraries**

   ```typescript
   import { cn } from '@/lib/utils'
   import { createClient } from '@/lib/supabase'
   ```

5. **Types**

   ```typescript
   import type { Database } from '@/types/supabase'
   ```

6. **Styles (Last)**
   ```typescript
   import './globals.css'
   import styles from './component.module.css'
   ```

### Module Organization

#### Absolute Imports

- **Path Alias**: `@/` maps to project root
- **Usage**: All internal imports use `@/` prefix
- **Example**: `import { Button } from '@/components/ui/button'`
- **Configuration**: Defined in `tsconfig.json` paths

#### Relative Imports

- **Avoided**: Minimize relative imports except for co-located files
- **Exception**: `./metadata.ts` in same directory as `page.tsx`

#### Barrel Exports

- **Not Used**: Direct imports preferred over index files
- **Rationale**: Better tree-shaking, clearer dependencies
- **Exception**: `@/components/ui` from shadcn (auto-generated)

## Code Structure Patterns

### Component File Organization

```typescript
// 1. Imports
'use client' // If client component
import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// 2. Type Definitions
interface ComponentProps {
  title: string
  variant?: 'default' | 'secondary'
  className?: string
}

// 3. Constants (outside component for stability)
const ANIMATION_VARIANTS = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
}

// 4. Component Implementation
export default function Component({
  title,
  variant = 'default',
  className
}: ComponentProps) {
  // 4a. Hooks (top of component)
  const [isActive, setIsActive] = React.useState(false)

  // 4b. Derived State
  const computedClass = cn('base-class', className)

  // 4c. Event Handlers
  const handleClick = () => {
    setIsActive(true)
  }

  // 4d. Return JSX
  return (
    <motion.div
      variants={ANIMATION_VARIANTS}
      className={computedClass}
      onClick={handleClick}
    >
      <h2>{title}</h2>
      <Button variant={variant}>Click Me</Button>
    </motion.div>
  )
}

// 5. Named Exports (if needed)
export { type ComponentProps }
```

### API Route Organization

```typescript
// app/api/[route]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'
import { z } from 'zod'

// 1. Validation Schema
const requestSchema = z.object({
  email: z.string().email(),
  message: z.string().min(10),
})

// 2. Route Handler
export async function POST(request: NextRequest) {
  try {
    // 2a. Parse and Validate
    const body = await request.json()
    const validated = requestSchema.parse(body)

    // 2b. Business Logic
    const supabase = createClient()
    const { data, error } = await supabase.from('contacts').insert(validated)

    // 2c. Error Handling
    if (error) throw error

    // 2d. Success Response
    return NextResponse.json({ success: true, data })
  } catch (error) {
    // 2e. Error Response
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 })
  }
}
```

### Page Structure

```typescript
// app/[route]/page.tsx
import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import FeatureSection from '@/components/sections/FeatureSection'
import CTASection from '@/components/sections/CTASection'

// 1. Metadata Export (Server-side only)
export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Page description'
}

// 2. Page Component (Server Component by default)
export default function Page() {
  return (
    <>
      <HeroSection />
      <FeatureSection />
      <CTASection />
    </>
  )
}
```

### Utility File Organization

```typescript
// lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// 1. Primary Utility
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 2. Helper Functions
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('de-DE').format(date)
}

// 3. Type Guards
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}
```

### Content Component Pattern

```typescript
// Content page structure (app/blog/[slug]/page.tsx)
import { getBlogPost } from '@/lib/content/content-api'
import { MDXContent } from '@/components/content/MDXContent'
import { TableOfContents } from '@/components/content/TableOfContents'
import { notFound } from 'next/navigation'

// 1. Server Component for data fetching
export default async function BlogPost({
  params
}: {
  params: { slug: string }
}) {
  // 2. Fetch content via Content API
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  // 3. Render with MDX compilation
  return (
    <article>
      <h1>{post.frontmatter.title}</h1>
      <TableOfContents toc={post.toc} />
      <MDXContent content={post.content} />
    </article>
  )
}

// 4. Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description
  }
}

// 5. Static generation for all posts
export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map(post => ({ slug: post.slug }))
}
```

### MDX Frontmatter Pattern

```yaml
---
title: 'Blog Post Title'
description: 'SEO-optimized description (50-200 chars)'
publishedAt: '2025-01-15'
updatedAt: '2025-01-20'
author: 'HEADON Team'
category: 'web-development'
tags: ['nextjs', 'react', 'typescript']
featured: false
image: '/images/blog/post-image.jpg'
excerpt: 'Short excerpt for listings'
---
# Your MDX content starts here
```

**Frontmatter Validation**:

- Zod schema in `lib/content/frontmatter.ts`
- Validates at build time (fails fast)
- Each content type has specific schema
- Type-safe frontmatter access

### Comparison Data Pattern

```typescript
// lib/content/comparisons/react-vs-vue.ts
export const reactVsVueComparison = {
  title: "React vs Vue: Ein umfassender Vergleich",
  description: "Detaillierter Vergleich...",
  criteria: [
    {
      name: "Lernkurve",
      react: "Mittel - JSX und Konzepte",
      vue: "Niedrig - Einfacher Einstieg"
    }
    // ... more criteria
  ],
  options: [
    { name: "React", description: "..." },
    { name: "Vue", description: "..." }
  ]
}

// Usage in dynamic route: app/vergleiche/[slug]/page.tsx
import { comparisons } from '@/lib/content/comparisons'

export default function ComparisonPage({ params }: { params: { slug: string } }) {
  const comparison = comparisons[params.slug]
  return <ComparisonTable data={comparison} />
}
```

## Code Organization Principles

### 1. Component Composition

- **Single Responsibility**: Each component has one clear purpose
- **Composition over Inheritance**: Build complex UIs from simple components
- **Props-based Configuration**: Behavior controlled via props, not internal state
- **Server Components by Default**: Only use `'use client'` when necessary

### 2. Type Safety

- **TypeScript Strict Mode**: All code must pass strict type checking
- **Explicit Return Types**: Functions declare return types
- **Props Interfaces**: All components have typed props
- **Runtime Validation**: Zod schemas for external data

### 3. Performance Optimization

- **Code Splitting**: Lazy load non-critical components
- **Server Components**: Reduce JavaScript bundle size
- **Static Generation**: Pre-render pages at build time when possible
- **Image Optimization**: Use Next.js Image component

### 4. Maintainability

- **Consistent Patterns**: Follow established conventions
- **Self-Documenting Code**: Clear names over comments
- **Minimal Complexity**: Avoid clever code, prefer explicit
- **Testable Structure**: Components designed for testing

### 5. Content-First Architecture

- **Build-Time Validation**: MDX frontmatter validated with Zod at build time
- **Type-Safe Content**: TypeScript types derived from Zod schemas
- **SEO-Optimized**: Every content page has metadata generation
- **Git-Based Workflow**: Content versioned alongside code
- **Static Generation**: All content pre-rendered for performance

## Module Boundaries

### Core Application vs Features

- **Core** (`app/layout.tsx`, `components/layout`): Global layout and navigation
- **Features** (`app/[route]`, `components/sections`): Page-specific functionality
- **Shared UI** (`components/ui`): Reusable UI primitives
- **Utilities** (`lib/`): Cross-cutting concerns

### Public API vs Internal

- **Public**: Exported components, types, and utilities
- **Internal**: Helper functions, private components (not exported)
- **Convention**: Only export what's intended for reuse

### Client vs Server

- **Server Components** (default): Data fetching, static rendering
- **Client Components** (`'use client'`): Interactivity, hooks, browser APIs
- **Boundary Rule**: Server components can import client components, not vice versa

### Feature Isolation

- **Route-specific**: Components in `app/[route]` are scoped to that route
- **Shared sections**: `components/sections` for reusable page sections
- **No cross-dependencies**: Routes don't import from other routes

### Content System Boundaries

- **content/**: MDX source files (version controlled, not runtime accessed)
- **lib/content/**: Content processing utilities (mdx-loader, content-api, frontmatter)
- **lib/seo/**: SEO utilities (meta-builder, schema-builder, og-images)
- **components/content/**: Content rendering components (MDXContent, TableOfContents)
- **Separation**: Content API abstracts MDX complexity from components
- **Data Flow**: MDX → Content API → React Components

## Code Size Guidelines

### File Size

- **Component Files**: ≤ 300 lines (ideal: 100-200)
- **Page Files**: ≤ 200 lines (should mostly compose sections)
- **Utility Files**: ≤ 400 lines (consider splitting if larger)
- **Type Definition Files**: No hard limit (generated files exempt)

### Function Size

- **Component Functions**: ≤ 100 lines (ideal: 20-50)
- **Utility Functions**: ≤ 50 lines (ideal: 5-20)
- **Event Handlers**: ≤ 20 lines (extract complex logic)
- **JSX Returns**: ≤ 100 lines (extract to sub-components if larger)

### Complexity Limits

- **Cyclomatic Complexity**: ≤ 10 per function
- **Nesting Depth**: ≤ 4 levels
- **Props Count**: ≤ 8 props per component (use composition or config objects)
- **Conditional Rendering**: ≤ 3 nested ternaries (prefer early returns or variables)

### When to Split

- **Extract Component**: When JSX block is reused or exceeds 50 lines
- **Extract Hook**: When stateful logic is reused across components
- **Extract Utility**: When function is pure and reusable
- **Extract Section**: When page component exceeds 200 lines

## SEO Structure

### Metadata Organization

```typescript
// app/[route]/metadata.ts (separate file)
export const metadata = {
  title: 'Page Title',
  description: 'Description',
  openGraph: { ... }
}

// app/[route]/page.tsx
export { metadata } from './metadata'
```

### SEO Component Pattern

- **Breadcrumbs**: `components/seo/Breadcrumbs.tsx`
- **Structured Data**: `components/seo/StructuredData.tsx`
- **Page Headers**: `components/seo/PageHeader.tsx`
- **Usage**: Imported into page components

## Documentation Standards

### Code Documentation

#### Component Documentation

````typescript
/**
 * Primary button component with multiple variants
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="lg">Click Me</Button>
 * ```
 */
export function Button({ ... }) { ... }
````

#### Function Documentation

```typescript
/**
 * Merges Tailwind CSS classes intelligently
 *
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]): string { ... }
```

### README Standards

- **Project Root**: `README.md` with setup instructions
- **Major Modules**: No module-level READMEs (use CLAUDE.md instead)
- **Documentation**: `docs/` folder for guides and architecture docs

### Inline Comments

- **Avoid Obvious Comments**: Code should be self-explanatory
- **Explain Why, Not What**: Comments explain reasoning, not mechanics
- **Complex Logic**: Add comments for non-trivial algorithms
- **TODOs**: Format as `// TODO: description` with GitHub issue reference

### TypeScript as Documentation

- **Types First**: Types serve as primary documentation
- **JSDoc for Public APIs**: Add JSDoc to exported functions/components
- **No Redundant Comments**: If types are clear, comments are optional

## Build Output Structure

```
.next/                          # Next.js Build Output
├── cache/                     # Build cache
├── server/                    # Server-side code
│   ├── app/                  # Compiled pages
│   └── chunks/               # Code chunks
├── static/                    # Static assets
│   ├── chunks/               # JavaScript chunks
│   ├── css/                  # Compiled CSS
│   └── media/                # Optimized images
└── standalone/                # Standalone deployment bundle
    ├── node_modules/         # Production dependencies only
    ├── .next/                # Optimized build
    └── server.js             # Production server
```

### Standalone Output

- **Purpose**: Optimized for Docker containers
- **Size**: Minimal (~50-100MB vs 500MB+ with full node_modules)
- **Usage**: Production deployment only
- **Configuration**: `next.config.ts` with `output: 'standalone'`
