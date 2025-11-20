'use client'

/**
 * PriceCounter Component
 *
 * Animated number counter that smoothly transitions between price values.
 * Used in the live price preview to create a dynamic, engaging user experience.
 *
 * Features:
 * - Smooth animation from previous to new value over 1 second
 * - German-formatted Euro currency display
 * - Optional price range display below main price
 * - Debounced for rapid value changes
 * - Memory-safe with proper cleanup
 */

import { useEffect, useRef, useState } from 'react'
import { formatCurrency, formatPriceRange } from '@/lib/calculator/utils'
import type { PriceRange } from '@/lib/calculator/types'

// ============================================================================
// Component Props
// ============================================================================

interface PriceCounterProps {
  /**
   * The current price value to display
   */
  value: number

  /**
   * Optional price range to display below main price
   * Shows as "min€ - max€" in German formatting
   */
  range?: PriceRange | null

  /**
   * Optional CSS class name for styling
   */
  className?: string
}

// ============================================================================
// Animation Configuration
// ============================================================================

const ANIMATION_DURATION = 1000 // 1 second total
const ANIMATION_FPS = 60 // 60 frames per second
const FRAME_DURATION = 1000 / ANIMATION_FPS // ~16.67ms per frame
const DEBOUNCE_DELAY = 100 // Wait 100ms before starting animation

// ============================================================================
// Component Implementation
// ============================================================================

export function PriceCounter({ value, range, className }: PriceCounterProps) {
  // State: Currently displayed value (animated)
  const [displayedValue, setDisplayedValue] = useState(value)

  // Refs: Track previous value and active timers
  const previousValueRef = useRef(value)
  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // ============================================================================
  // Animation Effect
  // ============================================================================

  useEffect(() => {
    // If value hasn't changed, do nothing
    if (value === previousValueRef.current) {
      return
    }

    // Clear any existing debounce timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }

    // Clear any existing animation interval
    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current)
    }

    // Update previousValueRef immediately to prevent double-counting
    previousValueRef.current = value

    // Debounce: Wait before starting animation to handle rapid changes
    debounceTimeoutRef.current = setTimeout(() => {
      const startValue = displayedValue
      const endValue = value
      const difference = endValue - startValue

      // Calculate how many frames we need
      const totalFrames = Math.ceil(ANIMATION_DURATION / FRAME_DURATION)
      const increment = difference / totalFrames

      let currentFrame = 0

      // Start animation interval
      animationIntervalRef.current = setInterval(() => {
        currentFrame++

        if (currentFrame >= totalFrames) {
          // Animation complete - set final value and cleanup
          setDisplayedValue(endValue)

          if (animationIntervalRef.current) {
            clearInterval(animationIntervalRef.current)
            animationIntervalRef.current = null
          }
        } else {
          // Continue animation - update displayed value
          setDisplayedValue(startValue + increment * currentFrame)
        }
      }, FRAME_DURATION)
    }, DEBOUNCE_DELAY)

    // Cleanup function
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current)
      }
    }
  }, [value, displayedValue])

  // ============================================================================
  // Cleanup on Unmount
  // ============================================================================

  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current)
      }
    }
  }, [])

  // ============================================================================
  // Render
  // ============================================================================

  return (
    <div className={className}>
      {/* Main Price Display - Large, Bold, White */}
      <div className="!text-4xl font-bold !text-white">
        {formatCurrency(Math.round(displayedValue))}
      </div>

      {/* Optional Price Range - Smaller, Muted White */}
      {range && (
        <div className="mt-2 !text-sm !text-white/70">
          {formatPriceRange(range)}
        </div>
      )}
    </div>
  )
}
