import type { Metadata } from 'next'
import BlogContent from '@/components/sections/BlogContent'

export const metadata: Metadata = {
  title: 'Blog - Insights zu Web Development, Design & Innovation | HEADON',
  description: 'HEADON Blog: Aktuelle Insights, Trends und Best Practices zu Web Development, UI/UX Design, Mobile Apps und digitaler Innovation. Tipps von Experten für Digitalexperten.',
  keywords: 'Web Development Blog, UI/UX Design Trends, Mobile App Development, Performance Optimization, Digital Innovation, HEADON Insights, Digitalagentur Blog',
  openGraph: {
    title: 'HEADON Blog - Digital Innovation & Best Practices',
    description: 'Insights, Trends und Best Practices aus der Welt der digitalen Innovation - vom HEADON Expertenteam.',
    url: 'https://headon.pro/blog',
    siteName: 'HEADON.pro',
    locale: 'de_DE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HEADON Blog - Digital Insights',
    description: 'Trends und Best Practices zu Web Development, Design und Innovation',
  },
  alternates: {
    canonical: 'https://headon.pro/blog',
  },
}

export default function BlogPage() {
  return <BlogContent />
}