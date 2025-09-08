import type { Metadata } from 'next'
import { Outfit, Lato, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Toaster } from 'sonner'

const outfit = Outfit({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
})

const lato = Lato({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  title: 'HEADON.pro - Digitale Erlebnisse, die Ihr Business transformieren',
  description: 'HEADON ist eine moderne Kreativagentur, spezialisiert auf Full-Stack Web Development, Mobile Apps, UI/UX Design und Cloud-Backend Lösungen.',
  keywords: 'Web Development, Mobile Apps, UI/UX Design, React, Next.js, TypeScript, Kreativagentur',
  authors: [{ name: 'HEADON.pro' }],
  openGraph: {
    title: 'HEADON.pro - Digitale Erlebnisse, die Ihr Business transformieren',
    description: 'Moderne Kreativagentur für Web Development, Mobile Apps und UI/UX Design',
    url: 'https://headon.pro',
    siteName: 'HEADON.pro',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HEADON.pro',
    description: 'Moderne Kreativagentur für digitale Lösungen',
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
  return (
    <html lang="de" className={`${outfit.variable} ${lato.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen antialiased flex flex-col font-body">
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
      </body>
    </html>
  )
}