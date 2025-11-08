'use client'

/**
 * TrustBadges Component
 *
 * Displays trust indicators like tech stack, certifications, and guarantees
 * Used on city pages, service pages, and homepage
 */

import { motion } from 'framer-motion'
import { Shield, Zap, Award, Lock, CheckCircle2, TrendingUp } from 'lucide-react'

interface Badge {
  icon: React.ReactNode
  title: string
  description: string
}

interface TrustBadgesProps {
  variant?: 'light' | 'dark'
  showTechStack?: boolean
}

const defaultBadges: Badge[] = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Core Web Vitals',
    description: 'Lighthouse Score 90+',
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'DSGVO-konform',
    description: 'Datenschutz garantiert',
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: '30 Tage Support',
    description: 'Kostenlos nach Launch',
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: 'SSL & Security',
    description: 'Höchste Sicherheit',
  },
  {
    icon: <CheckCircle2 className="h-6 w-6" />,
    title: 'Festpreis-Garantie',
    description: 'Keine versteckten Kosten',
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: 'SEO-optimiert',
    description: 'Top Google Rankings',
  },
]

const techStackLogos = [
  { name: 'Next.js', src: '/tech-logos/nextjs.svg', width: 120, height: 40 },
  { name: 'React', src: '/tech-logos/react.svg', width: 120, height: 40 },
  { name: 'TypeScript', src: '/tech-logos/typescript.svg', width: 120, height: 40 },
  { name: 'Tailwind CSS', src: '/tech-logos/tailwind.svg', width: 120, height: 40 },
  { name: 'Supabase', src: '/tech-logos/supabase.svg', width: 120, height: 40 },
]

export default function TrustBadges({
  variant = 'dark',
  showTechStack = true,
}: TrustBadgesProps) {
  const isDark = variant === 'dark'

  return (
    <div className="space-y-12">
      {/* Trust badges grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {defaultBadges.map((badge, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`flex items-start gap-4 rounded-lg border p-6 backdrop-blur-md transition-all hover:scale-105 ${
              isDark
                ? 'border-white/20 bg-white/10 hover:bg-white/20'
                : 'border-gray-200 bg-white hover:shadow-xl'
            }`}
          >
            <div
              className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
                isDark ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'
              }`}
            >
              {badge.icon}
            </div>
            <div>
              <h3
                className={`mb-1 font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}
              >
                {badge.title}
              </h3>
              <p className={`text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                {badge.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tech stack logos */}
      {showTechStack && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`rounded-lg border p-8 backdrop-blur-md ${
            isDark
              ? 'border-white/20 bg-white/10'
              : 'border-gray-200 bg-white'
          }`}
        >
          <h3
            className={`mb-6 text-center text-lg font-semibold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Moderne Technologien für maximale Performance
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {techStackLogos.map((logo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`grayscale transition-all hover:grayscale-0 ${
                  isDark ? 'opacity-70 hover:opacity-100' : 'opacity-50 hover:opacity-100'
                }`}
              >
                {/* Fallback text if images don't exist */}
                <div
                  className={`flex h-10 items-center justify-center rounded px-4 text-sm font-semibold ${
                    isDark ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {logo.name}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
