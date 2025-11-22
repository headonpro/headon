'use client'

import { motion } from 'framer-motion'
import { Phone, Calendar, Mail, Clock } from 'lucide-react'

interface ContactBarProps {
  onBookingClick: () => void
}

export default function ContactBar({ onBookingClick }: ContactBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="sticky top-20 z-40 mx-auto mb-8 max-w-4xl px-4"
    >
      <div className="rounded-2xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-xl">
        <div className="grid gap-3 sm:grid-cols-3">
          {/* Telefon */}
          <motion.a
            href="tel:+4917663040241"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 rounded-xl bg-white/10 p-4 transition-all hover:bg-white/20"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white/10">
              <Phone className="text-accent-400 h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-white/70">Direkt anrufen</p>
              <p className="font-semibold text-white">+49 176 630 402 41</p>
            </div>
          </motion.a>

          {/* Termin buchen - Primary CTA */}
          <motion.button
            onClick={onBookingClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 rounded-xl bg-white/10 p-4 transition-all hover:bg-white/20"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white/10">
              <Calendar className="text-accent-400 h-6 w-6" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-white/90">Termin buchen</p>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-white/80" />
                <span className="font-semibold text-white">15 Min kostenlos</span>
              </div>
            </div>
          </motion.button>

          {/* E-Mail */}
          <motion.a
            href="mailto:hallo@headon.pro"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 rounded-xl bg-white/10 p-4 transition-all hover:bg-white/20"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white/10">
              <Mail className="text-accent-400 h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-white/70">E-Mail schreiben</p>
              <p className="font-semibold text-white">hallo@headon.pro</p>
            </div>
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}
