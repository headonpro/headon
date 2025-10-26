# Tasks Document

## Phase 1: Foundation Setup

- [ ] 1. Initialize Astro project with TypeScript and pnpm
  - File: `~/projects/headon-astro/`
  - Create new Astro project using `pnpm create astro@latest`
  - Configure TypeScript strict mode
  - Set up pnpm as package manager
  - Purpose: Establish base Astro project structure
  - _Leverage: pnpm v10.15.0, existing CLAUDE.md workflow knowledge_
  - _Requirements: 1, 10_
  - _Prompt: Implement the task for spec next-to-astro-migration, first run spec-workflow-guide to get the workflow guide then implement the task: Role: DevOps Engineer with expertise in project initialization and package management | Task: Initialize a new Astro 4.15+ project at ~/projects/headon-astro/ using pnpm create astro@latest, select "Empty" template, enable TypeScript Strict mode, use pnpm v10.15.0 as package manager following requirements 1 and 10 | Restrictions: Do not modify the existing ~/projects/headon Next.js project, ensure pnpm version matches exactly (10.15.0), do not initialize git (will use existing repo) | \_Leverage: Use pnpm as specified in tech.md, follow project structure patterns from structure.md | \_Requirements: Requirements 1 (Parallele Migration), 10 (Developer Experience) | Success: Astro project exists at ~/projects/headon-astro/, package.json shows pnpm@10.15.0, TypeScript strict mode enabled in tsconfig.json, dev server starts on port 4321, no errors during initialization | Instructions: First mark this task as in-progress by editing tasks.md and changing [ ] to [-], then execute the task, finally mark as complete [x] when done_

- [ ] 2. Install core Astro integrations and dependencies
  - File: `~/projects/headon-astro/package.json`
  - Install @astrojs/tailwind, @astrojs/react, @astrojs/mdx, @astrojs/sitemap
  - Add Supabase client, Zod, React Hook Form, Lucide icons
  - Configure astro.config.mjs with integrations
  - Purpose: Set up required integrations for feature parity
  - _Leverage: package.json from ~/projects/headon (reference), tech.md dependency list_
  - _Requirements: 2, 5, 6, 7_
  - _Prompt: Implement the task for spec next-to-astro-migration, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Frontend Developer with Astro integration expertise | Task: Install and configure Astro integrations (@astrojs/tailwind, @astrojs/react, @astrojs/mdx, @astrojs/sitemap) plus core dependencies (@supabase/supabase-js, zod, react-hook-form, @hookform/resolvers, lucide-react, clsx, tailwind-merge) following requirements 2, 5, 6, 7 | Restrictions: Use pnpm add for all installations, match React version from Next.js project (19.x), do not install Next.js-specific packages, keep dependencies minimal (target 15-20 total) | \_Leverage: Reference ~/projects/headon/package.json for version compatibility, use tech.md for technology standards | \_Requirements: Requirements 2 (Feature Parity), 5 (Tailwind Design System), 6 (Supabase Integration), 7 (MDX Content) | Success: All integrations installed, astro.config.mjs configured with react(), tailwind(), mdx(), sitemap(), dev server restarts without errors, pnpm install completes successfully | Instructions: Mark task as in-progress [-] in tasks.md, install dependencies, configure astro.config.mjs, verify with pnpm dev, mark complete [x]_

- [ ] 3. Transfer Tailwind v4 configuration and globals.css
  - Files: `src/styles/globals.css`, `postcss.config.mjs`
  - Copy ~/projects/headon/app/globals.css to src/styles/globals.css
  - Copy all @theme CSS variables (colors, fonts)
  - Copy custom animations (@keyframes blob, gradient-shift)
  - Set up PostCSS configuration for Tailwind v4
  - Purpose: Ensure design system parity with Next.js version
  - _Leverage: ~/projects/headon/app/globals.css, ~/projects/headon/postcss.config.mjs_
  - _Requirements: 5_
  - _Prompt: Implement the task for spec next-to-astro-migration, first run spec-workflow-guide to get the workflow guide then implement the task: Role: CSS Developer with Tailwind v4 expertise | Task: Transfer complete Tailwind v4 configuration from Next.js to Astro by copying globals.css (including @theme variables for primary/secondary/accent colors, font definitions, and all custom animations) and configuring PostCSS following requirement 5 | Restrictions: Do not modify CSS variable names or values, maintain exact color hex codes, preserve animation keyframes identically, ensure @import "tailwindcss" is first line | \_Leverage: Copy from ~/projects/headon/app/globals.css (lines 1-200+), reference design.md for CSS structure | \_Requirements: Requirement 5 (Tailwind Design System Transfer) | Success: globals.css contains all @theme variables (primary-50 through primary-900, secondary, accent), all custom animations present, PostCSS configured, Tailwind classes work in .astro files, visual rendering matches Next.js version | Instructions: Mark [-] in tasks.md, copy and verify CSS, test with simple component, mark [x]_

