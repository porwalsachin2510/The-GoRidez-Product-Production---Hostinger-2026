import { ArrowUpRight } from 'lucide-react'
import { Container, SectionHeading } from '@/components/site/primitives'
import { externalUrl } from '@/lib/external-url'
import type { ClientData } from '@/lib/data/queries'

/**
 * Trust bar / logo wall. Surfaces published clients from the CMS. Renders
 * nothing when there are no clients so the home page never shows an empty rail.
 *
 * Each tile always shows the client *name* under the logo — a wall of
 * unlabelled marks reads as decoration and is useless to screen readers.
 */
function ClientTile({ client, href }: { client: ClientData; href: string | null }) {
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border border-border bg-card px-5 py-7 text-center transition-all duration-300 group-hover:-translate-y-1 group-hover:border-accent/40 group-hover:shadow-[0_20px_45px_-20px] group-hover:shadow-primary/25">
      {/* top gradient accent line, revealed on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-brand-gradient transition-transform duration-500 group-hover:scale-x-100"
      />

      {/* external-link arrow, only when a website exists */}
      {href && (
        <span
          aria-hidden="true"
          className="absolute right-3 top-3 flex h-7 w-7 scale-90 items-center justify-center rounded-full bg-brand-gradient text-white opacity-0 shadow-sm transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"
        >
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      )}

      <div className="flex h-11 items-center justify-center">
        {client.logo ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={client.logo}
            alt={`${client.name} logo`}
            className="h-11 w-auto max-w-[140px] object-contain opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
            loading="lazy"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-accent/15 to-primary/15 font-display text-base font-bold text-primary transition-all duration-300 group-hover:bg-brand-gradient group-hover:from-accent group-hover:to-primary group-hover:text-white"
          >
            {client.name.trim().charAt(0).toUpperCase() || 'C'}
          </span>
        )}
      </div>

      {/* short hairline divider */}
      <span aria-hidden="true" className="h-px w-8 bg-border transition-colors duration-300 group-hover:bg-accent/50" />

      <div className="flex flex-col items-center gap-2">
        <span className="text-sm font-semibold leading-snug text-foreground text-pretty transition-colors group-hover:text-accent">
          {client.name}
        </span>
        {client.industry && (
          <span className="inline-flex items-center rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium leading-snug text-muted-foreground">
            {client.industry}
          </span>
        )}
      </div>
    </div>
  )
}

export function ClientWall({
  clients,
  eyebrow = 'Trusted by',
  title = 'Enterprises that move with GoRidez',
  compact = false,
}: {
  clients: ClientData[]
  eyebrow?: string
  title?: string
  compact?: boolean
}) {
  if (!clients?.length) return null

  const industryCount = new Set(
    clients.map((c) => c.industry?.trim().toLowerCase()).filter(Boolean),
  ).size

  const stats: { value: string; label: string }[] = [
    { value: `${clients.length}${clients.length >= 5 ? '+' : ''}`, label: 'enterprise clients' },
  ]
  if (industryCount > 0) {
    stats.push({ value: String(industryCount), label: industryCount === 1 ? 'industry' : 'industries' })
  }

  return (
    <section className={compact ? 'py-12' : 'py-16 sm:py-24'}>
      <Container>
        {!compact && (
          <SectionHeading eyebrow={eyebrow} title={title} align="center" className="mb-12" />
        )}

        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {clients.map((c) => {
            const href = externalUrl(c.website)
            return (
              <li key={c._id} className="group">
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                    aria-label={`${c.name} — visit website (opens in a new tab)`}
                  >
                    <ClientTile client={c} href={href} />
                  </a>
                ) : (
                  <ClientTile client={c} href={null} />
                )}
              </li>
            )
          })}
        </ul>

        {!compact && stats.length > 0 && (
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
            {stats.map((s, i) => (
              <span key={s.label} className="inline-flex items-center gap-3">
                {i > 0 && <span aria-hidden="true" className="h-1 w-1 rounded-full bg-border" />}
                <span>
                  <span className="font-display font-bold text-brand-gradient">{s.value}</span>{' '}
                  {s.label}
                </span>
              </span>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
