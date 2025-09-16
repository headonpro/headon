'use client'

import { motion } from 'framer-motion'
import { 
  Zap, 
  Shield, 
  Smartphone, 
  BarChart3, 
  Lock,
  RefreshCw,
  Cloud,
  Cpu,
  Gauge,
  HardDrive,
  TrendingUp,
  Eye
} from 'lucide-react'

const technologies = [
  {
    name: 'Next.js 15',
    description: 'Modernste Webtechnologie',
    icon: Zap,
    color: 'from-black to-gray-700'
  },
  {
    name: 'Supabase',
    description: 'Enterprise-grade Backend',
    icon: Cloud,
    color: 'from-green-500 to-green-700'
  },
  {
    name: 'DSGVO-konform',
    description: 'Datenschutz garantiert',
    icon: Shield,
    color: 'from-blue-500 to-blue-700'
  },
  {
    name: '99.9% Uptime',
    description: 'Zuverlässigkeit',
    icon: BarChart3,
    color: 'from-purple-500 to-purple-700'
  },
  {
    name: 'Mobile First',
    description: 'Perfekt auf allen Geräten',
    icon: Smartphone,
    color: 'from-orange-500 to-orange-700'
  },
  {
    name: 'SSL-Verschlüsselung',
    description: 'Sichere Datenübertragung',
    icon: Lock,
    color: 'from-red-500 to-red-700'
  },
  {
    name: 'Auto-Updates',
    description: 'Immer aktuell',
    icon: RefreshCw,
    color: 'from-cyan-500 to-cyan-700'
  },
  {
    name: 'KI-gestützt',
    description: 'Intelligente Lösungen',
    icon: Cpu,
    color: 'from-indigo-500 to-indigo-700'
  }
]

const features = [
  {
    title: 'Performance-Optimierung',
    description: 'Blitzschnelle Ladezeiten durch modernste Technologien und CDN-Integration',
    icon: Gauge
  },
  {
    title: 'Backup-Strategien',
    description: 'Automatische tägliche Backups mit 30-Tage-Historie für maximale Sicherheit',
    icon: HardDrive
  },
  {
    title: 'Skalierbare Architektur',
    description: 'Wächst mit Ihrem Unternehmen - von 10 bis 10.000+ Nutzern ohne Probleme',
    icon: TrendingUp
  },
  {
    title: '24/7 Monitoring',
    description: 'Kontinuierliche Überwachung und proaktive Fehlerbehebung',
    icon: Eye
  }
]

export default function TechnologyTrustSection() {
  return (
    <section className="py-24 pb-32 bg-gray-50 relative overflow-hidden -mt-1">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-6 font-heading pb-2">
            Modernste Technologie für Ihren Erfolg
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">
            Wir setzen auf bewährte Enterprise-Technologien, die Sicherheit, Performance und Zuverlässigkeit garantieren
          </p>
        </motion.div>

        {/* Technology Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group"
            >
              <motion.div
                className="bg-white/80 backdrop-blur-lg border border-white/20 shadow-xl hover:shadow-2xl rounded-2xl p-6 transition-all duration-300 hover:bg-white/90 h-full"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className="inline-flex p-3 rounded-xl bg-accent-500 shadow-lg">
                    <tech.icon className="w-8 h-8 text-primary-600" strokeWidth={2.5} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-bold text-gray-800 mb-1 text-center">{tech.name}</h3>
                <p className="text-sm text-gray-600 text-center">{tech.description}</p>

                {/* Subtle accent line */}
                <div className="w-full h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-3 opacity-60"></div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/80 backdrop-blur-lg border border-white/20 shadow-xl rounded-3xl p-8 md:p-12"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Zusätzliche Sicherheitsfeatures
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="inline-flex p-2 rounded-lg bg-accent-500 shadow-sm">
                    <feature.icon className="w-6 h-6 text-primary-600" strokeWidth={2.5} />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Subtle accent line */}
          <div className="w-full h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mt-8 opacity-60"></div>
        </motion.div>

        {/* Trust Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-100 text-green-800 rounded-full">
            <Shield className="w-5 h-5" />
            <span className="font-semibold">
              Alle Systeme werden regelmäßig aktualisiert und gewartet
            </span>
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