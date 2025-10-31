'use client'

import { Button } from '@/components/ui/button'
import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import type { PortfolioContentResult } from '@/lib/content/mdx-loader'
import type { PortfolioCategory } from '@/lib/types/content'

// Before/After Slider Component
function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100))
    setSliderPosition(percent)
  }

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return
      handleMove(e.clientX)
    },
    [isDragging]
  )

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return
      handleMove(e.touches[0].clientX)
    },
    [isDragging]
  )

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('touchmove', handleTouchMove)
      document.addEventListener('touchend', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('touchend', handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleTouchMove])

  return (
    <div>
      {/* Dark Mode Toggle */}
      <div className="mb-3 flex items-center justify-center gap-2">
        <span className="text-muted-foreground text-xs">Light</span>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="bg-muted hover:bg-muted/80 relative h-6 w-12 rounded-full transition-colors duration-200"
        >
          <motion.div
            className="bg-primary absolute top-0.5 left-0.5 h-5 w-5 rounded-full shadow-lg"
            animate={{ x: isDarkMode ? 22 : 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        </button>
        <span className="text-muted-foreground text-xs">Dark</span>
      </div>

      <div
        ref={containerRef}
        className="relative h-[300px] w-full cursor-ew-resize overflow-hidden rounded-lg select-none"
      >
        {/* After Image - New Website */}
        <div className="absolute inset-0">
          <Image
            src={isDarkMode ? '/images/viktoria-dark.png' : '/images/viktoria-new.png'}
            alt="SV Blau-Weiß Wiehre - Moderne Vereinswebsite mit Live-Ticker und Mitgliederbereich"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute top-2 right-2 rounded bg-green-500/90 px-2 py-1 backdrop-blur-sm">
            <span className="text-xs font-semibold text-white">
              NEU {isDarkMode ? '(Dark)' : ''}
            </span>
          </div>
        </div>

        {/* Before Image - Old Website */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image
            src="/images/viktoria-old.png"
            alt="SV Blau-Weiß Wiehre - Veraltete Website vor der Modernisierung"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute top-2 left-2 rounded bg-gray-500/90 px-2 py-1 backdrop-blur-sm">
            <span className="text-xs font-semibold text-white">ALT</span>
          </div>
        </div>

        {/* Slider Handle */}
        <div
          className="bg-primary absolute top-0 bottom-0 w-0.5 cursor-ew-resize"
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          <div className="bg-primary absolute top-1/2 left-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-lg">
            <div className="flex items-center gap-0.5">
              <svg
                className="text-primary-foreground h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <svg
                className="text-primary-foreground h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// App Screenshot Component
function AppShowcase() {
  return (
    <div>
      {/* Invisible spacer to match the dark mode toggle height */}
      <div className="mb-3 h-[30px]"></div>

      <div className="relative h-[300px] w-full overflow-hidden rounded-lg bg-gradient-to-br from-orange-500 to-orange-700">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Phone Frame */}
          <div className="relative h-[280px] w-[140px] rounded-[24px] bg-gray-900 p-1.5 shadow-2xl">
            <div className="h-full w-full overflow-hidden rounded-[20px] bg-white">
              <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-orange-100 to-orange-50 p-4">
                <div className="mb-2 text-xl font-bold text-orange-600">KLARTEXT</div>
                <div className="text-center text-sm text-orange-500">KI Sprachassistent</div>
                <div className="mt-4 space-y-2">
                  <div className="h-2 w-20 rounded bg-orange-200"></div>
                  <div className="h-2 w-16 rounded bg-orange-200"></div>
                  <div className="h-2 w-24 rounded bg-orange-200"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Category mapping for display
const categoryLabels: Record<PortfolioCategory, string> = {
  web: 'Web',
  mobile: 'Mobile',
  'ui-ux': 'UI/UX',
  'full-stack': 'Full-Stack',
}

// Special showcase components for specific projects
const specialShowcases: Record<string, React.ComponentType> = {
  'sv-viktoria-wertheim': BeforeAfterSlider,
  'klartext-app': AppShowcase,
}

interface PortfolioContentProps {
  projects: PortfolioContentResult[]
}

export default function PortfolioContent({ projects }: PortfolioContentProps) {
  const [selectedCategory, setSelectedCategory] = useState<PortfolioCategory | 'all'>('all')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Filter projects by category
  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((project) => project.frontmatter.category === selectedCategory)
  return (
    <div className="relative min-h-screen overflow-hidden py-16">
      {/* Static gradient background */}
      <div className="from-primary-600 via-primary-500 to-secondary-500 absolute inset-0 bg-gradient-to-br" />

      {/* Animated Gradient Layers */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-60"
          animate={{
            background: isMobile
              ? [
                  'radial-gradient(circle at 30% 70%, rgba(255, 140, 0, 0.5) 0%, transparent 40%)',
                  'radial-gradient(circle at 70% 30%, rgba(255, 215, 0, 0.5) 0%, transparent 40%)',
                  'radial-gradient(circle at 30% 70%, rgba(255, 140, 0, 0.5) 0%, transparent 40%)',
                ]
              : [
                  'radial-gradient(circle at 20% 80%, rgba(255, 140, 0, 0.4) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.4) 0%, transparent 50%)',
                  'radial-gradient(circle at 40% 40%, rgba(255, 140, 0, 0.4) 0%, transparent 50%)',
                  'radial-gradient(circle at 60% 60%, rgba(255, 215, 0, 0.4) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 80%, rgba(255, 140, 0, 0.4) 0%, transparent 50%)',
                ],
          }}
          transition={{
            duration: isMobile ? 8 : 10,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            transform: 'translateZ(0)',
            willChange: 'background',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Portfolio
              <span className="mt-2 block text-2xl font-normal text-white/90 sm:text-3xl md:text-4xl">
                Erfolgreiche Projekte & Case Studies
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-white/90">
              Entdecken Sie unsere erfolgreichen Projekte und lassen Sie sich inspirieren.
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`rounded-full px-4 py-2 font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'text-primary-600 bg-white shadow-lg'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Alle
            </button>
            {(Object.keys(categoryLabels) as PortfolioCategory[]).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-4 py-2 font-medium transition-all ${
                  selectedCategory === category
                    ? 'text-primary-600 bg-white shadow-lg'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {categoryLabels[category]}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {filteredProjects.map((project) => {
              const CustomShowcase = specialShowcases[project.slug]

              return (
                <div
                  key={project.slug}
                  className="group relative overflow-hidden rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:shadow-xl"
                >
                  {/* Custom Showcase or Image */}
                  {CustomShowcase ? (
                    <div className="p-6">
                      <CustomShowcase />
                    </div>
                  ) : project.frontmatter.image ? (
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={project.frontmatter.image.url}
                        alt={project.frontmatter.image.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="from-primary/20 to-secondary/20 aspect-video bg-gradient-to-br" />
                  )}

                  {/* Project Info */}
                  <div className="p-6">
                    <p className="mb-2 text-sm text-white/70">
                      {categoryLabels[project.frontmatter.category]}
                    </p>
                    <h3 className="mb-2 text-xl font-semibold text-white">
                      {project.frontmatter.title}
                    </h3>
                    <p className="mb-4 text-white/80">{project.frontmatter.description}</p>

                    {/* Tags */}
                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.frontmatter.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="bg-accent/20 text-accent-200 rounded-full px-2 py-1 text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* View Case Study Button */}
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="border-white/30 bg-white/5 text-white backdrop-blur-md hover:border-white/40 hover:bg-white/10"
                    >
                      <Link href={`/portfolio/${project.slug}`}>Case Study ansehen</Link>
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-lg text-white/70">Keine Projekte in dieser Kategorie gefunden.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
