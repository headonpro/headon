'use client'

import { Calendar, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const posts = [
  {
    id: 1,
    title: 'Die Zukunft von Web Development: Was erwartet uns 2024?',
    excerpt: 'Ein Blick auf die neuesten Trends und Technologien, die die Webentwicklung revolutionieren werden.',
    author: 'Max Mustermann',
    date: '2024-01-15',
    readTime: '5 min',
    category: 'Development',
    slug: 'zukunft-web-development-2024',
  },
  {
    id: 2,
    title: 'Mobile First: Warum responsive Design nicht mehr ausreicht',
    excerpt: 'Erfahren Sie, warum Mobile First Design heute wichtiger ist als je zuvor und wie Sie es richtig umsetzen.',
    author: 'Anna Schmidt',
    date: '2024-01-12',
    readTime: '8 min',
    category: 'Design',
    slug: 'mobile-first-design',
  },
  {
    id: 3,
    title: 'TypeScript vs JavaScript: Ein umfassender Vergleich',
    excerpt: 'Wann sollten Sie TypeScript verwenden und wann ist JavaScript die bessere Wahl? Wir klären auf.',
    author: 'Tom Weber',
    date: '2024-01-10',
    readTime: '10 min',
    category: 'Development',
    slug: 'typescript-vs-javascript',
  },
  {
    id: 4,
    title: 'Supabase: Die Open-Source Alternative zu Firebase',
    excerpt: 'Entdecken Sie, wie Supabase Ihre Backend-Entwicklung revolutionieren kann.',
    author: 'Lisa Müller',
    date: '2024-01-08',
    readTime: '7 min',
    category: 'Backend',
    slug: 'supabase-alternative-firebase',
  },
]

const categories = ['Alle', 'Development', 'Design', 'Backend', 'Business']

export default function BlogPage() {
  const [isMobile, setIsMobile] = useState(false)

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

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Gradient Background - same as HeroSection */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500" />

      {/* Animated Gradient Layers */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-60"
          animate={{
            background: isMobile ? [
              'radial-gradient(circle at 30% 70%, rgba(255, 140, 0, 0.5) 0%, transparent 40%)',
              'radial-gradient(circle at 70% 30%, rgba(255, 215, 0, 0.5) 0%, transparent 40%)',
              'radial-gradient(circle at 30% 70%, rgba(255, 140, 0, 0.5) 0%, transparent 40%)',
            ] : [
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
            ease: "linear"
          }}
          style={{
            transform: 'translateZ(0)',
            willChange: 'background'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">
            Blog
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Insights, Tutorials und News aus der Welt der digitalen Innovation.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category === 'Alle'
                  ? 'bg-white/20 backdrop-blur-sm text-white border border-white/30'
                  : 'bg-white/10 backdrop-blur-sm text-white/80 hover:bg-white/15 border border-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group overflow-hidden rounded-lg bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              <div className="aspect-video bg-gradient-to-br from-white/10 to-white/5" />
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-white/70 mb-3">
                  <span className="text-white font-medium">{post.category}</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <time>{new Date(post.date).toLocaleDateString('de-DE')}</time>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <h2 className="text-xl font-semibold mb-2 text-white group-hover:text-white/90 transition-colors">
                  {post.title}
                </h2>
                <p className="text-white/80 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white/70">
                    Von {post.author}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-white hover:gap-2 transition-all"
                  >
                    Weiterlesen
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-16">
          <div className="rounded-lg bg-white/10 backdrop-blur-md border border-white/20 p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-white">Bleiben Sie auf dem Laufenden</h2>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Abonnieren Sie unseren Newsletter und erhalten Sie die neuesten Artikel,
              Tutorials und Insights direkt in Ihr Postfach.
            </p>
            <form className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="ihre@email.de"
                className="flex-1 rounded-md border border-white/30 bg-white/10 backdrop-blur-sm px-3 py-2 text-sm text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <button
                type="submit"
                className="rounded-md bg-white/20 backdrop-blur-sm px-6 py-2 text-sm font-medium text-white hover:bg-white/25 transition-colors border border-white/30"
              >
                Abonnieren
              </button>
            </form>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}