'use client'

/**
 * LeadMagnetCTA Component
 *
 * High-conversion CTA with lead magnet offer
 * Used on city pages for local lead generation
 */

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Download, FileCheck, Sparkles } from 'lucide-react'
import Link from 'next/link'

interface LeadMagnetCTAProps {
  cityName: string
  variant?: 'light' | 'dark'
}

export default function LeadMagnetCTA({ cityName, variant = 'dark' }: LeadMagnetCTAProps) {
  const isDark = variant === 'dark'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`relative overflow-hidden rounded-2xl border p-8 backdrop-blur-md md:p-12 ${
        isDark
          ? 'from-primary-500/20 to-secondary-500/20 border-white/20 bg-gradient-to-br'
          : 'from-primary-50 to-secondary-50 border-gray-200 bg-gradient-to-br'
      }`}
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-30">
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(255, 140, 0, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(255, 215, 0, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(255, 140, 0, 0.3) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="h-full w-full"
        />
      </div>

      <div className="relative z-10">
        <div className="mb-6 flex items-center justify-center gap-3 md:justify-start">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-full ${
              isDark ? 'bg-white/20' : 'bg-primary-100'
            }`}
          >
            <Sparkles className={`h-7 w-7 ${isDark ? 'text-white' : 'text-primary-600'}`} />
          </div>
          <span
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              isDark ? 'bg-white/20 text-white' : 'bg-primary-100 text-primary-700'
            }`}
          >
            🎁 Exklusives Angebot
          </span>
        </div>

        <h3
          className={`mb-4 text-center text-2xl font-bold md:text-left md:text-3xl ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}
        >
          Kostenlose Website-Analyse für {cityName}
        </h3>

        <p
          className={`mb-8 text-center leading-relaxed md:text-left ${
            isDark ? 'text-white/90' : 'text-gray-700'
          }`}
        >
          Erhalten Sie eine professionelle Analyse Ihrer aktuellen Online-Präsenz inkl.:
        </p>

        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          {[
            'Performance-Check (Lighthouse)',
            'SEO-Optimierungspotenziale',
            'Mobile-Optimierung',
            'Konkurrenz-Vergleich',
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-center gap-3"
            >
              <FileCheck
                className={`h-5 w-5 shrink-0 ${isDark ? 'text-green-400' : 'text-green-600'}`}
              />
              <span className={`text-sm ${isDark ? 'text-white/90' : 'text-gray-700'}`}>
                {item}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center md:justify-start">
          <Link href="/contact">
            <Button
              size="lg"
              className={`group w-full sm:w-auto ${
                isDark
                  ? 'text-primary bg-white hover:bg-gray-100'
                  : 'bg-primary hover:bg-primary-600 text-white'
              }`}
            >
              <Download className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
              Jetzt kostenlos anfordern
            </Button>
          </Link>
          <p className={`text-center text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
            ⚡ Antwort innerhalb von 24h
          </p>
        </div>

        <p
          className={`mt-6 text-center text-xs md:text-left ${
            isDark ? 'text-white/60' : 'text-gray-500'
          }`}
        >
          Keine Verpflichtungen • Keine Kosten • Keine Weitergabe Ihrer Daten
        </p>
      </div>
    </motion.div>
  )
}
