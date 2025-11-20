/**
 * Calculator Engine - Core calculation logic for cost estimation
 *
 * This module implements pure functions for calculating project costs,
 * durations, and 3-way provider comparisons (Freelancer vs Agency vs HEADON).
 *
 * All functions are pure (no side effects) and handle edge cases gracefully.
 */

import type {
  CalculatorState,
  PriceRange,
  DurationRange,
  ProviderEstimate,
  ComparisonResult,
  BreakdownCategory,
  BreakdownItem,
} from './types'

import {
  getBasePrice,
  getDesignMultiplier,
  getPageCost,
  getResponsivenessMultiplier,
  getUXCost,
  getFeatureCost,
  getQualityCost,
  getTimelineMultiplier,
  getSupportCost,
  getTrainingCost,
  CMS_COSTS,
  AUTH_COSTS,
  DATABASE_COSTS,
  PAYMENT_COSTS,
  API_COSTS,
  OTHER_FEATURE_COSTS,
  DSGVO_COST,
} from './pricing-config'

// ============================================================================
// HEADON Price Calculation
// ============================================================================

/**
 * Calculate HEADON's price estimate based on all calculator inputs
 *
 * Formula:
 * Base Price (project type)
 * × Design Multiplier
 * × Responsiveness Multiplier
 * × Timeline Multiplier
 * + Page Costs
 * + UX Complexity Cost
 * + Feature Costs
 * + Quality Costs
 * + Support & Services
 */
export function calculateHeadonPrice(state: CalculatorState): PriceRange {
  try {
    // 1. Get base price for project type
    const basePrice = getBasePrice(state.projectType)

    // 2. Apply design multiplier
    const designMultiplier = getDesignMultiplier(state.design.level)

    // 3. Apply responsiveness multiplier
    const responsivenessMultiplier = getResponsivenessMultiplier(
      state.design.responsiveness
    )

    // 4. Apply timeline multiplier
    const timelineMultiplier = getTimelineMultiplier(state.timeline.projectStart)

    // 5. Calculate base with multipliers
    const baseWithMultipliers = {
      min: basePrice.min * designMultiplier * responsivenessMultiplier * timelineMultiplier,
      max: basePrice.max * designMultiplier * responsivenessMultiplier * timelineMultiplier,
      avg:
        basePrice.avg * designMultiplier * responsivenessMultiplier * timelineMultiplier,
    }

    // 6. Add page costs
    const pageCost = getPageCost(state.design.pageRange)

    // 7. Add UX complexity cost
    const uxCost = getUXCost(state.design.uxComplexity)

    // 8. Calculate feature costs
    const featureCosts = calculateFeatureCosts(state)

    // 9. Calculate quality costs
    const qualityCosts = calculateQualityCosts(state)

    // 10. Calculate support & services costs
    const supportCosts = calculateSupportCosts(state)

    // 11. Sum all costs
    const totalAdditionalCosts =
      pageCost + uxCost + featureCosts + qualityCosts + supportCosts

    // 12. Final price range
    const finalPrice = {
      min: Math.round(baseWithMultipliers.min + totalAdditionalCosts * 0.8),
      max: Math.round(baseWithMultipliers.max + totalAdditionalCosts * 1.2),
      avg: Math.round(baseWithMultipliers.avg + totalAdditionalCosts),
    }

    return finalPrice
  } catch (error) {
    console.error('Error calculating HEADON price:', error)
    // Fallback to safe default
    return { min: 5000, max: 15000, avg: 10000 }
  }
}

/**
 * Calculate total costs from selected features
 */
