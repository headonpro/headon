import Image from 'next/image'
import Link from 'next/link'
import { CopyButton } from './CopyButton'
import {
  WebDevMetrics,
  WebDevTechStack,
  NextJSArchitecture,
  MobileDevMetrics,
  MobileDevTechStack,
  NativeVsCrossPlatform,
  UIUXMetrics,
  UIUXTechStack,
  BackendMetrics,
  BackendTechStack,
  RESTvsGraphQL,
} from '@/components/services/ServiceComponents'
import {
  KeyTakeaways,
  InfoBox,
  CodeBlock,
  ComparisonBlock,
  BlogCTA,
  BlogStats,
  BlogTable,
} from '@/components/blog'
// Temporarily import TableOfContents directly to isolate the issue
// import { TableOfContents } from '@/components/blog/TableOfContents'

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
    <span className="my-8 block">
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
      className="rounded bg-gray-900 px-1.5 py-0.5 font-mono text-sm text-gray-100 before:content-[''] after:content-['']"
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
    <div className="group relative my-6">
      <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-gray-100" {...rest}>
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
    <div className="prose prose-lg prose-headings:font-heading prose-headings:text-gray-900 prose-p:text-gray-900 prose-p:leading-relaxed prose-a:!text-primary prose-a:!no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-strong:font-semibold prose-code:!bg-gray-900 prose-code:!text-gray-100 prose-code:!px-1.5 prose-code:!py-0.5 prose-code:!rounded prose-pre:!bg-gray-900 prose-pre:!text-gray-100 prose-blockquote:border-l-primary prose-blockquote:text-gray-900 max-w-none [&_h2]:mt-24 [&_h2]:mb-10 [&_h2]:text-3xl [&_h3]:mt-16 [&_h3]:mb-8 [&_h3]:text-2xl [&_h4]:mt-12 [&_h4]:mb-6 [&_h4]:text-xl [&_ol]:my-10 [&_ol_li]:mb-4 [&_p]:mb-10 [&_p]:text-lg [&_ul]:my-10 [&_ul_li]:mb-4">
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
  // Service Components (Web Dev)
  WebDevMetrics,
  WebDevTechStack,
  NextJSArchitecture,
  // Service Components (Mobile Dev)
  MobileDevMetrics,
  MobileDevTechStack,
  NativeVsCrossPlatform,
  // Service Components (UI/UX)
  UIUXMetrics,
  UIUXTechStack,
  // Service Components (Backend)
  BackendMetrics,
  BackendTechStack,
  RESTvsGraphQL,
  // Blog Components
  KeyTakeaways,
  InfoBox,
  CodeBlock,
  ComparisonBlock,
  BlogCTA,
  BlogStats,
  BlogTable,
}
