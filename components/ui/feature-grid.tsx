import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'

export interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

interface FeatureGridProps {
  features: Feature[]
  columns?: 2 | 3 | 4
  variant?: 'default' | 'glassmorphism'
  className?: string
}

export function FeatureGrid({ features, columns = 3, variant = 'default', className }: FeatureGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }

  const variantStyles = {
    default: {
      card: 'rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-primary-300',
      title: 'text-gray-900',
      description: 'text-gray-600',
    },
    glassmorphism: {
      card: 'rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm p-6 shadow-lg transition-all hover:shadow-xl hover:border-white/30 hover:bg-white/15',
      title: 'text-white',
      description: 'text-white/90',
    },
  }

  const styles = variantStyles[variant]

  return (
    <div className={cn('grid gap-6 my-8', gridCols[columns], className)}>
      {features.map((feature, idx) => (
        <div key={idx} className={styles.card}>
          <div className="mb-4 mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500 text-white shadow-lg">
            <feature.icon className="h-6 w-6" strokeWidth={2} />
          </div>
          <h3 className={cn('mb-2 text-lg font-semibold text-center', styles.title)}>{feature.title}</h3>
          <p className={cn('text-sm leading-relaxed text-center', styles.description)}>{feature.description}</p>
        </div>
      ))}
    </div>
  )
}
