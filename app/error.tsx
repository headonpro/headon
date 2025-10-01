'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { AlertTriangle, RefreshCw, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const isDevelopment = process.env.NODE_ENV === 'development'

  useEffect(() => {
    // Log error to console for debugging
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background (matching not-found.tsx and HeroSection) */}
      <div className="absolute inset-0 -z-10">
        {/* Static gradient base */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500" />

        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              'radial-gradient(circle at 30% 70%, rgba(255, 140, 0, 0.4) 0%, transparent 50%)',
          }}
          animate={{
            background: [
              'radial-gradient(circle at 30% 70%, rgba(255, 140, 0, 0.4) 0%, transparent 50%)',
              'radial-gradient(circle at 70% 30%, rgba(255, 215, 0, 0.4) 0%, transparent 50%)',
              'radial-gradient(circle at 30% 70%, rgba(255, 140, 0, 0.4) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          {/* Error Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <AlertTriangle
              className="w-32 h-32 text-white/90"
              strokeWidth={1.5}
            />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4 text-center"
          >
            Etwas ist schiefgelaufen
          </motion.h1>

          {/* User-friendly message */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/90 mb-8 text-center"
          >
            Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es
            erneut oder kontaktieren Sie unseren Support.
          </motion.p>

          {/* Technical details (only in development) */}
          {isDevelopment && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mb-8"
            >
              <Accordion
                type="single"
                collapsible
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden"
              >
                <AccordionItem value="error-details" className="border-none">
                  <AccordionTrigger className="px-6 text-white hover:bg-white/5">
                    <span className="font-semibold">
                      Technische Details (Entwicklungsmodus)
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 text-white/80">
                    <div className="space-y-2">
                      <p className="font-mono text-sm break-all">
                        <strong>Fehlermeldung:</strong> {error.message}
                      </p>
                      {error.digest && (
                        <p className="font-mono text-sm break-all">
                          <strong>Digest:</strong> {error.digest}
                        </p>
                      )}
                      {error.stack && (
                        <div className="mt-4">
                          <strong className="block mb-2">Stack Trace:</strong>
                          <pre className="font-mono text-xs bg-black/20 p-4 rounded overflow-x-auto whitespace-pre-wrap">
                            {error.stack}
                          </pre>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          )}

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {/* Try Again button */}
            <Button
              onClick={reset}
              size="lg"
              className="bg-white text-primary-600 hover:bg-white/90 group min-w-[200px]"
            >
              <RefreshCw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
              Erneut versuchen
            </Button>

            {/* Contact Support button */}
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 min-w-[200px]"
            >
              <Link href="/contact">
                <Mail className="w-5 h-5 mr-2" />
                Support kontaktieren
              </Link>
            </Button>
          </motion.div>

          {/* Email fallback */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-8 text-center"
          >
            <p className="text-white/70 text-sm">
              Oder senden Sie uns direkt eine E-Mail:{' '}
              <a
                href="mailto:hallo@headon.pro"
                className="text-white underline hover:text-white/90 transition-colors"
              >
                hallo@headon.pro
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
