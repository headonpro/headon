# Suggested Commands for HEADON.pro Project

## Development Commands

```bash
# Start development server (http://localhost:3000)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Install dependencies (MUST use pnpm)
pnpm install
```

## Code Quality Commands

```bash
# Run ESLint
pnpm lint

# Auto-fix linting issues
pnpm lint:fix

# Format code with Prettier
pnpm format

# Check formatting without fixing
pnpm format:check

# TypeScript type checking
pnpm type-check
```

## Component Management

```bash
# Add new shadcn/ui component
pnpm dlx shadcn@latest add [component-name]

# Example: Add button component
pnpm dlx shadcn@latest add button
```

## Git Commands

```bash
# Check status
git status

# Stage changes
git add .

# Commit with conventional commit message
git commit -m "feat: add new feature"
git commit -m "fix: resolve bug"
git commit -m "docs: update documentation"
git commit -m "style: format code"
git commit -m "refactor: restructure code"
git commit -m "test: add tests"
git commit -m "chore: update dependencies"

# Push to remote
git push origin main
```

## System Navigation (Linux)

```bash
# List files
ls -la

# Change directory
cd [directory]

# View file content
cat [file]

# Search in files
grep -r "pattern" .

# Find files
find . -name "*.tsx"
```

## Docker Commands (if using Supabase locally)

```bash
# Start Supabase
docker-compose up -d

# Stop Supabase
docker-compose down

# View logs
docker-compose logs -f
```

## Testing Commands

```bash
# Run Playwright tests (when configured)
pnpm test

# Run tests in UI mode
pnpm test:ui
```

## Build Verification

```bash
# Full verification before commit
pnpm lint:fix && pnpm format && pnpm type-check && pnpm build
```

## Environment Setup

```bash
# Copy environment template
cp .env.local.example .env.local

# Edit environment variables
nano .env.local
```
