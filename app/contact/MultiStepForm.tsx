'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  CheckCircle2,
  Mail,
  Briefcase,
  DollarSign,
  MessageSquare,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Zap,
  Phone,
  FileText,
  TrendingUp,
  Clock,
  Calendar,
  Target,
  Rocket
} from 'lucide-react'
import FileUploadZone from '@/components/contact/FileUploadZone'

interface FormData {
  name: string
  email: string
  company: string
  phone: string
  projectType: string
  budget: string
  timeline: string
  message: string
  files: File[]
}

interface MultiStepFormProps {
  formData: FormData
  setFormData: (data: FormData) => void
  onSubmit: (e: React.FormEvent) => void
  isSubmitting: boolean
}

const projectTypePlaceholders: Record<string, string> = {
  'website-simple': 'z.B. Ich brauche eine moderne Website für mein Restaurant mit Menü, Öffnungszeiten und Kontaktinformationen...',
  'website-complex': 'z.B. Website mit Buchungssystem und Kundenverwaltung für mein Dienstleistungsunternehmen...',
  'mobile-app': 'z.B. App für iOS/Android mit Login und Push-Notifications für meine Kunden...',
  'ecommerce': 'z.B. Online-Shop mit Payment-Integration und Lagerverwaltung für 500+ Produkte...',
  'custom': 'z.B. Individuelle Lösung für spezifische Geschäftsanforderungen...',
  'unsure': 'Beschreiben Sie Ihre Idee und wir helfen Ihnen, die beste Lösung zu finden...'
}

