'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Users, Clock, Star } from 'lucide-react'

interface CaseStudy {
  id: string
  client: string
  industry: string
  problem: string
  solution: string
  results: {
    metric: string
    value: string
    icon: React.ComponentType<{ className?: string; strokeWidth?: number }>
  }[]
  testimonial: string
  image?: string
}

const caseStudies: CaseStudy[] = [
  {
    id: 'restaurant-mueller',
    client: 'Restaurant Müller',
    industry: 'Gastronomie',
    problem: 'Reservierungen nur telefonisch möglich',
    solution: 'Online-Reservierungssystem mit Tischplanung',
    results: [
      { metric: 'Buchungen', value: '+40%', icon: TrendingUp },
      { metric: 'Telefonanrufe', value: '-60%', icon: Clock },
    ],
    testimonial:
      'Endlich haben wir Zeit für unsere Gäste statt für das Telefon. Die Online-Reservierungen laufen wie von selbst!',
    image: '/images/restaurant-case.jpg',
  },
  {
    id: 'handwerker-schmidt',
    client: 'Handwerker Schmidt',
    industry: 'Handwerk',
    problem: 'Termine wurden manuell in Excel verwaltet',
    solution: 'Digitales Terminbuchungssystem',
    results: [
      { metric: 'Effizienz', value: '+25%', icon: TrendingUp },
      { metric: 'Zeitersparnis', value: '10h/Woche', icon: Clock },
    ],
    testimonial:
      'Die automatische Terminvergabe hat unseren Arbeitsalltag revolutioniert. Kein Chaos mehr!',
    image: '/images/handwerk-case.jpg',
  },
  {
    id: 'boutique-weber',
    client: 'Boutique Weber',
    industry: 'Einzelhandel',
    problem: 'Kein Online-Verkauf möglich',
    solution: 'E-Commerce Shop mit Warenwirtschaft',
    results: [
      { metric: 'Umsatz', value: '+150%', icon: TrendingUp },
      { metric: 'Neue Kunden', value: '+200', icon: Users },
    ],
    testimonial:
      'Der Online-Shop hat uns durch die schwierige Zeit gerettet und neue Märkte erschlossen.',
    image: '/images/boutique-case.jpg',
  },
  {
    id: 'coach-meyer',
    client: 'Coach Meyer',
    industry: 'Beratung',
    problem: 'Kurse nur vor Ort möglich',
    solution: 'Online-Kursplattform mit Mitgliederbereich',
    results: [
      { metric: 'Teilnehmer', value: '+300', icon: Users },
      { metric: 'Reichweite', value: 'Bundesweit', icon: TrendingUp },
    ],
    testimonial:
      'Jetzt kann ich Menschen in ganz Deutschland helfen. Die Plattform läuft vollautomatisch!',
    image: '/images/coach-case.jpg',
  },
]

export default function SuccessStoriesSection() {
  return (
    <section className="relative -mt-1 bg-gray-50 py-24 pb-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-heading mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Erfolgsgeschichten unserer Kunden
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Echte Ergebnisse von echten Unternehmen – so haben wir anderen geholfen zu wachsen
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl"
            >
              {/* Card Content */}
              <div className="p-8">
                {/* Header */}
                <div className="mb-6 flex items-start justify-between">
                  <div>
                    <h3 className="mb-1 text-2xl font-bold text-gray-900">{study.client}</h3>
                    <span className="bg-primary-100 text-primary-700 inline-block rounded-full px-3 py-1 text-sm font-medium">
                      {study.industry}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>

                {/* Problem & Solution */}
                <div className="mb-6 space-y-4">
                  <div>
                    <h4 className="mb-1 font-semibold text-gray-700">Problem:</h4>
                    <p className="text-gray-600">{study.problem}</p>
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-gray-700">Lösung:</h4>
                    <p className="text-gray-600">{study.solution}</p>
                  </div>
                </div>

                {/* Results */}
                <div className="mb-6 grid grid-cols-2 gap-4">
                  {study.results.map((result, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-4 text-center"
                    >
                      <result.icon className="text-primary-600 mx-auto mb-2 h-8 w-8" />
                      <div className="text-2xl font-bold text-gray-900">{result.value}</div>
                      <div className="text-sm text-gray-600">{result.metric}</div>
                    </div>
                  ))}
                </div>

                {/* Testimonial */}
                <blockquote className="border-primary-500 border-l-4 pl-4 text-gray-700 italic">
                  &quot;{study.testimonial}&quot;
                </blockquote>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col items-center justify-center gap-8 sm:flex-row">
            <div className="text-center">
              <div className="text-primary-600 text-4xl font-bold">90+</div>
              <div className="text-gray-600">Lighthouse Score</div>
            </div>
            <div className="hidden h-12 w-px bg-gray-300 sm:block" />
            <div className="text-center">
              <div className="text-primary-600 text-4xl font-bold">100%</div>
              <div className="text-gray-600">Kundenzufriedenheit</div>
            </div>
            <div className="hidden h-12 w-px bg-gray-300 sm:block" />
            <div className="text-center">
              <div className="text-primary-600 text-4xl font-bold">4x</div>
              <div className="text-gray-600">Schneller durch KI</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
