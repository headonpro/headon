import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Enable standalone output for optimized Docker deployments
  output: 'standalone',
  // Enable proper error checking for production builds
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Configure compiler for modern browsers (removes unnecessary polyfills)
  compiler: {
    // Remove React properties in production
    reactRemoveProperties: true,
    // Remove console.log in production
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['error', 'warn'],
          }
        : false,
  },
  images: {
    domains: [],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Optimize build performance for large content sites
  experimental: {
    // Limit parallel page generation to prevent OOM errors
    // Default is CPU count, we limit to 4 for stability
    cpus: 4,
    // Enable optimized package imports
    optimizePackageImports: ['@/components', '@/lib'],
    // Optimize CSS delivery: inline critical CSS, defer non-critical
    optimizeCss: true,
  },
  // Increase static page generation timeout for content-heavy pages
  staticPageGenerationTimeout: 120,
  // Add security headers and CDN-optimized cache headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      // CDN-optimized cache headers for Next.js static assets
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            // Immutable: Files have content hashes in filenames, never change
            // max-age=31536000: 1 year browser cache
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Preload CSS files to reduce render blocking
      {
        source: '/_next/static/css/:path*.css',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Link',
            value: '</_next/static/css/:path*.css>; rel=preload; as=style',
          },
        ],
      },
      // CDN-optimized cache headers for optimized images
      {
        source: '/_next/image/:path*',
        headers: [
          {
            key: 'Cache-Control',
            // max-age=86400: 1 day browser cache
            // s-maxage=604800: 1 week CDN cache
            // stale-while-revalidate=86400: Serve stale for 1 day while revalidating
            value: 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
          },
        ],
      },
      // Cache headers for public images directory
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            // max-age=86400: 1 day browser cache
            // s-maxage=604800: 1 week CDN cache
            // stale-while-revalidate=86400: Serve stale for 1 day while revalidating
            value: 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
          },
        ],
      },
      // Cache headers for fonts
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            // Fonts rarely change, cache aggressively
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache headers for static images (SVG, PNG, JPG, WebP, AVIF)
      {
        source: '/:path*\\.(svg|png|jpg|jpeg|gif|webp|avif|ico)',
        headers: [
          {
            key: 'Cache-Control',
            // Static images: 1 year browser cache, 1 month CDN cache
            // Longer CDN cache for better hit ratio
            value: 'public, max-age=31536000, s-maxage=2592000, stale-while-revalidate=86400',
          },
        ],
      },
    ]
  },
  // Redirects for deleted blog posts and legacy routes to prevent 404 errors
  async redirects() {
    return [
      // ========================================
      // Blog post redirects - 404 fixes
      // ========================================
      {
        source: '/blog/responsive-design-2025',
        destination: '/blog/mobile-first-design',
        permanent: true,
      },
      {
        source: '/blog/responsive-design-tailwind',
        destination: '/blog/mobile-first-design',
        permanent: true,
      },
      {
        source: '/blog/website-ladezeit-optimieren',
        destination: '/blog/core-web-vitals-optimierung',
        permanent: true,
      },
      // New 404 fixes from SEO audit
      {
        source: '/blog/app-performance-best-practices',
        destination: '/blog/next-js-performance-optimization',
        permanent: true,
      },
      {
        source: '/blog/cms-vergleich-2025',
        destination: '/vergleiche/headless-cms-vergleich-contentful-sanity-strapi',
        permanent: true,
      },
      {
        source: '/blog/google-business-profile-optimieren',
        destination: '/blog/local-seo-guide-kleine-unternehmen',
        permanent: true,
      },
      {
        source: '/blog/headless-cms-vorteile',
        destination: '/vergleiche/headless-cms-vergleich-contentful-sanity-strapi',
        permanent: true,
      },
      {
        source: '/blog/mobile-first-design-strategie',
        destination: '/blog/mobile-first-design',
        permanent: true,
      },
      {
        source: '/blog/react-native-vs-native',
        destination: '/vergleiche/native-vs-cross-platform-mobile',
        permanent: true,
      },
      {
        source: '/blog/seo-texte-schreiben-guide',
        destination: '/blog/local-seo-guide-kleine-unternehmen',
        permanent: true,
      },
      {
        source: '/blog/website-performance-optimieren',
        destination: '/blog/core-web-vitals-optimierung',
        permanent: true,
      },
      {
        source: '/blog/react-native-performance-optimization',
        destination: '/blog/react-native-vs-flutter',
        permanent: true,
      },
      {
        source: '/blog/webentwicklung-agentur-auswahl',
        destination: '/blog/welche-agentur-webentwicklung-empfehlung',
        permanent: true,
      },
      // ========================================
      // Glossar redirects - missing entries
      // ========================================
      {
        source: '/glossar/html',
        destination: '/glossar/css', // Closest related term
        permanent: true,
      },
      {
        source: '/glossar/json-ld',
        destination: '/glossar/structured-data',
        permanent: true,
      },
      {
        source: '/glossar/kanban',
        destination: '/glossar/agile',
        permanent: true,
      },
      {
        source: '/glossar/lean-startup',
        destination: '/glossar/mvp',
        permanent: true,
      },
      {
        source: '/glossar/native-app',
        destination: '/glossar/mobile-app',
        permanent: true,
      },
      {
        source: '/glossar/offline-first',
        destination: '/glossar/pwa',
        permanent: true,
      },
      {
        source: '/glossar/orm',
        destination: '/glossar/datenbank',
        permanent: true,
      },
      {
        source: '/glossar/performance-optimization',
        destination: '/glossar/core-web-vitals',
        permanent: true,
      },
      {
        source: '/glossar/progressive-enhancement',
        destination: '/glossar/responsive-design',
        permanent: true,
      },
      {
        source: '/glossar/rich-snippets',
        destination: '/glossar/structured-data',
        permanent: true,
      },
      {
        source: '/glossar/service-worker',
        destination: '/glossar/pwa',
        permanent: true,
      },
      {
        source: '/glossar/sprint',
        destination: '/glossar/scrum',
        permanent: true,
      },
      {
        source: '/glossar/ssg',
        destination: '/glossar/ssr',
        permanent: true,
      },
      // ========================================
      // Other 404 fixes
      // ========================================
      {
        source: '/preise',
        destination: '/website-kosten',
        permanent: true,
      },
      {
        source: '/kostenrechner',
        destination: '/webseite-erstellen-lassen-kosten',
        permanent: true,
      },
      {
        source: '/downloads/agentur-auswahl-paket',
        destination: '/blog/welche-agentur-webentwicklung-empfehlung',
        permanent: true,
      },
      // ========================================
      // Legacy route redirects
      // ========================================
      {
        source: '/team',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/terms',
        destination: '/imprint',
        permanent: true,
      },
      {
        source: '/$',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
