'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function HeroAnimations() {
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

  return (
    <div className="absolute inset-0">
      {/* First animated gradient layer - simplified for mobile */}
      <motion.div 
        className="absolute inset-0 opacity-60"
        animate={{
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
        }}
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
      {!isMobile && (
        <motion.div 
          className="absolute inset-0 opacity-40"
          animate={{
            background: [
              'radial-gradient(circle at 80% 20%, rgba(138, 43, 226, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 60%, rgba(255, 20, 147, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 60% 80%, rgba(138, 43, 226, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 20%, rgba(255, 20, 147, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(138, 43, 226, 0.3) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
            delay: 0.5
          }}
          style={{
            transform: 'translateZ(0)',
            willChange: 'background'
          }}
        />
      )}

      {/* Floating Orbs - Desktop Only */}
      {!isMobile && (
        <>
          <motion.div
            className="absolute h-64 w-64 rounded-full bg-accent-500/20 blur-3xl"
            animate={{
              x: [0, 100, -50, 80, 0],
              y: [0, -100, 50, -80, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ top: '20%', left: '10%' }}
          />
          <motion.div
            className="absolute h-72 w-72 rounded-full bg-secondary-500/20 blur-3xl"
            animate={{
              x: [0, -80, 100, -60, 0],
              y: [0, 50, -120, 100, 0],
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
  )
}