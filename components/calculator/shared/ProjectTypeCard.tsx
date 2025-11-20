'use client'

/**
 * ProjectTypeCard Component
 *
 * Icon card for project type selection with hover animations and selection state.
 * Used in Step 1 of the cost calculator to select the type of project to build.
 */

import { motion } from 'framer-motion'
import { CheckCircle2, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/lib/calculator/utils'

// ============================================================================
// Type Definitions
// ============================================================================

export interface ProjectTypeCardProps {
  /** Unique value identifier for the project type */
  value: string
  /** Display label for the project type */
  label: string
  /** Description explaining what this project type includes */
  description: string
  /** Lucide icon component to display */
  icon: LucideIcon
  /** Whether this card is currently selected */
  selected: boolean
  /** Callback when card is clicked */
  onClick: () => void
  /** Optional base price range for this project type */
  basePrice?: { min: number; max: number }
}

// ============================================================================
// Component Implementation
// ============================================================================

export function ProjectTypeCard({
  label,
  description,
  icon: Icon,
  selected,
  onClick,
  basePrice,
}: ProjectTypeCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        'relative cursor-pointer rounded-xl p-6 border-2 transition-all backdrop-blur-md',
        selected
          ? 'border-white/40 bg-white/20 shadow-lg'
          : 'border-white/20 bg-white/10 hover:border-white/30 hover:bg-white/15'
      )}
    >
      <div className="flex items-start gap-4">
        {/* Icon Container */}
        <div
          className={cn(
            'h-14 w-14 rounded-lg flex items-center justify-center backdrop-blur-sm',
            selected ? 'bg-white/30 text-white' : 'bg-white/20 text-white/80'
          )}
        >
          <Icon className="h-7 w-7" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <h4 className="font-semibold text-lg mb-1 text-white">{label}</h4>
          <p className="text-sm text-white/80">{description}</p>

          {/* Base Price Display */}
          {basePrice && (
            <div className="mt-3 text-sm font-medium text-white">
              ab {formatCurrency(basePrice.min)}
            </div>
          )}
        </div>

        {/* Selection Indicator */}
        {selected && (
          <CheckCircle2 className="h-6 w-6 text-white flex-shrink-0" />
        )}
      </div>
    </motion.div>
  )
}
