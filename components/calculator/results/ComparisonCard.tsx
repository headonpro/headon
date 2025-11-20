/**
 * ComparisonCard Component
 *
 * Displays a single provider's cost estimate in the 3-way comparison.
 * Shows price, duration, quality stars, pros, and cons.
 * Supports highlighting for the recommended option (HEADON).
 */

import { Clock, Star, Check, AlertCircle } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { formatCurrency, formatDuration } from '@/lib/calculator/utils'
import type { ProviderEstimate } from '@/lib/calculator/types'

// ============================================================================
// Props Interface
// ============================================================================

export interface ComparisonCardProps {
  /** Provider estimate data (price, duration, quality, pros/cons) */
  provider: ProviderEstimate
  /** Whether to highlight this card (for best choice) */
  highlight?: boolean
}

// ============================================================================
// Component
// ============================================================================

export function ComparisonCard({ provider, highlight = false }: ComparisonCardProps) {
  return (
    <Card
      className={cn(
        'relative overflow-hidden backdrop-blur-md border-white/20 bg-white/10 text-white',
        highlight && 'border-white/40 border-2 shadow-xl bg-white/20'
      )}
    >
      {/* Best Choice Badge (absolute positioned) */}
      {highlight && (
        <div className="absolute top-0 right-0 bg-white/30 backdrop-blur-sm text-white px-4 py-1 text-sm font-bold">
          ⭐ BESTE WAHL
        </div>
      )}

      <CardHeader>
        {/* Provider Name (capitalized) */}
        <CardTitle className="capitalize text-white">{provider.provider}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Price Section */}
        <div>
          {/* Main Price (large) */}
          <div className="text-3xl font-bold text-white">
            {formatCurrency(provider.price.avg)}
          </div>
          {/* Price Range (small, muted) */}
          <div className="text-sm text-white/70">
            {formatCurrency(provider.price.min)} - {formatCurrency(provider.price.max)}
          </div>
        </div>

        {/* Duration with Clock Icon */}
        <div className="flex items-center gap-2 text-white/80">
          <Clock className="h-4 w-4" />
          <span>{formatDuration(provider.duration)}</span>
        </div>

        {/* Quality Stars (5 stars, filled based on quality number) */}
        <div className="flex gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={cn(
                'h-5 w-5',
                i < provider.quality
                  ? 'fill-accent-400 text-accent-400'
                  : 'text-white/30'
              )}
            />
          ))}
        </div>

        {/* Separator */}
        <div className="border-t border-white/20 my-4" />

        {/* Pros Section (check icons) */}
        {provider.pros && provider.pros.length > 0 && (
          <div className="space-y-2">
            {provider.pros.map((pro, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white/90">
                <Check className="h-4 w-4 text-secondary-400 mt-0.5 flex-shrink-0" />
                <span>{pro}</span>
              </div>
            ))}
          </div>
        )}

        {/* Cons Section (alert icons) */}
        {provider.cons && provider.cons.length > 0 && (
          <div className="space-y-2">
            {provider.cons.map((con, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white/70">
                <AlertCircle className="h-4 w-4 text-white/50 mt-0.5 flex-shrink-0" />
                <span>{con}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
