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
    <section className="bg-primary-600 relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Preload critical logo for LCP optimization - hidden but loads with priority */}
      <div
        className="pointer-events-none absolute top-0 left-0 h-0 w-0 overflow-hidden opacity-0"
        aria-hidden="true"
      >
        <Image
          src="/headon-logo.svg"
          alt="HEADON.pro Logo Preload"
          width={200}
          height={50}
          priority
        />
      </div>

      {/* Static gradient for base */}
      <div className="from-primary-600 via-primary-500 to-secondary-500 absolute inset-0 bg-gradient-to-br" />

      {/* Animated Gradient Background - optimized for performance */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0">
          {/* First animated gradient layer - simplified for mobile */}
          <motion.div
            className="absolute inset-0 opacity-60"
            animate={
              animationsReady && !prefersReducedMotion
                ? {
                    background: isMobile
                      ? [
                          // Simpler animation for mobile
                          'radial-gradient(circle at 30% 70%, rgba(255, 140, 0, 0.5) 0%, transparent 40%)',
                          'radial-gradient(circle at 70% 30%, rgba(255, 215, 0, 0.5) 0%, transparent 40%)',
                          'radial-gradient(circle at 30% 70%, rgba(255, 140, 0, 0.5) 0%, transparent 40%)',
                        ]
                      : [
                          // Full animation for desktop
                          'radial-gradient(circle at 20% 80%, rgba(255, 140, 0, 0.4) 0%, transparent 50%)',
                          'radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.4) 0%, transparent 50%)',
                          'radial-gradient(circle at 40% 40%, rgba(255, 140, 0, 0.4) 0%, transparent 50%)',
                          'radial-gradient(circle at 60% 60%, rgba(255, 215, 0, 0.4) 0%, transparent 50%)',
                          'radial-gradient(circle at 20% 80%, rgba(255, 140, 0, 0.4) 0%, transparent 50%)',
                        ],
                  }
                : {}
            }
            transition={{
              duration: isMobile ? 8 : 10,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              // Force GPU acceleration
              transform: 'translate3d(0, 0, 0)',
              willChange: 'auto',
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
                ease: 'linear',
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
            className={`bg-secondary-500/20 absolute rounded-full ${isMobile ? 'h-48 w-48 blur-2xl' : 'h-64 w-64 blur-3xl'}`}
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
              ease: 'easeInOut',
            }}
          />

          {/* Show fewer orbs on mobile */}
          {!isMobile && (
            <>
              <motion.div
                className="bg-accent-500/20 absolute h-96 w-96 rounded-full blur-3xl"
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
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="bg-primary-400/20 absolute h-80 w-80 rounded-full blur-3xl"
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
                  ease: 'easeInOut',
                }}
              />
            </>
          )}

          {/* Mobile-specific orb */}
          {isMobile && (
            <motion.div
              className="bg-accent-500/20 absolute h-56 w-56 rounded-full blur-2xl"
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
                ease: 'easeInOut',
              }}
            />
          )}
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-48 pb-24 text-center md:pt-64 md:pb-32 lg:pt-72">
        <h1 className="font-heading mb-16 text-4xl font-bold tracking-tight text-white sm:text-5xl md:mb-20 md:text-6xl lg:text-7xl">
          <span
            className="easter-egg-trigger relative inline-block cursor-pointer select-none"
            onClick={() => setShowEasterEgg(true)}
          >
            Kreativ- & Digitalagentur
            <motion.span
              className="text-accent-500 ml-0.5 inline-block"
              animate={{
                rotate: [0, 10, -10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                scale: [1, 1.1, 1, 1.1, 1, 1, 0.9, 1, 1, 1, 0.9, 1, 1],
                y: [0, -2, 0, -2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
                times: [0, 0.04, 0.08, 0.12, 0.16, 0.35, 0.36, 0.37, 0.5, 0.75, 0.76, 0.77, 1],
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
                  transition={{ type: 'spring', damping: 30, stiffness: 500 }}
                  className="pointer-events-none absolute left-1/2 z-50 -translate-x-1/2"
                  style={{ top: '-3.5rem' }}
                >
                  <div className="pointer-events-auto relative">
                    <div className="flex items-center gap-2 px-4 py-2">
                      <AnimatedRobot className="text-accent-500 h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12" />
                      <Plus className="h-6 w-6 stroke-[2] text-white/70 md:h-8 md:w-8 lg:h-10 lg:w-10" />
                      <User className="text-accent-500 h-8 w-8 stroke-[2] md:h-10 md:w-10 lg:h-12 lg:w-12" />
                    </div>
                    {/* Small arrow pointing down */}
                    <div
                      className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45"
                      style={{
                        borderBottom: '1px solid rgba(255,255,255,0.15)',
                        borderRight: '1px solid rgba(255,255,255,0.15)',
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </span>
          <br />
          für{' '}
          <span className="from-secondary-300 via-accent-500 to-secondary-600 bg-gradient-to-r bg-clip-text text-transparent">
            Web, Apps & Design
          </span>
        </h1>

        {/* New Text Section - No animation for critical content */}
        <div className="mx-auto mb-16 max-w-4xl opacity-90 md:mb-20 lg:mb-24">
          <p className="text-center text-base leading-relaxed text-white/90 md:text-lg lg:text-xl">
            Als Kreativ- und Digitalagentur aus Lauda-Königshofen vereinen wir Webdesign,
            Webentwicklung, App-Development und Corporate Design unter einem Dach. Während andere
            Agenturen 3-6 Monate brauchen, gestalten und entwickeln wir Ihr Projekt durch
            KI-gestützte Prozesse in 2-4 Wochen. Ihre digitale Transformation zu transparenten
            Festpreisen.
          </p>
        </div>

        {/* Dynamic Typewriter CTA Button */}
        <div className="mb-20 md:mb-28 lg:mb-32">
          <TypewriterCTA />
        </div>
      </div>

      {/* Simple wave at bottom */}
      <div className="absolute right-0 bottom-0 left-0">
        <svg
          className="h-16 w-full fill-white md:h-24"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path d="M0,40 C480,100 960,0 1440,60 L1440,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  )
}
