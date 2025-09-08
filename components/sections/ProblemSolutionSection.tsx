'use client'

import { motion } from 'framer-motion'
import { Search, Clock, TrendingDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const problems = [
  {
    icon: Search,
    title: 'Kunden suchen dich online - finden aber nur die Konkurrenz',
    description: 'Ohne professionelle Online-Präsenz verlierst du täglich potenzielle Kunden an deine Mitbewerber.',
    color: 'text-primary-600',
    bgColor: 'bg-primary-600/10',
  },
  {
    icon: Clock,
    title: 'Du verlierst wertvolle Zeit mit manuellen Prozessen',
    description: 'Termine, Buchungen, Anfragen - alles läuft noch per Telefon oder E-Mail statt automatisiert.',
    color: 'text-primary-600',
    bgColor: 'bg-primary-600/10',
  },
  {
    icon: TrendingDown,
    title: 'Dir entgehen täglich Umsätze durch veraltete Systeme',
    description: 'Während andere 24/7 verkaufen, ist dein Geschäft nach Feierabend geschlossen.',
    color: 'text-primary-600',
    bgColor: 'bg-primary-600/10',
  },
]

export default function ProblemSolutionSection() {
  return (
    <section className="py-24 pb-32 bg-gradient-to-b from-white to-gray-50 relative -mt-1">
      <div className="container mx-auto px-4">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 font-heading">
            Kennst du das?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Diese Herausforderungen kosten dich jeden Tag Geld und Nerven
          </p>
        </motion.div>

        {/* Problems Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-gray-100">
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-xl ${problem.bgColor} mb-6`}>
                  <problem.icon className={`w-8 h-8 ${problem.color}`} strokeWidth={1.5} />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">
                  {problem.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {problem.description}
                </p>
                
                {/* Decorative element */}
                <motion.div
                  className="absolute -z-10 inset-0 rounded-2xl bg-gradient-to-br from-primary-500/5 to-secondary-500/5"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Solution CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <div className="inline-block">
            <motion.div
              animate={{ 
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 mb-6">
                Wir lösen das für dich!
              </h3>
            </motion.div>
            
            <Link href="/contact">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Jetzt Lösung entdecken
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="inline-block ml-2"
                >
                  →
                </motion.span>
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
      
    </section>
  )
}