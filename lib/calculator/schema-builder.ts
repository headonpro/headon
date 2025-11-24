/**
 * Schema.org Structured Data Builder for Calculator Landing Pages
 *
 * Generates JSON-LD markup with FAQPage schema
 * for SEO optimization and rich snippets in search results.
 *
 * Note: WebApplication schema removed - Google requires aggregateRating/review
 * for SoftwareApplication types which we don't have.
 */

export interface FAQItem {
  question: string
  answer: string
}

export interface CalculatorSchema {
  '@context': string
  '@type': 'FAQPage'
  mainEntity: Array<{
    '@type': 'Question'
    name: string
    acceptedAnswer: {
      '@type': 'Answer'
      text: string
    }
  }>
}

/**
 * Creates Schema.org JSON-LD markup for calculator landing pages
 *
 * @param faqItems - Array of FAQ questions and answers specific to the page
 * @returns Schema.org compliant object ready for JSON.stringify()
 *
 * @example
 * ```tsx
 * const schema = createCalculatorSchema([
 *   { question: "Was kostet eine Website?", answer: "Ab 2.500€..." }
 * ])
 * <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}} />
 * ```
 */
export function createCalculatorSchema(faqItems: FAQItem[]): CalculatorSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question' as const,
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: item.answer,
      },
    })),
  }
}
