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
  /** Optional custom section ID for anchor links */
  id?: string
}

/**
 * FAQ Section Component
 *
 * Renders an accessible accordion of frequently asked questions.
 * Optimized for SEO with proper semantic HTML and Schema.org compatibility.
 *
 * @param faqs - Array of FAQ items with question and answer
 * @param heading - Optional custom section heading
 * @param id - Optional section ID for anchor links
 *
 * @example
 * ```tsx
 * <FAQSection faqs={[
 *   { question: "What is...?", answer: "It is..." },
 *   { question: "How does...?", answer: "It works by..." }
 * ]} />
 * ```
 */
export default function FAQSection({
  faqs,
  heading = 'Häufig gestellte Fragen',
  id = 'faq',
}: FAQSectionProps) {
  // Recommend 5-8 FAQs for optimal SEO
  // Log warning if more than 8 FAQs (development only)
  if (process.env.NODE_ENV === 'development' && faqs.length > 8) {
    console.warn(
      `FAQSection: ${faqs.length} FAQs provided. For optimal SEO, consider limiting to 5-8 FAQs per section.`
    )
  }

  // Don't render if no FAQs provided
  if (faqs.length === 0) {
    return null
  }

  return (
    <section id={id} className="w-full">
      {/* Section Heading */}
      <h2 className="mb-8 text-center text-3xl font-bold md:mb-12 md:text-4xl">{heading}</h2>

      {/* FAQ Accordion */}
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
            <AccordionTrigger className="rounded-lg px-4 py-6 text-left text-lg font-semibold text-gray-900 transition-colors hover:bg-gray-50 [&[data-state=open]]:bg-gray-50">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="px-4 pt-2 pb-6">
              <div className="prose max-w-none text-base leading-relaxed text-gray-700">
                {faq.answer}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* Optional: Add schema.org FAQPage markup hint */}
      {/* Note: Actual Schema.org JSON-LD should be added via SchemaGenerator component */}
    </section>
  )
}
