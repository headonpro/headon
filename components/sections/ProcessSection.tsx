'use client'

import { motion } from 'framer-motion'
import { Phone, Target, Rocket, CheckCircle2 } from 'lucide-react'

const processSteps = [
  {
    id: 1,
    title: 'Verstehen',
    subtitle: 'Tag 0',
    icon: Phone,
    color: 'from-primary-600 to-primary-700',
    features: [
      '15-Minuten Erstgespräch (kostenlos)',
      'Problemanalyse und Zielsetzung',
      'Erste Lösungsideen',
      'Unverbindlich und transparent'
    ]
  },
  {
    id: 2,
    title: 'Konzeptionieren',
    subtitle: 'Tag 1-2',
    icon: Target,
    color: 'from-primary-600 to-primary-700',
    features: [
      '48h später: Konkreter Lösungsvorschlag',
      'Detailliertes Angebot mit Festpreisen',
      'Technische Spezifikationen',
      'Zeitplan und Meilensteine'
    ]
  },
  {
    id: 3,
    title: 'Realisieren',
    subtitle: '2-8 Wochen',
    icon: Rocket,
    color: 'from-primary-600 to-primary-700',
    features: [
      'Entwicklung mit regelmäßigen Updates',
      'Client-Portal für transparente Kommunikation',
      'Testing und Qualitätssicherung',
      'Go-Live und Übergabe'
    ]
  }
]

export default function ProcessSection() {
  return (
    <section className="py-24 pb-32 bg-white overflow-hidden relative -mt-1">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4 font-heading">
            Wie wir arbeiten
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Von der ersten Idee bis zum fertigen Projekt - in nur drei einfachen Schritten
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop Timeline Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 transform -translate-y-1/2" />
          
          {/* Mobile Timeline Line */}
          <div className="lg:hidden absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-orange-500" />

          {/* Process Steps */}
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-4 relative">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                {/* Mobile Step Number */}
                <div className="lg:hidden absolute left-0 top-8 w-16 h-16 bg-white rounded-full border-4 border-gray-100 flex items-center justify-center z-10">
                  <span className={`text-2xl font-bold bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                    {step.id}
                  </span>
                </div>

                {/* Card */}
                <div className="lg:text-center ml-20 lg:ml-0">
                  {/* Desktop Icon */}
                  <motion.div 
                    className="hidden lg:flex mx-auto w-20 h-20 rounded-full bg-white shadow-xl items-center justify-center mb-6 relative z-10"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="p-5 rounded-full bg-primary">
                      <step.icon className="w-10 h-10 text-accent" strokeWidth={1.5} />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        Schritt {step.id}: {step.title}
                      </h3>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold text-accent bg-gradient-to-r ${step.color}`}>
                        {step.subtitle}
                      </span>
                    </div>

                    <ul className="space-y-3 text-left">
                      {step.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 mb-6">
            Bereit, Ihr Projekt zu starten? Der erste Schritt ist nur einen Klick entfernt.
          </p>
          <a 
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-500 to-secondary-500 hover:from-accent-600 hover:to-secondary-600 text-primary font-semibold rounded-lg transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            Kostenloses Erstgespräch vereinbaren
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </a>
        </motion.div>
      </div>
      
    </section>
  )
}