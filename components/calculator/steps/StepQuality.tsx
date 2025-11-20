'use client'

/**
 * StepQuality Component
 *
 * Step 4 of the cost calculator - Quality & Performance options.
 * Displays 6 quality categories in an accordion with radio options for levels.
 * DSGVO is handled as a separate checkbox within the Security accordion.
 */

import { Search, Zap, Shield, Lock, TestTube, Eye } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import type { CalculatorState } from '@/lib/calculator/types'
import { cn } from '@/lib/utils'

// ============================================================================
// Type Definitions
// ============================================================================

export interface StepQualityProps {
  /** Current quality state */
  quality: CalculatorState['quality']
  /** Callback for quality state updates */
  onChange: (quality: CalculatorState['quality']) => void
}

// ============================================================================
// Component Implementation
// ============================================================================

export function StepQuality({ quality, onChange }: StepQualityProps) {
  // Helper to update a single quality field
  const updateQualityField = (field: keyof typeof quality, value: string | boolean) => {
    onChange({ ...quality, [field]: value as never })
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2 text-white">Qualität & Performance</h3>
        <p className="text-white/80">
          Definieren Sie die Qualitätsanforderungen für Ihr Projekt
        </p>
      </div>

      {/* Accordion with 6 Quality Categories */}
      <Accordion type="multiple" className="w-full">
        {/* 1. SEO Optimization */}
        <AccordionItem value="seo">
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              <Search className="h-5 w-5 text-primary-600" />
              <span className="font-medium">SEO-Optimierung</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <RadioGroup
              value={quality.seo}
              onValueChange={(val) => updateQualityField('seo', val)}
              className="space-y-3 mt-2"
            >
              <div
                className={cn(
                  'flex items-start space-x-3 p-3 rounded-lg border-2 transition-all cursor-pointer',
                  quality.seo === 'none'
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                )}
                onClick={() => updateQualityField('seo', 'none')}
              >
                <RadioGroupItem value="none" id="seo-none" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="seo-none" className="font-medium cursor-pointer">
                    Keine
                  </Label>
                  <p className="text-sm text-white/70 mt-1">
                    Basis-HTML ohne SEO-Optimierung
                  </p>
                </div>
              </div>

              <div
                className={cn(
                  'flex items-start space-x-3 p-3 rounded-lg border-2 transition-all cursor-pointer',
                  quality.seo === 'basic'
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                )}
                onClick={() => updateQualityField('seo', 'basic')}
              >
                <RadioGroupItem value="basic" id="seo-basic" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="seo-basic" className="font-medium cursor-pointer">
                    Basic
                  </Label>
                  <p className="text-sm text-white/70 mt-1">
                    Meta-Tags, Sitemap, robots.txt, strukturierte URLs
                  </p>
                </div>
              </div>

              <div
                className={cn(
                  'flex items-start space-x-3 p-3 rounded-lg border-2 transition-all cursor-pointer',
                  quality.seo === 'advanced'
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                )}
                onClick={() => updateQualityField('seo', 'advanced')}
              >
                <RadioGroupItem value="advanced" id="seo-advanced" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="seo-advanced" className="font-medium cursor-pointer">
                    Advanced
                  </Label>
                  <p className="text-sm text-white/70 mt-1">
                    Schema.org, OpenGraph, Performance-Optimierung, Analytics Integration
                  </p>
                </div>
              </div>

              <div
                className={cn(
                  'flex items-start space-x-3 p-3 rounded-lg border-2 transition-all cursor-pointer',
                  quality.seo === 'enterprise'
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                )}
                onClick={() => updateQualityField('seo', 'enterprise')}
              >
                <RadioGroupItem value="enterprise" id="seo-enterprise" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="seo-enterprise" className="font-medium cursor-pointer">
                    Enterprise
                  </Label>
                  <p className="text-sm text-white/70 mt-1">
                    Technical SEO Audit, fortlaufende Optimierung, Monitoring
                  </p>
                </div>
              </div>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>

        {/* 2. Performance Optimization */}
        <AccordionItem value="performance">
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              <Zap className="h-5 w-5 text-primary-600" />
              <span className="font-medium">Performance-Optimierung</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <RadioGroup
              value={quality.performance}
              onValueChange={(val) => updateQualityField('performance', val)}
              className="space-y-3 mt-2"
            >
              <div
                className={cn(
                  'flex items-start space-x-3 p-3 rounded-lg border-2 transition-all cursor-pointer',
                  quality.performance === 'standard'
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                )}
                onClick={() => updateQualityField('performance', 'standard')}
              >
                <RadioGroupItem value="standard" id="perf-standard" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="perf-standard" className="font-medium cursor-pointer">
                    Standard
                  </Label>
                  <p className="text-sm text-white/70 mt-1">
                    Basis-Performance ohne spezielle Optimierungen
                  </p>
                </div>
              </div>

              <div
                className={cn(
                  'flex items-start space-x-3 p-3 rounded-lg border-2 transition-all cursor-pointer',
                  quality.performance === 'optimized'
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                )}
                onClick={() => updateQualityField('performance', 'optimized')}
              >
                <RadioGroupItem value="optimized" id="perf-optimized" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="perf-optimized" className="font-medium cursor-pointer">
                    Optimized
                  </Label>
                  <p className="text-sm text-white/70 mt-1">
                    Code Splitting, Lazy Loading, Bild-Optimierung, Caching
                  </p>
                </div>
              </div>

              <div
                className={cn(
                  'flex items-start space-x-3 p-3 rounded-lg border-2 transition-all cursor-pointer',
                  quality.performance === 'premium'
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                )}
                onClick={() => updateQualityField('performance', 'premium')}
              >
                <RadioGroupItem value="premium" id="perf-premium" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="perf-premium" className="font-medium cursor-pointer">
                    Premium
                  </Label>
                  <p className="text-sm text-white/70 mt-1">
                    CDN, Edge Caching, Performance Monitoring, Core Web Vitals Optimierung
                  </p>
                </div>
              </div>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>

        {/* 3. Security */}
        <AccordionItem value="security">
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-primary-600" />
              <span className="font-medium">Security & DSGVO</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 mt-2">
              {/* Security Level */}
              <div>
                <Label className="text-sm font-semibold mb-3 block">
                  Security-Level
                </Label>
                <RadioGroup
                  value={quality.security}
                  onValueChange={(val) => updateQualityField('security', val)}
                  className="space-y-3"
                >
                  <div
                    className={cn(
                      'flex items-start space-x-3 p-3 rounded-lg border-2 transition-all cursor-pointer',
                      quality.security === 'ssl-only'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    )}
                    onClick={() => updateQualityField('security', 'ssl-only')}
                  >
                    <RadioGroupItem value="ssl-only" id="sec-ssl" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="sec-ssl" className="font-medium cursor-pointer">
                        SSL Only
                      </Label>
                      <p className="text-sm text-white/70 mt-1">
                        HTTPS Verschlüsselung, Basis-Sicherheit
                      </p>
                    </div>
                  </div>

                  <div
                    className={cn(
                      'flex items-start space-x-3 p-3 rounded-lg border-2 transition-all cursor-pointer',
                      quality.security === 'advanced'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    )}
                    onClick={() => updateQualityField('security', 'advanced')}
                  >
                    <RadioGroupItem value="advanced" id="sec-advanced" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="sec-advanced" className="font-medium cursor-pointer">
                        Advanced
                      </Label>
                      <p className="text-sm text-white/70 mt-1">
                        CSRF/XSS Protection, Security Headers, Rate Limiting, Input Validation
                      </p>
                    </div>
                  </div>

                  <div
                    className={cn(
                      'flex items-start space-x-3 p-3 rounded-lg border-2 transition-all cursor-pointer',
                      quality.security === 'penetration-testing'
                        ? 'border-primary-600 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    )}
                    onClick={() => updateQualityField('security', 'penetration-testing')}
                  >
                    <RadioGroupItem
                      value="penetration-testing"
                      id="sec-pentest"
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label htmlFor="sec-pentest" className="font-medium cursor-pointer">
                        Penetration Testing
                      </Label>
                      <p className="text-sm text-white/70 mt-1">
                        Security Audit, Penetration Testing, Vulnerability Scanning
                      </p>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              {/* DSGVO Checkbox (separate) */}
              <div className="pt-3 border-t">
                <div
                  className={cn(
                    'flex items-start gap-3 p-4 rounded-lg border-2 transition-all cursor-pointer',
                    quality.dsgvo
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  )}
                  onClick={() => updateQualityField('dsgvo', !quality.dsgvo)}
                >
                  <Checkbox
                    checked={quality.dsgvo}
                    onCheckedChange={(checked) => updateQualityField('dsgvo', checked)}
                    onClick={(e) => e.stopPropagation()}
                    className="mt-0.5"
                  />
                  <div className="flex items-start gap-3 flex-1">
                    <Lock className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <Label className="font-medium cursor-pointer">
                        DSGVO-Compliance
                      </Label>
                      <p className="text-sm text-white/70 mt-1">
                        Datenschutzerklärung, Cookie-Banner, Consent Management,
                        Datenverarbeitungsverträge
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* 4. Testing */}
        <AccordionItem value="testing">
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              <TestTube className="h-5 w-5 text-primary-600" />
              <span className="font-medium">Testing & Quality Assurance</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <RadioGroup
              value={quality.testing}
              onValueChange={(val) => updateQualityField('testing', val)}
              className="space-y-3 mt-2"
            >
              <div
                className={cn(
                  'flex items-start space-x-3 p-3 rounded-lg border-2 transition-all cursor-pointer',
                  quality.testing === 'none'
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                )}
                onClick={() => updateQualityField('testing', 'none')}
              >
                <RadioGroupItem value="none" id="test-none" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="test-none" className="font-medium cursor-pointer">
                    Keine
                  </Label>
                  <p className="text-sm text-white/70 mt-1">
                    Nur manuelle Entwickler-Tests
                  </p>
                </div>
              </div>

              <div
                className={cn(
                  'flex items-start space-x-3 p-3 rounded-lg border-2 transition-all cursor-pointer',
                  quality.testing === 'unit'
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                )}
                onClick={() => updateQualityField('testing', 'unit')}
              >
                <RadioGroupItem value="unit" id="test-unit" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="test-unit" className="font-medium cursor-pointer">
                    Unit Tests
                  </Label>
                  <p className="text-sm text-white/70 mt-1">
                    Automatisierte Unit-Tests für kritische Funktionen
                  </p>
                </div>
              </div>

              <div
                className={cn(
                  'flex items-start space-x-3 p-3 rounded-lg border-2 transition-all cursor-pointer',
                  quality.testing === 'e2e'
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                )}
                onClick={() => updateQualityField('testing', 'e2e')}
              >
                <RadioGroupItem value="e2e" id="test-e2e" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="test-e2e" className="font-medium cursor-pointer">
                    E2E Tests
                  </Label>
                  <p className="text-sm text-white/70 mt-1">
                    Unit + End-to-End Tests für User-Flows (Playwright/Cypress)
                  </p>
                </div>
              </div>

              <div
                className={cn(
                  'flex items-start space-x-3 p-3 rounded-lg border-2 transition-all cursor-pointer',
                  quality.testing === 'qa-process'
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                )}
                onClick={() => updateQualityField('testing', 'qa-process')}
              >
                <RadioGroupItem value="qa-process" id="test-qa" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="test-qa" className="font-medium cursor-pointer">
                    Full QA Process
                  </Label>
                  <p className="text-sm text-white/70 mt-1">
                    Comprehensive Testing: Unit, E2E, Integration, Performance, Security
                  </p>
                </div>
              </div>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>

        {/* 5. Accessibility */}
        <AccordionItem value="accessibility">
          <AccordionTrigger>
            <div className="flex items-center gap-3">
              <Eye className="h-5 w-5 text-primary-600" />
              <span className="font-medium">Barrierefreiheit (Accessibility)</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <RadioGroup
              value={quality.accessibility}
              onValueChange={(val) => updateQualityField('accessibility', val)}
              className="space-y-3 mt-2"
            >
              <div
                className={cn(
                  'flex items-start space-x-3 p-3 rounded-lg border-2 transition-all cursor-pointer',
                  quality.accessibility === 'none'
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                )}
                onClick={() => updateQualityField('accessibility', 'none')}
              >
                <RadioGroupItem value="none" id="a11y-none" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="a11y-none" className="font-medium cursor-pointer">
                    Keine
                  </Label>
                  <p className="text-sm text-white/70 mt-1">
                    Standard HTML ohne spezielle Accessibility-Features
                  </p>
                </div>
              </div>

              <div
                className={cn(
                  'flex items-start space-x-3 p-3 rounded-lg border-2 transition-all cursor-pointer',
                  quality.accessibility === 'wcag-aa'
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                )}
                onClick={() => updateQualityField('accessibility', 'wcag-aa')}
              >
                <RadioGroupItem value="wcag-aa" id="a11y-aa" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="a11y-aa" className="font-medium cursor-pointer">
                    WCAG 2.1 AA
                  </Label>
                  <p className="text-sm text-white/70 mt-1">
                    Semantic HTML, ARIA Labels, Keyboard Navigation, Kontrast-Ratios
                  </p>
                </div>
              </div>

              <div
                className={cn(
                  'flex items-start space-x-3 p-3 rounded-lg border-2 transition-all cursor-pointer',
                  quality.accessibility === 'wcag-aaa'
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300'
                )}
                onClick={() => updateQualityField('accessibility', 'wcag-aaa')}
              >
                <RadioGroupItem value="wcag-aaa" id="a11y-aaa" className="mt-1" />
                <div className="flex-1">
                  <Label htmlFor="a11y-aaa" className="font-medium cursor-pointer">
                    WCAG 2.1 AAA
                  </Label>
                  <p className="text-sm text-white/70 mt-1">
                    Höchste Accessibility-Standards, Screen Reader Testing, Zertifizierung
                  </p>
                </div>
              </div>
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Info Box */}
      <div className="mt-6 p-4 bg-white/10 border border-white/20 rounded-lg backdrop-blur-md">
        <p className="text-sm text-white">
          <span className="font-medium">Empfehlung:</span> Für professionelle Projekte empfehlen
          wir mindestens Basic SEO, Optimized Performance und WCAG AA Accessibility.
        </p>
      </div>
    </div>
  )
}