function calculateFeatureCosts(state: CalculatorState): number {
  const { features } = state
  let total = 0

  // CMS
  if (features.cms && features.cmsType) {
    total += getFeatureCost({ name: 'cms', type: features.cmsType })
  }

  // Authentication
  if (features.auth) {
    total += AUTH_COSTS.basic
    if (features.auth2FA) {
      total += AUTH_COSTS.with2FA - AUTH_COSTS.basic
    }
    if (features.authSocial) {
      total += AUTH_COSTS.withSocial - AUTH_COSTS.basic
    }
  }

  // Database
  if (features.database && features.databaseComplexity) {
    total += getFeatureCost({ name: 'database', type: features.databaseComplexity })
  }

  // Payment
  if (features.payment && features.paymentProvider) {
    total += getFeatureCost({ name: 'payment', type: features.paymentProvider })
  }

  // API
  if (features.api && features.apiType) {
    total += getFeatureCost({ name: 'api', type: features.apiType })
  }

  // Third-party integrations
  if (features.thirdPartyIntegrations) {
    const count = features.integrationsCount || 1
    total += getFeatureCost({ name: 'thirdPartyIntegrations', count })
  }

  // File uploads
  if (features.fileUploads) {
    total += OTHER_FEATURE_COSTS.fileUploads
  }

  // i18n
  if (features.i18n) {
    const languages = features.i18nLanguages || 2
    total += getFeatureCost({ name: 'i18n', count: languages })
  }

  // Admin dashboard
  if (features.adminDashboard) {
    total += OTHER_FEATURE_COSTS.adminDashboard
  }

  // Real-time features
  if (features.realtime) {
    total += OTHER_FEATURE_COSTS.realtime
  }

  return total
}

/**
 * Calculate total costs from quality selections
 */
function calculateQualityCosts(state: CalculatorState): number {
  const { quality } = state
  let total = 0

  // SEO
  total += getQualityCost({ aspect: 'seo', level: quality.seo })

  // Performance
  total += getQualityCost({ aspect: 'performance', level: quality.performance })

  // Security
  total += getQualityCost({ aspect: 'security', level: quality.security })

  // DSGVO
  if (quality.dsgvo) {
    total += DSGVO_COST
  }

  // Testing
  total += getQualityCost({ aspect: 'testing', level: quality.testing })

  // Accessibility
  total += getQualityCost({ aspect: 'accessibility', level: quality.accessibility })

  return total
}

/**
 * Calculate costs from timeline & support selections
 */
function calculateSupportCosts(state: CalculatorState): number {
  const { timeline } = state
  let total = 0

  // Support duration (one-time)
  total += getSupportCost(timeline.support)

  // Training (one-time)
  total += getTrainingCost(timeline.training)

  // Note: Hosting and maintenance are recurring costs,
  // not included in one-time project cost

  return total
}

// ============================================================================
// Freelancer Price Calculation
// ============================================================================

/**
 * Calculate Freelancer estimate based on HEADON price
 *
 * Freelancer characteristics:
 * - 60-70% of HEADON price (cheaper)
 * - Slower delivery (1.8-2.2x duration - no AI tools, single person)
 * - Lower quality rating (3/5)
 * - Less features included
 */
export function calculateFreelancerPrice(
  headonPrice: PriceRange,
  state: CalculatorState
): ProviderEstimate {
  try {
    // Freelancers are typically 60-70% of HEADON price
    const multiplier = 0.65

    const price: PriceRange = {
      min: Math.round(headonPrice.min * multiplier * 0.85),
      max: Math.round(headonPrice.max * multiplier * 1.15),
      avg: Math.round(headonPrice.avg * multiplier),
    }

    const duration = calculateDuration(state)
    // Freelancers are ~2x slower (no AI efficiency, working alone, limited availability)
    const freelancerDuration: DurationRange = {
      min: Math.round(duration.min * 1.8),
      max: Math.round(duration.max * 2.2),
    }

    return {
      provider: 'freelancer',
      price,
      duration: freelancerDuration,
      quality: 3,
      pros: [
        'Günstigster Preis',
        'Direkte Kommunikation',
        'Flexibel und agil',
        'Persönliche Betreuung',
      ],
      cons: [
        'Längere Projektlaufzeit',
        'Begrenzte Verfügbarkeit',
        'Kein Team-Support',
        'Risiko bei Ausfall',
        'Weniger Qualitätssicherung',
      ],
      included: [
        'Basis-Entwicklung',
        'Standard-Design',
        'Code-Dokumentation',
      ],
      excluded: [
        'Wartung & Support',
        'Qualitätssicherung',
        'Team-Backup',
        'Projektmanagement',
        'Skalierbarkeit',
      ],
    }
  } catch (error) {
    console.error('Error calculating freelancer price:', error)
    return getDefaultProviderEstimate('freelancer')
  }
}

// ============================================================================
// Agency Price Calculation
// ============================================================================

