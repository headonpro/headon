'use client'

import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FAQSchema } from '@/components/seo/SchemaGenerator'
import type { FAQ } from '@/lib/types/content'

interface ModernFAQAccordionProps {
  faqs: FAQ[]
  includeSchema?: boolean
  heading?: string
  description?: string
  className?: string
}

/**
 * Modern FAQ Accordion Component with Glasmorphism Design
 *
 * Reusable FAQ component following HEADON brand design with:
 * - Glasmorphism cards with backdrop blur
 * - Gradient accents on icons and text
 * - Smooth animations with Framer Motion
 * - Automatic FAQPage schema generation for SEO
 *
 * @example
 * ```tsx
 * <ModernFAQAccordion
 *   faqs={faqData.webDevelopment}
 *   heading="Häufig gestellte Fragen"
 *   description="Antworten zu Web-Entwicklung"
 *   includeSchema={true}
 * />
 * ```
 */
export function ModernFAQAccordion({
  faqs,
  includeSchema = true,
  heading = 'Häufig gestellte Fragen',
  description,
  className = '',
}: ModernFAQAccordionProps) {
  if (!faqs || faqs.length === 0) {
    return null
  }

  return (
    <>
      <div className={`w-full ${className}`}>
        {/* Section Header */}
        {(heading || description) && (
          <div className="mb-8 text-center">
            {heading && (
              <h2 className="from-primary to-secondary mb-4 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                {heading}
              </h2>
            )}
            {description && <p className="mx-auto max-w-2xl text-lg text-gray-600">{description}</p>}
          </div>
        )}

        {/* FAQ Accordion - Glasmorphism Cards */}
        <Accordion type="multiple" className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <AccordionItem
                value={`faq-${index}`}
                className="group rounded-2xl border border-gray-200/50 bg-white/80 px-6 shadow-lg backdrop-blur-sm transition-all hover:scale-[1.02] hover:border-primary/50 hover:bg-white/90 hover:shadow-xl"
              >
                <AccordionTrigger className="from-primary to-secondary py-5 text-left text-base font-bold hover:no-underline group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:text-transparent md:text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-gray-700">
                  <p className="leading-relaxed">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>

      {/* FAQ Schema for SEO */}
      {includeSchema && <FAQSchema faqs={faqs} />}
    </>
  )
}

export default ModernFAQAccordion
