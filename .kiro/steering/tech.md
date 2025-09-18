# Technology Stack

## Framework & Runtime
- **Next.js 15** with App Router
- **React 19** with TypeScript
- **Node.js** runtime
- **pnpm** as package manager

## Styling & UI
- **Tailwind CSS 4** with custom design tokens
- **shadcn/ui** component library
- **Radix UI** primitives
- **Framer Motion** for animations
- **Lucide React** for icons

## Backend & Database
- **Supabase** (Backend-as-a-Service)
- Authentication via Supabase Auth
- Real-time database capabilities

## Forms & Validation
- **React Hook Form** for form management
- **Zod** for schema validation
- **React Dropzone** for file uploads

## Development Tools
- **TypeScript** with strict mode
- **ESLint** + **Prettier** for code quality
- **Playwright** for E2E testing

## Fonts
- **Outfit** (headings) - Google Fonts
- **Lato** (body text) - Google Fonts

## Common Commands

### Development
```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
```

### Code Quality
```bash
pnpm lint         # Run ESLint
pnpm lint:fix     # Fix ESLint errors
pnpm format       # Format with Prettier
pnpm format:check # Check formatting
pnpm type-check   # TypeScript type checking
```

### Component Management
```bash
pnpm dlx shadcn-ui@latest add [component]  # Add shadcn/ui component
```

## Environment Variables
Required in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`