/**
 * Calculate traditional Agency estimate based on HEADON price
 *
 * Agency characteristics:
 * - 1.6-1.8x of HEADON price (more expensive)
 * - MUCH slower delivery (3-4x duration - HEADON is 4x faster claim)
 * - Highest quality rating (5/5)
 * - All features included but with overhead
 */
export function calculateAgencyPrice(
  headonPrice: PriceRange,
  state: CalculatorState
): ProviderEstimate {
  try {
    // Traditional agencies are typically 1.6-1.8x of HEADON price
    const multiplier = 1.7

    const price: PriceRange = {
      min: Math.round(headonPrice.min * multiplier * 0.9),
      max: Math.round(headonPrice.max * multiplier * 1.1),
      avg: Math.round(headonPrice.avg * multiplier),
    }

    const duration = calculateDuration(state)
    // Agencies are 3-3.5x slower (traditional processes, meetings, overhead, no AI)
    // This matches our "4x schneller" marketing claim while staying realistic
    const agencyDuration: DurationRange = {
      min: Math.round(duration.min * 3),
      max: Math.round(duration.max * 3.5),
    }

    return {
      provider: 'agency',
      price,
      duration: agencyDuration,
      quality: 5,
      pros: [
        'Vollständiger Service',
        'Große Teams verfügbar',
        'Etablierte Prozesse',
        'Umfangreiche Erfahrung',
        'Langfristige Betreuung',
      ],
      cons: [
        'Höchster Preis',
        'Längere Entscheidungswege',
        'Overhead & Bürokratie',
        'Weniger Flexibilität',
        'Längere Projektlaufzeit',
      ],
      included: [
        'Full-Service Entwicklung',
        'Projektmanagement',
        'Qualitätssicherung',
        'Design & Konzeption',
        'Wartung & Support',
        'Team-Backup',
      ],
      excluded: [],
    }
  } catch (error) {
    console.error('Error calculating agency price:', error)
    return getDefaultProviderEstimate('agency')
  }
}

// ============================================================================
// HEADON Provider Estimate
// ============================================================================

/**
 * Create HEADON's provider estimate with all details
 */
export function calculateHeadonEstimate(state: CalculatorState): ProviderEstimate {
  try {
    const price = calculateHeadonPrice(state)
    const duration = calculateDuration(state)

    return {
      provider: 'headon',
      price,
      duration,
      quality: 5,
      pros: [
        'Optimales Preis-Leistungs-Verhältnis',
        'KI-gestützte Entwicklung',
        '4x schnellere Umsetzung',
        '40% günstiger als Agenturen',
        'Höchste Code-Qualität',
        'Agile Entwicklung',
      ],
      cons: [
        'Begrenzte Anzahl parallel laufender Projekte',
      ],
      included: [
        'Full-Stack Entwicklung',
        'Modernes UI/UX Design',
        'Mobile-first Ansatz',
        'Performance-Optimierung',
        'SEO-Grundlagen',
        'Code-Dokumentation',
        'Deployment & Hosting-Setup',
        '3 Monate Support',
      ],
      excluded: [
        'Ongoing Marketing',
        'Content-Erstellung',
        'Print-Design',
      ],
    }
  } catch (error) {
    console.error('Error calculating HEADON estimate:', error)
    return getDefaultProviderEstimate('headon')
  }
}

// ============================================================================
// Duration Calculation
// ============================================================================

/**
 * Calculate project duration in weeks based on complexity
 *
 * HEADON is 4x faster than traditional agencies thanks to AI-assisted development.
 * Base duration reflects realistic HEADON delivery times (victoria-wertheim.de: 10 days).
 *
 * Base duration determined by:
 * - Project type (adjusted for AI-assisted development)
 * - Number of features (capped to prevent unrealistic estimates)
 * - Page/screen count (moderate impact)
 * - Quality requirements (minimal impact due to efficient processes)
 */
