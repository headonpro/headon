/**
 * Zod Validation Schemas for Content Frontmatter
 *
 * Runtime validation for MDX frontmatter with descriptive error messages.
 * Ensures content quality and fails fast at build time for invalid data.
 */

import { z } from 'zod'

// ============================================================================
// Helper Schemas
// ============================================================================

const iso8601DateSchema = z
  .string()
  .regex(
    /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(\.\d{3})?(Z|[+-]\d{2}:\d{2})?)?$/,
    'Datum muss im ISO 8601 Format sein (z.B. 2024-01-15 oder 2024-01-15T10:30:00Z)'
  )

const imageMetadataSchema = z.object({
  url: z
    .string()
    .min(1, 'Bild-URL ist erforderlich')
    .refine(
      (val) => val.startsWith('/') || val.startsWith('http://') || val.startsWith('https://'),
      'Bild-URL muss eine absolute URL (https://...) oder ein relativer Pfad (/images/...) sein'
    ),
  alt: z
    .string()
    .min(1, 'Alt-Text ist erforderlich')
    .max(200, 'Alt-Text darf maximal 200 Zeichen haben'),
  width: z.number().positive('Breite muss positiv sein').optional(),
  height: z.number().positive('Höhe muss positiv sein').optional(),
})

const authorSchema = z.object({
  name: z
    .string()
    .min(2, 'Autor-Name muss mindestens 2 Zeichen haben')
    .max(100, 'Autor-Name darf maximal 100 Zeichen haben'),
  avatar: z.string().url('Avatar muss eine gültige URL sein').optional(),
  bio: z.string().max(500, 'Bio darf maximal 500 Zeichen haben').optional(),
})

// ============================================================================
// BlogPost Frontmatter Schema
// ============================================================================

const seoMetadataSchema = z.object({
  title: z
    .string()
    .min(10, 'SEO-Titel muss mindestens 10 Zeichen haben')
    .max(60, 'SEO-Titel darf maximal 60 Zeichen haben')
    .optional(),
  description: z
    .string()
    .min(50, 'SEO-Beschreibung muss mindestens 50 Zeichen haben')
    .max(160, 'SEO-Beschreibung darf maximal 160 Zeichen haben')
    .optional(),
  keywords: z
    .array(z.string().min(2, 'Keyword muss mindestens 2 Zeichen haben'))
    .max(10, 'Maximal 10 SEO-Keywords erlaubt')
    .optional(),
  ogImage: z.string().url('OG-Bild muss eine gültige URL sein').optional(),
})

export const blogPostFrontmatterSchema = z.object({
  title: z
    .string()
    .min(10, 'Titel muss mindestens 10 Zeichen haben')
    .max(100, 'Titel darf maximal 100 Zeichen haben'),
  description: z
    .string()
    .min(50, 'Beschreibung muss mindestens 50 Zeichen haben')
    .max(200, 'Beschreibung darf maximal 200 Zeichen haben'),
  publishedAt: iso8601DateSchema,
  updatedAt: iso8601DateSchema.optional(),
  author: authorSchema,
  tags: z
    .array(z.string().min(1, 'Tag darf nicht leer sein'))
    .min(1, 'Mindestens ein Tag ist erforderlich')
    .max(10, 'Maximal 10 Tags erlaubt'),
  category: z.enum(['development', 'design', 'performance', 'mobile'], {
    message: 'Kategorie muss eine der folgenden sein: development, design, performance, mobile',
  }),
  image: imageMetadataSchema,
  readingTime: z
    .number()
    .positive('Lesezeit muss positiv sein')
    .max(60, 'Lesezeit darf maximal 60 Minuten sein'),
  featured: z.boolean().optional(),
  keywords: z
    .array(z.string().min(2, 'Keyword muss mindestens 2 Zeichen haben'))
    .max(15, 'Maximal 15 Keywords erlaubt')
    .optional(),
  relatedPosts: z
    .array(
      z
        .string()
        .min(1, 'Related-Post-Slug darf nicht leer sein')
        .regex(/^[a-z0-9-]+$/, 'Slug muss im kebab-case Format sein')
    )
    .max(5, 'Maximal 5 verwandte Posts erlaubt')
    .optional(),
  seo: seoMetadataSchema.optional(),
})

