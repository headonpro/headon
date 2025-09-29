import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validierung der erforderlichen Felder
    const { name, email, project_type, budget, timeline, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, Email und Nachricht sind erforderlich' },
        { status: 400 }
      )
    }

    // Server-seitiger Supabase Client mit Service Role Key
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Supabase configuration missing')
      return NextResponse.json(
        { error: 'Server-Konfigurationsfehler' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Lead-Daten für die Datenbank vorbereiten
    const leadData = {
      name,
      email,
      company: body.company || null,
      phone: body.phone || null,
      project_type,
      budget,
      timeline,
      message,
      lead_score: body.lead_score || 0,
      source: 'contact-form',
      files: body.files || null,
      created_at: new Date().toISOString()
    }

    // In Supabase speichern
    const { data, error } = await supabase
      .from('leads')
      .insert([leadData])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Fehler beim Speichern der Anfrage' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Anfrage erfolgreich gesendet',
        data
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