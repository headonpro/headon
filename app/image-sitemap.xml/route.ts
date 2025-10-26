import { NextResponse } from 'next/server'
import { getAllBlogPosts, getAllPortfolioProjects } from '@/lib/content/content-api'

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
 * Converts relative URLs to absolute URLs
 */
function makeAbsoluteUrl(url: string, baseUrl: string): string {
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  // Remove leading slash if present to avoid double slashes
  const cleanUrl = url.startsWith('/') ? url.slice(1) : url
  return `${baseUrl}/${cleanUrl}`
}

/**
 * Dynamic Image Sitemap Generator
 *
 * Generates XML image sitemap following Google's image sitemap specification
 * https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps
 *
 * Cached for 1 hour for optimal performance
 */
export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://headon.pro'

  try {
    // Load all content with images in parallel
    const [blogPosts, portfolioProjects] = await Promise.all([
      getAllBlogPosts(),
      getAllPortfolioProjects(),
    ])

    // Build XML sitemap
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n'
    xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n'

    let imageCount = 0
    const maxImages = 1000 // Google's recommended limit

    // Add blog post images
    for (const post of blogPosts) {
      if (imageCount >= maxImages) break

      const pageUrl = `${baseUrl}/blog/${post.slug}`
      const image = post.frontmatter.image

      if (image && image.url) {
        xml += `  <url>\n`
        xml += `    <loc>${escapeXml(pageUrl)}</loc>\n`
        xml += `    <image:image>\n`
        xml += `      <image:loc>${escapeXml(makeAbsoluteUrl(image.url, baseUrl))}</image:loc>\n`

        if (image.alt) {
          xml += `      <image:caption>${escapeXml(image.alt)}</image:caption>\n`
        }

        if (post.frontmatter.title) {
          xml += `      <image:title>${escapeXml(post.frontmatter.title)}</image:title>\n`
        }

        xml += `    </image:image>\n`
        xml += `  </url>\n`
        imageCount++
      }
    }

    // Add portfolio project images
    for (const project of portfolioProjects) {
      if (imageCount >= maxImages) break

      const pageUrl = `${baseUrl}/portfolio/${project.slug}`
      const image = project.frontmatter.image

      if (image && image.url) {
        xml += `  <url>\n`
        xml += `    <loc>${escapeXml(pageUrl)}</loc>\n`
        xml += `    <image:image>\n`
        xml += `      <image:loc>${escapeXml(makeAbsoluteUrl(image.url, baseUrl))}</image:loc>\n`

        if (image.alt) {
          xml += `      <image:caption>${escapeXml(image.alt)}</image:caption>\n`
        }

        if (project.frontmatter.title) {
          xml += `      <image:title>${escapeXml(project.frontmatter.title)}</image:title>\n`
        }

        xml += `    </image:image>\n`
        xml += `  </url>\n`
        imageCount++
      }
    }

    xml += '</urlset>'

    // Return XML with proper headers and caching
    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    })
  } catch (error) {
    console.error('Error generating image sitemap:', error)
    return new NextResponse('Error generating image sitemap', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    })
  }
}
