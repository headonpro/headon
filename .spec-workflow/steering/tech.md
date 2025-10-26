# Technology Stack

## Project Type

**Modern Web Application** - Server-side rendered (SSR) marketing website with dynamic client interactions, optimized for performance and SEO. Built as a production-ready template for marketing and creative agencies.

## Core Technologies

### Primary Language(s)

- **Language**: TypeScript 5.9.2
- **Runtime**: Node.js v22.18.0 (managed via NVM)
- **Target**: ES2020
- **Strict Mode**: Enabled with comprehensive type checking
- **Language-specific tools**:
  - **pnpm** v10.15.0 (enforced package manager)
  - **tsx/tsc** for TypeScript compilation
  - **Next.js Compiler** for production builds

### Key Dependencies/Libraries

#### Frontend Framework

- **Next.js** 15.5.2: React framework with App Router, SSR, SSG, and ISR capabilities
- **React** 19.1.1: UI library for component-based architecture
- **React DOM** 19.1.1: React renderer for web

#### Styling & UI Components

- **Tailwind CSS** 4.1.13: Utility-first CSS framework
- **shadcn/ui** 3.2.1: Component library built on Radix UI
- **Radix UI**: Headless, accessible UI primitives
  - Accordion, Dialog, Label, Select, Slot components
- **class-variance-authority** 0.7.1: Type-safe class variants
- **tailwind-merge** 3.3.1: Smart Tailwind class merging
- **tailwindcss-animate** 1.0.7: Animation utilities

#### Animation & Interaction

- **Framer Motion** 12.23.12: Production-ready animation library
- **react-intersection-observer** 9.16.0: Scroll-triggered animations
- **vaul** 1.1.2: Drawer component library

#### Forms & Validation

- **React Hook Form** 7.62.0: Performant form state management
- **Zod** 4.1.5: TypeScript-first schema validation
- **@hookform/resolvers** 5.2.1: Form validation integrations
- **react-dropzone** 14.3.8: File upload handling

#### Backend & Database

- **Supabase JS** 2.57.2: Backend-as-a-Service client
- **@supabase/ssr** 0.7.0: SSR-compatible Supabase client
- **@supabase/auth-helpers-nextjs** 0.10.0: Next.js authentication helpers

#### Icons & Assets

- **Lucide React** 0.542.0: Modern icon library

#### Notifications & Feedback

- **Sonner** 2.0.7: Toast notification system

#### Email Integration

- **Resend** 6.1.1: Transactional email API

#### Performance Monitoring

- **web-vitals** 5.1.0: Core Web Vitals tracking

### Application Architecture

**Hybrid Architecture** combining:

1. **Server-Side Rendering (SSR)**: Dynamic pages with real-time data
2. **Static Site Generation (SSG)**: Pre-rendered marketing pages
3. **API Routes**: Backend endpoints for form processing and data operations
4. **Client Components**: Interactive UI elements with React hooks

**Component Hierarchy**:

```
app/layout.tsx (Root Layout)
├── Server Components (Data Fetching)
├── Client Components ('use client' directive)
│   ├── Interactive Forms
│   ├── Animations
│   └── User Interactions
└── API Routes (/api/*)
```

**Rendering Strategy**:

- **Server Components by default**: Reduced JavaScript bundle
- **Client Components for interactivity**: Forms, animations, state
- **Edge Runtime capable**: Fast global distribution
- **Metadata API**: Type-safe SEO optimization

### Data Storage

#### Primary Storage

- **Supabase PostgreSQL**: Relational database for structured data
- **Row Level Security (RLS)**: Database-level security policies
- **Real-time subscriptions**: Live data updates

#### Caching

- **Next.js Built-in Cache**: Automatic request memoization
- **React Cache**: Server-side data caching
- **Static Generation Cache**: Pre-rendered pages stored on CDN

#### Data Formats

- **JSON**: Primary data interchange format
- **TypeScript Interfaces**: Type-safe data structures
- **Zod Schemas**: Runtime validation and type inference

### External Integrations

#### APIs

- **Supabase REST API**: Database operations
- **Supabase Auth API**: User authentication
- **Resend API**: Transactional email delivery

#### Protocols

- **HTTP/HTTPS**: Primary communication protocol
- **WebSocket**: Real-time Supabase subscriptions (optional)
- **REST**: Supabase API communication

#### Authentication

- **Supabase Auth**: JWT-based authentication
- **Service Role Key**: Server-side admin operations
- **Anonymous Key**: Client-side public operations

### Monitoring & Dashboard Technologies

#### Dashboard Framework

- **Next.js App Router**: File-based routing system
- **React Server Components**: Data fetching layer
- **React Client Components**: Interactive UI

#### Real-time Communication

- **Supabase Realtime**: PostgreSQL changes via WebSocket
- **React State**: Local UI state management
- **Web Vitals API**: Performance metrics collection

