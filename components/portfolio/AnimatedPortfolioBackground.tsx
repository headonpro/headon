'use client'

import { motion } from 'framer-motion'
import { useEffect, useState, ReactNode } from 'react'

interface AnimatedPortfolioBackgroundProps {
  children: ReactNode
}

export default function AnimatedPortfolioBackground({ children }: AnimatedPortfolioBackgroundProps) {
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Static gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500" />

      {/* Animated Gradient Layers */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-60"
          animate={{
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
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