export function calculateDuration(state: CalculatorState): DurationRange {
  try {
    // Base duration by project type (HEADON's AI-assisted delivery times)
    // Based on real delivery: victoria-wertheim.de (enterprise site) in 10 days
    const baseDurations: Record<string, DurationRange> = {
      'website-simple': { min: 1, max: 2 },      // 1-2 weeks (simple landing pages)
      'website-complex': { min: 2, max: 4 },     // 2-4 weeks (corporate sites like victoria-wertheim.de)
      'web-app': { min: 3, max: 6 },             // 3-6 weeks (interactive web apps)
      'mobile-app': { min: 4, max: 8 },          // 4-8 weeks (native mobile apps)
      ecommerce: { min: 4, max: 8 },             // 4-8 weeks (online shops with payment)
      custom: { min: 4, max: 10 },               // 4-10 weeks (complex custom solutions)
      unsure: { min: 2, max: 6 },                // 2-6 weeks (average case)
    }

    const baseDuration = baseDurations[state.projectType] || { min: 2, max: 4 }

    // Count enabled features
    const featureCount = Object.values(state.features).filter((v) => v === true).length

    // Duration modifiers (reduced impact due to AI efficiency)
    const pageMultiplier =
      state.design.pageRange === '30+' ? 1.3 : state.design.pageRange === '16-30' ? 1.2 : state.design.pageRange === '6-15' ? 1.1 : 1.0

    const designMultiplier = state.design.level === 'premium' ? 1.2 : state.design.level === 'custom' ? 1.1 : 1.0

    // Features: Reduced impact (+3% per feature, capped at +30% for 10 features)
    const featureMultiplier = 1 + Math.min(featureCount * 0.03, 0.3)

    const qualityMultiplier =
      state.quality.testing === 'qa-process'
        ? 1.15
        : state.quality.testing === 'e2e'
          ? 1.1
          : state.quality.testing === 'unit'
            ? 1.05
            : 1.0

    // Apply multipliers with realistic cap (max 1.8x to prevent unrealistic durations)
    const combinedMultiplier = pageMultiplier * designMultiplier * featureMultiplier * qualityMultiplier

    // Timeline urgency doesn't affect duration (we deliver fast regardless)
    // Flexible projects get small discount as we can optimize scheduling
    const timelineAdjustment =
      state.timeline.projectStart === 'flexible' ? 1.05 : 1.0

    // IMPORTANT: Apply timeline adjustment BEFORE capping to prevent bypass
    const totalMultiplier = Math.min(combinedMultiplier * timelineAdjustment, 1.8)

    return {
      min: Math.max(1, Math.round(baseDuration.min * totalMultiplier)),
      max: Math.round(baseDuration.max * totalMultiplier),
    }
  } catch (error) {
    console.error('Error calculating duration:', error)
    return { min: 2, max: 4 }
  }
}

// ============================================================================
// Cost Breakdown
// ============================================================================

/**
 * Generate detailed cost breakdown by category
 */
