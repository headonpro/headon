'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import GlassmorphismCard from '@/components/ui/glassmorphism-card'

// Simple Before/After Slider
function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100))
    setSliderPosition(percent)
  }

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return
      handleMove(e.clientX)
    },
    [isDragging]
  )

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return
      handleMove(e.touches[0].clientX)
    },
    [isDragging]
  )

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('touchmove', handleTouchMove)
      document.addEventListener('touchend', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('touchend', handleMouseUp)
      }
    }
  }, [isDragging, handleMouseMove, handleTouchMove])

  return (
    <div>
      {/* Dark Mode Toggle - Centered */}
      <div className="mb-3 flex items-center justify-center gap-2">
        <span className="text-xs text-white/70">Light</span>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="relative h-6 w-12 rounded-full bg-white/20 transition-colors duration-200 hover:bg-white/30"
        >
          <motion.div
            className="bg-accent-500 absolute top-0.5 left-0.5 h-5 w-5 rounded-full shadow-lg"
            animate={{ x: isDarkMode ? 22 : 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          />
        </button>
        <span className="text-xs text-white/70">Dark</span>
      </div>

      <div
        ref={containerRef}
        className="relative h-[200px] w-full overflow-hidden rounded-lg select-none md:h-[280px] lg:h-[320px]"
      >
        {/* After Image - New Website */}
        <div className="absolute inset-0">
          <Image
            src={isDarkMode ? '/images/viktoria-dark.png' : '/images/viktoria-new.png'}
            alt="SV Viktoria Wertheim - Moderne Vereinswebsite mit responsivem Design und Dark Mode"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute top-2 right-2 rounded bg-green-500/90 px-2 py-1 backdrop-blur-sm">
            <span className="text-xs font-semibold text-white">
              NEU {isDarkMode ? '(Dark)' : ''}
            </span>
          </div>
        </div>

        {/* Before Image - Old Website */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image
            src="/images/viktoria-old.png"
            alt="SV Viktoria Wertheim - Alte Website vor der Modernisierung"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute top-2 left-2 rounded bg-gray-500/90 px-2 py-1 backdrop-blur-sm">
            <span className="text-xs font-semibold text-white">ALT</span>
          </div>
        </div>

        {/* Slider Handle */}
        <div
          className="bg-accent-500 absolute top-0 bottom-0 w-0.5 cursor-ew-resize"
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        >
          <div className="bg-accent-500 absolute top-1/2 left-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-lg">
            <div className="flex items-center gap-0.5">
              <svg
                className="text-primary-600 h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <svg
                className="text-primary-600 h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Simple App Screenshot
function AppShowcase() {
  return (
    <div>
      {/* Invisible spacer to match the dark mode toggle height */}
      <div className="mb-3 h-[30px]"></div>

      <div className="relative h-[200px] w-full overflow-hidden rounded-lg bg-gradient-to-br from-orange-500 to-orange-700 md:h-[280px] lg:h-[320px]">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Phone Frame */}
          <div className="relative h-[220px] w-[110px] rounded-[16px] bg-gray-900 p-1 shadow-2xl md:h-[300px] md:w-[150px] md:rounded-[24px] md:p-1.5 lg:h-[320px] lg:w-[160px]">
            <div className="h-full w-full overflow-hidden rounded-[12px] bg-white md:rounded-[20px]">
              <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-orange-100 to-orange-50 p-3">
                <div className="mb-1 text-sm font-bold text-orange-600 md:text-lg">KLARTEXT</div>
                <div className="text-center text-[10px] text-orange-500 md:text-xs">
                  KI Sprachassistent
                </div>
                <div className="mt-3 space-y-1.5">
                  <div className="h-1.5 w-14 rounded bg-orange-200 md:w-20"></div>
                  <div className="h-1.5 w-12 rounded bg-orange-200 md:w-16"></div>
                  <div className="h-1.5 w-16 rounded bg-orange-200 md:w-24"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SimpleShowcase() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-4">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
        {/* Website Before/After */}
        <GlassmorphismCard className="overflow-hidden">
          <div className="p-4 md:p-5 lg:p-6">
            <h3 className="mb-3 text-base font-bold text-white md:text-lg lg:text-xl">
              SV Viktoria Wertheim
            </h3>
            <BeforeAfterSlider />
          </div>
        </GlassmorphismCard>

        {/* Mobile App */}
        <GlassmorphismCard className="overflow-hidden">
          <div className="p-4 md:p-5 lg:p-6">
            <h3 className="mb-3 text-base font-bold text-white md:text-lg lg:text-xl">
              KLARTEXT - Sprachassistent
            </h3>
            <AppShowcase />
          </div>
        </GlassmorphismCard>
      </div>
    </div>
  )
}
