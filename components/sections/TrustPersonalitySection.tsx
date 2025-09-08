'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, Linkedin, Check, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const testimonials = [
  {
    text: "Die Zusammenarbeit mit HEADON war erstklassig. Transparente Kommunikation, faire Preise und ein Ergebnis, das unsere Erwartungen übertroffen hat.",
    author: "Maria Schmidt",
    company: "Restaurant zur Linde",
    rating: 5
  },
  {
    text: "Endlich ein Partner, der mitdenkt! Die Lösungen waren nicht nur technisch top, sondern auch perfekt auf unser Business zugeschnitten.",
    author: "Thomas Weber",
    company: "Weber Handwerk GmbH",
    rating: 5
  },
  {
    text: "Von der ersten Idee bis zum Go-Live – alles lief reibungslos. Der persönliche Kontakt macht den Unterschied!",
    author: "Sarah Meyer",
    company: "Meyer Coaching",
    rating: 5
  }
]

const trustPromises = [
  "100% transparent, keine versteckten Kosten",
  "Festpreise vor Projektbeginn",
  "Geld-zurück-Garantie bei Unzufriedenheit",
  "Kostenlose Erstberatung"
]

export default function TrustPersonalitySection() {
  return (
    <section className="py-24 pb-32 relative overflow-hidden -mt-1">
      {/* Static gradient background similar to HeroSection */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500" />
      
      <div className="relative z-10 container mx-auto px-4">
        {/* Personal Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Photo Placeholder */}
              <div className="relative">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary-400 to-secondary-400 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-6xl mb-2">👨‍💻</div>
                      <p className="text-sm font-medium">Ihr direkter Ansprechpartner</p>
                    </div>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-accent-500/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary-500/20 rounded-full blur-2xl" />
              </div>

              {/* Text Content */}
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Hallo, ich bin Ihr direkter Ansprechpartner
                </h3>
                <p className="text-white/90 mb-6 leading-relaxed">
                  Bei HEADON arbeiten Sie nicht mit einem anonymen Team, sondern direkt mit mir. 
                  Das bedeutet: Kurze Wege, schnelle Entscheidungen und ein Partner, der Ihr Projekt 
                  von A bis Z persönlich begleitet. Kombiniert mit modernster KI-Technologie 
                  biete ich Ihnen Enterprise-Qualität mit persönlicher Note.
                </p>
                
                {/* Contact Options */}
                <div className="space-y-3">
                  <a 
                    href="mailto:kontakt@headon.agency" 
                    className="flex items-center gap-3 text-white/80 hover:text-accent-500 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>kontakt@headon.agency</span>
                  </a>
                  <a 
                    href="tel:+491234567890" 
                    className="flex items-center gap-3 text-white/80 hover:text-accent-500 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span>+49 123 456 7890</span>
                  </a>
                  <a 
                    href="https://linkedin.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white/80 hover:text-accent-500 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span>LinkedIn Profil</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust Promises */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-center text-white mb-8">
            Mein Versprechen an Sie
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {trustPromises.map((promise, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start gap-3 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
              >
                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/90 font-medium">{promise}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-center text-white mb-8">
            Was Kunden über die Zusammenarbeit sagen
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
              >
                <Quote className="w-8 h-8 text-accent-400 mb-4" />
                <p className="text-white/90 mb-4 italic leading-relaxed">
                  &quot;{testimonial.text}&quot;
                </p>
                <div className="pt-4 border-t border-white/20">
                  <p className="font-semibold text-white">{testimonial.author}</p>
                  <p className="text-sm text-white/70">{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Überzeugen Sie sich selbst
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            In einem kostenlosen 15-Minuten-Gespräch lernen wir uns kennen und besprechen, 
            wie ich Ihnen helfen kann.
          </p>
          <Link href="/contact">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Jetzt kennenlernen
            </Button>
          </Link>
        </motion.div>
      </div>
      
    </section>
  )
}