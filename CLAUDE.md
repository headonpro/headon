# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

HEADON.pro Marketing Agency Template - A modern Next.js 15 application with TypeScript, Tailwind CSS, and Supabase backend integration.

## Development Commands

### Essential Commands
```bash
# Install dependencies (use pnpm - required by package.json)
pnpm install

# Development server (http://localhost:3000)
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Code quality checks
pnpm lint          # Run ESLint
pnpm lint:fix      # Auto-fix linting issues
pnpm format        # Format with Prettier
pnpm format:check  # Check formatting
pnpm type-check    # TypeScript type checking
```

## Architecture & Code Structure

### Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS v4 + shadcn/ui components
- **Backend**: Supabase (Authentication & Database)
- **Forms**: React Hook Form + Zod validation
- **Package Manager**: pnpm (v10.15.0 - enforced)

### Key Directories
- `app/` - Next.js App Router pages (each route is a folder with page.tsx)
- `components/ui/` - shadcn/ui components (reusable UI primitives)
- `components/layout/` - Header, Footer layout components
- `components/sections/` - Page section components (Hero, CTA, etc.)
- `components/showcase/` - Portfolio/showcase components
- `lib/` - Utilities, Supabase client, validations, and types

### Important Patterns

#### Component Development
- Use shadcn/ui CLI for new UI components: `pnpm dlx shadcn-ui@latest add [component]`
- All components use TypeScript with strict typing
- Styling uses Tailwind classes via the `cn()` utility from `lib/utils.ts`

#### Path Aliases
- Use `@/*` imports (maps to project root)
- Example: `import { cn } from '@/lib/utils'`

#### Supabase Integration
- Client initialized in `lib/supabase.ts`
- Environment variables required (see below)
- Service role key for server-side operations

### Environment Setup
Required `.env.local` variables:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Design System
- **Primary Color**: Königsblau (#1034A6)
- **Secondary Color**: Orange (#FF8C00)
- **Accent Color**: Gold (#FFD700)
- **Success Color**: Emerald (#10B981)
- Responsive breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)

## Development Workflow

### Adding New Pages
1. Create folder in `app/` directory
2. Add `page.tsx` file with default export
3. Follow existing page structure patterns

### Component Best Practices
- Mobile-first responsive design
- Use existing UI components from `components/ui/`
- Maintain consistent spacing using Tailwind utilities
- Follow TypeScript strict mode requirements

### Form Handling
- Use React Hook Form with Zod schemas
- Validation schemas in `lib/validations.ts`
- Type definitions in `lib/types.ts`

### Code Quality
- ESLint configured with Next.js rules
- Prettier for consistent formatting
- TypeScript strict mode enforced
- Run `pnpm lint:fix` and `pnpm format` before committing

## Deployment Notes
- Optimized for Vercel deployment
- Ensure all environment variables are set in production
- Run `pnpm build` locally to verify build success before deploying