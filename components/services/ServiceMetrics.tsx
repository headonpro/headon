'use client'

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef } from 'react'
import {
  LucideIcon,
  Zap,
  Clock,
  Shield,
  TrendingUp,
  Users,
  Award,
  Target,
  CheckCircle,
} from 'lucide-react'

export interface Metric {
  value: string | number
  label: string
  icon: string
  suffix?: string
  prefix?: string
  description?: string
  color?: 'primary' | 'success' | 'warning' | 'error' | 'info'
}

interface ServiceMetricsProps {
  metrics: Metric[]
  columns?: 2 | 3 | 4
  variant?: 'default' | 'gradient' | 'minimal'
}

const iconMap: Record<string, LucideIcon> = {
  zap: Zap,
  clock: Clock,
  shield: Shield,
  trending: TrendingUp,
  users: Users,
  award: Award,
  target: Target,
  check: CheckCircle,
}

const colorClasses = {
  primary: {
    gradient: 'from-primary-500 to-primary-600',
    text: 'text-primary-600',
    bg: 'bg-primary-50',
    border: 'border-primary-200',
  },
  success: {
    gradient: 'from-green-500 to-emerald-600',
    text: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200',
  },
  warning: {
    gradient: 'from-orange-500 to-amber-600',
    text: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
  },
  error: {
    gradient: 'from-red-500 to-rose-600',
    text: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
  },
  info: {
    gradient: 'from-blue-500 to-cyan-600',
    text: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
}

function AnimatedCounter({
  value,
  prefix = '',
  suffix = '',
}: {
  value: number
  prefix?: string
  suffix?: string
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
  }, [isInView, motionValue, value])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        // Check if value has decimal point
        const displayValue = value % 1 !== 0 ? latest.toFixed(1) : Math.floor(latest).toString()
        ref.current.textContent = `${prefix}${displayValue}${suffix}`
      }
    })
    return unsubscribe
  }, [springValue, prefix, suffix, value])

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  )
}

export function ServiceMetrics({ metrics, columns = 3, variant = 'default' }: ServiceMetricsProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div className={`grid gap-6 ${gridCols[columns]}`}>
      {metrics.map((metric, index) => {
        const Icon = iconMap[metric.icon] || Zap
        const colors = colorClasses[metric.color || 'primary']
        const numericValue =
          typeof metric.value === 'string'
            ? parseFloat(metric.value.replace(/[^0-9.]/g, ''))
            : metric.value

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: 'easeOut',
            }}
          >
            {variant === 'gradient' ? (
              // Gradient Card Variant
              <div
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${colors.gradient} p-8 text-white shadow-xl transition-shadow duration-300 hover:shadow-2xl`}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                      backgroundSize: '32px 32px',
                    }}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <Icon className="mb-4 h-10 w-10 opacity-90" />
                  <div className="mb-2 text-4xl font-bold">
                    {!isNaN(numericValue) ? (
                      <AnimatedCounter
                        value={numericValue}
                        prefix={metric.prefix}
                        suffix={metric.suffix}
                      />
                    ) : (
                      <span>{metric.value}</span>
                    )}
                  </div>
                  <div className="font-medium text-white/90">{metric.label}</div>
                  {metric.description && (
                    <div className="mt-2 text-sm text-white/70">{metric.description}</div>
                  )}
                </div>
              </div>
            ) : variant === 'minimal' ? (
              // Minimal Variant
              <div className="text-center">
                <div
                  className={`inline-flex h-16 w-16 items-center justify-center rounded-full ${colors.bg} mb-4`}
                >
                  <Icon className={`h-8 w-8 ${colors.text}`} />
                </div>
                <div className={`mb-2 text-4xl font-bold ${colors.text}`}>
                  {!isNaN(numericValue) ? (
                    <AnimatedCounter
                      value={numericValue}
                      prefix={metric.prefix}
                      suffix={metric.suffix}
                    />
                  ) : (
                    <span>{metric.value}</span>
                  )}
                </div>
                <div className="font-medium text-gray-600">{metric.label}</div>
              </div>
            ) : (
              // Default Card Variant
              <div
                className={`relative overflow-hidden rounded-xl border ${colors.border} hover:border-primary-400 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md`}
              >
                {/* Icon */}
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${colors.bg} mb-4`}
                >
                  <Icon className={`h-6 w-6 ${colors.text}`} />
                </div>

                {/* Value */}
                <div className="mb-1 text-3xl font-bold text-gray-900">
                  {!isNaN(numericValue) ? (
                    <AnimatedCounter
                      value={numericValue}
                      prefix={metric.prefix}
                      suffix={metric.suffix}
                    />
                  ) : (
                    <span>{metric.value}</span>
                  )}
                </div>

                {/* Label */}
                <div className="text-sm font-medium text-gray-600">{metric.label}</div>

                {/* Description */}
                {metric.description && (
                  <div className="mt-2 text-xs text-gray-500">{metric.description}</div>
                )}
              </div>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}

// Compact Row Variant
export function ServiceMetricsRow({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-8 md:gap-12">
      {metrics.map((metric, index) => {
        const Icon = iconMap[metric.icon] || Zap
        const numericValue =
          typeof metric.value === 'string'
            ? parseFloat(metric.value.replace(/[^0-9.]/g, ''))
            : metric.value

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4,
              delay: index * 0.1,
            }}
            className="text-center"
          >
            <Icon className="text-primary-600 mx-auto mb-2 h-8 w-8" />
            <div className="mb-1 text-3xl font-bold text-gray-900 md:text-4xl">
              {!isNaN(numericValue) ? (
                <AnimatedCounter
                  value={numericValue}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                />
              ) : (
                <span>{metric.value}</span>
              )}
            </div>
            <div className="max-w-[120px] text-sm font-medium text-gray-600">{metric.label}</div>
          </motion.div>
        )
      })}
    </div>
  )
}
