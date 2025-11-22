'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Clock,
  MessageSquare,
  TrendingUp,
  Shield,
  Calendar,
  CheckCircle2,
  Zap,
  Timer,
  AlertCircle,
} from 'lucide-react'
import { toast } from 'sonner'
import CalendlyWidget from '@/components/contact/CalendlyWidget'
import ContactBar from '@/components/contact/ContactBar'
import MobileContactFAB from '@/components/contact/MobileContactFAB'
import MultiStepForm from './MultiStepForm'

// Lead Scoring Configuration (intern - nicht im UI anzeigen)
const leadScoringWeights = {
  budget: {
    '2500-5000': 5,
    '5000-10000': 10,
    '10000-20000': 15,
    '20000+': 20,
    consulting: 3,
  },
  timeline: {
    immediately: 20,
    'next-month': 15,
    '2-3-months': 10,
    planning: 5,
  },
  projectType: {
    'website-simple': 5,
    'website-complex': 10,
    'mobile-app': 15,
    ecommerce: 15,
    custom: 20,
    unsure: 3,
  },
}

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
    files: [] as File[],
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState('form')
  const [leadScore, setLeadScore] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Calculate Lead Score (intern)
  useEffect(() => {
    let score = 0

    if (
      formData.budget &&
      leadScoringWeights.budget[formData.budget as keyof typeof leadScoringWeights.budget]
    ) {
      score += leadScoringWeights.budget[formData.budget as keyof typeof leadScoringWeights.budget]
    }

    if (
      formData.timeline &&
      leadScoringWeights.timeline[formData.timeline as keyof typeof leadScoringWeights.timeline]
    ) {
      score +=
        leadScoringWeights.timeline[formData.timeline as keyof typeof leadScoringWeights.timeline]
    }

    if (
      formData.projectType &&
      leadScoringWeights.projectType[
        formData.projectType as keyof typeof leadScoringWeights.projectType
      ]
    ) {
      score +=
        leadScoringWeights.projectType[
          formData.projectType as keyof typeof leadScoringWeights.projectType
        ]
    }

    if (formData.company) score += 10
    if (formData.phone) score += 5
    if (formData.files.length > 0) score += 10

    setLeadScore(score)
  }, [formData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const submissionData = {
        name: formData.name,
        email: formData.email,
        company: formData.company || null,
        phone: formData.phone || null,
        project_type: formData.projectType,
        budget: formData.budget,
        timeline: formData.timeline,
        message: formData.message,
        lead_score: leadScore,
        source: 'contact-form',
        files:
          formData.files.length > 0
            ? {
                count: formData.files.length,
                names: formData.files.map((f) => f.name),
              }
            : null,
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Fehler beim Senden der Anfrage')
      }

      console.log('Lead successfully saved:', result.data)

      toast.success('Vielen Dank für Ihre Anfrage!', {
        description: 'Wir melden uns innerhalb von 2 Stunden bei Ihnen.',
        duration: 5000,
      })

      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        projectType: '',
        budget: '',
        timeline: '',
        message: '',
        files: [],
      })
    } catch (error) {
      console.error('Submission error:', error)
      toast.error('Ein Fehler ist aufgetreten', {
        description:
          (error as Error)?.message ||
          'Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToBooking = () => {
    setActiveTab('booking')
    document.getElementById('contact-tabs')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="from-primary-600 via-primary-500 to-secondary-500 absolute inset-0 bg-gradient-to-br" />

      {/* Animated Gradient Layers */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-60"
          animate={{
            background: isMobile
              ? [
                  'radial-gradient(circle at 30% 70%, rgba(255, 140, 0, 0.5) 0%, transparent 40%)',
                  'radial-gradient(circle at 70% 30%, rgba(255, 215, 0, 0.5) 0%, transparent 40%)',
                  'radial-gradient(circle at 30% 70%, rgba(255, 140, 0, 0.5) 0%, transparent 40%)',
                ]
              : [
                  'radial-gradient(circle at 20% 80%, rgba(255, 140, 0, 0.4) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.4) 0%, transparent 50%)',
                  'radial-gradient(circle at 40% 40%, rgba(255, 140, 0, 0.4) 0%, transparent 50%)',
                  'radial-gradient(circle at 60% 60%, rgba(255, 215, 0, 0.4) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 80%, rgba(255, 140, 0, 0.4) 0%, transparent 50%)',
                ],
          }}
          transition={{
            duration: isMobile ? 8 : 10,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            transform: 'translateZ(0)',
            willChange: 'background',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Bereich - kompakter */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="px-4 pt-32 pb-8 md:pt-40 md:pb-12"
        >
          <div className="mx-auto max-w-4xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-heading mb-6 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
            >
              Lassen Sie uns{' '}
              <span className="from-secondary-300 via-accent-500 to-secondary-600 bg-gradient-to-r bg-clip-text text-transparent">
                Ihr Projekt besprechen
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mx-auto mb-6 max-w-2xl text-base text-white/90 md:text-lg"
            >
              Kostenlose Erstberatung in 15 Minuten - unverbindlich und transparent
            </motion.p>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-sm backdrop-blur-sm">
                <Clock className="text-accent-500 h-4 w-4" />
                <span className="font-medium text-white">Antwort in 2h</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-sm backdrop-blur-sm">
                <MessageSquare className="text-accent-500 h-4 w-4" />
                <span className="font-medium text-white">Persönliches Gespräch</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-sm backdrop-blur-sm">
                <TrendingUp className="text-accent-500 h-4 w-4" />
                <span className="font-medium text-white">Kostenlose Einschätzung</span>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Sticky Contact Bar - Desktop */}
        <div className="hidden md:block">
          <ContactBar onBookingClick={scrollToBooking} />
        </div>

        {/* Hauptbereich mit Tabs */}
        <section id="contact-tabs" className="scroll-mt-24 px-4 pb-12">
          <div className="mx-auto max-w-4xl">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-8 grid h-auto w-full grid-cols-2 gap-2 border border-white/20 bg-white/10 p-2 backdrop-blur-md">
                <TabsTrigger
                  value="form"
                  className="flex items-center gap-2 rounded-lg py-3 text-white/70 transition-all data-[state=active]:border data-[state=active]:border-white/30 data-[state=active]:bg-white/20 data-[state=active]:text-white"
                >
                  <MessageSquare className="h-5 w-5" />
                  <span className="font-semibold">Nachricht schreiben</span>
                </TabsTrigger>
                <TabsTrigger
                  value="booking"
                  className="flex items-center gap-2 rounded-lg py-3 text-white/70 transition-all data-[state=active]:border data-[state=active]:border-white/30 data-[state=active]:bg-white/20 data-[state=active]:text-white"
                >
                  <Calendar className="h-5 w-5" />
                  <span className="font-semibold">Termin buchen</span>
                </TabsTrigger>
              </TabsList>

              {/* Tab: Termin buchen */}
              <TabsContent value="booking" className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="border border-white/20 bg-white/10 shadow-xl backdrop-blur-md">
                    <CardContent className="p-6">
                      <div className="mb-6 text-center">
                        <h2 className="mb-2 text-2xl font-bold text-white">
                          Wählen Sie einen Termin
                        </h2>
                        <p className="text-white/80">
                          15 Minuten kostenlose Erstberatung - direkt im Kalender buchen
                        </p>
                      </div>

                      {/* Calendly Widget - direkt sichtbar */}
                      <CalendlyWidget />

                      <div className="mt-6 grid gap-3 sm:grid-cols-3">
                        <div className="flex items-center gap-2 text-sm text-white/70">
                          <CheckCircle2 className="text-accent-500 h-4 w-4 flex-shrink-0" />
                          <span>Zoom/Meet Link automatisch</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white/70">
                          <CheckCircle2 className="text-accent-500 h-4 w-4 flex-shrink-0" />
                          <span>Erinnerung per E-Mail</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white/70">
                          <CheckCircle2 className="text-accent-500 h-4 w-4 flex-shrink-0" />
                          <span>Kostenlos & unverbindlich</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              {/* Tab: Formular */}
              <TabsContent value="form" className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="border border-white/20 bg-white/10 shadow-xl backdrop-blur-md">
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-white">Schreiben Sie uns</h2>
                        <Badge className="border border-white/20 bg-white/20 text-white backdrop-blur-sm">
                          <Timer className="mr-1 h-3 w-3" />
                          Antwort in 2h
                        </Badge>
                      </div>
                      <p className="mb-4 text-white/80">
                        Beschreiben Sie Ihr Projekt und wir melden uns schnellstmöglich
                      </p>

                      {/* Cost Calculator Hint */}
                      <div className="mb-6 rounded-lg border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="text-accent-500 mt-0.5 h-5 w-5 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-white/90">
                              <strong>Noch unsicher über Ihr Budget?</strong>
                            </p>
                            <p className="mt-1 text-xs text-white/70">
                              Nutzen Sie unseren{' '}
                              <a
                                href="/webseite-erstellen-lassen-kosten"
                                className="text-accent-400 hover:text-accent-300 underline transition-colors"
                              >
                                kostenlosen Kostenrechner
                              </a>{' '}
                              für eine erste Einschätzung Ihres Projekts.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Multi-Step Form */}
                      <MultiStepForm
                        formData={formData}
                        setFormData={setFormData}
                        onSubmit={handleSubmit}
                        isSubmitting={isSubmitting}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Vertrauens-Verstärkung */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-b from-transparent to-white/10 px-4 py-12"
        >
          <div className="mx-auto max-w-6xl">
            {/* Quick-Facts Leiste */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-12 flex flex-wrap justify-center gap-4"
            >
              {[
                { icon: CheckCircle2, text: '100% Zufriedenheit', color: 'text-accent-500' },
                { icon: Zap, text: '4x schneller', color: 'text-accent-500' },
                { icon: TrendingUp, text: '30-50% günstiger', color: 'text-accent-500' },
                { icon: Shield, text: 'DSGVO-konform', color: 'text-accent-500' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <Badge
                    variant="secondary"
                    className="bg-white/20 px-4 py-2 text-white backdrop-blur-sm"
                  >
                    <item.icon className={`mr-1 h-4 w-4 ${item.color}`} />
                    {item.text}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>

            {/* FAQ Sektion */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mx-auto max-w-3xl"
            >
              <h2 className="mb-8 text-center text-3xl font-bold text-white">Häufige Fragen</h2>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {[
                  {
                    question: 'Wie läuft die Zusammenarbeit ab?',
                    answer:
                      '15-Min Gespräch → 48h Angebot → Projekt-Start in 1-2 Wochen. Wir arbeiten agil und transparent, Sie sind immer auf dem Laufenden.',
                  },
                  {
                    question: 'Was kostet eine Website?',
                    answer:
                      'Je nach Umfang 2.500€ - 10.000€. Exakte Kosten erhalten Sie nach unserem Erstgespräch. Wir erstellen immer ein Festpreisangebot, damit Sie Planungssicherheit haben.',
                  },
                  {
                    question: 'Wie lange dauert die Entwicklung?',
                    answer:
                      'Website: 2-4 Wochen, App: 4-8 Wochen - 4x schneller als üblich. Durch unsere effiziente KI-unterstützte Entwicklung sparen Sie Zeit und Geld.',
                  },
                  {
                    question: 'Gibt es versteckte Kosten?',
                    answer:
                      'Nein. Festpreis vor Projektbeginn, keine Überraschungen. Alle Kosten werden transparent im Angebot aufgeführt.',
                  },
                  {
                    question: 'Was passiert nach dem Launch?',
                    answer:
                      '6 Monate kostenloser Support, dann optional Wartungsvertrag. Sie erhalten alle Zugänge und können jederzeit selbst Änderungen vornehmen.',
                  },
                ].map((faq, index) => (
                  <AccordionItem
                    key={`item-${index + 1}`}
                    value={`item-${index + 1}`}
                    className="rounded-lg border border-white/20 bg-white/10 px-4 backdrop-blur-md"
                  >
                    <AccordionTrigger className="text-left text-white hover:no-underline">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="text-accent-500 h-5 w-5 flex-shrink-0" />
                        <span>{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-white/80">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </motion.section>
      </div>

      {/* Mobile FAB */}
      <MobileContactFAB onBookingClick={scrollToBooking} />
    </div>
  )
}