export type BlogPostFrontmatterData = z.infer<typeof blogPostFrontmatterSchema>

// ============================================================================
// PortfolioProject Frontmatter Schema
// ============================================================================

const clientInfoSchema = z.object({
  name: z
    .string()
    .min(2, 'Kunden-Name muss mindestens 2 Zeichen haben')
    .max(100, 'Kunden-Name darf maximal 100 Zeichen haben'),
  logo: z.string().url('Logo muss eine gültige URL sein').optional(),
  industry: z
    .string()
    .min(2, 'Branche muss mindestens 2 Zeichen haben')
    .max(100, 'Branche darf maximal 100 Zeichen haben'),
  website: z.string().url('Website muss eine gültige URL sein').optional(),
})

const projectMetricSchema = z.object({
  label: z
    .string()
    .min(2, 'Metrik-Label muss mindestens 2 Zeichen haben')
    .max(50, 'Metrik-Label darf maximal 50 Zeichen haben'),
  value: z
    .string()
    .min(1, 'Metrik-Wert ist erforderlich')
    .max(20, 'Metrik-Wert darf maximal 20 Zeichen haben'),
  improvement: z.string().max(20, 'Verbesserung darf maximal 20 Zeichen haben').optional(),
})

const testimonialSchema = z.object({
  quote: z
    .string()
    .min(20, 'Zitat muss mindestens 20 Zeichen haben')
    .max(500, 'Zitat darf maximal 500 Zeichen haben'),
  author: z
    .string()
    .min(2, 'Autor-Name muss mindestens 2 Zeichen haben')
    .max(100, 'Autor-Name darf maximal 100 Zeichen haben'),
  role: z
    .string()
    .min(2, 'Rolle muss mindestens 2 Zeichen haben')
    .max(100, 'Rolle darf maximal 100 Zeichen haben'),
  rating: z
    .number()
    .min(1, 'Bewertung muss mindestens 1 sein')
    .max(5, 'Bewertung darf maximal 5 sein')
    .int('Bewertung muss eine ganze Zahl sein'),
})

export const portfolioProjectFrontmatterSchema = z.object({
  title: z
    .string()
    .min(10, 'Titel muss mindestens 10 Zeichen haben')
    .max(100, 'Titel darf maximal 100 Zeichen haben'),
  description: z
    .string()
    .min(50, 'Beschreibung muss mindestens 50 Zeichen haben')
    .max(300, 'Beschreibung darf maximal 300 Zeichen haben'),
  client: clientInfoSchema,
  date: iso8601DateSchema,
  category: z.enum(['web', 'mobile', 'ui-ux', 'full-stack'], {
    message: 'Kategorie muss eine der folgenden sein: web, mobile, ui-ux, full-stack',
  }),
  tags: z
    .array(z.string().min(1, 'Tag darf nicht leer sein'))
    .min(3, 'Mindestens 3 Tags sind erforderlich')
    .max(15, 'Maximal 15 Tags erlaubt'),
  image: imageMetadataSchema,
  metrics: z
    .array(projectMetricSchema)
    .min(1, 'Mindestens eine Metrik ist erforderlich')
    .max(8, 'Maximal 8 Metriken erlaubt'),
  testimonial: testimonialSchema.optional(),
  liveUrl: z.string().url('Live-URL muss eine gültige URL sein').optional(),
  githubUrl: z.string().url('GitHub-URL muss eine gültige URL sein').optional(),
})

export type PortfolioProjectFrontmatterData = z.infer<typeof portfolioProjectFrontmatterSchema>

// ============================================================================
// ServicePage Frontmatter Schema
// ============================================================================

const pricingSchema = z.object({
  from: z.number().positive('Preis muss positiv sein'),
  currency: z.literal('EUR', {
    message: 'Währung muss EUR sein',
  }),
  unit: z.enum(['project', 'hour', 'month'], {
    message: 'Einheit muss eine der folgenden sein: project, hour, month',
  }),
})

