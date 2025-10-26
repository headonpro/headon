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
      'Unverbindlich und transparent',
    ],
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
      'Zeitplan und Meilensteine',
    ],
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
      'Go-Live und Übergabe',
    ],
  },
]

export default function ProcessSection() {
  return (
    <section className="relative -mt-1 overflow-hidden bg-white py-24 pb-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="from-primary to-secondary font-heading mb-4 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Wie wir arbeiten
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Von der ersten Idee bis zum fertigen Projekt - in nur drei einfachen Schritten
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop Timeline Line */}
          <div className="absolute top-1/2 right-0 left-0 hidden h-1 -translate-y-1/2 transform bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 lg:block" />

          {/* Mobile Timeline Line */}
          <div className="absolute top-0 bottom-0 left-8 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-orange-500 lg:hidden" />

          {/* Process Steps */}
          <div className="relative grid gap-8 lg:grid-cols-3 lg:gap-4">
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
                <div className="absolute top-8 left-0 z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 border-gray-100 bg-white lg:hidden">
                  <span
                    className={`bg-gradient-to-r text-2xl font-bold ${step.color} bg-clip-text text-transparent`}
                  >
                    {step.id}
                  </span>
                </div>

                {/* Card */}
                <div className="ml-20 lg:ml-0 lg:text-center">
                  {/* Desktop Icon */}
                  <div className="mb-6 hidden justify-center lg:flex">
                    <motion.div
                      className="bg-accent-500 inline-flex rounded-xl p-4 shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                    >
                      <step.icon className="text-primary-600 h-8 w-8" strokeWidth={2.5} />
                    </motion.div>
                  </div>

                  {/* Glasmorphism Content Card */}
                  <div className="rounded-2xl border border-white/20 bg-white/80 p-6 shadow-xl backdrop-blur-lg transition-all duration-300 hover:bg-white/90 hover:shadow-2xl lg:p-8">
                    <div className="mb-4">
                      <h3 className="mb-1 text-2xl font-bold text-gray-800">
                        Schritt {step.id}: {step.title}
                      </h3>
                      <span className="text-primary-600 bg-accent-100/80 inline-block rounded-full px-3 py-1 text-sm font-semibold backdrop-blur-sm">
                        {step.subtitle}
                      </span>
                    </div>

                    <ul className="space-y-3 text-left">
                      {step.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2
                            className="text-primary-500 mt-0.5 h-5 w-5 flex-shrink-0"
                            strokeWidth={2.5}
                          />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Subtle accent line */}
                    <div className="from-primary to-secondary mt-6 h-1 w-full rounded-full bg-gradient-to-r opacity-60 lg:mx-auto"></div>
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
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="mx-auto max-w-2xl">
            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: 3, // 3 cycles * 2 seconds = 6 seconds total
                ease: 'easeInOut',
              }}
            >
              <h3 className="from-primary to-secondary mb-6 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent">
                Bereit, Ihr Projekt zu starten?
              </h3>
            </motion.div>

            <a
              href="/contact"
              className="from-accent-500 to-secondary-500 hover:from-accent-600 hover:to-secondary-600 text-primary inline-flex items-center gap-2 rounded-lg bg-gradient-to-r px-8 py-4 text-lg font-semibold shadow-xl transition-all duration-300 hover:shadow-2xl"
            >
              Kostenloses Erstgespräch vereinbaren
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="ml-2 inline-block"
              >
                →
              </motion.span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
