import Image from 'next/image'
import Link from 'next/link'
import { CopyButton } from './CopyButton'

interface MDXContentProps {
  children: React.ReactNode
}

/**
 * Custom Image component for MDX
 * Uses next/image for automatic optimization (WebP/AVIF)
 */
function MDXImage(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const { src, alt = '', width, height } = props

  if (!src || typeof src !== 'string') return null

  // Parse width and height
  const imgWidth = width ? parseInt(String(width), 10) : 1200
  const imgHeight = height ? parseInt(String(height), 10) : 630

  return (
    <span className="block my-8">
      <Image
        src={src}
        alt={alt}
        width={imgWidth}
        height={imgHeight}
        className="rounded-lg"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
      />
    </span>
  )
}

/**
 * Custom Link component for MDX
 * Uses next/link for internal links, regular anchor for external
 */
function MDXLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { href, children, ...rest } = props

  if (!href) return <a {...props}>{children}</a>

  // Check if link is internal (starts with / or #)
  const isInternal = href.startsWith('/') || href.startsWith('#')

  if (isInternal) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    )
  }

  // External link - open in new tab
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary hover:text-primary/80 underline"
      {...rest}
    >
      {children}
    </a>
  )
}

/**
 * Custom inline code component
 */
function MDXCode(props: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      className="px-1.5 py-0.5 rounded bg-gray-100 text-sm font-mono text-gray-900 before:content-[''] after:content-['']"
      {...props}
    />
  )
}

/**
 * Custom pre (code block) component with copy button
 */
function MDXPre(props: React.HTMLAttributes<HTMLPreElement>) {
  const { children, ...rest } = props

  // Extract text content for copy button
  let textContent = ''
  if (children && typeof children === 'object') {
    const child = children as React.ReactElement<{ children?: React.ReactNode }>
    if (child.props && child.props.children) {
      textContent =
        typeof child.props.children === 'string'
          ? child.props.children
          : String(child.props.children)
    }
  }

  return (
    <div className="relative group my-6">
      <pre
        className="overflow-x-auto p-4 rounded-lg bg-gray-900 text-gray-100"
        {...rest}
      >
        {children}
      </pre>
      {textContent && <CopyButton text={textContent} />}
    </div>
  )
}

/**
 * MDX Content wrapper component
 * Provides styled container and custom components for MDX rendering
 */
export default function MDXContent({ children }: MDXContentProps) {
  return (
    <div className="prose prose-lg max-w-none [&_p]:text-gray-700 [&_p]:text-lg [&_p]:leading-relaxed [&_p]:mb-8 [&_h2]:text-gray-900 [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mt-16 [&_h2]:mb-8 [&_h3]:text-gray-900 [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:mt-12 [&_h3]:mb-6 [&_h4]:text-gray-900 [&_h4]:text-xl [&_h4]:font-bold [&_h4]:mt-8 [&_h4]:mb-4 [&_ul]:my-8 [&_ul_li]:text-gray-700 [&_ul_li]:mb-3 [&_ol]:my-8 [&_ol_li]:text-gray-700 [&_ol_li]:mb-3 [&_strong]:text-gray-900 [&_strong]:font-semibold [&_a]:text-primary [&_a]:no-underline hover:[&_a]:underline">
      {children}
    </div>
  )
}

// Export custom MDX components for use in compileMDX
export const mdxComponents = {
  img: MDXImage,
  a: MDXLink,
  code: MDXCode,
  pre: MDXPre,
}
