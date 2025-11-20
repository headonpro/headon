/**
 * Type definitions for the Kostenrechner (Cost Calculator) feature
 *
 * This file contains all TypeScript interfaces and type definitions used
 * throughout the calculator application, ensuring type safety across
 * components, calculation engine, and API routes.
 */

// ============================================================================
// Project Type Definitions
// ============================================================================

/**
 * Available project types for cost calculation
 */
export type ProjectType =
  | 'website-simple'
  | 'website-complex'
  | 'web-app'
  | 'mobile-app'
  | 'ecommerce'
  | 'custom'
  | 'unsure'

// ============================================================================
// Design & Scope Types (Step 2)
// ============================================================================

/**
 * Design quality level determining multipliers
 */
export type DesignLevel = 'template' | 'custom' | 'premium'

/**
 * Number of pages in the project
 */
export type PageRange = '1-5' | '6-15' | '16-30' | '30+'

/**
 * Responsiveness and device support level
 */
export type ResponsivenessLevel = 'desktop-only' | 'responsive' | 'pwa'

/**
 * UX complexity level
 */
export type UXComplexity = 'standard' | 'advanced' | 'premium'

// ============================================================================
// Feature Types (Step 3)
// ============================================================================

/**
 * CMS (Content Management System) options
 */
export type CMSType = 'strapi' | 'sanity' | 'custom'

/**
 * Database complexity level
 */
export type DatabaseComplexity = 'simple' | 'complex'

/**
 * Payment provider options
 */
export type PaymentProvider = 'stripe' | 'paypal' | 'mollie'

/**
 * API architecture type
 */
export type APIType = 'rest' | 'graphql'

// ============================================================================
// Quality & Performance Types (Step 4)
// ============================================================================

/**
 * SEO optimization level
 */
export type SEOLevel = 'none' | 'basic' | 'advanced' | 'enterprise'

/**
 * Performance optimization level
 */
export type PerformanceLevel = 'standard' | 'optimized' | 'premium'

/**
 * Security implementation level
 */
export type SecurityLevel = 'ssl-only' | 'advanced' | 'penetration-testing'

/**
 * Testing coverage level
 */
export type TestingLevel = 'none' | 'unit' | 'e2e' | 'qa-process'

/**
 * Accessibility compliance level
 */
export type AccessibilityLevel = 'none' | 'wcag-aa' | 'wcag-aaa'

// ============================================================================
// Timeline & Support Types (Step 5)
// ============================================================================

/**
 * Project start urgency level
 */
export type ProjectStart = 'flexible' | 'normal' | 'urgent'

/**
 * Ongoing maintenance level
 */
export type MaintenanceLevel = 'none' | 'basic' | 'premium'

/**
 * Support duration after launch
 */
export type SupportDuration = 'none' | '3-months' | '6-months' | '12-months'

// ============================================================================
// Main State Interface
// ============================================================================

/**
 * Complete calculator state tracking user selections across all steps
 */
export interface CalculatorState {
  // Step 1: Project Type
  projectType: ProjectType

  // Step 2: Design & Scope
  design: {
    level: DesignLevel
    pageRange: PageRange
    responsiveness: ResponsivenessLevel
    uxComplexity: UXComplexity
  }

  // Step 3: Features & Functionality
  features: {
    cms: boolean
    cmsType?: CMSType
    auth: boolean
    auth2FA?: boolean
    authSocial?: boolean
    database: boolean
    databaseComplexity?: DatabaseComplexity
    payment: boolean
    paymentProvider?: PaymentProvider
    api: boolean
    apiType?: APIType
    thirdPartyIntegrations: boolean
    integrationsCount?: number
    fileUploads: boolean
    i18n: boolean
    i18nLanguages?: number
    adminDashboard: boolean
    realtime: boolean
  }

  // Step 4: Quality & Performance
  quality: {
    seo: SEOLevel
    performance: PerformanceLevel
    security: SecurityLevel
    dsgvo: boolean
    testing: TestingLevel
    accessibility: AccessibilityLevel
  }

  // Step 5: Timeline & Support
  timeline: {
    projectStart: ProjectStart
    maintenance: MaintenanceLevel
    support: SupportDuration
    hosting: boolean
    training: boolean
  }

  // Navigation state
  currentStep: number
}

// ============================================================================
// Price & Duration Interfaces
// ============================================================================

/**
 * Price range with min, max, and average values
 */
export interface PriceRange {
  min: number
  max: number
  avg: number
}

/**
 * Duration range in weeks
 */
export interface DurationRange {
  min: number  // weeks
  max: number  // weeks
}

// ============================================================================
// Comparison & Results Interfaces
// ============================================================================

/**
 * Provider type for comparison
 */
export type Provider = 'freelancer' | 'agency' | 'headon'

/**
 * Estimate from a single provider (Freelancer, Agency, or HEADON)
 */
export interface ProviderEstimate {
  provider: Provider
  price: PriceRange
  duration: DurationRange
  quality: 1 | 2 | 3 | 4 | 5
  pros: string[]
  cons: string[]
  included: string[]
  excluded: string[]
}

/**
 * Complete 3-way comparison result with savings calculations
 */
export interface ComparisonResult {
  freelancer: ProviderEstimate
  agency: ProviderEstimate
  headon: ProviderEstimate
  savings: {
    vsFreelancer: {
      price: number
      time: number  // weeks
    }
    vsAgency: {
      price: number
      time: number  // weeks
    }
  }
}

// ============================================================================
// Cost Breakdown Interfaces
// ============================================================================

/**
 * Single line item in cost breakdown
 */
export interface BreakdownItem {
  label: string
  value: number
}

/**
 * Category group in cost breakdown with subtotal
 */
export interface BreakdownCategory {
  category: string
  items: BreakdownItem[]
  subtotal: number
}

// ============================================================================
// Lead Capture Interface
// ============================================================================

/**
 * Lead data captured from results page
 */
export interface LeadData {
  name: string
  email: string
  phone?: string
  company?: string
  message?: string
  preferredProvider: Provider
}

// ============================================================================
// API & Database Types
// ============================================================================

/**
 * Lead status in database
 */
export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'

/**
 * Complete calculator lead record for database storage
 */
export interface CalculatorLead extends LeadData {
  id: string
  created_at: string
  calculator_data: CalculatorState
  comparison_result: ComparisonResult
  lead_score: number
  estimated_value: number
  status: LeadStatus
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_term?: string
  utm_content?: string
}

/**
 * API request body for lead submission
 */
export interface CalculatorAPIRequest {
  leadData: LeadData
  calculatorState: CalculatorState
  comparisonResult: ComparisonResult
}

/**
 * API response for lead submission
 */
export interface CalculatorAPIResponse {
  success: boolean
  message: string
  leadId?: string
}
