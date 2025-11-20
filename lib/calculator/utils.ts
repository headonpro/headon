/**
 * Utility Helper Functions for Cost Calculator
 *
 * This file provides reusable formatting and calculation utilities
 * for displaying prices, durations, and totals in the calculator UI.
 * All formatting uses German locale conventions.
 */

import type { DurationRange, BreakdownItem } from './types'

// ============================================================================
// Currency Formatting
// ============================================================================

/**
 * Formats a number as German-style Euro currency
 *
 * Examples:
 * - 12500 → "12.500€"
 * - 1234.56 → "1.235€" (rounded)
 * - 500 → "500€"
 * - null/undefined → ""
 *
 * @param value - The numeric value to format
 * @returns German-formatted Euro string with dot as thousands separator
 */
export function formatCurrency(value: number | null | undefined): string {
  // Handle null, undefined, or invalid inputs gracefully
  if (value === null || value === undefined || isNaN(value)) {
    return ''
  }

  // Round to nearest integer (no cents for project estimates)
  const roundedValue = Math.round(value)

  // Format with German locale (. as thousands separator, no decimals)
  const formatted = new Intl.NumberFormat('de-DE', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(roundedValue)

  // Append Euro symbol without space (German convention)
  return `${formatted}€`
}

// ============================================================================
// Duration Formatting
// ============================================================================

/**
 * Formats a duration range as German week range string
 *
 * Examples:
 * - { min: 6, max: 8 } → "6-8 Wochen"
 * - { min: 4, max: 4 } → "4 Wochen" (same min/max)
 * - { min: 1, max: 2 } → "1-2 Wochen"
 * - null/undefined → ""
 *
 * @param duration - The duration range in weeks
 * @returns German-formatted week range string
 */
export function formatDuration(duration: DurationRange | null | undefined): string {
  // Handle null, undefined, or invalid inputs gracefully
  if (!duration || duration.min === null || duration.max === null) {
    return ''
  }

  // Validate that min/max are valid numbers
  if (isNaN(duration.min) || isNaN(duration.max)) {
    return ''
  }

  // If min and max are the same, show single value
  if (duration.min === duration.max) {
    return `${duration.min} Wochen`
  }

  // Show range for different min/max
  return `${duration.min}-${duration.max} Wochen`
}

// ============================================================================
// Total Calculation
// ============================================================================

/**
 * Calculates the total sum of all breakdown item values
 *
 * Examples:
 * - [{ label: "Base", value: 5000 }, { label: "Feature", value: 1500 }] → 6500
 * - [] → 0
 * - null/undefined → 0
 *
 * @param items - Array of breakdown items to sum
 * @returns Total sum of all item values
 */
export function calculateTotal(items: BreakdownItem[] | null | undefined): number {
  // Handle null, undefined, or invalid inputs gracefully
  if (!items || !Array.isArray(items)) {
    return 0
  }

  // Sum all item values, filtering out invalid entries
  return items.reduce((total, item) => {
    // Ensure item exists and has a valid numeric value
    if (item && typeof item.value === 'number' && !isNaN(item.value)) {
      return total + item.value
    }
    return total
  }, 0)
}

// ============================================================================
// Additional Helper: Format Price Range
// ============================================================================

/**
 * Formats a price range as German-style string
 *
 * Examples:
 * - { min: 5000, max: 8000, avg: 6500 } → "5.000€ - 8.000€"
 * - { min: 12500, max: 12500, avg: 12500 } → "12.500€"
 * - null/undefined → ""
 *
 * @param range - Price range object with min and max
 * @returns Formatted price range string
 */
export function formatPriceRange(range: { min: number; max: number } | null | undefined): string {
  if (!range || range.min === null || range.max === null) {
    return ''
  }

  if (isNaN(range.min) || isNaN(range.max)) {
    return ''
  }

  // If min and max are the same, show single value
  if (range.min === range.max) {
    return formatCurrency(range.min)
  }

  // Show range for different min/max
  return `${formatCurrency(range.min)} - ${formatCurrency(range.max)}`
}
