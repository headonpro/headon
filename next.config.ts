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
}

export default nextConfig
