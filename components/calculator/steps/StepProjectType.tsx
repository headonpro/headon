'use client'

/**
 * StepProjectType Component
 *
 * Step 1 of the cost calculator - Project type selection.
 * Displays 6 project type options with icons, descriptions, and base prices.
 * Uses staggered animations for visual appeal.
 */

import { motion } from 'framer-motion'
import { Globe, Zap, Smartphone, ShoppingCart, Target, HelpCircle } from 'lucide-react'
import { ProjectTypeCard } from '@/components/calculator/shared/ProjectTypeCard'
import type { ProjectType } from '@/lib/calculator/types'

// ============================================================================
// Type Definitions
// ============================================================================

export interface StepProjectTypeProps {
  /** Currently selected project type */
  value: ProjectType
  /** Callback when project type is selected */
  onChange: (value: ProjectType) => void
}

// ============================================================================
// Project Types Configuration
// ============================================================================

const projectTypes = [
  {
    value: 'website-simple' as const,
    label: 'Website (Corporate)',
    icon: Globe,
    description: 'Präsenz-Website mit statischen Inhalten',
  },
  {
    value: 'website-complex' as const,
    label: 'Website (Komplex)',
    icon: Zap,
    description: 'Umfangreiche Website mit dynamischen Inhalten',
  },
  {
    value: 'web-app' as const,
    label: 'Web Application',
    icon: Zap,
    description: 'Interaktive Web-Anwendung mit Backend',
  },
  {
    value: 'mobile-app' as const,
    label: 'Mobile App',
    icon: Smartphone,
    description: 'Native oder Cross-Platform Mobile App',
  },
  {
    value: 'ecommerce' as const,
    label: 'E-Commerce',
    icon: ShoppingCart,
    description: 'Online-Shop mit Payment & Bestellverwaltung',
  },
  {
    value: 'custom' as const,
    label: 'Individuelles Projekt',
    icon: Target,
    description: 'Maßgeschneiderte Lösung nach Ihren Anforderungen',
  },
] as const

// ============================================================================
// Component Implementation
// ============================================================================

export function StepProjectType({ value, onChange }: StepProjectTypeProps) {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2 text-white">
          Was möchten Sie entwickeln lassen?
        </h3>
        <p className="text-white/80">
          Wählen Sie den passenden Projekt-Typ
        </p>
      </div>

      {/* Project Type Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {projectTypes.map((type, index) => (
          <motion.div
            key={type.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProjectTypeCard
              value={type.value}
              label={type.label}
              description={type.description}
              icon={type.icon}
              selected={value === type.value}
              onClick={() => onChange(type.value)}
            />
          </motion.div>
        ))}
      </div>

      {/* Help Text */}
      <div className="mt-8 p-4 bg-white/10 border border-white/20 rounded-lg flex items-start gap-3 backdrop-blur-md">
        <HelpCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
        <div className="text-sm text-white">
          <p className="font-medium mb-1">Nicht sicher?</p>
          <p className="text-white/80">
            Wählen Sie die Kategorie, die am ehesten zu Ihrer Projektidee passt.
            Die Kostenschätzung wird live in der Übersicht rechts angezeigt
            und basierend auf Ihren Angaben in den nächsten Schritten präzisiert.
          </p>
        </div>
      </div>
    </div>
  )
}
