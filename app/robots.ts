import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://headon.pro'

  return {
    rules: [
      // Standard-Regel: Alle Bots erlaubt (inkl. AI-Suchmaschinen für GEO)
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/dashboard/', '/_next/', '/private/'],
      },
      // Spezielle Regeln für Googlebot
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 0,
      },
      // BLOCKIERE: Aggressive Scraper ohne SEO/GEO-Wert
      {
        userAgent: 'Bytespider', // TikTok/ByteDance scraper
        disallow: '/',
      },
      {
        userAgent: 'CCBot', // Common Crawl (nur für Archive, kein Traffic)
        disallow: '/',
      },
      {
        userAgent: 'Amazonbot', // Amazon scraper
        disallow: '/',
      },
      {
        userAgent: 'anthropic-ai', // Training crawler (nicht Suche)
        disallow: '/',
      },
      {
        userAgent: 'Omgilibot', // Aggregate scraper
        disallow: '/',
      },
      {
        userAgent: 'FacebookBot', // Meta scraper
        disallow: '/',
      },
      {
        userAgent: 'Diffbot', // Commercial scraper
        disallow: '/',
      },
      // ERLAUBT bleiben (durch * Regel oben):
      // - PerplexityBot (AI-Suche)
      // - ChatGPT-User (AI-Suche)
      // - ClaudeBot (AI-Suche)
      // - GoogleBot, Bingbot (klassische Suche)
      // - Google-Extended (AI Overviews)
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
