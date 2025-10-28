# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

HEADON.pro - Modern Next.js 15 marketing website with content-heavy architecture, SEO optimization, and regional/industry-specific landing pages. Built for a German digital agency serving Bad Mergentheim, Lauda-Königshofen, and surrounding regions.

## Development Commands

### Essential Commands

```bash
# Install dependencies (pnpm required - enforced by package.json)
pnpm install

# Development server (http://localhost:3000)
pnpm dev

# Production build
pnpm build

# Production server
pnpm start

# Code quality (run before commits)
pnpm lint          # ESLint
pnpm lint:fix      # Auto-fix ESLint
pnpm format        # Prettier format
pnpm format:check  # Check formatting
pnpm typecheck     # TypeScript check

# Pre-commit verification
pnpm lint:fix && pnpm format && pnpm typecheck && pnpm build
```

### Component Management

```bash
# Add shadcn/ui components
pnpm dlx shadcn@latest add [component-name]
```

## Architecture Overview

### Tech Stack

- **Framework**: Next.js 15 (App Router, React 19)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Content**: MDX with gray-matter frontmatter
- **Backend**: Supabase (auth, database, storage)
- **Forms**: React Hook Form + Zod validation
- **Package Manager**: pnpm v10.15.0

### Content Architecture

This is a **content-heavy marketing site** with multiple content types:

#### Content Types & Structure

```
content/
├── blog/           # MDX blog posts with frontmatter
├── portfolio/      # Project case studies (MDX)
├── services/       # Service pages (MDX)
├── cities/         # Regional landing pages (MDX)
├── branchen/       # Industry-specific pages (MDX)
└── technologie/    # Technology pages (MDX)
```

#### Content Processing Pipeline

1. **MDX Files** (`content/**/*.mdx`) - Source content with frontmatter
2. **MDX Loader** (`lib/content/mdx-loader.ts`) - Loads and parses MDX
3. **Content API** (`lib/content/content-api.ts`) - High-level API with filtering, sorting, pagination
4. **Frontmatter** (`lib/content/frontmatter.ts`) - Schema validation for frontmatter metadata
5. **MDX Compiler** (`lib/content/mdx-compiler.ts`) - Compiles MDX to React with syntax highlighting

#### Content API Pattern

```typescript
// Get all blog posts with filtering
import { getBlogPosts } from '@/lib/content/content-api'

const posts = await getBlogPosts({
  category: 'web-development',
  featured: true,
  page: 1,
  perPage: 10
})

// Get single post with TOC
import { getBlogPost } from '@/lib/content/content-api'
const post = await getBlogPost('slug')
// Returns: { frontmatter, content (compiled MDX), toc, readingTime }
```

### SEO Architecture

SEO is a **critical requirement** for this project. Multiple SEO utilities are centralized:

- **Meta Builder** (`lib/seo/meta-builder.ts`) - Generates Next.js metadata objects
- **Schema Builder** (`lib/seo/schema-builder.ts`) - Creates JSON-LD structured data
- **OG Image Generator** (`lib/seo/og-image-generator.ts`) - Dynamic OG images

#### Metadata Pattern

Each route has a separate `metadata.ts` file:

```typescript
// app/services/metadata.ts
export const metadata: Metadata = {
  title: 'Services | HEADON.pro',
  description: '...',
  keywords: '...',
  openGraph: { /* */ },
  alternates: { canonical: '...' }
}
```

Import in page:
```typescript
// app/services/page.tsx
export { metadata } from './metadata'
```

### Routing Structure

```
app/
├── layout.tsx           # Root layout (Header/Footer)
├── page.tsx            # Homepage
├── about/              # Company info
├── blog/               # Blog listing + [slug] for posts
├── portfolio/          # Portfolio listing + [slug]
├── services/           # Services listing + [slug]
├── contact/            # Multi-step contact form
├── branchen/           # Industry landing pages
├── regionen/           # Regional landing pages
├── technologie/        # Technology pages
├── glossar/            # Glossary
├── faq/                # FAQ
├── vergleiche/         # Comparison pages
├── api/                # API routes
├── sitemap.ts          # Dynamic sitemap generator
├── robots.ts           # robots.txt
└── manifest.ts         # PWA manifest
```

