import type { Metadata } from 'next'
import { Outfit, Lato } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Toaster } from 'sonner'
import StructuredData from '@/components/seo/StructuredData'

const outfit = Outfit({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
  preload: true,
  adjustFontFallback: true,
})

const lato = Lato({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato',
  preload: true,
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  title: 'HEADON.pro - Webentwicklung Lauda-Königshofen | Full-Stack Entwicklung Baden-Württemberg',
  description: 'HEADON.pro - Ihre Webentwicklung-Agentur aus Lauda-Königshofen. Spezialisiert auf Full-Stack Webentwicklung, Mobile Apps und UI/UX Design in Baden-Württemberg und dem Main-Tauber-Kreis.',
  keywords: 'Webentwicklung Lauda-Königshofen, Web Development Baden-Württemberg, Mobile Apps Main-Tauber-Kreis, React Next.js TypeScript, Kreativagentur Würzburg, UI/UX Design Tauberbischofsheim',
  authors: [{ name: 'HEADON.pro' }],
  icons: {
    icon: [
      { url: '/icons/ON_favicon_16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/ON_favicon_32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/ON_favicon_48x48.png', sizes: '48x48', type: 'image/png' },
    ],
    shortcut: '/icons/ON_favicon_32x32.png',
    apple: '/icons/ON_favicon_48x48.png',
  },
  alternates: {
    canonical: 'https://headon.pro',
  },
  openGraph: {
    title: 'HEADON.pro - Webentwicklung Lauda-Königshofen | Full-Stack Entwicklung',
    description: 'Ihre Webentwicklung-Agentur aus Lauda-Königshofen für moderne Web-Lösungen, Mobile Apps und UI/UX Design',
    url: 'https://headon.pro',
    siteName: 'HEADON.pro',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HEADON.pro - Webentwicklung Lauda-Königshofen',
    description: 'Ihre Webentwicklung-Agentur aus Lauda-Königshofen für moderne digitale Lösungen',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const umamiUrl = process.env.NEXT_PUBLIC_UMAMI_URL
  const umamiWebsiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID

  return (
    <html lang="de" className={`${outfit.variable} ${lato.variable}`}>
      <head>
        {/* Preload critical assets for better LCP */}
        <link rel="preload" href="/headon-logo.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/images/onur_P.webp" as="image" type="image/webp" />
      </head>
      <body className="min-h-screen antialiased flex flex-col font-body">
        <StructuredData type="organization" />
        <StructuredData type="localBusiness" />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster
          position="top-right"
          richColors
          closeButton
          duration={5000}
        />

        {/* Umami Analytics - Only load in production */}
        {umamiUrl && umamiWebsiteId && process.env.NODE_ENV === 'production' && (
          <Script
            src={`${umamiUrl}/script.js`}
            data-website-id={umamiWebsiteId}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  )
}