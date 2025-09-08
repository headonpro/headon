'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { 
  Clock, 
  MessageSquare, 
  TrendingUp, 
  Shield, 
  Phone, 
  Calendar, 
  Mail, 
  CheckCircle2, 
  Star, 
  Upload,
  Zap,
  Users,
  Award,
  ArrowRight,
  Sparkles,
  Timer,
  FileText,
  AlertCircle
} from 'lucide-react'
import { createBrowserClient } from '@supabase/ssr'
import { toast } from 'sonner'
import CalendlyWidget from '@/components/contact/CalendlyWidget'
import FileUploadZone from '@/components/contact/FileUploadZone'
import MultiStepForm from './MultiStepForm'

// Smart Form Placeholders basierend auf Projekt-Typ
const projectTypePlaceholders: Record<string, string> = {
  'website-simple': 'z.B. Ich brauche eine moderne Website für mein Restaurant mit Menü, Öffnungszeiten und Kontaktinformationen...',
  'website-complex': 'z.B. Website mit Buchungssystem und Kundenverwaltung für mein Dienstleistungsunternehmen...',
  'mobile-app': 'z.B. App für iOS/Android mit Login und Push-Notifications für meine Kunden...',
  'ecommerce': 'z.B. Online-Shop mit Payment-Integration und Lagerverwaltung für 500+ Produkte...',
  'custom': 'z.B. Individuelle Lösung für spezifische Geschäftsanforderungen...',
  'unsure': 'Beschreiben Sie Ihre Idee und wir helfen Ihnen, die beste Lösung zu finden...'
}

