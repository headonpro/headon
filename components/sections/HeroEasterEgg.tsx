'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Plus, User } from 'lucide-react'
import AnimatedRobot from '@/components/icons/AnimatedRobot'

export default function HeroEasterEgg() {
  const [showEasterEgg, setShowEasterEgg] = useState(false)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (showEasterEgg && !target.closest('.easter-egg-trigger')) {
        setShowEasterEgg(false)
      }
    }

    if (showEasterEgg) {
      document.addEventListener('click', handleClick)
      return () => document.removeEventListener('click', handleClick)
    }
  }, [showEasterEgg])

  return (
    <span
      className="relative inline-block cursor-pointer select-none easter-egg-trigger"
      onClick={() => setShowEasterEgg(true)}
    >
      <motion.span
        className="inline-block ml-0.5 text-accent-500"
        animate={{
          rotate: [0, 10, -10, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          scale: [1, 1.1, 1, 1.1, 1, 1, 0.9, 1, 1, 1, 0.9, 1, 1],
          y: [0, -2, 0, -2, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.04, 0.08, 0.12, 0.16, 0.35, 0.36, 0.37, 0.5, 0.75, 0.76, 0.77, 1]
        }}
      >
        *
      </motion.span>

      {/* Easter Egg Popup */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ type: "spring", damping: 30, stiffness: 500 }}
            className="absolute left-1/2 -translate-x-1/2 z-50 pointer-events-none"
            style={{ top: '-3.5rem' }}
          >
            <div className="relative pointer-events-auto">
              <div className="flex items-center gap-2 px-4 py-2">
                <AnimatedRobot className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-accent-500" />
                <Plus className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white/70 stroke-[2]" />
                <User className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-accent-500 stroke-[2]" />
              </div>
              {/* Small arrow pointing down */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
                   style={{ borderBottom: '1px solid rgba(255,255,255,0.15)', borderRight: '1px solid rgba(255,255,255,0.15)' }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  )
}
