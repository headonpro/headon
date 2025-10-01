'use client'

import { useState, useEffect, useRef } from 'react'
import type { TOCItem } from '@/lib/types/content'
import { cn } from '@/lib/utils'

interface TableOfContentsProps {
  items: TOCItem[]
}

/**
 * Table of Contents component with scroll-spy
 * Sticky sidebar for desktop, hidden on mobile
 */
export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    // Create intersection observer for scroll-spy
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      // Find the first visible heading
      const visibleEntry = entries.find((entry) => entry.isIntersecting)

      if (visibleEntry) {
        setActiveId(visibleEntry.target.id)
      }
    }

    observerRef.current = new IntersectionObserver(handleIntersection, {
      rootMargin: '-80px 0px -80% 0px', // Trigger when heading is near top
      threshold: 0,
    })

    // Observe all headings from the items
    items.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element && observerRef.current) {
        observerRef.current.observe(element)
      }
    })

    // Cleanup on unmount
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [items])

  // Handle smooth scroll to heading
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)

    if (element) {
      // Scroll to element with smooth behavior
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })

      // Update URL hash without jumping
      window.history.pushState(null, '', `#${id}`)
    }
  }

  if (items.length === 0) {
    return null
  }

  return (
    <nav
      className="hidden lg:block sticky top-24 right-0 w-64 h-fit max-h-[calc(100vh-6rem)] overflow-y-auto"
      aria-label="Table of contents"
    >
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
          On This Page
        </h3>
        <ul className="space-y-2 text-sm border-l-2 border-gray-200 dark:border-gray-700">
          {items.map((item) => (
            <li
              key={item.id}
              className={cn(
                item.level === 3 && 'ml-4' // Indent H3 headings
              )}
            >
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={cn(
                  'block py-1 px-3 -ml-px border-l-2 transition-colors',
                  'hover:text-primary hover:border-primary',
                  activeId === item.id
                    ? 'text-primary border-primary font-medium'
                    : 'text-gray-600 dark:text-gray-400 border-transparent'
                )}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
