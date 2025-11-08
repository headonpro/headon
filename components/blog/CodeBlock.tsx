'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, Code2 } from 'lucide-react'
import { CopyButton } from '@/components/content/CopyButton'

interface CodeBlockProps {
  children: React.ReactNode
  title?: string
  language?: string
  collapsible?: boolean
  defaultOpen?: boolean
}

/**
 * CodeBlock Component
 * Collapsible code block with toggle, syntax highlighting preserved
 * Supports copy functionality and optional language label
 */
export function CodeBlock({
  children,
  title,
  language,
  collapsible = true,
  defaultOpen = false,
}: CodeBlockProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  // Extract text content for copy button
  const getTextContent = (node: React.ReactNode): string => {
    if (typeof node === 'string') return node
    if (typeof node === 'number') return String(node)
    if (Array.isArray(node)) return node.map(getTextContent).join('')
    if (node && typeof node === 'object' && 'props' in node) {
      const element = node as React.ReactElement<{ children?: React.ReactNode }>
      return getTextContent(element.props.children)
    }
    return ''
  }

  const textContent = getTextContent(children)

  if (!collapsible) {
    return (
      <div className="group relative my-6">
        {(title || language) && (
          <div className="mb-2 flex items-center gap-2">
            <Code2 className="h-4 w-4 text-gray-500" />
            {title && <span className="text-sm font-medium text-gray-700">{title}</span>}
            {language && (
              <span className="rounded bg-gray-800 px-2 py-0.5 text-xs text-gray-300">
                {language}
              </span>
            )}
          </div>
        )}
        <div className="relative overflow-x-auto rounded-lg bg-gray-900">
          {children}
          {textContent && <CopyButton text={textContent} />}
        </div>
      </div>
    )
  }

  return (
    <div className="my-6 rounded-lg border border-gray-200 bg-white shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-gray-50"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          <Code2 className="h-5 w-5 text-gray-600" />
          <span className="font-medium text-gray-900">{title || 'Code anzeigen'}</span>
          {language && (
            <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
              {language}
            </span>
          )}
        </div>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </button>

      {isOpen && (
        <div className="group relative border-t border-gray-200">
          <div className="overflow-x-auto rounded-b-lg bg-gray-900">{children}</div>
          {textContent && <CopyButton text={textContent} />}
        </div>
      )}
    </div>
  )
}
