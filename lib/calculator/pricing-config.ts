/**
 * Pricing Configuration for Cost Calculator
 *
 * This file contains all pricing data, multipliers, and cost calculations
 * used by the calculator engine. All prices are in EUR.
 *
 * Pricing follows the HEADON positioning: Modern, fair, and transparent
 * - 40% cheaper than traditional agencies
 * - Higher quality than freelancers
 * - Faster delivery than both
 */

import type {
  ProjectType,
  DesignLevel,
  PageRange,
  ResponsivenessLevel,
  UXComplexity,
  CMSType,
  DatabaseComplexity,
  PaymentProvider,
  APIType,
  SEOLevel,
  PerformanceLevel,
  SecurityLevel,
  TestingLevel,
  AccessibilityLevel,
  ProjectStart,
  MaintenanceLevel,
  SupportDuration,
  PriceRange,
} from './types'

// ============================================================================
// BASE PRICES (Project Type)
// ============================================================================

/**
 * Base price ranges for each project type
 * These are the starting points before multipliers and features
 * Adjusted to reflect realistic German market prices (2025)
 *
 * Research sources (Jan 2025):
 * - Simple websites: 1.500-6.000€ (avg: 3.000€)
 * - Corporate websites: 5.000-12.000€ (avg: 8.000€)
 * - Web apps: 8.000-20.000€ (avg: 15.000€)
 * - Mobile apps (basic): 15.000-40.000€ (avg: 25.000€)
 * - E-commerce: 8.000-25.000€ (avg: 15.000€)
 */
export const BASE_PRICES: Record<ProjectType, PriceRange> = {
  'website-simple': {
    min: 1500,
    max: 5000,
    avg: 3000,
  },
  'website-complex': {
    min: 5000,
    max: 12000,
    avg: 8000,
  },
  'web-app': {
    min: 8000,
    max: 30000,
    avg: 15000,
  },
  'mobile-app': {
    min: 15000,
    max: 50000,
    avg: 25000,
  },
  'ecommerce': {
    min: 8000,
    max: 25000,
    avg: 15000,
  },
  'custom': {
    min: 15000,
    max: 80000,
    avg: 40000,
  },
  'unsure': {
    min: 3000,
    max: 20000,
    avg: 10000,
  },
}

// ============================================================================
// DESIGN MULTIPLIERS
// ============================================================================

/**
 * Design quality level multipliers (reduced for realistic pricing)
 * - template: Basic template-based design (1.0x - no increase)
 * - custom: Custom design tailored to brand (1.3x)
 * - premium: High-end custom design with detailed UX work (1.6x)
 */
export const DESIGN_MULTIPLIERS: Record<DesignLevel, number> = {
  template: 1.0,
  custom: 1.3,
  premium: 1.6,
}

// ============================================================================
// PAGE COSTS (Additional cost per page range)
// ============================================================================

/**
 * Additional costs based on number of pages (reduced for realistic pricing)
 * Higher page counts require more design, development, and content work
 */
export const PAGE_COSTS: Record<PageRange, number> = {
  '1-5': 0,        // Base price includes 1-5 pages
  '6-15': 1000,    // +1k for medium sites (~100€ per additional page)
  '16-30': 2500,   // +2.5k for large sites
  '30+': 5000,     // +5k for very large sites
}

// ============================================================================
// RESPONSIVENESS MULTIPLIERS
// ============================================================================

/**
 * Responsiveness level multipliers (reduced for realistic pricing)
 * - desktop-only: Single breakpoint (0.85x - small discount)
 * - responsive: Full responsive design (1.0x - standard)
 * - pwa: Progressive Web App with offline support (1.2x)
 */
export const RESPONSIVENESS_MULTIPLIERS: Record<ResponsivenessLevel, number> = {
  'desktop-only': 0.85,
  responsive: 1.0,
  pwa: 1.2,
}

// ============================================================================
// UX COMPLEXITY COSTS
// ============================================================================

/**
 * Additional costs for UX complexity levels (reduced for realistic pricing)
 */
export const UX_COMPLEXITY_COSTS: Record<UXComplexity, number> = {
  standard: 0,       // Basic UX patterns
  advanced: 1500,    // Advanced interactions, animations
  premium: 3500,     // Complex user flows, extensive testing
}

// ============================================================================
// FEATURE COSTS
// ============================================================================

/**
 * CMS (Content Management System) costs by type (reduced for realistic pricing)
 */
export const CMS_COSTS: Record<CMSType, number> = {
  strapi: 1200,      // Headless CMS integration
  sanity: 1500,      // Sanity.io integration
  custom: 3000,      // Custom-built CMS
}

