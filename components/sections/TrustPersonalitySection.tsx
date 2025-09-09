'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, Linkedin, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

const trustPromises = [
  "100% transparent, keine versteckten Kosten",
  "Festpreise vor Projektbeginn",
  "Geld-zurück-Garantie bei Unzufriedenheit",
  "Kostenlose Erstberatung"
]

export default function TrustPersonalitySection() {
  return (
    <section className="pt-40 pb-32 relative overflow-hidden -mt-1">
      {/* Wave transition from previous section */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <svg className="w-full h-16 md:h-24 fill-gray-50" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,40 C480,100 960,0 1440,60 L1440,0 L0,0 Z" />
        </svg>
      </div>
      
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
          <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Profile Photo */}
              <div className="relative px-8 md:px-12">
                <div className="w-full h-[340px] md:h-[380px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-primary-400 to-secondary-400">
                  <Image
                    src="/images/onur_P.webp"
                    alt="Onur - Ihr direkter Ansprechpartner bei HEADON"
                    width={380}
                    height={380}
                    className="w-full h-full object-cover object-top scale-105"
                    priority
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 right-4 w-24 h-24 bg-accent-500/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 left-4 w-32 h-32 bg-primary-500/20 rounded-full blur-2xl" />
              </div>

              {/* Text Content */}
              <div>
                <h3 className="text-3xl font-bold text-white mb-4 flex items-center gap-2 flex-wrap">
                  <span>Hallo, ich bin</span>
                  <Image 
                    src="/images/ONUR.svg" 
                    alt="ONUR" 
                    width={70} 
                    height={20}
                    className="inline-block h-[0.9em] w-auto"
                    style={{ verticalAlign: 'middle' }}
                  />
                  <span>Ihr direkter Ansprechpartner</span>
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
                    href="mailto:kontakt@headon.pro" 
                    className="flex items-center gap-3 text-white/80 hover:text-accent-500 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>kontakt@headon.pro</span>
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
                className="flex flex-col items-center text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20"
              >
                <Check className="w-8 h-8 text-accent-500 mb-3" />
                <span className="text-sm text-white/90 font-medium">{promise}</span>
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
          <Link href="/contact">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-accent-500 to-secondary-500 hover:from-accent-600 hover:to-secondary-600 text-primary font-semibold px-8 py-6 text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Jetzt kennenlernen
            </Button>
          </Link>
        </motion.div>
      </div>
      
      {/* Wave transition to footer */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg className="w-full h-16 md:h-24" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,40 C480,100 960,0 1440,60 L1440,120 L0,120 Z" fill="rgb(249, 250, 251)" />
        </svg>
      </div>
    </section>
  )
}