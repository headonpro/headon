'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'
import { type ReactNode } from 'react'

// Reusable animation variants
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export const fadeInUpDelayed = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
})

export const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

// Motion wrapper for viewport animations
interface MotionDivProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  className?: string
  viewportOnce?: boolean
}

export function MotionDiv({
  children,
  className,
  viewportOnce = true,
  ...props
}: MotionDivProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: viewportOnce }}
      transition={{ duration: 0.6 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Fade in wrapper
export function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Scale on hover wrapper
export function HoverScale({
  children,
  className,
  scale = 1.05,
}: {
  children: ReactNode
  className?: string
  scale?: number
}) {
  return (
    <motion.div
      whileHover={{ scale }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Card with hover lift effect
export function HoverLift({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Animated arrow for CTAs
export function AnimatedArrow({ className }: { className?: string }) {
  return (
    <motion.span
      animate={{ x: [0, 5, 0] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className={className}
    >
      →
    </motion.span>
  )
}

// Staggered list container
export function StaggerContainer({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren: delay,
            staggerChildren: 0.1,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Staggered list item
export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
