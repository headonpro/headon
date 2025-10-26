/**
 * Content API Module
 *
 * High-level API for accessing all content types.
 * Provides filtering, sorting, pagination, and caching capabilities.
 */

import {
  loadMDX,
  listContentSlugs,
  type BlogContentResult,
  type PortfolioContentResult,
  type ServiceContentResult,
  type CityContentResult,
} from './mdx-loader'
import type { BlogCategory, PortfolioCategory } from '@/lib/types/content'

// ============================================================================
// Types
// ============================================================================

export interface BlogPostOptions {
  /** Sort by field */
  sortBy?: 'date' | 'featured'
  /** Sort direction */
  sortDirection?: 'asc' | 'desc'
  /** Filter by category */
  category?: BlogCategory
  /** Filter by tags (must include all tags) */
  tags?: string[]
  /** Filter by featured status */
  featured?: boolean
  /** Page number (1-based) */
  page?: number
  /** Items per page */
  perPage?: number
}

export interface PortfolioProjectOptions {
  /** Sort by date */
  sortBy?: 'date'
  /** Sort direction */
  sortDirection?: 'asc' | 'desc'
  /** Filter by category */
  category?: PortfolioCategory
  /** Filter by tags */
  tags?: string[]
  /** Page number (1-based) */
  page?: number
  /** Items per page */
  perPage?: number
}

// ============================================================================
// Cache
// ============================================================================

const cache: {
  blogPosts?: BlogContentResult[]
  portfolioProjects?: PortfolioContentResult[]
  servicePages?: ServiceContentResult[]
  cityPages?: CityContentResult[]
} = {}

// ============================================================================
// Blog API Functions
// ============================================================================

/**
 * Gets all blog posts with optional filtering, sorting, and pagination
 */
export async function getAllBlogPosts(options: BlogPostOptions = {}): Promise<BlogContentResult[]> {
  try {
    // Load all posts (with caching)
    if (!cache.blogPosts) {
      const slugs = await listContentSlugs('blog')
      const posts = await Promise.all(slugs.map((slug) => loadMDX(slug, 'blog')))
      cache.blogPosts = posts.filter((post): post is BlogContentResult => post !== null)
    }

    let results = [...cache.blogPosts]

    // Filter by category
    if (options.category) {
      results = results.filter((post) => post.frontmatter.category === options.category)
    }

    // Filter by tags (must include all specified tags)
    if (options.tags && options.tags.length > 0) {
      results = results.filter((post) =>
        options.tags!.every((tag) => post.frontmatter.tags.includes(tag))
      )
    }

    // Filter by featured status
    if (options.featured !== undefined) {
      results = results.filter((post) => post.frontmatter.featured === options.featured)
    }

    // Sort
    const sortBy = options.sortBy || 'date'
    const sortDirection = options.sortDirection || 'desc'

    if (sortBy === 'date') {
      results.sort((a, b) => {
        const dateA = new Date(a.frontmatter.publishedAt).getTime()
        const dateB = new Date(b.frontmatter.publishedAt).getTime()
        return sortDirection === 'desc' ? dateB - dateA : dateA - dateB
      })
    } else if (sortBy === 'featured') {
      results.sort((a, b) => {
        const featuredA = a.frontmatter.featured ? 1 : 0
        const featuredB = b.frontmatter.featured ? 1 : 0
        return sortDirection === 'desc' ? featuredB - featuredA : featuredA - featuredB
      })
    }

    // Pagination
    if (options.page && options.perPage) {
      const start = (options.page - 1) * options.perPage
      const end = start + options.perPage
      results = results.slice(start, end)
    }

    return results
  } catch (error) {
    console.error('Error loading blog posts:', error)
    return []
  }
}

/**
 * Gets a single blog post by slug
 */
export async function getBlogPost(slug: string): Promise<BlogContentResult | null> {
  try {
    const result = await loadMDX(slug, 'blog')
    return result as BlogContentResult | null
  } catch (error) {
    console.error(`Error loading blog post "${slug}":`, error)
    return null
  }
}

