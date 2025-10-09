import type { Metadata } from "next"
import { Outfit, Lato } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { Toaster } from "sonner"
import StructuredData from "@/components/seo/StructuredData"
import { WebsiteSchema } from "@/components/seo/WebsiteSchema"
import WebVitalsReporter from "@/components/web-vitals-reporter"

const outfit = Outfit({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  preload: true,
  adjustFontFallback: true,
})

const lato = Lato({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lato",
  preload: true,
  adjustFontFallback: true,
})

export const metadata: Metadata = {
  title: "Webentwicklung & Mobile Apps 4x schneller | KI-gestützte Digitalagentur",
  description: "KI-gestützte Webentwicklung aus Lauda-Königshofen: 4x schneller, 2x bessere Performance. Von der Idee zum Launch in 2-4 Wochen statt Monaten. Festpreise ab 2.500€. Kostenlose Erstberatung.",
  keywords: "Webentwicklung Lauda-Königshofen, Web Development Baden-Württemberg, Mobile Apps Main-Tauber-Kreis, React Next.js TypeScript, Kreativagentur Würzburg, UI/UX Design Tauberbischofsheim",
  authors: [{ name: "HEADON.pro" }],
  icons: {
    icon: [
      { url: "/icons/ON_favicon_16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/ON_favicon_32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/ON_favicon_48x48.png", sizes: "48x48", type: "image/png" },
    ],
    shortcut: "/icons/ON_favicon_32x32.png",
    apple: "/icons/ON_favicon_48x48.png",
  },
  alternates: {
    canonical: "https://headon.pro",
  },
  openGraph: {
    title: "Webentwicklung & Mobile Apps 4x schneller | KI-gestützte Digitalagentur",
    description: "KI-gestützte Webentwicklung aus Lauda-Königshofen: 4x schneller, 2x bessere Performance. Von der Idee zum Launch in 2-4 Wochen statt Monaten. Festpreise ab 2.500€. Kostenlose Erstberatung.",
    url: "https://headon.pro",
    siteName: "HEADON.pro",
    locale: "de_DE",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={`${outfit.variable} ${lato.variable}`}>
      <head>
        <link rel="preload" href="/headon-logo.svg" as="image" type="image/svg+xml" />
        {/* Preconnect to analytics domain for faster loading */}
        <link rel="preconnect" href="https://analytics.headon.pro" />
        <link rel="dns-prefetch" href="https://analytics.headon.pro" />
      </head>
      <body className="min-h-screen antialiased flex flex-col font-body">
        <WebVitalsReporter />
        <Script
          defer
          src="https://analytics.headon.pro/script.js"
          data-website-id="4d2d852f-7617-4bd2-9e80-7dbacf1c5d24"
          strategy="afterInteractive"
        />
        <WebsiteSchema />
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
      </body>
    </html>
  )
}
