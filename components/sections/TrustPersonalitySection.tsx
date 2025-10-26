'use client'

import { motion } from 'framer-motion'
import { Mail, Phone, Linkedin, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

const trustPromises = [
  '100% transparent, keine versteckten Kosten',
  'Festpreise vor Projektbeginn',
  'Geld-zurück-Garantie bei Unzufriedenheit',
  'Kostenlose Erstberatung',
]

export default function TrustPersonalitySection() {
  return (
    <section className="relative -mt-1 overflow-hidden pt-40 pb-32">
      {/* Wave transition from previous section */}
      <div className="absolute top-0 right-0 left-0 z-10">
        <svg
          className="h-16 w-full fill-gray-50 md:h-24"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path d="M0,40 C480,100 960,0 1440,60 L1440,0 L0,0 Z" />
        </svg>
      </div>

      {/* Static gradient background similar to HeroSection */}
      <div className="from-primary-600 via-primary-500 to-secondary-500 absolute inset-0 bg-gradient-to-br" />

      <div className="relative z-10 container mx-auto px-4">
        {/* Personal Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-4xl"
        >
          <div className="grid items-center gap-8 md:grid-cols-2">
            {/* Text Content */}
            <div className="order-2 md:order-1">
              <h3 className="mb-4 flex flex-wrap items-center gap-2 text-3xl font-bold text-white">
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
              <p className="mb-6 leading-relaxed text-white/90">
                Bei HEADON arbeiten Sie nicht mit einem anonymen Team, sondern direkt mit mir. Das
                bedeutet: Kurze Wege, schnelle Entscheidungen und ein Partner, der Ihr Projekt von A
                bis Z persönlich begleitet. Kombiniert mit modernster KI-Technologie biete ich Ihnen
                Enterprise-Qualität mit persönlicher Note.
              </p>

              {/* Contact Options */}
              <div className="space-y-3">
                <a
                  href="mailto:hallo@headon.pro"
                  className="hover:text-accent-500 flex items-center gap-3 text-white/80 transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  <span>hallo@headon.pro</span>
                </a>
                <a
                  href="tel:+4917663040241"
                  className="hover:text-accent-500 flex items-center gap-3 text-white/80 transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  <span>+49 176 630 402 41</span>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-500 flex items-center gap-3 text-white/80 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                  <span>LinkedIn Profil</span>
                </a>
              </div>
            </div>

            {/* Profile Photo */}
            <div className="relative order-1 md:order-2">
              <Image
                src="/images/onur-portrai-hd.webp"
                alt="Onur - Ihr persönlicher Ansprechpartner bei HEADON"
                width={512}
                height={760}
                className="mx-auto rounded-2xl object-cover shadow-2xl"
                style={{ width: '256px', height: '380px' }}
                quality={95}
              />
              {/* Decorative elements */}
              <div className="bg-accent-500/20 absolute -top-4 right-4 h-24 w-24 rounded-full blur-2xl" />
              <div className="bg-primary-500/20 absolute -bottom-4 left-4 h-32 w-32 rounded-full blur-2xl" />
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
          <h3 className="mb-8 text-center text-2xl font-bold text-white">
            Mein Versprechen an Sie
          </h3>
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trustPromises.map((promise, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex flex-col items-center rounded-xl border border-white/20 bg-white/10 p-4 text-center backdrop-blur-sm"
              >
                <Check className="text-accent-500 mb-3 h-8 w-8" />
                <span className="text-sm font-medium text-white/90">{promise}</span>
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
          className="mt-16 text-center"
        >
          <Link href="/contact">
            <Button
              size="lg"
              className="from-accent-500 to-secondary-500 hover:from-accent-600 hover:to-secondary-600 text-primary bg-gradient-to-r px-8 py-6 text-lg font-semibold shadow-xl transition-all duration-300 hover:shadow-2xl"
            >
              Jetzt kennenlernen
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Wave transition to footer */}
      <div className="absolute right-0 bottom-0 left-0 z-10">
        <svg className="h-16 w-full md:h-24" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0,40 C480,100 960,0 1440,60 L1440,120 L0,120 Z" fill="rgb(249, 250, 251)" />
        </svg>
      </div>
    </section>
  )
}
