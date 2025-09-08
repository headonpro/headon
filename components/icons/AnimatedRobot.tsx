'use client'

import { motion } from 'framer-motion'

interface AnimatedRobotProps {
  className?: string
}

export default function AnimatedRobot({ className = "" }: AnimatedRobotProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* New Lucide Bot Icon paths (without eyes) */}
      {/* Antenna/Head connector */}
      <path d="M12 8V4H8" />
      
      {/* Main body */}
      <rect width="16" height="12" x="4" y="8" rx="2" />
      
      {/* Arms */}
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      
      {/* Animated Eyes - separated for animation */}
      {/* Left Eye */}
      <g>
        {/* Eye base that blinks and looks around */}
        <motion.path
          d="M9 13v2"
          stroke="currentColor"
          animate={{
            scaleY: [1, 1, 1, 1, 0.1, 1, 1, 1, 1, 1, 1, 1, 0.1, 1],
            opacity: [1, 1, 1, 1, 0.3, 1, 1, 1, 1, 1, 1, 1, 0.3, 1],
            x: [0, 0.8, 0.5, -0.8, -0.5, 0, 0.5, -0.5, 0, 0.8, -0.8, 0],
            y: [0, -0.3, 0.2, 0, -0.2, 0.3, 0, -0.3, 0.2, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            transformOrigin: '9px 14px',
          }}
        />
        
        {/* Eye pupil (looking around more actively) */}
        <motion.circle
          cx="9"
          cy="14"
          r="0.3"
          fill="currentColor"
          stroke="none"
          animate={{
            x: [0, 1, 0.5, -1, -0.5, 0, 0.8, -0.8, 0, 1, -1, 0],
            y: [0, -0.5, 0.5, 0, -0.5, 0.5, 0, -0.5, 0.5, 0],
            opacity: [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </g>
      
      {/* Right Eye */}
      <g>
        {/* Eye base that blinks and looks around */}
        <motion.path
          d="M15 13v2"
          stroke="currentColor"
          animate={{
            scaleY: [1, 1, 1, 1, 0.1, 1, 1, 1, 1, 1, 1, 1, 0.1, 1],
            opacity: [1, 1, 1, 1, 0.3, 1, 1, 1, 1, 1, 1, 1, 0.3, 1],
            x: [0, 0.8, 0.5, -0.8, -0.5, 0, 0.5, -0.5, 0, 0.8, -0.8, 0],
            y: [0, -0.3, 0.2, 0, -0.2, 0.3, 0, -0.3, 0.2, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            transformOrigin: '15px 14px',
          }}
        />
        
        {/* Eye pupil (looking around more actively) */}
        <motion.circle
          cx="15"
          cy="14"
          r="0.3"
          fill="currentColor"
          stroke="none"
          animate={{
            x: [0, 1, 0.5, -1, -0.5, 0, 0.8, -0.8, 0, 1, -1, 0],
            y: [0, -0.5, 0.5, 0, -0.5, 0.5, 0, -0.5, 0.5, 0],
            opacity: [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </g>
    </svg>
  )
}