# HEADON.pro Marketing Website Constitution
<!--
Sync Impact Report:
Version: 0.0.0 → 1.0.0
Reason: Initial constitution creation for HEADON.pro marketing website project

Modified Principles: None (initial creation)
Added Sections: All core principles and governance
Removed Sections: None

Templates Status:
✅ plan-template.md - Constitution Check section placeholder updated
✅ spec-template.md - Validated alignment with requirements structure
✅ tasks-template.md - Task categorization aligns with principles
✅ agent-file-template.md - Technology tracking structure compatible

Follow-up TODOs: None
-->

## Core Principles

### I. Next.js App Router Architecture
All routing MUST use Next.js 15 App Router with file-based routing conventions. Pages MUST be Server Components by default, with Client Components explicitly marked with 'use client' directive only when interactivity is required. Layouts MUST provide consistent structure across related pages. API routes MUST be server-side only with appropriate use of Supabase service role keys.

**Rationale**: App Router provides optimal performance through React Server Components, automatic code splitting, and simplified data fetching patterns. Clear separation between server and client components prevents accidental client-side exposure of secrets and ensures proper hydration.

### II. Component-Driven Development
UI MUST be built using shadcn/ui primitives as the foundation. Custom components MUST compose shadcn/ui components rather than recreating primitives. Component hierarchy MUST follow: Pages → Sections → UI primitives. All components MUST use TypeScript with explicit prop types via interfaces ending in 'Props' suffix.

**Rationale**: shadcn/ui provides accessible, customizable components that reduce development time while maintaining quality. Composition over recreation prevents inconsistency and technical debt. TypeScript interfaces ensure type safety and serve as documentation.

### III. Styling with Tailwind CSS
All styling MUST use Tailwind CSS utility classes. Complex conditional styling MUST use the `cn()` utility from `@/lib/utils` for className composition. No inline styles or CSS-in-JS solutions. Custom design tokens MUST be defined in `tailwind.config.ts` rather than arbitrary values in markup.

**Rationale**: Tailwind provides consistency, prevents CSS bloat, and enables rapid development. The `cn()` utility ensures type-safe className composition with proper precedence. Centralized design tokens maintain visual consistency across the application.

### IV. Form Validation & Data Integrity
All forms MUST use React Hook Form for form state management. Validation schemas MUST be defined using Zod in `lib/validations.ts`. Schema definitions MUST be reused for both client-side validation and server-side API validation. Form submission MUST handle both success and error states with appropriate user feedback.

**Rationale**: React Hook Form provides performant form management with minimal re-renders. Zod ensures type-safe validation with runtime checks. Shared schemas prevent validation drift between client and server, ensuring data integrity.

### V. Backend Integration with Supabase
All backend operations MUST use Supabase. Client-side operations MUST use anon key via `lib/supabase.ts`. Server-side admin operations MUST use service role key. Database queries MUST be performed server-side only. Authentication and authorization MUST leverage Supabase Auth with Row Level Security policies.

**Rationale**: Supabase provides secure, scalable backend infrastructure. Proper key separation prevents privilege escalation. Server-side queries protect sensitive data and prevent unauthorized access. RLS policies enforce data access controls at the database layer.

### VI. Code Quality Standards
TypeScript strict mode MUST be enabled. ESLint MUST be configured and pass without errors before commits. Prettier MUST format all code with project configuration. Type checking with `pnpm type-check` MUST pass before merging. Import organization MUST follow: React/Next → Third-party → Local components → Utilities → Types.

**Rationale**: Strict TypeScript prevents runtime errors through compile-time checks. ESLint catches common mistakes and enforces patterns. Prettier eliminates style debates and ensures consistency. Organized imports improve readability and maintainability.

### VII. Performance & Optimization
Images MUST use Next.js Image component for automatic optimization. Critical CSS MUST be inlined automatically via Next.js. Large dependencies MUST be dynamically imported where appropriate. Server Components MUST be preferred for content that doesn't require interactivity. Build output MUST be analyzed for bundle size issues.

**Rationale**: Next.js Image provides automatic responsive images, lazy loading, and modern format conversion. Server Components reduce JavaScript sent to clients. Dynamic imports prevent bloating initial page loads. Bundle analysis prevents performance regressions.

## Development Workflow

### Package Management
pnpm MUST be used as the package manager (enforced by `packageManager` field in package.json). `pnpm install` MUST be run after pulling changes that modify `package.json`. Lock file (`pnpm-lock.yaml`) MUST be committed. Global installations MUST be avoided in favor of project-local dependencies.

