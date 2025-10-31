import { CheckCircle2 } from 'lucide-react'
import { Card } from '@/components/ui/card'

interface KeyTakeaway {
  text: string
  highlight?: boolean
}

interface KeyTakeawaysProps {
  items: string[] | KeyTakeaway[]
  title?: string
}

/**
 * Key Takeaways Component
 * SEO-optimized summary box for featured snippets
 * Shows main points with icons in an attractive card layout
 */
export function KeyTakeaways({ items, title = '🎯 Key Takeaways' }: KeyTakeawaysProps) {
  // Normalize items to KeyTakeaway format
  const takeaways: KeyTakeaway[] = items.map((item) =>
    typeof item === 'string' ? { text: item, highlight: false } : item
  )

  return (
    <Card className="my-12 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-8">
      <h3 className="mb-6 text-2xl font-bold text-gray-900">{title}</h3>
      <ul className="space-y-4">
        {takeaways.map((takeaway, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckCircle2
              className={`mt-1 h-6 w-6 flex-shrink-0 ${
                takeaway.highlight ? 'text-primary' : 'text-primary/70'
              }`}
            />
            <span
              className={`text-lg leading-relaxed ${
                takeaway.highlight ? 'font-semibold text-gray-900' : 'text-gray-800'
              }`}
            >
              {takeaway.text}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
