'use client'

import { useEffect, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'

interface TocItem {
  id: string
  title: string
  level: number
}

interface TableOfContentsProps {
  items: TocItem[]
  className?: string
}

/**
 * Enhanced Table of Contents with active section tracking
 * Features:
 * - Active section highlighting
 * - Smooth scroll navigation
 * - Nested structure visualization
 * - Progress indicator
 * - Auto-collapse/expand sections
 */
export function TableOfContents({ items, className }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('')
  const [activeParentId, setActiveParentId] = useState<string>('')
  const [scrollProgress, setScrollProgress] = useState(0)

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (winScroll / height) * 100
      setScrollProgress(scrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Track active section using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)

            // Find parent section for nested items
            const currentItem = items.find((item) => item.id === entry.target.id)
            if (currentItem && currentItem.level === 3) {
              // Find the parent h2 for this h3
              const currentIndex = items.findIndex((item) => item.id === entry.target.id)
              for (let i = currentIndex - 1; i >= 0; i--) {
                if (items[i].level === 2) {
                  setActiveParentId(items[i].id)
                  break
                }
              }
            } else if (currentItem && currentItem.level === 2) {
              setActiveParentId(entry.target.id)
            }
          }
        })
      },
      {
        rootMargin: '-20% 0% -70% 0%',
        threshold: 0,
      }
    )

    // Observe all heading elements
    items.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      items.forEach(({ id }) => {
        const element = document.getElementById(id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [items])

  // Smooth scroll to section
  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const offset = 80 // Header height
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }, [])

  // Group items by parent sections
  const groupedItems = items.reduce(
    (acc, item) => {
      if (item.level === 2) {
        acc.push({
          parent: item,
          children: [],
        })
      } else if (item.level === 3 && acc.length > 0) {
        acc[acc.length - 1].children.push(item)
      }
      return acc
    },
    [] as Array<{ parent: TocItem; children: TocItem[] }>
  )

  return (
    <div className={cn('relative', className)}>
      {/* Progress Bar */}
      <div className="absolute top-0 bottom-0 left-0 w-0.5 overflow-hidden rounded-full bg-gray-200">
        <div
          className="bg-primary w-full transition-all duration-300 ease-out"
          style={{ height: `${scrollProgress}%` }}
        />
      </div>

      {/* TOC Content */}
      <nav className="pl-4">
        <h3 className="text-muted-foreground mb-4 text-sm font-semibold tracking-wider uppercase">
          Inhaltsverzeichnis
        </h3>

        <ul className="space-y-2">
          {groupedItems.map(({ parent, children }) => {
            const isParentActive = activeParentId === parent.id
            const hasActiveChild = children.some((child) => activeId === child.id)

            return (
              <li key={parent.id} className="relative">
                {/* Parent Item (H2) */}
                <a
                  href={`#${parent.id}`}
                  onClick={(e) => handleClick(e, parent.id)}
                  className={cn(
                    'group hover:text-primary flex items-center gap-2 text-sm transition-all duration-200',
                    activeId === parent.id
                      ? 'text-primary font-semibold'
                      : isParentActive || hasActiveChild
                        ? 'font-medium text-gray-900'
                        : 'text-gray-600'
                  )}
                >
                  {/* Indicator */}
                  <span
                    className={cn(
                      'flex h-1.5 w-1.5 shrink-0 transition-all duration-200',
                      activeId === parent.id
                        ? 'bg-primary scale-150 rounded-full'
                        : isParentActive || hasActiveChild
                          ? 'bg-primary/50 rounded-full'
                          : 'group-hover:bg-primary/50 rounded-full bg-gray-300'
                    )}
                  />

                  {/* Title */}
                  <span className="line-clamp-2">{parent.title}</span>

                  {/* Chevron for sections with children */}
                  {children.length > 0 && (
                    <ChevronRight
                      className={cn(
                        'ml-auto h-3 w-3 shrink-0 transition-transform duration-200',
                        isParentActive || hasActiveChild ? 'rotate-90' : ''
                      )}
                    />
                  )}
                </a>

                {/* Child Items (H3) - Only show when parent is active */}
                {children.length > 0 && (isParentActive || hasActiveChild) && (
                  <ul className="mt-2 ml-4 space-y-1.5 border-l border-gray-200 pl-3">
                    {children.map((child) => (
                      <li key={child.id}>
                        <a
                          href={`#${child.id}`}
                          onClick={(e) => handleClick(e, child.id)}
                          className={cn(
                            'hover:text-primary block text-xs transition-all duration-200',
                            activeId === child.id
                              ? 'text-primary translate-x-1 font-semibold'
                              : 'text-gray-500'
                          )}
                        >
                          {child.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )
          })}
        </ul>

        {/* Quick Stats */}
        <div className="mt-6 border-t border-gray-200 pt-6">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{groupedItems.length} Abschnitte</span>
            <span>{Math.round(scrollProgress)}% gelesen</span>
          </div>
        </div>
      </nav>
    </div>
  )
}
