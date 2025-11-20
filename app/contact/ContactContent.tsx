'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  Clock,
  MessageSquare,
  TrendingUp,
  Shield,
  Phone,
  Calendar,
  Mail,
  CheckCircle2,
  Zap,
  Award,
  Timer,
  AlertCircle,
} from 'lucide-react'
import { toast } from 'sonner'
import CalendlyWidget from '@/components/contact/CalendlyWidget'
import MultiStepForm from './MultiStepForm'

// Lead Scoring Configuration
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
  const [showCalendly, setShowCalendly] = useState(false)
  const [leadScore, setLeadScore] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    // Simulate live updates
    const interval = setInterval(() => {
      // setAvailableSlots(prev => Math.max(1, prev + Math.floor(Math.random() * 3) - 1))
      // setRecentProjects(prev => prev + (Math.random() > 0.7 ? 1 : 0))
    }, 30000)

    return () => {
      window.removeEventListener('resize', checkMobile)
      clearInterval(interval)
    }
  }, [])

  // Calculate Lead Score
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
      // Prepare form data with lead score
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

      // Submit to API route
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

      // Show success message with conditional calendly info
      if (leadScore > 30) {
        toast.success('Vielen Dank für Ihre Anfrage!', {
          description:
            'Wir melden uns innerhalb von 2 Stunden bei Ihnen. Sie können auch direkt einen Termin buchen!',
          duration: 6000,
        })
        setShowCalendly(true)
      } else {
        toast.success('Vielen Dank für Ihre Anfrage!', {
          description: 'Wir melden uns innerhalb von 2 Stunden bei Ihnen.',
          duration: 5000,
        })
      }

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

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Gradient Background - Premium wie HeroSection */}
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
        {/* Hero Bereich */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="px-4 pt-40 pb-24"
        >
          <div className="mx-auto max-w-4xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-heading mb-12 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Kontakt -{' '}
              <span className="from-secondary-300 via-accent-500 to-secondary-600 bg-gradient-to-r bg-clip-text text-transparent">
                Lassen Sie uns Ihr Projekt besprechen
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mx-auto mb-8 max-w-3xl text-lg text-white/90"
            >
              Kostenlose Erstberatung in 15 Minuten - unverbindlich und transparent
            </motion.p>

            {/* Trust Indicators with Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 backdrop-blur-sm"
              >
                <Clock className="text-accent-500 h-5 w-5" />
                <span className="text-sm font-medium text-white">
                  Antwort innerhalb von 2 Stunden
                </span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 backdrop-blur-sm"
              >
                <MessageSquare className="text-accent-500 h-5 w-5" />
                <span className="text-sm font-medium text-white">
                  Persönliches Gespräch, keine Verkaufs-Calls
                </span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 backdrop-blur-sm"
              >
                <TrendingUp className="text-accent-500 h-5 w-5" />
                <span className="text-sm font-medium text-white">
                  Kostenlose Projekt-Einschätzung
                </span>
              </motion.div>
            </motion.div>

            {/* Live Activity Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-2 text-sm text-white/80"
            >
              <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
              <span>Verfügbarkeit</span>
            </motion.div>
          </div>
        </motion.section>

        {/* Kontakt-Optionen */}
        <section className="px-4 pb-12">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Option A: Sofort-Termin */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md transition-all hover:bg-white/15">
                  <CardContent className="p-0">
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-white">Direkt Termin buchen</h2>
                      <Badge className="border border-white/20 bg-white/20 text-white backdrop-blur-sm">
                        <Timer className="mr-1 h-3 w-3" />
                        15 Min
                      </Badge>
                    </div>
                    <p className="mb-6 text-white/80">
                      Wählen Sie einen passenden Termin für Ihre kostenlose Erstberatung
                    </p>

                    {/* Calendly Widget Integration */}
                    {showCalendly ? (
                      <CalendlyWidget />
                    ) : (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="cursor-pointer rounded-lg border border-white/20 bg-white/10 p-8 text-center backdrop-blur-sm transition-all hover:bg-white/15"
                        onClick={() => setShowCalendly(true)}
                      >
                        <Calendar className="mx-auto mb-4 h-12 w-12 text-white" />
                        <Button className="from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 w-full bg-gradient-to-r">
                          <Calendar className="mr-2 h-4 w-4" />
                          Termin-Kalender öffnen
                        </Button>
                      </motion.div>
                    )}

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-white/70">
                        <CheckCircle2 className="text-accent-500 h-4 w-4" />
                        <span>15-Minuten Slots verfügbar</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white/70">
                        <CheckCircle2 className="text-accent-500 h-4 w-4" />
                        <span>Zoom/Google Meet Link automatisch</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white/70">
                        <CheckCircle2 className="text-accent-500 h-4 w-4" />
                        <span>Erinnerung per Email</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Option B: Smart Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md transition-all hover:bg-white/15">
                  <CardContent className="p-0">
                    <div className="mb-4 flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-white">Oder schreiben Sie uns</h2>
                      {leadScore > 0 && (
                        <Badge className="border border-white/20 bg-white/20 text-white backdrop-blur-sm">
                          <Award className="mr-1 h-3 w-3" />
                          Lead Score: {leadScore}
                        </Badge>
                      )}
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
            </div>
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

            {/* FAQ Sektion with Animation */}
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

      {/* Contact Drawer - Modern Bottom Sheet */}
      <Drawer>
        <DrawerTrigger asChild>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 1 }}
            className="fixed right-0 bottom-0 left-0 z-50"
          >
            <div className="from-primary-900/50 via-primary-900/30 hover:from-primary-900/60 cursor-pointer border-t border-white/10 bg-gradient-to-t to-transparent p-4 backdrop-blur-md transition-colors">
              <div className="mx-auto flex max-w-md items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
                  <div>
                    <p className="text-sm font-semibold text-white">Jetzt Kontakt aufnehmen</p>
                    <p className="text-xs text-white/60">Tap um Optionen zu sehen</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                    <Phone className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                    <Mail className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </DrawerTrigger>

        <DrawerContent className="border-t border-white/20 bg-white/5 backdrop-blur-xl">
          <DrawerHeader className="text-center">
            <DrawerTitle className="text-2xl font-bold text-white">Kontakt aufnehmen</DrawerTitle>
            <DrawerDescription className="text-white/70">
              Wählen Sie Ihre bevorzugte Kontaktmethode
            </DrawerDescription>
          </DrawerHeader>

          <div className="space-y-4 p-6 pb-8">
            {/* Termin buchen - Primary */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                onClick={() => {
                  setShowCalendly(true)
                  // Drawer schließt automatisch
                }}
                className="from-primary-500 to-accent-600 hover:from-primary-600 hover:to-accent-700 h-14 w-full bg-gradient-to-r text-base font-semibold text-white"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Termin buchen (15 Min kostenlos)
              </Button>
            </motion.div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/20" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-primary-600/20 px-2 text-white/60 backdrop-blur-sm">
                  Oder direkt
                </span>
              </div>
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => (window.location.href = 'tel:+4917663040241')}
                  className="h-14 w-full border-white/20 bg-white/5 text-white hover:bg-white/10"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Anrufen
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="h-14 w-full border-white/20 bg-white/5 text-white hover:bg-white/10"
                >
                  <a href="mailto:hallo@headon.pro">
                    <Mail className="mr-2 h-5 w-5" />
                    Email
                  </a>
                </Button>
              </motion.div>
            </div>

            {/* Trust Indicator */}
            <div className="flex items-center justify-center gap-2 pt-2 text-sm text-white/60">
              <CheckCircle2 className="text-accent-400 h-4 w-4" />
              <span>Antwort innerhalb von 2 Stunden</span>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
