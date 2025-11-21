import Link from 'next/link'
import { ArrowRight, Calculator, MessageCircle } from 'lucide-react'
import { type FAQItem } from '@/lib/calculator/schema-builder'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export interface RatgeberPageConfig {
  h1: string
  h1Accent?: string
  subtitle: string
  trustIndicators?: string[]
  contentSections: {
    title: string
    content: React.ReactNode | string
  }[]
  faqs?: FAQItem[]
  cta: {
    headline: string
    subtext: string
    buttonText: string
    calculatorUrl?: string
  }
}

interface RatgeberPageTemplateProps {
  config: RatgeberPageConfig
}

export function RatgeberPageTemplate({ config }: RatgeberPageTemplateProps) {
  const calculatorUrl = config.cta.calculatorUrl || '/webseite-erstellen-lassen-kosten'

  return (
    <div className="bg-white">
      {/* Hero Section + First Content Combined */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 pb-20 pt-20 md:pb-28 md:pt-28">
        <div className="container mx-auto px-4">
          {/* Hero Header */}
          <div className="mx-auto mb-16 max-w-4xl text-center md:mb-20">
            <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              {config.h1}
              {config.h1Accent && (
                <>
                  <br />
                  <span className="from-secondary-300 via-accent-500 to-secondary-600 bg-gradient-to-r bg-clip-text text-transparent">
                    {config.h1Accent}
                  </span>
                </>
              )}
            </h1>

            <p className="mx-auto mb-8 max-w-3xl text-xl text-white/90">
              {config.subtitle}
            </p>

            {config.trustIndicators && config.trustIndicators.length > 0 && (
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-white/90 md:text-base">
                {config.trustIndicators.map((indicator, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-accent-400 text-lg font-bold">✓</span>
                    <span>{indicator}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* First Content Section (inside hero) */}
          {config.contentSections.length > 0 && (
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-10 text-3xl font-bold text-white md:text-4xl">
                {config.contentSections[0].title}
              </h2>

              {typeof config.contentSections[0].content === 'string' ? (
                <div
                  className="prose prose-lg max-w-none prose-headings:text-white prose-p:text-white/90 prose-p:leading-relaxed prose-a:text-white prose-a:underline prose-a:font-semibold prose-strong:text-white prose-ul:text-white/90 prose-li:text-white/90"
                  dangerouslySetInnerHTML={{ __html: config.contentSections[0].content }}
                />
              ) : (
                <div className="prose prose-lg max-w-none prose-headings:text-white prose-p:text-white/90 prose-p:leading-relaxed prose-a:text-white prose-a:underline prose-a:font-semibold prose-strong:text-white prose-ul:text-white/90 prose-li:text-white/90">
                  {config.contentSections[0].content}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Remaining Content Sections */}
      {config.contentSections.slice(1).map((section, idx) => (
        <section
          key={idx}
          className={idx % 2 === 0 ? 'bg-gradient-to-b from-white via-gray-50 to-white py-16 md:py-20' : 'bg-white py-16 md:py-20'}
        >
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-10 text-3xl font-bold text-gray-900 md:text-4xl">
                {section.title}
              </h2>

              {typeof section.content === 'string' ? (
                <div
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-primary-600 prose-a:font-semibold prose-strong:text-gray-900 prose-ul:text-gray-700"
                  dangerouslySetInnerHTML={{ __html: section.content }}
                />
              ) : (
                <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-primary-600 prose-a:font-semibold prose-strong:text-gray-900 prose-ul:text-gray-700">
                  {section.content}
                </div>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* Calculator CTA Section */}
      <section className="relative -mt-1 bg-gradient-to-b from-white via-gray-50 to-white py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="overflow-hidden rounded-3xl border border-gray-200/50 bg-white p-10 shadow-2xl md:p-12">
              <div className="mb-8 flex justify-center">
                <div className="bg-gradient-to-br from-primary-500 to-primary-700 inline-flex rounded-xl p-5 shadow-lg">
                  <Calculator className="h-12 w-12 text-white" strokeWidth={2.5} />
                </div>
              </div>

              <h3 className="mb-4 text-center text-3xl font-bold text-gray-900 md:text-4xl">
                {config.cta.headline}
              </h3>
              <p className="mb-10 text-center text-lg leading-relaxed text-gray-700">{config.cta.subtext}</p>

              <Link
                href={calculatorUrl}
                className="from-accent-500 to-secondary-500 hover:from-accent-600 hover:to-secondary-600 text-primary-900 inline-flex w-full items-center justify-center gap-3 rounded-lg bg-gradient-to-r px-8 py-4 text-lg font-semibold shadow-xl transition-all duration-300 hover:shadow-2xl"
              >
                {config.cta.buttonText}
                <ArrowRight className="h-5 w-5" />
              </Link>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-green-600 text-lg">✓</span>
                  <span>Transparente Kalkulation</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 text-lg">✓</span>
                  <span>Ohne Anmeldung</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 text-lg">✓</span>
                  <span>In 2 Minuten</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {config.faqs && config.faqs.length > 0 && (
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
      )}

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
    </div>
  )
}
