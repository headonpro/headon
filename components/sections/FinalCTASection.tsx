'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const preparationChecklist = [
  "Ihre aktuellen Herausforderungen",
  "Gewünschte Funktionen und Ziele",
  "Ungefährer Zeitrahmen",
  "Budget-Vorstellungen (optional)"
]

export default function FinalCTASection() {
  const [isCalendarLoaded, setIsCalendarLoaded] = useState(false)

  return (
    <section className="py-24 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 relative overflow-hidden -mt-1">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, white 1px, transparent 1px),
                           radial-gradient(circle at 80% 50%, white 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-white mb-4 font-heading"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Bereit? Lass uns 15 Minuten sprechen.
            </motion.h2>
            <motion.p 
              className="text-xl text-white/90 max-w-2xl mx-auto"
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
            className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-12"
          >
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-primary-600" />
                <h3 className="text-2xl font-bold text-gray-900">
                  Verfügbare Termine
                </h3>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>15 Minuten</span>
              </div>
            </div>

            {/* Calendar Embed Placeholder */}
            <div className="relative min-h-[500px] bg-gray-50 rounded-xl flex items-center justify-center">
              {!isCalendarLoaded ? (
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                    <Calendar className="w-8 h-8 text-primary-600" />
                  </div>
                  <p className="text-gray-600 mb-4">Kalender-Widget wird hier eingebettet</p>
                  <p className="text-sm text-gray-500">
                    (Calendly, Acuity Scheduling oder ähnliches)
                  </p>
                  <Button 
                    onClick={() => setIsCalendarLoaded(true)}
                    className="mt-6"
                  >
                    Kalender simulieren
                  </Button>
                </div>
              ) : (
                <div className="w-full">
                  {/* Simulated Calendar */}
                  <div className="grid grid-cols-7 gap-2 p-4">
                    <div className="text-center text-sm font-semibold text-gray-600 py-2">Mo</div>
                    <div className="text-center text-sm font-semibold text-gray-600 py-2">Di</div>
                    <div className="text-center text-sm font-semibold text-gray-600 py-2">Mi</div>
                    <div className="text-center text-sm font-semibold text-gray-600 py-2">Do</div>
                    <div className="text-center text-sm font-semibold text-gray-600 py-2">Fr</div>
                    <div className="text-center text-sm font-semibold text-gray-600 py-2">Sa</div>
                    <div className="text-center text-sm font-semibold text-gray-600 py-2">So</div>
                    
                    {/* Sample calendar days */}
                    {[...Array(35)].map((_, i) => {
                      const day = (i % 31) + 1
                      const isAvailable = [5, 7, 12, 14, 19, 21, 26, 28].includes(day)
                      return (
                        <button
                          key={i}
                          className={`
                            aspect-square rounded-lg flex items-center justify-center text-sm
                            ${isAvailable 
                              ? 'bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer' 
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }
                          `}
                          disabled={!isAvailable}
                        >
                          {day}
                        </button>
                      )
                    })}
                  </div>
                  
                  <div className="border-t border-gray-200 mt-4 pt-4 px-4">
                    <p className="text-sm text-gray-600 text-center">
                      Klicken Sie auf einen grünen Tag, um verfügbare Zeiten zu sehen
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Preparation Checklist */}
            <div className="mt-8 p-6 bg-blue-50 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
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
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span className="text-gray-700 text-sm">{item}</span>
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
            <p className="text-white/80 mb-4">
              Bevorzugen Sie einen anderen Weg?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors"
              >
                Kontaktformular nutzen
                <ArrowRight className="w-4 h-4" />
              </a>
              <a 
                href="mailto:kontakt@headon.agency"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors"
              >
                Direkt E-Mail schreiben
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}