- [ ] 4. Create core utilities (cn function, validations)
  - Files: `src/lib/utils.ts`, `src/lib/validations.ts`
  - Copy cn() utility from Next.js lib/utils.ts (1:1 copy)
  - Copy all Zod validation schemas from Next.js lib/validations.ts
  - Ensure TypeScript types are preserved
  - Purpose: Reuse battle-tested utilities without changes
  - _Leverage: ~/projects/headon/lib/utils.ts, ~/projects/headon/lib/validations.ts_
  - _Requirements: 2, 6_
  - _Prompt: Implement the task for spec next-to-astro-migration, first run spec-workflow-guide to get the workflow guide then implement the task: Role: TypeScript Developer | Task: Copy utility files lib/utils.ts and lib/validations.ts from Next.js project to Astro project (src/lib/) as exact 1:1 copies, maintaining all TypeScript types and Zod schemas following requirements 2 and 6 | Restrictions: Do not modify any code, preserve exact function signatures, maintain import paths (will update in later tasks if needed), ensure clsx and tailwind-merge are installed | \_Leverage: Copy ~/projects/headon/lib/utils.ts and ~/projects/headon/lib/validations.ts verbatim | \_Requirements: Requirements 2 (Feature Parity), 6 (Supabase Integration - validation schemas) | Success: src/lib/utils.ts exports cn() function working correctly, src/lib/validations.ts contains all Zod schemas (contactSchema, etc.), TypeScript compilation succeeds, no import errors | Instructions: Mark [-], copy files, verify TypeScript compiles, test cn() in a component, mark [x]_

- [ ] 5. Create base layout structure (Layout, Header, Footer)
  - Files: `src/layouts/Layout.astro`, `src/components/layout/Header.astro`, `src/components/layout/Footer.astro`
  - Create Layout.astro with HTML boilerplate, meta tags, SEO structure
  - Convert Header.tsx to Header.astro (static version, navigation without JS)
  - Convert Footer.tsx to Footer.astro (fully static)
  - Purpose: Establish page layout foundation
  - _Leverage: ~/projects/headon/app/layout.tsx, ~/projects/headon/components/layout/Header.tsx, ~/projects/headon/components/layout/Footer.tsx, design.md Layout component spec_
  - _Requirements: 2, 4_
  - _Prompt: Implement the task for spec next-to-astro-migration, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Astro Component Developer | Task: Create base layout structure by converting Next.js layout components to Astro components - Layout.astro (root layout with SEO meta tags), Header.astro (navigation without JavaScript initially), Footer.astro (static links and info) following requirements 2 and 4 | Restrictions: Header navigation must be static for now (no mobile menu toggle yet), no client-side JavaScript, preserve exact HTML structure and Tailwind classes from Next.js components, include all SEO meta tags from Next.js layout | \_Leverage: Reference ~/projects/headon/app/layout.tsx for meta tag structure, ~/projects/headon/components/layout/Header.tsx for navigation links, ~/projects/headon/components/layout/Footer.tsx for footer content, use design.md Component 1 specification | \_Requirements: Requirements 2 (Feature Parity), 4 (SEO Optimization) | Success: Layout.astro accepts title/description props and renders complete HTML structure with meta tags, Header.astro displays logo and navigation links styled correctly, Footer.astro shows all footer sections, components use Tailwind classes successfully, test page renders with layout | Instructions: Mark [-], create components following Astro syntax (.astro frontmatter + template), verify rendering, mark [x]_

## Phase 2: Static Pages Migration

- [ ] 6. Create homepage (index.astro) with static Hero section
  - Files: `src/pages/index.astro`, `src/components/sections/HeroSection.astro`
  - Convert app/page.tsx to src/pages/index.astro
  - Convert HeroSection.tsx to HeroSection.astro using CSS animations (no Framer Motion)
  - Implement gradient animations with CSS @keyframes from globals.css
  - Purpose: Homepage as proof-of-concept for performance gains
  - _Leverage: ~/projects/headon/app/page.tsx, ~/projects/headon/components/sections/HeroSection.tsx, src/styles/globals.css (@keyframes), design.md Component 2 (Hero Section)_
  - _Requirements: 2, 3_
  - _Prompt: Implement the task for spec next-to-astro-migration, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Astro Frontend Developer with CSS animation expertise | Task: Create homepage (index.astro) and convert HeroSection from React to native Astro component using CSS @keyframes animations instead of Framer Motion, implementing gradient-shift and blob animations from globals.css following requirements 2 and 3 | Restrictions: Zero JavaScript for Hero section, use only CSS animations, preserve exact visual appearance (colors, gradients, typography), maintain responsive design with Tailwind breakpoints, optimize for LCP < 1.0s | \_Leverage: Use ~/projects/headon/components/sections/HeroSection.tsx as visual reference, implement animations using @keyframes blob and gradient-shift from globals.css, follow design.md Hero Section specification, use Next.js Image optimization pattern with Astro Image | \_Requirements: Requirements 2 (Feature Parity), 3 (Performance Improvement - LCP < 1.0s) | Success: Homepage renders with hero section, gradient animations run smoothly via CSS, typography matches Next.js version, responsive on all breakpoints, Lighthouse LCP < 1.0s, zero JavaScript loaded for hero, prefers-reduced-motion respected | Instructions: Mark [-], create components, test animations, run Lighthouse, mark [x]_

