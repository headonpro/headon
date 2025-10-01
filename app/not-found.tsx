'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { FileQuestion, Home, BookOpen, Briefcase, Wrench, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background (matching HeroSection) */}
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
          className="text-center"
        >
          {/* 404 Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mb-8"
          >
            <FileQuestion className="w-32 h-32 text-white/90" strokeWidth={1.5} />
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Seite nicht gefunden
          </motion.h1>

          {/* Message */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            Die gesuchte Seite existiert leider nicht.
          </motion.p>

          {/* Search Input (Placeholder) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="max-w-md mx-auto mb-12"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Durchsuchen Sie unsere Seiten..."
                className="w-full px-6 py-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                disabled
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <svg
                  className="w-5 h-5 text-white/60"
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
            <p className="text-sm text-white/60 mt-2">
              Suchfunktion in Entwicklung
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-6">
              Schnellzugriff
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {/* Homepage */}
              <Link href="/">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:bg-white/20 transition-all cursor-pointer group"
                >
                  <Home className="w-8 h-8 text-white mb-3 mx-auto group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Homepage
                  </h3>
                  <p className="text-sm text-white/80">
                    Zurück zur Startseite
                  </p>
                </motion.div>
              </Link>

              {/* Blog */}
              <Link href="/blog">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:bg-white/20 transition-all cursor-pointer group"
                >
                  <BookOpen className="w-8 h-8 text-white mb-3 mx-auto group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold text-white mb-2">Blog</h3>
                  <p className="text-sm text-white/80">
                    Aktuelle Artikel lesen
                  </p>
                </motion.div>
              </Link>

              {/* Portfolio */}
              <Link href="/portfolio">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:bg-white/20 transition-all cursor-pointer group"
                >
                  <Briefcase className="w-8 h-8 text-white mb-3 mx-auto group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Portfolio
                  </h3>
                  <p className="text-sm text-white/80">
                    Unsere Projekte ansehen
                  </p>
                </motion.div>
              </Link>

              {/* Services */}
              <Link href="/services">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:bg-white/20 transition-all cursor-pointer group"
                >
                  <Wrench className="w-8 h-8 text-white mb-3 mx-auto group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Services
                  </h3>
                  <p className="text-sm text-white/80">
                    Unsere Leistungen entdecken
                  </p>
                </motion.div>
              </Link>

              {/* Contact */}
              <Link href="/contact">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 hover:bg-white/20 transition-all cursor-pointer group"
                >
                  <Mail className="w-8 h-8 text-white mb-3 mx-auto group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Kontakt
                  </h3>
                  <p className="text-sm text-white/80">
                    Kontaktieren Sie uns
                  </p>
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
            <Button
              asChild
              size="lg"
              className="bg-white text-primary-600 hover:bg-white/90"
            >
              <Link href="/">Zurück zur Startseite</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}