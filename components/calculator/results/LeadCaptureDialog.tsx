'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Mail } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { CalculatorState, ComparisonResult, LeadData } from '@/lib/calculator/types'
import { leadCaptureSchema } from '@/lib/calculator/validation-schemas'

interface LeadCaptureDialogProps {
  state: CalculatorState
  comparison: ComparisonResult
  onSubmit: (leadData: LeadData) => Promise<void>
}

export function LeadCaptureDialog({ onSubmit }: LeadCaptureDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<LeadData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferredProvider: 'headon',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    // Client-side validation with Zod
    const validation = leadCaptureSchema.safeParse(formData)

    if (!validation.success) {
      const fieldErrors: Record<string, string> = {}
      validation.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message
        }
      })
      setErrors(fieldErrors)
      toast.error('Bitte überprüfen Sie Ihre Eingaben')
      return
    }

    setIsSubmitting(true)

    try {
      await onSubmit(validation.data)
      setIsOpen(false)
      // Clear form on success
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        preferredProvider: 'headon',
      })
      toast.success('Vielen Dank! Wir melden uns innerhalb von 24 Stunden.')
    } catch (error) {
      console.error('Lead submission error:', error)
      toast.error('Fehler beim Senden. Bitte versuchen Sie es erneut.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="w-full gap-2">
          <Mail className="h-5 w-5" />
          Detailliertes Angebot per E-Mail
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Kostenloses Angebot anfordern</DialogTitle>
          <DialogDescription>
            Wir senden Ihnen Ihre persönliche Kostenschätzung per E-Mail zu.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">E-Mail *</Label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Telefon (optional)</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className={errors.phone ? 'border-red-500' : ''}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
            )}
          </div>

          <div>
            <Label htmlFor="message">Zusätzliche Informationen (optional)</Label>
            <Textarea
              id="message"
              rows={3}
              value={formData.message || ''}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={errors.message ? 'border-red-500' : ''}
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-500">{errors.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="preferredProvider">Bevorzugter Anbieter</Label>
            <Select
              value={formData.preferredProvider}
              onValueChange={(val) =>
                setFormData({ ...formData, preferredProvider: val as LeadData['preferredProvider'] })
              }
            >
              <SelectTrigger id="preferredProvider">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="freelancer">Freelancer</SelectItem>
                <SelectItem value="agency">Agentur</SelectItem>
                <SelectItem value="headon">HEADON (empfohlen)</SelectItem>
              </SelectContent>
            </Select>
            {errors.preferredProvider && (
              <p className="mt-1 text-sm text-red-500">{errors.preferredProvider}</p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? 'Wird gesendet...' : 'Angebot anfordern'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
