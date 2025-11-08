'use client'

/**
 * ProcessTimeline Component
 *
 * Visual timeline showing the project workflow
 * Used on city pages and service pages
 */

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

interface ProcessStep {
  number: number
  title: string
  description: string
  duration?: string
  icon?: React.ReactNode
}

interface ProcessTimelineProps {
  steps: ProcessStep[]
  variant?: 'light' | 'dark'
}

export default function ProcessTimeline({ steps, variant = 'dark' }: ProcessTimelineProps) {
  const isDark = variant === 'dark'

  return (
    <div className="relative">
      {/* Vertical line */}
      <div
        className={`absolute left-8 top-8 bottom-8 w-0.5 ${
          isDark ? 'bg-white/20' : 'bg-gray-200'
        } md:left-1/2 md:-translate-x-px`}
      />

      <div className="space-y-12">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className={`relative flex items-start gap-6 ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            {/* Number badge */}
            <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center md:absolute md:left-1/2 md:-translate-x-1/2">
              <div
                className={`flex h-full w-full items-center justify-center rounded-full border-4 text-xl font-bold ${
                  isDark
                    ? 'border-primary-500 bg-primary-600 text-white'
                    : 'border-primary-200 bg-primary-500 text-white'
                }`}
              >
                {step.icon || step.number}
              </div>
            </div>

            {/* Content card */}
            <div className="flex-1 md:w-[calc(50%-3rem)]">
              <div
                className={`rounded-lg border p-6 backdrop-blur-md transition-all hover:scale-[1.02] ${
                  isDark
                    ? 'border-white/20 bg-white/10 hover:bg-white/20'
                    : 'border-gray-200 bg-white hover:shadow-xl'
                }`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3
                    className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}
                  >
                    {step.title}
                  </h3>
                  {step.duration && (
                    <span
                      className={`rounded-full px-3 py-1 text-sm ${
                        isDark
                          ? 'bg-white/20 text-white/90'
                          : 'bg-primary-100 text-primary-700'
                      }`}
                    >
                      {step.duration}
                    </span>
                  )}
                </div>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-white/80' : 'text-gray-600'}`}>
                  {step.description}
                </p>
              </div>
            </div>

            {/* Spacer for alternating layout */}
            <div className="hidden flex-1 md:block md:w-[calc(50%-3rem)]" />
          </motion.div>
        ))}
      </div>

      {/* Final checkmark */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: steps.length * 0.2 }}
        className="relative mt-12 flex justify-center"
      >
        <div
          className={`flex h-20 w-20 items-center justify-center rounded-full ${
            isDark ? 'bg-green-500/20' : 'bg-green-500'
          }`}
        >
          <CheckCircle2 className={`h-12 w-12 ${isDark ? 'text-green-400' : 'text-white'}`} />
        </div>
      </motion.div>
    </div>
  )
}