### Component Organization

```
components/
├── ui/              # shadcn/ui primitives (Button, Input, etc.)
├── layout/          # Header, Footer, Navigation
├── sections/        # Reusable page sections (Hero, CTA, etc.)
├── content/         # Content-specific (TableOfContents, MDXContent)
├── contact/         # Contact form components
├── portfolio/       # Portfolio-specific components
├── showcase/        # Project showcases
├── seo/             # SEO components (Schema, Breadcrumbs)
└── icons/           # Custom icon components
```

### Key Patterns

#### Content Component Pattern

```typescript
// Server component for content pages
import { getBlogPost } from '@/lib/content/content-api'
import { MDXContent } from '@/components/content/MDXContent'

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)
  return <MDXContent content={post.content} frontmatter={post.frontmatter} />
}
```

#### Frontmatter Validation Pattern

All content has strict Zod validation:
```typescript
// lib/content/frontmatter.ts
export const blogPostFrontmatterSchema = z.object({
  title: z.string().min(10).max(100),
  description: z.string().min(50).max(200),
  publishedAt: iso8601DateSchema,
  author: authorSchema,
  // ... comprehensive validation
})
```

Fails at build time if frontmatter is invalid. Each content type has its own schema.

#### Comparison Data Pattern

Large comparison tables live in `lib/content/comparisons/`:
```typescript
// lib/content/comparisons/react-vs-vue.ts
export const reactVsVueComparison = {
  title: "React vs Vue",
  criteria: [...],
  options: [...]
}
```

Used in dynamic routes like `app/vergleiche/[slug]/page.tsx`

#### Multi-Step Form Pattern

Contact form uses state-based multi-step pattern with file uploads:
```typescript
// app/contact/MultiStepForm.tsx
const [step, setStep] = useState(1)
// Step 1: Contact info (name, email, company, phone)
// Step 2: Project type selection
// Step 3: Budget & timeline
// Step 4: Message & file uploads
```

### Environment Variables

Required `.env.local`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Email (Resend)
RESEND_API_KEY=
NOTIFICATION_EMAIL=

# Analytics (Umami - optional)
NEXT_PUBLIC_UMAMI_URL=
NEXT_PUBLIC_UMAMI_WEBSITE_ID=
```

### Build Configuration

- **Standalone Output**: Enabled for Docker
- **TypeScript/ESLint Errors**: Not ignored (must pass in CI)
- **Build Timeout**: 120s for content-heavy pages
- **CPU Limit**: 4 cores for parallel generation
- **Optimized Imports**: `@/components`, `@/lib`
- **Security Headers**: X-Frame-Options, CSP, etc. in next.config.ts

## Lead Management & CRM

### Contact Form Flow

1. **Multi-step Form** (`app/contact/MultiStepForm.tsx`) - 4-step client component
2. **API Route** (`app/api/contact/route.ts`) - Validates and processes submission
3. **Lead Scoring** - Automatically scores leads based on:
   - Budget selection (higher budget = more points)
   - Timeline urgency (faster timeline = more points)
   - Project type complexity
4. **Supabase Storage** - Leads saved to `leads` table with metadata
5. **Email Notification** - Resend API sends formatted email to team

### Lead Scoring System

```typescript
// Priority levels in email notifications:
// Score > 30: 🔥 HIGH PRIORITY
// Score > 15: ⚡ MEDIUM
// Score ≤ 15: 📝 STANDARD

