import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name muss mindestens 2 Zeichen haben')
    .max(100, 'Name darf maximal 100 Zeichen haben'),

  email: z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse ein'),

  company: z.string().optional(),

  phone: z
    .string()
    .optional()
    .refine(
      (val) =>
        !val || /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/im.test(val),
      {
        message: 'Bitte geben Sie eine gültige Telefonnummer ein',
      }
    ),

  subject: z
    .string()
    .min(5, 'Betreff muss mindestens 5 Zeichen haben')
    .max(200, 'Betreff darf maximal 200 Zeichen haben'),

  message: z
    .string()
    .min(10, 'Nachricht muss mindestens 10 Zeichen haben')
    .max(5000, 'Nachricht darf maximal 5000 Zeichen haben'),

  budget: z.enum(['< 10k', '10k-25k', '25k-50k', '50k-100k', '> 100k', 'Noch unklar']).optional(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

export const newsletterSchema = z.object({
  email: z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse ein'),
})

export type NewsletterFormData = z.infer<typeof newsletterSchema>
