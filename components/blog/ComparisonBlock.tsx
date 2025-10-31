import { CheckCircle2, XCircle, Zap, TrendingUp } from 'lucide-react'
import { Card } from '@/components/ui/card'

interface ComparisonItem {
  text: string
  icon?: 'check' | 'x' | 'zap' | 'trend'
}

interface ComparisonSide {
  title: string
  items: (string | ComparisonItem)[]
  type?: 'positive' | 'negative' | 'neutral'
}

interface ComparisonBlockProps {
  left: ComparisonSide
  right: ComparisonSide
  title?: string
}

const iconMap = {
  check: CheckCircle2,
  x: XCircle,
  zap: Zap,
  trend: TrendingUp,
}

const typeConfig = {
  positive: {
    border: 'border-secondary-300/40',
    bg: 'bg-secondary-50/60',
    icon: 'text-secondary-600',
    title: 'text-secondary-900',
    defaultIcon: 'check' as const,
  },
  negative: {
    border: 'border-primary-300/40',
    bg: 'bg-primary-50/60',
    icon: 'text-primary-700',
    title: 'text-primary-900',
    defaultIcon: 'x' as const,
  },
  neutral: {
    border: 'border-gray-300/50',
    bg: 'bg-gray-50/60',
    icon: 'text-gray-700',
    title: 'text-gray-900',
    defaultIcon: 'zap' as const,
  },
}

/**
 * ComparisonBlock Component
 * Side-by-side comparison with visual differentiation
 * Perfect for pros/cons, before/after, feature comparisons
 */
export function ComparisonBlock({ left, right, title }: ComparisonBlockProps) {
  const renderSide = (side: ComparisonSide) => {
    const config = typeConfig[side.type || 'neutral']
    const defaultIcon = config.defaultIcon

    // Normalize items
    const items: ComparisonItem[] = side.items.map((item) =>
      typeof item === 'string' ? { text: item, icon: defaultIcon } : item
    )

    return (
      <Card className={`border-2 ${config.border} ${config.bg} p-6 shadow-sm`}>
        <h3 className={`mb-4 text-xl font-bold ${config.title}`}>{side.title}</h3>
        <ul className="space-y-3">
          {items.map((item, index) => {
            const Icon = iconMap[item.icon || defaultIcon]
            return (
              <li key={index} className="flex items-start gap-3">
                <Icon className={`mt-0.5 h-5 w-5 flex-shrink-0 ${config.icon}`} />
                <span className="text-gray-800 leading-relaxed">{item.text}</span>
              </li>
            )
          })}
        </ul>
      </Card>
    )
  }

  return (
    <div className="my-12">
      {title && <h3 className="mb-6 text-2xl font-bold text-gray-900">{title}</h3>}
      <div className="grid gap-6 md:grid-cols-2">
        {renderSide(left)}
        {renderSide(right)}
      </div>
    </div>
  )
}
