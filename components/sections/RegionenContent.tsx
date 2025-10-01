'use client'

/**
 * RegionenContent Component
 *
 * Main content wrapper for Service-Regionen page with animated gradient background
 */

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { CityContentResult } from '@/lib/content/mdx-loader'
import CityMap from './CityMap'

interface RegionenContentProps {
  cities: CityContentResult[]
}

export default function RegionenContent({ cities }: RegionenContentProps) {
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
      {/* Animated Gradient Background - same as HeroSection */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500" />

      {/* Animated Gradient Layers */}
      <div className="absolute inset-0">
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
          style={{
            transform: 'translateZ(0)',
            willChange: 'background',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 pt-40 pb-24">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
              Unsere Service-Regionen
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              HEADON.pro kommt persönlich zu Ihnen in der gesamten Region Main-Tauber-Kreis.
              Professionelle Webentwicklung, Mobile Apps und digitale Lösungen –
              regional, persönlich, vor Ort bei Ihnen.
            </p>
          </motion.div>

          {/* Map and Cities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <CityMap cities={cities} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}
