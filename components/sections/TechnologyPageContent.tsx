'use client'

/**
 * TechnologyPageContent Component
 *
 * Client wrapper for technology showcase pages with animated gradient background
 */

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { TechnologyContentResult } from '@/lib/content/mdx-loader'
import MDXContent from '@/components/content/MDXContent'
import * as Icons from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Image from 'next/image'

interface TechnologyPageContentProps {
  technologyPage: TechnologyContentResult
  CompiledContent: React.ReactElement
  breadcrumbs: {
    items: Array<{ name: string; url: string }>
  }
}

export default function TechnologyPageContent({
  technologyPage,
  CompiledContent,
  breadcrumbs,
}: TechnologyPageContentProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="from-primary-600 via-primary-500 to-secondary-500 absolute inset-0 bg-gradient-to-br" />

      {/* Animated Gradient Layers */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-60"
          animate={{
            background: isMobile
              ? [
                  'radial-gradient(circle at 30% 70%, rgba(255, 140, 0, 0.5) 0%, transparent 40%)',
                  'radial-gradient(circle at 70% 30%, rgba(255, 215, 0, 0.5) 0%, transparent 40%)',
                  'radial-gradient(circle at 30% 70%, rgba(255, 140, 0, 0.5) 0%, transparent 40%)',
                ]
              : [
                  'radial-gradient(circle at 20% 80%, rgba(255, 140, 0, 0.4) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.4) 0%, transparent 50%)',
                  'radial-gradient(circle at 40% 40%, rgba(255, 140, 0, 0.4) 0%, transparent 50%)',
                  'radial-gradient(circle at 60% 60%, rgba(255, 215, 0, 0.4) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 80%, rgba(255, 140, 0, 0.4) 0%, transparent 50%)',
                ],
          }}
          transition={{
            duration: isMobile ? 8 : 10,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            transform: 'translateZ(0)',
            willChange: 'background',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 pt-40 pb-24">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <div className="mb-8">
            <Breadcrumbs items={breadcrumbs.items} variant="dark" />
          </div>

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-16 max-w-5xl"
          >
            <div className="mb-12 text-center">
              {/* Technology Logo */}
              <div className="mb-6 flex justify-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-white/30 bg-white/90 p-4 backdrop-blur-md">
                  <Image
                    src={technologyPage.frontmatter.logo}
                    alt={technologyPage.frontmatter.officialName}
                    width={80}
                    height={80}
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>

              {/* H1 */}
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-6xl">
                {technologyPage.frontmatter.officialName}
                {technologyPage.frontmatter.version && (
                  <span className="ml-3 text-3xl text-white/80 md:text-4xl">
                    {technologyPage.frontmatter.version}
                  </span>
                )}
              </h1>

              {/* Description */}
              <p className="mx-auto max-w-3xl text-lg text-white/90 md:text-xl">
                {technologyPage.frontmatter.description}
              </p>
            </div>
          </motion.div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mb-16 max-w-6xl"
          >
            <h2 className="mb-4 text-center text-3xl font-bold text-white md:text-4xl">
              Vorteile von {technologyPage.frontmatter.officialName}
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-white/80">
              Warum wir {technologyPage.frontmatter.officialName} für Ihre Projekte einsetzen
            </p>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {technologyPage.frontmatter.benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="rounded-lg border border-white/20 bg-white/10 p-6 backdrop-blur-md transition-colors hover:bg-white/20"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white/20">
                    <Icons.CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-white">{benefit.title}</h3>
                  <p className="text-white/80">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Use Cases Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mb-16 max-w-6xl"
          >
            <h2 className="mb-4 text-center text-3xl font-bold text-white md:text-4xl">
              Einsatzgebiete
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-white/80">
              Wann und wo {technologyPage.frontmatter.officialName} am besten eingesetzt wird
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              {technologyPage.frontmatter.useCases.map((useCase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="rounded-lg border border-white/20 bg-white/10 p-6 backdrop-blur-md"
                >
                  <h3 className="mb-3 text-xl font-semibold text-white">{useCase.title}</h3>
                  <p className="mb-4 text-white/80">{useCase.description}</p>
                  <div className="border-t border-white/20 pt-4">
                    <p className="text-sm font-semibold text-white/90">Ideal für:</p>
                    <p className="text-sm text-white/70">{useCase.bestFor}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Comparison Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mx-auto mb-16 max-w-6xl"
          >
            <h2 className="mb-4 text-center text-3xl font-bold text-white md:text-4xl">
              Technologie-Vergleich
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-white/80">
              {technologyPage.frontmatter.officialName} im Vergleich zu Alternativen
            </p>

            <div className="overflow-x-auto rounded-lg border border-white/20 bg-white/10 backdrop-blur-md">
              <table className="w-full text-left text-white">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="p-4 font-semibold">Feature</th>
                    <th className="p-4 font-semibold">{technologyPage.frontmatter.officialName}</th>
                    {technologyPage.frontmatter.comparison.alternatives.map((alt, index) => (
                      <th key={index} className="p-4 font-semibold">
                        {alt}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {technologyPage.frontmatter.comparison.tableRows.map((row, index) => (
                    <tr key={index} className="border-b border-white/10 last:border-b-0">
                      <td className="p-4 font-medium text-white/90">{row.feature}</td>
                      <td className="p-4 text-white/80">{row.thisTech}</td>
                      {row.alternatives.map((altValue, altIndex) => (
                        <td key={altIndex} className="p-4 text-white/80">
                          {altValue}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Main Content (MDX) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mx-auto mb-16 max-w-4xl"
          >
            <div className="rounded-lg border border-white/20 bg-white/10 p-8 text-white shadow-xl backdrop-blur-md md:p-12 [&_a]:text-white [&_a]:underline [&_a]:hover:text-white/80 [&_h1]:mt-0 [&_h1]:mb-6 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-white [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-white [&_li]:leading-relaxed [&_li]:text-white/90 [&_ol]:mt-4 [&_ol]:mb-6 [&_ol]:space-y-3 [&_p]:mb-5 [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-white/90 [&_strong]:font-semibold [&_strong]:text-white [&_ul]:mt-4 [&_ul]:mb-6 [&_ul]:space-y-3">
              <MDXContent>{CompiledContent}</MDXContent>
            </div>
          </motion.div>

          {/* FAQ Section */}
          {technologyPage.frontmatter.faqs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mx-auto mb-16 max-w-4xl"
            >
              <h2 className="mb-4 text-center text-3xl font-bold text-white md:text-4xl">
                Häufig gestellte Fragen
              </h2>
              <p className="mx-auto mb-12 max-w-2xl text-center text-white/80">
                Antworten zu {technologyPage.frontmatter.officialName}
              </p>

              <div className="rounded-lg border border-white/20 bg-white/10 p-6 backdrop-blur-md md:p-8">
                <Accordion type="single" collapsible className="w-full">
                  {technologyPage.frontmatter.faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left text-white hover:text-white/80">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-white/90">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </motion.div>
          )}

          {/* Final CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mx-auto max-w-4xl"
          >
            <div className="rounded-2xl border border-white/20 bg-white/10 p-12 text-center shadow-2xl backdrop-blur-md">
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                Projekt mit {technologyPage.frontmatter.officialName}?
              </h2>
              <p className="mb-8 text-xl text-white/90">
                Lassen Sie uns Ihr nächstes Projekt gemeinsam umsetzen
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link href="/contact">
                  <Button size="lg" className="text-primary bg-white hover:bg-gray-100">
                    Kostenloses Erstgespräch
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button
                    size="lg"
                    className="border-2 border-white bg-white/20 text-white backdrop-blur-sm transition-all hover:border-white/80 hover:bg-white/30"
                  >
                    Portfolio ansehen
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