/**
 * Authentication feature costs (reduced for realistic pricing)
 */
export const AUTH_COSTS = {
  basic: 800,        // Email/password authentication
  with2FA: 1200,     // + Two-factor authentication
  withSocial: 1500,  // + Social login (Google, Facebook, etc.)
  full: 1800,        // All auth features combined
}

/**
 * Database complexity costs
 */
export const DATABASE_COSTS: Record<DatabaseComplexity, number> = {
  simple: 800,       // Basic CRUD operations, 5-10 tables
  complex: 2500,     // Advanced queries, relationships, 10+ tables
}

/**
 * Payment integration costs by provider
 */
export const PAYMENT_COSTS: Record<PaymentProvider, number> = {
  stripe: 1500,      // Stripe integration
  paypal: 1300,      // PayPal integration
  mollie: 1600,      // Mollie integration (EU-focused)
}

/**
 * API development costs by type (reduced for realistic pricing)
 */
export const API_COSTS: Record<APIType, number> = {
  rest: 1200,        // RESTful API
  graphql: 1800,     // GraphQL API (more complex)
}

/**
 * Other feature costs (reduced for realistic pricing)
 */
export const OTHER_FEATURE_COSTS = {
  thirdPartyIntegrations: 800,     // Base cost per integration
  perIntegration: 400,              // Additional cost per extra integration
  fileUploads: 700,                 // File upload functionality
  i18n: 1200,                       // Internationalization base
  perLanguage: 300,                 // Cost per additional language
  adminDashboard: 2000,             // Admin panel/dashboard
  realtime: 1500,                   // Real-time features (WebSockets, etc.)
}

// ============================================================================
// QUALITY & PERFORMANCE COSTS
// ============================================================================

/**
 * SEO optimization costs by level (reduced for realistic pricing)
 */
export const SEO_COSTS: Record<SEOLevel, number> = {
  none: 0,
  basic: 400,        // Meta tags, sitemap, robots.txt
  advanced: 1000,    // + Schema.org, OG tags, analytics
  enterprise: 2500,  // + Advanced SEO audit, ongoing optimization
}

/**
 * Performance optimization costs by level (reduced for realistic pricing)
 */
export const PERFORMANCE_COSTS: Record<PerformanceLevel, number> = {
  standard: 0,       // Standard Next.js optimizations
  optimized: 700,    // + Image optimization, code splitting, caching
  premium: 1500,     // + CDN, advanced caching, performance monitoring
}

/**
 * Security implementation costs by level (reduced for realistic pricing)
 */
export const SECURITY_COSTS: Record<SecurityLevel, number> = {
  'ssl-only': 0,     // Basic SSL/HTTPS (standard)
  advanced: 1000,    // + Security headers, CSRF protection, input validation
  'penetration-testing': 2500,  // + Professional security audit
}

/**
 * Testing costs by level (reduced for realistic pricing)
 */
export const TESTING_COSTS: Record<TestingLevel, number> = {
  none: 0,
  unit: 700,         // Unit tests for critical functions
  e2e: 1500,         // + End-to-end tests
  'qa-process': 3000, // + Full QA process with manual testing
}

/**
 * Accessibility implementation costs by level (reduced for realistic pricing)
 */
export const ACCESSIBILITY_COSTS: Record<AccessibilityLevel, number> = {
  none: 0,
  'wcag-aa': 700,    // WCAG AA compliance
  'wcag-aaa': 1800,  // WCAG AAA compliance (stricter)
}

/**
 * DSGVO/GDPR compliance cost (reduced for realistic pricing)
 */
export const DSGVO_COST = 500

// ============================================================================
// TIMELINE & SUPPORT COSTS
// ============================================================================

/**
 * Project start urgency multipliers (reduced for realistic pricing)
 */
export const TIMELINE_MULTIPLIERS: Record<ProjectStart, number> = {
  flexible: 0.95,    // 5% discount for flexible timeline
  normal: 1.0,       // Standard timeline
  urgent: 1.2,       // 20% premium for urgent delivery
}

/**
 * Ongoing maintenance costs (monthly)
 */
export const MAINTENANCE_COSTS: Record<MaintenanceLevel, number> = {
  none: 0,
  basic: 150,        // Monthly: Bug fixes, minor updates
  premium: 350,      // Monthly: + Feature updates, priority support
}

/**
 * Post-launch support costs (one-time)
 */
export const SUPPORT_COSTS: Record<SupportDuration, number> = {
  none: 0,
  '3-months': 800,   // 3 months of support included
  '6-months': 1400,  // 6 months of support
  '12-months': 2400, // 12 months of support
}