- [ ] 7. Convert static sections (Process, Pricing, Problems, KI-Advantage, Trust)
  - Files: `src/components/sections/ProcessSection.astro`, `PricingSection.astro`, `ProblemSolutionSection.astro`, `KIAdvantageSection.astro`, `TrustPersonalitySection.astro`
  - Convert 5 major sections from React (.tsx) to Astro (.astro)
  - Remove 'use client' directives, convert to static rendering
  - Preserve Tailwind styling and responsive design
  - Purpose: Reduce JavaScript bundle by converting static content
  - _Leverage: ~/projects/headon/components/sections/\*.tsx (ProcessSection, PricingSection, ProblemSolutionSection, KIAdvantageSection, TrustPersonalitySection), design.md modular design principles_
  - _Requirements: 2, 3_
  - _Prompt: Implement the task for spec next-to-astro-migration, first run spec-workflow-guide to get the workflow guide then implement the task: Role: React-to-Astro Migration Specialist | Task: Convert 5 static section components (ProcessSection, PricingSection, ProblemSolutionSection, KIAdvantageSection, TrustPersonalitySection) from Next.js React components to native Astro components, removing all client-side JavaScript while preserving visual design following requirements 2 and 3 | Restrictions: No client-side JavaScript, no state management (useState, useEffect), preserve exact HTML structure, maintain all Tailwind classes, keep responsive breakpoints identical, simple hover effects via CSS only | \_Leverage: Copy structure from ~/projects/headon/components/sections/ (listed files), use Astro component syntax (frontmatter for logic, template for HTML), reference design.md for component conversion strategy | \_Requirements: Requirements 2 (Feature Parity), 3 (Performance - reduce bundle size) | Success: All 5 sections converted to .astro files, components render identically to Next.js versions, Tailwind styling works, responsive design intact, zero JavaScript generated for these sections, visual regression test passes | Instructions: Mark [-], convert components one-by-one, compare visually, mark [x]_

- [ ] 8. Create About page (about.astro)
  - File: `src/pages/about.astro`
  - Convert app/about/page.tsx to Astro page
  - Integrate AboutContent section component
  - Add SEO metadata for About page
  - Purpose: Static about page with team information
  - _Leverage: ~/projects/headon/app/about/page.tsx, design.md SEO patterns_
  - _Requirements: 2, 4_
  - _Prompt: Implement the task for spec next-to-astro-migration, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Astro Page Developer | Task: Create About page by converting app/about/page.tsx to src/pages/about.astro with proper SEO metadata (title, description, og tags, canonical) following requirements 2 and 4 | Restrictions: Must use Layout component, include all meta tags from Next.js version, preserve content structure, ensure canonical URL is correct | \_Leverage: Reference ~/projects/headon/app/about/page.tsx for content and structure, use Layout.astro for consistent structure, follow design.md SEO optimization patterns | \_Requirements: Requirements 2 (Feature Parity), 4 (SEO Optimization) | Success: About page accessible at /about, meta tags complete (title, description, OG tags), canonical tag present, content renders correctly, Lighthouse SEO score 95+, images optimized | Instructions: Mark [-], create page, add metadata, verify SEO, mark [x]_

- [ ] 9. Create legal pages (imprint, privacy, terms)
  - Files: `src/pages/imprint.astro`, `src/pages/privacy.astro`, `src/pages/terms.astro`
  - Convert app/imprint/page.tsx, app/privacy/page.tsx, app/terms/page.tsx
  - Add noindex meta tag for legal pages
  - Ensure proper HTML semantic structure
  - Purpose: Static legal pages with proper SEO handling
  - _Leverage: ~/projects/headon/app/imprint/, ~/projects/headon/app/privacy/, ~/projects/headon/app/terms/_
  - _Requirements: 2, 4_
  - _Prompt: Implement the task for spec next-to-astro-migration, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Content Migration Developer | Task: Convert legal pages (imprint, privacy, terms) from Next.js to Astro with proper meta tags including robots:noindex where appropriate following requirements 2 and 4 | Restrictions: Add robots meta noindex for legal pages, preserve exact legal text content, maintain semantic HTML (headings, lists), use Layout component consistently | \_Leverage: Copy content from ~/projects/headon/app/imprint/page.tsx, ~/projects/headon/app/privacy/page.tsx, ~/projects/headon/app/terms/page.tsx | \_Requirements: Requirements 2 (Feature Parity), 4 (SEO - proper noindex handling) | Success: All 3 legal pages created at /imprint, /privacy, /terms, content identical to Next.js, robots meta tags correct, semantic HTML structure maintained, accessible and readable | Instructions: Mark [-], create pages, verify content, mark [x]_

## Phase 3: Dynamic Content & MDX

- [ ] 10. Set up Content Collections for blog
  - Files: `src/content/config.ts`, `src/content/blog/`
  - Create Content Collections schema with Zod for blog posts
  - Define frontmatter schema (title, description, pubDate, author, image, tags)
  - Configure MDX plugins (syntax highlighting via Shiki, GFM)
  - Purpose: Type-safe MDX content management with Astro's native system
  - _Leverage: design.md Component 4 (Content Collections specification), ~/projects/headon/content/blog/ (reference for frontmatter)_
  - _Requirements: 7_
  - _Prompt: Implement the task for spec next-to-astro-migration, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Astro Content Collections Specialist | Task: Set up Astro Content Collections for blog with Zod schema validation, MDX support, and Shiki syntax highlighting following requirement 7 | Restrictions: Schema must match existing blog frontmatter fields, use Shiki for code highlighting (built-in, not rehype-highlight), enable GFM (GitHub Flavored Markdown), ensure type safety with z.infer | \_Leverage: Follow design.md Content Collections specification exactly, reference existing blog frontmatter from ~/projects/headon/content/blog/\*.mdx for schema design, use Astro's native getCollection API | \_Requirements: Requirement 7 (MDX Content Migration) | Success: src/content/config.ts exports blog collection with complete schema, MDX files are recognized by Astro, TypeScript types generated, getCollection('blog') works, Shiki highlighting configured, GFM enabled | Instructions: Mark [-], create config, define schema, verify with test MDX file, mark [x]_

