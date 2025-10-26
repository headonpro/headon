# Code Style and Conventions

## TypeScript Configuration

- **Strict Mode**: Enabled (`"strict": true` in tsconfig.json)
- **Target**: ES2017
- **Module**: ESNext with bundler resolution
- **Path Aliases**: Use `@/*` for imports (maps to project root)
- **JSX**: Preserve mode for Next.js

## Code Formatting (Prettier)

- **Semicolons**: No semicolons (`"semi": false`)
- **Quotes**: Single quotes (`"singleQuote": true`)
- **Tab Width**: 2 spaces
- **Trailing Comma**: ES5 style
- **Print Width**: 100 characters max per line
- **Tailwind CSS**: Auto-sorted classes via prettier-plugin-tailwindcss

## ESLint Configuration

- Extends Next.js core web vitals rules
- Extends Next.js TypeScript rules
- Prettier integration for consistent formatting

## Component Conventions

- **File Naming**: PascalCase for components (e.g., `HeroSection.tsx`)
- **Folder Structure**: Components grouped by type (ui/, layout/, sections/, etc.)
- **Export Style**: Default exports for pages, named exports for components
- **Props**: Define with TypeScript interfaces, suffix with "Props"

```typescript
interface ComponentNameProps {
  title: string
  description?: string
}
```

## Styling Conventions

- **Tailwind CSS**: Primary styling method
- **Class Names**: Use `cn()` utility from `lib/utils.ts` for conditional classes

```typescript
import { cn } from '@/lib/utils'

className={cn(
  'base-classes',
  condition && 'conditional-classes'
)}
```

- **Mobile-First**: Start with mobile styles, add responsive modifiers
- **shadcn/ui**: Use CLI to add components, don't modify core UI components directly

## Import Order

1. React/Next.js imports
2. Third-party libraries
3. Local components
4. Local utilities/lib
5. Types/interfaces
6. Styles

## Form Handling

- **React Hook Form**: For all forms
- **Zod**: For validation schemas
- **Error Handling**: Display validation errors inline
- **Type Safety**: Use inferred types from Zod schemas

## File Organization

- **One component per file**: Each component in its own file
- **Colocation**: Keep related files together (component + styles + types)
- **Index files**: Use for cleaner imports from folders

## Git Commit Conventions

- Use conventional commits format:
  - `feat:` New features
  - `fix:` Bug fixes
  - `docs:` Documentation changes
  - `style:` Code formatting
  - `refactor:` Code restructuring
  - `test:` Test additions/changes
  - `chore:` Maintenance tasks

## Best Practices

- Always use TypeScript, avoid `any` type
- Prefer functional components with hooks
- Use async/await over promises
- Handle loading and error states
- Implement proper SEO with Next.js metadata
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use environment variables for configuration
- Never commit secrets or API keys