/**
 * Gets related blog posts based on shared tags and category
 *
 * Algorithm:
 * 1. Filter out current post
 * 2. Score posts by shared tags count (1 point per tag)
 * 3. Boost same category by 0.5 points
 * 4. Sort by score descending
 * 5. Take top maxResults
 * 6. If less than maxResults, fill with recent posts
 */
export async function getRelatedBlogPosts(
  slug: string,
  maxResults: number = 4
): Promise<BlogContentResult[]> {
  try {
    const currentPost = await getBlogPost(slug)
    if (!currentPost) return []

    const allPosts = await getAllBlogPosts()

    // Calculate scores for each post
    const scoredPosts = allPosts
      .filter((post) => post.slug !== slug)
      .map((post) => {
        let score = 0

        // Score by shared tags
        const sharedTags = post.frontmatter.tags.filter((tag) =>
          currentPost.frontmatter.tags.includes(tag)
        )
        score += sharedTags.length

        // Boost same category
        if (post.frontmatter.category === currentPost.frontmatter.category) {
          score += 0.5
        }

        return { post, score }
      })

    // Sort by score descending
    scoredPosts.sort((a, b) => b.score - a.score)

    // Take top results with score > 0
    const relatedPosts = scoredPosts
      .filter((item) => item.score > 0)
      .slice(0, maxResults)
      .map((item) => item.post)

    // If we have fewer than maxResults, fill with recent posts
    if (relatedPosts.length < maxResults) {
      const recentPosts = await getAllBlogPosts({
        sortBy: 'date',
        sortDirection: 'desc',
      })

      const additionalPosts = recentPosts
        .filter((post) => post.slug !== slug && !relatedPosts.find((rp) => rp.slug === post.slug))
        .slice(0, maxResults - relatedPosts.length)

      relatedPosts.push(...additionalPosts)
    }

    return relatedPosts
  } catch (error) {
    console.error(`Error getting related posts for "${slug}":`, error)
    return []
  }
}

// ============================================================================
// Portfolio API Functions
// ============================================================================

/**
 * Gets all portfolio projects with optional filtering, sorting, and pagination
 */
export async function getAllPortfolioProjects(
  options: PortfolioProjectOptions = {}
): Promise<PortfolioContentResult[]> {
  try {
    // Load all projects (with caching)
    if (!cache.portfolioProjects) {
      const slugs = await listContentSlugs('portfolio')
      const projects = await Promise.all(slugs.map((slug) => loadMDX(slug, 'portfolio')))
      cache.portfolioProjects = projects.filter(
        (project): project is PortfolioContentResult => project !== null
      )
    }

    let results = [...cache.portfolioProjects]

    // Filter by category
    if (options.category) {
      results = results.filter((project) => project.frontmatter.category === options.category)
    }

    // Filter by tags
    if (options.tags && options.tags.length > 0) {
      results = results.filter((project) =>
        options.tags!.every((tag) => project.frontmatter.tags.includes(tag))
      )
    }

    // Sort by date
    const sortDirection = options.sortDirection || 'desc'
    results.sort((a, b) => {
      const dateA = new Date(a.frontmatter.date).getTime()
      const dateB = new Date(b.frontmatter.date).getTime()
      return sortDirection === 'desc' ? dateB - dateA : dateA - dateB
    })

    // Pagination
    if (options.page && options.perPage) {
      const start = (options.page - 1) * options.perPage
      const end = start + options.perPage
      results = results.slice(start, end)
    }

    return results
  } catch (error) {
    console.error('Error loading portfolio projects:', error)
    return []
  }
}

/**
 * Gets a single portfolio project by slug
 */
export async function getPortfolioProject(slug: string): Promise<PortfolioContentResult | null> {
  try {
    const result = await loadMDX(slug, 'portfolio')
    return result as PortfolioContentResult | null
  } catch (error) {
    console.error(`Error loading portfolio project "${slug}":`, error)
    return null
  }
}