**Rationale**: pnpm provides faster, more efficient dependency management through content-addressable storage. Enforced package manager prevents version conflicts. Committed lock files ensure reproducible builds across environments.

### Development Commands
Development server MUST be started with `pnpm dev` (runs on port 3000). Code quality checks MUST be run with `pnpm lint:fix && pnpm format && pnpm type-check` before committing. Production builds MUST be tested locally with `pnpm build && pnpm start` before deploying.

**Rationale**: Consistent commands prevent mistakes and enable automation. Pre-commit quality checks catch issues early. Local production builds validate deployment readiness.

### Git Workflow
Feature branches MUST follow pattern `feature/descriptive-name`. Commits MUST use conventional commit format. PRs MUST pass all checks (lint, type-check, build) before merging. Main branch MUST remain deployable at all times.

**Rationale**: Consistent branch naming improves clarity. Conventional commits enable automated changelog generation. Pre-merge checks prevent breaking main branch. Deployable main enables continuous delivery.

## Environment & Configuration

### Environment Variables
All sensitive configuration MUST use environment variables via `.env.local`. Required variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `NEXT_PUBLIC_SITE_URL`. Public variables MUST use `NEXT_PUBLIC_` prefix. `.env.local` MUST NEVER be committed to version control.

**Rationale**: Environment variables separate configuration from code. NEXT_PUBLIC_ prefix makes client-side exposure explicit. Excluded .env.local prevents accidental secret commits.

### Build Configuration
Standalone output MUST be enabled for Docker deployments. TypeScript and ESLint build errors are currently ignored (temporary during initial development - MUST be removed before production). Image optimization MUST allow all HTTPS sources currently (MUST be restricted to specific domains before production).

**Rationale**: Standalone output creates self-contained deployments. Temporary error ignoring enables rapid iteration while tech debt is known and tracked. Image optimization flexibility supports various content sources during development.

## Security Requirements

### Authentication & Authorization
Authentication MUST use Supabase Auth. Protected routes MUST verify authentication server-side. Authorization checks MUST use Row Level Security policies. Session management MUST follow Supabase SSR patterns.

**Rationale**: Supabase Auth provides secure, production-ready authentication. Server-side verification prevents client-side bypasses. RLS policies enforce authorization at the database layer, preventing data leaks.

### Data Protection
API routes handling sensitive data MUST verify authentication. Service role key MUST only be used server-side. User input MUST be validated with Zod schemas before processing. SQL injection MUST be prevented through Supabase's parameterized queries.

**Rationale**: Server-side verification prevents unauthorized access. Restricted service role key usage prevents privilege escalation. Input validation prevents injection attacks. Parameterized queries eliminate SQL injection risks.

## Deployment Standards

### Docker Deployment
Application MUST be containerized with Docker. docker-compose MUST be used for local testing. Health checks MUST be configured at `/api/health`. Resource limits MUST be set (1 CPU, 1GB memory).

**Rationale**: Docker ensures consistent environments across development and production. Health checks enable automated monitoring. Resource limits prevent resource exhaustion and enable predictable scaling.

### CI/CD Pipeline
GitHub Actions MUST run on every push to main. Pipeline MUST execute: install, lint, type-check, build. Successful builds MUST trigger automatic deployment to VPS. Failed builds MUST block deployment.

**Rationale**: Automated CI/CD ensures code quality and prevents manual deployment errors. Quality gates catch issues before production. Automatic deployment enables rapid iteration.

## Governance

### Amendment Process
Constitution amendments MUST be proposed via pull request. Amendments MUST include rationale and impact analysis. Breaking changes require MAJOR version bump. Additions require MINOR version bump. Clarifications require PATCH version bump.

**Rationale**: PR-based amendments enable review and discussion. Required rationale ensures thoughtful changes. Semantic versioning communicates change impact clearly.

### Compliance Review
All feature specifications MUST reference constitution principles. Implementation plans MUST include Constitution Check section. Code reviews MUST verify principle adherence. Deviations MUST be documented with justification in Complexity Tracking section.

**Rationale**: Systematic compliance prevents constitutional drift. Required checks make violations visible. Justified deviations balance pragmatism with principle adherence.

### Living Document
Constitution MUST be updated as project evolves. Outdated principles MUST be amended or removed. New patterns MUST be documented as principles emerge. Template files MUST stay synchronized with constitution changes.

**Rationale**: Living document prevents constitution from becoming obsolete. Regular updates maintain relevance. Synchronized templates ensure consistency across project artifacts.

**Version**: 1.0.0 | **Ratified**: 2025-10-01 | **Last Amended**: 2025-10-01
