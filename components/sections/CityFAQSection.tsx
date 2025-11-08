'use client'

/**
 * CityFAQSection Component
 *
 * FAQ section with accordion for city pages
 * Includes FAQ Schema for rich snippets
 */

import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { FAQ } from '@/lib/types/content'
import { HelpCircle } from 'lucide-react'

interface CityFAQSectionProps {
  faqs: FAQ[]
  cityName: string
  variant?: 'light' | 'dark'
}

export default function CityFAQSection({ faqs, cityName, variant = 'dark' }: CityFAQSectionProps) {
  const isDark = variant === 'dark'

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center">
        <div className="mb-4 flex justify-center">
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-full ${
              isDark ? 'bg-white/20' : 'bg-primary/10'
            }`}
          >
            <HelpCircle className={`h-8 w-8 ${isDark ? 'text-white' : 'text-primary'}`} />
          </div>
        </div>
        <h2
          className={`mb-4 text-3xl font-bold md:text-4xl ${isDark ? 'text-white' : 'text-gray-900'}`}
        >
          Häufig gestellte Fragen zu {cityName}
        </h2>
        <p className={`mx-auto max-w-2xl ${isDark ? 'text-white/80' : 'text-gray-600'}`}>
          Antworten auf die wichtigsten Fragen zur Website-Entwicklung in {cityName}
        </p>
      </div>

      {/* Accordion */}
      <div
        className={`mx-auto max-w-3xl rounded-lg border backdrop-blur-md ${
          isDark ? 'border-white/20 bg-white/10' : 'border-gray-200 bg-white'
        }`}
      >
        <Accordion type="single" collapsible className="w-full px-6">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b-0">
              <AccordionTrigger
                className={`py-6 text-left hover:no-underline ${
                  isDark ? 'text-white hover:text-white/80' : 'text-gray-900 hover:text-gray-700'
                }`}
              >
                <span className="pr-4 text-base font-semibold">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent
                className={`pb-6 text-sm leading-relaxed ${
                  isDark ? 'text-white/80' : 'text-gray-600'
                }`}
              >
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* CTA below FAQs */}
      <div className="text-center">
        <p className={`mb-4 text-sm ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
          Weitere Fragen? Wir helfen gerne weiter!
        </p>
      </div>
    </motion.div>
  )
}
