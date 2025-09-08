'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Users, Clock, Star } from 'lucide-react'
import Image from 'next/image'

interface CaseStudy {
  id: string
  client: string
  industry: string
  problem: string
  solution: string
  results: {
    metric: string
    value: string
    icon: any
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
      { metric: 'Telefonanrufe', value: '-60%', icon: Clock }
    ],
    testimonial: 'Endlich haben wir Zeit für unsere Gäste statt für das Telefon. Die Online-Reservierungen laufen wie von selbst!',
    image: '/images/restaurant-case.jpg'
  },
  {
    id: 'handwerker-schmidt',
    client: 'Handwerker Schmidt',
    industry: 'Handwerk',
    problem: 'Termine wurden manuell in Excel verwaltet',
    solution: 'Digitales Terminbuchungssystem',
    results: [
      { metric: 'Effizienz', value: '+25%', icon: TrendingUp },
      { metric: 'Zeitersparnis', value: '10h/Woche', icon: Clock }
    ],
    testimonial: 'Die automatische Terminvergabe hat unseren Arbeitsalltag revolutioniert. Kein Chaos mehr!',
    image: '/images/handwerk-case.jpg'
  },
  {
    id: 'boutique-weber',
    client: 'Boutique Weber',
    industry: 'Einzelhandel',
    problem: 'Kein Online-Verkauf möglich',
    solution: 'E-Commerce Shop mit Warenwirtschaft',
    results: [
      { metric: 'Umsatz', value: '+150%', icon: TrendingUp },
      { metric: 'Neue Kunden', value: '+200', icon: Users }
    ],
    testimonial: 'Der Online-Shop hat uns durch die schwierige Zeit gerettet und neue Märkte erschlossen.',
    image: '/images/boutique-case.jpg'
  },
  {
    id: 'coach-meyer',
    client: 'Coach Meyer',
    industry: 'Beratung',
    problem: 'Kurse nur vor Ort möglich',
    solution: 'Online-Kursplattform mit Mitgliederbereich',
    results: [
      { metric: 'Teilnehmer', value: '+300', icon: Users },
      { metric: 'Reichweite', value: 'Bundesweit', icon: TrendingUp }
    ],
    testimonial: 'Jetzt kann ich Menschen in ganz Deutschland helfen. Die Plattform läuft vollautomatisch!',
    image: '/images/coach-case.jpg'
  }
]

export default function SuccessStoriesSection() {
  return (
    <section className="py-24 pb-32 bg-gray-50 relative -mt-1">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-heading">
            Erfolgsgeschichten unserer Kunden
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Echte Ergebnisse von echten Unternehmen – so haben wir anderen geholfen zu wachsen
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Card Content */}
              <div className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">
                      {study.client}
                    </h3>
                    <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                      {study.industry}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>

                {/* Problem & Solution */}
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Problem:</h4>
                    <p className="text-gray-600">{study.problem}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Lösung:</h4>
                    <p className="text-gray-600">{study.solution}</p>
                  </div>
                </div>

                {/* Results */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {study.results.map((result, idx) => (
                    <div 
                      key={idx}
                      className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 text-center"
                    >
                      <result.icon className="w-8 h-8 mx-auto mb-2 text-primary-600" />
                      <div className="text-2xl font-bold text-gray-900">{result.value}</div>
                      <div className="text-sm text-gray-600">{result.metric}</div>
                    </div>
                  ))}
                </div>

                {/* Testimonial */}
                <blockquote className="border-l-4 border-primary-500 pl-4 italic text-gray-700">
                  "{study.testimonial}"
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
          <div className="inline-flex flex-col sm:flex-row gap-8 items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600">50+</div>
              <div className="text-gray-600">Zufriedene Kunden</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-gray-300" />
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600">98%</div>
              <div className="text-gray-600">Kundenzufriedenheit</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-gray-300" />
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600">100%</div>
              <div className="text-gray-600">Weiterempfehlung</div>
            </div>
          </div>
        </motion.div>
      </div>
      
    </section>
  )
}