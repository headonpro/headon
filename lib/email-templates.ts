// Email-Templates für Kontaktanfragen

import type { ComparisonResult, LeadData as CalculatorLeadData } from './calculator/types'
import { formatCurrency, formatPriceRange, formatDuration } from './calculator/utils'

interface LeadData {
  name: string
  email: string
  company?: string | null
  phone?: string | null
  project_type: string
  budget: string
  timeline: string
  message: string
  lead_score: number
  files?: {
    count: number
    names: string[]
  } | null
}

export function createContactEmailTemplate(leadData: LeadData): string {
  const priorityLevel =
    leadData.lead_score > 30
      ? '🔥 HIGH PRIORITY'
      : leadData.lead_score > 15
        ? '⚡ MEDIUM'
        : '📝 STANDARD'

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Neue Kontaktanfrage - HEADON.pro</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
        .content { background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; }
        .footer { background: #1f2937; color: white; padding: 15px; border-radius: 0 0 8px 8px; text-align: center; font-size: 14px; }
        .score-badge { display: inline-block; background: #10b981; color: white; padding: 4px 12px; border-radius: 20px; font-weight: bold; font-size: 12px; margin-left: 10px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
        .info-item { background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #3b82f6; }
        .label { font-weight: 600; color: #374151; margin-bottom: 5px; }
        .value { color: #6b7280; }
        .message-box { background: white; padding: 20px; border-radius: 6px; margin: 20px 0; border: 1px solid #e5e7eb; }
        .priority-high { background: #fef2f2; border-left-color: #ef4444; }
        .priority-medium { background: #fffbeb; border-left-color: #f59e0b; }
        .priority-standard { background: #f0f9ff; border-left-color: #3b82f6; }
        @media (max-width: 600px) { .info-grid { grid-template-columns: 1fr; } }
      </style>
    </head>
    <body>
      <div class="header">
        <h1 style="margin: 0; font-size: 24px;">🚀 Neue Kontaktanfrage</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">HEADON.pro Marketing Agency</p>
      </div>

      <div class="content">
        <div style="text-align: center; margin-bottom: 25px;">
          <h2 style="margin: 0; color: #1f2937;">
            ${priorityLevel}
            <span class="score-badge">Score: ${leadData.lead_score}</span>
          </h2>
        </div>

        <div class="info-grid">
          <div class="info-item">
            <div class="label">👤 Name</div>
            <div class="value">${leadData.name}</div>
          </div>
          <div class="info-item">
            <div class="label">📧 Email</div>
            <div class="value"><a href="mailto:${leadData.email}" style="color: #3b82f6; text-decoration: none;">${leadData.email}</a></div>
          </div>
          <div class="info-item">
            <div class="label">🏢 Unternehmen</div>
            <div class="value">${leadData.company || 'Nicht angegeben'}</div>
          </div>
          <div class="info-item">
            <div class="label">📱 Telefon</div>
            <div class="value">${leadData.phone ? `<a href="tel:${leadData.phone}" style="color: #3b82f6; text-decoration: none;">${leadData.phone}</a>` : 'Nicht angegeben'}</div>
          </div>
          <div class="info-item">
            <div class="label">🎯 Projekttyp</div>
            <div class="value">${leadData.project_type}</div>
          </div>
          <div class="info-item">
            <div class="label">💰 Budget</div>
            <div class="value">${leadData.budget}</div>
          </div>
          <div class="info-item">
            <div class="label">⏰ Zeitrahmen</div>
            <div class="value">${leadData.timeline}</div>
          </div>
          <div class="info-item">
            <div class="label">📊 Lead Score</div>
            <div class="value">${leadData.lead_score} Punkte</div>
          </div>
        </div>

        <div class="message-box">
          <div class="label">💬 Nachricht</div>
          <div style="margin-top: 10px; white-space: pre-wrap;">${leadData.message}</div>
        </div>

        ${
          leadData.files
            ? `
        <div class="info-item">
          <div class="label">📎 Dateien (${leadData.files.count})</div>
          <div class="value">${leadData.files.names.join(', ')}</div>
        </div>
        `
            : ''
        }

        <div style="margin-top: 30px; text-align: center;">
          <a href="mailto:${leadData.email}?subject=Re: Ihre Anfrage bei HEADON.pro"
             style="background: #3b82f6; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block; font-weight: 600;">
            ↩️ Antworten
          </a>
        </div>
      </div>

      <div class="footer">
        <p style="margin: 0;">Gesendet über das Kontaktformular von <strong>HEADON.pro</strong></p>
        <p style="margin: 5px 0 0 0; opacity: 0.8;">Zeitstempel: ${new Date().toLocaleString('de-DE')}</p>
      </div>
    </body>
    </html>
  `
}

// ============================================================================
// Calculator Email Templates
// ============================================================================

/**
 * Creates confirmation email for user with calculator results
 * Includes project summary, 3-way comparison, savings, and CTA to book call
 */
export function createCalculatorResultEmail(
  leadData: CalculatorLeadData,
  comparison: ComparisonResult
): string {
  const { freelancer, agency, headon, savings } = comparison
  const priceSavingsVsAgency = formatCurrency(savings.vsAgency.price)
  const timeSavingsVsAgency = `${savings.vsAgency.time} Wochen`

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Ihre Kostenschätzung - HEADON.pro</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 650px; margin: 0 auto; padding: 20px; background: #f9fafb; }
        .header { background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
        .content { background: white; padding: 30px; border: 1px solid #e5e7eb; }
        .footer { background: #1f2937; color: white; padding: 20px; border-radius: 0 0 8px 8px; text-align: center; font-size: 14px; }
        .comparison-table { width: 100%; border-collapse: collapse; margin: 25px 0; }
        .comparison-table th { background: #f3f4f6; padding: 12px; text-align: left; font-weight: 600; border-bottom: 2px solid #e5e7eb; }
        .comparison-table td { padding: 12px; border-bottom: 1px solid #e5e7eb; }
        .comparison-table tr.headon-row { background: #eff6ff; border-left: 4px solid #3b82f6; }
        .savings-box { background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%); border: 2px solid #10b981; border-radius: 8px; padding: 20px; text-align: center; margin: 25px 0; }
        .savings-box h3 { margin: 0 0 10px 0; color: #065f46; font-size: 20px; }
        .savings-amount { font-size: 32px; font-weight: bold; color: #10b981; margin: 10px 0; }
        .cta-button { display: inline-block; background: #3b82f6; color: white; padding: 15px 30px; border-radius: 8px; text-decoration: none; font-weight: 600; margin: 20px 0; }
        .cta-button:hover { background: #2563eb; }
        .breakdown-section { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .breakdown-item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
        .pro-con-list { margin: 15px 0; }
        .pro-item { color: #059669; padding: 5px 0; }
        .con-item { color: #dc2626; padding: 5px 0; }
        @media (max-width: 600px) {
          body { padding: 10px; }
          .comparison-table { font-size: 13px; }
          .comparison-table th, .comparison-table td { padding: 8px; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1 style="margin: 0; font-size: 28px;">✨ Ihre persönliche Kostenschätzung</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.95; font-size: 16px;">Vielen Dank für Ihr Interesse, ${leadData.name}!</p>
      </div>

      <div class="content">
        <p style="font-size: 16px; margin-top: 0;">
          Hallo ${leadData.name},
        </p>
        <p>
          vielen Dank, dass Sie unseren Kostenrechner genutzt haben! Nachfolgend finden Sie Ihre persönliche
          Kostenschätzung basierend auf Ihren Projektanforderungen.
        </p>

        <div class="savings-box">
          <h3>💰 Ihr Einsparpotenzial mit HEADON</h3>
          <div class="savings-amount">${priceSavingsVsAgency}</div>
          <p style="margin: 5px 0; color: #065f46; font-weight: 600;">
            Ersparnis gegenüber klassischen Agenturen<br>
            <span style="font-size: 14px;">+ ${timeSavingsVsAgency} schnellere Umsetzung</span>
          </p>
        </div>

        <h2 style="color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
          📊 3-Wege-Preisvergleich
        </h2>

        <table class="comparison-table">
          <thead>
            <tr>
              <th>Anbieter</th>
              <th>Preis</th>
              <th>Dauer</th>
              <th>Qualität</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Freelancer</strong></td>
              <td>${formatPriceRange(freelancer.price)}</td>
              <td>${formatDuration(freelancer.duration)}</td>
              <td>${'⭐'.repeat(freelancer.quality)}</td>
            </tr>
            <tr>
              <td><strong>Agentur</strong></td>
              <td>${formatPriceRange(agency.price)}</td>
              <td>${formatDuration(agency.duration)}</td>
              <td>${'⭐'.repeat(agency.quality)}</td>
            </tr>
            <tr class="headon-row">
              <td><strong>🚀 HEADON (Empfohlen)</strong></td>
              <td><strong>${formatPriceRange(headon.price)}</strong></td>
              <td><strong>${formatDuration(headon.duration)}</strong></td>
              <td><strong>${'⭐'.repeat(headon.quality)}</strong></td>
            </tr>
          </tbody>
        </table>

        <h3 style="color: #1f2937; margin-top: 30px;">✅ Warum HEADON?</h3>
        <div class="pro-con-list">
          ${headon.pros.map((pro) => `<div class="pro-item">✓ ${pro}</div>`).join('')}
        </div>

        <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px;">
          <p style="margin: 0; color: #92400e;">
            <strong>💡 Wichtig:</strong> Dies ist eine automatische Kostenschätzung.
            Für ein präzises, auf Ihr Projekt zugeschnittenes Angebot vereinbaren Sie gerne ein
            kostenloses Erstgespräch mit uns.
          </p>
        </div>

        <div style="text-align: center; margin: 35px 0;">
          <a href="https://headon.pro/contact" class="cta-button">
            📅 Kostenloses Beratungsgespräch buchen
          </a>
          <p style="font-size: 14px; color: #6b7280; margin-top: 10px;">
            In 15 Minuten klären wir Ihre Fragen und erstellen ein maßgeschneidertes Angebot
          </p>
        </div>

        <p style="margin-top: 30px;">
          Bei Fragen stehen wir Ihnen jederzeit gerne zur Verfügung!
        </p>
        <p style="margin-bottom: 0;">
          Beste Grüße,<br>
          <strong>Ihr HEADON Team</strong>
        </p>
      </div>

      <div class="footer">
        <p style="margin: 0 0 10px 0;"><strong>HEADON.pro</strong> – Digitale Lösungen für Ihren Erfolg</p>
        <p style="margin: 0; opacity: 0.8; font-size: 13px;">
          📧 <a href="mailto:hallo@headon.pro" style="color: #93c5fd; text-decoration: none;">hallo@headon.pro</a> |
          🌐 <a href="https://headon.pro" style="color: #93c5fd; text-decoration: none;">headon.pro</a>
        </p>
      </div>
    </body>
    </html>
  `
}

/**
 * Creates notification email for HEADON team with lead details and calculator data
 * Includes lead score badge, full calculator state, and comparison results
 */
export function createCalculatorNotificationEmail(
  leadData: CalculatorLeadData,
  comparison: ComparisonResult
): string {
  const { freelancer, agency, headon, savings } = comparison

  // Determine priority level and color based on lead score
  const leadScore = 0 // Will be calculated in API route
  const priorityLevel =
    leadScore > 40
      ? { label: '🔥 HIGH PRIORITY', color: '#dc2626', bgColor: '#fee2e2' }
      : leadScore > 25
        ? { label: '⚡ MEDIUM', color: '#f59e0b', bgColor: '#fef3c7' }
        : { label: '📝 STANDARD', color: '#3b82f6', bgColor: '#dbeafe' }

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Neuer Calculator Lead - HEADON.pro</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 700px; margin: 0 auto; padding: 20px; background: #f9fafb; }
        .header { background: linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%); color: white; padding: 25px; border-radius: 8px 8px 0 0; text-align: center; }
        .content { background: white; padding: 30px; border: 1px solid #e5e7eb; }
        .footer { background: #1f2937; color: white; padding: 15px; border-radius: 0 0 8px 8px; text-align: center; font-size: 13px; }
        .priority-badge { display: inline-block; padding: 8px 16px; border-radius: 6px; font-weight: bold; font-size: 14px; margin: 10px 0; }
        .score-badge { display: inline-block; background: #10b981; color: white; padding: 6px 14px; border-radius: 20px; font-weight: bold; font-size: 16px; margin-left: 15px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
        .info-item { background: #f9fafb; padding: 15px; border-radius: 6px; border-left: 4px solid #8b5cf6; }
        .label { font-weight: 600; color: #4b5563; font-size: 13px; margin-bottom: 5px; text-transform: uppercase; }
        .value { color: #1f2937; font-size: 15px; }
        .comparison-table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px; }
        .comparison-table th { background: #f3f4f6; padding: 10px; text-align: left; font-weight: 600; border-bottom: 2px solid #d1d5db; }
        .comparison-table td { padding: 10px; border-bottom: 1px solid #e5e7eb; }
        .comparison-table tr.preferred { background: #eff6ff; font-weight: 600; }
        .savings-highlight { background: #d1fae5; border-left: 4px solid #10b981; padding: 15px; margin: 20px 0; border-radius: 4px; }
        .calculator-data { background: #f9fafb; padding: 15px; border-radius: 6px; margin: 15px 0; font-size: 13px; max-height: 300px; overflow-y: auto; }
        .section-title { color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; margin: 25px 0 15px 0; font-size: 18px; }
        .cta-button { display: inline-block; background: #8b5cf6; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin: 15px 0; }
        @media (max-width: 600px) {
          .info-grid { grid-template-columns: 1fr; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1 style="margin: 0; font-size: 26px;">🎯 Neuer Calculator Lead</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.95;">Kostenrechner Anfrage</p>
      </div>

      <div class="content">
        <div style="text-align: center;">
          <div class="priority-badge" style="background-color: ${priorityLevel.bgColor}; color: ${priorityLevel.color}; border: 2px solid ${priorityLevel.color};">
            ${priorityLevel.label}
          </div>
          <span class="score-badge">Lead Score: ${leadScore}</span>
        </div>

        <h2 class="section-title">👤 Lead Informationen</h2>
        <div class="info-grid">
          <div class="info-item">
            <div class="label">Name</div>
            <div class="value">${leadData.name}</div>
          </div>
          <div class="info-item">
            <div class="label">Email</div>
            <div class="value"><a href="mailto:${leadData.email}" style="color: #8b5cf6; text-decoration: none;">${leadData.email}</a></div>
          </div>
          <div class="info-item">
            <div class="label">Telefon</div>
            <div class="value">${leadData.phone || 'Nicht angegeben'}</div>
          </div>
          <div class="info-item">
            <div class="label">Unternehmen</div>
            <div class="value">${leadData.company || 'Nicht angegeben'}</div>
          </div>
          <div class="info-item">
            <div class="label">Bevorzugter Anbieter</div>
            <div class="value"><strong>${leadData.preferredProvider === 'headon' ? '🚀 HEADON' : leadData.preferredProvider === 'agency' ? 'Agentur' : 'Freelancer'}</strong></div>
          </div>
          <div class="info-item">
            <div class="label">Geschätzter Projektwert</div>
            <div class="value"><strong>${formatPriceRange(headon.price)}</strong></div>
          </div>
        </div>

        ${
          leadData.message
            ? `
        <div style="background: #fef9c3; border-left: 4px solid #facc15; padding: 15px; border-radius: 4px; margin: 20px 0;">
          <div class="label" style="margin-bottom: 8px;">💬 Nachricht vom Lead</div>
          <div style="white-space: pre-wrap; color: #1f2937;">${leadData.message}</div>
        </div>
        `
            : ''
        }

        <h2 class="section-title">💰 Preisvergleich & Einsparungen</h2>

        <div class="savings-highlight">
          <strong style="color: #065f46; font-size: 16px;">
            💎 HEADON Vorteil: ${formatCurrency(savings.vsAgency.price)} günstiger als Agenturen
            (${savings.vsAgency.time} Wochen schneller)
          </strong>
        </div>

        <table class="comparison-table">
          <thead>
            <tr>
              <th>Anbieter</th>
              <th>Preis</th>
              <th>Dauer</th>
              <th>Qualität</th>
            </tr>
          </thead>
          <tbody>
            <tr ${leadData.preferredProvider === 'freelancer' ? 'class="preferred"' : ''}>
              <td>Freelancer</td>
              <td>${formatPriceRange(freelancer.price)}</td>
              <td>${formatDuration(freelancer.duration)}</td>
              <td>${'⭐'.repeat(freelancer.quality)}</td>
            </tr>
            <tr ${leadData.preferredProvider === 'agency' ? 'class="preferred"' : ''}>
              <td>Agentur</td>
              <td>${formatPriceRange(agency.price)}</td>
              <td>${formatDuration(agency.duration)}</td>
              <td>${'⭐'.repeat(agency.quality)}</td>
            </tr>
            <tr ${leadData.preferredProvider === 'headon' ? 'class="preferred"' : ''}>
              <td><strong>HEADON</strong></td>
              <td><strong>${formatPriceRange(headon.price)}</strong></td>
              <td><strong>${formatDuration(headon.duration)}</strong></td>
              <td><strong>${'⭐'.repeat(headon.quality)}</strong></td>
            </tr>
          </tbody>
        </table>

        <h2 class="section-title">📋 Calculator Daten (JSON)</h2>
        <div class="calculator-data">
          <strong>Lead Data:</strong>
          <pre style="margin: 5px 0; overflow-x: auto;">${JSON.stringify(leadData, null, 2)}</pre>

          <strong style="display: block; margin-top: 15px;">Comparison Result:</strong>
          <pre style="margin: 5px 0; overflow-x: auto;">${JSON.stringify(comparison, null, 2)}</pre>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="mailto:${leadData.email}?subject=Re: Ihre Kostenrechner-Anfrage bei HEADON.pro" class="cta-button">
            ↩️ Lead kontaktieren
          </a>
        </div>

        <div style="background: #dbeafe; border-left: 4px solid #3b82f6; padding: 15px; border-radius: 4px; margin-top: 20px;">
          <strong style="color: #1e40af;">⚡ Nächste Schritte:</strong>
          <ol style="margin: 10px 0 0 0; padding-left: 20px; color: #1f2937;">
            <li>Lead innerhalb von 24h kontaktieren</li>
            <li>Beratungsgespräch vereinbaren</li>
            <li>Detailliertes Angebot erstellen</li>
            <li>In Supabase als "contacted" markieren</li>
          </ol>
        </div>
      </div>

      <div class="footer">
        <p style="margin: 0;">Automatische Benachrichtigung vom Kostenrechner</p>
        <p style="margin: 5px 0 0 0; opacity: 0.8;">Zeitstempel: ${new Date().toLocaleString('de-DE')}</p>
      </div>
    </body>
    </html>
  `
}
