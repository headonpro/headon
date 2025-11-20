'use client'

/**
 * StepDesignScope Component
 *
 * Step 2 of the cost calculator - Design & Scope configuration.
 * Allows selection of design level, page count, responsiveness, and UX complexity.
 * Uses partial state updates to maintain other calculator state values.
 */

import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RangeSlider } from '@/components/calculator/shared/RangeSlider'
import type {
  DesignLevel,
  PageRange,
  ResponsivenessLevel,
  UXComplexity,
  CalculatorState,
} from '@/lib/calculator/types'
import { cn } from '@/lib/utils'

// ============================================================================
// Type Definitions
// ============================================================================

export interface StepDesignScopeProps {
  /** Current design level selection */
  designLevel: DesignLevel
  /** Current page range selection */
  pageRange: PageRange
  /** Current responsiveness level */
  responsiveness: ResponsivenessLevel
  /** Current UX complexity level */
  uxComplexity: UXComplexity
  /** Callback for partial state updates */
  onChange: (updates: Partial<CalculatorState>) => void
}

// ============================================================================
// Configuration Data
// ============================================================================

const designLevels = [
  {
    value: 'template' as const,
    label: 'Template',
    description: 'Vorgefertigte Templates angepasst',
  },
  {
    value: 'custom' as const,
    label: 'Custom Design',
    description: 'Individuelles Design nach Ihren Wünschen',
  },
  {
    value: 'premium' as const,
    label: 'Premium',
    description: 'Exklusives High-End Design mit Animationen',
  },
]

const uxComplexityOptions = [
  {
    value: 'standard' as const,
    label: 'Standard',
    description: 'Einfache Navigation und Layouts',
  },
  {
    value: 'advanced' as const,
    label: 'Advanced',
    description: 'Komplexere Interaktionen und Animationen',
  },
  {
    value: 'premium' as const,
    label: 'Premium',
    description: 'Hochwertige Micro-Interactions und UX-Optimierung',
  },
]

// Page range options for slider
const pageRangeOptions: PageRange[] = ['1-5', '6-15', '16-30', '30+']
const pageRangeLabels = ['1-5 Seiten', '6-15 Seiten', '16-30 Seiten', '30+ Seiten']

// ============================================================================
// Component Implementation
// ============================================================================

export function StepDesignScope({
  designLevel,
  pageRange,
  responsiveness,
  uxComplexity,
  onChange,
}: StepDesignScopeProps) {
  // Helper functions for page range slider
  const pageRangeToValue = (range: PageRange): number => pageRangeOptions.indexOf(range)
  const valueToPageRange = (value: number): PageRange => pageRangeOptions[value]

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2 text-white">Design & Umfang</h3>
        <p className="text-white/80">
          Definieren Sie Design-Level, Seitenanzahl und Responsiveness
        </p>
      </div>

      {/* Section 1: Design Level - Radio Cards */}
      <div className="space-y-3">
        <Label className="text-base font-semibold text-white">Design-Level</Label>
        <div className="grid gap-3 md:grid-cols-3">
          {designLevels.map((level) => (
            <div
              key={level.value}
              onClick={() =>
                onChange({
                  design: {
                    level: level.value,
                    pageRange,
                    responsiveness,
                    uxComplexity,
                  },
                })
              }
              className={cn(
                'relative cursor-pointer rounded-lg p-4 border-2 transition-all',
                designLevel === level.value
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200 hover:border-primary-300'
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                {/* Radio Circle Indicator */}
                <div
                  className={cn(
                    'h-4 w-4 rounded-full border-2 flex items-center justify-center',
                    designLevel === level.value ? 'border-primary-600' : 'border-gray-300'
                  )}
                >
                  {designLevel === level.value && (
                    <div className="h-2 w-2 rounded-full bg-primary-600" />
                  )}
                </div>
                <span className="font-semibold">{level.label}</span>
              </div>
              <p className="text-sm text-white/70">{level.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Page Range - Custom Slider */}
      <div className="space-y-3">
        <Label className="text-base font-semibold text-white">Anzahl der Seiten</Label>
        <RangeSlider
          value={pageRangeToValue(pageRange)}
          onChange={(val) =>
            onChange({
              design: {
                level: designLevel,
                pageRange: valueToPageRange(val),
                responsiveness,
                uxComplexity,
              },
            })
          }
          min={0}
          max={3}
          step={1}
          labels={pageRangeLabels}
          formatLabel={(val) => pageRangeOptions[val]}
        />
      </div>

      {/* Section 3: Responsiveness - Select Dropdown */}
      <div className="space-y-3">
        <Label className="text-base font-semibold text-white">Responsiveness</Label>
        <Select
          value={responsiveness}
          onValueChange={(val) =>
            onChange({
              design: {
                level: designLevel,
                pageRange,
                responsiveness: val as ResponsivenessLevel,
                uxComplexity,
              },
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Wählen Sie Responsiveness-Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desktop-only">
              <div>
                <div className="font-medium">Nur Desktop</div>
                <div className="text-xs text-white/70">
                  Optimiert für Desktop-Browser
                </div>
              </div>
            </SelectItem>
            <SelectItem value="responsive">
              <div>
                <div className="font-medium">Responsive (empfohlen)</div>
                <div className="text-xs text-white/70">
                  Optimiert für alle Geräte (Desktop, Tablet, Mobile)
                </div>
              </div>
            </SelectItem>
            <SelectItem value="pwa">
              <div>
                <div className="font-medium">Progressive Web App (PWA)</div>
                <div className="text-xs text-white/70">
                  Voll responsive + App-Funktionen (Offline, Push)
                </div>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Section 4: UX Complexity - Radio Group */}
      <div className="space-y-3">
        <Label className="text-base font-semibold text-white">UX-Komplexität</Label>
        <RadioGroup
          value={uxComplexity}
          onValueChange={(val) =>
            onChange({
              design: {
                level: designLevel,
                pageRange,
                responsiveness,
                uxComplexity: val as UXComplexity,
              },
            })
          }
          className="space-y-3"
        >
          {uxComplexityOptions.map((option) => (
            <div
              key={option.value}
              className={cn(
                'flex items-start space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer',
                uxComplexity === option.value
                  ? 'border-primary-600 bg-primary-50'
                  : 'border-gray-200 hover:border-primary-300'
              )}
              onClick={() =>
                onChange({
                  design: {
                    level: designLevel,
                    pageRange,
                    responsiveness,
                    uxComplexity: option.value,
                  },
                })
              }
            >
              <RadioGroupItem value={option.value} id={`ux-${option.value}`} />
              <div className="flex-1">
                <Label
                  htmlFor={`ux-${option.value}`}
                  className="font-medium cursor-pointer"
                >
                  {option.label}
                </Label>
                <p className="text-sm text-white/70 mt-1">
                  {option.description}
                </p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}
