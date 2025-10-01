'use client'

import React from 'react'
import { Users, Target, Zap, Shield } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import AnimatedRobot from '@/components/icons/AnimatedRobot'
import Image from 'next/image'
import Breadcrumbs from '@/components/seo/Breadcrumbs'

const values = [
  {
    name: 'Innovation',
    description: 'Wir nutzen die neuesten Technologien und Methoden, um zukunftssichere Lösungen zu entwickeln.',
    icon: Zap,
  },
  {
    name: 'Qualität',
    description: 'Höchste Standards in Code-Qualität, Design und User Experience sind unser Anspruch.',
    icon: Shield,
  },
  {
    name: 'Partnerschaft',
    description: 'Wir arbeiten eng mit unseren Kunden zusammen und verstehen uns als Teil Ihres Teams.',
    icon: Users,
  },
  {
    name: 'Ergebnisorientierung',
    description: 'Ihr Erfolg ist unser Erfolg. Wir fokussieren uns auf messbare Ergebnisse.',
    icon: Target,
  },
]

const stats = [
  { label: 'Jahre Erfahrung', value: '10+' },
  { label: 'Zufriedenheit', value: '100%' },
  { label: 'K.I. Modelle', value: '12+' },
  { label: 'Team', value: '1+', icon: AnimatedRobot },
]

export default function AboutContent() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Gradient Background - same as HeroSection */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500" />

      {/* Animated Gradient Layers */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-60"
          animate={{
            background: isMobile ? [
              'radial-gradient(circle at 30% 70%, rgba(255, 140, 0, 0.5) 0%, transparent 40%)',
              'radial-gradient(circle at 70% 30%, rgba(255, 215, 0, 0.5) 0%, transparent 40%)',
              'radial-gradient(circle at 30% 70%, rgba(255, 140, 0, 0.5) 0%, transparent 40%)',
            ] : [
              'radial-gradient(circle at 20% 80%, rgba(255, 140, 0, 0.4) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.4) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 40%, rgba(255, 140, 0, 0.4) 0%, transparent 50%)',
              'radial-gradient(circle at 60% 60%, rgba(255, 215, 0, 0.4) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 80%, rgba(255, 140, 0, 0.4) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: isMobile ? 8 : 10,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            transform: 'translateZ(0)',
            willChange: 'background'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 pt-24 pb-24">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 mb-8">
          <Breadcrumbs
            variant="dark"
            items={[
              { name: 'Home', url: '/' },
              { name: 'Über uns', url: '/about' },
            ]}
          />
        </div>
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-24"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl mb-12 flex items-center justify-center gap-4 font-heading"
          >
            Über{' '}
            <Image
              src="/headon-logo.svg"
              alt="HEADON"
              width={200}
              height={50}
              className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto"
            />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-white/90 max-w-3xl mx-auto"
          >
            Wir sind eine moderne Kreativagentur, die sich auf die Entwicklung innovativer digitaler Lösungen spezialisiert hat.
            Mit Leidenschaft und Expertise transformieren wir Ideen in erfolgreiche digitale Produkte.
          </motion.p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-8 lg:p-12 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl font-bold mb-8 text-accent-500"
            >
              Unsere Mission
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-white/90 mb-8 max-w-4xl mx-auto"
            >
              Wir glauben daran, dass großartige digitale Produkte Unternehmen transformieren können.
              Unsere Mission ist es, unseren Kunden dabei zu helfen, durch innovative Technologie und
              herausragendes Design ihre Ziele zu erreichen und ihre Vision Wirklichkeit werden zu lassen.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg text-white/90 max-w-4xl mx-auto"
            >
              Dabei setzen wir auf modernste Technologien, agile Entwicklungsmethoden und eine enge
              Zusammenarbeit mit unseren Kunden. Jedes Projekt ist für uns eine neue Herausforderung,
              der wir uns mit Begeisterung und Professionalität stellen.
            </motion.p>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-32"
        >
          <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-8 lg:p-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl font-bold text-center mb-16 text-accent-500"
            >
              Unsere Werte
            </motion.h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="text-center flex flex-col"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/20 text-white">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">{value.name}</h3>
                <p className="text-sm text-white/80 mb-8 flex-grow">{value.description}</p>
              </motion.div>
            ))}
            </div>

            {/* Continuous divider line */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 pt-12 border-t border-white/20"
            >
              <div className="grid gap-8 md:grid-cols-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                      {stat.value}
                      {stat.icon && React.createElement(stat.icon, { className: "w-6 h-6 text-accent-500" })}
                    </div>
                    <div className="text-xs text-white/80">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-8 lg:p-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl font-bold text-center mb-16 text-accent-500"
            >
              Unser Prozess
            </motion.h2>
            <div className="grid gap-10 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/30">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Discover</h3>
              <p className="text-sm text-white/80">
                Wir verstehen Ihre Vision, analysieren Ihre Anforderungen und entwickeln eine maßgeschneiderte Strategie.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/30">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Design &amp; Develop</h3>
              <p className="text-sm text-white/80">
                Mit agilen Methoden setzen wir Ihre Ideen in hochwertige digitale Produkte um.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/30">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Deploy &amp; Support</h3>
              <p className="text-sm text-white/80">
                Nach dem Launch begleiten wir Sie weiter und sorgen für kontinuierliche Optimierung.
              </p>
            </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
      </div>
    </div>
  )
}