import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { calculatorAPISchema } from '@/lib/calculator/validation-schemas'
import {
  createCalculatorResultEmail,
  createCalculatorNotificationEmail,
} from '@/lib/email-templates'
import type { LeadData, ComparisonResult, CalculatorState } from '@/lib/calculator/types'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validierung mit Zod Schema
    const validationResult = calculatorAPISchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Ungültige Eingabedaten',
          details: validationResult.error.issues,
        },
        { status: 400 }
      )
    }

    const { leadData, calculatorData, comparisonResult } = validationResult.data

    // Lead Score berechnen
    const lead_score = calculateLeadScore(leadData, calculatorData, comparisonResult)

    // Geschätzter Projektwert (HEADON Durchschnittspreis)
    const estimated_value = comparisonResult.headon.price.avg

    // Server-seitiger Supabase Client mit Service Role Key
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Supabase configuration missing')
      return NextResponse.json({ error: 'Server-Konfigurationsfehler' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    // Lead-Daten für die Datenbank vorbereiten
    const leadRecord = {
      name: leadData.name,
      email: leadData.email,
      phone: leadData.phone || null,
      company: leadData.company || null,
      message: leadData.message || null,
      calculator_data: calculatorData,
      comparison_result: comparisonResult,
      preferred_provider: leadData.preferredProvider,
      lead_score,
      estimated_value,
      status: 'new' as const,
      created_at: new Date().toISOString(),
    }

    // In Supabase speichern
    const { data: savedLead, error: dbError } = await supabase
      .from('calculator_leads')
      .insert([leadRecord])
      .select()
      .single()

    if (dbError) {
      console.error('Supabase error:', dbError)
      return NextResponse.json(
        { error: 'Fehler beim Speichern der Anfrage' },
        { status: 500 }
      )
    }

    // Email-Benachrichtigungen senden (nicht blockierend)
    try {
      await sendEmails(leadData, comparisonResult, lead_score)
      console.log('Emails successfully sent via Resend API')
    } catch (emailError) {
      console.error('Email error:', emailError)
      // Nicht blockieren - Lead ist bereits gespeichert
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Anfrage erfolgreich gesendet',
        leadId: savedLead.id,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Ein unerwarteter Fehler ist aufgetreten' },
      { status: 500 }
    )
  }
}

/**
 * Berechnet Lead Score basierend auf:
 * - Budget (geschätzter Projektwert): hoch = +15
 * - Timeline: urgent = +10
 * - Features: +1 pro aktiviertem Feature
 * - Preferred Provider: HEADON = +10
 */
function calculateLeadScore(
  leadData: LeadData,
  calculatorData: CalculatorState,
  comparisonResult: ComparisonResult
): number {
  let score = 0

  // Budget Score: Basiert auf geschätztem Projektwert (HEADON Durchschnittspreis)
  const estimatedValue = comparisonResult.headon.price.avg
  if (estimatedValue > 50000) {
    score += 15 // Sehr hoher Wert
  } else if (estimatedValue > 25000) {
    score += 10 // Hoher Wert
  } else if (estimatedValue > 10000) {
    score += 5 // Mittlerer Wert
  }

  // Timeline Score: Urgent = +10
  if (calculatorData.timeline?.projectStart === 'urgent') {
    score += 10
  } else if (calculatorData.timeline?.projectStart === 'normal') {
    score += 5
  }

  // Features Score: +1 pro aktiviertem Feature
  if (calculatorData.features) {
    const features = calculatorData.features
    const featureCount =
      (features.cms ? 1 : 0) +
      (features.auth ? 1 : 0) +
      (features.database ? 1 : 0) +
      (features.payment ? 1 : 0) +
      (features.api ? 1 : 0) +
      (features.thirdPartyIntegrations ? 1 : 0) +
      (features.fileUploads ? 1 : 0) +
      (features.i18n ? 1 : 0) +
      (features.adminDashboard ? 1 : 0) +
      (features.realtime ? 1 : 0)

    score += featureCount
  }

  // Preferred Provider Score: HEADON = +10
  if (leadData.preferredProvider === 'headon') {
    score += 10
  }

  return score
}

/**
 * Sendet beide Emails: User-Bestätigung und Team-Benachrichtigung
 */
async function sendEmails(
  leadData: LeadData,
  comparison: ComparisonResult,
  leadScore: number
) {
  const resendApiKey = process.env.RESEND_API_KEY

  if (!resendApiKey) {
    throw new Error('RESEND_API_KEY not configured')
  }

  const resend = new Resend(resendApiKey)

  // 1. User-Bestätigungsmail mit Calculator-Ergebnis
  const userEmailHtml = createCalculatorResultEmail(leadData, comparison)

  await resend.emails.send({
    from: 'hallo@headon.pro',
    to: leadData.email,
    subject: `Ihre Kostenschätzung von HEADON.pro`,
    html: userEmailHtml,
    replyTo: 'hallo@headon.pro',
  })

  // 2. Team-Benachrichtigung mit Lead-Details
  const teamEmailHtml = createCalculatorNotificationEmail(leadData, comparison)

  // Priority-Level für Subject
  const priorityLevel =
    leadScore > 40 ? '🔥 HIGH PRIORITY' : leadScore > 25 ? '⚡ MEDIUM' : '📝 STANDARD'

  await resend.emails.send({
    from: 'hallo@headon.pro',
    to: process.env.NOTIFICATION_EMAIL || 'hallo@headon.pro',
    subject: `${priorityLevel} Neuer Calculator Lead von ${leadData.name} (Score: ${leadScore})`,
    html: teamEmailHtml,
    replyTo: leadData.email,
  })
}
