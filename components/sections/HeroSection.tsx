import TypewriterCTA from '@/components/ui/typewriter-cta'
import HeroAnimations from './HeroAnimations'
import HeroEasterEgg from './HeroEasterEgg'

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-primary-600">
      {/* Static gradient for immediate paint - LCP optimization */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500" />

      {/* Animated backgrounds - loads progressively without blocking LCP */}
      <HeroAnimations />

      {/* Content - renders immediately from server */}
      <div className="relative z-10 container mx-auto px-4 pt-48 pb-24 md:pt-64 lg:pt-72 md:pb-32 text-center">
        <h1 className="mb-16 md:mb-20 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl font-heading">
          <span className="relative inline-block">
            Wir
            <HeroEasterEgg />
          </span>
          {' '}entwickeln digitale Erlebnisse,
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-300 via-accent-500 to-secondary-600">
            die Ihr Unternehmen transformieren.
          </span>
        </h1>

        {/* Static description text - no animation for critical content */}
        <div className="mb-16 md:mb-20 lg:mb-24 max-w-4xl mx-auto opacity-90">
          <p className="text-white/90 text-base md:text-lg lg:text-xl leading-relaxed text-center">
            Während andere Agenturen noch traditionell entwickeln, nutzen wir KI-gestützte Prozesse für 4x schnellere Umsetzung. Ihre digitale Transformation in Wochen statt Monaten - zu einem Bruchteil der üblichen Kosten.
          </p>
        </div>

        {/* Dynamic Typewriter CTA Button - loads progressively */}
        <div className="mb-20 md:mb-28 lg:mb-32">
          <TypewriterCTA />
        </div>
      </div>

      {/* Simple wave at bottom - static SVG */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-16 md:h-24 fill-white" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,40 C480,100 960,0 1440,60 L1440,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  )
}
