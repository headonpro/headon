import { MetadataRoute } from 'next'
import {
  getAllBlogPosts,
  getAllPortfolioProjects,
  getAllServicePages,
  getAllCityPages,
  getAllBranchePages,
  getAllTechnologyPages,
} from '@/lib/content/content-api'
import { glossaryTerms } from '@/lib/content/glossary'
import { comparisonArticles } from '@/lib/content/comparisons'

// Timeout for sitemap generation (30 seconds max)
export const maxDuration = 30

// Cache for 1 hour (3600 seconds)
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://headon.pro'
  const currentDate = new Date()

  // Load all content in parallel for performance
  const [blogPosts, portfolioProjects, servicePages, cityPages, branchePages, technologyPages] = await Promise.all([
    getAllBlogPosts(),
    getAllPortfolioProjects(),
    getAllServicePages(),
    getAllCityPages(),
    getAllBranchePages(),
    getAllTechnologyPages(),
  ])

  // Static pages with priorities
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/regionen`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/branchen`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/technologie`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/imprint`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/glossar`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/vergleiche`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // Blog posts (priority 0.8, weekly updates)
  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.updatedAt || post.frontmatter.publishedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // Portfolio projects (priority 0.7, monthly updates)
  const portfolioEntries: MetadataRoute.Sitemap = portfolioProjects.map((project) => ({
    url: `${baseUrl}/portfolio/${project.slug}`,
    lastModified: new Date(project.frontmatter.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Service pages (priority 0.9, monthly updates)
  const serviceEntries: MetadataRoute.Sitemap = servicePages.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.9,
  }))

  // City pages (priority 0.7, monthly updates)
  const cityEntries: MetadataRoute.Sitemap = cityPages.map((city) => ({
    url: `${baseUrl}/regionen/${city.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Branchen pages (priority 0.8, weekly updates)
  const brancheEntries: MetadataRoute.Sitemap = branchePages.map((branche) => ({
    url: `${baseUrl}/branchen/${branche.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // Glossary terms (priority 0.6, monthly updates)
  const glossaryEntries: MetadataRoute.Sitemap = glossaryTerms.map((term) => ({
    url: `${baseUrl}/glossar/${term.id}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  // Comparison articles (priority 0.7, monthly updates)
  const comparisonEntries: MetadataRoute.Sitemap = comparisonArticles.map((comparison) => ({
    url: `${baseUrl}/vergleiche/${comparison.slug}`,
    lastModified: new Date(comparison.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Technology pages (priority 0.7, monthly updates)
  const technologyEntries: MetadataRoute.Sitemap = technologyPages.map((tech) => ({
    url: `${baseUrl}/technologie/${tech.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // Combine all entries
  return [
    ...staticPages,
    ...blogEntries,
    ...portfolioEntries,
    ...serviceEntries,
    ...cityEntries,
    ...brancheEntries,
    ...glossaryEntries,
    ...comparisonEntries,
    ...technologyEntries,
  ]
}
