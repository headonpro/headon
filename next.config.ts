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
  },
  // Increase static page generation timeout for content-heavy pages
  staticPageGenerationTimeout: 120,
  // Add security headers for development environment
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
    ]
  },
}

export default nextConfig
