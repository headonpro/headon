import { Suspense } from 'react'
import Image from 'next/image'
import { HeroAnimations } from './HeroAnimations'
import TypewriterCTA from '@/components/ui/typewriter-cta'

// Server Component - Text wird sofort gerendert für SEO
export default function HeroSection() {
  return (
    <section className="bg-primary-600 relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Preload critical logo for LCP optimization */}
      <div
        className="pointer-events-none absolute top-0 left-0 h-0 w-0 overflow-hidden opacity-0"
        aria-hidden="true"
      >
        <Image
          src="/headon-logo.svg"
          alt="HEADON.pro Logo Preload"
          width={200}
          height={50}
          priority
        />
      </div>

      {/* Static gradient base - always visible */}
      <div className="from-primary-600 via-primary-500 to-secondary-500 absolute inset-0 bg-gradient-to-br" />

      {/* Client-side animations loaded after hydration */}
      <Suspense fallback={null}>
        <HeroAnimations />
      </Suspense>

      {/* SEO-Critical Content - Server Rendered */}
      <div className="relative z-10 container mx-auto px-4 pt-48 pb-24 text-center md:pt-64 md:pb-32 lg:pt-72">
        <h1 className="font-heading mb-16 text-4xl font-bold tracking-tight text-white sm:text-5xl md:mb-20 md:text-6xl lg:text-7xl">
          <span className="relative inline-block select-none">
            Kreativ- &amp; Digitalagentur
            <span className="text-accent-500 ml-0.5 inline-block">*</span>
          </span>
          <br />
          für{' '}
          <span className="from-secondary-300 via-accent-500 to-secondary-600 bg-gradient-to-r bg-clip-text text-transparent">
            Web, Apps &amp; Design
          </span>
        </h1>

        {/* SEO-wichtiger Beschreibungstext - Server Rendered */}
        <div className="mx-auto mb-16 max-w-4xl opacity-90 md:mb-20 lg:mb-24">
          <p className="text-center text-base leading-relaxed text-white/90 md:text-lg lg:text-xl">
            Als Kreativ- und Digitalagentur aus Lauda-Königshofen vereinen wir Webdesign,
            Webentwicklung, App-Development und Corporate Design unter einem Dach. Während andere
            Agenturen 3-6 Monate brauchen, gestalten und entwickeln wir Ihr Projekt durch
            KI-gestützte Prozesse in 2-4 Wochen. Ihre digitale Transformation zu transparenten
            Festpreisen.
          </p>
        </div>

        {/* Dynamic CTA - Client Component */}
        <div className="mb-20 md:mb-28 lg:mb-32">
          <Suspense
            fallback={
              <a
                href="/contact"
                className="from-accent-500 to-secondary-500 text-primary inline-block rounded-xl bg-gradient-to-r px-8 py-4 text-lg font-semibold shadow-2xl"
              >
                Jetzt Projekt starten
              </a>
            }
          >
            <TypewriterCTA />
          </Suspense>
        </div>
      </div>

      {/* Wave transition */}
      <div className="absolute right-0 bottom-0 left-0">
        <svg
          className="h-16 w-full fill-white md:h-24"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path d="M0,40 C480,100 960,0 1440,60 L1440,120 L0,120 Z" />
        </svg>
      </div>
    </section>
  )
}
