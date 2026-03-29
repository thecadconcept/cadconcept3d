/**
 * Reusable JSON-LD renderer.
 * Usage:
 *   <JsonLd schema={mySchemaObject} />
 *   <JsonLd schema={[schema1, schema2]} />
 *
 * Place this inside any Server Component (e.g. layout.tsx or a page).
 * For multiple schemas on one page, pass an array or render multiple instances.
 */

type JsonLdProps = {
  schema: Record<string, unknown> | Record<string, unknown>[]
}

export default function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
