import { Calendar, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'

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
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            Blog
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
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
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
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
              className="group overflow-hidden rounded-lg border bg-card hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20" />
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="text-primary font-medium">{post.category}</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <time>{new Date(post.date).toLocaleDateString('de-DE')}</time>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Von {post.author}
                  </span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all"
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
          <div className="rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Bleiben Sie auf dem Laufenden</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Abonnieren Sie unseren Newsletter und erhalten Sie die neuesten Artikel, 
              Tutorials und Insights direkt in Ihr Postfach.
            </p>
            <form className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="ihre@email.de"
                className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                type="submit"
                className="rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Abonnieren
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}