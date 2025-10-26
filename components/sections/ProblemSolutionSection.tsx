'use client'

import { motion } from 'framer-motion'
import { Search, Clock, TrendingDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const problems = [
  {
    icon: Search,
    title: 'Kunden suchen dich online - finden aber nur die Konkurrenz',
    description:
      'Ohne professionelle Online-Präsenz verlierst du täglich potenzielle Kunden an deine Mitbewerber.',
    color: 'text-accent',
    bgColor: 'bg-gradient-to-br from-accent to-secondary',
  },
  {
    icon: Clock,
    title: 'Du verlierst wertvolle Zeit mit manuellen Prozessen',
    description:
      'Termine, Buchungen, Anfragen - alles läuft noch per Telefon oder E-Mail statt automatisiert.',
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
    <section className="relative -mt-1 bg-gradient-to-b from-white to-gray-50 py-24 pb-32">
      <div className="container mx-auto px-4">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="from-primary to-secondary font-heading mb-4 bg-gradient-to-r bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
            Kennst du das?
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Diese Herausforderungen kosten dich jeden Tag Geld und Nerven
          </p>
        </motion.div>

        {/* Problems Grid */}
        <div className="mb-16 grid gap-8 md:grid-cols-3">
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
              <div className="mb-4 flex justify-center">
                <motion.div
                  className="bg-accent-500 inline-flex rounded-xl p-4 shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <problem.icon className="text-primary-600 h-8 w-8" strokeWidth={2.5} />
                </motion.div>
              </div>

              {/* Glasmorphism Card */}
              <motion.div
                className="rounded-2xl border border-white/20 bg-white/80 p-6 shadow-xl backdrop-blur-lg transition-all duration-300 hover:bg-white/90 hover:shadow-2xl"
                whileHover={{ scale: 1.02, y: -5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                {/* Content */}
                <h3 className="text-primary-900 mb-3 text-center text-xl leading-tight font-bold">
                  {problem.title}
                </h3>
                <p className="text-primary-900 text-center leading-relaxed">
                  {problem.description}
                </p>

                {/* Subtle accent line */}
                <div className="from-primary to-secondary mx-auto mt-4 h-1 w-full rounded-full bg-gradient-to-r opacity-60"></div>
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
          <div className="mx-auto max-w-2xl">
            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: 3, // 3 cycles * 2 seconds = 6 seconds total
                ease: 'easeInOut',
              }}
            >
              <h3 className="from-primary to-secondary mb-6 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent">
                Wir lösen das für dich!
              </h3>
            </motion.div>

            <Link href="/contact">
              <Button
                size="lg"
                className="from-accent-500 to-secondary-500 hover:from-accent-600 hover:to-secondary-600 text-primary bg-gradient-to-r px-8 py-6 text-lg font-semibold shadow-xl transition-all duration-300 hover:shadow-2xl"
              >
                Jetzt Lösung entdecken
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-2 inline-block"
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
