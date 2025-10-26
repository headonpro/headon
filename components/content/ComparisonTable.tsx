/**
 * ComparisonTable Component
 *
 * Displays feature comparison table for comparison articles.
 * Features:
 * - Mobile-responsive with horizontal scroll
 * - Visual indicators for boolean values (checkmarks/crosses)
 * - Grouped features by category
 * - Clean, readable design
 */

import React from 'react'
import Image from 'next/image'
import { Check, X } from 'lucide-react'
import type { ComparisonItem, FeatureCategory } from '@/lib/types/content'
import { cn } from '@/lib/utils'

export interface ComparisonTableProps {
  items: ComparisonItem[]
  featureCategories: FeatureCategory[]
  className?: string
}

/**
 * Render feature value with appropriate styling and icons
 */
function FeatureValue({ value }: { value: string | boolean | number }) {
  // Boolean values: Show checkmark or X
  if (typeof value === 'boolean') {
    return (
      <div className="flex items-center justify-center">
        {value ? (
          <Check className="h-5 w-5 text-green-600" aria-label="Ja" />
        ) : (
          <X className="h-5 w-5 text-red-500" aria-label="Nein" />
        )}
      </div>
    )
  }

  // String or number values: Display as text
  return <span className="text-sm text-gray-700">{value}</span>
}

/**
 * ComparisonTable Component
 *
 * Renders a feature comparison table with categories and items.
 * Mobile-responsive with horizontal scroll on small screens.
 */
export default function ComparisonTable({
  items,
  featureCategories,
  className,
}: ComparisonTableProps) {
  return (
    <div className={cn('w-full overflow-x-auto', className)}>
      <table className="w-full border-collapse overflow-hidden rounded-lg bg-white shadow-lg">
        {/* Table Header: Item Names */}
        <thead>
          <tr className="border-b-2 border-gray-300 bg-gray-100">
            <th className="sticky left-0 z-10 min-w-[200px] bg-gray-100 p-4 text-left font-semibold text-gray-900">
              Feature
            </th>
            {items.map((item, index) => (
              <th key={index} className="min-w-[180px] p-4 text-center font-semibold text-gray-900">
                <div className="flex flex-col items-center gap-2">
                  {item.logo && (
                    <Image
                      src={item.logo}
                      alt={`${item.name} logo`}
                      width={32}
                      height={32}
                      className="h-8 w-8 object-contain"
                    />
                  )}
                  <span>{item.name}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {/* Render each feature category */}
          {featureCategories.map((category, categoryIndex) => (
            <React.Fragment key={categoryIndex}>
              {/* Category Header */}
              <tr className="border-t-2 border-gray-200 bg-gray-50">
                <td
                  colSpan={items.length + 1}
                  className="p-3 text-sm font-semibold tracking-wide text-gray-800 uppercase"
                >
                  {category.category}
                </td>
              </tr>

              {/* Features in this category */}
              {category.features.map((feature, featureIndex) => (
                <tr
                  key={featureIndex}
                  className={cn(
                    'border-b border-gray-200 transition-colors hover:bg-gray-50',
                    featureIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                  )}
                >
                  {/* Feature Name */}
                  <td className="sticky left-0 z-10 bg-inherit p-4 text-sm font-medium text-gray-900">
                    {feature}
                  </td>

                  {/* Feature Values for each item */}
                  {items.map((item, itemIndex) => (
                    <td key={itemIndex} className="p-4 text-center">
                      <FeatureValue value={item.features[feature] ?? '-'} />
                    </td>
                  ))}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {/* Mobile scroll hint */}
      <p className="mt-2 text-center text-xs text-gray-500 md:hidden">
        ← Scrollen Sie horizontal für mehr Features →
      </p>
    </div>
  )
}
