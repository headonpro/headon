/**
 * ComparisonGrid Component
 *
 * Displays the 3-way provider comparison in a responsive layout:
 * - Desktop: 3-column grid
 * - Mobile: Tabs for better touch interaction
 *
 * Highlights the HEADON option as the recommended choice.
 */

'use client'

import { useState, useEffect } from 'react'
import { ComparisonCard } from './ComparisonCard'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import type { ComparisonResult } from '@/lib/calculator/types'

// ============================================================================
// Props Interface
// ============================================================================

export interface ComparisonGridProps {
  /** Complete 3-way comparison result */
  comparison: ComparisonResult
  /** Optional: force mobile view (for testing or manual control) */
  isMobile?: boolean
}

// ============================================================================
// Mobile Detection Hook
// ============================================================================

/**
 * Custom hook to detect mobile viewport
 * Uses window.innerWidth with 768px breakpoint (Tailwind md breakpoint)
 */
function useIsMobile(forceMobile?: boolean): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // If forceMobile prop is provided, use it
    if (forceMobile !== undefined) {
      setIsMobile(forceMobile)
      return
    }

    // Check initial viewport size
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // 768px = Tailwind md breakpoint
    }

    // Check on mount
    checkMobile()

    // Add resize listener
    window.addEventListener('resize', checkMobile)

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile)
  }, [forceMobile])

  return isMobile
}

// ============================================================================
// Component
// ============================================================================

export function ComparisonGrid({ comparison, isMobile: forceMobile }: ComparisonGridProps) {
  const isMobile = useIsMobile(forceMobile)

  // Mobile View: Tabs (better for touch devices)
  if (isMobile) {
    return (
      <Tabs defaultValue="headon" className="w-full">
        {/* Tab Triggers (3 buttons) */}
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="freelancer">Freelancer</TabsTrigger>
          <TabsTrigger value="agency">Agentur</TabsTrigger>
          <TabsTrigger value="headon">HEADON</TabsTrigger>
        </TabsList>

        {/* Tab Content Panels */}
        <TabsContent value="freelancer" className="mt-6">
          <ComparisonCard provider={comparison.freelancer} />
        </TabsContent>

        <TabsContent value="agency" className="mt-6">
          <ComparisonCard provider={comparison.agency} />
        </TabsContent>

        <TabsContent value="headon" className="mt-6">
          <ComparisonCard provider={comparison.headon} highlight />
        </TabsContent>
      </Tabs>
    )
  }

  // Desktop View: 3-column grid
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* Freelancer Card */}
      <ComparisonCard provider={comparison.freelancer} />

      {/* Agency Card */}
      <ComparisonCard provider={comparison.agency} />

      {/* HEADON Card (highlighted as best choice) */}
      <ComparisonCard provider={comparison.headon} highlight />
    </div>
  )
}
