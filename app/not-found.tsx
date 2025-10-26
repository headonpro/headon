'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FileQuestion, Home, BookOpen, Briefcase, Wrench, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Gradient Background (matching HeroSection) */}
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
          className="text-center"
        >
          {/* 404 Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 flex justify-center"
          >
            <FileQuestion className="h-32 w-32 text-white/90" strokeWidth={1.5} />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-4 text-4xl font-bold text-white md:text-6xl"
          >
            Seite nicht gefunden
          </motion.h1>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mx-auto mb-8 max-w-2xl text-xl text-white/90 md:text-2xl"
          >
            Die gesuchte Seite existiert leider nicht.
          </motion.p>

          {/* Search Input (Placeholder) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mx-auto mb-12 max-w-md"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Durchsuchen Sie unsere Seiten..."
                className="w-full rounded-lg border border-white/20 bg-white/10 px-6 py-4 text-white placeholder-white/60 backdrop-blur-sm transition-all focus:ring-2 focus:ring-white/50 focus:outline-none"
                disabled
              />
              <div className="absolute top-1/2 right-4 -translate-y-1/2">
                <svg
                  className="h-5 w-5 text-white/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
            <p className="mt-2 text-sm text-white/60">Suchfunktion in Entwicklung</p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="mb-6 text-2xl font-semibold text-white">Schnellzugriff</h2>
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Homepage */}
              <Link href="/">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group cursor-pointer rounded-lg border border-white/20 bg-white/10 p-6 backdrop-blur-sm transition-all hover:bg-white/20"
                >
                  <Home className="mx-auto mb-3 h-8 w-8 text-white transition-transform group-hover:scale-110" />
                  <h3 className="mb-2 text-lg font-semibold text-white">Homepage</h3>
                  <p className="text-sm text-white/80">Zurück zur Startseite</p>
                </motion.div>
              </Link>

              {/* Blog */}
              <Link href="/blog">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group cursor-pointer rounded-lg border border-white/20 bg-white/10 p-6 backdrop-blur-sm transition-all hover:bg-white/20"
                >
                  <BookOpen className="mx-auto mb-3 h-8 w-8 text-white transition-transform group-hover:scale-110" />
                  <h3 className="mb-2 text-lg font-semibold text-white">Blog</h3>
                  <p className="text-sm text-white/80">Aktuelle Artikel lesen</p>
                </motion.div>
              </Link>

              {/* Portfolio */}
              <Link href="/portfolio">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group cursor-pointer rounded-lg border border-white/20 bg-white/10 p-6 backdrop-blur-sm transition-all hover:bg-white/20"
                >
                  <Briefcase className="mx-auto mb-3 h-8 w-8 text-white transition-transform group-hover:scale-110" />
                  <h3 className="mb-2 text-lg font-semibold text-white">Portfolio</h3>
                  <p className="text-sm text-white/80">Unsere Projekte ansehen</p>
                </motion.div>
              </Link>

              {/* Services */}
              <Link href="/services">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group cursor-pointer rounded-lg border border-white/20 bg-white/10 p-6 backdrop-blur-sm transition-all hover:bg-white/20"
                >
                  <Wrench className="mx-auto mb-3 h-8 w-8 text-white transition-transform group-hover:scale-110" />
                  <h3 className="mb-2 text-lg font-semibold text-white">Services</h3>
                  <p className="text-sm text-white/80">Unsere Leistungen entdecken</p>
                </motion.div>
              </Link>

              {/* Contact */}
              <Link href="/contact">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group cursor-pointer rounded-lg border border-white/20 bg-white/10 p-6 backdrop-blur-sm transition-all hover:bg-white/20"
                >
                  <Mail className="mx-auto mb-3 h-8 w-8 text-white transition-transform group-hover:scale-110" />
                  <h3 className="mb-2 text-lg font-semibold text-white">Kontakt</h3>
                  <p className="text-sm text-white/80">Kontaktieren Sie uns</p>
                </motion.div>
              </Link>
            </div>
          </motion.div>

          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-12"
          >
            <Button asChild size="lg" className="text-primary-600 bg-white hover:bg-white/90">
              <Link href="/">Zurück zur Startseite</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
