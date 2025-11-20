'use client'

/**
 * CostCalculator - Main Container Component
 *
 * Central state container and orchestrator for the 6-step calculator flow.
 * Manages all user selections, step navigation, and calculation triggering.
 *
 * Features:
 * - Centralized state management with useState
 * - Step navigation (forward/backward)
 * - Automatic comparison calculation on step 6
 * - Animated step transitions with AnimatePresence
 * - Responsive layout with sticky price preview
 * - Step component rendering via useMemo
 * - Umami analytics tracking for conversion funnel analysis
 */

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { CalculatorProgress } from './CalculatorProgress'
import { PricePreview } from './PricePreview'
import { calculateComparison, calculateBreakdown } from '@/lib/calculator/calculator-engine'
import type { CalculatorState, ComparisonResult } from '@/lib/calculator/types'
import { cn } from '@/lib/utils'

// Step Components
import {
  StepProjectType,
  StepDesignScope,
  StepFeatures,
  StepQuality,
  StepTimeline,
} from './steps'

// Result Components
import { ComparisonGrid, SavingsHighlight, PriceBreakdown, LeadCaptureDialog } from './results'

// ============================================================================
// Analytics Tracking Utilities
// ============================================================================

/**
 * Track calculator event with page variant
 * Uses global Umami type definitions from types/umami.d.ts
 */
function trackCalculatorEvent(
  eventName: string,
  eventData: Record<string, string | number | boolean | undefined> = {}
) {
  if (typeof window !== 'undefined' && window.umami?.track) {
    try {
      window.umami.track(eventName, {
        ...eventData,
        page: window.location.pathname,
      })
    } catch (error) {
      // Silently fail - don't block UI on analytics errors
      console.debug('Analytics tracking error:', error)
    }
  }
}

// ============================================================================
// Default State
// ============================================================================

/**
 * Default calculator state with minimal values (lowest possible cost)
 * Only projectType is pre-selected, all other options at minimum level
 */
const defaultCalculatorState: CalculatorState = {
  projectType: 'website-simple',

  design: {
    level: 'template',
    pageRange: '1-5',
    responsiveness: 'responsive',
    uxComplexity: 'standard',
  },

  features: {
    cms: false,
    auth: false,
    database: false,
    payment: false,
    api: false,
    thirdPartyIntegrations: false,
    fileUploads: false,
    i18n: false,
    adminDashboard: false,
    realtime: false,
  },

  quality: {
    seo: 'none',
    performance: 'standard',
    security: 'ssl-only',
    dsgvo: false,
    testing: 'none',
    accessibility: 'none',
  },

  timeline: {
    projectStart: 'normal',
    maintenance: 'none',
    support: 'none',
    hosting: false,
    training: false,
  },

  currentStep: 1,
}

// ============================================================================
// Component Props
// ============================================================================

interface CostCalculatorProps {
  /**
   * Optional CSS class name for custom styling
   */
  className?: string
}

// ============================================================================
// Main Component
// ============================================================================

