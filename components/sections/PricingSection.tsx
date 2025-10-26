'use client'

import { motion } from 'framer-motion'
import { Check, Star, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useState } from 'react'

interface PricingPlan {
  name: string
  price: string
  description: string
  features: string[]
  highlighted?: boolean
  popular?: boolean
  color: string
}

const pricingPlans: PricingPlan[] = [
  {
    name: 'Starter Website',
    price: 'ab 2.500€',
    description: 'Perfekt für den digitalen Einstieg',
    features: [
      'Responsive Design für alle Geräte',
      'Basis-SEO für Google-Sichtbarkeit',
      'Kontaktformular mit E-Mail-Weiterleitung',
      '6 Monate kostenloser Support',
      'SSL-Zertifikat inklusive',
      'Bis zu 5 Unterseiten',
      'Cookie-Banner (DSGVO)',
      'Google Analytics Integration',
    ],
    color: 'from-primary-500 to-primary-600',
  },
  {
    name: 'Professional',
    price: 'ab 5.000€',
    description: 'Für wachsende Unternehmen',
    features: [
      'Alles aus Starter Website',
      'CMS-Integration für eigene Inhalte',
      'Erweiterte SEO-Optimierung',
      'Analytics Dashboard',
      'Client-Portal Zugang',
      'Bis zu 20 Unterseiten',
      'Newsletter-Integration',
      'Social Media Verknüpfung',
      'Mehrsprachigkeit möglich',
    ],
    highlighted: true,
    popular: true,
    color: 'from-primary-500 to-secondary-500',
  },
  {
    name: 'Enterprise Custom',
    price: 'ab 10.000€',
    description: 'Maßgeschneiderte Lösungen',
    features: [
      'Alles aus Professional',
      'Individuelle Entwicklung',
      'API-Integrationen',
      'Skalierbare Cloud-Architektur',
      'Dedizierter Account Manager',
      'Unbegrenzte Seiten',
      'A/B Testing Tools',
      'Performance Monitoring',
      'Priority Support 24/7',
      'Langfristige Betreuung',
    ],
    color: 'from-secondary-500 to-secondary-600',
  },
]

export default function PricingSection() {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null)

  return (
    <section className="relative -mt-1 bg-gray-50 pt-32 pb-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="from-primary to-secondary font-heading mb-6 bg-gradient-to-r bg-clip-text pb-2 text-4xl font-bold text-transparent md:text-5xl">
            Transparente Preisgestaltung
          </h2>
          <p className="mx-auto mb-4 max-w-3xl text-xl text-gray-600">
            Ehrliche Preise ohne versteckte Kosten – Sie wissen von Anfang an, was Sie erwartet
          </p>
          <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-green-800">
            <Info className="h-4 w-4" />
            <span className="text-sm font-medium">
              Exakte Kosten nach kostenlosem 15-Minuten Beratungsgespräch
            </span>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onHoverStart={() => setHoveredPlan(index)}
              onHoverEnd={() => setHoveredPlan(null)}
              className={`relative ${plan.highlighted ? 'lg:-mt-4' : ''}`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 transform"
                >
                  <div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 px-3 py-1 text-sm font-bold text-white shadow-lg">
                    <Star className="h-4 w-4 fill-white" />
                    BELIEBT
                  </div>
                </motion.div>
              )}

              <div
                className={`flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl ${plan.highlighted ? 'ring-2 ring-purple-500' : 'border border-gray-200'} `}
              >
                {/* Card Header */}
                <div className={`bg-gradient-to-br p-8 ${plan.color} text-white`}>
                  <h3 className="mb-2 text-2xl font-bold">{plan.name}</h3>
                  <p className="mb-4 text-white/90">{plan.description}</p>
                  <div className="text-4xl font-bold">{plan.price}</div>
                </div>

                {/* Features */}
                <div className="flex-1 p-8">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{
                          opacity: hoveredPlan === index ? 1 : 0.8,
                          x: hoveredPlan === index ? 0 : 0,
                        }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="p-8 pt-0">
                  <Link href="/contact">
                    <Button
                      className={`from-accent-500 to-secondary-500 hover:from-accent-600 hover:to-secondary-600 text-primary w-full bg-gradient-to-r py-6 text-lg font-semibold`}
                    >
                      Angebot anfordern
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Statements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col items-center gap-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-500" />
              <span className="text-gray-700">100% transparent, keine versteckten Kosten</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-500" />
              <span className="text-gray-700">Festpreise vor Projektbeginn</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-500" />
              <span className="text-gray-700">Geld-zurück-Garantie bei Unzufriedenheit</span>
            </div>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="mb-4 text-gray-600">
            Nicht sicher, welches Paket das richtige für Sie ist?
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="from-accent-500 to-secondary-500 hover:from-accent-600 hover:to-secondary-600 text-primary bg-gradient-to-r font-semibold"
            >
              Kostenlose Beratung vereinbaren
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
