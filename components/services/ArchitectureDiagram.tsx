'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Database, Server, Smartphone, Globe, Zap, Lock, Cloud, Code } from 'lucide-react'
import { LucideIcon } from 'lucide-react'

export interface DiagramNode {
  id: string
  label: string
  icon?: string
  description?: string
  color?: 'primary' | 'secondary' | 'accent' | 'gray' | 'success'
}

export interface DiagramConnection {
  from: string
  to: string
  label?: string
  bidirectional?: boolean
}

interface ArchitectureDiagramProps {
  title?: string
  description?: string
  nodes: DiagramNode[]
  connections: DiagramConnection[]
  layout?: 'horizontal' | 'vertical' | 'grid'
}

const iconMap: Record<string, LucideIcon> = {
  database: Database,
  server: Server,
  smartphone: Smartphone,
  globe: Globe,
  zap: Zap,
  lock: Lock,
  cloud: Cloud,
  code: Code,
}

const colorClasses = {
  primary: {
    border: 'border-primary-300',
    iconBg: 'bg-primary-100',
    iconColor: 'text-primary-600'
  },
  secondary: {
    border: 'border-secondary-300',
    iconBg: 'bg-secondary-100',
    iconColor: 'text-secondary-600'
  },
  accent: {
    border: 'border-accent-300',
    iconBg: 'bg-accent-100',
    iconColor: 'text-accent-600'
  },
  gray: {
    border: 'border-gray-300',
    iconBg: 'bg-gray-100',
    iconColor: 'text-gray-600'
  },
  success: {
    border: 'border-green-300',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600'
  }
}

export function ArchitectureDiagram({
  title,
  description,
  nodes,
  connections,
  layout = 'horizontal'
}: ArchitectureDiagramProps) {
  const containerClasses = {
    horizontal: 'flex flex-col md:flex-row items-center justify-center gap-8',
    vertical: 'flex flex-col items-center justify-center gap-8',
    grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8',
  }

  return (
    <div className="my-8">
      {/* Title & Description */}
      {(title || description) && (
        <div className="text-center mb-8">
          {title && <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>}
          {description && <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>}
        </div>
      )}

      {/* Diagram Container */}
      <div className={`relative ${containerClasses[layout]} p-8 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200`}>
        {/* Nodes */}
        {nodes.map((node, index) => {
          const Icon = node.icon ? iconMap[node.icon] || Code : Code
          const colors = colorClasses[node.color || 'primary']

          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: index * 0.15,
                ease: 'easeOut'
              }}
              className="group relative"
            >
              {/* Node Card */}
              <div className={`
                relative overflow-hidden rounded-xl border-2
                bg-white ${colors.border}
                p-6 min-w-[180px] max-w-[240px]
                shadow-lg hover:shadow-xl
                transition-all duration-300
              `}>
                {/* Icon */}
                <div className="flex justify-center mb-3">
                  <div className={`p-3 rounded-lg ${colors.iconBg}`}>
                    <Icon className={`h-8 w-8 ${colors.iconColor}`} />
                  </div>
                </div>

                {/* Label */}
                <h4 className="text-center text-gray-900 font-bold text-lg mb-2">
                  {node.label}
                </h4>

                {/* Description */}
                {node.description && (
                  <p className="text-center text-gray-600 text-sm">
                    {node.description}
                  </p>
                )}
              </div>

              {/* Arrow to next node (for horizontal/vertical layouts) */}
              {layout !== 'grid' && index < nodes.length - 1 && (
                <div className={`
                  absolute ${layout === 'horizontal' ? 'left-full top-1/2 -translate-y-1/2' : 'top-full left-1/2 -translate-x-1/2'}
                  ${layout === 'horizontal' ? 'ml-4' : 'mt-4'}
                  hidden md:flex items-center justify-center
                `}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.15 + 0.3 }}
                  >
                    <ArrowRight className={`
                      h-8 w-8 text-primary-500
                      ${layout === 'vertical' ? 'rotate-90' : ''}
                    `} />
                  </motion.div>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Connections Legend (if provided) */}
      {connections.length > 0 && (
        <div className="mt-4 text-center">
          <div className="inline-flex flex-wrap gap-4 justify-center text-sm text-gray-600">
            {connections.map((conn, idx) => (
              <span key={idx} className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-primary-500" />
                {conn.label && <span>{conn.label}</span>}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Simple comparison variant for A vs B scenarios
export function ComparisonDiagram({
  title,
  optionA,
  optionB,
}: {
  title?: string
  optionA: DiagramNode & { pros?: string[]; cons?: string[] }
  optionB: DiagramNode & { pros?: string[]; cons?: string[] }
}) {
  return (
    <div className="my-8">
      {title && (
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">{title}</h3>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Option A */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-xl border-2 border-primary-300 bg-white p-6 shadow-lg"
        >
          <div className="text-center mb-4">
            {optionA.icon && (
              <div className="inline-flex p-4 rounded-full bg-primary-100 mb-3">
                {(() => {
                  const Icon = iconMap[optionA.icon] || Code
                  return <Icon className="h-8 w-8 text-primary-600" />
                })()}
              </div>
            )}
            <h4 className="text-xl font-bold text-gray-900">{optionA.label}</h4>
            {optionA.description && (
              <p className="text-sm text-gray-600 mt-2">{optionA.description}</p>
            )}
          </div>

          {/* Pros */}
          {optionA.pros && optionA.pros.length > 0 && (
            <div className="mt-4">
              <h5 className="text-sm font-semibold text-green-700 mb-2">Vorteile:</h5>
              <ul className="space-y-1">
                {optionA.pros.map((pro, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Cons */}
          {optionA.cons && optionA.cons.length > 0 && (
            <div className="mt-4">
              <h5 className="text-sm font-semibold text-red-700 mb-2">Nachteile:</h5>
              <ul className="space-y-1">
                {optionA.cons.map((con, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✗</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>

        {/* Option B */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="rounded-xl border-2 border-secondary-300 bg-white p-6 shadow-lg"
        >
          <div className="text-center mb-4">
            {optionB.icon && (
              <div className="inline-flex p-4 rounded-full bg-secondary-100 mb-3">
                {(() => {
                  const Icon = iconMap[optionB.icon] || Code
                  return <Icon className="h-8 w-8 text-secondary-600" />
                })()}
              </div>
            )}
            <h4 className="text-xl font-bold text-gray-900">{optionB.label}</h4>
            {optionB.description && (
              <p className="text-sm text-gray-600 mt-2">{optionB.description}</p>
            )}
          </div>

          {/* Pros */}
          {optionB.pros && optionB.pros.length > 0 && (
            <div className="mt-4">
              <h5 className="text-sm font-semibold text-green-700 mb-2">Vorteile:</h5>
              <ul className="space-y-1">
                {optionB.pros.map((pro, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Cons */}
          {optionB.cons && optionB.cons.length > 0 && (
            <div className="mt-4">
              <h5 className="text-sm font-semibold text-red-700 mb-2">Nachteile:</h5>
              <ul className="space-y-1">
                {optionB.cons.map((con, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✗</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
