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

# Code quality checks (run before committing)
pnpm lint          # Run ESLint
pnpm lint:fix      # Auto-fix linting issues
pnpm format        # Format with Prettier
pnpm format:check  # Check formatting
pnpm type-check    # TypeScript type checking

# Full pre-commit verification
pnpm lint:fix && pnpm format && pnpm type-check && pnpm build
```

### Component Management
```bash
# Add new shadcn/ui component
pnpm dlx shadcn@latest add [component-name]

# Example: Add button component
pnpm dlx shadcn@latest add button
```

## Architecture & Code Structure

### Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS v4 + shadcn/ui components
- **Backend**: Supabase (Authentication & Database)
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion
- **Package Manager**: pnpm (v10.15.0 - enforced)

### Application Architecture

#### Routing Strategy
- App Router with file-based routing in `app/` directory
- Each route is a folder containing `page.tsx`
- Layout components wrap pages for consistent structure
- Metadata API used for SEO optimization

#### Data Flow
1. **Client Components**: Interactive UI with React Hook Form
2. **Server Components**: Data fetching from Supabase
3. **API Routes**: Server-side operations with service role key
4. **Form Validation**: Zod schemas validate before submission
5. **State Management**: Local state with React hooks

#### Component Hierarchy
```
app/layout.tsx (Root Layout)
  └── components/layout/Header.tsx
  └── app/[route]/page.tsx (Page Component)
      └── components/sections/* (Page Sections)
          └── components/ui/* (Primitive Components)
  └── components/layout/Footer.tsx
```

### Key Patterns

#### Styling Pattern with cn() Utility
```typescript
import { cn } from '@/lib/utils'

// Conditional styling with Tailwind
className={cn(
  'base-classes',
  variant === 'primary' && 'primary-classes',
  disabled && 'disabled-classes'
)}
```

#### Form Pattern with Zod Validation
```typescript
// 1. Define schema in lib/validations.ts
const schema = z.object({
  email: z.string().email(),
  message: z.string().min(10)
})

// 2. Use in component with React Hook Form
const form = useForm<z.infer<typeof schema>>({
  resolver: zodResolver(schema)
})
```

#### Supabase Client Pattern
```typescript
// Client-side: lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

// Server-side: Use service role key for admin operations
const supabase = createClient(url, serviceRoleKey)
```

### Environment Configuration
Required `.env.local` variables:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Build Configuration
- **Standalone Output**: Enabled for Docker deployments
- **React Strict Mode**: Enabled for development
- **TypeScript Build Errors**: Currently ignored (temporary)
- **ESLint Build Errors**: Currently ignored (temporary)
- **Image Optimization**: Configured for all HTTPS sources

## Code Standards

### TypeScript Requirements
- Strict mode enabled in `tsconfig.json`
- No implicit `any` types
- Explicit return types for functions
- Interface naming: `ComponentNameProps`

### Import Organization
1. React/Next.js imports
2. Third-party libraries
3. Local components (`@/components`)
4. Utilities (`@/lib`)
5. Types (`@/lib/types`)

### Prettier Configuration
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

## Docker Deployment

### Local Docker Testing
```bash
# Build and run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

### Production Deployment
- CI/CD pipeline configured with GitHub Actions
- Automatic deployment to VPS on main branch push
- Health checks configured at `/api/health`
- Resource limits: 1 CPU, 1GB memory

## Testing Approach
Currently no test framework configured. For testing:
- Manual testing in development environment
- Build verification with `pnpm build`
- Type checking with `pnpm type-check`
- Linting with `pnpm lint`