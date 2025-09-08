# HEADON.pro Marketing Agency Project Overview

## Project Purpose
HEADON.pro is a modern, high-performance marketing and creative agency website template built with enterprise-grade technologies. It serves as a comprehensive digital presence for a progressive marketing agency.

## Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS v4 + shadcn/ui components
- **Backend**: Supabase (Authentication & Database)
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Package Manager**: pnpm (v10.15.0 - enforced)

## Project Structure
```
/app/              - Next.js App Router pages
  /services/       - Services showcase
  /portfolio/      - Portfolio/case studies
  /about/          - About page
  /team/           - Team members
  /blog/           - Blog posts
  /contact/        - Contact forms
/components/       - React components
  /ui/            - shadcn/ui primitives
  /layout/        - Header, Footer
  /sections/      - Page sections (Hero, CTA, etc.)
  /showcase/      - Portfolio components
  /forms/         - Form components
  /animations/    - Animation components
/lib/             - Utilities and configuration
  utils.ts        - cn() utility for classnames
  supabase.ts     - Supabase client
  types.ts        - TypeScript type definitions
  validations.ts  - Zod validation schemas
/public/          - Static assets
```

## Key Features
- Mobile-first responsive design
- SEO optimized with Next.js metadata API
- Server-side rendering (SSR) and static site generation (SSG)
- Supabase integration for backend services
- Form validation with React Hook Form and Zod
- Smooth animations with Framer Motion
- Component-based architecture with shadcn/ui
- TypeScript for type safety

## Design System
- **Primary Color**: Königsblau (#1034A6)
- **Secondary Color**: Orange (#FF8C00)
- **Accent Color**: Gold (#FFD700)
- **Success Color**: Emerald (#10B981)
- Responsive breakpoints: sm(640px), md(768px), lg(1024px), xl(1280px), 2xl(1536px)

## Environment Variables Required
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- NEXT_PUBLIC_SITE_URL