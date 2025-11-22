'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'

declare global {
  interface Window {
    Calendly: {
      initInlineWidget: (options: {
        url: string
        parentElement: HTMLElement | null
        prefill: Record<string, unknown>
        utm: Record<string, unknown>
      }) => void
    }
  }
}

export default function CalendlyWidget() {
  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)

    script.onload = () => {
      if (window.Calendly) {
        window.Calendly.initInlineWidget({
          url: process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/cirakoglu-onur/15min',
          parentElement: document.getElementById('calendly-embed'),
          prefill: {},
          utm: {},
        })
      }
    }

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="relative"
    >
      <div
        id="calendly-embed"
        style={{
          minWidth: '320px',
          height: '630px',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
        className="shadow-lg"
      />

      {/* Fallback for loading state */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-lg bg-gray-50 opacity-0 transition-opacity duration-300"
        id="calendly-loading"
      >
        <div className="text-center">
          <div className="border-primary-600 mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
          <p className="text-gray-600">Lade Kalender...</p>
        </div>
      </div>
    </motion.div>
  )
}
