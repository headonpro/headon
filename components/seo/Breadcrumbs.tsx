/**
 * Breadcrumbs Navigation Component
 *
 * Server component for accessible breadcrumb navigation with Schema.org markup.
 * Provides visual navigation aid and SEO signals for page hierarchy.
 *
 * Features:
 * - Semantic HTML (nav, ol, li)
 * - Schema.org BreadcrumbList structured data
 * - Accessible (ARIA labels)
 * - Responsive (truncation on mobile)
 * - Hover states for links
 *
 * @example
 * ```tsx
 * <Breadcrumbs items={[
 *   { name: 'Home', url: '/' },
 *   { name: 'Blog', url: '/blog' },
 *   { name: 'Article Title', url: '/blog/article-slug' }
 * ]} />
 * ```
 */

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { BreadcrumbSchema } from '@/components/seo/SchemaGenerator'

// ============================================================================
// Types
// ============================================================================

export interface BreadcrumbItem {
  name: string
  url: string
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  variant?: 'light' | 'dark' // light = dark text (default), dark = white text on gradient
}

// ============================================================================
// Breadcrumbs Component
// ============================================================================

export default function Breadcrumbs({ items, variant = 'light' }: BreadcrumbsProps) {
  // Don't render if no items or only one item (homepage)
  if (!items || items.length === 0) {
    return null
  }

  // Color classes based on variant
  const colors = {
    light: {
      base: 'text-gray-600',
      current: 'text-gray-900',
      chevron: 'text-gray-400',
      hover: 'hover:text-primary',
    },
    dark: {
      base: 'text-white/80',
      current: 'text-white',
      chevron: 'text-white/50',
      hover: 'hover:text-white',
    },
  }

  const colorClasses = colors[variant]

  return (
    <>
      {/* Schema.org BreadcrumbList structured data */}
      <BreadcrumbSchema items={items} />

      {/* Visual breadcrumb navigation */}
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className={`flex flex-wrap items-center gap-2 text-sm ${colorClasses.base}`}>
          {items.map((item, index) => {
            const isLast = index === items.length - 1

            return (
              <li key={index} className="flex items-center gap-2">
                {/* Breadcrumb link or text */}
                {isLast ? (
                  // Last item (current page) - not clickable
                  <span className={`truncate font-semibold ${colorClasses.current} max-w-[200px] sm:max-w-none`}>
                    {item.name}
                  </span>
                ) : (
                  // Previous items - clickable links
                  <Link
                    href={item.url}
                    className={`truncate transition-colors ${colorClasses.hover} max-w-[150px] sm:max-w-none`}
                  >
                    {item.name}
                  </Link>
                )}

                {/* Separator (chevron) - not after last item */}
                {!isLast && (
                  <ChevronRight
                    className={`h-4 w-4 flex-shrink-0 ${colorClasses.chevron}`}
                    aria-hidden="true"
                  />
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