// Factors:
- Budget range (< 10k to > 100k)
- Timeline (urgent vs. flexible)
- Project type (custom/complex vs. simple)
- File attachments (shows preparation)
```

### Email Template System

Rich HTML email templates in `lib/email-templates.ts`:
- Responsive design with inline CSS
- Lead score badge
- Grid layout for lead information
- Direct reply button
- Priority-based color coding

## API Routes

### `/api/contact` (POST)

Handles contact form submissions:
- Validates required fields (name, email, message)
- Calculates lead score
- Saves to Supabase `leads` table
- Sends email notification via Resend
- Returns success/error response

**Important**: Uses Supabase service role key for server-side operations.

### `/api/health` (GET)

Health check endpoint for Docker/monitoring:
- Returns 200 OK if app is running
- Used by docker-compose healthcheck
- Used by CI/CD pipeline post-deployment

## Analytics & Monitoring

### Umami Analytics (Self-Hosted)

Complete analytics stack in docker-compose:
- **Umami Service**: Port 3002, analytics dashboard
- **PostgreSQL Database**: Dedicated database for analytics
- **Script Integration**: `components/UmamiScript.tsx` loads tracking
- **Privacy-Focused**: No cookies, GDPR compliant
- **Dashboard**: analytics.headon.pro

### Web Vitals Monitoring

Optional performance monitoring:
```typescript
// components/web-vitals-reporter.tsx
// Tracks: CLS, FCP, INP, LCP, TTFB
// Sends to: NEXT_PUBLIC_VITALS_URL (if configured)
```

Metrics can be sent to any endpoint for analysis.

## Additional Content Sources

### Glossary System

`lib/content/glossary.ts` contains 30+ technical terms:
- Web development concepts
- Mobile app terminology
- Design & UX terms
- Marketing technology

Each term includes:
- Short definition
- Full explanation (SEO-optimized)
- Benefits list
- Related terms
- Keywords for search

### FAQ Data

`lib/content/faq-data.ts` contains categorized FAQs:
- Grouped by topic
- Pre-written Q&A pairs
- Used in multiple pages
- Centralized for consistency

### Dynamic Sitemap

`app/sitemap.ts` auto-generates sitemap from:
- All blog posts
- Portfolio projects
- Service pages
- City pages (regional)
- Branche pages (industry)
- Technology pages
- Glossary terms
- Comparison articles
- Static pages

**Performance**: Parallel loading, cached for 1 hour (revalidate: 3600)

## Docker Architecture

### Multi-Stage Build

```dockerfile
# Stage 1: deps - Install dependencies only
# Stage 2: builder - Build Next.js application
# Stage 3: runner - Minimal runtime image with node user
```

**Benefits**:
- Smaller final image size
- Cached dependency layer
- Non-root user for security
- Standalone output for optimal performance

### Docker Compose Services

Three services in `docker-compose.yml`:

1. **headon** (Main App)
   - Port 3001:3000
   - Health check at /api/health
   - Volume for Next.js cache
   - Connected to external web-network (for Nginx/Caddy)

2. **umami-db** (PostgreSQL)
   - Port 5432 (internal only)
   - Persistent volume for analytics data
   - Resource limits: 256MB RAM, 0.25 CPU

3. **umami** (Analytics Dashboard)
   - Port 3002:3000
   - Depends on umami-db
   - Health check at /api/heartbeat
   - Resource limits: 256MB RAM, 0.25 CPU

**Network**: Uses external `web-network` for reverse proxy integration (Nginx/Caddy on VPS).

## Development Workflows

### Adding New Content

#### Blog Post

1. Create MDX file: `content/blog/my-post.mdx`
2. Add frontmatter:
```yaml
---
title: "My Post"
date: "2025-01-15"
category: "web-development"
tags: ["nextjs", "react"]
featured: false
author: "HEADON Team"
excerpt: "Short description"
---
```
3. Write content in MDX
4. Post auto-appears in `/blog` via Content API

#### New Page Route

1. Create folder: `app/my-page/`
2. Add `metadata.ts` for SEO
3. Add `page.tsx` for content
4. Follow existing patterns from similar routes

### Adding Comparison Pages

1. Create comparison data: `lib/content/comparisons/my-comparison.ts`
2. Export from `lib/content/comparisons/index.ts`
3. Add route in `app/vergleiche/[slug]/page.tsx` (already dynamic)

### Working with shadcn/ui Components

Configuration in `components.json`:
```bash
# Add individual components
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add input

