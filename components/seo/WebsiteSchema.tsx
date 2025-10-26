export function WebsiteSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'HEADON.pro',
          alternateName: 'HEADON Digitalagentur',
          url: 'https://headon.pro',
          description:
            'Full-Service Digitalagentur für Webentwicklung, App Development und kreatives Design',
          inLanguage: 'de-DE',
          publisher: {
            '@type': 'Organization',
            '@id': 'https://headon.pro/#organization',
          },
        }),
      }}
    />
  )
}
