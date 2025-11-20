'use client'

/**
 * StepFeatures Component
 *
 * Step 3 of the cost calculator - Feature & Functionality selection.
 * Displays 10 feature checkboxes with conditional sub-options that appear
 * with smooth animations when their parent feature is selected.
 */

import { AnimatePresence, motion } from 'framer-motion'
import {
  Database,
  Lock,
  CreditCard,
  Webhook,
  Plug,
  Upload,
  Languages,
  Settings,
  Zap,
  FileText,
} from 'lucide-react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { FeatureCheckbox } from '@/components/calculator/shared/FeatureCheckbox'
import type { CalculatorState } from '@/lib/calculator/types'
import { cn } from '@/lib/utils'

// ============================================================================
// Type Definitions
// ============================================================================

export interface StepFeaturesProps {
  /** Current features state */
  features: CalculatorState['features']
  /** Callback for feature state updates */
  onChange: (features: CalculatorState['features']) => void
}

// ============================================================================
// Component Implementation
// ============================================================================

export function StepFeatures({ features, onChange }: StepFeaturesProps) {
  // Helper to toggle main feature
  const handleFeatureToggle = (key: keyof typeof features) => {
    onChange({ ...features, [key]: !features[key] })
  }

  // Helper to update nested feature properties
  const handleSubOptionChange = (key: string, value: string | boolean | number) => {
    onChange({ ...features, [key]: value })
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2 text-white">Funktionalitäten</h3>
        <p className="text-white/80">
          Wählen Sie die benötigten Features für Ihr Projekt
        </p>
      </div>

      <div className="space-y-4">
        {/* Feature 1: CMS */}
        <div>
          <FeatureCheckbox
            label="Content Management System (CMS)"
            description="Inhalte selbst verwalten und bearbeiten"
            checked={features.cms}
            onChange={() => handleFeatureToggle('cms')}
            icon={FileText}
          />

          <AnimatePresence>
            {features.cms && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden ml-8 mt-3"
              >
                <Label className="text-sm font-medium mb-2 block text-white">CMS-Typ</Label>
                <RadioGroup
                  value={features.cmsType || 'strapi'}
                  onValueChange={(val) => handleSubOptionChange('cmsType', val)}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2 text-white">
                    <RadioGroupItem value="strapi" id="cms-strapi" />
                    <Label htmlFor="cms-strapi" className="text-sm cursor-pointer text-white">
                      Strapi (Headless CMS)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 text-white">
                    <RadioGroupItem value="sanity" id="cms-sanity" />
                    <Label htmlFor="cms-sanity" className="text-sm cursor-pointer text-white">
                      Sanity (Cloud-basiert)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 text-white">
                    <RadioGroupItem value="custom" id="cms-custom" />
                    <Label htmlFor="cms-custom" className="text-sm cursor-pointer text-white">
                      Custom CMS (Maßgeschneidert)
                    </Label>
                  </div>
                </RadioGroup>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Feature 2: Authentication */}
        <div>
          <FeatureCheckbox
            label="Benutzer-Authentifizierung"
            description="Login, Registrierung, Passwort-Reset"
            checked={features.auth}
            onChange={() => handleFeatureToggle('auth')}
            icon={Lock}
          />

          <AnimatePresence>
            {features.auth && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden ml-8 mt-3 space-y-3"
              >
                <div
                  className={cn(
                    'flex items-center gap-3 p-3 rounded border cursor-pointer backdrop-blur-md',
                    features.auth2FA
                      ? 'border-accent-500 bg-accent-500/10'
                      : 'border-white/20 bg-white/10 hover:border-white/30 hover:bg-white/15'
                  )}
                  onClick={() => handleSubOptionChange('auth2FA', !features.auth2FA)}
                >
                  <Checkbox
                    checked={features.auth2FA || false}
                    onCheckedChange={(checked) => handleSubOptionChange('auth2FA', checked)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <Label className="text-sm cursor-pointer flex-1 text-white">
                    Two-Factor Authentication (2FA)
                  </Label>
                </div>

                <div
                  className={cn(
                    'flex items-center gap-3 p-3 rounded border cursor-pointer backdrop-blur-md',
                    features.authSocial
                      ? 'border-accent-500 bg-accent-500/10'
                      : 'border-white/20 bg-white/10 hover:border-white/30 hover:bg-white/15'
                  )}
                  onClick={() => handleSubOptionChange('authSocial', !features.authSocial)}
                >
                  <Checkbox
                    checked={features.authSocial || false}
                    onCheckedChange={(checked) => handleSubOptionChange('authSocial', checked)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <Label className="text-sm cursor-pointer flex-1 text-white">
                    Social Login (Google, Facebook, etc.)
                  </Label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Feature 3: Database */}
        <div>
          <FeatureCheckbox
            label="Datenbank-Integration"
            description="Persistente Datenspeicherung"
            checked={features.database}
            onChange={() => handleFeatureToggle('database')}
            icon={Database}
          />

          <AnimatePresence>
            {features.database && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden ml-8 mt-3"
              >
                <Label className="text-sm font-medium mb-2 block text-white">
                  Datenbank-Komplexität
                </Label>
                <RadioGroup
                  value={features.databaseComplexity || 'simple'}
                  onValueChange={(val) => handleSubOptionChange('databaseComplexity', val)}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2 text-white">
                    <RadioGroupItem value="simple" id="db-simple" />
                    <Label htmlFor="db-simple" className="text-sm cursor-pointer text-white">
                      Einfach (wenige Tabellen)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 text-white">
                    <RadioGroupItem value="complex" id="db-complex" />
                    <Label htmlFor="db-complex" className="text-sm cursor-pointer text-white">
                      Komplex (viele Relationen, Joins)
                    </Label>
                  </div>
                </RadioGroup>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Feature 4: Payment */}
        <div>
          <FeatureCheckbox
            label="Zahlungs-Integration"
            description="Online-Bezahlung verarbeiten"
            checked={features.payment}
            onChange={() => handleFeatureToggle('payment')}
            icon={CreditCard}
          />

          <AnimatePresence>
            {features.payment && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden ml-8 mt-3"
              >
                <Label className="text-sm font-medium mb-2 block text-white">Payment Provider</Label>
                <RadioGroup
                  value={features.paymentProvider || 'stripe'}
                  onValueChange={(val) => handleSubOptionChange('paymentProvider', val)}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2 text-white">
                    <RadioGroupItem value="stripe" id="pay-stripe" />
                    <Label htmlFor="pay-stripe" className="text-sm cursor-pointer text-white">
                      Stripe (International)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 text-white">
                    <RadioGroupItem value="paypal" id="pay-paypal" />
                    <Label htmlFor="pay-paypal" className="text-sm cursor-pointer text-white">
                      PayPal (Weit verbreitet)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 text-white">
                    <RadioGroupItem value="mollie" id="pay-mollie" />
                    <Label htmlFor="pay-mollie" className="text-sm cursor-pointer text-white">
                      Mollie (EU-fokussiert)
                    </Label>
                  </div>
                </RadioGroup>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Feature 5: API */}
        <div>
          <FeatureCheckbox
            label="API-Entwicklung"
            description="REST oder GraphQL API"
            checked={features.api}
            onChange={() => handleFeatureToggle('api')}
            icon={Webhook}
          />

          <AnimatePresence>
            {features.api && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden ml-8 mt-3"
              >
                <Label className="text-sm font-medium mb-2 block text-white">API-Typ</Label>
                <RadioGroup
                  value={features.apiType || 'rest'}
                  onValueChange={(val) => handleSubOptionChange('apiType', val)}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2 text-white">
                    <RadioGroupItem value="rest" id="api-rest" />
                    <Label htmlFor="api-rest" className="text-sm cursor-pointer text-white">
                      REST API (Standard)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 text-white">
                    <RadioGroupItem value="graphql" id="api-graphql" />
                    <Label htmlFor="api-graphql" className="text-sm cursor-pointer text-white">
                      GraphQL API (Flexibler)
                    </Label>
                  </div>
                </RadioGroup>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Feature 6: Third-Party Integrations */}
        <div>
          <FeatureCheckbox
            label="Drittanbieter-Integrationen"
            description="APIs von externen Services einbinden"
            checked={features.thirdPartyIntegrations}
            onChange={() => handleFeatureToggle('thirdPartyIntegrations')}
            icon={Plug}
          />

          <AnimatePresence>
            {features.thirdPartyIntegrations && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden ml-8 mt-3"
              >
                <Label htmlFor="integrations-count" className="text-sm font-medium mb-2 block text-white">
                  Anzahl der Integrationen
                </Label>
                <Input
                  id="integrations-count"
                  type="number"
                  min={1}
                  max={20}
                  value={features.integrationsCount || 1}
                  onChange={(e) =>
                    handleSubOptionChange('integrationsCount', parseInt(e.target.value) || 1)
                  }
                  className="max-w-[200px] bg-white/10 border-white/20 text-white backdrop-blur-md hover:bg-white/15 focus:bg-white/20 placeholder:text-white/50"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Feature 7: File Uploads */}
        <FeatureCheckbox
          label="Datei-Uploads"
          description="Benutzer können Dateien hochladen"
          checked={features.fileUploads}
          onChange={() => handleFeatureToggle('fileUploads')}
          icon={Upload}
        />

        {/* Feature 8: Internationalization */}
        <div>
          <FeatureCheckbox
            label="Mehrsprachigkeit (i18n)"
            description="Unterstützung mehrerer Sprachen"
            checked={features.i18n}
            onChange={() => handleFeatureToggle('i18n')}
            icon={Languages}
          />

          <AnimatePresence>
            {features.i18n && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden ml-8 mt-3"
              >
                <Label htmlFor="language-count" className="text-sm font-medium mb-2 block text-white">
                  Anzahl der Sprachen
                </Label>
                <Input
                  id="language-count"
                  type="number"
                  min={2}
                  max={20}
                  value={features.i18nLanguages || 2}
                  onChange={(e) =>
                    handleSubOptionChange('i18nLanguages', parseInt(e.target.value) || 2)
                  }
                  className="max-w-[200px] bg-white/10 border-white/20 text-white backdrop-blur-md hover:bg-white/15 focus:bg-white/20 placeholder:text-white/50"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Feature 9: Admin Dashboard */}
        <FeatureCheckbox
          label="Admin-Dashboard"
          description="Verwaltungsbereich für Administratoren"
          checked={features.adminDashboard}
          onChange={() => handleFeatureToggle('adminDashboard')}
          icon={Settings}
        />

        {/* Feature 10: Real-time Features */}
        <FeatureCheckbox
          label="Echtzeit-Funktionen"
          description="WebSockets, Live-Updates"
          checked={features.realtime}
          onChange={() => handleFeatureToggle('realtime')}
          icon={Zap}
        />
      </div>

      {/* Help Text */}
      <div className="mt-6 p-4 bg-white/10 border border-white/20 rounded-lg backdrop-blur-md">
        <p className="text-sm text-white">
          <span className="font-medium">Tipp:</span> Wählen Sie nur die Features, die Sie wirklich benötigen.
          Die Kostenschätzung wird live in der Übersicht rechts aktualisiert. Im nächsten Schritt
          können Sie die Qualität und Performance-Level festlegen.
        </p>
      </div>
    </div>
  )
}
