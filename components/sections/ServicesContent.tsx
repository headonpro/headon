'use client'

import { Code2, Smartphone, Palette, Database } from 'lucide-react'
import PricingSection from '@/components/sections/PricingSection'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const services = [
  {
    title: 'Web Development',
    slug: 'web-development',
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
    slug: 'mobile-development',
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
    slug: 'ui-ux-design',
    description: 'User-zentriertes Design mit Fokus auf Usability und Ästhetik.',
    icon: Palette,
    features: ['User Research', 'Wireframing & Prototyping', 'Design Systems', 'Usability Testing'],
  },
  {
    title: 'Backend Solutions',
    slug: 'backend-solutions',
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

export default function ServicesContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary-600 relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        {/* Static gradient background */}
        <div className="from-primary-600 via-primary-500 to-secondary-500 absolute inset-0 bg-gradient-to-br" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 pt-40 pb-40 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading mb-12 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Unsere
            <span className="from-secondary-300 via-accent-500 to-secondary-600 bg-gradient-to-r bg-clip-text text-transparent">
              {' '}
              Services
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mx-auto mb-16 max-w-3xl text-base text-white/90 md:text-lg lg:text-xl"
          >
            Von der Konzeption bis zur Umsetzung – wir bieten End-to-End Lösungen für Ihre digitalen
            Projekte.
          </motion.p>

          {/* Service Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mx-auto mb-16 grid max-w-5xl gap-10 md:grid-cols-2 lg:grid-cols-2"
          >
            {services.map((service, index) => (
              <Link key={service.title} href={`/services/${service.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="group h-full cursor-pointer overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/20"
                >
                  <div className="p-6">
                    {/* Icon */}
                    <div className="mb-4 flex justify-center">
                      <div className="from-accent to-secondary rounded-xl bg-gradient-to-br p-3 transition-transform duration-300 group-hover:scale-110">
                        <service.icon className="text-primary h-8 w-8" strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="group-hover:text-accent mb-3 text-center text-xl font-bold text-white transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="mb-4 text-center text-sm text-white/90">{service.description}</p>
                    <ul className="mb-4 space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center text-sm text-white/80">
                          <span className="text-accent mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* "Mehr erfahren" Button */}
                    <div className="mt-4 border-t border-white/10 pt-4 text-center">
                      <span className="text-accent group-hover:text-secondary text-sm font-semibold transition-colors duration-300">
                        Mehr erfahren →
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="mb-32"
          >
            <Link href="/contact">
              <Button
                size="lg"
                className="from-accent-500 to-secondary-500 hover:from-accent-600 hover:to-secondary-600 text-primary bg-gradient-to-r px-8 py-6 text-lg font-semibold shadow-xl transition-all duration-300 hover:shadow-2xl"
              >
                Projekt starten
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-2 inline-block"
                >
                  →
                </motion.span>
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Wave at bottom */}
        <div className="absolute right-0 bottom-0 left-0">
          <svg
            className="h-16 w-full fill-white md:h-24"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
          >
            <path d="M0,40 C480,100 960,0 1440,60 L1440,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />
    </>
  )
}
