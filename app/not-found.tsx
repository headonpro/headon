import { Metadata } from 'next'
import Link from 'next/link'
import { FileQuestion, Home, BookOpen, Briefcase, Wrench, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: '404 - Seite nicht gefunden | HEADON.pro',
  description: 'Die gesuchte Seite existiert leider nicht. Nutzen Sie unsere Navigation, um zu den gewünschten Inhalten zu gelangen.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Gradient Background (matching HeroSection) */}
      <div className="absolute inset-0 -z-10">
        {/* Static gradient base */}
        <div className="from-primary-600 via-primary-500 to-secondary-500 absolute inset-0 bg-gradient-to-br" />

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              'radial-gradient(circle at 30% 70%, rgba(255, 140, 0, 0.4) 0%, transparent 50%)',
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="text-center">
          {/* 404 Icon */}
          <div className="mb-8 flex justify-center">
            <FileQuestion className="h-32 w-32 text-white/90" strokeWidth={1.5} />
          </div>

          {/* Heading */}
          <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">
            Seite nicht gefunden
          </h1>

          {/* Message */}
          <p className="mx-auto mb-8 max-w-2xl text-xl text-white/90 md:text-2xl">
            Die gesuchte Seite existiert leider nicht.
          </p>

          {/* Search Input (Placeholder) */}
          <div className="mx-auto mb-12 max-w-md">
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
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="mb-6 text-2xl font-semibold text-white">Schnellzugriff</h2>
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Homepage */}
              <Link href="/">
                <div className="group cursor-pointer rounded-lg border border-white/20 bg-white/10 p-6 backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-105">
                  <Home className="mx-auto mb-3 h-8 w-8 text-white transition-transform group-hover:scale-110" />
                  <h3 className="mb-2 text-lg font-semibold text-white">Homepage</h3>
                  <p className="text-sm text-white/80">Zurück zur Startseite</p>
                </div>
              </Link>

              {/* Blog */}
              <Link href="/blog">
                <div className="group cursor-pointer rounded-lg border border-white/20 bg-white/10 p-6 backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-105">
                  <BookOpen className="mx-auto mb-3 h-8 w-8 text-white transition-transform group-hover:scale-110" />
                  <h3 className="mb-2 text-lg font-semibold text-white">Blog</h3>
                  <p className="text-sm text-white/80">Aktuelle Artikel lesen</p>
                </div>
              </Link>

              {/* Portfolio */}
              <Link href="/portfolio">
                <div className="group cursor-pointer rounded-lg border border-white/20 bg-white/10 p-6 backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-105">
                  <Briefcase className="mx-auto mb-3 h-8 w-8 text-white transition-transform group-hover:scale-110" />
                  <h3 className="mb-2 text-lg font-semibold text-white">Portfolio</h3>
                  <p className="text-sm text-white/80">Unsere Projekte ansehen</p>
                </div>
              </Link>

              {/* Services */}
              <Link href="/services">
                <div className="group cursor-pointer rounded-lg border border-white/20 bg-white/10 p-6 backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-105">
                  <Wrench className="mx-auto mb-3 h-8 w-8 text-white transition-transform group-hover:scale-110" />
                  <h3 className="mb-2 text-lg font-semibold text-white">Services</h3>
                  <p className="text-sm text-white/80">Unsere Leistungen entdecken</p>
                </div>
              </Link>

              {/* Contact */}
              <Link href="/contact">
                <div className="group cursor-pointer rounded-lg border border-white/20 bg-white/10 p-6 backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-105">
                  <Mail className="mx-auto mb-3 h-8 w-8 text-white transition-transform group-hover:scale-110" />
                  <h3 className="mb-2 text-lg font-semibold text-white">Kontakt</h3>
                  <p className="text-sm text-white/80">Kontaktieren Sie uns</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-12">
            <Button asChild size="lg" className="text-primary-600 bg-white hover:bg-white/90">
              <Link href="/">Zurück zur Startseite</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