/**
 * Gets related portfolio projects by slugs
 */
export async function getRelatedPortfolioProjects(
  slugs: string[]
): Promise<PortfolioContentResult[]> {
  try {
    const projects = await Promise.all(slugs.map((slug) => getPortfolioProject(slug)))
    return projects.filter((project): project is PortfolioContentResult => project !== null)
  } catch (error) {
    console.error('Error loading related portfolio projects:', error)
    return []
  }
}

// ============================================================================
// Service API Functions
// ============================================================================

/**
 * Gets all service pages
 */
export async function getAllServicePages(): Promise<ServiceContentResult[]> {
  try {
    // Load all service pages (with caching)
    if (!cache.servicePages) {
      const slugs = await listContentSlugs('services')
      const pages = await Promise.all(slugs.map((slug) => loadMDX(slug, 'services')))
      cache.servicePages = pages.filter((page): page is ServiceContentResult => page !== null)
    }

    return [...cache.servicePages]
  } catch (error) {
    console.error('Error loading service pages:', error)
    return []
  }
}

/**
 * Gets a single service page by slug
 */
export async function getServicePage(slug: string): Promise<ServiceContentResult | null> {
  try {
    const result = await loadMDX(slug, 'services')
    return result as ServiceContentResult | null
  } catch (error) {
    console.error(`Error loading service page "${slug}":`, error)
    return null
  }
}

// ============================================================================
// City API Functions
// ============================================================================

/**
 * Gets all city pages
 */
export async function getAllCityPages(): Promise<CityContentResult[]> {
  try {
    // Load all city pages (with caching)
    if (!cache.cityPages) {
      const slugs = await listContentSlugs('cities')
      const pages = await Promise.all(slugs.map((slug) => loadMDX(slug, 'cities')))
      cache.cityPages = pages.filter((page): page is CityContentResult => page !== null)
    }

    // Sort by name alphabetically
    return [...cache.cityPages].sort((a, b) => a.frontmatter.name.localeCompare(b.frontmatter.name))
  } catch (error) {
    console.error('Error loading city pages:', error)
    return []
  }
}

/**
 * Gets a single city page by slug
 */
export async function getCityPage(slug: string): Promise<CityContentResult | null> {
  try {
    const result = await loadMDX(slug, 'cities')
    return result as CityContentResult | null
  } catch (error) {
    console.error(`Error loading city page "${slug}":`, error)
    return null
  }
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Clears the content cache
 * Useful for development when content changes
 */
export function clearCache(): void {
  cache.blogPosts = undefined
  cache.portfolioProjects = undefined
  cache.servicePages = undefined
  cache.cityPages = undefined
}

/**
 * Gets the total count of items for a content type
 */
export async function getContentCount(
  type: 'blog' | 'portfolio' | 'services' | 'cities'
): Promise<number> {
  try {
    const slugs = await listContentSlugs(type)
    return slugs.length
  } catch (error) {
    console.error(`Error getting content count for "${type}":`, error)
    return 0
  }
}

/**
 * Gets unique categories from blog posts
 */
export async function getBlogCategories(): Promise<BlogCategory[]> {
  const posts = await getAllBlogPosts()
  const categories = new Set(posts.map((post) => post.frontmatter.category))
  return Array.from(categories)
}

/**
 * Gets unique tags from blog posts
 */
export async function getBlogTags(): Promise<string[]> {
  const posts = await getAllBlogPosts()
  const tags = new Set(posts.flatMap((post) => post.frontmatter.tags))
  return Array.from(tags).sort()
}

/**
 * Gets unique categories from portfolio projects
 */
export async function getPortfolioCategories(): Promise<PortfolioCategory[]> {
  const projects = await getAllPortfolioProjects()
  const categories = new Set(projects.map((project) => project.frontmatter.category))
  return Array.from(categories)
}
