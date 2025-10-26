/**
 * Comparison Articles Index
 *
 * Central export point for all comparison articles.
 * Each comparison is now in its own file for better maintainability.
 */

import type { ComparisonArticle } from '@/lib/types/content'

// Import all comparison articles
import { reactVsVue } from './react-vs-vue'
import { nativeVsCrossPlatformMobile } from './native-vs-cross-platform-mobile'
import { websiteVsWebApp } from './website-vs-web-app'
import { nextjsVsReactSpa } from './nextjs-vs-react-spa'
import { wordpressVsCustomDevelopment } from './wordpress-vs-custom-development'
import { typescriptVsJavascript } from './typescript-vs-javascript'
import { supabaseVsFirebase } from './supabase-vs-firebase'
import { tailwindVsBootstrapVsCustomCss } from './tailwind-vs-bootstrap-vs-custom-css'
import { shopifyVsWoocommerceVsCustomEcommerce } from './shopify-vs-woocommerce-vs-custom-ecommerce'
import { headlessCmsVergleich } from './headless-cms-vergleich-contentful-sanity-strapi'
import { pwaVsNativeVsHybridApp } from './pwa-vs-native-vs-hybrid-app'

/**
 * All comparison articles exported as array
 * Maintains original order for consistent display
 */
export const comparisonArticles: ComparisonArticle[] = [
  reactVsVue,
  nativeVsCrossPlatformMobile,
  websiteVsWebApp,
  nextjsVsReactSpa,
  wordpressVsCustomDevelopment,
  typescriptVsJavascript,
  supabaseVsFirebase,
  tailwindVsBootstrapVsCustomCss,
  shopifyVsWoocommerceVsCustomEcommerce,
  headlessCmsVergleich,
  pwaVsNativeVsHybridApp,
]

/**
 * Helper function to get a comparison by slug
 */
export function getComparisonBySlug(slug: string): ComparisonArticle | undefined {
  return comparisonArticles.find((article) => article.slug === slug)
}

/**
 * Helper function to get all comparison slugs (useful for static generation)
 */
export function getAllComparisonSlugs(): string[] {
  return comparisonArticles.map((article) => article.slug)
}
