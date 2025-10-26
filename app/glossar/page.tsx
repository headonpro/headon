'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { getTermsGroupedByLetter, getAllTermsSorted } from '@/lib/content/glossary'
import { Button } from '@/components/ui/button'
import { BookOpen, Zap, Search } from 'lucide-react'

export default function GlossarPage() {
  const termsGrouped = getTermsGroupedByLetter()
  const allTerms = getAllTermsSorted()
  const letters = Object.keys(termsGrouped).sort()

  return (
    <>
      {/* Hero Section with integrated content */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Gradient background */}
        <div className="from-primary-600 via-primary-500 to-secondary-500 absolute inset-0 bg-gradient-to-br" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 pt-48 pb-24 md:pt-64 md:pb-32">
          {/* Title */}
          <div className="mb-16 text-center md:mb-20">
            <h1 className="font-heading mb-6 text-5xl font-bold tracking-tight text-white md:text-6xl">
              Web Development
              <span className="from-secondary-300 via-accent to-secondary-600 bg-gradient-to-r bg-clip-text text-transparent">
                {' '}
                Glossar
              </span>
            </h1>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-white/90 md:text-xl">
              Verständliche Erklärungen zu {allTerms.length}+ Fachbegriffen aus Webentwicklung,
              Mobile-App-Entwicklung, UI/UX Design und Digital Marketing.
            </p>
          </div>

          {/* Category Cards - integrated in hero */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Zap,
                name: 'Technologie',
                count: allTerms.filter((t) => t.category === 'technology').length,
              },
              {
                icon: Search,
                name: 'Design',
                count: allTerms.filter((t) => t.category === 'design').length,
              },
              {
                icon: BookOpen,
                name: 'Entwicklung',
                count: allTerms.filter((t) => t.category === 'development').length,
              },
              {
                icon: BookOpen,
                name: 'Marketing',
                count: allTerms.filter((t) => t.category === 'marketing').length,
              },
            ].map((category, index) => {
              const Icon = category.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="group h-full cursor-pointer overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/20"
                >
                  <div className="p-6">
                    {/* Icon */}
                    <div className="mb-4 flex justify-center">
                      <div className="from-accent to-secondary rounded-xl bg-gradient-to-br p-3 transition-transform duration-300 group-hover:scale-110">
                        <Icon className="text-primary h-8 w-8" strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="group-hover:text-accent mb-2 text-center text-xl font-bold text-white transition-colors duration-300">
                      {category.name}
                    </h3>
                    <div className="text-accent text-center text-2xl font-bold">
                      {category.count} Begriffe
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Wave at bottom */}
        <div className="absolute right-0 bottom-0 left-0">
          <svg
            className="h-16 w-full fill-white md:h-24"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
          >
            <path d="M0,40 C480,100 960,0 1440,60 L1440,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* A-Z Navigation */}
      <section className="sticky top-16 z-10 -mt-1 border-b border-gray-200 bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-2 py-4">
            {letters.map((letter) => (
              <a
                key={letter}
                href={`#${letter}`}
                className="hover:from-primary-500 hover:to-secondary-500 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 font-semibold text-gray-700 transition-all hover:bg-gradient-to-br hover:text-white"
              >
                {letter}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Glossary Terms */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            {letters.map((letter, letterIndex) => (
              <motion.div
                key={letter}
                id={letter}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: letterIndex * 0.1 }}
                className="mb-16 scroll-mt-32"
              >
                {/* Letter Header */}
                <div className="mb-8 flex items-center gap-4">
                  <div className="from-primary-600 to-secondary-500 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br text-3xl font-bold text-white shadow-lg">
                    {letter}
                  </div>
                  <div className="from-primary-500 h-1 flex-1 bg-gradient-to-r to-transparent" />
                </div>

                {/* Terms in this letter */}
                <div className="grid gap-6 md:grid-cols-2">
                  {termsGrouped[letter].map((term, termIndex) => (
                    <Link key={term.id} href={`/glossar/${term.id}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: termIndex * 0.05 }}
                        className="hover:border-primary-300 group block rounded-xl border border-gray-200 bg-white p-6 transition-all hover:shadow-xl"
                      >
                        <div className="mb-3 flex items-start justify-between gap-4">
                          <h2 className="group-hover:from-primary-600 group-hover:to-secondary-500 text-xl font-bold text-gray-900 transition-all group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:text-transparent">
                            {term.term}
                          </h2>
                          <span className="shrink-0 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 capitalize">
                            {term.category === 'technology' && 'Technologie'}
                            {term.category === 'design' && 'Design'}
                            {term.category === 'development' && 'Entwicklung'}
                            {term.category === 'marketing' && 'Marketing'}
                          </span>
                        </div>
                        <p className="leading-relaxed text-gray-600">{term.shortDefinition}</p>

                        {/* Related Terms */}
                        {term.relatedTerms.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2 border-t border-gray-100 pt-4">
                            {term.relatedTerms.slice(0, 3).map((related) => (
                              <span
                                key={related.id}
                                className="rounded-md bg-gray-50 px-2 py-1 text-xs text-gray-500"
                              >
                                {related.term}
                              </span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="from-primary-600 via-primary-500 to-secondary-500 relative overflow-hidden bg-gradient-to-br py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="font-heading mb-6 text-3xl font-bold text-white md:text-4xl">
              Haben Sie Fragen zu einem dieser Begriffe?
            </h2>
            <p className="mb-8 text-xl text-white/90">
              Unser Team erklärt Ihnen gerne im Detail, welche Technologien und Ansätze für Ihr
              Projekt am besten geeignet sind.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-primary px-8 py-6 text-lg font-semibold shadow-xl transition-all duration-300 hover:shadow-2xl"
                >
                  Kostenlose Beratung
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white bg-transparent px-8 py-6 text-lg font-semibold text-white transition-all duration-300 hover:bg-white/10"
                >
                  Unsere Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
