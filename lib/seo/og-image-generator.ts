/**
 * Open Graph Image URL Generator
 *
 * Provides centralized OG image URL generation for all pages with
 * development-time validation to ensure images exist before deployment.
 */

import { existsSync } from 'fs'
import { join } from 'path'

// ============================================================================
// Configuration
// ============================================================================

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://headon.pro'
const DEFAULT_OG_IMAGE = `${BASE_URL}/headon-logo.svg`
const OG_IMAGES_DIR = '/og-images'

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Supported page types for OG image generation
 */
export type OGImagePage =
  | 'home'
  | 'services'
  | 'web-dev'
  | 'mobile-dev'
  | 'design'
  | 'backend'
  | 'blog'
  | 'contact'
  | 'about'
  | 'custom'

/**
 * Options for OG image URL generation
 */
export interface OGImageOptions {
  /**
   * Page type for predefined OG images
   */
  page: OGImagePage

  /**
   * Custom filename for 'custom' page type
   * @example 'faq.jpg', 'glossary.jpg'
   */
  customFilename?: string
}

/**
 * Metadata about an OG image
 */
export interface OGImageMetadata {
  page: string
  url: string
  width: number
  height: number
  alt: string
  format: 'jpg' | 'png' | 'webp'
}

// ============================================================================
// OG Image URL Generation
// ============================================================================

/**
 * Mapping of page types to their OG image filenames
 */
const PAGE_TO_FILENAME: Record<Exclude<OGImagePage, 'custom'>, string> = {
  home: 'home.jpg',
  services: 'services.jpg',
  'web-dev': 'web-dev.jpg',
  'mobile-dev': 'mobile-dev.jpg',
  design: 'design.jpg',
  backend: 'backend.jpg',
  blog: 'blog.jpg',
  contact: 'contact.jpg',
  about: 'about.jpg',
}

/**
 * Generates absolute OG image URL for a specified page
 * @param options - OG image generation options
 * @returns Absolute URL to the OG image
 *
 * @example
 * getOGImageUrl({ page: 'home' })
 * // Returns: 'https://headon.pro/og-images/home.jpg'
 *
 * @example
 * getOGImageUrl({ page: 'custom', customFilename: 'faq.jpg' })
 * // Returns: 'https://headon.pro/og-images/faq.jpg'
 */
export function getOGImageUrl(options: OGImageOptions): string {
  const { page, customFilename } = options

  // Handle custom page type
  if (page === 'custom') {
    if (!customFilename) {
      console.warn(
        '[OG Image Generator] Custom page type requires customFilename. Falling back to default.'
      )
      return DEFAULT_OG_IMAGE
    }
    return `${BASE_URL}${OG_IMAGES_DIR}/${customFilename}`
  }

  // Get filename from mapping
  const filename = PAGE_TO_FILENAME[page]
  if (!filename) {
    console.warn(`[OG Image Generator] Unknown page type: ${page}. Falling back to default.`)
    return DEFAULT_OG_IMAGE
  }

  return `${BASE_URL}${OG_IMAGES_DIR}/${filename}`
}

// ============================================================================
// Development-Only Validation
// ============================================================================

/**
 * Validates that an OG image exists in the filesystem
 * Only runs in development environment for performance
 *
 * @param url - Absolute or relative URL to the OG image
 * @returns true if image exists, false otherwise
 *
 * @example
 * const url = getOGImageUrl({ page: 'home' })
 * if (!validateOGImageExists(url)) {
 *   console.warn('Home OG image missing')
 * }
 */
export function validateOGImageExists(url: string): boolean {
  // Skip validation in production for performance
  if (process.env.NODE_ENV === 'production') {
    return true
  }

  try {
    // Extract path from URL (remove domain)
    let imagePath = url
    if (url.startsWith('http://') || url.startsWith('https://')) {
      const urlObj = new URL(url)
      imagePath = urlObj.pathname
    }

    // Construct absolute filesystem path
    const publicDir = join(process.cwd(), 'public')
    const fullPath = join(publicDir, imagePath)

    // Check if file exists
    const exists = existsSync(fullPath)

    if (!exists) {
      console.warn(
        `[OG Image Generator] Image not found: ${imagePath}\n` +
          `  Expected at: ${fullPath}\n` +
          `  Will fall back to default logo in production.`
      )
    }

    return exists
  } catch (error) {
    // If validation fails (e.g., in browser context), log and return false
    console.warn(
      '[OG Image Generator] Validation failed:',
      error instanceof Error ? error.message : error
    )
    return false
  }
}

// ============================================================================
// Predefined OG Image Metadata
// ============================================================================

/**
 * Predefined OG image metadata for all pages
 * Use this for comprehensive metadata in Open Graph tags
 */
export const ogImageMetadata: Record<Exclude<OGImagePage, 'custom'>, OGImageMetadata> = {
  home: {
    page: 'home',
    url: getOGImageUrl({ page: 'home' }),
    width: 1200,
    height: 630,
    alt: 'HEADON.pro - Full-Service Digitalagentur für Web & App Entwicklung',
    format: 'jpg',
  },
  services: {
    page: 'services',
    url: getOGImageUrl({ page: 'services' }),
    width: 1200,
    height: 630,
    alt: 'HEADON.pro Services - Web, Mobile, Design & Backend',
    format: 'jpg',
  },
  'web-dev': {
    page: 'web-dev',
    url: getOGImageUrl({ page: 'web-dev' }),
    width: 1200,
    height: 630,
    alt: 'Web Development Services - HEADON.pro',
    format: 'jpg',
  },
  'mobile-dev': {
    page: 'mobile-dev',
    url: getOGImageUrl({ page: 'mobile-dev' }),
    width: 1200,
    height: 630,
    alt: 'Mobile App Development Services - HEADON.pro',
    format: 'jpg',
  },
  design: {
    page: 'design',
    url: getOGImageUrl({ page: 'design' }),
    width: 1200,
    height: 630,
    alt: 'UI/UX Design Services - HEADON.pro',
    format: 'jpg',
  },
  backend: {
    page: 'backend',
    url: getOGImageUrl({ page: 'backend' }),
    width: 1200,
    height: 630,
    alt: 'Backend Solutions - HEADON.pro',
    format: 'jpg',
  },
  blog: {
    page: 'blog',
    url: getOGImageUrl({ page: 'blog' }),
    width: 1200,
    height: 630,
    alt: 'HEADON.pro Blog - Web Development Insights',
    format: 'jpg',
  },
  contact: {
    page: 'contact',
    url: getOGImageUrl({ page: 'contact' }),
    width: 1200,
    height: 630,
    alt: 'Kontakt - HEADON.pro',
    format: 'jpg',
  },
  about: {
    page: 'about',
    url: getOGImageUrl({ page: 'about' }),
    width: 1200,
    height: 630,
    alt: 'Über uns - HEADON.pro',
    format: 'jpg',
  },
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Validates all predefined OG images exist in development
 * Useful for pre-deployment checks
 *
 * @returns Array of missing image page types
 *
 * @example
 * const missing = validateAllOGImages()
 * if (missing.length > 0) {
 *   console.error('Missing OG images:', missing)
 * }
 */
export function validateAllOGImages(): OGImagePage[] {
  const missing: OGImagePage[] = []

  for (const [page, metadata] of Object.entries(ogImageMetadata)) {
    if (!validateOGImageExists(metadata.url)) {
      missing.push(page as OGImagePage)
    }
  }

  return missing
}
