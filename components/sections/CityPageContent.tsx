'use client'

/**
 * CityPageContent Component (Enhanced Version)
 *
 * Redesigned city landing pages with improved UX, conversion optimization, and Local SEO
 */

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import type {
  CityContentResult,
  ServiceContentResult,
  PortfolioContentResult,
} from '@/lib/content/mdx-loader'
import { MapPin, Users, TrendingUp, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import AnimatedStats from '@/components/sections/AnimatedStats'
import ProcessTimeline from '@/components/sections/ProcessTimeline'
import TrustBadges from '@/components/sections/TrustBadges'
import LeadMagnetCTA from '@/components/sections/LeadMagnetCTA'
import CityFAQSection from '@/components/sections/CityFAQSection'
import ServiceTabs from '@/components/sections/ServiceTabs'
import { getCityFAQs } from '@/lib/content/city-faq-data'

// Lazy load map component
const SingleCityMap = dynamic(() => import('@/components/sections/SingleCityMap'), {
  loading: () => (
    <div className="flex h-64 animate-pulse items-center justify-center rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm md:h-96">
      <MapPin className="h-8 w-8 text-white/50" />
    </div>
  ),
})

interface CityPageContentProps {
  cityPage: CityContentResult
  CompiledContent: React.ReactElement
  services: (ServiceContentResult | null)[]
  caseStudies: (PortfolioContentResult | null)[]
  breadcrumbs: {
    items: Array<{ name: string; url: string }>
  }
}

export default function CityPageContent({
  cityPage,
  CompiledContent,
  services,
  caseStudies,
  breadcrumbs,
}: CityPageContentProps) {
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

  // Generate city-specific FAQs
  const faqs = getCityFAQs(cityPage.frontmatter.name, 'Main-Tauber-Kreis')

  // Stats for the city
  const stats = [
    {
      value: 12,
      label: 'Projekte in der Region',
      suffix: '+',
      icon: <TrendingUp className="h-6 w-6" />,
    },
    {
      value: 98,
      label: 'Kundenzufriedenheit',
      suffix: '%',
      icon: <Users className="h-6 w-6" />,
    },
    {
      value: 1.5,
      label: 'Durchschn. Ladezeit',
      suffix: 's',
      icon: <Clock className="h-6 w-6" />,
    },
    {
      value: cityPage.frontmatter.population,
      label: 'Einwohner',
      icon: <MapPin className="h-6 w-6" />,
    },
  ]

  // Process steps
  const processSteps = [
    {
      number: 1,
      title: 'Kostenlose Erstberatung',
      description: `Persönliches Gespräch in ${cityPage.frontmatter.name} oder online. Wir analysieren Ihre Anforderungen und zeigen Ihnen Möglichkeiten auf.`,
      duration: '30-45 Min',
    },
    {
      number: 2,
      title: 'Konzept & Angebot',
      description:
        'Sie erhalten ein detailliertes Konzept mit Festpreis-Angebot. Keine versteckten Kosten, keine Überraschungen.',
      duration: '2-3 Tage',
    },
    {
      number: 3,
      title: 'Design & Entwicklung',
      description:
        'Wir entwickeln Ihre Website mit regelmäßigen Updates (alle 3-5 Tage). Sie können jederzeit Feedback geben und Anpassungen vornehmen.',
      duration: '2-4 Wochen',
    },
    {
      number: 4,
      title: 'Testing & Launch',
      description:
        'Ausgiebige Tests auf allen Geräten, Performance-Optimierung und SEO-Check. Nach Ihrer Freigabe geht die Website live.',
      duration: '3-5 Tage',
    },
    {
      number: 5,
      title: '30 Tage Support',
      description:
        'Nach dem Launch unterstützen wir Sie 30 Tage kostenlos bei Fragen, Anpassungen und Optimierungen.',
      duration: 'Inklusive',
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
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl">
                Webentwicklung in {cityPage.frontmatter.name}
              </h1>
              <p className="mb-4 text-xl text-white/90 md:text-2xl">{cityPage.frontmatter.state}</p>
              <p className="mx-auto max-w-3xl text-lg text-white/80">
                {cityPage.frontmatter.description}
              </p>
            </div>

            <div className="mb-8">
              <SingleCityMap
                cityName={cityPage.frontmatter.name}
                coordinates={cityPage.frontmatter.coordinates}
              />
            </div>
          </motion.div>

          {/* Stats Section - NEW */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mb-24 max-w-6xl"
          >
            <AnimatedStats stats={stats} variant="dark" />
          </motion.div>

          {/* About Teaser - Shortened MDX Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mb-24 max-w-4xl"
          >
            <div className="rounded-lg border border-white/20 bg-white/10 p-8 text-white shadow-xl backdrop-blur-md md:p-12">
              <h2 className="mb-6 text-3xl font-bold text-white">
                Über {cityPage.frontmatter.name}
              </h2>
              <div className="[&_a]:text-white [&_a]:underline [&_a]:hover:text-white/80 [&_p]:mb-5 [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-white/90 [&_strong]:font-semibold [&_strong]:text-white">
                {/* Only show first section of MDX */}
                {CompiledContent}
              </div>
            </div>
          </motion.div>

          {/* Services Tabs - NEW */}
          {services.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mx-auto mb-24 max-w-6xl"
            >
              <h2 className="mb-4 text-center text-3xl font-bold text-white md:text-4xl">
                Unsere Services in {cityPage.frontmatter.name}
              </h2>
              <p className="mx-auto mb-12 max-w-2xl text-center text-white/80">
                Professionelle Dienstleistungen mit modernen Technologien
              </p>
              <ServiceTabs services={services} variant="dark" />
            </motion.div>
          )}

          {/* Intermediate CTA - Lead Magnet */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mx-auto mb-24 max-w-5xl"
          >
            <LeadMagnetCTA cityName={cityPage.frontmatter.name} variant="dark" />
          </motion.div>

          {/* Process Timeline - NEW */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mx-auto mb-24 max-w-5xl"
          >
            <h2 className="mb-4 text-center text-3xl font-bold text-white md:text-4xl">
              So läuft die Zusammenarbeit ab
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-center text-white/80">
              Von der ersten Idee bis zum erfolgreichen Launch – transparent und planbar
            </p>
            <ProcessTimeline steps={processSteps} variant="dark" />
          </motion.div>

          {/* Trust Badges - NEW */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mx-auto mb-24 max-w-6xl"
          >
            <h2 className="mb-12 text-center text-3xl font-bold text-white md:text-4xl">
              Qualität & Sicherheit garantiert
            </h2>
            <TrustBadges variant="dark" showTechStack={true} />
          </motion.div>

          {/* Case Studies */}
          {caseStudies.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mx-auto mb-24 max-w-6xl"
            >
              <h2 className="mb-4 text-center text-3xl font-bold text-white md:text-4xl">
                Erfolgsgeschichten aus der Region
              </h2>
              <p className="mx-auto mb-12 max-w-2xl text-center text-white/80">
                Projekte, die wir in {cityPage.frontmatter.name} und Umgebung realisiert haben
              </p>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {caseStudies.map((project) => (
                  <Link key={project!.slug} href={`/portfolio/${project!.slug}`} className="group">
                    <div className="overflow-hidden rounded-lg border border-white/20 bg-white/95 backdrop-blur-sm transition-all hover:border-white/40 hover:shadow-xl">
                      {project!.frontmatter.image && (
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={project!.frontmatter.image.url}
                            alt={project!.frontmatter.image.alt}
                            width={600}
                            height={400}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}

                      <div className="p-6">
                        <div className="mb-2 text-sm text-gray-600">
                          {project!.frontmatter.client.name}
                        </div>
                        <h3 className="group-hover:text-primary mb-2 text-xl font-semibold transition-colors">
                          {project!.frontmatter.title}
                        </h3>
                        <p className="mb-4 line-clamp-2 text-sm text-gray-600">
                          {project!.frontmatter.description}
                        </p>

                        {project!.frontmatter.metrics.length > 0 && (
                          <div className="grid grid-cols-2 gap-3 border-t border-gray-200 pt-4">
                            {project!.frontmatter.metrics.slice(0, 2).map((metric, idx) => (
                              <div key={idx} className="text-center">
                                <div className="text-primary text-2xl font-bold">
                                  {metric.value}
                                </div>
                                <div className="text-xs text-gray-600">{metric.label}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

          {/* FAQ Section - NEW */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mx-auto mb-24 max-w-5xl"
          >
            <CityFAQSection faqs={faqs} cityName={cityPage.frontmatter.name} variant="dark" />
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
                Ihr Partner für Webentwicklung in {cityPage.frontmatter.name}
              </h2>
              <p className="mb-8 text-xl text-white/90">
                Lassen Sie uns gemeinsam Ihr digitales Projekt verwirklichen
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
