'use client'

/**
 * BranchenOverviewContent Component
 *
 * Enterprise-level overview page for all industry solutions
 * Focuses on technical excellence and measurable quality metrics
 */

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import * as Icons from 'lucide-react'
import AnimatedStats from '@/components/sections/AnimatedStats'
import ProcessTimeline from '@/components/sections/ProcessTimeline'
import TrustBadges from '@/components/sections/TrustBadges'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface BrancheCardData {
  slug: string
  frontmatter: {
    name: string
    description: string
    icon: string
    pricing: {
      from: number
      currency: string
    }
  }
}

interface BranchenOverviewContentProps {
  branchePages: BrancheCardData[]
}

export default function BranchenOverviewContent({ branchePages }: BranchenOverviewContentProps) {
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

  // Enterprise-level stats
  const stats = [
    {
      value: 6,
      label: 'Branchenlösungen',
      icon: <Icons.Layers className="h-6 w-6" />,
    },
    {
      value: 95,
      label: 'PageSpeed Score',
      suffix: '+',
      icon: <Icons.Zap className="h-6 w-6" />,
    },
    {
      value: 1.5,
      label: 'Ladezeit',
      suffix: 's',
      icon: <Icons.Clock className="h-6 w-6" />,
    },
    {
      value: 100,
      label: 'TypeScript Coverage',
      suffix: '%',
      icon: <Icons.Shield className="h-6 w-6" />,
    },
  ]

  // Development process
  const processSteps = [
    {
      number: 1,
      title: 'Requirement Analysis',
      description:
        'Detaillierte Analyse Ihrer Branchenanforderungen, Zielgruppe und Wettbewerb. Technisches Konzept und Architecture Design.',
      duration: '2-3 Tage',
    },
    {
      number: 2,
      title: 'System Design',
      description:
        'UX/UI Design, Datenbankschema, API-Design und Performance-Planung. Festpreis-Angebot mit transparenter Kalkulation.',
      duration: '3-5 Tage',
    },
    {
      number: 3,
      title: 'Agile Development',
      description:
        'Iterative Entwicklung mit regelmäßigen Updates (alle 3-5 Tage). TypeScript, Testing und Code Reviews inklusive.',
      duration: '2-4 Wochen',
    },
    {
      number: 4,
      title: 'Quality Assurance',
      description:
        'Automated Testing, Performance-Optimierung, Security-Audit und Cross-Browser Testing. SEO und Accessibility Check.',
      duration: '3-5 Tage',
    },
    {
      number: 5,
      title: 'Deployment & Support',
      description:
        'CI/CD Pipeline Setup, Production Deployment, Monitoring und 30 Tage Premium-Support inklusive.',
      duration: 'Inklusive',
    },
  ]

  // Technology stack
  const techStack = [
    {
      icon: <Icons.Code2 className="h-8 w-8" />,
      title: 'Next.js 15',
      description: 'React Framework mit App Router und Server Components',
    },
    {
      icon: <Icons.FileCode className="h-8 w-8" />,
      title: 'TypeScript',
      description: 'Type-Safe Development für fehlerfreien Code',
    },
    {
      icon: <Icons.Database className="h-8 w-8" />,
      title: 'Supabase',
      description: 'PostgreSQL Database mit Real-time Subscriptions',
    },
    {
      icon: <Icons.Sparkles className="h-8 w-8" />,
      title: 'Tailwind CSS v4',
      description: 'Modern Utility-First Styling mit Performance-Optimierung',
    },
    {
      icon: <Icons.TestTube className="h-8 w-8" />,
      title: 'Automated Testing',
      description: 'Unit, Integration und E2E Tests für Qualitätssicherung',
    },
    {
      icon: <Icons.Workflow className="h-8 w-8" />,
      title: 'CI/CD Pipeline',
      description: 'Automatisierte Deployments mit GitHub Actions',
    },
  ]

  // FAQs
  const faqs = [
    {
      question: 'Welche Technologien nutzen Sie für die Entwicklung?',
      answer:
        'Wir setzen auf moderne, bewährte Technologien: Next.js 15 mit React 19, TypeScript für Type-Safety, Tailwind CSS v4 für performantes Styling, und Supabase als Backend. Alle Projekte werden mit Automated Testing abgesichert und über CI/CD Pipelines deployed.',
    },
    {
      question: 'Wie gewährleisten Sie Code-Qualität?',
      answer:
        'Durch TypeScript Strict Mode, ESLint, Prettier, Automated Testing (Unit, Integration, E2E), Code Reviews, Performance-Monitoring und Security-Audits. Jedes Projekt folgt Clean Architecture Principles und SOLID Design Patterns.',
    },
    {
      question: 'Was bedeutet die Performance-Garantie?',
      answer:
        'Wir garantieren einen PageSpeed Score von 95+ und Ladezeiten unter 1.5 Sekunden. Alle Seiten werden für Core Web Vitals optimiert und vor Launch ausgiebig getestet. Performance-Monitoring ist integriert.',
    },
    {
      question: 'Ist die Website skalierbar?',
      answer:
        'Ja, durch Next.js Server Components, Caching-Strategien, optimierte Datenbankabfragen und Docker-Containerization. Die Architektur ist auf Wachstum ausgelegt und kann problemlos erweitert werden.',
    },
    {
      question: 'Wie ist die Barrierefreiheit gewährleistet?',
      answer:
        'Alle Websites werden nach WCAG 2.1 Level AA entwickelt. Das umfasst semantisches HTML, Keyboard-Navigation, Screen-Reader Support, ausreichende Kontraste und responsive Design.',
    },
    {
      question: 'Welche Security-Standards befolgen Sie?',
      answer:
        'HTTPS/TLS Encryption, CSRF Protection, XSS Prevention, SQL Injection Prevention, Security Headers (CSP, HSTS), DSGVO-konforme Datenspeicherung und regelmäßige Security-Audits.',
    },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="from-primary-600 via-primary-500 to-secondary-500 absolute inset-0 bg-gradient-to-br" />

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
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-16 max-w-5xl text-center"
          >
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl">
              Website-Lösungen für Ihre Branche
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-white/90">
              Spezialisierte Websites mit Enterprise-Architektur. Modern, performant und skalierbar
              – entwickelt nach Industriestandards.
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mx-auto mb-24 max-w-6xl"
          >
            <AnimatedStats stats={stats} variant="dark" />
          </motion.div>

          {/* Intro Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mb-24 max-w-4xl"
          >
            <div className="rounded-lg border border-white/20 bg-white/10 p-8 text-center backdrop-blur-md md:p-12">
              <h2 className="mb-4 text-3xl font-bold text-white">
                Enterprise-Level Web Development
              </h2>
              <p className="text-lg leading-relaxed text-white/90">
                Jede Branche hat spezifische Anforderungen. Unsere Lösungen kombinieren
                branchenspezifische Features mit moderner Technologie – von der Architektur bis zum
                Deployment nach Best Practices.
              </p>
            </div>
          </motion.div>

          {/* Branchen Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mb-24 max-w-6xl"
          >
            <h2 className="mb-4 text-center text-3xl font-bold text-white md:text-4xl">
              Unsere Branchenlösungen
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-white/80">
              Spezialisierte Features und maßgeschneiderte Funktionen für Ihre Branche
            </p>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {branchePages.map((branche, index) => {
                const IconComponent = Icons[branche.frontmatter.icon as keyof typeof Icons] as
                  | React.ComponentType<{ className?: string }>
                  | undefined

                return (
                  <motion.div
                    key={branche.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  >
                    <Link href={`/branchen/${branche.slug}`} className="group block h-full">
                      <div className="h-full rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/20 hover:shadow-2xl">
                        {/* Icon */}
                        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl border border-white/30 bg-white/20 transition-all group-hover:scale-110 group-hover:border-white/50">
                          {IconComponent && <IconComponent className="h-8 w-8 text-white" />}
                        </div>

                        {/* Content */}
                        <h3 className="mb-3 text-2xl font-bold text-white transition-colors">
                          {branche.frontmatter.name}
                        </h3>
                        <p className="mb-6 text-white/80">{branche.frontmatter.description}</p>

                        {/* Pricing */}
                        <div className="mb-6 flex items-center gap-2">
                          <Icons.Euro className="h-5 w-5 text-white/70" />
                          <span className="text-sm font-semibold text-white">
                            ab {branche.frontmatter.pricing.from.toLocaleString('de-DE')}{' '}
                            {branche.frontmatter.pricing.currency}
                          </span>
                        </div>

                        {/* CTA */}
                        <div className="flex items-center text-white transition-colors">
                          <span className="font-semibold">Mehr erfahren</span>
                          <Icons.ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Technology Excellence Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mx-auto mb-24 max-w-6xl"
          >
            <h2 className="mb-4 text-center text-3xl font-bold text-white md:text-4xl">
              Enterprise-Level Technologie
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-white/80">
              Modern Stack für Performance, Sicherheit und Skalierbarkeit
            </p>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {techStack.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="rounded-lg border border-white/20 bg-white/10 p-6 backdrop-blur-md transition-colors hover:bg-white/20"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-white/20 text-white">
                    {tech.icon}
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-white">{tech.title}</h3>
                  <p className="text-sm text-white/80">{tech.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Process Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mx-auto mb-24 max-w-5xl"
          >
            <h2 className="mb-4 text-center text-3xl font-bold text-white md:text-4xl">
              Professioneller Entwicklungsprozess
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-white/80">
              Von der Analyse bis zum Deployment – transparent und planbar
            </p>
            <ProcessTimeline steps={processSteps} variant="dark" />
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mx-auto mb-24 max-w-6xl"
          >
            <h2 className="mb-12 text-center text-3xl font-bold text-white md:text-4xl">
              Qualität nach Industriestandard
            </h2>
            <TrustBadges variant="dark" showTechStack={true} />
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mx-auto mb-24 max-w-5xl"
          >
            <h2 className="mb-4 text-center text-3xl font-bold text-white md:text-4xl">
              Häufig gestellte Fragen
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-white/80">
              Antworten zu Technologie, Qualität und Prozess
            </p>

            <div className="rounded-lg border border-white/20 bg-white/10 p-6 backdrop-blur-md md:p-8">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
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

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mx-auto max-w-4xl"
          >
            <div className="rounded-2xl border border-white/20 bg-white/10 p-12 text-center shadow-2xl backdrop-blur-md">
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                Bereit für Ihr Projekt?
              </h2>
              <p className="mb-8 text-xl text-white/90">
                Lassen Sie uns Ihre Branchenlösung mit Enterprise-Qualität entwickeln
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
