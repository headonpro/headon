// Email-Templates für Kontaktanfragen

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
