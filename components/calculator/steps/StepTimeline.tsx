'use client'

/**
 * StepTimeline Component
 *
 * Step 5 of the cost calculator - Timeline & Support configuration.
 * Handles project start urgency, maintenance plans, support duration,
 * hosting, and training options.
 *
 * Features 5 sections with mixed input types:
 * - Project Start: Radio cards (flexible/normal/urgent with 1.3x multiplier)
 * - Maintenance: Radio cards (none/basic +150€/mo/premium +350€/mo)
 * - Support: Select dropdown (none/3/6/12 months with one-time costs)
 * - Hosting: Switch toggle (+50€/mo)
 * - Training: Checkbox (+800€ one-time)
 */

import { Zap, Calendar, Clock, Server, GraduationCap } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import type { CalculatorState } from '@/lib/calculator/types'
import { cn } from '@/lib/utils'

// ============================================================================
// Type Definitions
// ============================================================================

export interface StepTimelineProps {
  /** Current timeline state */
  timeline: CalculatorState['timeline']
  /** Callback for timeline state updates */
  onChange: (timeline: CalculatorState['timeline']) => void
}

// ============================================================================
// Component Implementation
// ============================================================================

export function StepTimeline({ timeline, onChange }: StepTimelineProps) {
  // Helper to update a single timeline field
  const updateTimelineField = (field: keyof typeof timeline, value: string | boolean) => {
    onChange({ ...timeline, [field]: value as never })
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2 text-white">Timeline & Support</h3>
        <p className="text-white/80">
          Konfigurieren Sie Zeitplan, Wartung und laufende Leistungen
        </p>
      </div>

      {/* 1. Project Start Urgency */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="h-5 w-5 text-white" />
          <Label className="text-base font-semibold text-white">Projektstart</Label>
        </div>

        <RadioGroup
          value={timeline.projectStart}
          onValueChange={(val) => updateTimelineField('projectStart', val)}
          className="grid gap-4 md:grid-cols-3"
        >
          {/* Flexible */}
          <div
            className={cn(
              'flex flex-col p-4 rounded-lg border-2 transition-all cursor-pointer backdrop-blur-md',
              timeline.projectStart === 'flexible'
                ? 'border-white/40 bg-white/20'
                : 'border-white/20 bg-white/10 hover:border-white/30 hover:bg-white/15'
            )}
            onClick={() => updateTimelineField('projectStart', 'flexible')}
          >
            <div className="flex items-start gap-3">
              <RadioGroupItem
                value="flexible"
                id="start-flexible"
                className="mt-0.5"
              />
              <div className="flex-1">
                <Label
                  htmlFor="start-flexible"
                  className="font-semibold cursor-pointer text-white"
                >
                  Flexibel
                </Label>
                <p className="text-sm text-white/70 mt-1">
                  Keine Eile, regulärer Zeitplan
                </p>
                <p className="text-xs text-white/60 mt-2 font-medium">
                  Standard-Preis
                </p>
              </div>
            </div>
          </div>

          {/* Normal */}
          <div
            className={cn(
              'flex flex-col p-4 rounded-lg border-2 transition-all cursor-pointer backdrop-blur-md',
              timeline.projectStart === 'normal'
                ? 'border-white/40 bg-white/20'
                : 'border-white/20 bg-white/10 hover:border-white/30 hover:bg-white/15'
            )}
            onClick={() => updateTimelineField('projectStart', 'normal')}
          >
            <div className="flex items-start gap-3">
              <RadioGroupItem value="normal" id="start-normal" className="mt-0.5" />
              <div className="flex-1">
                <Label htmlFor="start-normal" className="font-semibold cursor-pointer text-white">
                  Normal
                </Label>
                <p className="text-sm text-white/70 mt-1">
                  Zeitnaher Start, normale Priorität
                </p>
                <p className="text-xs text-white/60 mt-2 font-medium">
                  Standard-Preis
                </p>
              </div>
            </div>
          </div>

          {/* Urgent */}
          <div
            className={cn(
              'flex flex-col p-4 rounded-lg border-2 transition-all cursor-pointer relative',
              timeline.projectStart === 'urgent'
                ? 'border-orange-600 bg-orange-50'
                : 'border-gray-200 hover:border-orange-300'
            )}
            onClick={() => updateTimelineField('projectStart', 'urgent')}
          >
            <div className="flex items-start gap-3">
              <RadioGroupItem value="urgent" id="start-urgent" className="mt-0.5" />
              <div className="flex-1">
                <Label htmlFor="start-urgent" className="font-semibold cursor-pointer text-white">
                  Dringend 🔥
                </Label>
                <p className="text-sm text-white/70 mt-1">
                  Schnellstmöglicher Start
                </p>
                <p className="text-xs text-orange-600 mt-2 font-bold">
                  Express-Zuschlag
                </p>
              </div>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* 2. Maintenance Level */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="h-5 w-5 text-white" />
          <Label className="text-base font-semibold text-white">Wartung & Updates</Label>
          <span className="text-sm text-white/70 ml-auto">
            (monatliche Kosten)
          </span>
        </div>

        <RadioGroup
          value={timeline.maintenance}
          onValueChange={(val) => updateTimelineField('maintenance', val)}
          className="grid gap-4 md:grid-cols-3"
        >
          {/* None */}
          <div
            className={cn(
              'flex flex-col p-4 rounded-lg border-2 transition-all cursor-pointer backdrop-blur-md',
              timeline.maintenance === 'none'
                ? 'border-white/40 bg-white/20'
                : 'border-white/20 bg-white/10 hover:border-white/30 hover:bg-white/15'
            )}
            onClick={() => updateTimelineField('maintenance', 'none')}
          >
            <div className="flex items-start gap-3">
              <RadioGroupItem value="none" id="maint-none" className="mt-0.5" />
              <div className="flex-1">
                <Label htmlFor="maint-none" className="font-semibold cursor-pointer text-white">
                  Keine
                </Label>
                <p className="text-sm text-white/70 mt-1">
                  Selbstverwaltung, keine laufende Wartung
                </p>
                <p className="text-xs text-white/60 mt-2 font-medium">
                  Keine Wartungskosten
                </p>
              </div>
            </div>
          </div>

          {/* Basic */}
          <div
            className={cn(
              'flex flex-col p-4 rounded-lg border-2 transition-all cursor-pointer backdrop-blur-md',
              timeline.maintenance === 'basic'
                ? 'border-white/40 bg-white/20'
                : 'border-white/20 bg-white/10 hover:border-white/30 hover:bg-white/15'
            )}
            onClick={() => updateTimelineField('maintenance', 'basic')}
          >
            <div className="flex items-start gap-3">
              <RadioGroupItem value="basic" id="maint-basic" className="mt-0.5" />
              <div className="flex-1">
                <Label htmlFor="maint-basic" className="font-semibold cursor-pointer text-white">
                  Basic
                </Label>
                <p className="text-sm text-white/70 mt-1">
                  Security-Updates, Bug-Fixes, Monitoring
                </p>
                <p className="text-xs text-white/60 mt-2 font-medium">
                  Monatliche Wartung
                </p>
              </div>
            </div>
          </div>

          {/* Premium */}
          <div
            className={cn(
              'flex flex-col p-4 rounded-lg border-2 transition-all cursor-pointer backdrop-blur-md',
              timeline.maintenance === 'premium'
                ? 'border-white/40 bg-white/20'
                : 'border-white/20 bg-white/10 hover:border-white/30 hover:bg-white/15'
            )}
            onClick={() => updateTimelineField('maintenance', 'premium')}
          >
            <div className="flex items-start gap-3">
              <RadioGroupItem
                value="premium"
                id="maint-premium"
                className="mt-0.5"
              />
              <div className="flex-1">
                <Label
                  htmlFor="maint-premium"
                  className="font-semibold cursor-pointer text-white"
                >
                  Premium
                </Label>
                <p className="text-sm text-white/70 mt-1">
                  Updates, Optimierungen, Content-Pflege, Priority Support
                </p>
                <p className="text-xs text-white/60 mt-2 font-medium">
                  Umfassende Wartung
                </p>
              </div>
            </div>
          </div>
        </RadioGroup>
      </div>

      {/* 3. Support Duration */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="h-5 w-5 text-white" />
          <Label className="text-base font-semibold text-white">Support nach Launch</Label>
          <span className="text-sm text-white/70 ml-auto">
            (einmalige Kosten)
          </span>
        </div>

        <Select
          value={timeline.support}
          onValueChange={(val) => updateTimelineField('support', val)}
        >
          <SelectTrigger className="w-full h-auto p-4">
            <SelectValue placeholder="Support-Dauer wählen" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">
              <div className="flex flex-col items-start py-1">
                <span className="font-medium">Kein Support</span>
                <span className="text-sm text-white/70">
                  Nur Entwicklungsphase
                </span>
                <span className="text-xs text-white/60 mt-1">Kein Support</span>
              </div>
            </SelectItem>

            <SelectItem value="3-months">
              <div className="flex flex-col items-start py-1">
                <span className="font-medium">3 Monate Support</span>
                <span className="text-sm text-white/70">
                  3 Monate kostenloser Support nach Launch
                </span>
                <span className="text-xs text-white/60 mt-1 font-medium">
                  Kurzer Support-Zeitraum
                </span>
              </div>
            </SelectItem>

            <SelectItem value="6-months">
              <div className="flex flex-col items-start py-1">
                <span className="font-medium">6 Monate Support</span>
                <span className="text-sm text-white/70">
                  6 Monate Priority Support nach Launch
                </span>
                <span className="text-xs text-white/60 mt-1 font-medium">
                  Mittlerer Support-Zeitraum
                </span>
              </div>
            </SelectItem>

            <SelectItem value="12-months">
              <div className="flex flex-col items-start py-1">
                <span className="font-medium">12 Monate Support</span>
                <span className="text-sm text-white/70">
                  1 Jahr Premium Support nach Launch
                </span>
                <span className="text-xs text-white/60 mt-1 font-medium">
                  Langer Support-Zeitraum
                </span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 4. Managed Hosting */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-3">
          <Server className="h-5 w-5 text-white" />
          <Label className="text-base font-semibold text-white">Zusätzliche Leistungen</Label>
        </div>

        <div
          className={cn(
            'flex items-center justify-between p-4 rounded-lg border-2 transition-all cursor-pointer',
            timeline.hosting
              ? 'border-primary-600 bg-primary-50'
              : 'border-gray-200 hover:border-primary-300'
          )}
          onClick={() => updateTimelineField('hosting', !timeline.hosting)}
        >
          <div className="flex items-start gap-3 flex-1">
            <Server className="h-5 w-5 text-white mt-1 flex-shrink-0" />
            <div className="flex-1">
              <Label className="font-semibold cursor-pointer text-white">Managed Hosting</Label>
              <p className="text-sm text-white/70 mt-1">
                Vollverwaltetes Hosting inkl. SSL, Backups, Updates, Monitoring
              </p>
              <p className="text-xs text-white/60 mt-2 font-medium">
                Monatliche Hosting-Gebühr
              </p>
            </div>
          </div>
          <Switch
            checked={timeline.hosting}
            onCheckedChange={(checked) => updateTimelineField('hosting', checked)}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>

      {/* 5. Training */}
      <div
        className={cn(
          'flex items-start gap-3 p-4 rounded-lg border-2 transition-all cursor-pointer',
          timeline.training
            ? 'border-primary-600 bg-primary-50'
            : 'border-gray-200 hover:border-primary-300'
        )}
        onClick={() => updateTimelineField('training', !timeline.training)}
      >
        <Checkbox
          checked={timeline.training}
          onCheckedChange={(checked) => updateTimelineField('training', checked)}
          onClick={(e) => e.stopPropagation()}
          className="mt-0.5"
        />
        <div className="flex items-start gap-3 flex-1">
          <GraduationCap className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <Label className="font-semibold cursor-pointer text-white">Team-Schulung</Label>
            <p className="text-sm text-white/70 mt-1">
              2-stündige Einführung für Ihr Team (CMS, Administration, Best Practices)
            </p>
            <p className="text-xs text-white/60 mt-2 font-medium">
              Einmalige Schulungsgebühr
            </p>
          </div>
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-6 p-4 bg-white/10 border border-white/20 rounded-lg backdrop-blur-md">
        <p className="text-sm text-white">
          <span className="font-medium">💡 Hinweis:</span> Die Kostenschätzung wird live in der Übersicht
          rechts aktualisiert. Wählen Sie nur die Leistungen, die Sie wirklich benötigen.
        </p>
      </div>
    </div>
  )
}