- [ ] 11. Migrate blog posts and create blog listing/detail pages
  - Files: `src/pages/blog/index.astro`, `src/pages/blog/[slug].astro`, `src/content/blog/*.mdx`
  - Copy all MDX files from ~/projects/headon/content/blog/ to src/content/blog/
  - Create blog listing page (index.astro) with pagination
  - Create dynamic blog detail page ([slug].astro) using getStaticPaths
  - Purpose: Full blog system with Content Collections
  - _Leverage: ~/projects/headon/content/blog/\*.mdx, ~/projects/headon/app/blog/, design.md Content Collections usage pattern_
  - _Requirements: 2, 7_
  - _Prompt: Implement the task for spec next-to-astro-migration, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Astro Dynamic Routing Developer | Task: Migrate all blog MDX files and create blog listing + detail pages using Content Collections and dynamic routing following requirements 2 and 7 | Restrictions: Preserve all frontmatter data, use getCollection() for listing, implement getStaticPaths() for detail pages, maintain blog URL structure (/blog/[slug]), include proper meta tags per post | \_Leverage: Copy MDX files from ~/projects/headon/content/blog/, reference design.md for Content Collections usage, use Astro's getStaticPaths pattern for dynamic routes | \_Requirements: Requirements 2 (Feature Parity), 7 (MDX Content Migration) | Success: All blog posts copied to src/content/blog/, blog listing at /blog shows all posts with metadata, individual posts accessible at /blog/[slug], MDX content renders with proper syntax highlighting, images load correctly, meta tags dynamic per post, TypeScript types correct | Instructions: Mark [-], copy files, create pages, verify rendering, mark [x]_

- [ ] 12. Create Services pages with dynamic routes
  - Files: `src/pages/services/index.astro`, `src/pages/services/[slug].astro`, `src/content/services/`
  - Set up Content Collection for services
  - Create services listing page
  - Create dynamic service detail pages
  - Purpose: Services catalog with type-safe content
  - _Leverage: ~/projects/headon/app/services/, design.md Content Collections pattern_
  - _Requirements: 2, 7_
  - _Prompt: Implement the task for spec next-to-astro-migration, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Content Migration Developer | Task: Create Services content collection and pages (listing + detail) with dynamic routing following requirements 2 and 7 | Restrictions: Define serviceSchema in config.ts with proper types, use Content Collections (not hardcoded data), maintain URL structure /services/[slug], ensure SEO metadata per service | \_Leverage: Reference ~/projects/headon/app/services/ for content structure, use Content Collections pattern from blog implementation (task 10-11), follow design.md for schema design | \_Requirements: Requirements 2 (Feature Parity), 7 (Content Collections) | Success: Services collection defined in config.ts, listing page at /services shows all services, detail pages at /services/[slug] render correctly, proper meta tags per service, TypeScript types working | Instructions: Mark [-], create collection and pages, verify routes, mark [x]_

- [ ] 13. Create Portfolio pages with dynamic routes
  - Files: `src/pages/portfolio/index.astro`, `src/pages/portfolio/[slug].astro`, `src/content/portfolio/`
  - Set up Content Collection for portfolio items
  - Create portfolio showcase page (grid layout)
  - Create dynamic portfolio detail pages
  - Purpose: Portfolio showcase with case studies
  - _Leverage: ~/projects/headon/app/portfolio/, design.md Content Collections_
  - _Requirements: 2, 7_
  - _Prompt: Implement the task for spec next-to-astro-migration, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Portfolio Migration Developer | Task: Create Portfolio content collection and pages (showcase + detail) following requirements 2 and 7 | Restrictions: portfolioSchema must include client, year, technologies, image, url fields, showcase page uses grid layout, preserve visual design from Next.js, optimize images | \_Leverage: Reference ~/projects/headon/app/portfolio/ for structure, use Content Collections pattern established in tasks 10-11, follow design.md portfolio schema | \_Requirements: Requirements 2 (Feature Parity), 7 (Content Collections) | Success: Portfolio collection in config.ts, showcase at /portfolio displays grid of projects, detail pages at /portfolio/[slug] work, images optimized, meta tags complete, matches Next.js visual design | Instructions: Mark [-], create collection and pages, verify images, mark [x]_

## Phase 4: Interactivity & React Islands

- [ ] 14. Set up React integration and create UI primitives
  - Files: `src/components/ui/Button.tsx`, `src/components/ui/Input.tsx`, `src/components/ui/Label.tsx`
  - Configure @astrojs/react for islands
  - Convert key shadcn/ui components to React islands (Button, Input, Label)
  - Test client:load, client:visible directives
  - Purpose: Foundation for interactive components
  - _Leverage: ~/projects/headon/components/ui/\*.tsx, @astrojs/react integration, design.md React Islands strategy_
  - _Requirements: 8_
  - _Prompt: Implement the task for spec next-to-astro-migration, first run spec-workflow-guide to get the workflow guide then implement the task: Role: React Islands Developer | Task: Set up React integration and convert essential UI primitives (Button, Input, Label) as React components for use in islands following requirement 8 | Restrictions: Components must work as React islands, preserve shadcn/ui styling and behavior, test with different hydration strategies (client:load, client:visible), remove 'use client' directive (not needed in Astro) | \_Leverage: Copy from ~/projects/headon/components/ui/button.tsx, input.tsx, label.tsx with minimal changes, follow design.md React Islands specification, use Radix UI primitives if needed | \_Requirements: Requirement 8 (Interactivity via React Islands) | Success: React integration working in Astro, Button/Input/Label components functional as islands, styling preserved, test island hydration with client:load works, TypeScript types correct, components usable in .astro files | Instructions: Mark [-], configure React, convert components, test islands, mark [x]_

