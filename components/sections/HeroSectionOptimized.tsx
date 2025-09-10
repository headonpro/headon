import HeroContent from './HeroContent'
import HeroOverlay from './HeroOverlay'
import Image from 'next/image'

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
      
      {/* Static gradient base - immediately visible */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500" />
      
      {/* Server-rendered content - immediately visible */}
      <HeroContent />
      
      {/* Client-side animations and interactions - progressive enhancement */}
      <HeroOverlay />
    </section>
  )
}