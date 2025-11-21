import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

interface StatHighlightProps {
  value: string | number
  label: string
  icon?: LucideIcon
  variant?: 'primary' | 'secondary' | 'accent'
  className?: string
}

const variantStyles = {
  primary: {
    border: 'border-primary-300',
    iconBg: 'bg-primary-100',
    iconColor: 'text-primary-600',
    valueColor: 'text-primary-600',
  },
  secondary: {
    border: 'border-secondary-300',
    iconBg: 'bg-secondary-100',
    iconColor: 'text-secondary-600',
    valueColor: 'text-secondary-600',
  },
  accent: {
    border: 'border-accent-300',
    iconBg: 'bg-accent-100',
    iconColor: 'text-accent-600',
    valueColor: 'text-accent-600',
  },
}

export function StatHighlight({
  value,
  label,
  icon: Icon,
  variant = 'primary',
  className,
}: StatHighlightProps) {
  const styles = variantStyles[variant]

  return (
    <div
      className={cn(
        'rounded-xl border-2 bg-white p-6 text-center shadow-md transition-all hover:shadow-lg hover:scale-105',
        styles.border,
        className
      )}
    >
      {Icon && (
        <div className="mb-3 flex justify-center">
          <div className={cn('flex h-12 w-12 items-center justify-center rounded-lg', styles.iconBg)}>
            <Icon className={cn('h-6 w-6', styles.iconColor)} strokeWidth={2} />
          </div>
        </div>
      )}
      <div className={cn('mb-2 text-4xl font-bold', styles.valueColor)}>{value}</div>
      <div className="text-sm font-medium text-gray-600">{label}</div>
    </div>
  )
}
