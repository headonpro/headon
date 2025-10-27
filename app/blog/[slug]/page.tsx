import { notFound } from 'next/navigation'
import { getBlogPost, getAllBlogPosts } from '@/lib/content/content-api'
import { compileMDXContent } from '@/lib/content/mdx-compiler'
import BlogPostContent from '@/components/sections/BlogPostContent'
import type { Metadata } from 'next'

/**
 * Generate static params for all blog posts at build time
 */
export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

/**
 * Generate metadata for blog post
 */
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const blogPost = await getBlogPost(slug, false) // Don't need related posts for metadata

  if (!blogPost) {
    return {
      title: 'Blog-Post nicht gefunden',
    }
  }

  const { frontmatter } = blogPost

  // Use SEO metadata if provided, otherwise fall back to default
  const title = frontmatter.seo?.title || `${frontmatter.title} | HEADON Blog`
  const description = frontmatter.seo?.description || frontmatter.description
  const ogImage = frontmatter.seo?.ogImage || frontmatter.image.url

  return {
    title,
    description,
    authors: [{ name: frontmatter.author.name }],
    keywords: frontmatter.keywords || frontmatter.tags,
    openGraph: {
      title,
      description,
      url: `https://headon.pro/blog/${slug}`,
      type: 'article',
      publishedTime: frontmatter.publishedAt,
      modifiedTime: frontmatter.updatedAt,
      authors: [frontmatter.author.name],
      tags: frontmatter.tags,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: frontmatter.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

/**
 * Blog Post Page
 * Server component that renders individual blog posts with TOC and related posts
 */
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params

  // Load blog post with TOC and related posts
  const blogPost = await getBlogPost(slug, true)

  // Return 404 if post not found
  if (!blogPost) {
    notFound()
  }

  // Compile MDX content
  const { content } = await compileMDXContent(blogPost.content)

  return (
    <BlogPostContent
      blogPost={blogPost}
      content={content}
      breadcrumbs={{
        items: [
          { name: 'Home', url: '/' },
          { name: 'Blog', url: '/blog' },
          { name: blogPost.frontmatter.title, url: `/blog/${slug}` },
        ],
      }}
    />
  )
}