- [ ] 15. Create Contact Form as React Island
  - Files: `src/components/islands/ContactForm.tsx`, `src/pages/contact.astro`
  - Convert Next.js ContactForm to React island
  - Integrate React Hook Form + Zod validation (reuse schemas from lib/validations.ts)
  - Create contact page with form island using client:load
  - Purpose: Interactive multi-step contact form
  - _Leverage: ~/projects/headon/app/contact/MultiStepForm.tsx, src/lib/validations.ts, design.md Component 3 (Contact Form)_
  - _Requirements: 2, 6, 8_
  - _Prompt: Implement the task for spec next-to-astro-migration, first run spec-workflow-guide to get the workflow guide then implement the task: Role: React Developer with form handling expertise | Task: Convert Contact Form to React island component with React Hook Form and Zod validation, integrate into contact page following requirements 2, 6, 8 | Restrictions: Use client:load for immediate hydration, reuse contactSchema from src/lib/validations.ts, maintain multi-step form functionality, handle loading/error states, submit to /api/contact endpoint | \_Leverage: Adapt ~/projects/headon/app/contact/MultiStepForm.tsx, use src/lib/validations.ts schemas, follow design.md Contact Form specification, import UI components (Button, Input, Label) | \_Requirements: Requirements 2 (Feature Parity), 6 (Supabase Integration), 8 (React Islands) | Success: ContactForm.tsx exists as React island, form validation works with Zod, multi-step flow functional, submits to API successfully, error handling robust, used in contact.astro with client:load, visually matches Next.js version | Instructions: Mark [-], create component, test form flow, verify submission, mark [x]_

- [ ] 16. Create Mobile Menu as React Island
  - Files: `src/components/islands/MobileMenu.tsx`, update `src/components/layout/Header.astro`
  - Create MobileMenu React component with toggle state
  - Update Header.astro to include MobileMenu island with client:visible
  - Implement responsive menu behavior (hamburger icon, slide-out menu)
  - Purpose: Interactive navigation for mobile devices
  - _Leverage: ~/projects/headon/components/layout/Header.tsx mobile menu logic, design.md React Islands strategy_
  - _Requirements: 8, 2_
  - _Prompt: Implement the task for spec next-to-astro-migration, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Mobile-First React Developer | Task: Create MobileMenu as React island with useState for toggle, integrate into Header.astro using client:visible for performance following requirements 8 and 2 | Restrictions: Use client:visible (not client:load) to defer loading until needed, implement hamburger icon with Lucide React, preserve mobile menu design from Next.js, ensure accessibility (ARIA labels, keyboard navigation) | \_Leverage: Extract mobile menu logic from ~/projects/headon/components/layout/Header.tsx, use design.md Islands Architecture loading strategies, import Lucide icons (Menu, X) | \_Requirements: Requirements 8 (React Islands), 2 (Feature Parity) | Success: MobileMenu.tsx created with toggle state, Header.astro includes island with client:visible, hamburger menu appears on mobile breakpoints, menu opens/closes smoothly, accessible, JavaScript only loads when scrolled into view, matches Next.js mobile behavior | Instructions: Mark [-], create component, test mobile behavior, verify lazy loading, mark [x]_

- [ ] 17. Migrate API endpoints (contact submission to Supabase)
  - Files: `src/pages/api/contact.ts`
  - Convert app/api/contact/route.ts to Astro endpoint
  - Integrate Supabase client with service-role key
  - Validate request with Zod schema
  - Handle errors and return JSON responses
  - Purpose: Server-side contact form processing
  - _Leverage: ~/projects/headon/app/api/contact/route.ts, src/lib/validations.ts, design.md API-Endpoint pattern_
  - _Requirements: 6_
  - _Prompt: Implement the task for spec next-to-astro-migration, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Backend API Developer | Task: Convert Next.js contact API route to Astro endpoint with Supabase integration and Zod validation following requirement 6 | Restrictions: Use Supabase service-role key for server-side operations, validate request body with contactSchema from validations.ts, return proper HTTP status codes (200, 400, 500), implement try-catch error handling | \_Leverage: Adapt ~/projects/headon/app/api/contact/route.ts logic to Astro endpoint syntax ({ request }: APIContext), use src/lib/validations.ts contactSchema, follow design.md API endpoint integration pattern | \_Requirements: Requirement 6 (Supabase Integration) | Success: API endpoint at /api/contact accepts POST requests, validates data with Zod, saves to Supabase successfully, returns proper JSON responses, error handling works, environment variables secure, ContactForm can submit successfully | Instructions: Mark [-], create endpoint, test with curl/Postman, verify Supabase insert, mark [x]_

