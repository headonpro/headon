import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio & Referenzen | HEADON.pro - Erfolgreiche Projekte',
  description: 'Entdecken Sie unsere erfolgreichen Web- und App-Projekte. Von E-Commerce bis Enterprise - Referenzen, die für sich sprechen.',
  keywords: 'Portfolio Webdesign, Referenzen Webentwicklung, Case Studies, Erfolgreiche Projekte, Website Beispiele, App Portfolio, React Projekte, Next.js Referenzen',
  openGraph: {
    title: 'Portfolio | HEADON.pro - Unsere Erfolgsgeschichten',
    description: 'Überzeugen Sie sich von unserer Expertise durch reale Projektbeispiele',
    url: 'https://headon.pro/portfolio',
    type: 'website',
    images: [
      {
        url: 'https://headon.pro/images/portfolio-og.jpg',
        width: 1200,
        height: 630,
        alt: 'HEADON.pro Portfolio',
      },
    ],
  },
  alternates: {
    canonical: 'https://headon.pro/portfolio',
  },
}