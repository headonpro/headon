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
  CheckCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Industry {
  id: string
  title: string
  icon: any
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
      'Lieferservice-Plattform ohne Provisionen'
    ],
    priceRange: 'ab 2.500€',
    timeframe: '2-4 Wochen'
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
      'Kundenverwaltung mit Historie'
    ],
    priceRange: 'ab 3.000€',
    timeframe: '3-5 Wochen'
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
      'Digitale Kundenkarten'
    ],
    priceRange: 'ab 5.000€',
    timeframe: '4-6 Wochen'
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
      'Klienten-Portal mit Dokumenten'
    ],
    priceRange: 'ab 4.000€',
    timeframe: '3-5 Wochen'
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
      'Interessenten-Management'
    ],
    priceRange: 'ab 6.000€',
    timeframe: '4-8 Wochen'
  },
  {
    id: 'fitness',
    title: 'Fitness & Wellness',
    icon: Heart,
    color: 'text-red-600',
    bgGradient: 'from-red-500 to-pink-500',
    solutions: [
      'Mitglieder-App mit Check-in',
      'Online-Kursbuchung',
      'Ernährungsplan-Portal'
    ],
    priceRange: 'ab 4.500€',
    timeframe: '3-6 Wochen'
  }
]

export default function IndustryNavigator() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const toggleCard = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id)
  }

  return (
    <section className="py-24 pb-32 relative overflow-hidden -mt-1">
      {/* Static gradient background similar to HeroSection */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500" />
      
      <div className="relative z-10 container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-heading">
            Lösungen für jede Branche
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Wir verstehen die spezifischen Herausforderungen Ihrer Branche und liefern maßgeschneiderte digitale Lösungen
          </p>
        </motion.div>

        {/* Industry Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 overflow-hidden">
                {/* Card Header */}
                <div 
                  className="p-6 cursor-pointer"
                  onClick={() => toggleCard(industry.id)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${industry.bgGradient} bg-opacity-10`}>
                      <industry.icon className="w-8 h-8 text-accent-500" strokeWidth={1.5} />
                    </div>
                    <motion.div
                      animate={{ rotate: expandedCard === industry.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-6 h-6 text-white/60" />
                    </motion.div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">
                    {industry.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-sm text-white/80">
                    <span className="flex items-center gap-1">
                      <Euro className="w-4 h-4 text-accent-500" />
                      {industry.priceRange}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-accent-500" />
                      {industry.timeframe}
                    </span>
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
                      <div className="px-6 pb-6 border-t border-white/20 pt-4">
                        <h4 className="font-semibold text-white mb-3">
                          Unsere Lösungen für Sie:
                        </h4>
                        <ul className="space-y-2 mb-4">
                          {industry.solutions.map((solution, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-accent-500 mt-0.5 flex-shrink-0" />
                              <span className="text-white/90 text-sm">{solution}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <Link 
                          href={`/contact?industry=${industry.id}`}
                          onClick={(e) => {
                            // Store industry context for contact form
                            if (typeof window !== 'undefined') {
                              sessionStorage.setItem('industryContext', JSON.stringify({
                                id: industry.id,
                                title: industry.title,
                                timestamp: new Date().toISOString()
                              }))
                            }
                          }}
                        >
                          <Button 
                            className={`w-full bg-gradient-to-r ${industry.bgGradient} text-white hover:opacity-90 transition-opacity`}
                          >
                            Sofort loslegen
                          </Button>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Wave transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg className="w-full h-16 md:h-24" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,40 C480,100 960,0 1440,60 L1440,120 L0,120 Z" fill="rgb(255, 255, 255)" />
        </svg>
      </div>
    </section>
  )
}