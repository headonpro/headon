import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'HEADON.pro - Digitalagentur für Web, Apps & Design',
    short_name: 'HEADON.pro',
    description:
      'KI-gestützte Webentwicklung aus Lauda-Königshofen: 4x schneller, 2x bessere Performance. Full-Service Digitalagentur für Web, Mobile Apps und Design.',
    start_url: '/',
    display: 'standalone',
    background_color: '#1034A6',
    theme_color: '#1034A6',
    icons: [
      {
        src: '/icons/ON_favicon_16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/icons/ON_favicon_32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/icons/ON_favicon_48x48.png',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    categories: ['business', 'productivity', 'developer tools'],
    lang: 'de-DE',
    dir: 'ltr',
    orientation: 'portrait',
    scope: '/',
  }
}