const processStepSchema = z.object({
  title: z
    .string()
    .min(5, 'Prozess-Titel muss mindestens 5 Zeichen haben')
    .max(100, 'Prozess-Titel darf maximal 100 Zeichen haben'),
  description: z
    .string()
    .min(20, 'Prozess-Beschreibung muss mindestens 20 Zeichen haben')
    .max(500, 'Prozess-Beschreibung darf maximal 500 Zeichen haben'),
  duration: z
    .string()
    .min(1, 'Dauer ist erforderlich')
    .max(50, 'Dauer darf maximal 50 Zeichen haben'),
})

const faqSchema = z.object({
  question: z
    .string()
    .min(10, 'Frage muss mindestens 10 Zeichen haben')
    .max(200, 'Frage darf maximal 200 Zeichen haben'),
  answer: z
    .string()
    .min(20, 'Antwort muss mindestens 20 Zeichen haben')
    .max(1000, 'Antwort darf maximal 1000 Zeichen haben'),
})

export const servicePageFrontmatterSchema = z.object({
  title: z
    .string()
    .min(10, 'Titel muss mindestens 10 Zeichen haben')
    .max(100, 'Titel darf maximal 100 Zeichen haben'),
  description: z
    .string()
    .min(50, 'Beschreibung muss mindestens 50 Zeichen haben')
    .max(300, 'Beschreibung darf maximal 300 Zeichen haben'),
  icon: z
    .string()
    .min(1, 'Icon-Name ist erforderlich')
    .max(50, 'Icon-Name darf maximal 50 Zeichen haben')
    .regex(/^[A-Z][a-zA-Z0-9]*$/, 'Icon-Name muss ein gültiger Lucide-Icon-Name sein (PascalCase)'),
  pricing: pricingSchema,
  deliverables: z
    .array(
      z
        .string()
        .min(5, 'Leistung muss mindestens 5 Zeichen haben')
        .max(200, 'Leistung darf maximal 200 Zeichen haben')
    )
    .min(3, 'Mindestens 3 Leistungen sind erforderlich')
    .max(15, 'Maximal 15 Leistungen erlaubt'),
  processSteps: z
    .array(processStepSchema)
    .min(3, 'Mindestens 3 Prozess-Schritte sind erforderlich')
    .max(8, 'Maximal 8 Prozess-Schritte erlaubt'),
  faqs: z
    .array(faqSchema)
    .min(5, 'Mindestens 5 FAQs sind erforderlich')
    .max(10, 'Maximal 10 FAQs erlaubt'),
  relatedCaseStudies: z
    .array(
      z
        .string()
        .min(1, 'Case-Study-Slug darf nicht leer sein')
        .regex(/^[a-z0-9-]+$/, 'Slug muss im kebab-case Format sein')
    )
    .min(0)
    .max(5, 'Maximal 5 verwandte Case-Studies erlaubt'),
})

export type ServicePageFrontmatterData = z.infer<typeof servicePageFrontmatterSchema>

// ============================================================================
// CityPage Frontmatter Schema
// ============================================================================

const coordinatesSchema = z.object({
  lat: z
    .number()
    .min(-90, 'Breitengrad muss zwischen -90 und 90 liegen')
    .max(90, 'Breitengrad muss zwischen -90 und 90 liegen'),
  lng: z
    .number()
    .min(-180, 'Längengrad muss zwischen -180 und 180 liegen')
    .max(180, 'Längengrad muss zwischen -180 und 180 liegen'),
})