export function CostCalculator({ className }: CostCalculatorProps) {
  // State Management
  const [state, setState] = useState<CalculatorState>(defaultCalculatorState)
  const [comparison, setComparison] = useState<ComparisonResult | null>(null)

  const totalSteps = 6

  // ============================================================================
  // Navigation Handlers
  // ============================================================================

  const handleNext = () => {
    if (state.currentStep < totalSteps) {
      // Track step completion
      trackCalculatorEvent('calculator-step-completed', {
        step: state.currentStep,
        nextStep: state.currentStep + 1,
      })

      setState((prev) => ({
        ...prev,
        currentStep: prev.currentStep + 1,
      }))
    }
  }

  const handlePrev = () => {
    if (state.currentStep > 1) {
      setState((prev) => ({
        ...prev,
        currentStep: prev.currentStep - 1,
      }))
    }
  }

  const handleStepClick = (step: number) => {
    // Only allow navigation to visited steps (step <= currentStep)
    if (step <= state.currentStep && step >= 1 && step <= totalSteps) {
      setState((prev) => ({
        ...prev,
        currentStep: step,
      }))
    }
  }

  // ============================================================================
  // State Update Handlers
  // ============================================================================

  const updateState = (updates: Partial<CalculatorState>) => {
    setState((prev) => ({
      ...prev,
      ...updates,
    }))
  }

  // ============================================================================
  // Comparison Calculation (Step 6)
  // ============================================================================

  useEffect(() => {
    if (state.currentStep === 6) {
      // Calculate comparison when reaching step 6
      const result = calculateComparison(state)
      setComparison(result)

      // Track result view with project details
      trackCalculatorEvent('calculator-result-viewed', {
        projectType: state.projectType,
        estimatedPrice: result.headon.price.avg,
        headonPrice: result.headon.price.avg,
        freelancerPrice: result.freelancer.price.avg,
        agencyPrice: result.agency.price.avg,
      })
    }
  }, [state, state.currentStep])

  // ============================================================================
  // Abandoned Tracking
  // ============================================================================

  useEffect(() => {
    // Track when user abandons calculator before completion
    const handleBeforeUnload = () => {
      if (state.currentStep < 6) {
        trackCalculatorEvent('calculator-abandoned', {
          lastStep: state.currentStep,
          projectType: state.projectType,
        })
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [state.currentStep, state.projectType])

  // ============================================================================
  // Step Component Rendering
  // ============================================================================

  const currentStepComponent = useMemo(() => {
    switch (state.currentStep) {
      case 1:
        return (
          <StepProjectType value={state.projectType} onChange={(projectType) => updateState({ projectType })} />
        )

      case 2:
        return (
          <StepDesignScope
            designLevel={state.design.level}
            pageRange={state.design.pageRange}
            responsiveness={state.design.responsiveness}
            uxComplexity={state.design.uxComplexity}
            onChange={updateState}
          />
        )

      case 3:
        return <StepFeatures features={state.features} onChange={(features) => updateState({ features })} />

      case 4:
        return <StepQuality quality={state.quality} onChange={(quality) => updateState({ quality })} />

      case 5:
        return <StepTimeline timeline={state.timeline} onChange={(timeline) => updateState({ timeline })} />

      case 6:
        return comparison ? (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                Ihr persönliches Angebot
              </h3>
              <p className="text-white/70">
                Vergleichen Sie Preise und fordern Sie ein Angebot an
              </p>
            </div>

            {/* Savings Highlight */}
            <SavingsHighlight savings={comparison.savings} />

            {/* Price Comparison Grid */}
            <ComparisonGrid comparison={comparison} />

            {/* Price Breakdown */}
            <PriceBreakdown breakdown={calculateBreakdown(state)} />

            {/* Lead Capture Dialog */}
            <LeadCaptureDialog
              state={state}
              comparison={comparison}
              onSubmit={async (leadData) => {
                try {
                  // Call API to save lead
                  const response = await fetch('/api/calculator', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      ...leadData,
                      calculatorState: state,
                      comparison,
                    }),
                  })

                  if (!response.ok) {
                    throw new Error('Lead submission failed')
                  }

                  // Track successful lead capture
                  trackCalculatorEvent('calculator-lead-captured', {
                    provider: leadData.preferredProvider,
                    estimatedPrice: comparison.headon.price.avg,
                  })
                } catch (error) {
                  console.error('Lead submission error:', error)
                  throw error
                }
              }}
            />
          </div>
        ) : (
          <div className="text-center text-white/60">Berechnung läuft...</div>
        )

      default:
        return null
    }
  }, [state, comparison])

  // ============================================================================
  // Validation
  // ============================================================================

  const isCurrentStepValid = () => {
    // Placeholder validation - will be enhanced when step components are implemented
    return true
  }

  const canGoNext = state.currentStep < totalSteps && isCurrentStepValid()
  const canGoPrev = state.currentStep > 1

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <div className={cn('w-full', className)}>
      {/* Progress Indicator */}
      <CalculatorProgress
        currentStep={state.currentStep}
        totalSteps={totalSteps}
        onStepClick={handleStepClick}
        allowBackNavigation={true}
      />

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Calculator Form */}
        <div className="flex-1 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={state.currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="min-h-[400px]"
            >
              {currentStepComponent}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 gap-4">
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={handlePrev}
              disabled={!canGoPrev}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Zurück
            </Button>

            <Button
              type="button"
              size="lg"
              onClick={handleNext}
              disabled={!canGoNext}
              className="gap-2"
            >
              {state.currentStep === totalSteps ? 'Abschließen' : 'Weiter'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Price Preview Sidebar (Desktop only, hidden on step 6) */}
        {state.currentStep < 6 && (
          <div className="hidden lg:block lg:w-96 flex-shrink-0">
            <PricePreview state={state} />
          </div>
        )}
      </div>
    </div>
  )
}

// ============================================================================
// Export Analytics Helper for Child Components
// ============================================================================

/**
 * Export tracking function for use in child components
 * (StepFeatures, LeadCaptureDialog, etc.)
 *
 * Usage examples:
 * - trackCalculatorEvent('calculator-feature-selected', { feature: 'cms', enabled: true })
 * - trackCalculatorEvent('calculator-lead-captured', { provider: 'headon', leadScore: 45, estimatedValue: 15000 })
 */
export { trackCalculatorEvent }
