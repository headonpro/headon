import { Lightbulb, AlertTriangle, CheckCircle, Info } from 'lucide-react'
import { Card } from '@/components/ui/card'

type InfoBoxType = 'tip' | 'warning' | 'success' | 'info'

interface InfoBoxProps {
  type?: InfoBoxType
  title?: string
  children: React.ReactNode
}

const infoBoxConfig = {
  tip: {
    icon: Lightbulb,
    colors: {
      border: 'border-primary-300/40',
      bg: 'bg-primary-50/60',
      icon: 'text-primary-600',
      title: 'text-primary-900',
    },
    defaultTitle: '💡 Tipp',
  },
  warning: {
    icon: AlertTriangle,
    colors: {
      border: 'border-accent-400/50',
      bg: 'bg-accent-50/60',
      icon: 'text-accent-700',
      title: 'text-accent-900',
    },
    defaultTitle: '⚠️ Warnung',
  },
  success: {
    icon: CheckCircle,
    colors: {
      border: 'border-green-300/40',
      bg: 'bg-green-50/60',
      icon: 'text-green-600',
      title: 'text-green-900',
    },
    defaultTitle: '✅ Best Practice',
  },
  info: {
    icon: Info,
    colors: {
      border: 'border-gray-300/50',
      bg: 'bg-gray-50/60',
      icon: 'text-gray-700',
      title: 'text-gray-900',
    },
    defaultTitle: '📝 Hinweis',
  },
}

/**
 * InfoBox Component
 * Displays contextual information with different visual styles
 * Types: tip (blue), warning (yellow), success (green), info (gray)
 */
export function InfoBox({ type = 'info', title, children }: InfoBoxProps) {
  const config = infoBoxConfig[type]
  const Icon = config.icon
  const displayTitle = title || config.defaultTitle

  return (
    <Card
      className={`my-8 border-2 ${config.colors.border} ${config.colors.bg} p-6 shadow-sm`}
    >
      <div className="flex items-start gap-4">
        <Icon className={`mt-1 h-6 w-6 flex-shrink-0 ${config.colors.icon}`} />
        <div className="flex-1">
          <h4 className={`mb-2 text-lg font-semibold ${config.colors.title}`}>
            {displayTitle}
          </h4>
          <div className="prose prose-sm max-w-none text-gray-700 [&_p]:my-2 [&_p]:leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </Card>
  )
}
