'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink, Sparkles } from 'lucide-react'
import GlassmorphismCard from '@/components/ui/glassmorphism-card'
import BeforeAfterSlider from './BeforeAfterSlider'
import PhoneMockup3D from './PhoneMockup3D'
import { useInView } from 'react-intersection-observer'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { PlaceholderImages } from './placeholders'

// Lazy load heavy components
const LazyBeforeAfter = dynamic(() => import('./BeforeAfterSlider'), {
  loading: () => <div className="w-full h-[400px] bg-white/5 animate-pulse rounded-xl" />,
  ssr: false
})

const LazyPhoneMockup = dynamic(() => import('./PhoneMockup3D'), {
  loading: () => <div className="w-[280px] h-[580px] bg-white/5 animate-pulse rounded-[40px] mx-auto" />,
  ssr: false
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
    description: 'Von der veralteten Website zur modernen Vereinsplattform mit Live-Ticker und Mitgliederbereich',
    tech: ['Next.js', 'Supabase', 'Framer Motion'],
    caseStudyUrl: '/projekte/sv-blau-weiss'
  },
  {
    id: 'app',
    title: 'FitTracker Pro',
    subtitle: 'Mobile Fitness App',
    description: 'Intuitive Trainings-App mit KI-gestützter Bewegungsanalyse und personalisierten Workouts',
    tech: ['React Native', 'TensorFlow', 'Node.js'],
    caseStudyUrl: '/projekte/fittracker'
  }
]

export default function PremiumShowcase() {
  const [activeProject, setActiveProject] = useState<'football' | 'app' | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const touchStartX = useRef<number | null>(null)
  
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
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
        className={`
          transition-all duration-500 h-full
          ${isActive ? 'ring-2 ring-accent-500/50' : ''}
          ${!isMobile && activeProject && activeProject !== project.id ? 'opacity-50 scale-95' : ''}
        `}
      >
        <div className="p-4 md:p-6 lg:p-8 h-full flex flex-col">
          {/* Header */}
          <div className="mb-3 md:mb-4 lg:mb-6">
            <motion.div 
              className="flex items-center gap-2 mb-1 md:mb-2"
              animate={isActive ? { x: [0, 5, 0] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4 text-accent-500" />
              <span className="text-xs font-semibold text-accent-500 uppercase tracking-wider">
                {project.subtitle}
              </span>
            </motion.div>
            
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 md:mb-3">
              {project.title}
            </h3>
            
            <p className="text-white/70 text-xs md:text-sm lg:text-base">
              {project.description}
            </p>
          </div>

          {/* Interactive Demo Area */}
          <div 
            className="flex-1 mb-3 md:mb-4 lg:mb-6 relative overflow-hidden rounded-lg"
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
              <div className="h-full flex items-center justify-center py-4 md:py-6 lg:py-8">
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
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center"
                  >
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-center"
                    >
                      <div className="text-white mb-4">
                        <div className="text-lg font-semibold mb-2">Live Demo verfügbar</div>
                        <div className="text-sm text-white/70">Klicken für interaktive Vorschau</div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1 md:gap-2 mb-3 md:mb-4 lg:mb-6">
            {project.tech.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-xs rounded-full bg-white/10 text-white/80 backdrop-blur-sm"
              >
                {tech}
              </motion.span>
            ))}
          </div>

          {/* CTA */}
          <Link href={project.caseStudyUrl}>
            <motion.button
              className="w-full py-2 md:py-2.5 lg:py-3 px-3 md:px-4 rounded-lg bg-gradient-to-r from-accent-500 to-secondary-500 text-white text-sm md:text-base font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-accent-500/25 transition-shadow"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Case Study ansehen
              <ExternalLink className="w-3 md:w-4 h-3 md:h-4" />
            </motion.button>
          </Link>
        </div>
      </GlassmorphismCard>
    )
  }

  return (
    <div ref={ref} className="w-full max-w-7xl mx-auto px-4 py-4 md:py-8 lg:py-12">
      {/* Desktop Layout - Side by Side */}
      {!isMobile ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
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
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {projects.map((project, index) => (
                <div key={project.id} className="w-full flex-shrink-0 px-2">
                  <ProjectContent project={project} index={index} />
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Mobile Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-3">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index)
                  setIsAutoPlaying(false)
                }}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === index 
                    ? 'w-8 bg-accent-500' 
                    : 'w-2 bg-white/30'
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
            className="absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-r-lg bg-white/10 backdrop-blur-sm"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={() => {
              setCurrentSlide((prev) => (prev + 1) % 2)
              setIsAutoPlaying(false)
            }}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-l-lg bg-white/10 backdrop-blur-sm"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      )}
      
      {/* Connection Line Animation (Desktop Only) */}
      {!isMobile && activeProject && (
        <motion.div
          className="absolute left-1/2 top-1/2 w-px h-32 -translate-x-1/2 -translate-y-1/2 -z-10"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          exit={{ scaleY: 0 }}
        >
          <div className="w-full h-full bg-gradient-to-b from-transparent via-accent-500 to-transparent opacity-50" />
        </motion.div>
      )}
    </div>
  )
}