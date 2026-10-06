import { Fragment } from 'react'

/**
 * Renders CMS text where words wrapped in *asterisks* are highlighted in the
 * brand accent colour, e.g. "Keep organisations *moving*".
 */
export function AccentText({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean)
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('*') && part.endsWith('*') && part.length > 2 ? (
          <span key={i} className="text-accent">
            {part.slice(1, -1)}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  )
}

export function stripAccent(text: string) {
  return text.replace(/\*/g, '')
}
