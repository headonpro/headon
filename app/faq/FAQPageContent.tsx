'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { faqData, searchFAQs, getFAQCounts } from '@/lib/content/faq-data'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Command, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command'
import { Badge } from '@/components/ui/badge'
import { FAQSchema } from '@/components/seo/SchemaGenerator'
import Link from 'next/link'
import {
  Zap,
  Clock,
  CheckCircle2,
  Search,
  MessageCircle,
  Code,
  Smartphone,
  Palette,
  Database,
  X,
} from 'lucide-react'

// Category configuration with icons and descriptions
const categories = [
  {
    key: 'general' as const,
    label: 'Allgemein',
    icon: MessageCircle,
    description: 'Grundlegende Fragen zu Services, Preisen und Abläufen',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    key: 'webDevelopment' as const,
    label: 'Web',
    icon: Code,
    description: 'Fragen zu Web-Entwicklung, Technologien und Hosting',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    key: 'mobileDevelopment' as const,
    label: 'Mobile',
    icon: Smartphone,
    description: 'Fragen zu App-Entwicklung für iOS und Android',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    key: 'uiUxDesign' as const,
    label: 'Design',
    icon: Palette,
    description: 'Fragen zu UI/UX Design und Branding',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
  },
  {
    key: 'backendSolutions' as const,
    label: 'Backend',
    icon: Database,
    description: 'Fragen zu Backend-Entwicklung und Integrationen',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
]

export function FAQPageContent() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('general')
  const [showSearch, setShowSearch] = useState(false)

  // Get FAQ counts for statistics
  const faqCounts = getFAQCounts()
  const totalFAQs = Object.values(faqCounts).reduce((sum, count) => sum + count, 0)

  // Search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return []
    return searchFAQs(searchQuery)
  }, [searchQuery])

  return (
    <>
      {/* Hero Section with Statistics */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Gradient background */}
        <div className="from-primary-600 via-primary-500 to-secondary-500 absolute inset-0 bg-gradient-to-br" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 pt-48 pb-24 md:pt-64 md:pb-32">
          {/* Title */}
          <div className="mb-12 text-center md:mb-16">
            <h1 className="font-heading mb-6 text-5xl font-bold tracking-tight text-white md:text-6xl">
              Häufig gestellte
              <span className="from-secondary-300 via-accent to-secondary-600 bg-gradient-to-r bg-clip-text text-transparent">
                {' '}
                Fragen
              </span>
            </h1>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-white/90 md:text-xl">
              Antworten auf die wichtigsten Fragen zu unseren Services, Preisen, Technologien und
              Abläufen.
            </p>
          </div>

          {/* Statistics */}
          <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="mb-2 text-5xl font-bold text-white">{totalFAQs}+</div>
              <div className="text-sm text-white/80">Fragen beantwortet</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="mb-2 text-5xl font-bold text-white">{categories.length}</div>
              <div className="text-sm text-white/80">Kategorien</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="mb-2 text-5xl font-bold text-white">&lt; 2min</div>
              <div className="text-sm text-white/80">Ø Lesezeit</div>
            </motion.div>
          </div>

          {/* Benefits Cards */}
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Zap,
                title: 'Sofortige Antworten',
                description: 'Keine Wartezeit auf E-Mails. Finden Sie Antworten in Sekunden.',
              },
              {
                icon: CheckCircle2,
                title: 'Transparente Preise',
                description: 'Klare Informationen zu Kosten, Paketen und Zahlungsoptionen.',
              },
              {
                icon: Clock,
                title: 'Technisches Know-how',
                description: 'Verständliche Erklärungen zu Technologien und Prozessen.',
              },
            ].map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                  className="group h-full cursor-pointer overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/20"
                >
                  <div className="p-6">
                    {/* Icon */}
                    <div className="mb-4 flex justify-center">
                      <div className="from-accent to-secondary rounded-xl bg-gradient-to-br p-3 transition-transform duration-300 group-hover:scale-110">
                        <Icon className="text-primary h-8 w-8" strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="group-hover:text-accent mb-3 text-center text-xl font-bold text-white transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-center text-sm text-white/90">{benefit.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Wave at bottom */}
        <div className="absolute right-0 bottom-0 left-0">
          <svg
            className="h-16 w-full fill-white md:h-24"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
          >
            <path d="M0,40 C480,100 960,0 1440,60 L1440,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* FAQ Content Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div className="relative">
                <Button
                  variant="outline"
                  className="hover:border-primary/50 flex h-16 w-full items-center justify-start gap-4 rounded-2xl border border-gray-200/50 bg-white/80 px-6 text-left shadow-lg backdrop-blur-sm transition-all hover:scale-[1.02] hover:bg-white/90 hover:shadow-xl"
                  onClick={() => setShowSearch(!showSearch)}
                >
                  <div className="from-accent to-secondary rounded-lg bg-gradient-to-br p-2">
                    <Search className="text-primary h-5 w-5" strokeWidth={2} />
                  </div>
                  <span className="text-base font-medium text-gray-700">FAQ durchsuchen...</span>
                  <kbd className="ml-auto hidden rounded-lg border border-gray-300 bg-gray-100/80 px-3 py-1 text-xs font-semibold text-gray-600 shadow-sm sm:inline-block">
                    Strg K
                  </kbd>
                </Button>

                {/* Search Results Dropdown - Glasmorphism */}
                {showSearch && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full z-50 mt-4 w-full rounded-2xl border border-gray-200/50 bg-white/95 shadow-2xl backdrop-blur-lg"
                  >
                    <Command className="rounded-2xl">
                      <div className="flex items-center border-b px-3">
                        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                        <input
                          className="placeholder:text-muted-foreground flex h-14 w-full rounded-md bg-transparent py-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Suche nach Fragen oder Stichwörtern..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          autoFocus
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setShowSearch(false)
                            setSearchQuery('')
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="max-h-[400px] overflow-y-auto">
                        {searchQuery.trim() === '' ? (
                          <div className="text-muted-foreground py-6 text-center text-sm">
                            Geben Sie einen Suchbegriff ein...
                          </div>
                        ) : searchResults.length === 0 ? (
                          <CommandEmpty>Keine Ergebnisse gefunden.</CommandEmpty>
                        ) : (
                          <CommandGroup
                            heading={`${searchResults.length} Ergebnisse`}
                            className="text-primary font-bold"
                          >
                            {searchResults.map((faq, idx) => (
                              <CommandItem
                                key={idx}
                                className="hover:border-primary/30 hover:from-primary/5 hover:to-secondary/5 my-2 cursor-pointer rounded-xl border border-transparent bg-gradient-to-br from-gray-50/50 to-white/50 px-4 py-3 transition-all hover:scale-[1.02] hover:shadow-lg"
                                onSelect={() => {
                                  setShowSearch(false)
                                  setSearchQuery('')
                                  // Find which category this FAQ belongs to and switch to it
                                  const categoryKey = Object.keys(faqData).find((key) =>
                                    faqData[key as keyof typeof faqData].includes(faq)
                                  )
                                  if (categoryKey) {
                                    setActiveCategory(categoryKey)
                                  }
                                }}
                              >
                                <div className="flex flex-col gap-2">
                                  <div className="text-primary font-semibold">{faq.question}</div>
                                  <div className="line-clamp-2 text-xs text-gray-600">
                                    {faq.answer}
                                  </div>
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        )}
                      </div>
                    </Command>
                  </motion.div>
                )}
              </div>
            </motion.div>

            {/* Category Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Tabs defaultValue="general" value={activeCategory} onValueChange={setActiveCategory}>
                {/* Tabs List - Glasmorphism Style */}
                <TabsList className="mb-8 grid h-auto w-full grid-cols-2 gap-4 bg-transparent p-0 md:grid-cols-5">
                  {categories.map((category) => {
                    const Icon = category.icon
                    const count = faqCounts[category.key]
                    return (
                      <TabsTrigger
                        key={category.key}
                        value={category.key}
                        className="group hover:border-primary/50 data-[state=active]:border-primary data-[state=active]:from-primary/10 data-[state=active]:to-secondary/10 flex flex-col items-center gap-3 rounded-2xl border border-gray-200/50 bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/90 hover:shadow-xl data-[state=active]:bg-gradient-to-br data-[state=active]:shadow-xl"
                      >
                        <div className="from-accent to-secondary rounded-xl bg-gradient-to-br p-3 transition-transform duration-300 group-hover:scale-110">
                          <Icon className="text-primary h-6 w-6" strokeWidth={2} />
                        </div>
                        <span className="text-sm font-bold md:text-base">{category.label}</span>
                        <Badge variant="secondary" className="text-xs">
                          {count}
                        </Badge>
                      </TabsTrigger>
                    )
                  })}
                </TabsList>

                {/* Tab Contents */}
                {categories.map((category) => {
                  const Icon = category.icon
                  const faqs = faqData[category.key]

                  return (
                    <TabsContent key={category.key} value={category.key} className="mt-0">
                      {/* Category Header - Glasmorphism */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-8 flex items-start gap-4 rounded-2xl border border-white/20 bg-gradient-to-br from-white/80 to-white/60 p-6 shadow-xl backdrop-blur-lg"
                      >
                        <div className="from-accent to-secondary rounded-xl bg-gradient-to-br p-3">
                          <Icon className="text-primary h-8 w-8" strokeWidth={2} />
                        </div>
                        <div className="flex-1">
                          <h2 className="from-primary to-secondary mb-2 bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent">
                            {category.label}
                          </h2>
                          <p className="text-gray-700">{category.description}</p>
                        </div>
                        <Badge className="bg-accent text-primary text-base font-bold shadow-md">
                          {faqs.length} FAQs
                        </Badge>
                      </motion.div>

                      {/* FAQ Accordion - Glasmorphism Cards */}
                      <Accordion type="multiple" className="space-y-4">
                        {faqs.map((faq, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                          >
                            <AccordionItem
                              value={`faq-${category.key}-${index}`}
                              className="group hover:border-primary/50 rounded-2xl border border-gray-200/50 bg-white/80 px-6 shadow-lg backdrop-blur-sm transition-all hover:scale-[1.02] hover:bg-white/90 hover:shadow-xl"
                            >
                              <AccordionTrigger className="from-primary to-secondary py-5 text-left text-base font-bold group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:text-transparent hover:no-underline md:text-lg">
                                {faq.question}
                              </AccordionTrigger>
                              <AccordionContent className="pb-6 text-gray-700">
                                <p className="leading-relaxed">{faq.answer}</p>
                              </AccordionContent>
                            </AccordionItem>
                          </motion.div>
                        ))}
                      </Accordion>
                    </TabsContent>
                  )
                })}
              </Tabs>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="from-primary-600 via-primary-500 to-secondary-500 relative overflow-hidden bg-gradient-to-br py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="font-heading mb-6 text-3xl font-bold text-white md:text-4xl">
              Noch Fragen?
            </h2>
            <p className="mb-8 text-xl text-white/90">
              Wir nehmen uns gerne Zeit für Sie. Buchen Sie jetzt ein kostenloses 15-minütiges
              Beratungsgespräch.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-primary px-8 py-6 text-lg font-semibold shadow-xl transition-all duration-300 hover:shadow-2xl"
              >
                Jetzt Beratung buchen
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FAQ Schema for SEO - Include all FAQs */}
      <FAQSchema
        faqs={[
          ...faqData.general,
          ...faqData.webDevelopment,
          ...faqData.mobileDevelopment,
          ...faqData.uiUxDesign,
          ...faqData.backendSolutions,
        ]}
      />
    </>
  )
}
