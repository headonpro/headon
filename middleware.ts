import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware for handling redirects
 * Add your 301 redirects here for old URLs found in Google Search Console
 */

// Map of old URLs to new URLs
const redirects: Record<string, string> = {
  // Example: '/old-path': '/new-path',
  // Add your 404 URLs from Google Search Console here
  // e.g., '/blog/old-slug': '/blog/new-slug',
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hostname = request.headers.get('host') || ''

  // 1. WWW to non-WWW redirect (SEO best practice)
  if (hostname.startsWith('www.')) {
    const newUrl = new URL(request.url)
    newUrl.hostname = hostname.replace('www.', '')
    return NextResponse.redirect(newUrl, 301)
  }

  // 2. Check if the pathname exists in our redirects map
  if (redirects[pathname]) {
    const newUrl = new URL(redirects[pathname], request.url)
    return NextResponse.redirect(newUrl, 301)
  }

  return NextResponse.next()
}

// Configure which routes should be processed by this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|icons/).*)',
  ],
}