# Components are added to components/ui/
# Can be customized after installation
```

All UI components use the `cn()` utility from `lib/utils.ts` for conditional styling.

## Third-Party Integrations

### Supabase (Backend as a Service)

- **Authentication**: User auth (if needed)
- **Database**: PostgreSQL database
  - `leads` table for contact form submissions
  - Can add more tables as needed
- **Storage**: File storage capability
- **Client**: `lib/supabase.ts` for client-side operations
- **Service Role**: Used in API routes for admin operations

### Resend (Email Service)

- **Purpose**: Transactional emails for lead notifications
- **Templates**: HTML templates in `lib/email-templates.ts`
- **Configuration**: RESEND_API_KEY required
- **From Address**: hallo@headon.pro
- **Features**: Reply-to support, HTML emails

### Umami (Analytics)

- **Self-Hosted**: Runs in docker-compose
- **Database**: Dedicated PostgreSQL instance
- **Script**: Loaded via Next.js Script component
- **Privacy**: Cookie-free, GDPR compliant
- **Access**: analytics.headon.pro

## Troubleshooting & Common Issues

### Build Failures

1. **Frontmatter Validation Errors**
   - Check MDX frontmatter against schemas in `lib/content/frontmatter.ts`
   - Common issues: Missing required fields, invalid dates, wrong category

2. **TypeScript Errors**
   - Run `pnpm typecheck` to see all errors
   - Check imports use `@/` alias correctly
   - Ensure all props interfaces are defined

3. **Docker Build Issues**
   - Ensure all environment variables are set
   - Check Dockerfile has correct Node version (22-alpine)
   - Verify standalone output is enabled in next.config.ts

### Development Issues

1. **Content Not Appearing**
   - Check MDX file is in correct content/ subdirectory
   - Verify frontmatter is valid
   - Ensure slug matches filename
   - Check Content API is being called correctly

2. **Forms Not Submitting**
   - Verify Supabase credentials in .env.local
   - Check API route logs for errors
   - Ensure Resend API key is set
   - Verify leads table exists in Supabase

3. **Analytics Not Tracking**
   - Check Umami service is running: `docker compose ps`
   - Verify NEXT_PUBLIC_UMAMI_WEBSITE_ID is set
   - Check browser console for script loading errors
   - Ensure UmamiScript component is in root layout

## Deployment

### CI/CD Pipeline

GitHub Actions workflow (`.github/workflows/deploy.yml`):

1. **Build & Test** - Lint, typecheck, build
2. **Docker Build** - Build and push to GHCR
3. **VPS Deploy** - SSH to VPS, pull image, restart
4. **Health Check** - Verify `/api/health` endpoint

### Deployment Target

- **VPS Location**: `/opt/headon` on production server
- **Port**: 3001 (internal), reverse proxied to public
- **Container Registry**: GitHub Container Registry (ghcr.io)
- **Deployment Branch**: `main`

### Docker Commands

```bash
# Local build and test
docker-compose up -d
docker-compose logs -f
docker-compose down

# On VPS (handled by CI/CD)
cd /opt/headon
docker compose pull
docker compose up -d
```

## Performance & Caching

### Next.js Caching Strategy

- **Static Generation**: All content pages pre-rendered at build time
- **Revalidation**: Sitemap cached for 1 hour (3600s)
- **ISR**: Can be added for frequently updated content
- **Docker Volume**: Next.js cache persisted in named volume

### Content Loading Optimization

```typescript
// Parallel loading for better performance
const [posts, projects, services] = await Promise.all([
  getBlogPosts(),
  getPortfolioProjects(),
  getServicePages(),
])
```

All content API functions support parallel execution.

### Image Optimization

- **Next.js Image**: Uses built-in Image component
- **Remote Patterns**: Configured for all HTTPS sources
- **Component**: `components/ui/optimized-image.tsx` wrapper

### Build Optimization

- **Parallel Page Generation**: Limited to 4 CPUs (configurable)
- **Package Import Optimization**: `@/components`, `@/lib` optimized
- **Standalone Output**: Minimal Docker image size
- **Layer Caching**: Multi-stage Docker build with dependency caching

## Regional Context

This site targets German-speaking clients in specific regions:

- **Primary Markets**: Bad Mergentheim, Lauda-Königshofen, Tauberbischofsheim, Wertheim
- **Language**: German (all content)
- **SEO Focus**: Local SEO with city-specific landing pages
- **Industries**: Various (branchen pages cover different sectors)

When creating content, maintain:
- German language throughout
- Regional keyword optimization
- Local business context
