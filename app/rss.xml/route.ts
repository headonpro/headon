import { NextResponse } from 'next/server'
import { getAllBlogPosts } from '@/lib/content/content-api'

/**
 * XML escape helper function
 * Escapes special XML characters: &, <, >, ", '
 */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/**
 * Strip MDX/HTML and extract plain text description
 * Takes first 200 characters of content
 */
function extractDescription(content: string, maxLength: number = 200): string {
  // Remove MDX/HTML tags and common markdown syntax
  let text = content
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/#{1,6}\s+/g, '') // Remove headers
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Convert links to text
    .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1') // Remove bold/italic
    .replace(/\n+/g, ' ') // Replace newlines with spaces
    .trim()

  // Truncate to maxLength, preserving word boundaries
  if (text.length > maxLength) {
    text = text.substring(0, maxLength)
    const lastSpace = text.lastIndexOf(' ')
    if (lastSpace > 0) {
      text = text.substring(0, lastSpace)
    }
    text += '...'
  }

  return text
}

/**
 * RSS 2.0 Feed Generator
 *
 * Generates RSS feed following RSS 2.0 specification
 * https://www.rssboard.org/rss-specification
 *
 * Includes latest 20 blog posts, cached for 1 hour
 */
export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://headon.pro'

  try {
    // Load latest 20 blog posts sorted by date descending
    const allPosts = await getAllBlogPosts({
      sortBy: 'date',
      sortDirection: 'desc',
    })
    const latestPosts = allPosts.slice(0, 20)

    const now = new Date()

    // Build RSS 2.0 XML
    let rss = '<?xml version="1.0" encoding="UTF-8"?>\n'
    rss += '<rss version="2.0">\n'
    rss += '  <channel>\n'
    rss += `    <title>${escapeXml('HEADON.pro Blog')}</title>\n`
    rss += `    <description>${escapeXml('Neueste Artikel über Webentwicklung, Mobile Apps, UI/UX Design und Performance-Optimierung von HEADON.pro')}</description>\n`
    rss += `    <link>${escapeXml(`${baseUrl}/blog`)}</link>\n`
    rss += `    <language>de</language>\n`
    rss += `    <lastBuildDate>${now.toUTCString()}</lastBuildDate>\n`

    // Add item for each blog post
    for (const post of latestPosts) {
      const postUrl = `${baseUrl}/blog/${post.slug}`
      const pubDate = new Date(post.frontmatter.publishedAt).toUTCString()
      const description = post.frontmatter.description || extractDescription(post.content)

      rss += '    <item>\n'
      rss += `      <title>${escapeXml(post.frontmatter.title)}</title>\n`
      rss += `      <link>${escapeXml(postUrl)}</link>\n`
      rss += `      <description>${escapeXml(description)}</description>\n`
      rss += `      <pubDate>${pubDate}</pubDate>\n`
      rss += `      <guid isPermaLink="true">${escapeXml(postUrl)}</guid>\n`

      // Add category for each tag
      for (const tag of post.frontmatter.tags) {
        rss += `      <category>${escapeXml(tag)}</category>\n`
      }

      rss += '    </item>\n'
    }

    rss += '  </channel>\n'
    rss += '</rss>'

    // Return RSS XML with proper headers and caching
    return new NextResponse(rss, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    })
  } catch (error) {
    console.error('Error generating RSS feed:', error)
    return new NextResponse('Error generating RSS feed', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  }
}
