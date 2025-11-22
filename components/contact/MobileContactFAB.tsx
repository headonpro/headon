'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Calendar, Mail, X, MessageCircle } from 'lucide-react'

interface MobileContactFABProps {
  onBookingClick: () => void
}

export default function MobileContactFAB({ onBookingClick }: MobileContactFABProps) {
  const [isOpen, setIsOpen] = useState(false)

  const actions = [
    {
      icon: Phone,
      label: 'Anrufen',
      action: () => (window.location.href = 'tel:+4917663040241'),
    },
    {
      icon: Calendar,
      label: 'Termin',
      action: () => {
        setIsOpen(false)
        onBookingClick()
      },
    },
    {
      icon: Mail,
      label: 'E-Mail',
      action: () => (window.location.href = 'mailto:hallo@headon.pro'),
    },
  ]

  return (
    <div className="fixed right-4 bottom-4 z-50 md:hidden">
      {/* Action Buttons */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute right-0 bottom-16 mb-2 flex flex-col gap-3"
          >
            {actions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, x: 20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: 20, y: 20 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-2"
              >
                <span className="rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-medium text-white shadow-lg backdrop-blur-xl">
                  {action.label}
                </span>
                <button
                  onClick={action.action}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-lg backdrop-blur-xl transition-all hover:bg-white/20"
                >
                  <action.icon className="text-accent-400 h-5 w-5" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.9 }}
        className={`flex h-14 w-14 items-center justify-center rounded-full border shadow-xl backdrop-blur-xl transition-all ${
          isOpen
            ? 'border-white/20 bg-white/10 hover:bg-white/20'
            : 'border-white/30 bg-white/20 hover:bg-white/30'
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="h-6 w-6 text-white/80" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle className="text-accent-400 h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Pulse animation when closed */}
      {!isOpen && (
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-primary-500/40" />
      )}
    </div>
  )
}