// Lead Scoring Configuration
const leadScoringWeights = {
  budget: {
    '2500-5000': 5,
    '5000-10000': 10,
    '10000-20000': 15,
    '20000+': 20,
    'consulting': 3
  },
  timeline: {
    'immediately': 20,
    'next-month': 15,
    '2-3-months': 10,
    'planning': 5
  },
  projectType: {
    'website-simple': 5,
    'website-complex': 10,
    'mobile-app': 15,
    'ecommerce': 15,
    'custom': 20,
    'unsure': 3
  }
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
    files: [] as File[]
  })
  
  const [messagePlaceholder, setMessagePlaceholder] = useState('Erzählen Sie uns von Ihrem Projekt...')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showProjectDetails, setShowProjectDetails] = useState(true) // Alle Felder sofort sichtbar!
  const [showCalendly, setShowCalendly] = useState(false)
  const [recentProjects, setRecentProjects] = useState(2)
  const [leadScore, setLeadScore] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4
  
  // Initialize Supabase client
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

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

  // Removed progressive disclosure - all fields visible immediately for better UX

  // Calculate Lead Score
  useEffect(() => {
    let score = 0
    
    if (formData.budget && leadScoringWeights.budget[formData.budget as keyof typeof leadScoringWeights.budget]) {
      score += leadScoringWeights.budget[formData.budget as keyof typeof leadScoringWeights.budget]
    }
    
    if (formData.timeline && leadScoringWeights.timeline[formData.timeline as keyof typeof leadScoringWeights.timeline]) {
      score += leadScoringWeights.timeline[formData.timeline as keyof typeof leadScoringWeights.timeline]
    }
    
    if (formData.projectType && leadScoringWeights.projectType[formData.projectType as keyof typeof leadScoringWeights.projectType]) {
      score += leadScoringWeights.projectType[formData.projectType as keyof typeof leadScoringWeights.projectType]
    }
    
    if (formData.company) score += 10
    if (formData.phone) score += 5
    if (formData.files.length > 0) score += 10
    
    setLeadScore(score)
  }, [formData])

  const handleProjectTypeChange = (value: string) => {
    setFormData({ ...formData, projectType: value })
    setMessagePlaceholder(projectTypePlaceholders[value] || 'Erzählen Sie uns von Ihrem Projekt...')
  }

  const handleFilesChange = (files: File[]) => {
    setFormData({ ...formData, files })
  }

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
        files: formData.files.length > 0 ? {
          count: formData.files.length,
          names: formData.files.map(f => f.name)
        } : null
      }
      
      // Submit to Supabase
      const { data, error } = await supabase
        .from('leads')
        .insert([submissionData])
        .select()
      
      if (error) throw error
      
      console.log('Lead successfully saved to Supabase:', data)
      
      // Show success message
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
        files: []
      })
      
      // Show Calendly widget for high-value leads
      if (leadScore > 30) {
        setShowCalendly(true)
        toast.info('Sie können auch direkt einen Termin buchen!', {
          duration: 6000,
        })
      }
      
    } catch (error: any) {
      console.error('Submission error:', error)
      toast.error('Ein Fehler ist aufgetreten', {
        description: error?.message || 'Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Gradient Background - Premium wie HeroSection */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500" />
      
      {/* Animated Gradient Layers */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 opacity-60"
          animate={{
            background: isMobile ? [
              'radial-gradient(circle at 30% 70%, rgba(255, 140, 0, 0.5) 0%, transparent 40%)',
              'radial-gradient(circle at 70% 30%, rgba(255, 215, 0, 0.5) 0%, transparent 40%)',
              'radial-gradient(circle at 30% 70%, rgba(255, 140, 0, 0.5) 0%, transparent 40%)',
            ] : [
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
            ease: "linear"
          }}
          style={{
            transform: 'translateZ(0)',
            willChange: 'background'
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
          className="pt-20 pb-12 px-4"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-4 font-heading">
              Lassen Sie uns Ihr Projekt besprechen
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Kostenlose Erstberatung in 15 Minuten - unverbindlich und transparent
            </p>
            
            {/* Trust Indicators with Animation */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2"
              >
                <Clock className="w-5 h-5 text-accent-500" />
                <span className="text-sm font-medium text-white">Antwort innerhalb von 2 Stunden</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2"
              >
                <MessageSquare className="w-5 h-5 text-accent-500" />
                <span className="text-sm font-medium text-white">Persönliches Gespräch, keine Verkaufs-Calls</span>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2"
              >
                <TrendingUp className="w-5 h-5 text-accent-500" />
                <span className="text-sm font-medium text-white">Kostenlose Projekt-Einschätzung</span>
              </motion.div>
            </motion.div>

            {/* Live Activity Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-2 text-white/80 text-sm"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>Gestern: {recentProjects} neue Projekte gestartet</span>
            </motion.div>
          </div>
        </motion.section>

        {/* Kontakt-Optionen */}
        <section className="pb-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Option A: Sofort-Termin */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="p-6 bg-white/10 backdrop-blur-md shadow-xl hover:bg-white/15 transition-all border border-white/20">
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold text-white">Direkt Termin buchen</h2>
                      <Badge className="bg-white/20 backdrop-blur-sm text-white border border-white/20">
                        <Timer className="w-3 h-3 mr-1" />
                        15 Min
                      </Badge>
                    </div>
                    <p className="text-white/80 mb-6">
                      Wählen Sie einen passenden Termin für Ihre kostenlose Erstberatung
                    </p>
                    
                    {/* Calendly Widget Integration */}
                    {showCalendly ? (
                      <CalendlyWidget />
                    ) : (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8 text-center cursor-pointer hover:bg-white/15 transition-all"
                        onClick={() => setShowCalendly(true)}
                      >
                        <Calendar className="w-12 h-12 text-white mx-auto mb-4" />
                        <Button className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800">
                          <Calendar className="w-4 h-4 mr-2" />
                          Termin-Kalender öffnen
                        </Button>
                      </motion.div>
                    )}
                    
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-white/70">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span>15-Minuten Slots verfügbar</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white/70">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span>Zoom/Google Meet Link automatisch</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-white/70">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
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
                <Card className="p-6 bg-white/10 backdrop-blur-md shadow-xl hover:bg-white/15 transition-all border border-white/20">
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold text-white">Oder schreiben Sie uns</h2>
                      {leadScore > 0 && (
                        <Badge className="bg-white/20 backdrop-blur-sm text-white border border-white/20">
                          <Award className="w-3 h-3 mr-1" />
                          Lead Score: {leadScore}
                        </Badge>
                      )}
                    </div>
                    <p className="text-white/80 mb-6">
                      Beschreiben Sie Ihr Projekt und wir melden uns schnellstmöglich
                    </p>
                    
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
          className="py-12 px-4 bg-gradient-to-b from-transparent to-white/10"
        >
          <div className="max-w-6xl mx-auto">
            {/* Quick-Facts Leiste */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              {[
                { icon: CheckCircle2, text: '150+ Projekte', color: 'text-green-500' },
                { icon: Zap, text: '4x schneller', color: 'text-yellow-500' },
                { icon: TrendingUp, text: '75% günstiger', color: 'text-blue-500' },
                { icon: Shield, text: 'DSGVO-konform', color: 'text-purple-500' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <Badge variant="secondary" className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white">
                    <item.icon className={`w-4 h-4 mr-1 ${item.color}`} />
                    {item.text}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>

            {/* Mini-Testimonials with Animation */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid md:grid-cols-2 gap-6 mb-12"
            >
              {[
                {
                  text: "15 Min Gespräch, am nächsten Tag perfektes Angebot!",
                  author: "Restaurant Müller"
                },
                {
                  text: "Hätte nie gedacht, dass es so schnell und günstig geht.",
                  author: "Handwerk Weber"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="p-6 bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all">
                    <CardContent className="p-0">
                      <div className="flex mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-white/90 mb-2">
                        "{testimonial.text}"
                      </p>
                      <p className="text-sm text-white/60">- {testimonial.author}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* FAQ Sektion with Animation */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-center mb-8 text-white">Häufige Fragen</h2>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {[
                  {
                    question: "Wie läuft die Zusammenarbeit ab?",
                    answer: "15-Min Gespräch → 48h Angebot → Projekt-Start in 1-2 Wochen. Wir arbeiten agil und transparent, Sie sind immer auf dem Laufenden."
                  },
                  {
                    question: "Was kostet eine Website?",
                    answer: "Je nach Umfang 2.500€ - 10.000€. Exakte Kosten erhalten Sie nach unserem Erstgespräch. Wir erstellen immer ein Festpreisangebot, damit Sie Planungssicherheit haben."
                  },
                  {
                    question: "Wie lange dauert die Entwicklung?",
                    answer: "Website: 2-4 Wochen, App: 4-8 Wochen - 4x schneller als üblich. Durch unsere effiziente KI-unterstützte Entwicklung sparen Sie Zeit und Geld."
                  },
                  {
                    question: "Gibt es versteckte Kosten?",
                    answer: "Nein. Festpreis vor Projektbeginn, keine Überraschungen. Alle Kosten werden transparent im Angebot aufgeführt."
                  },
                  {
                    question: "Was passiert nach dem Launch?",
                    answer: "1 Jahr kostenloser Support, dann optional Wartungsvertrag. Sie erhalten alle Zugänge und können jederzeit selbst Änderungen vornehmen."
                  }
                ].map((faq, index) => (
                  <AccordionItem key={`item-${index + 1}`} value={`item-${index + 1}`} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4">
                    <AccordionTrigger className="hover:no-underline text-left text-white">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-primary-400 flex-shrink-0" />
                        <span>{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-white/80">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </motion.section>
      </div>

      {/* Floating Action Bar (Sticky for all devices) */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30, delay: 1 }}
        className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-white/10 shadow-2xl p-4 z-50"
      >
        <div className="flex gap-2 max-w-md mx-auto">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
            <Button 
              className="w-full" 
              variant="outline" 
              size="lg"
              onClick={() => window.location.href = 'tel:+49123456789'}
            >
              <Phone className="w-4 h-4 mr-1" />
              Anrufen
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
            <Button 
              className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800" 
              size="lg"
              onClick={() => setShowCalendly(true)}
            >
              <Calendar className="w-4 h-4 mr-1" />
              Termin
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
            <Button 
              className="w-full" 
              variant="outline" 
              size="lg"
              onClick={() => window.location.href = 'mailto:info@headon.pro'}
            >
              <Mail className="w-4 h-4 mr-1" />
              Email
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}