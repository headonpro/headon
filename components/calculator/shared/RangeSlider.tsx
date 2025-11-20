'use client'

/**
 * RangeSlider Component
 *
 * Custom range slider with visual labels and formatted value display.
 * Used in Step 2 of the cost calculator for page count selection.
 */

import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'

// ============================================================================
// Type Definitions
// ============================================================================

export interface RangeSliderProps {
  /** Current slider value (controlled) */
  value: number
  /** Callback when value changes */
  onChange: (value: number) => void
  /** Minimum value */
  min: number
  /** Maximum value */
  max: number
  /** Step increment */
  step: number
  /** Optional labels to display above slider (one per step) */
  labels?: string[]
  /** Optional function to format the current value display */
  formatLabel?: (value: number) => string
}

// ============================================================================
// Component Implementation
// ============================================================================

export function RangeSlider({
  value,
  onChange,
  min,
  max,
  step,
  labels,
  formatLabel = (v) => String(v),
}: RangeSliderProps) {
  return (
    <div className="space-y-4">
      {/* Labels Row (if provided) */}
      {labels && labels.length > 0 && (
        <div className="flex justify-between text-sm">
          {labels.map((label, i) => {
            // Calculate expected value for this label position
            const labelValue = min + i * step
            const isActive = value === labelValue

            return (
              <span
                key={i}
                className={cn(
                  'text-white/70 transition-colors',
                  isActive && 'text-accent-500 font-semibold'
                )}
              >
                {label}
              </span>
            )
          })}
        </div>
      )}

      {/* Slider Control */}
      <Slider
        value={[value]}
        onValueChange={([val]) => onChange(val)}
        min={min}
        max={max}
        step={step}
        className="w-full"
      />

      {/* Formatted Current Value Display */}
      <div className="text-center">
        <div className="text-2xl font-bold text-white">
          {formatLabel(value)}
        </div>
      </div>
    </div>
  )
}
