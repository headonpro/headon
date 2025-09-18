# Project Structure

## Directory Organization

### Core Application (`/app`)
Next.js App Router structure with file-based routing:
- `layout.tsx` - Root layout with Header/Footer
- `page.tsx` - Homepage
- `globals.css` - Global styles and design tokens
- Route folders: `/about`, `/blog`, `/contact`, `/portfolio`, `/services`, `/team`

### Components (`/components`)
Organized by functionality:
- `ui/` - shadcn/ui components (Button, Card, Input, etc.)
- `layout/` - Header, Footer, Navigation components
- `sections/` - Page section components (Hero, CTA, etc.)
- `contact/` - Contact form related components
- `showcase/` - Portfolio and project showcase components
- `seo/` - SEO components (Breadcrumbs, StructuredData)
- `icons/` - Custom icon components

### Library (`/lib`)
Utilities and configurations:
- `utils.ts` - Utility functions (cn helper)
- `supabase.ts` - Supabase client configuration
- `types.ts` - TypeScript type definitions
- `validations.ts` - Zod schemas

### Static Assets (`/public`)
- `images/` - Project images and photos
- `icons/` - Favicon variants
- `logos/` - Brand assets
- Root level: Main logo and assets

## Naming Conventions

### Files & Folders
- **Components**: PascalCase (`HeroSection.tsx`)
- **Pages**: lowercase (`page.tsx`, `layout.tsx`)
- **Utilities**: camelCase (`utils.ts`)
- **Folders**: lowercase with hyphens (`multi-step-form/`)

### Components
- Use descriptive, specific names
- Suffix with component type when needed (`MultiStepForm.tsx`)
- Group related components in folders

### CSS Classes
- Use Tailwind utility classes
- Custom classes in kebab-case
- Design tokens via CSS variables

## Import Patterns
- Use `@/` alias for absolute imports from root
- Group imports: React → Third-party → Internal
- Prefer named exports over default exports for utilities

## File Organization Rules
- One component per file
- Co-locate related files (component + styles + tests)
- Keep components small and focused
- Use barrel exports (`index.ts`) for complex modules

## Architecture Patterns
- **Server Components** by default (Next.js App Router)
- **Client Components** only when needed (`'use client'`)
- **Composition over inheritance** for component design
- **Props drilling avoided** - use context when needed