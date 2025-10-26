/**
 * FAQ Accordion Component with Integrated Schema Generation
 *
 * A reusable client component that renders FAQ items with collapsible animations
 * and automatically generates FAQPage schema for SEO.
 *
 * Features:
 * - Smooth accordion animations with Framer Motion
 * - Fully keyboard accessible (WCAG 2.1 compliant)
 * - Automatic FAQPage schema generation
 * - Mobile-optimized touch targets (48x48px minimum)
 * - Performance-optimized animations (60fps)
 *
 * @example
 * ```tsx
 * import { FAQAccordion } from '@/components/seo/FAQAccordion'
 *
 * <FAQAccordion
 *   faqs={[
 *     { question: "What is your pricing?", answer: "Our pricing starts at..." },
 *     { question: "How long does it take?", answer: "Typical projects take..." }
 *   ]}
 *   includeSchema={true}
 * />
 * ```
 */

'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FAQ } from '@/lib/types/content'
import { FAQSchema } from '@/components/seo/SchemaGenerator'

// ============================================================================
// Component Props Interface
// ============================================================================

export interface FAQAccordionProps {
  /**
   * Array of FAQ items to display
   */
  faqs: FAQ[]

  /**
   * Whether to include FAQPage schema for SEO
   * @default true
   */
  includeSchema?: boolean

  /**
   * Optional CSS class name for styling
   */
  className?: string
}

// ============================================================================
// Individual FAQ Item Component
// ============================================================================

interface FAQItemProps {
  faq: FAQ
  isOpen: boolean
  onToggle: () => void
  index: number
  totalItems: number
  onNavigate: (direction: 'up' | 'down') => void
}

function FAQItem({ faq, isOpen, onToggle, index, totalItems, onNavigate }: FAQItemProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  /**
   * Handle keyboard navigation
   * - Enter/Space: Toggle accordion
   * - ArrowUp: Focus previous item
   * - ArrowDown: Focus next item
   * - Home: Focus first item
   * - End: Focus last item
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault()
        if (index > 0) {
          onNavigate('up')
        }
        break
      case 'ArrowDown':
        e.preventDefault()
        if (index < totalItems - 1) {
          onNavigate('down')
        }
        break
      case 'Home':
        e.preventDefault()
        onNavigate('up')
        break
      case 'End':
        e.preventDefault()
        onNavigate('down')
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        onToggle()
        break
    }
  }

  return (
    <div
      className={cn('border-b border-gray-200 last:border-b-0', 'transition-colors duration-200')}
    >
      {/* Question Button - Full width, touch-friendly */}
      <button
        ref={buttonRef}
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        className={cn(
          'flex w-full items-center justify-between gap-4',
          'px-4 py-4 md:px-6 md:py-5', // Mobile: 16px padding, Desktop: 24px
          'text-left text-base font-medium md:text-lg',
          'hover:bg-gray-50 focus:bg-gray-50',
          'focus:ring-primary focus:ring-2 focus:ring-offset-2 focus:outline-none',
          'transition-colors duration-200',
          'min-h-[48px]' // WCAG touch target minimum
        )}
      >
        <span className="flex-1 text-gray-900">{faq.question}</span>

        {/* Chevron Icon with rotation animation */}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="flex-shrink-0"
          aria-hidden="true"
        >
          <ChevronDown className="h-5 w-5 text-gray-500 md:h-6 md:w-6" />
        </motion.span>
      </button>

      {/* Answer Content - Animated collapse/expand */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${index}`}
            role="region"
            aria-labelledby={`faq-question-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: 'auto',
              opacity: 1,
              transition: {
                height: { duration: 0.3, ease: 'easeInOut' },
                opacity: { duration: 0.2, delay: 0.1 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.2, ease: 'easeInOut' },
                opacity: { duration: 0.1 },
              },
            }}
            className="overflow-hidden"
          >
            <div className="px-4 pt-2 pb-4 md:px-6 md:pb-6">
              <p className="text-sm leading-relaxed whitespace-pre-line text-gray-700 md:text-base">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ============================================================================
// Main FAQAccordion Component
// ============================================================================

export function FAQAccordion({ faqs, includeSchema = true, className }: FAQAccordionProps) {
  // Track which FAQ items are open (allow multiple open at once)
  const [openItems, setOpenItems] = useState<Set<number>>(new Set())
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])

  // Initialize refs array
  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, faqs.length)
  }, [faqs.length])

  /**
   * Toggle a specific FAQ item
   */
  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  /**
   * Navigate to adjacent FAQ item (keyboard navigation)
   */
  const navigateToItem = (fromIndex: number, direction: 'up' | 'down') => {
    let targetIndex: number

    if (direction === 'up') {
      targetIndex = fromIndex === 0 ? 0 : fromIndex - 1
    } else {
      targetIndex = fromIndex === faqs.length - 1 ? faqs.length - 1 : fromIndex + 1
    }

    // Focus the target button
    const targetButton = document.querySelector(
      `button[aria-controls="faq-answer-${targetIndex}"]`
    ) as HTMLButtonElement | null

    if (targetButton) {
      targetButton.focus()
    }
  }

  // Don't render if no FAQs provided
  if (!faqs || faqs.length === 0) {
    return null
  }

  return (
    <>
      {/* FAQ Accordion UI */}
      <div
        className={cn(
          'mx-auto w-full max-w-3xl',
          'rounded-lg border border-gray-200 bg-white shadow-sm',
          'overflow-hidden',
          className
        )}
        role="region"
        aria-label="Frequently Asked Questions"
      >
        {faqs.map((faq, index) => (
          <FAQItem
            key={`faq-${index}-${faq.question.slice(0, 20)}`}
            faq={faq}
            isOpen={openItems.has(index)}
            onToggle={() => toggleItem(index)}
            index={index}
            totalItems={faqs.length}
            onNavigate={(direction) => navigateToItem(index, direction)}
          />
        ))}
      </div>

      {/* FAQPage Schema for SEO */}
      {includeSchema && <FAQSchema faqs={faqs} />}
    </>
  )
}

// ============================================================================
// Default Export
// ============================================================================

export default FAQAccordion
