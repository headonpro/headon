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

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return
    handleMove(e.clientX)
  }, [isDragging])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return
    handleMove(e.touches[0].clientX)
  }, [isDragging])

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
      <div className="flex items-center justify-center gap-2 mb-3">
        <span className="text-xs text-white/70">Light</span>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="relative w-12 h-6 bg-white/20 rounded-full transition-colors duration-200 hover:bg-white/30"
        >
          <motion.div
            className="absolute top-0.5 left-0.5 w-5 h-5 bg-accent-500 rounded-full shadow-lg"
            animate={{ x: isDarkMode ? 22 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </button>
        <span className="text-xs text-white/70">Dark</span>
      </div>
      
      <div 
        ref={containerRef}
        className="relative w-full h-[200px] md:h-[280px] lg:h-[320px] overflow-hidden rounded-lg select-none"
      >
        {/* After Image - New Website */}
        <div className="absolute inset-0">
          <Image
            src={isDarkMode ? "/images/viktoria-dark.png" : "/images/viktoria-new.png"}
            alt="Neue Website"
            fill
            className="object-cover object-top"
            priority
          />
          <div className="absolute top-2 right-2 px-2 py-1 rounded bg-green-500/90 backdrop-blur-sm">
            <span className="text-white text-xs font-semibold">NEU {isDarkMode ? '(Dark)' : ''}</span>
          </div>
        </div>

      {/* Before Image - Old Website */}
      <div 
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src="/images/viktoria-old.png"
          alt="Alte Website"
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute top-2 left-2 px-2 py-1 rounded bg-gray-500/90 backdrop-blur-sm">
          <span className="text-white text-xs font-semibold">ALT</span>
        </div>
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-0.5 bg-accent-500 cursor-ew-resize"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-accent-500 rounded-full shadow-lg flex items-center justify-center">
          <div className="flex items-center gap-0.5">
            <svg className="w-3 h-3 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
            <svg className="w-3 h-3 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
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
      <div className="h-[30px] mb-3"></div>
      
      <div className="relative w-full h-[200px] md:h-[280px] lg:h-[320px] bg-gradient-to-br from-orange-500 to-orange-700 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Phone Frame */}
          <div className="relative w-[110px] md:w-[150px] lg:w-[160px] h-[220px] md:h-[300px] lg:h-[320px] bg-gray-900 rounded-[16px] md:rounded-[24px] p-1 md:p-1.5 shadow-2xl">
            <div className="w-full h-full bg-white rounded-[12px] md:rounded-[20px] overflow-hidden">
              <div className="w-full h-full bg-gradient-to-b from-orange-100 to-orange-50 flex flex-col items-center justify-center p-3">
                <div className="text-orange-600 font-bold text-sm md:text-lg mb-1">KLARTEXT</div>
                <div className="text-orange-500 text-[10px] md:text-xs text-center">KI Sprachassistent</div>
                <div className="mt-3 space-y-1.5">
                  <div className="w-14 md:w-20 h-1.5 bg-orange-200 rounded"></div>
                  <div className="w-12 md:w-16 h-1.5 bg-orange-200 rounded"></div>
                  <div className="w-16 md:w-24 h-1.5 bg-orange-200 rounded"></div>
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
    <div className="w-full max-w-5xl mx-auto px-4 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
        {/* Website Before/After */}
        <GlassmorphismCard className="overflow-hidden">
          <div className="p-4 md:p-5 lg:p-6">
            <h3 className="text-base md:text-lg lg:text-xl font-bold text-white mb-3">
              SV Viktoria Wertheim
            </h3>
            <BeforeAfterSlider />
          </div>
        </GlassmorphismCard>

        {/* Mobile App */}
        <GlassmorphismCard className="overflow-hidden">
          <div className="p-4 md:p-5 lg:p-6">
            <h3 className="text-base md:text-lg lg:text-xl font-bold text-white mb-3">
              KLARTEXT - Sprachassistent
            </h3>
            <AppShowcase />
          </div>
        </GlassmorphismCard>
      </div>
    </div>
  )
}