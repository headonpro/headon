'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Utensils,
  Hammer,
  ShoppingBag,
  Briefcase,
  Home,
  Heart,
  ChevronDown,
  Clock,
  Euro,
  CheckCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Industry {
  id: string
  title: string
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  color: string
  bgGradient: string
  solutions: string[]
  priceRange: string
  timeframe: string
}

const industries: Industry[] = [
  {
    id: 'gastronomie',
    title: 'Restaurant & Gastronomie',
    icon: Utensils,
    color: 'text-orange-600',
    bgGradient: 'from-orange-500 to-red-500',
    solutions: [
      'Online-Reservierungssystem mit Tischplanung',
      'Digitale Speisekarte mit QR-Code',
      'Lieferservice-Plattform ohne Provisionen',
    ],
    priceRange: 'ab 2.500€',
    timeframe: '1-2 Wochen',
  },
  {
    id: 'handwerk',
    title: 'Handwerk & Services',
    icon: Hammer,
    color: 'text-blue-600',
    bgGradient: 'from-blue-500 to-indigo-500',
    solutions: [
      'Automatische Terminbuchung',
      'Digitale Angebotserstellung',
      'Kundenverwaltung mit Historie',
    ],
    priceRange: 'ab 3.000€',
    timeframe: '1-3 Wochen',
  },
  {
    id: 'einzelhandel',
    title: 'Einzelhandel & E-Commerce',
    icon: ShoppingBag,
    color: 'text-green-600',
    bgGradient: 'from-green-500 to-teal-500',
    solutions: [
      'Online-Shop mit Warenwirtschaft',
      'Click & Collect System',
      'Digitale Kundenkarten',
    ],
    priceRange: 'ab 5.000€',
    timeframe: '2-4 Wochen',
  },
  {
    id: 'beratung',
    title: 'Beratung & Coaching',
    icon: Briefcase,
    color: 'text-purple-600',
    bgGradient: 'from-purple-500 to-pink-500',
    solutions: [
      'Online-Kursplattform',
      'Automatisierte Terminbuchung',
      'Klienten-Portal mit Dokumenten',
    ],
    priceRange: 'ab 4.000€',
    timeframe: '2-4 Wochen',
  },
  {
    id: 'immobilien',
    title: 'Immobilien & Makler',
    icon: Home,
    color: 'text-amber-600',
    bgGradient: 'from-amber-500 to-orange-500',
    solutions: [
      'Virtuelle 360° Rundgänge',
      'Automatische Exposé-Erstellung',
      'Interessenten-Management',
    ],
    priceRange: 'ab 6.000€',
    timeframe: '2-4 Wochen',
  },
  {
    id: 'fitness',
    title: 'Fitness & Wellness',
    icon: Heart,
    color: 'text-red-600',
    bgGradient: 'from-red-500 to-pink-500',
    solutions: ['Mitglieder-App mit Check-in', 'Online-Kursbuchung', 'Ernährungsplan-Portal'],
    priceRange: 'ab 4.500€',
    timeframe: '2-4 Wochen',
  },
]

export default function IndustryNavigator() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const toggleCard = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id)
  }

  return (
    <section className="relative -mt-1 overflow-hidden pt-40 pb-52">
      {/* Wave transition from previous section */}
      <div className="absolute top-0 right-0 left-0 z-10">
        <svg
          className="h-16 w-full fill-gray-50 md:h-24"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path d="M0,40 C480,100 960,0 1440,60 L1440,0 L0,0 Z" />
        </svg>
      </div>

      {/* Static gradient background similar to HeroSection */}
      <div className="from-primary-600 via-primary-500 to-secondary-500 absolute inset-0 bg-gradient-to-br" />

      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-heading mb-4 overflow-visible pb-1 text-4xl font-bold md:text-5xl">
            <span className="from-accent to-secondary bg-gradient-to-r bg-clip-text text-transparent">
              Lösungen
            </span>
            <span className="text-white"> für jede Branche</span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-white/90">
            Wir verstehen die spezifischen Herausforderungen Ihrer Branche und liefern
            maßgeschneiderte digitale Lösungen
          </p>
        </motion.div>

        {/* Industry Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                href={`/branchen/${industry.id}`}
                className="block overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:scale-[1.02]"
              >
                {/* Card Header */}
                <div className="cursor-pointer p-6" onClick={(e) => {
                  e.preventDefault()
                  toggleCard(industry.id)
                }}>
                  <div className="mb-4 flex justify-center">
                    <div className="from-accent to-secondary rounded-xl bg-gradient-to-br p-3">
                      <industry.icon className="text-primary h-8 w-8" strokeWidth={1.5} />
                    </div>
                  </div>

                  <h3 className="mb-2 text-center text-xl font-bold text-white">
                    {industry.title}
                  </h3>

                  <div className="mb-3 flex items-center justify-center gap-4 text-sm text-white/80">
                    <span className="flex items-center gap-1">
                      <Euro className="text-accent h-4 w-4" />
                      {industry.priceRange}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="text-accent h-4 w-4" />
                      {industry.timeframe}
                    </span>
                  </div>

                  <div className="flex justify-center">
                    <motion.div
                      animate={{ rotate: expandedCard === industry.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-6 w-6 text-white/60" />
                    </motion.div>
                  </div>
                </div>

                {/* Expandable Content */}
                <AnimatePresence>
                  {expandedCard === industry.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-white/20 px-6 pt-4 pb-6">
                        <p className="mb-3 text-center font-semibold text-white">
                          Unsere Lösungen für Sie:
                        </p>
                        <ul className="mb-4 space-y-2">
                          {industry.solutions.map((solution, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle className="text-accent-500 mt-0.5 h-5 w-5 flex-shrink-0" />
                              <span className="text-sm text-white/90">{solution}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="flex gap-2">
                          <Link
                            href={`/branchen/${industry.id}`}
                            className="flex-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Button className="from-accent-500 to-secondary-500 hover:from-accent-600 hover:to-secondary-600 text-primary w-full bg-gradient-to-r font-semibold transition-all">
                              Mehr erfahren<span className="sr-only"> über {industry.title}</span>
                            </Button>
                          </Link>
                          <Link
                            href={`/contact?industry=${industry.id}`}
                            className="flex-1"
                            onClick={(e) => {
                              e.stopPropagation()
                              // Store industry context for contact form
                              if (typeof window !== 'undefined') {
                                sessionStorage.setItem(
                                  'industryContext',
                                  JSON.stringify({
                                    id: industry.id,
                                    title: industry.title,
                                    timestamp: new Date().toISOString(),
                                  })
                                )
                              }
                            }}
                          >
                            <Button
                              variant="outline"
                              className="w-full border-white/20 bg-white/5 text-white hover:bg-white/10"
                            >
                              Kontakt<span className="sr-only"> für {industry.title}</span>
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Wave transition to next section */}
      <div className="absolute right-0 bottom-0 left-0 z-10">
        <svg className="h-16 w-full md:h-24" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,40 C480,100 960,0 1440,60 L1440,120 L0,120 Z" fill="rgb(255, 255, 255)" />
        </svg>
      </div>
    </section>
  )
}
