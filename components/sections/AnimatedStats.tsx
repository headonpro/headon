'use client'

/**
 * AnimatedStats Component
 *
 * Displays key statistics with counting animation
 * Used on city pages and other landing pages for trust building
 */

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface Stat {
  value: number
  label: string
  suffix?: string
  prefix?: string
  icon?: React.ReactNode
}

interface AnimatedStatsProps {
  stats: Stat[]
  variant?: 'light' | 'dark'
}

function AnimatedNumber({
  value,
  suffix = '',
  prefix = '',
}: {
  value: number
  suffix?: string
  prefix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  })
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [motionValue, isInView, value])

  useEffect(
    () =>
      springValue.on('change', (latest) => {
        if (ref.current) {
          ref.current.textContent = `${prefix}${Math.floor(latest)}${suffix}`
        }
      }),
    [springValue, suffix, prefix]
  )

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  )
}

export default function AnimatedStats({ stats, variant = 'dark' }: AnimatedStatsProps) {
  const isDark = variant === 'dark'

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`rounded-lg border p-6 text-center backdrop-blur-md transition-all hover:scale-105 ${
            isDark
              ? 'border-white/20 bg-white/10 hover:bg-white/20'
              : 'border-gray-200 bg-white hover:shadow-xl'
          }`}
        >
          {stat.icon && (
            <div className="mb-4 flex justify-center">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${
                  isDark ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'
                }`}
              >
                {stat.icon}
              </div>
            </div>
          )}
          <div className={`mb-2 text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <AnimatedNumber value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
          </div>
          <div className={`text-sm ${isDark ? 'text-white/80' : 'text-gray-600'}`}>
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
