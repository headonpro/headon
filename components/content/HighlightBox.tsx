'use client'

import { LucideIcon, Info, AlertCircle, CheckCircle, Zap } from 'lucide-react'
import { ReactNode } from 'react'

interface HighlightBoxProps {
  children: ReactNode
  variant?: 'info' | 'success' | 'warning' | 'primary'
  icon?: LucideIcon
  className?: string
}

const variantStyles = {
  info: {
    bg: 'bg-blue-50/50',
    border: 'border-l-blue-600',
    text: 'text-blue-900',
    iconColor: 'text-blue-600',
    icon: Info,
  },
  success: {
    bg: 'bg-green-50/50',
    border: 'border-l-green-600',
    text: 'text-green-900',
    iconColor: 'text-green-600',
    icon: CheckCircle,
  },
  warning: {
    bg: 'bg-orange-50/50',
    border: 'border-l-orange-600',
    text: 'text-orange-900',
    iconColor: 'text-orange-600',
    icon: AlertCircle,
  },
  primary: {
    bg: 'bg-primary-50/50',
    border: 'border-l-primary-600',
    text: 'text-gray-900',
    iconColor: 'text-primary-600',
    icon: Zap,
  },
}

/**
 * Highlight Box Component
 * Visually emphasizes important content sections with colored background and border
 */
export function HighlightBox({
  children,
  variant = 'primary',
  icon,
  className = '',
}: HighlightBoxProps) {
  const styles = variantStyles[variant]
  const Icon = icon || styles.icon

  return (
    <div
      className={`my-8 rounded-lg border-l-4 ${styles.border} ${styles.bg} p-6 ${className}`}
    >
      <div className="flex items-start gap-4">
        {Icon && (
          <div className="flex-shrink-0 pt-1">
            <Icon className={`h-6 w-6 ${styles.iconColor}`} />
          </div>
        )}
        <div className={`flex-1 ${styles.text}`}>{children}</div>
      </div>
    </div>
  )
}

/**
 * Stat Highlight Component
 * Emphasizes numerical statistics with large, colored typography
 */
interface StatHighlightProps {
  value: string | number
  label: string
  icon?: LucideIcon
  suffix?: string
  prefix?: string
  variant?: 'primary' | 'success' | 'info'
  inline?: boolean
}

const statVariantStyles = {
  primary: 'text-primary-600',
  success: 'text-green-600',
  info: 'text-blue-600',
}

export function StatHighlight({
  value,
  label,
  icon: Icon,
  suffix = '',
  prefix = '',
  variant = 'primary',
  inline = false,
}: StatHighlightProps) {
  if (inline) {
    return (
      <span
        className={`inline-flex items-baseline gap-1 font-bold ${statVariantStyles[variant]}`}
      >
        {Icon && <Icon className="h-5 w-5" />}
        <span className="text-3xl">
          {prefix}
          {value}
          {suffix}
        </span>
      </span>
    )
  }

  return (
    <div className="my-6 text-center">
      {Icon && (
        <Icon className={`mx-auto mb-2 h-8 w-8 ${statVariantStyles[variant]}`} />
      )}
      <div className={`text-5xl font-bold ${statVariantStyles[variant]}`}>
        {prefix}
        {value}
        {suffix}
      </div>
      <div className="mt-2 text-sm font-medium text-gray-600">{label}</div>
    </div>
  )
}
