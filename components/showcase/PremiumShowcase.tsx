'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink, Sparkles } from 'lucide-react'
import GlassmorphismCard from '@/components/ui/glassmorphism-card'
import { useInView } from 'react-intersection-observer'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { PlaceholderImages } from './placeholders'

// Lazy load heavy components
const LazyBeforeAfter = dynamic(() => import('./BeforeAfterSlider'), {
  loading: () => <div className="h-[400px] w-full animate-pulse rounded-xl bg-white/5" />,
  ssr: false,
})

const LazyPhoneMockup = dynamic(() => import('./PhoneMockup3D'), {
  loading: () => (
    <div className="mx-auto h-[580px] w-[280px] animate-pulse rounded-[40px] bg-white/5" />
  ),
  ssr: false,
})

interface ProjectCard {
  id: string
  title: string
  subtitle: string
  description: string
  tech: string[]
  caseStudyUrl: string
}

const projects: ProjectCard[] = [
  {
    id: 'football',
    title: 'SV Blau-Weiß Wiehre',
    subtitle: 'Digitale Transformation',
    description:
      'Von der veralteten Website zur modernen Vereinsplattform mit Live-Ticker und Mitgliederbereich',
    tech: ['Next.js', 'Supabase', 'Framer Motion'],
    caseStudyUrl: '/projekte/sv-blau-weiss',
  },
  {
    id: 'app',
    title: 'FitTracker Pro',
    subtitle: 'Mobile Fitness App',
    description:
      'Intuitive Trainings-App mit KI-gestützter Bewegungsanalyse und personalisierten Workouts',
    tech: ['React Native', 'TensorFlow', 'Node.js'],
    caseStudyUrl: '/projekte/fittracker',
  },
]

