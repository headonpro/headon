/**
 * City-Specific FAQ Data
 *
 * FAQs optimized for regional landing pages (Bad Mergentheim, Lauda-Königshofen, etc.)
 * Targets local search queries and provides city-specific answers for better local SEO.
 */

import type { FAQ } from '@/lib/types/content'

/**
 * Generate city-specific FAQs with dynamic city name replacement
 * @param cityName - Name of the city (e.g., "Bad Mergentheim")
 * @param region - Region name (e.g., "Main-Tauber-Kreis")
 */
export function getCityFAQs(cityName: string, region?: string): FAQ[] {
  const regionText = region || 'der Region'

  return [
    {
      question: `Wie viel kostet eine Website in ${cityName}?`,
      answer: `Professionelle Websites starten bei uns ab 2.500€ – unabhängig davon, ob Sie in ${cityName} oder anderswo ansässig sind. Der finale Preis hängt vom Funktionsumfang ab: Landing Pages ab 2.500€, Unternehmenswebsites ab 4.500€, E-Commerce-Shops ab 6.500€. Sie erhalten nach einem kostenlosen Erstgespräch ein transparentes Festpreis-Angebot ohne versteckte Kosten.`,
    },
    {
      question: `Wie lange dauert die Website-Entwicklung für Unternehmen in ${cityName}?`,
      answer: `Dank unserer KI-gestützten Entwicklungsprozesse realisieren wir Projekte in ${cityName} in 2-4 Wochen statt der branchenüblichen 3-6 Monate. Eine Landing Page ist in 1-2 Wochen fertig, umfangreiche Unternehmenswebsites benötigen 3-4 Wochen. Während der Entwicklung erhalten Sie regelmäßige Updates und können Feedback geben – gerne auch bei persönlichen Meetings vor Ort.`,
    },
    {
      question: `Bietet HEADON persönliche Beratung in ${cityName} an?`,
      answer: `Ja, für Kunden in ${cityName} und ${regionText} bieten wir gerne persönliche Beratungsgespräche vor Ort an. Das Erstgespräch ist kostenlos und dauert ca. 30-45 Minuten. Wir analysieren Ihre Anforderungen, zeigen Referenzen und erstellen ein maßgeschneidertes Angebot. Alternativ sind auch Video-Calls möglich, falls Ihnen das lieber ist.`,
    },
    {
      question: `Welche Unternehmen in ${cityName} nutzen bereits HEADON-Services?`,
      answer: `Wir haben bereits erfolgreich Projekte für Unternehmen in ${regionText} umgesetzt, darunter Sportvereine, Handwerksbetriebe, Hotels und Dienstleister. Aus Datenschutzgründen nennen wir nicht alle Kunden öffentlich, zeigen aber gerne Referenzen im persönlichen Gespräch. Unser Portfolio auf der Website gibt Ihnen einen guten Einblick in unsere Arbeit.`,
    },
    {
      question: `Kann HEADON meine bestehende Website aus ${cityName} modernisieren?`,
      answer: `Absolut! Wir migrieren alte Websites (WordPress, Joomla, statisches HTML) zu modernen Technologien wie Next.js. Die Migration umfasst Datenübernahme, SEO-Erhalt durch 301-Redirects, Performance-Steigerung (oft 4-10x schneller) und modernes Responsive Design. Ihre Rankings bleiben erhalten, während Sie von besserer Performance und niedrigeren Hosting-Kosten profitieren.`,
    },
    {
      question: `Wie funktioniert die Zusammenarbeit mit HEADON für ${cityName}?`,
      answer: `Nach dem Erstgespräch (vor Ort oder online) erhalten Sie ein Festpreis-Angebot. Bei Auftragserteilung startet die Konzeptionsphase mit Design-Entwürfen. Nach Ihrer Freigabe beginnt die Entwicklung mit regelmäßigen Updates (alle 3-5 Tage). Vor dem Launch testen Sie alles ausgiebig. Nach Go-Live erhalten Sie 30 Tage Launch-Support inklusive. Optional können Sie Wartungsverträge ab 150€/Monat buchen.`,
    },
    {
      question: `Welche Technologien nutzt HEADON für Projekte in ${cityName}?`,
      answer: `Wir setzen auf modernste Technologien: Next.js 15 für maximale Performance, React für interaktive Benutzeroberflächen, TypeScript für fehlerfreien Code, Tailwind CSS für modernes Design und Supabase für Backend & Datenbanken. Diese Technologien garantieren Lighthouse-Scores von 90+, schnelle Ladezeiten unter 1,5 Sekunden und hervorragende SEO-Rankings – entscheidend für lokale Sichtbarkeit in ${regionText}.`,
    },
    {
      question: `Bietet HEADON auch SEO-Optimierung für ${cityName} an?`,
      answer: `Ja, lokale SEO-Optimierung ist bei jedem Projekt inklusive: Technisches SEO (Meta-Tags, Schema.org, Sitemap), Local SEO (Google My Business Integration, lokale Keywords), Performance-Optimierung (Core Web Vitals), und Mobile-Optimierung. Für erweiterte SEO-Services wie Content-Marketing, Backlink-Aufbau und fortlaufende Optimierung bieten wir separate Pakete ab 350€/Monat an.`,
    },
  ]
}

/**
 * Get industry-specific FAQ for city pages
 */
export function getIndustryFAQs(industry: string, cityName: string): FAQ[] {
  const industryFAQs: Record<string, FAQ[]> = {
    Gesundheitstourismus: [
      {
        question: `Wie kann eine Website Kurkliniken in ${cityName} helfen?`,
        answer: `Eine moderne Website mit Online-Buchungssystem, Therapie-Übersicht und Patientenportal steigert die Buchungsrate um durchschnittlich 40%. Durch lokale SEO-Optimierung erscheinen Sie bei Suchanfragen wie "Kurklinik ${cityName}" ganz oben. Integration von Bewertungen und Zertifikaten schafft Vertrauen. Mehrsprachigkeit erreicht internationale Gesundheitstouristen.`,
      },
    ],
    Hotellerie: [
      {
        question: `Warum braucht mein Hotel in ${cityName} eine moderne Website?`,
        answer: `Eine professionelle Hotel-Website mit direktem Buchungssystem spart OTA-Provisionen (15-25% pro Buchung), verbessert die Sichtbarkeit bei lokalen Suchanfragen ("Hotel ${cityName}") und ermöglicht höhere Margen durch Direktbuchungen. Moderne Features wie 360°-Rundgänge, Live-Verfügbarkeitscheck und Gästebewertungen steigern die Conversion Rate um bis zu 60%.`,
      },
    ],
    Einzelhandel: [
      {
        question: `Lohnt sich ein Online-Shop für mein Geschäft in ${cityName}?`,
        answer: `Definitiv! Ein Online-Shop mit Click & Collect erweitert Ihre Reichweite über ${cityName} hinaus und ermöglicht Verkäufe rund um die Uhr. Lokale Kunden schätzen die Möglichkeit, online zu bestellen und im Laden abzuholen. Mit lokalem SEO erscheinen Sie bei "Geschäft ${cityName}" und gewinnen neue Kunden. Durchschnittlich steigt der Umsatz um 30-50% nach Online-Shop-Launch.`,
      },
    ],
  }

  return industryFAQs[industry] || []
}
