import type { Metadata } from 'next'
import { Outfit, Lato } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import StructuredData from '@/components/seo/StructuredData'
import ToasterProvider from '@/components/layout/ToasterProvider'
import { WebsiteSchema } from '@/components/seo/WebsiteSchema'
import WebVitalsReporter from '@/components/web-vitals-reporter'

const outfit = Outfit({
  weight: ['400', '600', '700'], // Optimiert: nur benötigte Weights
  subsets: ['latin'],
  display: 'optional', // LCP-Optimierung: Rendert sofort mit Fallback
  variable: '--font-outfit',
  preload: true,
  adjustFontFallback: true,
})

const lato = Lato({
  weight: ['400', '700'], // Optimiert: nur Regular & Bold
  subsets: ['latin'],
  display: 'optional', // LCP-Optimierung: Rendert sofort mit Fallback
  variable: '--font-lato',
  preload: true,
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://headon.pro'),
  title: 'Webdesign & Marketing Agentur | Main-Tauber-Kreis',
  description:
    'Webdesign & Marketing Agentur aus Main-Tauber-Kreis. Web & App Entwicklung, KI-gestützt und 4x schneller. Festpreise ab 2.500€. Von der Idee zum Launch in 2-4 Wochen.',
  keywords:
    'Webentwicklung Lauda-Königshofen, Web Development Baden-Württemberg, Mobile Apps Main-Tauber-Kreis, React Next.js TypeScript, Kreativagentur Würzburg, UI/UX Design Tauberbischofsheim',
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
    title: 'Webdesign & Marketing Agentur | Main-Tauber-Kreis',
    description:
      'Webdesign & Marketing Agentur aus Main-Tauber-Kreis. Web & App Entwicklung, KI-gestützt und 4x schneller. Festpreise ab 2.500€. Von der Idee zum Launch in 2-4 Wochen.',
    url: 'https://headon.pro',
    siteName: 'HEADON.pro',
    locale: 'de_DE',
    type: 'website',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${outfit.variable} ${lato.variable}`}>
      <head>
        <link rel="preload" href="/headon-logo.svg" as="image" type="image/svg+xml" />
        {/* Preconnect to analytics domain for faster loading */}
        <link rel="preconnect" href="https://analytics.headon.pro" />
        <link rel="dns-prefetch" href="https://analytics.headon.pro" />
      </head>
      <body className="font-body flex min-h-screen flex-col antialiased">
        <WebVitalsReporter />
        <Script
          defer
          src="https://analytics.headon.pro/insights.js"
          data-website-id="4d2d852f-7617-4bd2-9e80-7dbacf1c5d24"
          strategy="lazyOnload"
        />
        <WebsiteSchema />
        <StructuredData type="organization" />
        <StructuredData type="localBusiness" />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ToasterProvider />
      </body>
    </html>
  )
}
