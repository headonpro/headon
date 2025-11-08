'use client'

/**
 * ServiceTabs Component
 *
 * Tabbed interface for services on city pages
 * Shows services in a more engaging way than a grid
 */

import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import type { ServiceContentResult } from '@/lib/content/mdx-loader'
import { Code, Smartphone, Palette, Server } from 'lucide-react'

interface ServiceTabsProps {
  services: (ServiceContentResult | null)[]
  variant?: 'light' | 'dark'
}

const serviceIcons: Record<string, React.ReactNode> = {
  'web-development': <Code className="h-6 w-6" />,
  'mobile-development': <Smartphone className="h-6 w-6" />,
  'ui-ux-design': <Palette className="h-6 w-6" />,
  'backend-solutions': <Server className="h-6 w-6" />,
}

export default function ServiceTabs({ services, variant = 'dark' }: ServiceTabsProps) {
  const isDark = variant === 'dark'
  const validServices = services.filter((s) => s !== null) as ServiceContentResult[]

  if (validServices.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Tabs defaultValue={validServices[0].slug} className="w-full">
        <TabsList
          className={`grid w-full ${
            validServices.length === 2
              ? 'grid-cols-2'
              : validServices.length === 3
                ? 'grid-cols-3'
                : 'grid-cols-2 lg:grid-cols-4'
          } ${
            isDark
              ? 'border-white/20 bg-white/10 backdrop-blur-md'
              : 'border-gray-200 bg-white'
          }`}
        >
          {validServices.map((service) => (
            <TabsTrigger
              key={service.slug}
              value={service.slug}
              className={`flex items-center gap-2 ${
                isDark
                  ? 'data-[state=active]:bg-white/20 data-[state=active]:text-white'
                  : 'data-[state=active]:bg-primary/10 data-[state=active]:text-primary'
              }`}
            >
              {serviceIcons[service.slug] || <Code className="h-5 w-5" />}
              <span className="hidden sm:inline">{service.frontmatter.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {validServices.map((service) => (
          <TabsContent key={service.slug} value={service.slug} className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`rounded-lg border p-8 backdrop-blur-md ${
                isDark
                  ? 'border-white/20 bg-white/10'
                  : 'border-gray-200 bg-white shadow-xl'
              }`}
            >
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <h3
                    className={`mb-2 text-2xl font-bold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {service.frontmatter.title}
                  </h3>
                  <p
                    className={`mb-4 max-w-2xl leading-relaxed ${
                      isDark ? 'text-white/80' : 'text-gray-600'
                    }`}
                  >
                    {service.frontmatter.description}
                  </p>
                </div>
                <div
                  className={`hidden shrink-0 rounded-full p-4 md:block ${
                    isDark ? 'bg-white/20' : 'bg-primary/10'
                  }`}
                >
                  <div className={isDark ? 'text-white' : 'text-primary'}>
                    {serviceIcons[service.slug] || <Code className="h-8 w-8" />}
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div
                className={`mb-6 rounded-lg border p-4 ${
                  isDark
                    ? 'border-white/20 bg-white/5'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span
                      className={`text-sm font-medium ${
                        isDark ? 'text-white/70' : 'text-gray-600'
                      }`}
                    >
                      Preis ab
                    </span>
                    <div
                      className={`mt-1 text-3xl font-bold ${
                        isDark ? 'text-white' : 'text-primary'
                      }`}
                    >
                      {service.frontmatter.pricing.from.toLocaleString('de-DE')}{' '}
                      {service.frontmatter.pricing.currency}
                    </div>
                  </div>
                  <div>
                    <Link href={`/services/${service.slug}`}>
                      <Button
                        variant={isDark ? 'secondary' : 'default'}
                        size="lg"
                        className={
                          isDark
                            ? 'bg-white text-primary hover:bg-gray-100'
                            : ''
                        }
                      >
                        Details ansehen
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Key deliverables */}
              {service.frontmatter.deliverables && service.frontmatter.deliverables.length > 0 && (
                <div>
                  <h4
                    className={`mb-4 font-semibold ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    Was ist enthalten:
                  </h4>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {service.frontmatter.deliverables.slice(0, 6).map((deliverable: string, index: number) => (
                      <div key={index} className="flex items-start gap-2">
                        <svg
                          className={`mt-1 h-5 w-5 shrink-0 ${
                            isDark ? 'text-green-400' : 'text-green-600'
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span
                          className={`text-sm ${
                            isDark ? 'text-white/80' : 'text-gray-600'
                          }`}
                        >
                          {deliverable}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </motion.div>
  )
}
