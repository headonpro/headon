'use client'

import { Calendar, Clock, ArrowRight, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { BlogContentResult } from '@/lib/content/mdx-loader'
import type { BlogCategory } from '@/lib/types/content'

interface BlogContentProps {
  posts: BlogContentResult[]
  categories: BlogCategory[]
  selectedCategory?: BlogCategory
  currentPage: number
  totalPages: number
  searchQuery: string
}

export default function BlogContent({
  posts,
  categories,
  selectedCategory,
  currentPage,
  totalPages,
  searchQuery: initialSearchQuery,
}: BlogContentProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [searchInput, setSearchInput] = useState(initialSearchQuery)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== initialSearchQuery) {
        const params = new URLSearchParams(searchParams.toString())
        if (searchInput) {
          params.set('search', searchInput)
        } else {
          params.delete('search')
        }
        params.delete('page') // Reset to page 1 on search
        router.push(`/blog?${params.toString()}`)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [searchInput, initialSearchQuery, router, searchParams])

  const handleCategoryFilter = (category: BlogCategory | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (category) {
      params.set('category', category)
    } else {
      params.delete('category')
    }
    params.delete('page') // Reset to page 1 on filter
    router.push(`/blog?${params.toString()}`)
  }

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    router.push(`/blog?${params.toString()}`)
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="from-primary-600 via-primary-500 to-secondary-500 absolute inset-0 bg-gradient-to-br" />

      {/* Animated Gradient Layers */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-60"
          animate={{
            background: isMobile
              ? [
                  'radial-gradient(circle at 30% 70%, rgba(255, 140, 0, 0.5) 0%, transparent 40%)',
                  'radial-gradient(circle at 70% 30%, rgba(255, 215, 0, 0.5) 0%, transparent 40%)',
                  'radial-gradient(circle at 30% 70%, rgba(255, 140, 0, 0.5) 0%, transparent 40%)',
                ]
              : [
                  'radial-gradient(circle at 20% 80%, rgba(255, 140, 0, 0.4) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 20%, rgba(255, 215, 0, 0.4) 0%, transparent 50%)',
                  'radial-gradient(circle at 40% 40%, rgba(255, 140, 0, 0.4) 0%, transparent 50%)',
                  'radial-gradient(circle at 60% 60%, rgba(255, 215, 0, 0.4) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 80%, rgba(255, 140, 0, 0.4) 0%, transparent 50%)',
                ],
          }}
          transition={{
            duration: isMobile ? 8 : 10,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            transform: 'translateZ(0)',
            willChange: 'background',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 pt-40 pb-24">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-heading mb-12 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Blog
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mx-auto max-w-3xl text-lg text-white/90"
            >
              Insights, Trends und Best Practices aus der Welt der digitalen Innovation
            </motion.p>
          </motion.div>

          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            {/* Search Bar */}
            <div className="mx-auto mb-8 max-w-2xl">
              <div className="relative">
                <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-white/50" />
                <input
                  type="text"
                  placeholder="Artikel durchsuchen..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="focus:ring-accent-500 w-full rounded-2xl border border-white/20 bg-white/10 py-4 pr-4 pl-12 text-white placeholder-white/50 backdrop-blur-md transition-all focus:border-transparent focus:ring-2 focus:outline-none"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => handleCategoryFilter(null)}
                className={`rounded-full px-6 py-2 font-medium transition-all ${
                  !selectedCategory
                    ? 'bg-accent-500 text-primary-900'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                Alle
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryFilter(category)}
                  className={`rounded-full px-6 py-2 font-medium capitalize transition-all ${
                    selectedCategory === category
                      ? 'bg-accent-500 text-primary-900'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Blog Posts Grid */}
          {posts.length > 0 ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              >
                {posts.map((post, index) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group block"
                  >
                    <motion.article
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 + index * 0.05 }}
                      className="relative h-full overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-white/30 hover:bg-white/15 hover:shadow-2xl cursor-pointer"
                    >
                      <div className="p-8">
                        <div className="mb-4 flex flex-wrap items-center gap-4">
                          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white capitalize">
                            {post.frontmatter.category}
                          </span>
                          <div className="flex items-center gap-2 text-sm text-white/70">
                            <Calendar className="h-4 w-4" />
                            <time dateTime={post.frontmatter.publishedAt}>
                              {new Date(post.frontmatter.publishedAt).toLocaleDateString('de-DE', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </time>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-white/70">
                            <Clock className="h-4 w-4" />
                            <span>{post.frontmatter.readingTime} Min.</span>
                          </div>
                        </div>

                        <h2 className="group-hover:text-accent-300 mb-3 line-clamp-2 text-xl font-bold text-white transition-colors">
                          {post.frontmatter.title}
                        </h2>

                        <p className="mb-6 line-clamp-3 leading-relaxed text-white/80">
                          {post.frontmatter.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-white/70">
                            von {post.frontmatter.author.name}
                          </span>
                          <span className="text-accent-400 group-hover:text-accent-300 inline-flex items-center gap-2 text-sm font-medium transition-colors">
                            Weiterlesen
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </div>
                    </motion.article>
                  </Link>
                ))}
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="mt-16 flex items-center justify-center gap-2"
                >
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="rounded-lg border border-white/20 bg-white/10 p-3 text-white backdrop-blur-md transition-all hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label="Vorherige Seite"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                      // Show first page, last page, current page, and pages around current
                      const showPage =
                        page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1

                      if (!showPage && page === 2 && currentPage > 3) {
                        return (
                          <span key={page} className="px-2 text-white/50">
                            ...
                          </span>
                        )
                      }

                      if (!showPage && page === totalPages - 1 && currentPage < totalPages - 2) {
                        return (
                          <span key={page} className="px-2 text-white/50">
                            ...
                          </span>
                        )
                      }

                      if (!showPage) return null

                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`min-w-[44px] rounded-lg px-4 py-2 font-medium transition-all ${
                            currentPage === page
                              ? 'bg-accent-500 text-primary-900'
                              : 'border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white/20'
                          }`}
                        >
                          {page}
                        </button>
                      )
                    })}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="rounded-lg border border-white/20 bg-white/10 p-3 text-white backdrop-blur-md transition-all hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50"
                    aria-label="Nächste Seite"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </motion.div>
              )}
            </>
          ) : (
            /* No Results */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="py-24 text-center"
            >
              <div className="rounded-2xl border border-white/20 bg-white/10 p-12 backdrop-blur-md">
                <h3 className="mb-4 text-2xl font-bold text-white">Keine Artikel gefunden</h3>
                <p className="mb-6 text-white/80">
                  Versuchen Sie es mit anderen Suchbegriffen oder Filtern.
                </p>
                <button
                  onClick={() => {
                    setSearchInput('')
                    handleCategoryFilter(null)
                  }}
                  className="from-accent-500 to-secondary-500 text-primary hover:from-accent-600 hover:to-secondary-600 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r px-6 py-3 font-semibold transition-all"
                >
                  Alle Artikel anzeigen
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
