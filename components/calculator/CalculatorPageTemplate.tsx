import { CostCalculator } from '@/components/calculator/CostCalculator'
import { CheckCircle2, LucideIcon, MessageCircle, ArrowRight } from 'lucide-react'
import { createCalculatorSchema, type FAQItem } from '@/lib/calculator/schema-builder'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Link from 'next/link'

/**
 * CalculatorPageTemplate - Reusable template for calculator landing pages
 *
 * Eliminates code duplication across /webseite-erstellen-lassen-kosten,
 * /homepage-kosten, and /website-kosten pages.
 *
 * Each page provides only content configuration, layout stays consistent.
 */

// ============================================================================
// Type Definitions
// ============================================================================

export interface BadgeConfig {
  icon: LucideIcon
  text: string
}

export interface ContentSection {
  title: string
  content: string | React.ReactNode
}

export interface CTAConfig {
  headline: string
  subtext: string
  buttonText: string
}

export interface CalculatorPageConfig {
  // Hero Section
  badge?: BadgeConfig
  h1: string
  h1Accent?: string // Optional colored part after main h1
  h1Suffix?: string // Optional white text after h1Accent (e.g., "(2025)")
  subtitle: string
  trustIndicators: string[]

  // Content Sections (between calculator and FAQ)
  contentSections: ContentSection[]

  // FAQ Section
  faqs: FAQItem[]

  // CTA Section
  cta: CTAConfig
}

// ============================================================================
// Main Template Component
// ============================================================================

interface CalculatorPageTemplateProps {
  config: CalculatorPageConfig
}

export function CalculatorPageTemplate({ config }: CalculatorPageTemplateProps) {
  // Generate schema for SEO
  const schema = createCalculatorSchema(config.faqs)

  return (
    <>
      {/* Hero & Calculator Section - Combined */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 pt-24 pb-16 md:pt-32">
        <div className="container mx-auto px-4">
          {/* Hero Content */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            {/* Optional Badge */}
            {config.badge && (
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-6 border border-white/20">
                <config.badge.icon className="h-4 w-4" />
                <span>{config.badge.text}</span>
              </div>
            )}

            {/* H1 Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {config.h1}{' '}
              {config.h1Accent && (
                <span className="from-secondary-300 via-accent-500 to-secondary-600 bg-gradient-to-r bg-clip-text text-transparent">
                  {config.h1Accent}
                </span>
              )}
              {config.h1Suffix && <> {config.h1Suffix}</>}
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">{config.subtitle}</p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm md:text-base text-white/90 font-medium">
              {config.trustIndicators.map((indicator, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent-400" />
                  <span>{indicator}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Calculator */}
          <CostCalculator />
        </div>
      </section>

      {/* Unique Content Sections */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg prose-slate">
            {config.contentSections.map((section, idx) => (
              <div key={idx}>
                {typeof section.content === 'string' ? (
                  <>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">{section.title}</h2>
                    <div dangerouslySetInnerHTML={{ __html: section.content }} />
                  </>
                ) : (
                  <>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">{section.title}</h2>
                    {section.content}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Guides Section */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Passende Ratgeber für Sie
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Homepage Kosten Ratgeber */}
              <a
                href="/homepage-kosten"
                className="group block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-primary-300 hover:shadow-md"
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                  Homepage Kosten für KMUs →
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Spezieller Ratgeber für kleine Unternehmen und Selbstständige. Erfahren Sie, was
                  eine Business-Homepage wirklich kostet und welche Features Sie benötigen.
                </p>
              </a>

              {/* Website Kosten Ratgeber */}
              <a
                href="/website-kosten"
                className="group block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-primary-300 hover:shadow-md"
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-primary-600">
                  Technischer Website-Kosten-Guide →
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Verstehen Sie die technischen Kostenfaktoren: Architektur, Datenbanken,
                  Performance-Optimierung und wie diese Entscheidungen Ihr Budget beeinflussen.
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative bg-gradient-to-b from-white via-gray-50 to-white py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl">
              Häufig gestellte Fragen
            </h2>

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
              <Accordion type="single" collapsible className="w-full">
                {config.faqs.map((faq, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`} className="border-b border-gray-200 last:border-0">
                    <AccordionTrigger className="px-6 py-5 text-left text-lg font-bold text-gray-900 hover:bg-gray-50 hover:no-underline md:px-8 md:py-6 [&>svg]:text-primary-600">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 md:px-8 md:pb-8">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="overflow-hidden rounded-2xl border border-primary-200 bg-gradient-to-br from-primary-50 to-white p-8 shadow-lg md:p-10">
              <div className="flex flex-col items-center text-center gap-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-700 shadow-lg">
                  <MessageCircle className="h-8 w-8 text-white" strokeWidth={2} />
                </div>

                <div>
                  <h3 className="mb-3 text-2xl font-bold text-gray-900 md:text-3xl">
                    Individuelle Beratung gewünscht?
                  </h3>
                  <p className="mb-6 text-base text-gray-700 leading-relaxed md:text-lg">
                    Lassen Sie uns gemeinsam Ihr Projekt besprechen und eine maßgeschneiderte Lösung entwickeln.
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:from-primary-700 hover:to-primary-800"
                >
                  Kostenloses Erstgespräch vereinbaren
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>

                <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600 md:gap-6">
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 text-lg">✓</span>
                    <span>Unverbindlich</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 text-lg">✓</span>
                    <span>Kostenlos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-600 text-lg">✓</span>
                    <span>Innerhalb 24h Antwort</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Schema.org Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  )
}
