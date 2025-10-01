'use client'

/**
 * CityPageContent Component
 *
 * Client wrapper for city landing pages with animated gradient background
 */

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import type { CityContentResult, ServiceContentResult, PortfolioContentResult } from '@/lib/content/mdx-loader'
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
    <div className="h-64 md:h-96 bg-white/10 backdrop-blur-sm rounded-lg animate-pulse flex items-center justify-center border border-white/20">
      <MapPin className="w-8 h-8 text-white/50" />
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Gradient Background - same as HeroSection */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500" />

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
            className="max-w-5xl mx-auto mb-16"
          >
            <div className="text-center mb-12">
              {/* H1 with local keyword targeting */}
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
                Webentwicklung in {cityPage.frontmatter.name}
              </h1>

              {/* Subtitle with state */}
              <p className="text-xl md:text-2xl text-white/90 mb-4">
                {cityPage.frontmatter.state}
              </p>

              {/* Description */}
              <p className="text-lg text-white/80 max-w-3xl mx-auto">
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
            className="max-w-4xl mx-auto mb-16"
          >
            <div className="grid md:grid-cols-2 gap-6">
              {/* Population Card */}
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20 text-center hover:bg-white/20 transition-colors">
                <div className="flex justify-center mb-4">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">
                  {cityPage.frontmatter.population.toLocaleString('de-DE')}
                </div>
                <div className="text-white/80">Einwohner</div>
              </div>

              {/* Location Card */}
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20 text-center hover:bg-white/20 transition-colors">
                <div className="flex justify-center mb-4">
                  <MapPin className="w-12 h-12 text-white" />
                </div>
                <div className="text-2xl font-bold text-white mb-2">
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
            className="max-w-4xl mx-auto mb-16"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 md:p-12 shadow-xl border border-white/20 text-white [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-6 [&_h1]:mt-0 [&_h1]:text-white [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:text-white [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mb-3 [&_h3]:mt-8 [&_h3]:text-white [&_p]:text-white/90 [&_p]:mb-5 [&_p]:leading-relaxed [&_p]:text-base [&_strong]:text-white [&_strong]:font-semibold [&_ul]:space-y-3 [&_ul]:mb-6 [&_ul]:mt-4 [&_ol]:space-y-3 [&_ol]:mb-6 [&_ol]:mt-4 [&_li]:text-white/90 [&_li]:leading-relaxed [&_a]:text-white [&_a]:underline [&_a]:hover:text-white/80">
              <MDXContent>{CompiledContent}</MDXContent>
            </div>
          </motion.div>

          {/* Services Offered in City */}
          {services.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="max-w-6xl mx-auto mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
                Unsere Services in {cityPage.frontmatter.name}
              </h2>
              <p className="text-center text-white/80 mb-12 max-w-2xl mx-auto">
                Professionelle Dienstleistungen direkt vor Ort
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => (
                  <Link
                    key={service!.slug}
                    href={`/services/${service!.slug}`}
                    className="group"
                  >
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:border-white/40 transition-all hover:shadow-xl h-full hover:bg-white">
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                        {service!.frontmatter.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {service!.frontmatter.description}
                      </p>
                      <div className="text-primary font-semibold text-sm">
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
              className="max-w-6xl mx-auto mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
                Erfolgsgeschichten aus der Region
              </h2>
              <p className="text-center text-white/80 mb-12 max-w-2xl mx-auto">
                Projekte, die wir in {cityPage.frontmatter.name} und Umgebung realisiert haben
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {caseStudies.map((project) => (
                  <Link
                    key={project!.slug}
                    href={`/portfolio/${project!.slug}`}
                    className="group"
                  >
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg overflow-hidden border border-white/20 hover:border-white/40 transition-all hover:shadow-xl">
                      {/* Project Image */}
                      {project!.frontmatter.image && (
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={project!.frontmatter.image.url}
                            alt={project!.frontmatter.image.alt}
                            width={600}
                            height={400}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}

                      {/* Project Info */}
                      <div className="p-6">
                        <div className="text-sm text-gray-600 mb-2">
                          {project!.frontmatter.client.name}
                        </div>
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {project!.frontmatter.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                          {project!.frontmatter.description}
                        </p>

                        {/* Metrics */}
                        {project!.frontmatter.metrics.length > 0 && (
                          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
                            {project!.frontmatter.metrics.slice(0, 2).map((metric, idx) => (
                              <div key={idx} className="text-center">
                                <div className="text-2xl font-bold text-primary">
                                  {metric.value}
                                </div>
                                <div className="text-xs text-gray-600">
                                  {metric.label}
                                </div>
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
            className="max-w-4xl mx-auto"
          >
            <div className="text-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-12 shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                Ihr Partner für Webentwicklung in {cityPage.frontmatter.name}
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Lassen Sie uns gemeinsam Ihr digitales Projekt verwirklichen
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-gray-100"
                  >
                    Kostenloses Erstgespräch
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button
                    size="lg"
                    className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white/30 hover:border-white/80 transition-all"
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
