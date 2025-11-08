import StatsSection from '@/components/sections/StatsSection'

interface BlogStat {
  value: number | string
  label: string
  suffix?: string
  unit?: string
}

interface BlogStatsProps {
  stats: BlogStat[]
  title?: string
  description?: string
  compact?: boolean
}

/**
 * BlogStats Component
 * Optimized wrapper for StatsSection in blog posts
 * Uses compact layout with subtle styling for better reading flow
 */
export function BlogStats({ stats, title, description, compact = true }: BlogStatsProps) {
  return (
    <div className="-mx-4 my-12 sm:mx-0">
      <StatsSection
        stats={stats}
        title={title}
        description={description}
        includeSchema={false}
        className={compact ? 'bg-gradient-to-br from-gray-50 to-white py-12' : undefined}
      />
    </div>
  )
}
