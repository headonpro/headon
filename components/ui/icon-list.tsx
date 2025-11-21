import { cn } from '@/lib/utils'
import { CheckCircle2, LucideIcon } from 'lucide-react'

interface IconListProps {
  items: string[]
  icon?: LucideIcon
  iconColor?: string
  variant?: 'default' | 'compact'
  className?: string
}

export function IconList({
  items,
  icon: Icon = CheckCircle2,
  iconColor = 'text-primary-600',
  variant = 'default',
  className,
}: IconListProps) {
  return (
    <ul className={cn('space-y-3 my-6', variant === 'compact' && 'space-y-2', className)}>
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-3">
          <Icon className={cn('h-5 w-5 flex-shrink-0 mt-0.5', iconColor)} />
          <span className={cn('text-gray-700 leading-relaxed', variant === 'compact' && 'text-sm')}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  )
}
