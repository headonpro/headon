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
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: 'https://headon.pro/search?q={search_term_string}',
            },
            'query-input': 'required name=search_term_string',
          },
        }),
      }}
    />
  )
}
