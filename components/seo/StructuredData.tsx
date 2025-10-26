import Script from 'next/script'

interface BreadcrumbItem {
  name: string
  url: string
}

interface StructuredDataProps {
  type?: 'organization' | 'service' | 'breadcrumb' | 'localBusiness'
  data?: {
    breadcrumbs?: BreadcrumbItem[]
  }
}

export default function StructuredData({ type = 'organization', data }: StructuredDataProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://headon.pro'

  // Organization Schema - Hauptunternehmensinformationen
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'HEADON.pro',
    alternateName: 'HEADON Digital Agency',
    url: baseUrl,
    logo: `${baseUrl}/headon-logo.svg`,
    description:
      'Moderne Kreativagentur spezialisiert auf Full-Stack Web Development, Mobile Apps, UI/UX Design und Cloud-Backend Lösungen.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lauda-Königshofen',
      addressRegion: 'Baden-Württemberg',
      postalCode: '97922',
      addressCountry: 'DE',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+49-176-6304241',
      contactType: 'customer service',
      areaServed: 'DE',
      availableLanguage: ['German', 'English'],
    },
    sameAs: [
      'https://www.linkedin.com/company/headon-pro',
      'https://github.com/headonpro',
      'https://twitter.com/headonpro',
    ],
    founder: {
      '@type': 'Person',
      name: 'HEADON Team',
    },
    foundingDate: '2020',
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 1,
      maxValue: 10,
    },
  }

  // LocalBusiness Schema für lokale SEO
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${baseUrl}/#business`,
    name: 'HEADON.pro',
    description:
      'Full-Service Digitalagentur für Webentwicklung, Mobile Apps und kreatives Design. Spezialisiert auf moderne Full-Stack Entwicklung, UI/UX Design und Cloud-Backend Lösungen für Unternehmen im Main-Tauber-Kreis und ganz Deutschland.',
    image: [`${baseUrl}/headon-logo.svg`, `${baseUrl}/og-images/home.jpg`],
    url: baseUrl,
    email: 'info@headon.pro',
    telephone: '+49-176-6304241',
    priceRange: '€€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '',
      addressLocality: 'Lauda-Königshofen',
      addressRegion: 'BW',
      postalCode: '97922',
      addressCountry: 'DE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 49.5667,
      longitude: 9.7,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Bad Mergentheim',
        containedInPlace: {
          '@type': 'State',
          name: 'Baden-Württemberg',
        },
      },
      {
        '@type': 'City',
        name: 'Lauda-Königshofen',
        containedInPlace: {
          '@type': 'State',
          name: 'Baden-Württemberg',
        },
      },
      {
        '@type': 'City',
        name: 'Tauberbischofsheim',
        containedInPlace: {
          '@type': 'State',
          name: 'Baden-Württemberg',
        },
      },
      {
        '@type': 'City',
        name: 'Wertheim',
        containedInPlace: {
          '@type': 'State',
          name: 'Baden-Württemberg',
        },
      },
      {
        '@type': 'City',
        name: 'Marktheidenfeld',
        containedInPlace: {
          '@type': 'State',
          name: 'Bayern',
        },
      },
      {
        '@type': 'City',
        name: 'Würzburg',
        containedInPlace: {
          '@type': 'State',
          name: 'Bayern',
        },
      },
    ],
  }

  // Service Schema für Dienstleistungen
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Web Development & Digital Marketing',
    provider: {
      '@type': 'Organization',
      name: 'HEADON.pro',
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Bad Mergentheim',
      },
      {
        '@type': 'City',
        name: 'Lauda-Königshofen',
      },
      {
        '@type': 'City',
        name: 'Tauberbischofsheim',
      },
      {
        '@type': 'City',
        name: 'Wertheim',
      },
      {
        '@type': 'City',
        name: 'Marktheidenfeld',
      },
      {
        '@type': 'City',
        name: 'Würzburg',
      },
      {
        '@type': 'Country',
        name: 'Germany',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Web Development',
            description: 'Full-Stack Webentwicklung mit modernen Technologien',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Mobile App Development',
            description: 'Native und Cross-Platform Mobile Apps',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'UI/UX Design',
            description: 'User Interface und User Experience Design',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Cloud Solutions',
            description: 'Cloud-Backend und Infrastructure Solutions',
          },
        },
      ],
    },
  }

  // BreadcrumbList Schema (sollte dynamisch pro Seite sein)
  const breadcrumbSchema = data?.breadcrumbs
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: data.breadcrumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: `${baseUrl}${item.url}`,
        })),
      }
    : null

  // Wähle das richtige Schema basierend auf dem Typ
  let selectedSchema
  switch (type) {
    case 'localBusiness':
      selectedSchema = localBusinessSchema
      break
    case 'service':
      selectedSchema = serviceSchema
      break
    case 'breadcrumb':
      selectedSchema = breadcrumbSchema
      break
    case 'organization':
    default:
      selectedSchema = organizationSchema
  }

  if (!selectedSchema) return null

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(selectedSchema),
      }}
    />
  )
}
