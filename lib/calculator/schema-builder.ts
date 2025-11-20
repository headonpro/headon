/**
 * Schema.org Structured Data Builder for Calculator Landing Pages
 *
 * Generates JSON-LD markup with WebApplication + FAQPage schema
 * for SEO optimization and rich snippets in search results.
 */

export interface FAQItem {
  question: string
  answer: string
}

export interface CalculatorSchema {
  '@context': string
  '@graph': Array<WebApplicationSchema | FAQPageSchema>
}

interface WebApplicationSchema {
  '@type': 'WebApplication'
  name: string
  applicationCategory: string
  offers: {
    '@type': 'Offer'
    price: string
  }
  featureList: string[]
}

interface FAQPageSchema {
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
    '@graph': [
      // WebApplication Schema - consistent across all calculator pages
      {
        '@type': 'WebApplication',
        name: 'Website Kostenrechner',
        applicationCategory: 'BusinessApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
        },
        featureList: ['Preisvergleich', 'Transparente Kalkulation', '3-Wege-Vergleich'],
      },
      // FAQPage Schema - unique FAQ items per landing page
      {
        '@type': 'FAQPage',
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question' as const,
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer' as const,
            text: item.answer,
          },
        })),
      },
    ],
  }
}