/**
 * Additional service costs
 */
export const ADDITIONAL_COSTS = {
  hosting: 50,       // Monthly hosting management fee
  training: 800,     // One-time training session cost
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get base price for a project type
 */
export function getBasePrice(projectType: ProjectType): PriceRange {
  return BASE_PRICES[projectType]
}

/**
 * Get design quality multiplier
 */
export function getDesignMultiplier(designLevel: DesignLevel): number {
  return DESIGN_MULTIPLIERS[designLevel]
}

/**
 * Get page range cost
 */
export function getPageCost(pageRange: PageRange): number {
  return PAGE_COSTS[pageRange]
}

/**
 * Get responsiveness multiplier
 */
export function getResponsivenessMultiplier(
  responsiveness: ResponsivenessLevel
): number {
  return RESPONSIVENESS_MULTIPLIERS[responsiveness]
}

/**
 * Get UX complexity cost
 */
export function getUXCost(uxComplexity: UXComplexity): number {
  return UX_COMPLEXITY_COSTS[uxComplexity]
}

/**
 * Calculate total feature costs based on selected features
 */
export function getFeatureCost(feature: {
  name: string
  type?: CMSType | DatabaseComplexity | PaymentProvider | APIType
  count?: number
}): number {
  const { name, type, count } = feature

  switch (name) {
    case 'cms':
      return type ? CMS_COSTS[type as CMSType] : 0

    case 'auth':
      // Auth cost depends on additional options
      return AUTH_COSTS.basic

    case 'auth2FA':
      return AUTH_COSTS.with2FA - AUTH_COSTS.basic

    case 'authSocial':
      return AUTH_COSTS.withSocial - AUTH_COSTS.basic

    case 'database':
      return type ? DATABASE_COSTS[type as DatabaseComplexity] : 0

    case 'payment':
      return type ? PAYMENT_COSTS[type as PaymentProvider] : 0

    case 'api':
      return type ? API_COSTS[type as APIType] : 0

    case 'thirdPartyIntegrations':
      const baseIntegration = OTHER_FEATURE_COSTS.thirdPartyIntegrations
      const additionalIntegrations = count
        ? (count - 1) * OTHER_FEATURE_COSTS.perIntegration
        : 0
      return baseIntegration + additionalIntegrations

    case 'fileUploads':
      return OTHER_FEATURE_COSTS.fileUploads

    case 'i18n':
      const baseI18n = OTHER_FEATURE_COSTS.i18n
      const additionalLanguages = count
        ? (count - 1) * OTHER_FEATURE_COSTS.perLanguage
        : 0
      return baseI18n + additionalLanguages

    case 'adminDashboard':
      return OTHER_FEATURE_COSTS.adminDashboard

    case 'realtime':
      return OTHER_FEATURE_COSTS.realtime

    default:
      return 0
  }
}

/**
 * Get quality-related cost for a specific quality aspect
 */
export function getQualityCost(quality: {
  aspect: string
  level: SEOLevel | PerformanceLevel | SecurityLevel | TestingLevel | AccessibilityLevel
}): number {
  const { aspect, level } = quality

  switch (aspect) {
    case 'seo':
      return SEO_COSTS[level as SEOLevel]

    case 'performance':
      return PERFORMANCE_COSTS[level as PerformanceLevel]

    case 'security':
      return SECURITY_COSTS[level as SecurityLevel]

    case 'testing':
      return TESTING_COSTS[level as TestingLevel]

    case 'accessibility':
      return ACCESSIBILITY_COSTS[level as AccessibilityLevel]

    case 'dsgvo':
      return DSGVO_COST

    default:
      return 0
  }
}

/**
 * Get timeline multiplier
 */
export function getTimelineMultiplier(projectStart: ProjectStart): number {
  return TIMELINE_MULTIPLIERS[projectStart]
}

/**
 * Get maintenance cost (monthly recurring)
 */
export function getMaintenanceCost(maintenanceLevel: MaintenanceLevel): number {
  return MAINTENANCE_COSTS[maintenanceLevel]
}

/**
 * Get support cost (one-time)
 */
export function getSupportCost(supportDuration: SupportDuration): number {
  return SUPPORT_COSTS[supportDuration]
}

/**
 * Get hosting cost (monthly recurring)
 */
export function getHostingCost(hosting: boolean): number {
  return hosting ? ADDITIONAL_COSTS.hosting : 0
}

/**
 * Get training cost (one-time)
 */
export function getTrainingCost(training: boolean): number {
  return training ? ADDITIONAL_COSTS.training : 0
}
