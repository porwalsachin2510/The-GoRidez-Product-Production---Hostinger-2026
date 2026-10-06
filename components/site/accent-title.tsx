/**
 * Renders a hero title as two lines with the second line in the brand accent:
 * "Sedans (Economy & Premium)" splits at the parenthesis, otherwise the title
 * splits roughly in half by words.
 */
export function AccentTitle({ title }: { title: string }) {
  let lead = title
  let accent = ''
  const paren = title.indexOf(' (')
  if (paren > 0) {
    lead = title.slice(0, paren)
    accent = title.slice(paren + 1)
  } else {
    const words = title.split(' ')
    if (words.length > 2) {
      const cut = Math.floor(words.length / 2)
      lead = words.slice(0, cut).join(' ')
      accent = words.slice(cut).join(' ')
    }
  }
  return (
    <>
      {lead}
      {accent && (
        <>
          <br />
          <span className="text-accent">{accent}</span>
        </>
      )}
    </>
  )
}
