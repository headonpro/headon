'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function HeroAnimations() {
  const [isMobile, setIsMobile] = useState(false)
  const [animationsReady, setAnimationsReady] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

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

  if (prefersReducedMotion) {
    return null
  }

  return (
    <>
      {/* Animated Gradient Background - optimized for performance */}
      <div className="absolute inset-0">
        {/* First animated gradient layer - simplified for mobile */}
        <motion.div
          className="absolute inset-0 opacity-60"
          animate={animationsReady ? {
            background: isMobile ? [
              'radial-gradient(circle at 30% 70%, rgba(255, 140, 0, 0.5) 0%, transparent 40%)',
              'radial-gradient(circle at 70% 30%, rgba(255, 215, 0, 0.5) 0%, transparent 40%)',
              'radial-gradient(circle at 30% 70%, rgba(255, 140, 0, 0.5) 0%, transparent 40%)',
            ] : [
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

      {/* Floating orbs - simplified for mobile, GPU-accelerated */}
      {animationsReady && (
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
    </>
  )
}