#### Visualization Libraries

- **Framer Motion**: Smooth animations and transitions
- **Lucide Icons**: Visual indicators and UI elements
- **Tailwind CSS**: Responsive design utilities

#### State Management

- **React Hooks**: Local component state (useState, useReducer)
- **React Hook Form**: Form state management
- **URL State**: Search params for shareable states
- **Server State**: Supabase as source of truth

## Development Environment

### Build & Development Tools

- **Build System**: Next.js built-in Turbopack/Webpack
- **Package Management**: pnpm with workspaces support
- **Development Workflow**:
  - Hot Module Replacement (HMR)
  - Fast Refresh for React components
  - TypeScript incremental compilation
- **Scripts**:
  - `pnpm dev`: Development server with HMR
  - `pnpm build`: Production build
  - `pnpm start`: Production server
  - `pnpm type-check`: TypeScript validation

### Code Quality Tools

#### Static Analysis

- **TypeScript Compiler**: Strict type checking
- **ESLint** 9.35.0: JavaScript/TypeScript linting
- **eslint-config-next** 15.5.2: Next.js-specific rules
- **eslint-config-prettier** 10.1.8: Prettier integration

#### Formatting

- **Prettier** 3.6.2: Opinionated code formatter
- **prettier-plugin-tailwindcss** 0.6.14: Tailwind class sorting
- Configuration:
  - Single quotes
  - No semicolons
  - 2 space indentation
  - 100 character line width

#### Testing Framework

- **Playwright** 1.55.0: End-to-end testing
- **Manual testing**: Development environment verification
- **Build verification**: Production build as test gate

#### Documentation

- **CLAUDE.md**: Project-specific AI assistant instructions
- **README.md**: User-facing documentation
- **TypeScript JSDoc**: Inline code documentation

### Version Control & Collaboration

#### VCS

- **Git** 2.43.0: Version control system
- **GitHub**: Remote repository hosting
- **Git Config**:
  - Username: headonpro
  - Email: cirakoglu.onur@gmail.com

#### Branching Strategy

- **Main Branch**: Production-ready code
- **Feature Branches**: Development work
- **Conventional Commits**: Standardized commit messages

#### Code Review Process

- **Pull Requests**: Required for main branch
- **CI/CD Checks**: Automated build and lint validation
- **Manual Review**: Code quality assurance

### Dashboard Development

- **Live Reload**: Hot Module Replacement via Next.js
- **Port Management**: Default port 3000, configurable
- **Multi-Instance Support**: Multiple dev servers via port configuration

## Deployment & Distribution

### Target Platform(s)

- **Primary**: Hetzner VPS with Docker containers
- **Alternative**: Selbst-gehostete VPS, Netlify, AWS Amplify
- **Environment**: Linux (Ubuntu 24.04.3 LTS)

### Distribution Method

- **Docker Container**: Standalone output for containerization
- **CI/CD Pipeline**: GitHub Actions automation
- **Deployment Trigger**: Push to main branch

### Installation Requirements

- **Node.js**: v22.x or higher
- **pnpm**: v10.15.0 (enforced)
- **Docker**: v27.5.1+ (production)
- **Environment Variables**:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `NEXT_PUBLIC_SITE_URL`

### Update Mechanism

- **Automatic Deployment**: GitHub Actions CI/CD
- **Health Checks**: `/api/health` endpoint monitoring
- **Zero-Downtime**: Docker container orchestration

## Technical Requirements & Constraints

### Performance Requirements

- **Page Load Time (LCP)**: < 1.5 seconds
- **Time to Interactive (TTI)**: < 3 seconds
- **First Input Delay (FID)**: < 100ms
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Lighthouse Score**: 95+ in all categories
- **Build Time**: < 60 seconds
- **Initial Bundle Size**: < 200KB (gzipped)

### Compatibility Requirements

#### Platform Support

- **Browsers**: Modern browsers (Chrome, Firefox, Safari, Edge)
- **Browser Versions**: Last 2 versions + Safari 12+
- **Operating Systems**: Cross-platform (Windows, macOS, Linux)
- **Mobile**: iOS 12+, Android 8+

#### Dependency Versions

- **Node.js**: ≥22.0.0
- **pnpm**: 10.15.0 (exact)
- **TypeScript**: ≥5.9.0

#### Standards Compliance

- **ECMAScript**: ES2020
- **CSS**: CSS3 + CSS Variables
- **HTML**: HTML5 semantic markup
- **Accessibility**: WCAG 2.1 Level AA
- **SEO**: Open Graph, Twitter Cards, Schema.org

### Security & Compliance

#### Security Requirements

- **Authentication**: Supabase JWT-based auth
- **Authorization**: Row Level Security (RLS) policies
- **Data Protection**: HTTPS enforced, secure headers
- **Input Validation**: Zod schemas on client and server
- **XSS Prevention**: React auto-escaping, CSP headers
- **CSRF Protection**: SameSite cookies

