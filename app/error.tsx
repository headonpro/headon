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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Gradient Background (matching not-found.tsx and HeroSection) */}
      <div className="absolute inset-0 -z-10">
        {/* Static gradient base */}
        <div className="from-primary-600 via-primary-500 to-secondary-500 absolute inset-0 bg-gradient-to-br" />

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

      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl"
        >
          {/* Error Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 flex justify-center"
          >
            <AlertTriangle className="h-32 w-32 text-white/90" strokeWidth={1.5} />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-4 text-center text-4xl font-bold text-white md:text-6xl"
          >
            Etwas ist schiefgelaufen
          </motion.h1>

          {/* User-friendly message */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8 text-center text-xl text-white/90 md:text-2xl"
          >
            Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren
            Sie unseren Support.
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
                className="overflow-hidden rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm"
              >
                <AccordionItem value="error-details" className="border-none">
                  <AccordionTrigger className="px-6 text-white hover:bg-white/5">
                    <span className="font-semibold">Technische Details (Entwicklungsmodus)</span>
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
                          <strong className="mb-2 block">Stack Trace:</strong>
                          <pre className="overflow-x-auto rounded bg-black/20 p-4 font-mono text-xs whitespace-pre-wrap">
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
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            {/* Try Again button */}
            <Button
              onClick={reset}
              size="lg"
              className="text-primary-600 group min-w-[200px] bg-white hover:bg-white/90"
            >
              <RefreshCw className="mr-2 h-5 w-5 transition-transform duration-500 group-hover:rotate-180" />
              Erneut versuchen
            </Button>

            {/* Contact Support button */}
            <Button
              asChild
              size="lg"
              className="min-w-[200px] border-2 border-white/50 bg-transparent text-white hover:bg-white/20 hover:border-white"
            >
              <Link href="/contact">
                <Mail className="mr-2 h-5 w-5" />
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
            <p className="text-sm text-white/70">
              Oder senden Sie uns direkt eine E-Mail:{' '}
              <a
                href="mailto:hallo@headon.pro"
                className="text-white underline transition-colors hover:text-white/90"
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
