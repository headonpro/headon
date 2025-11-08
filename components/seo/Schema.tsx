/**
 * Schema Component
 *
 * Renders JSON-LD structured data for SEO
 * Used in pages to add schema markup
 */

import { generateSchemaScript } from '@/lib/seo/schema-builder'
import type { SchemaType } from '@/lib/types/schema'

interface SchemaProps {
  schema: SchemaType | SchemaType[]
}

export default function Schema({ schema }: SchemaProps) {
  const schemas = Array.isArray(schema) ? schema : [schema]

  return (
    <>
      {schemas.map((s, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: generateSchemaScript(s) }}
        />
      ))}
    </>
  )
}
