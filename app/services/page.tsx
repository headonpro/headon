'use client'

import { Code2, Smartphone, Palette, Database } from 'lucide-react'
import PricingSection from '@/components/sections/PricingSection'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const services = [
  {
    title: 'Web Development',
    description: 'Moderne, performante Webanwendungen mit Next.js, React und TypeScript.',
    icon: Code2,
    features: [
      'Progressive Web Apps',
      'E-Commerce Lösungen',
      'Enterprise Anwendungen',
      'API Integration',
    ],
  },
  {
    title: 'Mobile Development',
    description: 'Native und Cross-Platform Apps für iOS und Android mit React Native.',
    icon: Smartphone,
    features: [
      'iOS & Android Apps',
      'Cross-Platform Development',
      'App Store Optimierung',
      'Push Notifications',
    ],
  },
  {
    title: 'UI/UX Design',
    description: 'User-zentriertes Design mit Fokus auf Usability und Ästhetik.',
    icon: Palette,
    features: [
      'User Research',
      'Wireframing & Prototyping',
      'Design Systems',
      'Usability Testing',
    ],
  },
  {
    title: 'Backend Solutions',
    description: 'Skalierbare Cloud-Infrastruktur und API-Entwicklung mit Supabase.',
    icon: Database,
    features: [
      'Cloud Infrastructure',
      'API Development',
      'Database Design',
      'Authentication & Security',
    ],
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-primary-600">
        {/* Static gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 pt-32 pb-32 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl font-heading"
          >
            Unsere
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-300 via-accent-500 to-secondary-600">
              {' '}Services
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-12 text-white/90 text-base md:text-lg lg:text-xl max-w-3xl mx-auto"
          >
            Von der Konzeption bis zur Umsetzung – wir bieten End-to-End Lösungen für Ihre digitalen Projekte.
          </motion.p>
          
          {/* Service Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-5xl mx-auto mb-12"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-accent to-secondary">
                      <service.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3 text-center">{service.title}</h3>
                  <p className="text-white/90 mb-4 text-center text-sm">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center text-sm text-white/80">
                        <span className="mr-2 text-accent">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mb-24"
          >
            <Link href="/contact">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-accent-500 to-secondary-500 hover:from-accent-600 hover:to-secondary-600 text-primary font-semibold px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Projekt starten
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="inline-block ml-2"
                >
                  →
                </motion.span>
              </Button>
            </Link>
          </motion.div>
        </div>
        
        {/* Wave at bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-16 md:h-24 fill-white" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,40 C480,100 960,0 1440,60 L1440,120 L0,120 Z" />
          </svg>
        </div>
      </section>
      
      {/* Pricing Section */}
      <PricingSection />
    </>
  )
}