- [ ] 18. Create health check endpoint and test API integration
  - File: `src/pages/api/health.ts`
  - Create /api/health endpoint for deployment health checks
  - Test all API endpoints work correctly
  - Verify Supabase connection
  - Purpose: Monitoring and integration testing
  - _Leverage: ~/projects/headon/app/api/health/ (if exists), design.md deployment requirements_
  - _Requirements: 9_
  - _Prompt: Implement the task for spec next-to-astro-migration, first run spec-workflow-guide to get the workflow guide then implement the task: Role: DevOps Developer | Task: Create health check API endpoint for deployment monitoring and verify all API integrations following requirement 9 | Restrictions: Health endpoint should return 200 with JSON status, include Supabase connection check, keep response fast (< 100ms), no authentication required for health check | \_Leverage: Reference ~/projects/headon/app/api/health/ if exists, follow design.md deployment requirements for health checks | \_Requirements: Requirement 9 (Docker Deployment Compatibility) | Success: /api/health endpoint returns 200 with { status: 'ok' }, Supabase connectivity verified, response time < 100ms, can be called without auth, used by Docker health checks | Instructions: Mark [-], create endpoint, test response, mark [x]_

## Phase 5: SEO & Performance Optimization

- [ ] 19. Implement sitemap.xml generation
  - File: `astro.config.mjs` (configure @astrojs/sitemap)
  - Configure sitemap integration with site URL
  - Set priorities for different page types
  - Exclude admin or draft pages
  - Purpose: Automated sitemap for SEO
  - _Leverage: @astrojs/sitemap integration, design.md SEO requirements_
  - _Requirements: 4_
  - _Prompt: Implement the task for spec next-to-astro-migration, first run spec-workflow-guide to get the workflow guide then implement the task: Role: SEO Developer | Task: Configure Astro sitemap integration to automatically generate sitemap.xml with proper priorities following requirement 4 | Restrictions: Set site URL from environment variable or config, assign priorities (homepage: 1.0, main pages: 0.8, blog: 0.6), exclude draft content, ensure changefreq values appropriate | \_Leverage: Use @astrojs/sitemap integration (already installed), follow design.md SEO optimization patterns, reference Next.js app/sitemap.ts for URL structure | \_Requirements: Requirement 4 (SEO Optimization) | Success: sitemap.xml generated at build time, all pages included with correct URLs, priorities assigned appropriately, draft pages excluded, validates against sitemap.org schema | Instructions: Mark [-], configure integration, build and verify sitemap, mark [x]_

- [ ] 20. Add robots.txt and meta tags optimization
  - Files: `public/robots.txt`, update all page files with proper meta tags
  - Create robots.txt with proper directives
  - Audit all pages for complete meta tags (title, description, OG, Twitter Cards)
  - Add canonical tags to all pages
  - Purpose: Complete SEO optimization
  - _Leverage: ~/projects/headon/app/robots.ts, design.md SEO requirements_
  - _Requirements: 4_
  - _Prompt: Implement the task for spec next-to-astro-migration, first run spec-workflow-guide to get the workflow guide then implement the task: Role: SEO Audit Specialist | Task: Create robots.txt and audit all pages for complete SEO meta tags (Open Graph, Twitter Cards, canonical) following requirement 4 | Restrictions: Robots.txt must allow all crawlers, disallow /api/ routes, reference sitemap.xml, all pages need title/description/OG tags, canonical URLs must be absolute, no duplicate meta tags | \_Leverage: Reference ~/projects/headon/app/robots.ts for directives, use design.md SEO Component Pattern, ensure Layout.astro supports all meta tag props | \_Requirements: Requirement 4 (SEO Optimization - meta tags, canonical, robots) | Success: robots.txt in public/ with correct directives, all pages have complete meta tags, canonical tags point to correct URLs, OG/Twitter Cards present, SEO audit tools show no errors, Lighthouse SEO 95+ | Instructions: Mark [-], create robots.txt, audit pages, fix missing tags, mark [x]_

- [ ] 21. Optimize images and implement lazy loading
  - Files: Update all .astro components using images
  - Convert all <img> to Astro <Image> component
  - Set proper width/height to prevent CLS
  - Implement lazy loading for below-fold images
  - Optimize image formats (WebP, AVIF)
  - Purpose: Improve LCP and CLS scores
  - _Leverage: Astro Image component, design.md performance requirements_
  - _Requirements: 3_
  - _Prompt: Implement the task for spec next-to-astro-migration, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Performance Optimization Engineer | Task: Replace all images with Astro Image component, optimize formats, and implement lazy loading to achieve CLS < 0.05 and LCP < 1.0s following requirement 3 | Restrictions: Use Astro's built-in Image component, specify width/height for all images, use loading="lazy" for below-fold, enable WebP/AVIF formats, set proper alt text for accessibility | \_Leverage: Astro Image documentation, use images from ~/projects/headon/public/, follow design.md performance targets (CLS < 0.05, LCP < 1.0s) | \_Requirements: Requirement 3 (Performance Improvement - LCP < 1.0s, CLS < 0.05) | Success: All images use Astro Image component, width/height set preventing layout shift, lazy loading on below-fold images, WebP format generated, Lighthouse CLS < 0.05, LCP < 1.0s, no layout shifts on load | Instructions: Mark [-], update components, test with Lighthouse, mark [x]_

