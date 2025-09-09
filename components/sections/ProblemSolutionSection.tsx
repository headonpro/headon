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
    color: 'text-accent',
    bgColor: 'bg-gradient-to-br from-accent to-secondary',
  },
  {
    icon: Clock,
    title: 'Du verlierst wertvolle Zeit mit manuellen Prozessen',
    description: 'Termine, Buchungen, Anfragen - alles läuft noch per Telefon oder E-Mail statt automatisiert.',
    color: 'text-accent',
    bgColor: 'bg-gradient-to-br from-accent to-secondary',
  },
  {
    icon: TrendingDown,
    title: 'Dir entgehen täglich Umsätze durch veraltete Systeme',
    description: 'Während andere 24/7 verkaufen, ist dein Geschäft nach Feierabend geschlossen.',
    color: 'text-accent',
    bgColor: 'bg-gradient-to-br from-accent to-secondary',
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
          <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-4 font-heading">
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
              className="relative"
            >
              {/* Icon outside card */}
              <div className="flex justify-center mb-4">
                <motion.div 
                  className="inline-flex p-4 rounded-xl bg-primary-500 shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <problem.icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                </motion.div>
              </div>
              
              {/* Card content */}
              <motion.div 
                className="bg-gradient-to-br from-primary-600/90 via-primary-500/90 to-secondary-500/90 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3 leading-tight text-center">
                  {problem.title}
                </h3>
                <p className="text-white/90 leading-relaxed text-center">
                  {problem.description}
                </p>
              </motion.div>
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
          <div className="max-w-2xl mx-auto">
            <motion.div
              animate={{ 
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: 3, // 3 cycles * 2 seconds = 6 seconds total
                ease: "easeInOut"
              }}
            >
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-6">
                Wir lösen das für dich!
              </h3>
            </motion.div>
            
            <Link href="/contact">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-accent-500 to-secondary-500 hover:from-accent-600 hover:to-secondary-600 text-primary font-semibold px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
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