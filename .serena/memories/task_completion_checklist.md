# Task Completion Checklist

When completing any development task in the HEADON.pro project, follow this checklist to ensure code quality and consistency:

## Before Starting Work

1. ✅ Pull latest changes from main branch
2. ✅ Create a feature branch with descriptive name
3. ✅ Ensure environment variables are configured

## During Development

1. ✅ Follow TypeScript strict mode requirements
2. ✅ Use `@/*` path aliases for imports
3. ✅ Apply mobile-first responsive design
4. ✅ Use `cn()` utility for conditional classes
5. ✅ Keep components small and focused
6. ✅ Add proper TypeScript types (no `any`)

## After Implementation

### 1. Code Quality Checks (MANDATORY)

```bash
# Fix any linting issues
pnpm lint:fix

# Format code with Prettier
pnpm format

# Verify TypeScript types
pnpm type-check

# Build to verify no errors
pnpm build
```

### 2. Testing

- ✅ Test all new functionality locally
- ✅ Verify responsive design on mobile/tablet/desktop
- ✅ Check browser console for errors
- ✅ Test form validations if applicable
- ✅ Verify Supabase integration if modified

### 3. Review Checklist

- ✅ No hardcoded values (use env variables)
- ✅ No console.logs in production code
- ✅ No commented-out code
- ✅ No API keys or secrets in code
- ✅ All imports are used
- ✅ No duplicate code

### 4. Documentation

- ✅ Update README if adding new features
- ✅ Add JSDoc comments for complex functions
- ✅ Update environment variables documentation if needed

### 5. Git Commit

```bash
# Stage changes
git add .

# Commit with conventional commit message
git commit -m "type: description"

# Push to feature branch
git push origin feature-branch
```

## Critical Commands to Run

**ALWAYS run these commands before considering a task complete:**

```bash
pnpm lint:fix && pnpm format && pnpm type-check && pnpm build
```

If any command fails, fix the issues before proceeding.

## Final Verification

- ✅ Development server runs without errors (`pnpm dev`)
- ✅ Production build succeeds (`pnpm build`)
- ✅ No TypeScript errors
- ✅ No ESLint warnings
- ✅ Code is properly formatted
- ✅ All tests pass (if applicable)

## Common Issues to Check

- Import paths use `@/` alias
- Tailwind classes use `cn()` utility
- Forms use React Hook Form + Zod
- Components have proper TypeScript types
- Async operations have error handling
- Loading states are implemented
- SEO metadata is added to pages
