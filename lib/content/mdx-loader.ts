/**
 * MDX Loader Utility
 *
 * Core utility for loading MDX content files from the content/ directory.
 * Reads files, extracts frontmatter using gray-matter, validates with Zod schemas.
 *
 * Security: Sanitizes file paths to prevent directory traversal attacks.
 */

import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'
import {
  blogPostFrontmatterSchema,
  portfolioProjectFrontmatterSchema,
  servicePageFrontmatterSchema,
  cityPageFrontmatterSchema,
  brancheFrontmatterSchema,
  technologyFrontmatterSchema,
  type BlogPostFrontmatterData,
  type PortfolioProjectFrontmatterData,
  type ServicePageFrontmatterData,
  type CityPageFrontmatterData,
  type BranchePageFrontmatterData,
  type TechnologyPageFrontmatterData,
} from './frontmatter'

// ============================================================================
// Types
// ============================================================================

export type ContentType = 'blog' | 'portfolio' | 'services' | 'cities' | 'branchen' | 'technologie'

export interface BlogContentResult {
  slug: string
  frontmatter: BlogPostFrontmatterData
  content: string
}

export interface PortfolioContentResult {
  slug: string
  frontmatter: PortfolioProjectFrontmatterData
  content: string
}

export interface ServiceContentResult {
  slug: string
  frontmatter: ServicePageFrontmatterData
  content: string
}

export interface CityContentResult {
  slug: string
  frontmatter: CityPageFrontmatterData
  content: string
}

export interface BrancheContentResult {
  slug: string
  frontmatter: BranchePageFrontmatterData
  content: string
}

export interface TechnologyContentResult {
  slug: string
  frontmatter: TechnologyPageFrontmatterData
  content: string
}

export type ContentResult =
  | BlogContentResult
  | PortfolioContentResult
  | ServiceContentResult
  | CityContentResult
  | BrancheContentResult
  | TechnologyContentResult

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Sanitizes slug to prevent directory traversal attacks
 * Only allows alphanumeric characters, hyphens, and underscores
 */
function sanitizeSlug(slug: string): string {
  // Remove any path separators and parent directory references
  const cleaned = slug.replace(/[\/\\\.]/g, '-')
  // Only allow safe characters: alphanumeric, hyphens, underscores
  return cleaned.replace(/[^a-zA-Z0-9-_]/g, '')
}

/**
 * Gets the content directory path for a given content type
 */
function getContentDirectory(contentType: ContentType): string {
  const baseDir = path.join(process.cwd(), 'content')

  switch (contentType) {
    case 'blog':
      return path.join(baseDir, 'blog')
    case 'portfolio':
      return path.join(baseDir, 'portfolio')
    case 'services':
      return path.join(baseDir, 'services')
    case 'cities':
      return path.join(baseDir, 'cities')
    case 'branchen':
      return path.join(baseDir, 'branchen')
    case 'technologie':
      return path.join(baseDir, 'technologie')
    default:
      throw new Error(`Invalid content type: ${contentType}`)
  }
}

/**
 * Gets the appropriate Zod schema for a content type
 */
function getValidationSchema(contentType: ContentType) {
  switch (contentType) {
    case 'blog':
      return blogPostFrontmatterSchema
    case 'portfolio':
      return portfolioProjectFrontmatterSchema
    case 'services':
      return servicePageFrontmatterSchema
    case 'cities':
      return cityPageFrontmatterSchema
    case 'branchen':
      return brancheFrontmatterSchema
    case 'technologie':
      return technologyFrontmatterSchema
    default:
      throw new Error(`Invalid content type: ${contentType}`)
  }
}

// ============================================================================
// Main Loader Function
// ============================================================================

/**
 * Loads and validates an MDX file from the content directory
 *
 * @param slug - The slug of the content (filename without .mdx extension)
 * @param contentType - The type of content to load
 * @returns ContentResult object or null if file not found
 *
 * @example
 * ```ts
 * const post = await loadMDX('my-first-post', 'blog')
 * if (post) {
 *   console.log(post.frontmatter.title)
 * }
 * ```
 */
export async function loadMDX(
  slug: string,
  contentType: ContentType
): Promise<ContentResult | null> {
  try {
    // Sanitize slug to prevent directory traversal
    const sanitizedSlug = sanitizeSlug(slug)

    if (sanitizedSlug !== slug) {
      console.warn(`Slug "${slug}" was sanitized to "${sanitizedSlug}" for security`)
    }

    // Build file path
    const contentDir = getContentDirectory(contentType)
    const filePath = path.join(contentDir, `${sanitizedSlug}.mdx`)

    // Verify the file path is within the content directory (additional security check)
    const resolvedPath = path.resolve(filePath)
    const resolvedContentDir = path.resolve(contentDir)
    if (!resolvedPath.startsWith(resolvedContentDir)) {
      console.error(`Security: Attempted to access file outside content directory: ${filePath}`)
      return null
    }

    // Read file
    const fileContent = await fs.readFile(filePath, 'utf-8')

    // Parse frontmatter and content
    const { data: frontmatter, content } = matter(fileContent)

    // Validate frontmatter with appropriate Zod schema
    const schema = getValidationSchema(contentType)
    const validatedFrontmatter = schema.parse(frontmatter)

    // Return typed result based on content type
    return {
      slug: sanitizedSlug,
      frontmatter: validatedFrontmatter,
      content,
    } as ContentResult
  } catch (error) {
    // Handle file not found gracefully
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return null
    }

    // Re-throw validation errors and other errors
    throw error
  }
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Lists all MDX files in a content directory
 *
 * @param contentType - The type of content to list
 * @returns Array of slugs (filenames without .mdx extension)
 */
export async function listContentSlugs(contentType: ContentType): Promise<string[]> {
  try {
    const contentDir = getContentDirectory(contentType)
    const files = await fs.readdir(contentDir)

    return files.filter((file) => file.endsWith('.mdx')).map((file) => file.replace(/\.mdx$/, ''))
  } catch (error) {
    // Return empty array if directory doesn't exist
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return []
    }
    throw error
  }
}

/**
 * Checks if an MDX file exists for a given slug
 *
 * @param slug - The slug to check
 * @param contentType - The type of content
 * @returns true if file exists, false otherwise
 */
export async function contentExists(slug: string, contentType: ContentType): Promise<boolean> {
  const sanitizedSlug = sanitizeSlug(slug)
  const contentDir = getContentDirectory(contentType)
  const filePath = path.join(contentDir, `${sanitizedSlug}.mdx`)

  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}
