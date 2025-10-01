import { compileMDX } from 'next-mdx-remote/rsc'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { mdxComponents } from '@/components/content/MDXContent'

/**
 * Compiles MDX content to React components with syntax highlighting and auto-linking
 * @param content - Raw MDX content string (without frontmatter)
 * @returns Compiled MDX content and components
 */
export async function compileMDXContent(content: string) {
  const result = await compileMDX({
    source: content,
    options: {
      parseFrontmatter: false, // Frontmatter already parsed by mdx-loader
      mdxOptions: {
        rehypePlugins: [
          // Syntax highlighting with Shiki
          [
            rehypePrettyCode,
            {
              theme: 'github-dark',
              keepBackground: true,
            },
          ],
          // Add IDs to all headings
          rehypeSlug,
          // Auto-link headings
          [
            rehypeAutolinkHeadings,
            {
              behavior: 'wrap',
              properties: {
                className: ['anchor-link'],
              },
            },
          ],
        ],
      },
    },
    components: mdxComponents,
  })

  return result
}
