import { FAQPageContent } from './FAQPageContent'

// Metadata export (Server Component only)
export { metadata } from './metadata'

/**
 * FAQ Page - Server Component
 *
 * This is a server component that exports metadata for SEO.
 * The interactive client-side content is in FAQPageContent.tsx
 */
export default function FAQPage() {
  return <FAQPageContent />
}
