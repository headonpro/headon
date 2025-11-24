'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Plus, User } from 'lucide-react'
import AnimatedRobot from '@/components/icons/AnimatedRobot'

// Client Component - nur für Animationen, kein SEO-relevanter Text
export function HeroAnimations() {
  const [isMobile, setIsMobile] = useState(false)
  const [animationsReady, setAnimationsReady] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    const checkMotionPreference = () =>
      setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)

    checkMobile()
    checkMotionPreference()
    window.addEventListener('resize', checkMobile)
    setTimeout(() => setAnimationsReady(true), 0)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (prefersReducedMotion) return null

  return (
    <>
      {/* Animated Gradient Background */}
      <div className="absolute inset-0">
        {animationsReady && (
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
            style={{ transform: 'translate3d(0, 0, 0)', willChange: 'auto' }}
          />
        )}

        {/* Second layer - desktop only */}
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
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            style={{ transform: 'translate3d(0, 0, 0)' }}
          />
        )}
      </div>

      {/* Floating orbs */}
      {animationsReady && (
        <div className="absolute inset-0">
          <motion.div
            className={`bg-secondary-500/20 absolute rounded-full ${isMobile ? 'h-48 w-48 blur-2xl' : 'h-64 w-64 blur-3xl'}`}
            style={{ top: '10%', left: '10%' }}
            animate={{
              x: isMobile ? [0, 50, 0] : [0, 100, 0, -100, 0],
              y: isMobile ? [0, -50, 0] : [0, -100, -50, 100, 0],
            }}
            transition={{ duration: isMobile ? 12 : 20, repeat: Infinity, ease: 'easeInOut' }}
          />

          {!isMobile && (
            <>
              <motion.div
                className="bg-accent-500/20 absolute h-96 w-96 rounded-full blur-3xl"
                style={{ bottom: '10%', right: '10%' }}
                animate={{
                  x: [0, -150, 0, 150, 0],
                  y: [0, 100, -100, 50, 0],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="bg-primary-400/20 absolute h-80 w-80 rounded-full blur-3xl"
                style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                animate={{
                  x: [0, 120, -80, 60, 0],
                  y: [0, 60, 120, -60, 0],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
              />
            </>
          )}

          {isMobile && (
            <motion.div
              className="bg-accent-500/20 absolute h-56 w-56 rounded-full blur-2xl"
              style={{ bottom: '20%', right: '5%' }}
              animate={{ x: [0, -60, 0], y: [0, 60, 0] }}
              transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </div>
      )}
    </>
  )
}

// Easter Egg component for the asterisk
export function EasterEggTrigger() {
  const [showEasterEgg, setShowEasterEgg] = useState(false)

  useEffect(() => {
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
    <span
      className="easter-egg-trigger relative inline-block cursor-pointer"
      onClick={() => setShowEasterEgg(true)}
    >
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
  )
}
