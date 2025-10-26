'use client'

/**
 * CityPageContent Component
 *
 * Client wrapper for city landing pages with animated gradient background
 */

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import type {
  CityContentResult,
  ServiceContentResult,
  PortfolioContentResult,
} from '@/lib/content/mdx-loader'
import MDXContent from '@/components/content/MDXContent'
import { MapPin, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import Breadcrumbs from '@/components/seo/Breadcrumbs'

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

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Gradient Background - same as HeroSection */}
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

          {/* Hero Section with H1 for local SEO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-16 max-w-5xl"
          >
            <div className="mb-12 text-center">
              {/* H1 with local keyword targeting */}
              <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl">
                Webentwicklung in {cityPage.frontmatter.name}
              </h1>

              {/* Subtitle with state */}
              <p className="mb-4 text-xl text-white/90 md:text-2xl">{cityPage.frontmatter.state}</p>

              {/* Description */}
              <p className="mx-auto max-w-3xl text-lg text-white/80">
                {cityPage.frontmatter.description}
              </p>
            </div>

            {/* Single City Map */}
            <div className="mb-8">
              <SingleCityMap
                cityName={cityPage.frontmatter.name}
                coordinates={cityPage.frontmatter.coordinates}
              />
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mb-16 max-w-4xl"
          >
            <div className="grid gap-6 md:grid-cols-2">
              {/* Population Card */}
              <div className="rounded-lg border border-white/20 bg-white/10 p-8 text-center backdrop-blur-md transition-colors hover:bg-white/20">
                <div className="mb-4 flex justify-center">
                  <Users className="h-12 w-12 text-white" />
                </div>
                <div className="mb-2 text-4xl font-bold text-white">
                  {cityPage.frontmatter.population.toLocaleString('de-DE')}
                </div>
                <div className="text-white/80">Einwohner</div>
              </div>

              {/* Location Card */}
              <div className="rounded-lg border border-white/20 bg-white/10 p-8 text-center backdrop-blur-md transition-colors hover:bg-white/20">
                <div className="mb-4 flex justify-center">
                  <MapPin className="h-12 w-12 text-white" />
                </div>
                <div className="mb-2 text-2xl font-bold text-white">
                  {cityPage.frontmatter.state}
                </div>
                <div className="text-white/80">Bundesland</div>
              </div>
            </div>
          </motion.div>

          {/* Main Content (MDX) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mx-auto mb-16 max-w-4xl"
          >
            <div className="rounded-lg border border-white/20 bg-white/10 p-8 text-white shadow-xl backdrop-blur-md md:p-12 [&_a]:text-white [&_a]:underline [&_a]:hover:text-white/80 [&_h1]:mt-0 [&_h1]:mb-6 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-white [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-white [&_li]:leading-relaxed [&_li]:text-white/90 [&_ol]:mt-4 [&_ol]:mb-6 [&_ol]:space-y-3 [&_p]:mb-5 [&_p]:text-base [&_p]:leading-relaxed [&_p]:text-white/90 [&_strong]:font-semibold [&_strong]:text-white [&_ul]:mt-4 [&_ul]:mb-6 [&_ul]:space-y-3">
              <MDXContent>{CompiledContent}</MDXContent>
            </div>
          </motion.div>

          {/* Services Offered in City */}
          {services.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mx-auto mb-16 max-w-6xl"
            >
              <h2 className="mb-4 text-center text-3xl font-bold text-white md:text-4xl">
                Unsere Services in {cityPage.frontmatter.name}
              </h2>
              <p className="mx-auto mb-12 max-w-2xl text-center text-white/80">
                Professionelle Dienstleistungen direkt vor Ort
              </p>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                  <Link key={service!.slug} href={`/services/${service!.slug}`} className="group">
                    <div className="h-full rounded-lg border border-white/20 bg-white/95 p-6 backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white hover:shadow-xl">
                      <h3 className="group-hover:text-primary mb-3 text-xl font-semibold transition-colors">
                        {service!.frontmatter.title}
                      </h3>
                      <p className="mb-4 line-clamp-3 text-sm text-gray-600">
                        {service!.frontmatter.description}
                      </p>
                      <div className="text-primary text-sm font-semibold">
                        ab {service!.frontmatter.pricing.from.toLocaleString('de-DE')}{' '}
                        {service!.frontmatter.pricing.currency}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

          {/* Local Case Studies */}
          {caseStudies.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mx-auto mb-16 max-w-6xl"
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
                      {/* Project Image */}
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

                      {/* Project Info */}
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

                        {/* Metrics */}
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

          {/* Final CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
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
