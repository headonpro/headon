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
      '1 Jahr kostenloser Support',
      'SSL-Zertifikat inklusive',
      'Bis zu 5 Unterseiten',
      'Cookie-Banner (DSGVO)',
      'Google Analytics Integration'
    ],
    color: 'from-blue-500 to-indigo-500'
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
      'Mehrsprachigkeit möglich'
    ],
    highlighted: true,
    popular: true,
    color: 'from-purple-500 to-pink-500'
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
      'Langfristige Betreuung'
    ],
    color: 'from-orange-500 to-red-500'
  }
]

export default function PricingSection() {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null)

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
            Transparente Preisgestaltung
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            Ehrliche Preise ohne versteckte Kosten – Sie wissen von Anfang an, was Sie erwartet
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full">
            <Info className="w-4 h-4" />
            <span className="text-sm font-medium">
              Exakte Kosten nach kostenlosem 15-Minuten Beratungsgespräch
            </span>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8">
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
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
                >
                  <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-sm font-bold rounded-full shadow-lg">
                    <Star className="w-4 h-4 fill-white" />
                    BELIEBT
                  </div>
                </motion.div>
              )}

              <div 
                className={`
                  bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 
                  overflow-hidden h-full flex flex-col
                  ${plan.highlighted ? 'ring-2 ring-purple-500' : 'border border-gray-200'}
                `}
              >
                {/* Card Header */}
                <div className={`p-8 bg-gradient-to-br ${plan.color} text-white`}>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-white/90 mb-4">{plan.description}</p>
                  <div className="text-4xl font-bold">{plan.price}</div>
                </div>

                {/* Features */}
                <div className="p-8 flex-1">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ 
                          opacity: hoveredPlan === index ? 1 : 0.8,
                          x: hoveredPlan === index ? 0 : 0
                        }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="p-8 pt-0">
                  <Link href="/contact">
                    <Button 
                      className={`
                        w-full py-6 text-lg font-semibold
                        ${plan.highlighted 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                        }
                      `}
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
          <div className="inline-flex flex-col sm:flex-row gap-6 items-center">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">100% transparent, keine versteckten Kosten</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
              <span className="text-gray-700">Festpreise vor Projektbeginn</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-green-500" />
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
          <p className="text-gray-600 mb-4">
            Nicht sicher, welches Paket das richtige für Sie ist?
          </p>
          <Link href="/contact">
            <Button variant="outline" size="lg" className="border-primary-600 text-primary-600 hover:bg-primary-50">
              Kostenlose Beratung vereinbaren
            </Button>
          </Link>
        </motion.div>
      </div>
      
    </section>
  )
}