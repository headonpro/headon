/**
 * StatsSection Usage Examples
 *
 * This file demonstrates how to use the StatsSection component
 * for displaying key metrics with count-up animations.
 */

import StatsSection from './StatsSection'

// Example 1: Basic usage with default stats
export function BasicStatsExample() {
  return (
    <StatsSection
      stats={[
        { value: 50, label: 'Erfolgreiche Projekte', suffix: '+' },
        { value: 10, label: 'Jahre Erfahrung', suffix: '+' },
        { value: 4, label: 'Schnellere Ladezeiten', suffix: 'x' },
        { value: 100, label: 'Kundenzufriedenheit', suffix: '%' },
      ]}
    />
  )
}

// Example 2: Custom title and description
export function CustomizedStatsExample() {
  return (
    <StatsSection
      title="HEADON in Zahlen"
      description="Unsere Expertise spricht für sich – basierend auf über 50 erfolgreichen Projekten"
      stats={[
        { value: 50, label: 'Erfolgreiche Projekte', suffix: '+' },
        { value: 10, label: 'Jahre Erfahrung', suffix: '+' },
        { value: 4, label: 'Schnellere Ladezeiten', suffix: 'x' },
        { value: 100, label: 'Kundenzufriedenheit', suffix: '%' },
      ]}
    />
  )
}

// Example 3: With Schema.org structured data for AI search engines
export function StatsWithSchemaExample() {
  return (
    <StatsSection
      title="Unsere Expertise in Zahlen"
      description="Daten die für sich sprechen"
      includeSchema={true} // Adds Organization schema for AI search engines
      stats={[
        {
          value: 50,
          label: 'Erfolgreiche Projekte',
          suffix: '+',
          schemaProperty: 'numberOfProjects',
        },
        {
          value: 10,
          label: 'Jahre Erfahrung',
          suffix: '+',
          schemaProperty: 'yearsInOperation',
        },
        {
          value: 4,
          label: 'Schnellere Ladezeiten',
          suffix: 'x',
          schemaProperty: 'performanceImprovement',
        },
        {
          value: 100,
          label: 'Kundenzufriedenheit',
          suffix: '%',
          schemaProperty: 'customerSatisfaction',
        },
      ]}
    />
  )
}

// Example 4: Extended stats with more metrics
export function ExtendedStatsExample() {
  return (
    <StatsSection
      title="Warum HEADON.pro?"
      stats={[
        { value: 50, label: 'Erfolgreiche Projekte', suffix: '+' },
        { value: 10, label: 'Jahre Erfahrung', suffix: '+' },
        { value: 4, label: 'Schnellere Ladezeiten', suffix: 'x' },
        { value: 100, label: 'Kundenzufriedenheit', suffix: '%' },
        { value: 20, label: 'Aktive Kunden', suffix: '+' },
        { value: 95, label: 'Lighthouse Score', suffix: '+' },
      ]}
      className="bg-gray-900 text-white" // Custom styling
    />
  )
}

// Example 5: Minimal 2-column layout for mobile
export function MinimalStatsExample() {
  return (
    <StatsSection
      stats={[
        { value: 50, label: 'Projekte', suffix: '+' },
        { value: 10, label: 'Jahre', suffix: '+' },
      ]}
    />
  )
}

// Example 6: Stats with units instead of suffixes
export function StatsWithUnitsExample() {
  return (
    <StatsSection
      title="Performance Metrics"
      stats={[
        { value: 1.2, label: 'Durchschnittliche Ladezeit', unit: 's' },
        { value: 98, label: 'Lighthouse Performance', suffix: '/100' },
        { value: 99.9, label: 'Uptime', suffix: '%' },
        { value: 24, label: 'Support Verfügbarkeit', unit: 'h' },
      ]}
    />
  )
}

/**
 * Integration Example: Adding to Homepage
 *
 * ```tsx
 * // app/page.tsx
 * import StatsSection from '@/components/sections/StatsSection'
 *
 * export default function HomePage() {
 *   return (
 *     <>
 *       <HeroSection />
 *       <StatsSection
 *         title="HEADON in Zahlen"
 *         description="Unsere Expertise basiert auf Erfahrung"
 *         includeSchema={true}
 *         stats={[
 *           { value: 50, label: 'Erfolgreiche Projekte', suffix: '+' },
 *           { value: 10, label: 'Jahre Erfahrung', suffix: '+' },
 *           { value: 4, label: 'Schnellere Ladezeiten', suffix: 'x' },
 *           { value: 100, label: 'Kundenzufriedenheit', suffix: '%' }
 *         ]}
 *       />
 *       <ServicesSection />
 *     </>
 *   )
 * }
 * ```
 */

/**
 * SEO Benefits
 *
 * 1. **AI Search Optimization**: The component includes optional Schema.org structured data
 *    that helps AI search engines (ChatGPT, Perplexity, Google Bard) understand your
 *    company metrics.
 *
 * 2. **Performance**: Uses CSS transforms for smooth 60fps animations, minimal
 *    JavaScript overhead.
 *
 * 3. **Accessibility**: Semantic HTML, proper ARIA attributes, screen reader friendly.
 *
 * 4. **User Experience**: Count-up animations engage users and make numbers memorable,
 *    triggered only once per page load for performance.
 *
 * 5. **Mobile Optimized**: Responsive grid layout adapts from 1 column on mobile to
 *    4 columns on desktop.
 */

/**
 * Configuration Options
 *
 * @param stats - Array of Stat objects (required)
 *   - value: number | string - The numeric value to display
 *   - label: string - Description text below the number
 *   - suffix: string (optional) - Text after the number (e.g., "+", "x", "%")
 *   - unit: string (optional) - Unit text (e.g., "s", "h", "€")
 *   - schemaProperty: string (optional) - Property name for Schema.org
 *
 * @param title - Section heading (default: "Unsere Expertise in Zahlen")
 * @param description - Optional subheading text
 * @param includeSchema - Add Schema.org QuantitativeValue structured data (default: false)
 * @param className - Additional CSS classes for custom styling
 */
