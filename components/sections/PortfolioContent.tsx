'use client'

import { Button } from '@/components/ui/button'
import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

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

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return
    handleMove(e.clientX)
  }, [isDragging])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return
    handleMove(e.touches[0].clientX)
  }, [isDragging])

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
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="text-xs text-muted-foreground">Light</span>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="relative w-12 h-6 bg-muted rounded-full transition-colors duration-200 hover:bg-muted/80"
        >
          <motion.div
            className="absolute top-0.5 left-0.5 w-5 h-5 bg-primary rounded-full shadow-lg"
            animate={{ x: isDarkMode ? 22 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </button>
        <span className="text-xs text-muted-foreground">Dark</span>
      </div>

      <div
        ref={containerRef}
        className="relative w-full h-[300px] overflow-hidden rounded-lg select-none cursor-ew-resize"
      >
        {/* After Image - New Website */}
        <div className="absolute inset-0">
          <Image
            src={isDarkMode ? "/images/viktoria-dark.png" : "/images/viktoria-new.png"}
            alt="SV Blau-Weiß Wiehre - Moderne Vereinswebsite mit Live-Ticker und Mitgliederbereich"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute top-2 right-2 px-2 py-1 rounded bg-green-500/90 backdrop-blur-sm">
            <span className="text-white text-xs font-semibold">NEU {isDarkMode ? '(Dark)' : ''}</span>
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
          <div className="absolute top-2 left-2 px-2 py-1 rounded bg-gray-500/90 backdrop-blur-sm">
            <span className="text-white text-xs font-semibold">ALT</span>
          </div>
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-primary cursor-ew-resize"
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary rounded-full shadow-lg flex items-center justify-center">
            <div className="flex items-center gap-0.5">
              <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
              </svg>
              <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
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
      <div className="h-[30px] mb-3"></div>

      <div className="relative w-full h-[300px] bg-gradient-to-br from-orange-500 to-orange-700 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Phone Frame */}
          <div className="relative w-[140px] h-[280px] bg-gray-900 rounded-[24px] p-1.5 shadow-2xl">
            <div className="w-full h-full bg-white rounded-[20px] overflow-hidden">
              <div className="w-full h-full bg-gradient-to-b from-orange-100 to-orange-50 flex flex-col items-center justify-center p-4">
                <div className="text-orange-600 font-bold text-xl mb-2">KLARTEXT</div>
                <div className="text-orange-500 text-sm text-center">KI Sprachassistent</div>
                <div className="mt-4 space-y-2">
                  <div className="w-20 h-2 bg-orange-200 rounded"></div>
                  <div className="w-16 h-2 bg-orange-200 rounded"></div>
                  <div className="w-24 h-2 bg-orange-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const projects = [
  {
    id: 1,
    title: 'SV Viktoria Wertheim',
    category: 'Web Development',
    description: 'Komplette Neugestaltung der Vereinswebsite mit modernem Design und Dark Mode',
    customComponent: BeforeAfterSlider,
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Dark Mode'],
  },
  {
    id: 2,
    title: 'KLARTEXT - Sprachassistent',
    category: 'Mobile Development',
    description: 'KI-gestützter Sprachassistent als mobile App für iOS und Android',
    customComponent: AppShowcase,
    tags: ['React Native', 'KI/ML', 'TypeScript', 'Firebase'],
  },
  {
    id: 3,
    title: 'SaaS Dashboard',
    category: 'UI/UX Design',
    description: 'Intuitives Dashboard für Business Analytics',
    image: '/images/portfolio/project3.jpg',
    tags: ['Figma', 'Design System', 'React'],
  },
  {
    id: 4,
    title: 'Healthcare Platform',
    category: 'Full Stack',
    description: 'Telemedizin-Plattform mit Video-Konsultationen',
    image: '/images/portfolio/project4.jpg',
    tags: ['Next.js', 'WebRTC', 'PostgreSQL'],
  },
]

export default function PortfolioContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">
            Portfolio
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Entdecken Sie unsere erfolgreichen Projekte und lassen Sie sich inspirieren.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/15 hover:shadow-xl transition-all duration-300"
            >
              {project.customComponent ? (
                <div className="p-6">
                  <project.customComponent />
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20" />
              )}
              <div className="p-6">
                <p className="text-sm text-white/70 mb-2">{project.category}</p>
                <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-white/80 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs rounded-full bg-accent/20 text-accent-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                  Case Study ansehen
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transition to Footer */}
      <div className="h-16 bg-gradient-to-b from-transparent to-gray-50"></div>
    </div>
  )
}