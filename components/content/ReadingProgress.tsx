'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

interface ReadingProgressProps {
  /**
   * Minimum word count threshold to show the progress bar
   * @default 2000
   */
  threshold?: number
  /**
   * Optional container selector to track scroll within a specific element
   * @default 'article' - tracks scroll within <article> element
   */
  containerSelector?: string
}

/**
 * Reading Progress Bar Component
 *
 * Displays a fixed progress bar at the top of the page showing how far
 * the user has scrolled through the article content. Only appears for
 * articles exceeding the word count threshold.
 *
 * Features:
 * - GPU-accelerated animations using transform
 * - Debounced scroll listener (60fps max)
 * - Only tracks scroll within article content
 * - Gradient styling from accent to secondary colors
 *
 * @example
 * ```tsx
 * <ReadingProgress threshold={2000} />
 * ```
 */
export default function ReadingProgress({
  threshold = 2000,
  containerSelector = 'article',
}: ReadingProgressProps) {
  const [shouldShow, setShouldShow] = useState(false)
  const scrollProgress = useMotionValue(0)

  // Use spring animation for smooth, physics-based motion
  const scaleX = useSpring(scrollProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    // Check word count to determine if we should show the progress bar
    const checkWordCount = () => {
      const article = document.querySelector(containerSelector)
      if (!article) return

      // Count words in article text content
      const text = article.textContent || ''
      const wordCount = text.trim().split(/\s+/).length

      setShouldShow(wordCount >= threshold)
    }

    checkWordCount()
  }, [threshold, containerSelector])

  useEffect(() => {
    if (!shouldShow) return

    let rafId: number | null = null
    let lastScrollTime = 0
    const frameDelay = 1000 / 60 // 60fps = ~16.67ms

    const calculateProgress = () => {
      const article = document.querySelector(containerSelector)
      if (!article) return

      // Get article's position and dimensions
      const articleRect = article.getBoundingClientRect()
      const articleTop = articleRect.top + window.scrollY
      const articleHeight = articleRect.height
      const windowHeight = window.innerHeight

      // Calculate scroll progress within the article
      const scrollTop = window.scrollY
      const articleStart = articleTop
      const articleEnd = articleTop + articleHeight - windowHeight

      // Calculate percentage (0-100)
      let percentage = 0
      if (scrollTop >= articleStart && scrollTop <= articleEnd) {
        const scrollDistance = scrollTop - articleStart
        const maxScroll = articleEnd - articleStart
        percentage = Math.min(Math.max((scrollDistance / maxScroll) * 100, 0), 100)
      } else if (scrollTop > articleEnd) {
        percentage = 100
      }

      // Update motion value (as decimal 0-1 for scaleX)
      scrollProgress.set(percentage / 100)
    }

    const handleScroll = () => {
      const now = Date.now()
      const timeSinceLastScroll = now - lastScrollTime

      // Debounce: only calculate if enough time has passed (60fps max)
      if (timeSinceLastScroll >= frameDelay) {
        lastScrollTime = now

        // Use RAF for smoother animations
        if (rafId) {
          cancelAnimationFrame(rafId)
        }

        rafId = requestAnimationFrame(calculateProgress)
      }
    }

    // Initial calculation
    calculateProgress()

    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Recalculate on resize (article dimensions might change)
    window.addEventListener('resize', calculateProgress, { passive: true })

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', calculateProgress)
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [shouldShow, containerSelector, scrollProgress])

  // Don't render if word count is below threshold
  if (!shouldShow) return null

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 h-1 w-full origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, var(--color-accent) 0%, var(--color-secondary) 100%)',
        transformOrigin: '0% 0%',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      // Use GPU-accelerated properties only
      aria-hidden="true"
    />
  )
}
