'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GlassmorphismCardProps {
  children: ReactNode
  className?: string
  delay?: number
  onClick?: () => void
  hoverable?: boolean
}

export default function GlassmorphismCard({ 
  children, 
  className = '', 
  delay = 0,
  onClick,
  hoverable = true 
}: GlassmorphismCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: "spring",
        stiffness: 100
      }}
      whileHover={hoverable ? { 
        scale: 1.02,
        transition: { duration: 0.2 }
      } : undefined}
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-2xl
        bg-white/5 backdrop-blur-md
        border border-white/10
        shadow-xl shadow-black/10
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      style={{
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}