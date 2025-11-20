import { z } from 'zod'

// Calculator State Schema
export const calculatorStateSchema = z.object({
  projectType: z.enum(
    [
      'website-simple',
      'website-complex',
      'web-app',
      'mobile-app',
      'ecommerce',
      'custom',
      'unsure',
    ],
    {
      message: 'Bitte wählen Sie einen gültigen Projekttyp aus',
    }
  ),

  design: z.object({
    level: z.enum(['template', 'custom', 'premium'], {
      message: 'Bitte wählen Sie ein gültiges Design-Level aus',
    }),
    pageRange: z.enum(['1-5', '6-15', '16-30', '30+'], {
      message: 'Bitte wählen Sie einen gültigen Seiten-Bereich aus',
    }),
    responsiveness: z.enum(['desktop-only', 'responsive', 'pwa'], {
      message: 'Bitte wählen Sie eine gültige Responsiveness-Option aus',
    }),
    uxComplexity: z.enum(['standard', 'advanced', 'premium'], {
      message: 'Bitte wählen Sie eine gültige UX-Komplexität aus',
    }),
  }),

  features: z.object({
    cms: z.boolean(),
    cmsType: z.enum(['strapi', 'sanity', 'custom']).optional(),
    auth: z.boolean(),
    auth2FA: z.boolean().optional(),
    authSocial: z.boolean().optional(),
    database: z.boolean(),
    databaseComplexity: z.enum(['simple', 'complex']).optional(),
    payment: z.boolean(),
    paymentProvider: z.enum(['stripe', 'paypal', 'mollie']).optional(),
    api: z.boolean(),
    apiType: z.enum(['rest', 'graphql']).optional(),
    thirdPartyIntegrations: z.boolean(),
    integrationsCount: z
      .number()
      .int('Anzahl der Integrationen muss eine ganze Zahl sein')
      .min(0, 'Anzahl der Integrationen muss mindestens 0 sein')
      .max(20, 'Anzahl der Integrationen darf maximal 20 sein')
      .optional(),
    fileUploads: z.boolean(),
    i18n: z.boolean(),
    i18nLanguages: z
      .number()
      .int('Anzahl der Sprachen muss eine ganze Zahl sein')
      .min(1, 'Anzahl der Sprachen muss mindestens 1 sein')
      .max(20, 'Anzahl der Sprachen darf maximal 20 sein')
      .optional(),
    adminDashboard: z.boolean(),
    realtime: z.boolean(),
  }),

  quality: z.object({
    seo: z.enum(['none', 'basic', 'advanced', 'enterprise'], {
      message: 'Bitte wählen Sie ein gültiges SEO-Level aus',
    }),
    performance: z.enum(['standard', 'optimized', 'premium'], {
      message: 'Bitte wählen Sie ein gültiges Performance-Level aus',
    }),
    security: z.enum(['ssl-only', 'advanced', 'penetration-testing'], {
      message: 'Bitte wählen Sie ein gültiges Sicherheits-Level aus',
    }),
    dsgvo: z.boolean(),
    testing: z.enum(['none', 'unit', 'e2e', 'qa-process'], {
      message: 'Bitte wählen Sie ein gültiges Test-Level aus',
    }),
    accessibility: z.enum(['none', 'wcag-aa', 'wcag-aaa'], {
      message: 'Bitte wählen Sie ein gültiges Barrierefreiheits-Level aus',
    }),
  }),

  timeline: z.object({
    projectStart: z.enum(['flexible', 'normal', 'urgent'], {
      message: 'Bitte wählen Sie einen gültigen Projektstart aus',
    }),
    maintenance: z.enum(['none', 'basic', 'premium'], {
      message: 'Bitte wählen Sie ein gültiges Wartungs-Level aus',
    }),
    support: z.enum(['none', '3-months', '6-months', '12-months'], {
      message: 'Bitte wählen Sie eine gültige Support-Dauer aus',
    }),
    hosting: z.boolean(),
    training: z.boolean(),
  }),

  currentStep: z
    .number()
    .int('Schritt muss eine ganze Zahl sein')
    .min(1, 'Schritt muss mindestens 1 sein')
    .max(6, 'Schritt darf maximal 6 sein'),
})

export type CalculatorStateType = z.infer<typeof calculatorStateSchema>

// Lead Capture Schema
export const leadCaptureSchema = z.object({
  name: z
    .string()
    .min(2, 'Name muss mindestens 2 Zeichen haben')
    .max(100, 'Name darf maximal 100 Zeichen haben'),

  email: z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse ein'),

  phone: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val ||
        /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/im.test(val),
      {
        message: 'Bitte geben Sie eine gültige Telefonnummer ein',
      }
    ),

  company: z
    .string()
    .max(100, 'Firmenname darf maximal 100 Zeichen haben')
    .optional(),

  message: z
    .string()
    .max(2000, 'Nachricht darf maximal 2000 Zeichen haben')
    .optional(),

  preferredProvider: z.enum(['freelancer', 'agency', 'headon'], {
    message: 'Bitte wählen Sie einen gültigen Anbieter aus',
  }),
})

export type LeadCaptureType = z.infer<typeof leadCaptureSchema>

// API Request Schema
export const calculatorAPISchema = z.object({
  leadData: leadCaptureSchema,
  calculatorData: calculatorStateSchema,
  comparisonResult: z.object({
    freelancer: z.any(), // ProviderEstimate
    agency: z.any(),
    headon: z.any(),
    savings: z.object({
      vsFreelancer: z.object({
        price: z.number(),
        time: z.number(),
      }),
      vsAgency: z.object({
        price: z.number(),
        time: z.number(),
      }),
    }),
  }),
})

export type CalculatorAPIType = z.infer<typeof calculatorAPISchema>
