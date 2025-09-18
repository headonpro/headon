'use client'

import { motion } from 'framer-motion'
import { Zap, Trophy, CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

const advantages = [
  {
    icon: Zap,
    title: '4x Schneller',
    subtitle: 'Von der Idee zum Launch in Rekordzeit',
    mainMetric: '2-4 Wochen',
    comparison: 'statt 12-16 Wochen',
    color: 'text-accent-500',
    bgColor: 'bg-accent-500/10',
    gradient: 'from-green-500 to-emerald-500',
    features: [
      'KI-beschleunigtes Konzept & Design',
      'Automatisierte Code-Generierung',
      'Parallele Entwicklungsprozesse',
      'One-Click Deployment'
    ]
  },
  {
    icon: Zap,
    title: 'Fastlane Produktion',
    subtitle: 'Eilige Projekte in Rekordzeit',
    mainMetric: '3-7 Tage',
    comparison: 'für komplette Projekte',
    color: 'text-accent-500',
    bgColor: 'bg-accent-500/10',
    gradient: 'from-blue-500 to-cyan-500',
    features: [
      'Express-Umsetzung für eilige Projekte',
      'Komplette Webseiten & Apps',
      'Höchste Priorität & Fokus',
      '24/7 Entwicklung möglich'
    ]
  },
  {
    icon: Trophy,
    title: '2x Bessere Performance',
    subtitle: 'Messbar überlegene Ergebnisse',
    mainMetric: '90+ Score',
    comparison: 'Lighthouse Performance',
    color: 'text-accent-500',
    bgColor: 'bg-accent-500/10',
    gradient: 'from-purple-500 to-pink-500',
    features: [
      'Blitzschnelle Ladezeiten (< 2s)',
      'Mobile-First Architektur',
      'SEO-optimiert von Anfang an',
      '99.9% Uptime garantiert'
    ]
  }
]

export default function KIAdvantageSection() {
  return (
    <section className="pt-40 pb-52 relative overflow-hidden -mt-1">
      {/* Wave transition from previous section */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <svg className="w-full h-16 md:h-24 fill-white" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,40 C480,100 960,0 1440,60 L1440,0 L0,0 Z" />
        </svg>
      </div>
      
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
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-12 md:mb-16 font-heading flex items-center justify-center gap-4 flex-wrap">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary">Warum</span>
            <Image 
              src="/headon-logo.svg" 
              alt="HEADON.pro Logo - Digitalagentur Freiburg" 
              width={200} 
              height={45}
              className="inline-block"
            />
            <span>anders ist</span>
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12 md:mb-20">
            KI-gestützte Entwicklung revolutioniert, wie wir Projekte umsetzen. 
            Schneller, günstiger und besser - das ist kein Versprechen, sondern messbare Realität.
          </p>
        </motion.div>

        {/* Advantages Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16 mt-16 md:mt-24">
          {advantages.map((advantage, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="relative group"
            >
              <div className={`${index === 1 ? 'bg-gradient-to-br from-accent-500/20 to-secondary-500/20 border-accent-500/30 shadow-2xl shadow-accent-500/20 lg:-mt-8 lg:mb-8 lg:py-10' : 'bg-white/10 border-white/20'} backdrop-blur-sm rounded-2xl p-8 border hover:bg-white/15 transition-all duration-300 h-full relative overflow-hidden`}>
                {/* Background Gradient on Hover */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${advantage.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />
                
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className={`inline-flex p-4 rounded-xl ${advantage.bgColor}`}>
                    <advantage.icon className={`w-8 h-8 ${advantage.color}`} strokeWidth={1.5} />
                  </div>
                </div>
                
                {/* Title & Subtitle */}
                <h3 className="text-2xl font-bold text-white mb-2 text-center">
                  {advantage.title}
                </h3>
                <p className="text-white/80 mb-6 text-center">
                  {advantage.subtitle}
                </p>
                
                {/* Main Metric */}
                <div className="mb-6 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10">
                  <div className="text-3xl font-bold text-accent text-center">
                    {advantage.mainMetric}
                  </div>
                  <div className="text-sm text-white/70 mt-1 text-center">
                    {advantage.comparison}
                  </div>
                </div>
                
                {/* Features List */}
                <ul className="space-y-3">
                  {advantage.features.map((feature, idx) => (
                    <motion.li 
                      key={idx} 
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 + idx * 0.05 }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-accent-500 mt-0.5 flex-shrink-0" />
                      <span className="text-white/90 text-sm leading-relaxed">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-white/90 mb-8">
              Während traditionelle Agenturen noch Konzepte erstellen, 
              haben wir Ihr Projekt bereits fertiggestellt.
            </p>
            
            <div className="flex justify-center">
              <Link href="/contact">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-accent-500 to-secondary-500 hover:from-accent-600 hover:to-secondary-600 text-primary font-semibold px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group"
                >
                  Kostenloses Erstgespräch
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                <CheckCircle2 className="w-4 h-4" />
                100% Zufrieden oder Geld zurück
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Wave transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg className="w-full h-16 md:h-24" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,40 C480,100 960,0 1440,60 L1440,120 L0,120 Z" fill="rgb(249, 250, 251)" />
        </svg>
      </div>
    </section>
  )
}