export function calculateBreakdown(state: CalculatorState): BreakdownCategory[] {
  try {
    const categories: BreakdownCategory[] = []

    // 1. Project Base Category (with all multipliers applied)
    const basePrice = getBasePrice(state.projectType)
    const designMultiplier = getDesignMultiplier(state.design.level)
    const responsivenessMultiplier = getResponsivenessMultiplier(
      state.design.responsiveness
    )
    const timelineMultiplier = getTimelineMultiplier(state.timeline.projectStart)

    // Calculate base with all multipliers applied (matches actual calculation)
    const baseWithMultipliers = basePrice.avg * designMultiplier * responsivenessMultiplier * timelineMultiplier

    const baseItems: BreakdownItem[] = [
      {
        label: `Basis-Projekt (${state.projectType})`,
        value: basePrice.avg,
      },
    ]

    // Only show multiplier effects if they differ from 1.0
    if (designMultiplier !== 1.0) {
      baseItems.push({
        label: `Design-Aufschlag (${state.design.level})`,
        value: basePrice.avg * (designMultiplier - 1),
      })
    }

    if (responsivenessMultiplier !== 1.0) {
      baseItems.push({
        label: `Responsiveness-Aufschlag (${state.design.responsiveness})`,
        value: basePrice.avg * designMultiplier * (responsivenessMultiplier - 1),
      })
    }

    if (timelineMultiplier !== 1.0) {
      baseItems.push({
        label: state.timeline.projectStart === 'urgent' ? 'Express-Zuschlag (urgent)' : 'Flexibler Termin (Rabatt)',
        value: basePrice.avg * designMultiplier * responsivenessMultiplier * (timelineMultiplier - 1),
      })
    }

    const baseSubtotal = baseWithMultipliers
    categories.push({
      category: 'Projekt-Basis',
      items: baseItems,
      subtotal: baseSubtotal,
    })

    // 2. Scope & Pages Category
    const scopeItems: BreakdownItem[] = []

    const pageCost = getPageCost(state.design.pageRange)
    if (pageCost > 0) {
      scopeItems.push({
        label: `Seiten (${state.design.pageRange})`,
        value: pageCost,
      })
    }

    const uxCost = getUXCost(state.design.uxComplexity)
    if (uxCost > 0) {
      scopeItems.push({
        label: `UX-Komplexität (${state.design.uxComplexity})`,
        value: uxCost,
      })
    }

    if (scopeItems.length > 0) {
      const scopeSubtotal = scopeItems.reduce((sum, item) => sum + item.value, 0)
      categories.push({
        category: 'Umfang & Seiten',
        items: scopeItems,
        subtotal: scopeSubtotal,
      })
    }

    // 3. Features Category
    const featureItems: BreakdownItem[] = []
    const { features } = state

    if (features.cms && features.cmsType) {
      featureItems.push({
        label: `CMS (${features.cmsType})`,
        value: CMS_COSTS[features.cmsType],
      })
    }

    if (features.auth) {
      let authCost = AUTH_COSTS.basic
      let authLabel = 'Authentifizierung'

      if (features.auth2FA && features.authSocial) {
        authCost = AUTH_COSTS.full
        authLabel += ' (mit 2FA & Social Login)'
      } else if (features.auth2FA) {
        authCost = AUTH_COSTS.with2FA
        authLabel += ' (mit 2FA)'
      } else if (features.authSocial) {
        authCost = AUTH_COSTS.withSocial
        authLabel += ' (mit Social Login)'
      }

      featureItems.push({ label: authLabel, value: authCost })
    }

    if (features.database && features.databaseComplexity) {
      featureItems.push({
        label: `Datenbank (${features.databaseComplexity})`,
        value: DATABASE_COSTS[features.databaseComplexity],
      })
    }

    if (features.payment && features.paymentProvider) {
      featureItems.push({
        label: `Payment (${features.paymentProvider})`,
        value: PAYMENT_COSTS[features.paymentProvider],
      })
    }

    if (features.api && features.apiType) {
      featureItems.push({
        label: `API (${features.apiType})`,
        value: API_COSTS[features.apiType],
      })
    }

    if (features.thirdPartyIntegrations) {
      const count = features.integrationsCount || 1
      featureItems.push({
        label: `Drittanbieter-Integrationen (${count})`,
        value: getFeatureCost({ name: 'thirdPartyIntegrations', count }),
      })
    }

    if (features.fileUploads) {
      featureItems.push({
        label: 'File Uploads',
        value: OTHER_FEATURE_COSTS.fileUploads,
      })
    }

    if (features.i18n) {
      const languages = features.i18nLanguages || 2
      featureItems.push({
        label: `Mehrsprachigkeit (${languages} Sprachen)`,
        value: getFeatureCost({ name: 'i18n', count: languages }),
      })
    }

    if (features.adminDashboard) {
      featureItems.push({
        label: 'Admin-Dashboard',
        value: OTHER_FEATURE_COSTS.adminDashboard,
      })
    }

    if (features.realtime) {
      featureItems.push({
        label: 'Real-time Features',
        value: OTHER_FEATURE_COSTS.realtime,
      })
    }

    if (featureItems.length > 0) {
      const featureSubtotal = featureItems.reduce((sum, item) => sum + item.value, 0)
      categories.push({
        category: 'Funktionalitäten',
        items: featureItems,
        subtotal: featureSubtotal,
      })
    }

    // 4. Quality & Performance Category
    const qualityItems: BreakdownItem[] = []
    const { quality } = state

    if (quality.seo !== 'none') {
      qualityItems.push({
        label: `SEO (${quality.seo})`,
        value: getQualityCost({ aspect: 'seo', level: quality.seo }),
      })
    }

    if (quality.performance !== 'standard') {
      qualityItems.push({
        label: `Performance (${quality.performance})`,
        value: getQualityCost({ aspect: 'performance', level: quality.performance }),
      })
    }

    if (quality.security !== 'ssl-only') {
      qualityItems.push({
        label: `Security (${quality.security})`,
        value: getQualityCost({ aspect: 'security', level: quality.security }),
      })
    }

    if (quality.dsgvo) {
      qualityItems.push({
        label: 'DSGVO-Compliance',
        value: DSGVO_COST,
      })
    }

    if (quality.testing !== 'none') {
      qualityItems.push({
        label: `Testing (${quality.testing})`,
        value: getQualityCost({ aspect: 'testing', level: quality.testing }),
      })
    }

    if (quality.accessibility !== 'none') {
      qualityItems.push({
        label: `Barrierefreiheit (${quality.accessibility})`,
        value: getQualityCost({ aspect: 'accessibility', level: quality.accessibility }),
      })
    }

    if (qualityItems.length > 0) {
      const qualitySubtotal = qualityItems.reduce((sum, item) => sum + item.value, 0)
      categories.push({
        category: 'Qualität & Performance',
        items: qualityItems,
        subtotal: qualitySubtotal,
      })
    }

    // 5. Support & Services Category
    const supportItems: BreakdownItem[] = []

    // Note: Urgency multiplier is already applied in Project Base category above
    // Don't add it again here to avoid double-charging

    if (state.timeline.support !== 'none') {
      supportItems.push({
        label: `Support (${state.timeline.support})`,
        value: getSupportCost(state.timeline.support),
      })
    }

    if (state.timeline.training) {
      supportItems.push({
        label: 'Training',
        value: getTrainingCost(state.timeline.training),
      })
    }

    if (supportItems.length > 0) {
      const supportSubtotal = supportItems.reduce((sum, item) => sum + item.value, 0)
      categories.push({
        category: 'Support & Services',
        items: supportItems,
        subtotal: supportSubtotal,
      })
    }

    return categories
  } catch (error) {
    console.error('Error calculating breakdown:', error)
    return []
  }
}