export const cityPageFrontmatterSchema = z.object({
  name: z
    .string()
    .min(2, 'Stadt-Name muss mindestens 2 Zeichen haben')
    .max(100, 'Stadt-Name darf maximal 100 Zeichen haben'),
  state: z
    .string()
    .min(2, 'Bundesland muss mindestens 2 Zeichen haben')
    .max(100, 'Bundesland darf maximal 100 Zeichen haben'),
  coordinates: coordinatesSchema,
  population: z
    .number()
    .positive('Einwohnerzahl muss positiv sein')
    .int('Einwohnerzahl muss eine ganze Zahl sein'),
  description: z
    .string()
    .min(50, 'Beschreibung muss mindestens 50 Zeichen haben')
    .max(300, 'Beschreibung darf maximal 300 Zeichen haben'),
  services: z
    .array(
      z
        .string()
        .min(1, 'Service-Slug darf nicht leer sein')
        .regex(/^[a-z0-9-]+$/, 'Slug muss im kebab-case Format sein')
    )
    .min(1, 'Mindestens ein Service ist erforderlich')
    .max(10, 'Maximal 10 Services erlaubt'),
  caseStudies: z
    .array(
      z
        .string()
        .min(1, 'Case-Study-Slug darf nicht leer sein')
        .regex(/^[a-z0-9-]+$/, 'Slug muss im kebab-case Format sein')
    )
    .min(0)
    .max(10, 'Maximal 10 Case-Studies erlaubt'),
  localKeywords: z
    .array(
      z
        .string()
        .min(5, 'Keyword muss mindestens 5 Zeichen haben')
        .max(100, 'Keyword darf maximal 100 Zeichen haben')
    )
    .min(3, 'Mindestens 3 lokale Keywords sind erforderlich')
    .max(20, 'Maximal 20 lokale Keywords erlaubt'),
})

export type CityPageFrontmatterData = z.infer<typeof cityPageFrontmatterSchema>

// ============================================================================
// BranchePage Frontmatter Schema
// ============================================================================

const featureItemSchema = z.object({
  title: z
    .string()
    .min(5, 'Feature-Titel muss mindestens 5 Zeichen haben')
    .max(100, 'Feature-Titel darf maximal 100 Zeichen haben'),
  description: z
    .string()
    .min(10, 'Feature-Beschreibung muss mindestens 10 Zeichen haben')
    .max(300, 'Feature-Beschreibung darf maximal 300 Zeichen haben'),
  icon: z
    .string()
    .min(1, 'Icon-Name ist erforderlich')
    .max(50, 'Icon-Name darf maximal 50 Zeichen haben')
    .regex(/^[A-Z][a-zA-Z0-9]*$/, 'Icon-Name muss ein gültiger Lucide-Icon-Name sein (PascalCase)'),
})

export const brancheFrontmatterSchema = z.object({
  name: z
    .string()
    .min(2, 'Branchen-Name muss mindestens 2 Zeichen haben')
    .max(100, 'Branchen-Name darf maximal 100 Zeichen haben'),
  icon: z
    .string()
    .min(1, 'Icon-Name ist erforderlich')
    .max(50, 'Icon-Name darf maximal 50 Zeichen haben')
    .regex(/^[A-Z][a-zA-Z0-9]*$/, 'Icon-Name muss ein gültiger Lucide-Icon-Name sein (PascalCase)'),
  heroTitle: z
    .string()
    .min(10, 'Hero-Titel muss mindestens 10 Zeichen haben')
    .max(150, 'Hero-Titel darf maximal 150 Zeichen haben'),
  description: z
    .string()
    .min(50, 'Beschreibung muss mindestens 50 Zeichen haben')
    .max(300, 'Beschreibung darf maximal 300 Zeichen haben'),
  pricing: z.object({
    from: z.number().positive('Preis muss positiv sein'),
    to: z.number().positive('Preis muss positiv sein'),
    currency: z.enum(['EUR', 'USD']).default('EUR'),
  }),
  features: z
    .array(featureItemSchema)
    .min(4, 'Mindestens 4 Features sind erforderlich')
    .max(8, 'Maximal 8 Features erlaubt'),
  faqs: z
    .array(faqSchema)
    .min(5, 'Mindestens 5 FAQs sind erforderlich')
    .max(15, 'Maximal 15 FAQs erlaubt'),
})

export type BranchePageFrontmatterData = z.infer<typeof brancheFrontmatterSchema>

// ============================================================================
// TechnologyPage Frontmatter Schema
// ============================================================================

const benefitItemSchema = z.object({
  title: z
    .string()
    .min(5, 'Benefit-Titel muss mindestens 5 Zeichen haben')
    .max(100, 'Benefit-Titel darf maximal 100 Zeichen haben'),
  description: z
    .string()
    .min(10, 'Benefit-Beschreibung muss mindestens 10 Zeichen haben')
    .max(300, 'Benefit-Beschreibung darf maximal 300 Zeichen haben'),
})

