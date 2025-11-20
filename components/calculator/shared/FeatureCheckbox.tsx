'use client'

/**
 * FeatureCheckbox Component
 *
 * Checkbox with price badge for feature selection.
 * Used in Step 3 of the cost calculator to select project features with pricing.
 */

import { type LucideIcon } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/lib/calculator/utils'

// ============================================================================
// Type Definitions
// ============================================================================

export interface FeatureCheckboxProps {
  /** Display label for the feature */
  label: string
  /** Optional description explaining the feature */
  description?: string
  /** Whether the feature is currently selected */
  checked: boolean
  /** Callback when checkbox state changes */
  onChange: (checked: boolean) => void
  /** Price as fixed number or range (min/max) */
  price?: { min: number; max: number } | number
  /** Optional Lucide icon to display */
  icon?: LucideIcon
}

// ============================================================================
// Component Implementation
// ============================================================================

export function FeatureCheckbox({
  label,
  description,
  checked,
  onChange,
  price,
  icon: Icon,
}: FeatureCheckboxProps) {
  // Format price display based on type (number or range)
  const priceDisplay = typeof price === 'number'
    ? formatCurrency(price)
    : price
      ? `${formatCurrency(price.min)} - ${formatCurrency(price.max)}`
      : null

  return (
    <div
      className={cn(
        'flex items-center gap-4 p-4 rounded-lg border-2 transition-all cursor-pointer backdrop-blur-md',
        checked
          ? 'border-accent-500 bg-accent-500/10'
          : 'border-white/20 bg-white/10 hover:border-white/30 hover:bg-white/15'
      )}
      onClick={() => onChange(!checked)}
    >
      {/* Checkbox */}
      <Checkbox
        checked={checked}
        onCheckedChange={onChange}
        onClick={(e) => e.stopPropagation()} // Prevent double-toggle from parent div
      />

      {/* Optional Icon */}
      {Icon && (
        <div className={cn(
          "h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0",
          checked ? "bg-accent-500/20 text-accent-500" : "bg-white/30 text-white"
        )}>
          <Icon className="h-5 w-5" />
        </div>
      )}

      {/* Label and Description */}
      <div className="flex-1 min-w-0">
        <div className="font-medium text-white">{label}</div>
        {description && (
          <div className="text-sm text-white/70">{description}</div>
        )}
      </div>

      {/* Price Badge */}
      {priceDisplay && (
        <Badge
          variant={checked ? 'default' : 'secondary'}
          className={cn(
            "flex-shrink-0 border-white/20",
            checked ? "bg-accent-500/20 text-accent-500" : "bg-white/30 text-white"
          )}
        >
          {priceDisplay}
        </Badge>
      )}
    </div>
  )
}