#### Security Headers

- X-DNS-Prefetch-Control
- X-XSS-Protection
- X-Frame-Options: SAMEORIGIN
- X-Content-Type-Options: nosniff
- Referrer-Policy: origin-when-cross-origin

#### Compliance Standards

- **GDPR**: Data privacy considerations
- **Cookie Consent**: Required for analytics
- **Data Retention**: Configurable per business needs

#### Threat Model

- **Client-side attacks**: XSS, CSRF mitigated
- **Server-side attacks**: SQL injection prevented (Supabase RLS)
- **Data leaks**: Environment variables for secrets
- **DDoS**: CDN-level protection via deployment platform

### Scalability & Reliability

#### Expected Load

- **Users**: 10,000+ monthly visitors (initial)
- **Concurrent**: 100+ simultaneous users
- **Data Volume**: < 100MB initial database size

#### Availability Requirements

- **Uptime Target**: 99.9% (8.76 hours downtime/year)
- **Disaster Recovery**: Automated backups via Supabase
- **Failover**: Multi-region CDN distribution

#### Growth Projections

- **Horizontal Scaling**: Multiple container instances
- **Database Scaling**: Supabase managed scaling
- **CDN Scaling**: Automatic edge caching

## Technical Decisions & Rationale

### Decision Log

1. **Next.js 15 App Router over Pages Router**
   - **Why**: Better performance with React Server Components, reduced JavaScript bundle size, improved SEO with streaming SSR
   - **Alternatives**: Pages Router (legacy), pure React SPA, Remix
   - **Trade-offs**: Steeper learning curve, newer API surface

2. **pnpm over npm/yarn**
   - **Why**: Faster installs (up to 2x), efficient disk space usage (shared dependencies), strict dependency resolution
   - **Alternatives**: npm (slower), yarn (legacy)
   - **Trade-offs**: Less widespread adoption, occasional compatibility issues

3. **Tailwind CSS over CSS-in-JS**
   - **Why**: Zero runtime cost, excellent DX with IntelliSense, purged CSS for minimal bundle size, v4 performance improvements
   - **Alternatives**: Styled Components, Emotion, CSS Modules
   - **Trade-offs**: Utility-first learning curve, markup verbosity

4. **Supabase over Custom Backend**
   - **Why**: Rapid development, managed infrastructure, built-in auth, real-time capabilities, PostgreSQL reliability
   - **Alternatives**: Firebase (NoSQL), Custom Node/Express, tRPC
   - **Trade-offs**: Vendor lock-in, less control over infrastructure

5. **TypeScript Strict Mode**
   - **Why**: Catch errors at compile time, better IDE support, self-documenting code, safer refactoring
   - **Alternatives**: JavaScript, TypeScript loose mode
   - **Trade-offs**: Initial setup overhead, learning curve

6. **Zod for Validation**
   - **Why**: TypeScript-first, type inference, composable schemas, excellent DX
   - **Alternatives**: Yup, Joi, class-validator
   - **Trade-offs**: Additional library weight (mitigated by tree-shaking)

7. **Standalone Output for Docker**
   - **Why**: Minimal container size, faster deployments, optimized for production
   - **Alternatives**: Full node_modules copy, custom Dockerfile
   - **Trade-offs**: Initial build time slightly higher

## Known Limitations

### Current Technical Debt

1. **TypeScript/ESLint Build Errors Currently Ignored**
   - **Impact**: Temporary bypass for rapid development
   - **Solution**: Strict mode re-enabled, refactoring plan in progress
   - **Timeline**: To be resolved before v1.0 release

2. **No Test Coverage**
   - **Impact**: Manual testing required, regression risk
   - **Solution**: Playwright E2E tests planned, unit tests for critical paths
   - **Timeline**: Test suite implementation in progress

3. **Basic Error Handling**
   - **Impact**: Generic error messages, limited error tracking
   - **Solution**: Sentry integration planned, custom error boundaries
   - **Timeline**: Next sprint priority

### Platform Limitations

1. **Supabase Free Tier Constraints**
   - **Impact**: Limited database size, API request rate limits
   - **Solution**: Upgrade to paid tier for production
   - **Mitigation**: Request caching, database optimization

2. **Single Region Deployment**
   - **Impact**: Higher latency for distant users
   - **Solution**: Multi-region CDN, edge runtime functions
   - **Mitigation**: Aggressive caching, static generation

### Future Improvements

1. **Incremental Static Regeneration (ISR)** for blog posts
2. **Edge Runtime** for API routes to reduce latency
3. **Image Optimization** with custom Supabase storage integration
4. **Internationalization (i18n)** for multi-language support
5. **Advanced Analytics** integration (Plausible, Umami)
6. **Progressive Web App (PWA)** capabilities
