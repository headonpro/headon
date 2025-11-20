/**
 * SavingsHighlight Component
 *
 * Displays the savings badge highlighting the value proposition of choosing HEADON
 * over traditional agencies. Shows both price and time savings with animated entrance.
 *
 * Features:
 * - Animated scale entrance (0.9 → 1.0)
 * - Glassmorphism design for consistent styling
 * - Large, prominent numbers for savings
 * - Lucide icon for visual appeal
 * - HEADON logo for brand recognition
 */

'use client'

import { motion } from 'framer-motion'
import { TrendingDown } from 'lucide-react'
import Logo from '@/components/ui/Logo'
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
      // Styling: Glassmorphism design with backdrop blur
      className="text-center py-8 px-6 bg-white/10 border-2 border-white/20 rounded-xl backdrop-blur-md"
    >
      {/* Lucide Icon (TrendingDown for savings) */}
      <div className="flex justify-center mb-4">
        <TrendingDown className="h-12 w-12 text-white" />
      </div>

      {/* Heading with Logo */}
      <div className="flex items-center justify-center gap-2 mb-2">
        <h3 className="text-2xl font-bold text-white">
          Sie sparen mit
        </h3>
        <Logo width={90} height={24} className="!h-[24px] !w-auto" />
      </div>

      {/* Savings Numbers (text-3xl font-extrabold) */}
      <div className="text-3xl font-extrabold text-white">
        {formatCurrency(totalSavingsVsAgency)} & {timeSavingsVsAgency} Wochen
      </div>

      {/* Context Text */}
      <p className="text-sm text-white/70 mt-4">
        Im Vergleich zu traditionellen Agenturen
      </p>
    </motion.div>
  )
}
