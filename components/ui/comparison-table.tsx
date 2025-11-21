import { cn } from '@/lib/utils'
import { CheckCircle2, XCircle, Star } from 'lucide-react'

export interface ComparisonColumn {
  name: string
  price: string
  pros: string[]
  cons: string[]
  highlight?: boolean
  badge?: string
}

interface ComparisonTableProps {
  columns: ComparisonColumn[]
  className?: string
}

export function ComparisonTable({ columns, className }: ComparisonTableProps) {
  return (
    <div className={cn('grid gap-6 my-8', `md:grid-cols-${columns.length}`, className)}>
      {columns.map((column, idx) => (
        <div
          key={idx}
          className={cn(
            'rounded-xl border-2 bg-white p-6 shadow-md transition-all hover:shadow-lg',
            column.highlight
              ? 'border-primary-500 ring-2 ring-primary-200 scale-105'
              : 'border-gray-200'
          )}
        >
          {/* Header */}
          <div className="mb-6 text-center">
            {column.badge && (
              <div className="mb-3 inline-flex items-center gap-1 bg-accent-100 text-accent-700 px-3 py-1 rounded-full text-xs font-semibold">
                <Star className="h-3 w-3" />
                {column.badge}
              </div>
            )}
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{column.name}</h3>
            <div className="text-3xl font-bold text-primary-600">{column.price}</div>
          </div>

          {/* Pros */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
              Vorteile
            </h4>
            <ul className="space-y-2">
              {column.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="h-4 w-4 text-accent-600 flex-shrink-0 mt-0.5" />
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          {column.cons.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
                Nachteile
              </h4>
              <ul className="space-y-2">
                {column.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <XCircle className="h-4 w-4 text-gray-500 flex-shrink-0 mt-0.5" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
