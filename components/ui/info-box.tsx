import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

export type InfoBoxVariant = 'tip' | 'warning' | 'info' | 'success' | 'neutral'

interface InfoBoxProps {
  variant?: InfoBoxVariant
  icon?: LucideIcon
  title?: string
  children: React.ReactNode
  className?: string
}

const variantStyles: Record<InfoBoxVariant, string> = {
  tip: 'bg-accent-50 border-accent-600 text-accent-900',
  warning: 'bg-orange-50 border-orange-600 text-orange-900',
  info: 'bg-blue-50 border-blue-600 text-blue-900',
  success: 'bg-green-50 border-green-600 text-green-900',
  neutral: 'bg-gray-50 border-gray-600 text-gray-900',
}

const iconStyles: Record<InfoBoxVariant, string> = {
  tip: 'text-accent-600',
  warning: 'text-orange-600',
  info: 'text-blue-600',
  success: 'text-green-600',
  neutral: 'text-gray-600',
}

export function InfoBox({ variant = 'neutral', icon: Icon, title, children, className }: InfoBoxProps) {
  return (
    <div
      className={cn(
        'border-l-4 rounded-r-lg p-6 my-6',
        variantStyles[variant],
        className
      )}
    >
      <div className="flex gap-3">
        {Icon && (
          <div className="flex-shrink-0">
            <Icon className={cn('h-5 w-5', iconStyles[variant])} />
          </div>
        )}
        <div className="flex-1">
          {title && <p className="font-semibold mb-2">{title}</p>}
          <div className="text-sm leading-relaxed [&>p]:mb-0">{children}</div>
        </div>
      </div>
    </div>
  )
}
