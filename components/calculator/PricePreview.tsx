'use client'

/**
 * PricePreview Component
 *
 * Sticky sidebar displaying real-time cost preview during calculator flow.
 * Updates reactively as user makes selections in steps 1-5.
 *
 * Features:
 * - Animated price counter with range display
 * - Duration estimate with icon
 * - Detailed cost breakdown by category
 * - Memoized calculations for performance
 * - Sticky positioning for persistent visibility
 */

import { useMemo } from 'react'
import { Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PriceCounter } from '@/components/calculator/shared/PriceCounter'
import { calculateHeadonEstimate, calculateBreakdown } from '@/lib/calculator/calculator-engine'
import { formatDuration, formatCurrency } from '@/lib/calculator/utils'
import type { CalculatorState } from '@/lib/calculator/types'
import { cn } from '@/lib/utils'

// ============================================================================
// Component Props
// ============================================================================

interface PricePreviewProps {
  /**
   * Current calculator state with all user selections
   */
  state: CalculatorState

  /**
   * Optional CSS class name for custom styling
   */
  className?: string
}

// ============================================================================
// Component Implementation
// ============================================================================

export function PricePreview({ state, className }: PricePreviewProps) {
  // Memoize expensive calculations to prevent unnecessary recalculations
  // Only recalculates when state changes
  const estimate = useMemo(() => {
    return calculateHeadonEstimate(state)
  }, [state])

  const breakdown = useMemo(() => {
    return calculateBreakdown(state)
  }, [state])

  return (
    <div className={cn('sticky top-24 space-y-6', className)}>
      <Card className="!bg-white/10 !backdrop-blur-lg !border-white/20 !text-white">
        <CardHeader>
          <CardTitle className="!text-xl !text-white">Geschätzte Kosten</CardTitle>
          <p className="!text-sm !text-white/70">
            Ihre persönliche Kostenschätzung
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Animated Price Counter */}
          <div className="space-y-2">
            <PriceCounter
              value={estimate.price.avg}
              range={{
                min: estimate.price.min,
                max: estimate.price.max,
                avg: estimate.price.avg,
              }}
              className="text-center"
            />
          </div>

          {/* Duration Estimate */}
          <div className="flex items-center justify-center gap-2 !text-white/80">
            <Clock className="h-4 w-4" />
            <span className="!text-sm font-medium">
              {formatDuration(estimate.duration)}
            </span>
          </div>

          {/* Divider */}
          <div className="border-t !border-white/20" />

          {/* Cost Breakdown */}
          <div className="space-y-4">
            <h4 className="!text-sm font-semibold !text-white">
              Aufschlüsselung:
            </h4>

            <div className="space-y-3">
              {breakdown.map((category) => (
                <div key={category.category} className="space-y-2">
                  {/* Category Header */}
                  <h5 className="!text-xs font-medium !text-white/60 uppercase tracking-wide">
                    {category.category}
                  </h5>

                  {/* Category Items */}
                  <div className="space-y-1.5">
                    {category.items.map((item, index) => (
                      <div
                        key={`${category.category}-${index}`}
                        className="flex justify-between items-center !text-sm"
                      >
                        <span className="!text-white/70">
                          {item.label}
                        </span>
                        <span className="font-medium !text-white">
                          {formatCurrency(item.value)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Category Subtotal */}
                  {category.items.length > 1 && (
                    <>
                      <div className="mt-2 border-t !border-white/20 pt-2" />
                      <div className="flex justify-between items-center !text-sm font-semibold">
                        <span className="!text-white">Zwischensumme</span>
                        <span className="!text-white">
                          {formatCurrency(category.subtotal)}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Final Total (if multiple categories) */}
          {breakdown.length > 1 && (
            <>
              <div className="border-t-2 !border-white/30" />
              <div className="flex justify-between items-center">
                <span className="!text-base font-bold !text-white">
                  Gesamtkosten
                </span>
                <span className="!text-lg font-bold !text-white">
                  {formatCurrency(estimate.price.avg)}
                </span>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Info Box */}
      <Card className="!bg-white/10 !backdrop-blur-lg !border-white/20 !text-white">
        <CardContent className="pt-6">
          <p className="!text-xs !text-white/90 leading-relaxed">
            💡 <strong>Hinweis:</strong> Dies ist eine automatische Schätzung
            basierend auf Ihren Angaben. Für ein verbindliches Angebot
            kontaktieren Sie uns bitte nach Abschluss.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
