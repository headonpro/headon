'use client'

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import type { StatsSectionProps } from '@/lib/types/content'
import { cn } from '@/lib/utils'

/**
 * StatsSection Component
 *
 * Displays key metrics with count-up animations for AI SEO optimization.
 * Provides factual data in a structured format for ChatGPT, Perplexity, and other AI search engines.
 *
 * Features:
 * - Count-up animations triggered on scroll into view
 * - Performant CSS transforms only
 * - Mobile-responsive grid layout (1 col mobile, 2-4 cols desktop)
 * - Animation triggers only once per page load
 * - Configurable via props
 *
 * @example
 * ```tsx
 * <StatsSection
 *   title="HEADON in Zahlen"
 *   stats={[
 *     { value: 50, label: "Erfolgreiche Projekte", suffix: "+" },
 *     { value: 10, label: "Jahre Erfahrung", suffix: "+" },
 *     { value: 4, label: "Schnellere Ladezeiten", suffix: "x" },
 *     { value: 100, label: "Kundenzufriedenheit", suffix: "%" }
 *   ]}
 * />
 * ```
 */
export default function StatsSection({
  stats,
  title = 'Unsere Expertise in Zahlen',
  description,
  includeSchema = false,
  className,
}: StatsSectionProps) {
  return (
    <section className={cn('bg-gradient-to-br from-gray-50 to-gray-100 py-16 md:py-24', className)}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 text-center md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl"
          >
            {title}
          </motion.h2>
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mx-auto max-w-3xl text-lg text-gray-600 md:text-xl"
            >
              {description}
            </motion.p>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} index={index} />
          ))}
        </div>

        {/* Schema.org structured data for AI search engines */}
        {includeSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Organization',
                name: 'HEADON.pro',
                knowsAbout: stats.map((stat) => ({
                  '@type': 'QuantitativeValue',
                  value:
                    typeof stat.value === 'number' ? stat.value : parseFloat(String(stat.value)),
                  unitText: stat.unit || stat.suffix || '',
                  description: stat.label,
                })),
              }),
            }}
          />
        )}
      </div>
    </section>
  )
}

/**
 * StatCard Component
 *
 * Individual stat card with count-up animation.
 * Uses Framer Motion for performant animations with CSS transforms.
 */
function StatCard({ stat, index }: { stat: StatsSectionProps['stats'][0]; index: number }) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true, // Animation triggers only once
  })

  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => {
    return Math.round(latest)
  })

  const hasAnimated = useRef(false)

  useEffect(() => {
    if (inView && !hasAnimated.current) {
      hasAnimated.current = true

      const numericValue =
        typeof stat.value === 'number' ? stat.value : parseFloat(String(stat.value)) || 0

      const controls = animate(count, numericValue, {
        duration: 2,
        ease: 'easeOut',
      })

      return controls.stop
    }
  }, [inView, count, stat.value])

  // Format the display value
  const getDisplayValue = () => {
    if (typeof stat.value === 'string' && isNaN(parseFloat(stat.value))) {
      // If value is a non-numeric string, display as-is
      return stat.value
    }
    // Otherwise, use the animated count
    return null
  }

  const displayValue = getDisplayValue()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: 'easeOut',
      }}
      className="group relative"
    >
      <div className="flex h-full flex-col items-center justify-center rounded-2xl bg-white p-8 text-center shadow-lg transition-shadow duration-300 hover:shadow-2xl">
        {/* Value with count-up animation */}
        <div className="mb-3">
          <div className="flex flex-col items-center">
            <motion.span
              className="from-primary-600 to-secondary-500 bg-gradient-to-br bg-clip-text text-5xl font-bold text-transparent md:text-6xl"
              style={{
                // Force GPU acceleration for smooth animation
                transform: 'translate3d(0, 0, 0)',
                willChange: 'auto',
              }}
            >
              {displayValue !== null ? displayValue : <motion.span>{rounded}</motion.span>}
              {stat.suffix && <span className="text-4xl md:text-5xl">{stat.suffix}</span>}
            </motion.span>
            {stat.unit && (
              <span className="mt-1 text-base font-medium text-gray-600 md:text-lg">
                {stat.unit}
              </span>
            )}
          </div>
        </div>

        {/* Label */}
        <p className="text-lg leading-tight font-medium text-gray-700 md:text-xl">{stat.label}</p>

        {/* Decorative element */}
        <div className="from-primary-100 to-secondary-100 absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
      </div>
    </motion.div>
  )
}
