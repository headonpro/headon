import { Metadata } from 'next'
import { getServicePage } from '@/lib/content/content-api'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://headon.pro'

interface GenerateMetadataProps {
  params: Promise<{
    slug: string
  }>
}

/**
 * Generate dynamic metadata for service pages
 */
export async function generateMetadata({ params }: GenerateMetadataProps): Promise<Metadata> {
  const { slug } = await params

  // Load service page
  const service = await getServicePage(slug)

  // Fallback metadata if service not found
  if (!service) {
    return {
      title: 'Service nicht gefunden | HEADON.pro',
      description: 'Die gesuchte Service-Seite konnte nicht gefunden werden.',
    }
  }

  const { frontmatter } = service

  // Build absolute URL for canonical and OpenGraph
  const pageUrl = `${baseUrl}/services/${slug}`

  // Map slug to OG image
  const ogImageMap: Record<string, string> = {
    'web-development': '/og-images/web-dev.jpg',
    'mobile-development': '/og-images/mobile-dev.jpg',
    'ui-ux-design': '/og-images/design.jpg',
    'backend-solutions': '/og-images/backend.jpg',
  }
  const ogImageUrl = ogImageMap[slug] || '/og-images/services.jpg'

  // Map slug to local keywords
  const localKeywordsMap: Record<string, string> = {
    'web-development':
      'Webentwicklung Bad Mergentheim, Next.js Entwickler Lauda-Königshofen, React Agentur Tauberbischofsheim, Full-Stack Developer Wertheim, Web Development Main-Tauber-Kreis, Progressive Web Apps Baden-Württemberg, E-Commerce Entwicklung Würzburg, TypeScript Entwickler Region Würzburg, Responsive Webdesign Marktheidenfeld',
    'mobile-development':
      'Mobile App Entwicklung Bad Mergentheim, iOS App Developer Lauda-Königshofen, Android App Entwickler Tauberbischofsheim, React Native Wertheim, Mobile Development Main-Tauber-Kreis, Cross-Platform Apps Baden-Württemberg, Flutter Entwickler Würzburg, Native App Agentur Region Würzburg',
    'ui-ux-design':
      'UI/UX Design Bad Mergentheim, User Interface Design Lauda-Königshofen, UX Designer Tauberbischofsheim, Webdesign Wertheim, UI Design Agentur Main-Tauber-Kreis, User Experience Baden-Württemberg, Figma Designer Würzburg, Design System Region Würzburg',
    'backend-solutions':
      'Backend Entwicklung Bad Mergentheim, API Development Lauda-Königshofen, Cloud Solutions Tauberbischofsheim, Supabase Entwickler Wertheim, Backend Developer Main-Tauber-Kreis, PostgreSQL Agentur Baden-Württemberg, Node.js Entwicklung Würzburg, REST API Region Würzburg',
  }

  // Enhanced OG description with local context
  const ogDescriptionMap: Record<string, string> = {
    'web-development':
      'Professionelle Webentwicklung im Main-Tauber-Kreis: Next.js & React Development für Unternehmen in Bad Mergentheim, Lauda-Königshofen & Region. Festpreise ab 2.500€.',
    'mobile-development':
      'Mobile App Entwicklung im Main-Tauber-Kreis: Native & Cross-Platform Apps für iOS/Android. React Native & Flutter Experten in Bad Mergentheim & Region. Ab 8.000€.',
    'ui-ux-design':
      'UI/UX Design im Main-Tauber-Kreis: User-zentriertes Design für Web & Mobile Apps. Professionelle Beratung in Bad Mergentheim & Region. Ab 1.500€.',
    'backend-solutions':
      'Backend Entwicklung im Main-Tauber-Kreis: Skalierbare Cloud-Infrastruktur & API Development. Expertise in Bad Mergentheim & Region. Ab 3.000€.',
  }

  return {
    title: `${frontmatter.title} | HEADON.pro`,
    description: frontmatter.description,
    keywords: localKeywordsMap[slug] || '',
    openGraph: {
      title: frontmatter.title,
      description: ogDescriptionMap[slug] || frontmatter.description,
      url: pageUrl,
      type: 'website',
      siteName: 'HEADON.pro',
      locale: 'de_DE',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: frontmatter.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: ogDescriptionMap[slug] || frontmatter.description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: pageUrl,
    },
  }
}
