// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function JsonLd({ data }: { data: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD content is fully server-controlled (no user input), so this is safe.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
