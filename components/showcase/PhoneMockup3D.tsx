'use client'

import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'

interface PhoneMockup3DProps {
  appScreenshot: string
  appName: string
  className?: string
}

export default function PhoneMockup3D({ 
  appScreenshot, 
  appName,
  className = '' 
}: PhoneMockup3DProps) {
  const [isMobile, setIsMobile] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const rotateX = useTransform(mouseY, [-300, 300], [15, -15])
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15])

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    mouseX.set(e.clientX - centerX)
    mouseY.set(e.clientY - centerY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <div 
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="relative mx-auto"
        style={{
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          transformStyle: 'preserve-3d',
        }}
        initial={{ rotateY: 0 }}
        animate={isMobile ? {
          rotateY: [0, 10, 0, -10, 0],
        } : undefined}
        transition={isMobile ? {
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        } : {
          type: "spring",
          stiffness: 100,
          damping: 20
        }}
      >
        {/* Phone Frame */}
        <div className="relative w-[280px] h-[580px] mx-auto">
          {/* Phone Shadow */}
          <div 
            className="absolute inset-0 bg-black/20 rounded-[40px] blur-2xl"
            style={{ transform: 'translateZ(-50px)' }}
          />
          
          {/* Phone Body */}
          <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-[40px] p-2 shadow-2xl">
            {/* Screen Bezel */}
            <div className="relative w-full h-full bg-black rounded-[32px] p-3 overflow-hidden">
              {/* Notch */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-full z-20" />
              
              {/* Screen Content */}
              <div className="relative w-full h-full bg-white rounded-[24px] overflow-hidden">
                <Image
                  src={appScreenshot}
                  alt={appName}
                  fill
                  className="object-cover object-top"
                  priority
                />
                
                {/* Screen Reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/10 pointer-events-none" />
              </div>
              
              {/* Home Indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/30 rounded-full" />
            </div>
            
            {/* Side Buttons */}
            <div className="absolute -right-1 top-24 w-1 h-12 bg-gray-700 rounded-l" />
            <div className="absolute -right-1 top-40 w-1 h-8 bg-gray-700 rounded-l" />
            <div className="absolute -right-1 top-52 w-1 h-8 bg-gray-700 rounded-l" />
            <div className="absolute -left-1 top-32 w-1 h-16 bg-gray-700 rounded-r" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}