import type { Metadata } from 'next'
import BlogContent from '@/components/sections/BlogContent'
import { getAllBlogPosts, getBlogCategories } from '@/lib/content/content-api'
import type { BlogCategory } from '@/lib/types/content'

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

interface BlogPageProps {
  searchParams: Promise<{
    page?: string
    category?: string
    search?: string
  }>
}

const POSTS_PER_PAGE = 12

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const currentPage = parseInt(params.page || '1', 10)
  const selectedCategory = params.category as BlogCategory | undefined
  const searchQuery = params.search || ''

  // Load all posts
  const allPosts = await getAllBlogPosts({
    sortBy: 'date',
    sortDirection: 'desc',
  })

  // Get all unique categories
  const categories = await getBlogCategories()

  // Filter by category if selected
  let filteredPosts = selectedCategory
    ? allPosts.filter((post) => post.frontmatter.category === selectedCategory)
    : allPosts

  // Filter by search query (client-side filtering for simplicity)
  if (searchQuery) {
    const query = searchQuery.toLowerCase()
    filteredPosts = filteredPosts.filter(
      (post) =>
        post.frontmatter.title.toLowerCase().includes(query) ||
        post.frontmatter.description.toLowerCase().includes(query)
    )
  }

  // Calculate pagination
  const totalPosts = filteredPosts.length
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex)

  return (
    <BlogContent
      posts={paginatedPosts}
      categories={categories}
      selectedCategory={selectedCategory}
      currentPage={currentPage}
      totalPages={totalPages}
      searchQuery={searchQuery}
    />
  )
}