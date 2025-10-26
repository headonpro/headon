'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const preparationChecklist = [
  'Ihre aktuellen Herausforderungen',
  'Gewünschte Funktionen und Ziele',
  'Ungefährer Zeitrahmen',
  'Budget-Vorstellungen (optional)',
]

export default function FinalCTASection() {
  const [isCalendarLoaded, setIsCalendarLoaded] = useState(false)

  return (
    <section className="from-primary-600 via-primary-500 to-secondary-500 relative -mt-1 overflow-hidden bg-gradient-to-br py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
                           radial-gradient(circle at 80% 50%, white 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl"
        >
          {/* Header */}
          <div className="mb-12 text-center">
            <motion.h2
              className="font-heading mb-4 text-4xl font-bold text-white md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Bereit? Lass uns 15 Minuten sprechen.
            </motion.h2>
            <motion.p
              className="mx-auto max-w-2xl text-xl text-white/90"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Wählen Sie einen passenden Termin und lassen Sie uns über Ihr Projekt sprechen.
              Kostenlos, unverbindlich und ohne Verpflichtungen.
            </motion.p>
          </div>

          {/* Calendar Widget Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12 rounded-3xl bg-white p-8 shadow-2xl md:p-12"
          >
            {/* Calendar Header */}
            <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-6">
              <div className="flex items-center gap-3">
                <Calendar className="text-primary-600 h-6 w-6" />
                <h3 className="text-2xl font-bold text-gray-900">Verfügbare Termine</h3>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>15 Minuten</span>
              </div>
            </div>

            {/* Calendar Embed Placeholder */}
            <div className="relative flex min-h-[500px] items-center justify-center rounded-xl bg-gray-50">
              {!isCalendarLoaded ? (
                <div className="text-center">
                  <div className="bg-primary-100 mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full">
                    <Calendar className="text-primary-600 h-8 w-8" />
                  </div>
                  <p className="mb-4 text-gray-600">Kalender-Widget wird hier eingebettet</p>
                  <p className="text-sm text-gray-500">
                    (Calendly, Acuity Scheduling oder ähnliches)
                  </p>
                  <Button
                    onClick={() => setIsCalendarLoaded(true)}
                    className="from-accent-500 to-secondary-500 hover:from-accent-600 hover:to-secondary-600 text-primary mt-6 bg-gradient-to-r font-semibold"
                  >
                    Kalender simulieren
                  </Button>
                </div>
              ) : (
                <div className="w-full">
                  {/* Simulated Calendar */}
                  <div className="grid grid-cols-7 gap-2 p-4">
                    <div className="py-2 text-center text-sm font-semibold text-gray-600">Mo</div>
                    <div className="py-2 text-center text-sm font-semibold text-gray-600">Di</div>
                    <div className="py-2 text-center text-sm font-semibold text-gray-600">Mi</div>
                    <div className="py-2 text-center text-sm font-semibold text-gray-600">Do</div>
                    <div className="py-2 text-center text-sm font-semibold text-gray-600">Fr</div>
                    <div className="py-2 text-center text-sm font-semibold text-gray-600">Sa</div>
                    <div className="py-2 text-center text-sm font-semibold text-gray-600">So</div>

                    {/* Sample calendar days */}
                    {[...Array(35)].map((_, i) => {
                      const day = (i % 31) + 1
                      const isAvailable = [5, 7, 12, 14, 19, 21, 26, 28].includes(day)
                      return (
                        <button
                          key={i}
                          className={`flex aspect-square items-center justify-center rounded-lg text-sm ${
                            isAvailable
                              ? 'cursor-pointer bg-green-100 text-green-800 hover:bg-green-200'
                              : 'cursor-not-allowed bg-gray-100 text-gray-400'
                          } `}
                          disabled={!isAvailable}
                        >
                          {day}
                        </button>
                      )
                    })}
                  </div>

                  <div className="mt-4 border-t border-gray-200 px-4 pt-4">
                    <p className="text-center text-sm text-gray-600">
                      Klicken Sie auf einen grünen Tag, um verfügbare Zeiten zu sehen
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Preparation Checklist */}
            <div className="mt-8 rounded-xl bg-blue-50 p-6">
              <h4 className="mb-3 flex items-center gap-2 font-semibold text-gray-900">
                <CheckCircle className="h-5 w-5 text-blue-600" />
                Was Sie zum Gespräch mitbringen sollten:
              </h4>
              <ul className="space-y-2">
                {preparationChecklist.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-2"
                  >
                    <span className="mt-0.5 text-blue-600">•</span>
                    <span className="text-sm text-gray-700">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Alternative Contact Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <p className="mb-4 text-white/80">Bevorzugen Sie einen anderen Weg?</p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="/contact"
                className="from-accent-500 to-secondary-500 hover:from-accent-600 hover:to-secondary-600 text-primary inline-flex items-center gap-2 rounded-lg bg-gradient-to-r px-6 py-3 font-semibold transition-all"
              >
                Kontaktformular nutzen
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="mailto:kontakt@headon.agency"
                className="from-accent-500 to-secondary-500 hover:from-accent-600 hover:to-secondary-600 text-primary inline-flex items-center gap-2 rounded-lg bg-gradient-to-r px-6 py-3 font-semibold transition-all"
              >
                Direkt E-Mail schreiben
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
