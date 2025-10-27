/**
 * Table of Contents Generator
 *
 * Generates a table of contents from Markdown heading content.
 * Extracts H2 and H3 headings with slugified IDs for navigation.
 */

export interface TOCItem {
  id: string
  title: string
  level: 2 | 3
}

/**
 * Generates a slug from heading text
 * - Converts to lowercase
 * - Replaces spaces with hyphens
 * - Removes special characters except hyphens
 * - Removes duplicate hyphens
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special chars except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

/**
 * Generates a table of contents from MDX content
 * Extracts H2 (##) and H3 (###) headings
 *
 * @param content - Raw MDX content string
 * @returns Array of TOC items with id, title, and level
 *
 * @example
 * ```ts
 * const toc = generateTOC('## Introduction\nSome text\n### Setup\n')
 * // Returns: [
 * //   { id: 'introduction', title: 'Introduction', level: 2 },
 * //   { id: 'setup', title: 'Setup', level: 3 }
 * // ]
 * ```
 */
export function generateTOC(content: string): TOCItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const toc: TOCItem[] = []
  const seenIds = new Set<string>()

  let match
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length as 2 | 3
    const title = match[2].trim()

    // Generate base slug
    const id = slugify(title)

    // Handle duplicate IDs by appending numbers
    let finalId = id
    let counter = 1
    while (seenIds.has(finalId)) {
      finalId = `${id}-${counter}`
      counter++
    }
    seenIds.add(finalId)

    toc.push({
      id: finalId,
      title,
      level,
    })
  }

  return toc
}

/**
 * Validates that content has at least one heading for TOC
 */
export function hasTOC(content: string): boolean {
  return /^#{2,3}\s+.+$/m.test(content)
}
