/**
 * PriceBreakdown Component
 *
 * Displays a detailed, expandable cost breakdown in an accordion format.
 * Shows categorized costs with line items, subtotals, and a final grand total.
 *
 * Features:
 * - Accordion for compact/expanded views
 * - Category grouping with subtotals
 * - Individual line items with labels and values
 * - Formatted currency display
 * - Visual separators between categories
 */

import { Calculator } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { formatCurrency } from '@/lib/calculator/utils'
import type { BreakdownCategory } from '@/lib/calculator/types'

// ============================================================================
// Props Interface
// ============================================================================

export interface PriceBreakdownProps {
  /** Array of breakdown categories with items and subtotals */
  breakdown: BreakdownCategory[]
}

// ============================================================================
// Component
// ============================================================================

export function PriceBreakdown({ breakdown }: PriceBreakdownProps) {
  // Calculate grand total from all category subtotals
  const grandTotal = breakdown.reduce((sum, category) => sum + category.subtotal, 0)

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="breakdown">
        {/* Accordion Trigger (Calculator icon + title) */}
        <AccordionTrigger>
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            <span>Detaillierte Aufschlüsselung</span>
          </div>
        </AccordionTrigger>

        {/* Accordion Content (expandable) */}
        <AccordionContent>
          <div className="space-y-6">
            {/* Map through all breakdown categories */}
            {breakdown.map((category, categoryIndex) => (
              <div key={category.category}>
                {/* Category Name (font-semibold as per spec) */}
                <h4 className="font-semibold mb-3">{category.category}</h4>

                {/* Line Items within category (text-sm as per spec) */}
                <div className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <div
                      key={`${item.label}-${itemIndex}`}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-medium">{formatCurrency(item.value)}</span>
                    </div>
                  ))}
                </div>

                {/* Separator */}
                <div className="border-t border-gray-200 my-3" />

                {/* Category Subtotal (font-semibold as per spec) */}
                <div className="flex justify-between font-semibold">
                  <span>Zwischensumme</span>
                  <span>{formatCurrency(category.subtotal)}</span>
                </div>

                {/* Separator between categories (not after last category) */}
                {categoryIndex < breakdown.length - 1 && (
                  <div className="border-t border-gray-300 my-6" />
                )}
              </div>
            ))}

            {/* Final Grand Total Separator */}
            <div className="border-t border-gray-400 my-4" />

            {/* Grand Total (text-lg font-bold text-primary-600 as per spec) */}
            <div className="flex justify-between text-lg font-bold">
              <span>Gesamtkosten (HEADON)</span>
              <span className="text-primary-600">{formatCurrency(grandTotal)}</span>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
