'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Plus, User } from 'lucide-react'
import AnimatedRobot from '@/components/icons/AnimatedRobot'
import TypewriterCTA from '@/components/ui/typewriter-cta'
import Image from 'next/image'

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false)
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const [animationsReady, setAnimationsReady] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Check if user prefers reduced motion
    const checkMotionPreference = () => {
      setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    }

    checkMobile()
    checkMotionPreference()
    window.addEventListener('resize', checkMobile)

    // Start animations immediately after paint (non-blocking)
    setTimeout(() => setAnimationsReady(true), 0)

    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  useEffect(() => {
    // Close popup when clicking outside
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (showEasterEgg && !target.closest('.easter-egg-trigger')) {
        setShowEasterEgg(false)
      }
    }
    
    if (showEasterEgg) {
      document.addEventListener('click', handleClick)
      return () => document.removeEventListener('click', handleClick)
    }
  }, [showEasterEgg])

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-primary-600">
      {/* Preload critical logo for LCP optimization - hidden but loads with priority */}
      <div className="absolute top-0 left-0 w-0 h-0 overflow-hidden opacity-0 pointer-events-none" aria-hidden="true">
        <Image
          src="/headon-logo.svg"
          alt=""
          width={200}
          height={50}
          priority
        />
      </div>
      
      {/* Static gradient for base */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500" />
      
      {/* Animated Gradient Background - optimized for performance */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0">
          {/* First animated gradient layer - simplified for mobile */}
          <motion.div
            className="absolute inset-0 opacity-60"
            animate={animationsReady && !prefersReducedMotion ? {
              background: isMobile ? [
                // Simpler animation for mobile
                'radial-gradient(circle at 30% 70%, rgba(255, 140, 0, 0.5) 0%, transparent 40%)',
                'radial-gradient(circle at 70% 30%, rgba(255, 215, 0, 0.5) 0%, transparent 40%)',
                'radial-gradient(circle at 30% 70%, rgba(255, 140, 0, 0.5) 0%, transparent 40%)',
              ] : [
                // Full animation for desktop
                'radial-gradient(circle at 20% 80%, rgba(255, 140, 0, 0.4) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.4) 0%, transparent 50%)',
                'radial-gradient(circle at 40% 40%, rgba(255, 140, 0, 0.4) 0%, transparent 50%)',
                'radial-gradient(circle at 60% 60%, rgba(255, 215, 0, 0.4) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 80%, rgba(255, 140, 0, 0.4) 0%, transparent 50%)',
              ],
            } : {}}
            transition={{
              duration: isMobile ? 8 : 10,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              // Force GPU acceleration
              transform: 'translate3d(0, 0, 0)',
              willChange: 'auto'
            }}
          />

          {/* Second animated layer - only on desktop */}
          {!isMobile && animationsReady && (
            <motion.div
              className="absolute inset-0 opacity-40"
              animate={{
                background: [
                  'radial-gradient(circle at 80% 50%, rgba(16, 52, 166, 0.4) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 50%, rgba(16, 52, 166, 0.4) 0%, transparent 50%)',
                  'radial-gradient(circle at 50% 20%, rgba(16, 52, 166, 0.4) 0%, transparent 50%)',
                  'radial-gradient(circle at 50% 80%, rgba(16, 52, 166, 0.4) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 50%, rgba(16, 52, 166, 0.4) 0%, transparent 50%)',
                ],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                transform: 'translate3d(0, 0, 0)',
              }}
            />
          )}
        </div>
      )}

      {/* Floating orbs - simplified for mobile, GPU-accelerated */}
      {!prefersReducedMotion && animationsReady && (
        <div className="absolute inset-0">
          <motion.div
            className={`absolute rounded-full bg-secondary-500/20 ${isMobile ? 'h-48 w-48 blur-2xl' : 'h-64 w-64 blur-3xl'}`}
            style={{
              top: '10%',
              left: '10%',
            }}
            animate={{
              x: isMobile ? [0, 50, 0] : [0, 100, 0, -100, 0],
              y: isMobile ? [0, -50, 0] : [0, -100, -50, 100, 0],
            }}
            transition={{
              duration: isMobile ? 12 : 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Show fewer orbs on mobile */}
          {!isMobile && (
            <>
              <motion.div
                className="absolute h-96 w-96 rounded-full bg-accent-500/20 blur-3xl"
                style={{
                  bottom: '10%',
                  right: '10%',
                }}
                animate={{
                  x: [0, -150, 0, 150, 0],
                  y: [0, 100, -100, 50, 0],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute h-80 w-80 rounded-full bg-primary-400/20 blur-3xl"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                animate={{
                  x: [0, 120, -80, 60, 0],
                  y: [0, 60, 120, -60, 0],
                }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </>
          )}

          {/* Mobile-specific orb */}
          {isMobile && (
            <motion.div
              className="absolute h-56 w-56 rounded-full bg-accent-500/20 blur-2xl"
              style={{
                bottom: '20%',
                right: '5%',
              }}
              animate={{
                x: [0, -60, 0],
                y: [0, 60, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-48 pb-24 md:pt-64 lg:pt-72 md:pb-32 text-center">
        <h1 className="mb-16 md:mb-20 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl font-heading">

          <span
            className="relative inline-block cursor-pointer select-none easter-egg-trigger"
            onClick={() => setShowEasterEgg(true)}
          >
            Full-Service Digitalagentur
            <motion.span
              className="inline-block ml-0.5 text-accent-500"
              animate={{
                rotate: [0, 10, -10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                scale: [1, 1.1, 1, 1.1, 1, 1, 0.9, 1, 1, 1, 0.9, 1, 1],
                y: [0, -2, 0, -2, 0, 0, 0, 0, 0, 0, 0, 0, 0]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.04, 0.08, 0.12, 0.16, 0.35, 0.36, 0.37, 0.5, 0.75, 0.76, 0.77, 1]
              }}
            >
              *
            </motion.span>

            {/* Easter Egg Popup - Positioned directly above the word */}
            <AnimatePresence>
              {showEasterEgg && (
                <motion.div
                  initial={{ opacity: 0, y: 5, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                  transition={{ type: "spring", damping: 30, stiffness: 500 }}
                  className="absolute left-1/2 -translate-x-1/2 z-50 pointer-events-none"
                  style={{ top: '-3.5rem' }}
                >
                  <div className="relative pointer-events-auto">
                    <div className="flex items-center gap-2 px-4 py-2">
                      <AnimatedRobot className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-accent-500" />
                      <Plus className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white/70 stroke-[2]" />
                      <User className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-accent-500 stroke-[2]" />
                    </div>
                    {/* Small arrow pointing down */}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
                         style={{ borderBottom: '1px solid rgba(255,255,255,0.15)', borderRight: '1px solid rgba(255,255,255,0.15)' }} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </span>
          <br />
          für{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-300 via-accent-500 to-secondary-600">
            Webentwicklung, Apps & kreatives Design
          </span>
        </h1>

        {/* New Text Section - No animation for critical content */}
        <div
          className="mb-16 md:mb-20 lg:mb-24 max-w-4xl mx-auto opacity-90"
        >
          <p className="text-white/90 text-base md:text-lg lg:text-xl leading-relaxed text-center">
            Als Kreativ- und Marketingagentur vereinen wir Webentwicklung, App-Development, UI/UX Design und Corporate Branding unter einem Dach. Während andere Agenturen noch traditionell entwickeln, nutzen wir KI-gestützte Prozesse für 4x schnellere Umsetzung. Ihre digitale Transformation in Wochen statt Monaten - zu einem Bruchteil der üblichen Kosten.
          </p>
        </div>

        {/* Dynamic Typewriter CTA Button */}
        <div className="mb-20 md:mb-28 lg:mb-32">
          <TypewriterCTA />
        </div>
      </div>
      
      {/* Simple wave at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-16 md:h-24 fill-white" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,40 C480,100 960,0 1440,60 L1440,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  )
}