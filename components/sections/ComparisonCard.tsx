'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ComparisonArticle } from '@/lib/types/content'

interface ComparisonCardProps {
  article: ComparisonArticle
  index: number
}

export function ComparisonCard({ article, index }: ComparisonCardProps) {
  // Determine if this is a two-item comparison (most common)
  const isTwoItemComparison = article.items.length === 2
  const totalFeatures = article.featureCategories.reduce((acc, cat) => acc + cat.features.length, 0)

  // For two-item comparisons, show split design
  if (isTwoItemComparison) {
    const [item1, item2] = article.items
    // Get first few pros for preview (max 3)
    const item1Pros = item1.pros.slice(0, 3)
    const item2Pros = item2.pros.slice(0, 3)

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <Link
          href={`/vergleiche/${article.slug}`}
          className={cn(
            'group block overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-md',
            'hover:border-primary-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl'
          )}
        >
          {/* Header with VS Badge */}
          <div className="border-b-2 border-gray-100 bg-gradient-to-r from-gray-50 to-white p-6">
            <div className="mb-3 flex items-center justify-between">
              <time className="text-sm text-gray-500" dateTime={article.publishedAt}>
                {new Date(article.publishedAt).toLocaleDateString('de-DE', {
                  year: 'numeric',
                  month: 'long',
                })}
              </time>
              <span className="text-primary-700 bg-primary-100 rounded-full px-3 py-1 text-sm font-semibold">
                {totalFeatures} Features
              </span>
            </div>
            <p className="line-clamp-2 text-sm text-gray-600">{article.description}</p>
          </div>

          {/* Split Comparison View */}
          <div className="grid grid-cols-[1fr_auto_1fr] gap-0">
            {/* Item 1 */}
            <div className="from-primary-50/50 border-r border-gray-200 bg-gradient-to-br to-white p-6">
              <h3 className="mb-4 text-xl font-bold text-gray-900">{item1.name}</h3>
              <ul className="space-y-2">
                {item1Pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="text-primary-600 mt-0.5 h-4 w-4 flex-shrink-0" />
                    <span className="line-clamp-1">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* VS Badge */}
            <div className="flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-50 px-4">
              <div className="from-primary-600 to-secondary-600 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br shadow-lg">
                <span className="text-sm font-bold text-white">VS</span>
              </div>
            </div>

            {/* Item 2 */}
            <div className="from-secondary-50/50 border-l border-gray-200 bg-gradient-to-br to-white p-6">
              <h3 className="mb-4 text-xl font-bold text-gray-900">{item2.name}</h3>
              <ul className="space-y-2">
                {item2Pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className="text-secondary-600 mt-0.5 h-4 w-4 flex-shrink-0" />
                    <span className="line-clamp-1">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Detaillierter Vergleich</span>
              <span className="text-primary-600 flex items-center gap-1 text-sm font-semibold transition-all group-hover:gap-2">
                Jetzt lesen
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    )
  }

  // For multi-item comparisons (3+), show grid design
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/vergleiche/${article.slug}`}
        className={cn(
          'group block overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-md',
          'hover:border-primary-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl'
        )}
      >
        {/* Header */}
        <div className="border-b-2 border-gray-100 bg-gradient-to-r from-gray-50 to-white p-6">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-primary-700 bg-primary-100 rounded-full px-3 py-1 text-sm font-semibold">
              {article.items.length} Optionen
            </span>
            <time className="text-sm text-gray-500" dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString('de-DE', {
                year: 'numeric',
                month: 'long',
              })}
            </time>
          </div>
          <h2 className="group-hover:text-primary-600 mb-2 text-xl font-bold text-gray-900 transition-colors">
            {article.items.map((item) => item.name).join(' vs ')}
          </h2>
          <p className="line-clamp-2 text-sm text-gray-600">{article.description}</p>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-3 gap-2 p-6">
          {article.items.map((item, i) => (
            <div
              key={i}
              className="from-primary-50/30 rounded-lg border border-gray-200 bg-gradient-to-br to-white p-3 text-center"
            >
              <span className="text-sm font-semibold text-gray-900">{item.name}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{totalFeatures} Features verglichen</span>
            <span className="text-primary-600 flex items-center gap-1 text-sm font-semibold transition-all group-hover:gap-2">
              Vergleich lesen
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