// ============================================================================
// Main Comparison Function
// ============================================================================

/**
 * Calculate complete 3-way comparison with savings
 *
 * This is the main export used by components
 */
export function calculateComparison(state: CalculatorState): ComparisonResult {
  try {
    // Calculate all three estimates
    const headon = calculateHeadonEstimate(state)
    const headonPrice = headon.price

    const freelancer = calculateFreelancerPrice(headonPrice, state)
    const agency = calculateAgencyPrice(headonPrice, state)

    // Calculate savings
    const freelancerDurationAvg = Math.round((freelancer.duration.min + freelancer.duration.max) / 2)
    const agencyDurationAvg = Math.round((agency.duration.min + agency.duration.max) / 2)
    const headonDurationAvg = Math.round((headon.duration.min + headon.duration.max) / 2)

    const savings = {
      vsFreelancer: {
        price: Math.round(freelancer.price.avg - headon.price.avg),
        time: freelancerDurationAvg - headonDurationAvg,
      },
      vsAgency: {
        price: Math.round(agency.price.avg - headon.price.avg),
        time: agencyDurationAvg - headonDurationAvg,
      },
    }

    return {
      freelancer,
      agency,
      headon,
      savings,
    }
  } catch (error) {
    console.error('Error calculating comparison:', error)
    // Return safe fallback
    return {
      freelancer: getDefaultProviderEstimate('freelancer'),
      agency: getDefaultProviderEstimate('agency'),
      headon: getDefaultProviderEstimate('headon'),
      savings: {
        vsFreelancer: { price: 0, time: 0 },
        vsAgency: { price: 0, time: 0 },
      },
    }
  }
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get safe default estimate for a provider (fallback)
 */
function getDefaultProviderEstimate(
  provider: 'freelancer' | 'agency' | 'headon'
): ProviderEstimate {
  const defaults = {
    freelancer: {
      price: { min: 5000, max: 12000, avg: 8000 },
      duration: { min: 4, max: 9 },      // ~2x slower than HEADON
      quality: 3 as const,
    },
    agency: {
      price: { min: 18000, max: 35000, avg: 25000 },
      duration: { min: 12, max: 20 },    // 4x slower than HEADON
      quality: 5 as const,
    },
    headon: {
      price: { min: 10000, max: 20000, avg: 15000 },
      duration: { min: 3, max: 5 },      // Fast AI-assisted delivery
      quality: 5 as const,
    },
  }

  const base = defaults[provider]

  return {
    provider,
    price: base.price,
    duration: base.duration,
    quality: base.quality,
    pros: [],
    cons: [],
    included: [],
    excluded: [],
  }
}
