'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

interface AnimatedLogoProps {
  className?: string
  width?: number
  height?: number
}

export default function AnimatedLogo({ className, width = 120, height = 32 }: AnimatedLogoProps) {
  return (
    <div className={cn("relative inline-block", className)}>
      {/* Base Logo */}
      <Image 
        src="/headon-logo.svg" 
        alt="HEADON.pro Logo" 
        width={width} 
        height={height}
        className="h-full w-auto"
        priority
      />
      
      {/* Small Lightning Bolts around "ON" */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          // Position on the "ON" part (approximately last 25% of logo)
          left: '75%',
          width: '25%',
        }}
      >
        {/* Mini Lightning Bolt 1 - Top */}
        <svg 
          className="absolute -top-1 left-0 w-3 h-3 lightning-bolt lightning-1" 
          viewBox="0 0 24 24" 
          fill="none"
        >
          <path 
            d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" 
            stroke="#93c5fd" 
            strokeWidth="1.5"
            fill="rgba(147, 197, 253, 0.2)"
          />
        </svg>
        
        {/* 4-Point Star 1 - Top Left */}
        <svg 
          className="absolute -top-0.5 left-2 w-2.5 h-2.5 star-spark star-1" 
          viewBox="0 0 24 24" 
          fill="none"
        >
          <path 
            d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" 
            stroke="#60a5fa" 
            strokeWidth="1.5"
            fill="rgba(96, 165, 250, 0.15)"
          />
        </svg>
        
        {/* Mini Lightning Bolt 2 - Bottom */}
        <svg 
          className="absolute -bottom-1 right-0 w-2.5 h-2.5 lightning-bolt lightning-2" 
          viewBox="0 0 24 24" 
          fill="none"
        >
          <path 
            d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" 
            stroke="#dbeafe" 
            strokeWidth="1.5"
            fill="rgba(219, 234, 254, 0.15)"
          />
        </svg>
        
        {/* 4-Point Star 2 - Bottom Left */}
        <svg 
          className="absolute bottom-0 left-1 w-2 h-2 star-spark star-2" 
          viewBox="0 0 24 24" 
          fill="none"
        >
          <path 
            d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" 
            stroke="#93c5fd" 
            strokeWidth="1.5"
            fill="rgba(147, 197, 253, 0.2)"
          />
        </svg>
        
        {/* Mini Lightning Bolt 3 - Right */}
        <svg 
          className="absolute top-1/2 -right-1 w-2 h-2 -translate-y-1/2 lightning-bolt lightning-3" 
          viewBox="0 0 24 24" 
          fill="none"
        >
          <path 
            d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" 
            stroke="#60a5fa" 
            strokeWidth="2"
            fill="rgba(96, 165, 250, 0.1)"
          />
        </svg>
        
        {/* 4-Point Star 3 - Right Top */}
        <svg 
          className="absolute top-0.5 right-0.5 w-3 h-3 star-spark star-3" 
          viewBox="0 0 24 24" 
          fill="none"
        >
          <path 
            d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" 
            stroke="#dbeafe" 
            strokeWidth="1"
            fill="rgba(219, 234, 254, 0.1)"
          />
        </svg>
        
        {/* Subtle Glow behind ON */}
        <div className="absolute inset-0 electric-text-glow" />
      </div>
      
      {/* Hover Effect - More Lightning */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-200">
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            left: '75%',
            width: '25%',
          }}
        >
          {/* Extra Lightning on Hover */}
          <svg 
            className="absolute top-0 left-1/2 w-4 h-4 -translate-x-1/2 lightning-surge" 
            viewBox="0 0 24 24" 
            fill="none"
          >
            <path 
              d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" 
              stroke="#3b82f6" 
              strokeWidth="2"
              fill="rgba(59, 130, 246, 0.3)"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}