export default function MultiStepForm({ formData, setFormData, onSubmit, isSubmitting }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleProjectTypeChange = (value: string) => {
    setFormData({ ...formData, projectType: value })
  }

  const handleFilesChange = (files: File[]) => {
    setFormData({ ...formData, files })
  }

  const isStepValid = (step: number) => {
    switch(step) {
      case 1:
        return formData.name && formData.email
      case 2:
        return formData.projectType
      case 3:
        return formData.budget && formData.timeline
      case 4:
        return formData.message
      default:
        return false
    }
  }

  return (
    <>
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center flex-1">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ 
                  scale: currentStep >= step ? 1 : 0.8,
                  backgroundColor: currentStep >= step ? '#fff' : 'rgba(255,255,255,0.2)'
                }}
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all cursor-pointer ${
                  currentStep >= step ? 'text-primary-600 shadow-lg' : 'text-white/60'
                }`}
                onClick={() => step <= currentStep && setCurrentStep(step)}
              >
                {currentStep > step ? (
                  <CheckCircle2 className="w-7 h-7 text-primary-600" />
                ) : (
                  <span className="text-lg">{step}</span>
                )}
              </motion.div>
              {step < 4 && (
                <motion.div 
                  className="flex-1 h-1 mx-3 rounded-full overflow-hidden bg-white/20"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: step * 0.1 }}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-white to-white/80"
                    initial={{ width: '0%' }}
                    animate={{ width: currentStep > step ? '100%' : '0%' }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white/90 font-medium"
          >
            {currentStep === 1 && 'Kontaktdaten'}
            {currentStep === 2 && 'Projekt-Details'}
            {currentStep === 3 && 'Budget & Timeline'}
            {currentStep === 4 && 'Ihre Nachricht'}
          </motion.div>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <AnimatePresence mode="wait">
          {/* Step 1: Kontaktdaten */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Mail className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">Wie können wir Sie erreichen?</h3>
                <p className="text-white/70">Ihre Kontaktdaten für die Projektbesprechung</p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-5">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Label htmlFor="name" className="text-white/90 mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                    Name *
                  </Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="bg-white/10 border-white/20 text-white placeholder-white/40 focus:bg-white/15 focus:border-white/40 h-12"
                    placeholder="Max Mustermann"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Label htmlFor="email" className="text-white/90 mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-400" />
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="bg-white/10 border-white/20 text-white placeholder-white/40 focus:bg-white/15 focus:border-white/40 h-12"
                    placeholder="max@beispiel.de"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Label htmlFor="company" className="text-white/90 mb-2 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-green-400" />
                    Unternehmen
                  </Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="bg-white/10 border-white/20 text-white placeholder-white/40 focus:bg-white/15 focus:border-white/40 h-12"
                    placeholder="Firma GmbH"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Label htmlFor="phone" className="text-white/90 mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-purple-400" />
                    Telefon (optional)
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="bg-white/10 border-white/20 text-white placeholder-white/40 focus:bg-white/15 focus:border-white/40 h-12"
                    placeholder="+49 123 456789"
                  />
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Projekt-Details */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Rocket className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">Was möchten Sie entwickeln lassen?</h3>
                <p className="text-white/70">Wählen Sie den passenden Projekt-Typ</p>
              </div>

              <div className="grid gap-4">
                {[
                  { value: 'website-simple', icon: FileText, label: 'Website (einfach)', color: 'from-blue-500 to-blue-600', desc: 'Präsenz-Website mit statischen Inhalten' },
                  { value: 'website-complex', icon: Zap, label: 'Website (komplex)', color: 'from-purple-500 to-purple-600', desc: 'Dynamische Website mit Backend-Funktionen' },
                  { value: 'mobile-app', icon: Phone, label: 'Mobile App', color: 'from-green-500 to-green-600', desc: 'Native oder Cross-Platform App' },
                  { value: 'ecommerce', icon: TrendingUp, label: 'E-Commerce', color: 'from-orange-500 to-orange-600', desc: 'Online-Shop mit Zahlungssystem' },
                  { value: 'custom', icon: Target, label: 'Custom Lösung', color: 'from-pink-500 to-pink-600', desc: 'Maßgeschneiderte Software-Lösung' },
                ].map((type, index) => (
                  <motion.div
                    key={type.value}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleProjectTypeChange(type.value)}
                    className={`relative p-4 rounded-xl cursor-pointer transition-all ${
                      formData.projectType === type.value 
                        ? 'bg-white/20 border-2 border-white shadow-lg' 
                        : 'bg-white/10 border-2 border-white/20 hover:bg-white/15'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${type.color} flex items-center justify-center`}>
                        <type.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold">{type.label}</h4>
                        <p className="text-white/60 text-sm">{type.desc}</p>
                      </div>
                      {formData.projectType === type.value && (
                        <CheckCircle2 className="w-6 h-6 text-white" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Budget & Timeline */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <DollarSign className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">Budget & Zeitrahmen</h3>
                <p className="text-white/70">Damit wir das perfekte Angebot erstellen können</p>
              </div>

              <div className="space-y-6">
                <div>
                  <Label className="text-white/90 mb-3 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    Budget-Rahmen *
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: '2500-5000', label: '2.500€ - 5.000€', desc: 'Kleine Projekte' },
                      { value: '5000-10000', label: '5.000€ - 10.000€', desc: 'Mittlere Projekte' },
                      { value: '10000-20000', label: '10.000€ - 20.000€', desc: 'Große Projekte' },
                      { value: '20000+', label: '20.000€+', desc: 'Enterprise' },
                    ].map((budget) => (
                      <motion.div
                        key={budget.value}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setFormData({...formData, budget: budget.value})}
                        className={`p-4 rounded-lg cursor-pointer transition-all ${
                          formData.budget === budget.value
                            ? 'bg-white/20 border-2 border-white'
                            : 'bg-white/10 border-2 border-white/20 hover:bg-white/15'
                        }`}
                      >
                        <div className="font-semibold text-white">{budget.label}</div>
                        <div className="text-xs text-white/60 mt-1">{budget.desc}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-white/90 mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    Wann soll es losgehen? *
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'immediately', label: 'Sofort', icon: Zap, color: 'text-red-400' },
                      { value: 'next-month', label: 'Nächster Monat', icon: Calendar, color: 'text-orange-400' },
                      { value: '2-3-months', label: 'In 2-3 Monaten', icon: Clock, color: 'text-blue-400' },
                      { value: 'planning', label: 'Noch in Planung', icon: Target, color: 'text-purple-400' },
                    ].map((timeline) => (
                      <motion.div
                        key={timeline.value}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setFormData({...formData, timeline: timeline.value})}
                        className={`p-4 rounded-lg cursor-pointer transition-all ${
                          formData.timeline === timeline.value
                            ? 'bg-white/20 border-2 border-white'
                            : 'bg-white/10 border-2 border-white/20 hover:bg-white/15'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <timeline.icon className={`w-4 h-4 ${timeline.color}`} />
                          <span className="font-semibold text-white">{timeline.label}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Nachricht */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <MessageSquare className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">Erzählen Sie uns mehr</h3>
                <p className="text-white/70">Je mehr Details, desto besser können wir helfen</p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="message" className="text-white/90 mb-2 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-indigo-400" />
                    Projektbeschreibung *
                  </Label>
                  <Textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="bg-white/10 border-white/20 text-white placeholder-white/40 focus:bg-white/15 focus:border-white/40 min-h-[150px]"
                    placeholder={projectTypePlaceholders[formData.projectType] || 'Beschreiben Sie Ihr Projekt...'}
                  />
                </div>

                <FileUploadZone onFilesChange={handleFilesChange} />

                {/* Summary */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20"
                >
                  <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    Zusammenfassung
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-white/80">
                      <span>Kontakt:</span>
                      <span>{formData.name} ({formData.email})</span>
                    </div>
                    <div className="flex justify-between text-white/80">
                      <span>Projekt:</span>
                      <span>{formData.projectType || 'Nicht angegeben'}</span>
                    </div>
                    <div className="flex justify-between text-white/80">
                      <span>Budget:</span>
                      <span>{formData.budget || 'Nicht angegeben'}</span>
                    </div>
                    <div className="flex justify-between text-white/80">
                      <span>Timeline:</span>
                      <span>{formData.timeline || 'Nicht angegeben'}</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4 pt-6">
          {currentStep > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={handlePrev}
              className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zurück
            </Button>
          )}
          
          {currentStep < totalSteps ? (
            <Button
              type="button"
              onClick={handleNext}
              disabled={!isStepValid(currentStep)}
              className={`flex-1 ${currentStep === 1 ? 'w-full' : ''} bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800`}
            >
              Weiter
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting || !isStepValid(currentStep)}
              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                  Wird gesendet...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Nachricht senden
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </>
  )
}