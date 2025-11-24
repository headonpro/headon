import { Zap, Trophy, CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { FadeIn, HoverScale } from '@/components/ui/motion-wrapper'

const advantages = [
  {
    icon: Zap,
    title: '4x Schneller',
    subtitle: 'Von der Idee zum Launch in Rekordzeit',
    mainMetric: '2-4 Wochen',
    comparison: 'statt 12-16 Wochen',
    color: 'text-accent-500',
    bgColor: 'bg-accent-500/10',
    gradient: 'from-green-500 to-emerald-500',
    features: [
      'KI-beschleunigtes Konzept & Design',
      'Automatisierte Code-Generierung',
      'Parallele Entwicklungsprozesse',
      'One-Click Deployment',
    ],
  },
  {
    icon: Zap,
    title: 'Fastlane Produktion',
    subtitle: 'Eilige Projekte in Rekordzeit',
    mainMetric: '3-7 Tage',
    comparison: 'für komplette Projekte',
    color: 'text-accent-500',
    bgColor: 'bg-accent-500/10',
    gradient: 'from-blue-500 to-cyan-500',
    features: [
      'Express-Umsetzung für eilige Projekte',
      'Komplette Webseiten & Apps',
      'Höchste Priorität & Fokus',
      '24/7 Entwicklung möglich',
    ],
  },
  {
    icon: Trophy,
    title: '2x Bessere Performance',
    subtitle: 'Messbar überlegene Ergebnisse',
    mainMetric: '90+ Score',
    comparison: 'Lighthouse Performance',
    color: 'text-accent-500',
    bgColor: 'bg-accent-500/10',
    gradient: 'from-purple-500 to-pink-500',
    features: [
      'Blitzschnelle Ladezeiten (< 2s)',
      'Mobile-First Architektur',
      'SEO-optimiert von Anfang an',
      '99.9% Uptime garantiert',
    ],
  },
]

// Server Component - SEO-optimiert
export default function KIAdvantageSection() {
  return (
    <section className="relative -mt-1 overflow-hidden pt-40 pb-52">
      {/* Wave transition from previous section */}
      <div className="absolute top-0 right-0 left-0 z-10">
        <svg
          className="h-16 w-full fill-white md:h-24"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path d="M0,40 C480,100 960,0 1440,60 L1440,0 L0,0 Z" />
        </svg>
      </div>

      {/* Static gradient background */}
      <div className="from-primary-600 via-primary-500 to-secondary-500 absolute inset-0 bg-gradient-to-br" />

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <FadeIn className="mb-16 text-center">
          <h2 className="font-heading mb-12 flex flex-wrap items-center justify-center gap-4 text-5xl font-bold text-white md:mb-16 md:text-6xl">
            <span className="from-accent to-secondary bg-gradient-to-r bg-clip-text text-transparent">
              Warum
            </span>
            <Image
              src="/headon-logo.svg"
              alt="HEADON.pro Logo - Digitalagentur Lauda-Königshofen"
              width={200}
              height={45}
              className="inline-block"
            />
            <span>anders ist</span>
          </h2>
          <p className="mx-auto mb-12 max-w-3xl text-xl text-white/90 md:mb-20">
            KI-gestützte Entwicklung revolutioniert, wie wir Projekte umsetzen. Schneller, günstiger
            und besser - das ist kein Versprechen, sondern messbare Realität.
          </p>
        </FadeIn>

        {/* Advantages Grid */}
        <div className="mt-16 mb-16 grid gap-8 md:mt-24 lg:grid-cols-3">
          {advantages.map((advantage, index) => (
            <FadeIn key={index} delay={index * 0.2} className="group relative">
              <HoverScale scale={1.02}>
                <div
                  className={`${index === 1 ? 'from-accent-500/20 to-secondary-500/20 border-accent-500/30 shadow-accent-500/20 bg-gradient-to-br shadow-2xl lg:-mt-8 lg:mb-8 lg:py-10' : 'border-white/20 bg-white/10'} relative h-full overflow-hidden rounded-2xl border p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/15`}
                >
                  {/* Icon */}
                  <div className="mb-6 flex justify-center">
                    <div className={`inline-flex rounded-xl p-4 ${advantage.bgColor}`}>
                      <advantage.icon className={`h-8 w-8 ${advantage.color}`} strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="mb-2 text-center text-2xl font-bold text-white">
                    {advantage.title}
                  </h3>
                  <p className="mb-6 text-center text-white/80">{advantage.subtitle}</p>

                  {/* Main Metric */}
                  <div className="mb-6 rounded-lg border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                    <div className="text-accent text-center text-3xl font-bold">
                      {advantage.mainMetric}
                    </div>
                    <div className="mt-1 text-center text-sm text-white/70">
                      {advantage.comparison}
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3">
                    {advantage.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="text-accent-500 mt-0.5 h-5 w-5 flex-shrink-0" />
                        <span className="text-sm leading-relaxed text-white/90">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </HoverScale>
            </FadeIn>
          ))}
        </div>

        {/* Bottom CTA */}
        <FadeIn delay={0.6} className="text-center">
          <div className="mx-auto max-w-2xl">
            <p className="mb-8 text-lg text-white/90">
              Während traditionelle Agenturen noch Konzepte erstellen, haben wir Ihr Projekt bereits
              fertiggestellt.
            </p>

            <div className="flex justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="from-accent-500 to-secondary-500 hover:from-accent-600 hover:to-secondary-600 text-primary group bg-gradient-to-r px-8 py-6 text-lg font-semibold shadow-xl transition-all duration-300 hover:shadow-2xl"
                >
                  Kostenloses Erstgespräch
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            {/* Trust Badge */}
            <FadeIn delay={0.8} className="mt-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800">
                <CheckCircle2 className="h-4 w-4" />
                100% Zufrieden oder Geld zurück
              </div>
            </FadeIn>
          </div>
        </FadeIn>
      </div>

      {/* Wave transition to next section */}
      <div className="absolute right-0 bottom-0 left-0 z-10">
        <svg className="h-16 w-full md:h-24" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,40 C480,100 960,0 1440,60 L1440,120 L0,120 Z" fill="rgb(249, 250, 251)" />
        </svg>
      </div>
    </section>
  )
}