export default function PremiumShowcase() {
  const [activeProject, setActiveProject] = useState<'football' | 'app' | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const touchStartX = useRef<number | null>(null)

  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  })

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Auto-play carousel on mobile
  useEffect(() => {
    if (isMobile && isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % 2)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isMobile, isAutoPlaying, currentSlide])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    setIsAutoPlaying(false)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current) return

    const touchEndX = e.changedTouches[0].clientX
    const diff = touchStartX.current - touchEndX

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setCurrentSlide((prev) => (prev + 1) % 2)
      } else {
        setCurrentSlide((prev) => (prev - 1 + 2) % 2)
      }
    }

    touchStartX.current = null
  }

  const ProjectContent = ({ project, index }: { project: ProjectCard; index: number }) => {
    const isActive = activeProject === project.id || (!activeProject && isMobile)

    return (
      <GlassmorphismCard
        delay={index * 0.2}
        hoverable={!isMobile}
        className={`h-full transition-all duration-500 ${isActive ? 'ring-accent-500/50 ring-2' : ''} ${!isMobile && activeProject && activeProject !== project.id ? 'scale-95 opacity-50' : ''} `}
      >
        <div className="flex h-full flex-col p-4 md:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-3 md:mb-4 lg:mb-6">
            <motion.div
              className="mb-1 flex items-center gap-2 md:mb-2"
              animate={isActive ? { x: [0, 5, 0] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="text-accent-500 h-4 w-4" />
              <span className="text-accent-500 text-xs font-semibold tracking-wider uppercase">
                {project.subtitle}
              </span>
            </motion.div>

            <h3 className="mb-2 text-xl font-bold text-white md:mb-3 md:text-2xl lg:text-3xl">
              {project.title}
            </h3>

            <p className="text-xs text-white/70 md:text-sm lg:text-base">{project.description}</p>
          </div>

          {/* Interactive Demo Area */}
          <div
            className="relative mb-3 flex-1 overflow-hidden rounded-lg md:mb-4 lg:mb-6"
            onMouseEnter={() => !isMobile && setActiveProject(project.id as 'football' | 'app')}
            onMouseLeave={() => !isMobile && setActiveProject(null)}
          >
            {project.id === 'football' ? (
              <div className="h-full min-h-[200px] md:min-h-[300px] lg:min-h-[400px]">
                {inView && (
                  <LazyBeforeAfter
                    beforeImage={PlaceholderImages.footballBefore}
                    afterImage={PlaceholderImages.footballAfter}
                    beforeLabel="Alte Website"
                    afterLabel="Neue Website"
                    height="100%"
                  />
                )}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center py-4 md:py-6 lg:py-8">
                {inView && (
                  <LazyPhoneMockup
                    appScreenshot={PlaceholderImages.appScreenshot}
                    appName="FitTracker Pro"
                    className="scale-50 md:scale-75 lg:scale-90"
                  />
                )}
              </div>
            )}

            {/* Hover Overlay with Live Demo (Desktop only) */}
            {!isMobile && (
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                  >
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-center"
                    >
                      <div className="mb-4 text-white">
                        <div className="mb-2 text-lg font-semibold">Live Demo verfügbar</div>
                        <div className="text-sm text-white/70">
                          Klicken für interaktive Vorschau
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>

          {/* Tech Stack */}
          <div className="mb-3 flex flex-wrap gap-1 md:mb-4 md:gap-2 lg:mb-6">
            {project.tech.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-white/80 backdrop-blur-sm md:px-3 md:py-1 md:text-xs"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* CTA */}
          <Link href={project.caseStudyUrl}>
            <motion.button
              className="from-accent-500 to-secondary-500 hover:shadow-accent-500/25 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r px-3 py-2 text-sm font-semibold text-white transition-shadow hover:shadow-lg md:px-4 md:py-2.5 md:text-base lg:py-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Case Study ansehen
              <ExternalLink className="h-3 w-3 md:h-4 md:w-4" />
            </motion.button>
          </Link>
        </div>
      </GlassmorphismCard>
    )
  }

  return (
    <div ref={ref} className="mx-auto w-full max-w-7xl px-4 py-4 md:py-8 lg:py-12">
      {/* Desktop Layout - Side by Side */}
      {!isMobile ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectContent key={project.id} project={project} index={index} />
          ))}
        </div>
      ) : (
        /* Mobile Layout - Swipe Carousel */
        <div className="relative">
          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <motion.div
              className="flex"
              animate={{ x: `-${currentSlide * 100}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {projects.map((project, index) => (
                <div key={project.id} className="w-full flex-shrink-0 px-2">
                  <ProjectContent project={project} index={index} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Mobile Carousel Indicators */}
          <div className="mt-3 flex justify-center gap-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index)
                  setIsAutoPlaying(false)
                }}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === index ? 'bg-accent-500 w-8' : 'w-2 bg-white/30'
                }`}
              />
            ))}
          </div>

          {/* Mobile Navigation Buttons */}
          <button
            onClick={() => {
              setCurrentSlide((prev) => (prev - 1 + 2) % 2)
              setIsAutoPlaying(false)
            }}
            className="absolute top-1/2 left-0 -translate-y-1/2 rounded-r-lg bg-white/10 p-2 backdrop-blur-sm"
          >
            <ChevronLeft className="h-5 w-5 text-white" />
          </button>
          <button
            onClick={() => {
              setCurrentSlide((prev) => (prev + 1) % 2)
              setIsAutoPlaying(false)
            }}
            className="absolute top-1/2 right-0 -translate-y-1/2 rounded-l-lg bg-white/10 p-2 backdrop-blur-sm"
          >
            <ChevronRight className="h-5 w-5 text-white" />
          </button>
        </div>
      )}

      {/* Connection Line Animation (Desktop Only) */}
      {!isMobile && activeProject && (
        <motion.div
          className="absolute top-1/2 left-1/2 -z-10 h-32 w-px -translate-x-1/2 -translate-y-1/2"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          exit={{ scaleY: 0 }}
        >
          <div className="via-accent-500 h-full w-full bg-gradient-to-b from-transparent to-transparent opacity-50" />
        </motion.div>
      )}
    </div>
  )
}