const useCaseSchema = z.object({
  title: z
    .string()
    .min(5, 'Use-Case-Titel muss mindestens 5 Zeichen haben')
    .max(100, 'Use-Case-Titel darf maximal 100 Zeichen haben'),
  description: z
    .string()
    .min(20, 'Use-Case-Beschreibung muss mindestens 20 Zeichen haben')
    .max(500, 'Use-Case-Beschreibung darf maximal 500 Zeichen haben'),
  bestFor: z
    .string()
    .min(10, 'bestFor muss mindestens 10 Zeichen haben')
    .max(200, 'bestFor darf maximal 200 Zeichen haben'),
})

const comparisonTableRowSchema = z.object({
  feature: z
    .string()
    .min(2, 'Feature muss mindestens 2 Zeichen haben')
    .max(100, 'Feature darf maximal 100 Zeichen haben'),
  thisTech: z
    .string()
    .min(1, 'Wert für diese Technologie ist erforderlich')
    .max(50, 'Wert darf maximal 50 Zeichen haben'),
  alternatives: z
    .array(
      z
        .string()
        .min(1, 'Alternative-Wert ist erforderlich')
        .max(50, 'Alternative-Wert darf maximal 50 Zeichen haben')
    )
    .min(1, 'Mindestens ein Alternativwert ist erforderlich')
    .max(5, 'Maximal 5 Alternativwerte erlaubt'),
})

const comparisonSchema = z.object({
  alternatives: z
    .array(
      z
        .string()
        .min(2, 'Alternative muss mindestens 2 Zeichen haben')
        .max(50, 'Alternative darf maximal 50 Zeichen haben')
    )
    .min(1, 'Mindestens eine Alternative ist erforderlich')
    .max(5, 'Maximal 5 Alternativen erlaubt'),
  tableRows: z
    .array(comparisonTableRowSchema)
    .min(3, 'Mindestens 3 Vergleichszeilen sind erforderlich')
    .max(10, 'Maximal 10 Vergleichszeilen erlaubt'),
})

export const technologyFrontmatterSchema = z.object({
  name: z
    .string()
    .min(2, 'Technologie-Name muss mindestens 2 Zeichen haben')
    .max(100, 'Technologie-Name darf maximal 100 Zeichen haben'),
  officialName: z
    .string()
    .min(2, 'Offizieller Name muss mindestens 2 Zeichen haben')
    .max(100, 'Offizieller Name darf maximal 100 Zeichen haben'),
  logo: z
    .string()
    .min(1, 'Logo-Pfad ist erforderlich')
    .refine(
      (val) => val.startsWith('/') || val.startsWith('http://') || val.startsWith('https://'),
      'Logo muss eine absolute URL (https://...) oder ein relativer Pfad (/images/...) sein'
    ),
  version: z
    .string()
    .min(1, 'Version ist erforderlich')
    .max(20, 'Version darf maximal 20 Zeichen haben')
    .optional(),
  description: z
    .string()
    .min(50, 'Beschreibung muss mindestens 50 Zeichen haben')
    .max(300, 'Beschreibung darf maximal 300 Zeichen haben'),
  benefits: z
    .array(benefitItemSchema)
    .min(4, 'Mindestens 4 Benefits sind erforderlich')
    .max(8, 'Maximal 8 Benefits erlaubt'),
  useCases: z
    .array(useCaseSchema)
    .min(3, 'Mindestens 3 Use-Cases sind erforderlich')
    .max(6, 'Maximal 6 Use-Cases erlaubt'),
  comparison: comparisonSchema,
  relatedProjects: z
    .array(
      z
        .string()
        .min(1, 'Projekt-Slug darf nicht leer sein')
        .regex(/^[a-z0-9-]+$/, 'Slug muss im kebab-case Format sein')
    )
    .min(0)
    .max(5, 'Maximal 5 verwandte Projekte erlaubt')
    .optional(),
  faqs: z
    .array(faqSchema)
    .min(5, 'Mindestens 5 FAQs sind erforderlich')
    .max(12, 'Maximal 12 FAQs erlaubt'),
})

export type TechnologyPageFrontmatterData = z.infer<typeof technologyFrontmatterSchema>
