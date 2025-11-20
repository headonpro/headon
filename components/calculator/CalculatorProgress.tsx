'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CalculatorProgressProps {
  currentStep: number
  totalSteps: number
  onStepClick?: (step: number) => void
  allowBackNavigation?: boolean
  className?: string
}

const stepLabels: Record<number, string> = {
  1: 'Projekttyp wählen',
  2: 'Design & Umfang',
  3: 'Funktionen auswählen',
  4: 'Qualität & Performance',
  5: 'Timeline & Support',
  6: 'Ihr persönliches Angebot',
}

export function CalculatorProgress({
  currentStep,
  totalSteps,
  onStepClick,
  allowBackNavigation = true,
  className,
}: CalculatorProgressProps) {
  const handleStepClick = (step: number) => {
    // Only allow navigation to completed or current steps
    if (allowBackNavigation && step <= currentStep && onStepClick) {
      onStepClick(step)
    }
  }

  return (
    <div className={cn('mb-8', className)}>
      {/* Progress Indicators */}
      <div className="mb-4 flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => {
          const isCompleted = currentStep > step
          const isCurrent = currentStep === step
          const isAccessible = allowBackNavigation && step <= currentStep

          return (
            <div key={step} className="flex flex-1 items-center">
              {/* Step Circle */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{
                  scale: currentStep >= step ? 1 : 0.8,
                  backgroundColor: currentStep >= step ? '#ffffff' : 'rgba(255,255,255,0.2)',
                }}
                transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
                className={cn(
                  'flex h-12 w-12 items-center justify-center rounded-full font-bold transition-all',
                  isAccessible && 'cursor-pointer hover:scale-105',
                  currentStep >= step
                    ? 'text-primary-600 shadow-lg'
                    : 'text-white/60',
                  isCurrent && 'ring-4 ring-primary-200 ring-offset-2'
                )}
                onClick={() => handleStepClick(step)}
                whileHover={isAccessible ? { scale: 1.05 } : {}}
                whileTap={isAccessible ? { scale: 0.95 } : {}}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-7 w-7 text-primary-600" />
                ) : (
                  <span className="text-lg">{step}</span>
                )}
              </motion.div>

              {/* Connector Line */}
              {step < totalSteps && (
                <motion.div
                  className="mx-2 h-1 flex-1 overflow-hidden rounded-full bg-white/20 sm:mx-3"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: step * 0.1 }}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary-500 to-primary-400"
                    initial={{ width: '0%' }}
                    animate={{ width: currentStep > step ? '100%' : '0%' }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  />
                </motion.div>
              )}
            </div>
          )
        })}
      </div>

      {/* Step Label with Animation */}
      <div className="text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="font-medium text-white/90 text-base sm:text-lg"
          >
            {stepLabels[currentStep] || `Schritt ${currentStep}`}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Step Counter (Mobile-friendly) */}
      <div className="mt-3 text-center">
        <span className="text-sm text-white/60">
          Schritt {currentStep} von {totalSteps}
        </span>
      </div>
    </div>
  )
}
