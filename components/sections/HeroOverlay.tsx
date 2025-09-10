'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Plus, User } from 'lucide-react'
import AnimatedRobot from '@/components/icons/AnimatedRobot'
import TypewriterCTA from '@/components/ui/typewriter-cta'
import Image from 'next/image'

export default function HeroOverlay() {
  const [isMobile, setIsMobile] = useState(false)
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const [animationsReady, setAnimationsReady] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    // Start animations immediately
    setAnimationsReady(true)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

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
    <>
      {/* Animated Gradient Background */}
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
            transform: 'translateZ(0)',
            willChange: 'background'
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
          />
        )}
      </div>

      {/* Floating orbs - simplified for mobile */}
      <div className="absolute inset-0">
        <motion.div
          className={`absolute rounded-full bg-secondary-500/20 ${isMobile ? 'h-48 w-48 blur-2xl' : 'h-64 w-64 blur-3xl'}`}
          animate={{
            x: isMobile ? [0, 50, 0] : [0, 100, 0, -100, 0],
            y: isMobile ? [0, -50, 0] : [0, -100, -50, 100, 0],
          }}
          transition={{
            duration: isMobile ? 12 : 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ 
            top: '10%', 
            left: '10%',
            transform: 'translateZ(0)',
          }}
        />
        
        {/* Desktop-only orbs */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute h-96 w-96 rounded-full bg-accent-500/20 blur-3xl"
              animate={{
                x: [0, -150, 0, 150, 0],
                y: [0, 100, -100, 50, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ bottom: '10%', right: '10%' }}
            />
            <motion.div
              className="absolute h-80 w-80 rounded-full bg-primary-400/20 blur-3xl"
              animate={{
                x: [0, 120, -80, 60, 0],
                y: [0, 60, 120, -60, 0],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            />
          </>
        )}
        
        {/* Mobile-specific orb */}
        {isMobile && (
          <motion.div
            className="absolute h-56 w-56 rounded-full bg-accent-500/20 blur-2xl"
            animate={{
              x: [0, -60, 0],
              y: [0, 60, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ 
              bottom: '20%', 
              right: '5%',
              transform: 'translateZ(0)',
            }}
          />
        )}
      </div>

      {/* Easter Egg Overlay - positioned over "Wir*" */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="container mx-auto px-4 pt-48 md:pt-64 lg:pt-72">
          <div className="text-center">
            <div className="inline-block relative">
              <span 
                className="absolute inset-0 w-16 h-12 cursor-pointer pointer-events-auto easter-egg-trigger"
                onClick={() => setShowEasterEgg(true)}
                style={{ left: '0', top: '0' }}
              />
              
              {/* Easter Egg Popup */}
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
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45" 
                           style={{ borderBottom: '1px solid rgba(255,255,255,0.15)', borderRight: '1px solid rgba(255,255,255,0.15)' }} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Button Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="container mx-auto px-4 pt-48 pb-24 md:pt-64 lg:pt-72 md:pb-32">
          <div className="h-[420px] md:h-[500px] lg:h-[520px]" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="pointer-events-auto"
          >
            <TypewriterCTA />
          </motion.div>
        </div>
      </div>

      {/* Wave at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-16 md:h-24 fill-white" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,40 C480,100 960,0 1440,60 L1440,120 L0,120 Z" />
        </svg>
      </div>
    </>
  )
}