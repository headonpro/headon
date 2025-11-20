/**
 * SavingsHighlight Component
 *
 * Displays the savings badge highlighting the value proposition of choosing HEADON
 * over traditional agencies. Shows both price and time savings with animated entrance.
 *
 * Features:
 * - Animated scale entrance (0.9 → 1.0)
 * - Green gradient background for positive emphasis
 * - Large, prominent numbers for savings
 * - Emoji for visual appeal
 */

'use client'

import { motion } from 'framer-motion'
import { formatCurrency } from '@/lib/calculator/utils'
import type { ComparisonResult } from '@/lib/calculator/types'

// ============================================================================
// Props Interface
// ============================================================================

export interface SavingsHighlightProps {
  /** Savings calculation from comparison result */
  savings: ComparisonResult['savings']
}

// ============================================================================
// Component
// ============================================================================

export function SavingsHighlight({ savings }: SavingsHighlightProps) {
  // Calculate savings vs Agency
  const totalSavingsVsAgency = savings.vsAgency.price
  const timeSavingsVsAgency = savings.vsAgency.time

  return (
    <motion.div
      // Animation: Scale from 0.9 to 1.0 with slight opacity fade-in
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 0.5,
        ease: 'easeOut',
      }}
      // Styling: Green gradient background, centered text, prominent border
      className="text-center py-8 px-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl"
    >
      {/* Emoji (text-4xl as per spec) */}
      <div className="text-4xl mb-2">💰</div>

      {/* Heading (text-2xl font-bold as per spec) */}
      <h3 className="text-2xl font-bold text-green-900 mb-2">
        Sie sparen mit HEADON:
      </h3>

      {/* Savings Numbers (text-3xl font-extrabold text-green-700 as per spec) */}
      <div className="text-3xl font-extrabold text-green-700">
        {formatCurrency(totalSavingsVsAgency)} & {timeSavingsVsAgency} Wochen
      </div>

      {/* Context Text */}
      <p className="text-sm text-green-800 mt-4">
        Im Vergleich zu traditionellen Agenturen
      </p>
    </motion.div>
  )
}