- [ ] 22. Run Lighthouse CI and performance benchmarking
  - File: `lighthouserc.json`
  - Set up Lighthouse CI configuration
  - Run performance audits for key pages (homepage, blog, contact)
  - Compare with Next.js baseline
  - Document performance improvements
  - Purpose: Validate performance requirements met
  - _Leverage: @lhci/cli package, design.md performance targets and testing strategy_
  - _Requirements: 3_
  - _Prompt: Implement the task for spec next-to-astro-migration, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Performance Testing Engineer | Task: Set up Lighthouse CI to validate performance targets (98+ score, LCP < 1.0s, TTI < 1.5s) and compare with Next.js baseline following requirement 3 | Restrictions: Test at least homepage, blog listing, contact page, run 3 iterations per page for consistency, assert Performance >= 98, Accessibility >= 95, SEO >= 95, document results in markdown | \_Leverage: Install @lhci/cli, create lighthouserc.json following design.md testing strategy, compare with Next.js baseline (Performance 85-95, LCP ~1.5s) | \_Requirements: Requirement 3 (Performance Improvement - measurable gains) | Success: Lighthouse CI configured and running, performance score >= 98 achieved, LCP < 1.0s confirmed, TTI < 1.5s, bundle size < 50KB, results documented showing improvement over Next.js, CI passes assertions | Instructions: Mark [-], install LHCI, configure, run tests, document results, mark [x]_

- [ ] 23. Accessibility audit and WCAG 2.1 compliance
  - Files: All .astro component files
  - Run accessibility audit with axe-core or similar
  - Fix keyboard navigation issues
  - Ensure proper ARIA labels
  - Test with screen reader
  - Verify color contrast ratios
  - Purpose: WCAG 2.1 Level AA compliance
  - _Leverage: Astro built-in accessibility features, design.md usability requirements_
  - _Requirements: 2 (Feature Parity - accessibility), Usability NFR_
  - _Prompt: Implement the task for spec next-to-astro-migration, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Accessibility Specialist | Task: Perform comprehensive accessibility audit and fix issues to achieve WCAG 2.1 Level AA compliance following usability requirements | Restrictions: All interactive elements must be keyboard accessible, proper ARIA labels required, color contrast >= 4.5:1 for text, form fields properly labeled, focus states visible, test with screen reader (NVDA/VoiceOver) | \_Leverage: Use Lighthouse accessibility audit, axe DevTools, reference design.md usability requirements for WCAG 2.1 Level AA, ensure semantic HTML throughout | \_Requirements: Requirement 2 (Feature Parity including accessibility), Non-Functional Requirement: Usability (WCAG 2.1 Level AA) | Success: Lighthouse accessibility score >= 95, zero critical accessibility issues, keyboard navigation works for all interactive elements, ARIA labels present where needed, color contrast passes, screen reader test successful, focus management proper | Instructions: Mark [-], run accessibility audit, fix issues, retest, mark [x]_

## Phase 6: Deployment & Production

- [ ] 24. Create Dockerfile for Astro application
  - Files: `Dockerfile`, `.dockerignore`
  - Create multi-stage Dockerfile for production build
  - Optimize for minimal image size
  - Configure for static output or Node adapter
  - Purpose: Containerized deployment
  - _Leverage: ~/projects/headon/Dockerfile (Next.js reference), design.md Docker deployment requirements_
  - _Requirements: 9_
  - _Prompt: Implement the task for spec next-to-astro-migration, first run spec-workflow-guide to get the workflow guide then implement the task: Role: DevOps Engineer with Docker expertise | Task: Create optimized Dockerfile for Astro application with multi-stage build following requirement 9 | Restrictions: Use Node 22 Alpine base image, multi-stage build (deps, build, runtime), include only production dependencies, set proper user permissions (non-root), configure for static output served via Nginx OR Node adapter, minimize image size | \_Leverage: Reference ~/projects/headon/Dockerfile for structure, use Astro's build output (dist/ for static or standalone for Node), follow design.md Docker deployment specification | \_Requirements: Requirement 9 (Docker Deployment Compatibility) | Success: Dockerfile builds successfully, image size < 150MB, runs as non-root user, serves application on port 4321 or via Nginx, health check endpoint accessible, follows Docker best practices | Instructions: Mark [-], create Dockerfile, test build, verify runtime, mark [x]_

- [ ] 25. Update CI/CD pipeline (GitHub Actions)
  - Files: `.github/workflows/deploy.yml` (or create new astro-deploy.yml)
  - Adapt GitHub Actions workflow for Astro build
  - Configure deployment to VPS (same as Next.js)
  - Add Lighthouse CI step to pipeline
  - Purpose: Automated testing and deployment
  - _Leverage: ~/projects/headon/.github/workflows/ (existing CI/CD), design.md deployment strategy_
  - _Requirements: 9_
  - _Prompt: Implement the task for spec next-to-astro-migration, first run spec-workflow-guide to get the workflow guide then implement the task: Role: CI/CD Engineer | Task: Create or update GitHub Actions workflow for Astro application with build, test, Lighthouse CI, and deployment steps following requirement 9 | Restrictions: Trigger on push to main branch, install pnpm correctly, run pnpm build, execute Lighthouse CI assertions, deploy Docker container to VPS (same process as Next.js), include environment variable injection, add health check verification | \_Leverage: Adapt from ~/projects/headon/.github/workflows/ existing pipeline, use design.md deployment strategy (Phase 6), configure LHCI from task 22 | \_Requirements: Requirement 9 (Deployment Compatibility - CI/CD) | Success: GitHub Actions workflow runs successfully, build step completes, Lighthouse CI assertions pass (Performance >= 98), Docker image builds and pushes, deployment to VPS succeeds, health check passes post-deployment, zero-downtime deployment | Instructions: Mark [-], create/update workflow, test pipeline, mark [x]_

