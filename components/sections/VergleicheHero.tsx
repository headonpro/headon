'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, Target, TrendingUp } from 'lucide-react'

export function VergleicheHero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Gradient background */}
      <div className="from-primary-600 via-primary-500 to-secondary-500 absolute inset-0 bg-gradient-to-br" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-48 pb-24 md:pt-64 md:pb-32">
        {/* Title */}
        <div className="mb-16 text-center md:mb-20">
          <h1 className="font-heading mb-6 text-5xl font-bold tracking-tight text-white md:text-6xl">
            Technologie-
            <span className="from-secondary-300 via-accent to-secondary-600 bg-gradient-to-r bg-clip-text text-transparent">
              {' '}
              Vergleiche
            </span>
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-white/90 md:text-xl">
            Fundierte Entscheidungen treffen mit unseren ausführlichen Vergleichen von Frameworks,
            Technologien und Entwicklungsansätzen. Alle Vergleiche basieren auf realen
            Projekterfahrungen und aktuellen Best Practices 2025.
          </p>
        </div>

        {/* Benefits Cards - integrated in hero */}
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              icon: TrendingUp,
              title: 'Datenbasiert',
              description: 'Vergleiche basieren auf realen Projekterfahrungen und Benchmarks.',
            },
            {
              icon: Target,
              title: 'Objektiv',
              description: 'Unabhängige Bewertungen ohne Vendor Lock-in oder Bias.',
            },
            {
              icon: CheckCircle2,
              title: 'Praxisnah',
              description: 'Konkrete Empfehlungen für verschiedene Use Cases und Projektgrößen.',
            },
          ].map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group h-full cursor-pointer overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/20"
              >
                <div className="p-6">
                  {/* Icon */}
                  <div className="mb-4 flex justify-center">
                    <div className="from-accent to-secondary rounded-xl bg-gradient-to-br p-3 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="text-primary h-8 w-8" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="group-hover:text-accent mb-3 text-center text-xl font-bold text-white transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-center text-sm text-white/90">{benefit.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Wave at bottom */}
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
