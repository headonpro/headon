import { Metadata } from 'next'
import { getBlogPost } from '@/lib/content/content-api'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://headon.pro'

interface GenerateMetadataProps {
  params: Promise<{
    slug: string
  }>
}

/**
 * Generate dynamic metadata for blog post pages
 */
export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const { slug } = await params

  // Load blog post
  const post = await getBlogPost(slug)

  // Fallback metadata if post not found
  if (!post) {
    return {
      title: 'Artikel nicht gefunden | HEADON.pro Blog',
      description: 'Der gesuchte Blogartikel konnte nicht gefunden werden.',
    }
  }

  const { frontmatter } = post

  // Build absolute URL for canonical and OpenGraph
  const pageUrl = `${baseUrl}/blog/${slug}`

  // Build OpenGraph image URL (use absolute URL)
  const ogImageUrl = frontmatter.image
    ? frontmatter.image.url.startsWith('http')
      ? frontmatter.image.url
      : `${baseUrl}${frontmatter.image.url}`
    : `${baseUrl}/headon-logo.svg`

  // Format published date for OpenGraph
  const publishedTime = frontmatter.publishedAt
  const modifiedTime = frontmatter.updatedAt || frontmatter.publishedAt

  return {
    title: `${frontmatter.title} | HEADON.pro Blog`,
    description: frontmatter.description,
    keywords: frontmatter.tags.join(', '),
    authors: [
      {
        name: frontmatter.author.name,
      },
    ],
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url: pageUrl,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: [frontmatter.author.name],
      tags: frontmatter.tags,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: frontmatter.image?.alt || frontmatter.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: pageUrl,
    },
  }
}
