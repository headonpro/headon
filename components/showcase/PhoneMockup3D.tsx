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
  className = '',
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
        animate={
          isMobile
            ? {
                rotateY: [0, 10, 0, -10, 0],
              }
            : undefined
        }
        transition={
          isMobile
            ? {
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }
            : {
                type: 'spring',
                stiffness: 100,
                damping: 20,
              }
        }
      >
        {/* Phone Frame */}
        <div className="relative mx-auto h-[580px] w-[280px]">
          {/* Phone Shadow */}
          <div
            className="absolute inset-0 rounded-[40px] bg-black/20 blur-2xl"
            style={{ transform: 'translateZ(-50px)' }}
          />

          {/* Phone Body */}
          <div className="relative h-full w-full rounded-[40px] bg-gradient-to-br from-gray-900 to-gray-800 p-2 shadow-2xl">
            {/* Screen Bezel */}
            <div className="relative h-full w-full overflow-hidden rounded-[32px] bg-black p-3">
              {/* Notch */}
              <div className="absolute top-3 left-1/2 z-20 h-6 w-32 -translate-x-1/2 rounded-full bg-black" />

              {/* Screen Content */}
              <div className="relative h-full w-full overflow-hidden rounded-[24px] bg-white">
                <Image
                  src={appScreenshot}
                  alt={`${appName} - Mobile App Screenshot auf iPhone Mockup`}
                  fill
                  className="object-cover object-top"
                  priority
                />

                {/* Screen Reflection */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/10" />
              </div>

              {/* Home Indicator */}
              <div className="absolute bottom-2 left-1/2 h-1 w-32 -translate-x-1/2 rounded-full bg-white/30" />
            </div>

            {/* Side Buttons */}
            <div className="absolute top-24 -right-1 h-12 w-1 rounded-l bg-gray-700" />
            <div className="absolute top-40 -right-1 h-8 w-1 rounded-l bg-gray-700" />
            <div className="absolute top-52 -right-1 h-8 w-1 rounded-l bg-gray-700" />
            <div className="absolute top-32 -left-1 h-16 w-1 rounded-r bg-gray-700" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