- [ ] 26. Beta deployment and A/B testing setup
  - Files: VPS configuration, Nginx routing
  - Deploy Astro version to beta subdomain (beta.headon.pro)
  - Configure Nginx to route 10% traffic to beta
  - Set up monitoring and analytics comparison
  - Purpose: Safe production rollout with traffic split
  - _Leverage: VPS access, Nginx configuration, design.md rollout strategy_
  - _Requirements: 1_
  - _Prompt: Implement the task for spec next-to-astro-migration, first run spec-workflow-guide to get the workflow guide then implement the task: Role: DevOps Engineer | Task: Deploy Astro application to beta subdomain and configure Nginx for 10% traffic A/B test following requirement 1 | Restrictions: Beta subdomain must be beta.headon.pro, Nginx config routes 10% of headon.pro traffic to Astro version, 90% remains on Next.js, SSL certificates for both, environment variables properly set, health monitoring enabled | \_Leverage: SSH access to VPS (headon@headon.pro), configure Nginx split, follow design.md rollout strategy (Phase 6 - A/B Test), use existing Nginx config as reference | \_Requirements: Requirement 1 (Parallele Migration - safe production rollout) | Success: Astro version accessible at beta.headon.pro, Nginx routing configured for 10% traffic split, SSL working, both versions monitored, analytics tracking both deployments, able to rollback if issues detected | Instructions: Mark [-], deploy to beta, configure Nginx, verify split, mark [x]_

- [ ] 27. Monitor performance, validate SEO, and full production rollout
  - Files: Production deployment configuration
  - Monitor beta performance for 7 days
  - Validate SEO rankings haven't dropped
  - Compare analytics (bounce rate, session duration, conversions)
  - If successful: switch to 100% Astro traffic
  - Purpose: Final validation and production switchover
  - _Leverage: Analytics tools (Umami/Plausible), Search Console, design.md success metrics_
  - _Requirements: All (final validation)_
  - _Prompt: Implement the task for spec next-to-astro-migration, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Product Manager / Technical Lead | Task: Monitor beta deployment metrics, validate all requirements are met, and execute full production rollout following all requirements | Restrictions: Monitor for minimum 7 days before full rollout, track performance metrics (LCP, TTI, bundle size), verify SEO rankings stable in Search Console, compare user engagement metrics, have rollback plan ready, document final performance gains | \_Leverage: Use Umami/Google Analytics for user metrics, Search Console for SEO, Lighthouse CI for performance, design.md Success Metrics section for acceptance criteria | \_Requirements: All Requirements (1-10) and Success Metrics validation | Success: Beta runs stable for 7+ days, Lighthouse Performance >= 98 maintained, LCP < 1.0s, bundle < 50KB, SEO rankings stable or improved, user engagement equal or better, all features working, zero critical bugs, production switched to 100% Astro, Next.js version kept as rollback, migration complete | Instructions: Mark [-], monitor metrics, validate criteria, execute rollout, mark [x]_

## Post-Migration Tasks

- [ ] 28. Documentation and knowledge transfer
  - Files: `README.md`, `CLAUDE.md`, `docs/MIGRATION.md`
  - Update README with Astro-specific instructions
  - Update CLAUDE.md for Astro development workflow
  - Create MIGRATION.md documenting lessons learned
  - Purpose: Team onboarding and knowledge capture
  - _Leverage: Existing documentation structure_
  - _Requirements: 10 (Developer Experience)_
  - _Prompt: Implement the task for spec next-to-astro-migration, first run spec-workflow-guide to get the workflow guide then implement the task: Role: Technical Writer / Developer Advocate | Task: Update all project documentation to reflect Astro migration, create migration guide documenting process and learnings following requirement 10 | Restrictions: README must have Astro development commands, CLAUDE.md updated with Astro-specific patterns, MIGRATION.md includes before/after metrics, lessons learned, and migration process steps, maintain documentation quality standards | \_Leverage: Use existing ~/projects/headon/README.md and CLAUDE.md as templates, document design.md architecture decisions, include performance comparison data from task 22 | \_Requirements: Requirement 10 (Developer Experience - documentation) | Success: README updated with Astro commands (pnpm dev, pnpm build), CLAUDE.md reflects Astro architecture, MIGRATION.md created with complete migration story, performance metrics documented, new developers can onboard with docs, lessons learned captured | Instructions: Mark [-], update docs, review for completeness, mark [x]_

- [ ] 29. Decommission Next.js version (optional - keep as reference)
  - Files: ~/projects/headon/
  - Archive or remove Next.js project after successful migration
  - Update DNS if needed
  - Clean up old Docker containers
  - Purpose: Final cleanup after migration complete
  - _Leverage: Git for archiving_
  - _Requirements: 1_
  - _Prompt: Implement the task for spec next-to-astro-migration, first run spec-workflow-guide to get the workflow guide then implement the task: Role: DevOps Engineer | Task: Safely archive or decommission Next.js project after successful Astro migration, keeping it available for reference if needed following requirement 1 | Restrictions: Do not delete until 100% confident in Astro version, consider creating archive branch in git, clean up Docker containers and images, update deployment scripts, keep backups | \_Leverage: Use git branch or tag for archive, document which VPS resources to deallocate | \_Requirements: Requirement 1 (Parallel Migration - final cleanup) | Success: Next.js project archived safely (git branch/tag), Docker resources cleaned up, deployment only targets Astro version, DNS fully migrated if needed, backup of Next.js available for emergency rollback | Instructions: Mark [-], create archive, clean resources, verify, mark [x]_
