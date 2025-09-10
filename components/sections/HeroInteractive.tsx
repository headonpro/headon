'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Plus, User } from 'lucide-react'
import AnimatedRobot from '@/components/icons/AnimatedRobot'

export default function HeroInteractive() {
  const [showEasterEgg, setShowEasterEgg] = useState(false)

  useEffect(() => {
    // Add click handler to the "Wir" text
    const handleWirClick = () => {
      const wirElement = document.querySelector('.easter-egg-trigger')
      if (wirElement) {
        wirElement.addEventListener('click', () => setShowEasterEgg(true))
      }
    }
    
    handleWirClick()
    
    // Close popup when clicking outside
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

  // Add the animated star to the "Wir" text
  useEffect(() => {
    const wirElement = document.querySelector('.easter-egg-trigger')
    if (wirElement && !wirElement.querySelector('.animated-star')) {
      const star = document.createElement('span')
      star.className = 'animated-star inline-block ml-0.5 text-accent-500'
      star.textContent = '*'
      star.style.cssText = 'animation: wiggle 10s ease-in-out infinite'
      wirElement.appendChild(star)
    }
  }, [])

  return (
    <>
      {/* Easter Egg Popup */}
      <AnimatePresence>
        {showEasterEgg && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
            <motion.div
              initial={{ opacity: 0, y: 5, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.95 }}
              transition={{ type: "spring", damping: 30, stiffness: 500 }}
              className="relative"
            >
              <div className="flex items-center gap-2 px-4 py-2">
                <AnimatedRobot className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-accent-500" />
                <Plus className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white/70 stroke-[2]" />
                <User className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-accent-500 stroke-[2]" />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CSS for the star animation */}
      <style jsx global>{`
        @keyframes wiggle {
          0%, 16%, 100% { transform: rotate(0deg) scale(1) translateY(0); }
          4% { transform: rotate(10deg) scale(1.1) translateY(-2px); }
          8% { transform: rotate(-10deg) scale(1) translateY(0); }
          12% { transform: rotate(10deg) scale(1.1) translateY(-2px); }
          35%, 36% { transform: rotate(0deg) scale(0.9) translateY(0); }
          75%, 76% { transform: rotate(0deg) scale(0.9) translateY(0); }
        }
        
        .easter-egg-trigger {
          cursor: pointer;
        }
      `}</style>
    </>
  )
}