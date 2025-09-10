'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import HeroSectionContent from './HeroSectionContent'
import TypewriterCTA from '@/components/ui/typewriter-cta'

// Lazy load animations - they're not critical for LCP
const HeroAnimations = dynamic(() => import('./HeroAnimations'), {
  ssr: false,
  loading: () => null // Don't show loading state
})

// Lazy load interactive elements
const HeroInteractive = dynamic(() => import('./HeroInteractive'), {
  ssr: false,
  loading: () => null
})

export default function HeroSectionOptimized() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-primary-600">
      {/* Preload critical logo for LCP optimization */}
      <div className="absolute top-0 left-0 w-0 h-0 overflow-hidden opacity-0 pointer-events-none" aria-hidden="true">
        <Image
          src="/headon-logo.svg"
          alt=""
          width={200}
          height={50}
          priority
        />
      </div>
      
      {/* Static gradient base - immediate render */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500" />
      
      {/* Lazy loaded animations - non-blocking */}
      <HeroAnimations />
      
      {/* Critical Content - Server Rendered */}
      <div className="relative z-10 container mx-auto px-4 pt-48 pb-24 md:pt-64 lg:pt-72 md:pb-32 text-center">
        <HeroSectionContent />
        
        {/* CTA Button */}
        <div className="mb-20 md:mb-28 lg:mb-32">
          <TypewriterCTA />
        </div>
      </div>
      
      {/* Interactive Easter Egg - Lazy Loaded */}
      <HeroInteractive />
      
      {/* Simple wave at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-16 md:h-24 fill-white" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,40 C480,100 960,0 1440,60 L1440,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  )
}