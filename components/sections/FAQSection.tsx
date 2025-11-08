'use client'

import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface FAQ {
  question: string
  answer: string
}

interface FAQSectionProps {
  faqs: FAQ[]
  /** Optional custom heading, defaults to "Häufig gestellte Fragen" */
  heading?: string
  /** Optional description */
  description?: string
  /** Optional custom section ID for anchor links */
  id?: string
}

/**
 * FAQ Section Component - Modernized with Glasmorphism Design
 *
 * Renders an accessible accordion of frequently asked questions.
 * Updated to match HEADON brand design with glasmorphism cards and gradients.
 *
 * @param faqs - Array of FAQ items with question and answer
 * @param heading - Optional custom section heading
 * @param description - Optional section description
 * @param id - Optional section ID for anchor links
 *
 * @example
 * ```tsx
 * <FAQSection
 *   faqs={[
 *     { question: "What is...?", answer: "It is..." },
 *     { question: "How does...?", answer: "It works by..." }
 *   ]}
 *   heading="Häufig gestellte Fragen"
 *   description="Antworten auf Ihre Fragen"
 * />
 * ```
 */
export default function FAQSection({
  faqs,
  heading = 'Häufig gestellte Fragen',
  description,
  id = 'faq',
}: FAQSectionProps) {
  // Don't render if no FAQs provided
  if (!faqs || faqs.length === 0) {
    return null
  }

  // Warn if too many FAQs (development only)
  if (process.env.NODE_ENV === 'development' && faqs.length > 8) {
    console.warn(
      `FAQSection: ${faqs.length} FAQs provided. For optimal SEO, consider limiting to 5-8 FAQs per section.`
    )
  }

  return (
    <section id={id} className="w-full py-16 md:py-20">
      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h2 className="from-primary to-secondary mb-4 bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
          {heading}
        </h2>
        {description && <p className="mx-auto max-w-2xl text-lg text-gray-600">{description}</p>}
      </motion.div>

      {/* FAQ Accordion - Glasmorphism Design */}
      <Accordion type="multiple" className="mx-auto max-w-4xl space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <AccordionItem
              value={`faq-item-${index}`}
              className="group hover:border-primary/50 rounded-2xl border border-gray-200/50 bg-white/80 px-6 shadow-lg backdrop-blur-sm transition-all hover:scale-[1.02] hover:bg-white/90 hover:shadow-xl"
            >
              <AccordionTrigger className="from-primary to-secondary py-5 text-left text-base font-bold group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:text-transparent hover:no-underline md:text-lg">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <div className="leading-relaxed text-gray-700">{faq.answer}</div>
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </section>
  )
}
