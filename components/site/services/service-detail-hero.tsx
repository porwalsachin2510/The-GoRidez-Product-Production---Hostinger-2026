import Link from 'next/link'
import { ArrowRight, ChevronRight, Users } from 'lucide-react'
import { Container } from '@/components/site/primitives'
import { Reveal } from '@/components/site/reveal'
import { HeroArchImage } from '@/components/site/rounded-photo-hero'
import type { ClientData } from '@/lib/data/queries'

type Crumb = { name: string; href?: string }

function splitHighlight(title: string) {
  const match = title.match(/^(.*?)(\s+in\s+\S+)$/i)
  return match ? { lead: match[1], highlight: match[2].trim() } : { lead: title, highlight: '' }
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('')
}

export function ServiceDetailHero({
  eyebrow,
  title,
  description,
  image,
  breadcrumbs,
  cta,
  clients,
}: {
  eyebrow: string
  title: string
  description?: string
  image?: string | null
  breadcrumbs: Crumb[]
  cta?: { label?: string; href?: string }
  clients: ClientData[]
}) {
  const { lead, highlight } = splitHighlight(title)
  const avatars = clients.slice(0, 4)

  return (
    <section className="relative isolate overflow-hidden bg-navy pt-20 text-white lg:pt-[7.5rem]">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,color-mix(in_oklch,var(--accent)_18%,transparent),transparent_55%)]"
      />
      <div className="grid lg:grid-cols-2">
        <Container className="py-14 sm:py-16 lg:mr-0 lg:max-w-[40rem] lg:py-20 lg:pr-10">
          <Reveal>
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/60">
                {breadcrumbs.map((b, i) => (
                  <li key={`${b.name}-${i}`} className="flex items-center gap-1.5">
                    {b.href ? (
                      <Link href={b.href} className="text-accent transition-colors hover:text-white">
                        {b.name}
                      </Link>
                    ) : (
                      <span aria-current="page" className="text-white/80">
                        {b.name}
                      </span>
                    )}
                    {i < breadcrumbs.length - 1 && <ChevronRight className="h-3 w-3" aria-hidden="true" />}
                  </li>
                ))}
              </ol>
            </nav>
            <span className="mt-8 block text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {eyebrow}
            </span>
            <h1 className="mt-3 font-display text-4xl font-bold leading-[1.1] tracking-tight text-balance sm:text-5xl">
              {lead}
              {highlight && (
                <>
                  {' '}
                  <span className="block text-accent">{highlight}</span>
                </>
              )}
            </h1>
            {description && (
              <p className="mt-6 max-w-lg text-base leading-relaxed text-white/80 text-pretty">
                {description}
              </p>
            )}
            <Link
              href={cta?.href || '/contact'}
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition hover:brightness-110"
            >
              {cta?.label || 'Get a Quote'}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </Reveal>
        </Container>

        <HeroArchImage image={image} imageAlt={title}>
          {avatars.length > 0 && (
            <div className="absolute bottom-6 left-4 z-10 rounded-2xl bg-card p-4 text-card-foreground shadow-2xl sm:left-8 lg:-left-6 lg:bottom-8">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Users className="h-4 w-4" aria-hidden="true" />
                </span>
                <p className="max-w-44 text-sm font-semibold leading-snug">
                  Trusted by {clients.length}+ enterprises across Kuwait
                </p>
              </div>
              <div className="mt-3 flex items-center">
                <div className="flex -space-x-2">
                  {avatars.map((c) =>
                    c.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={c._id}
                        src={c.logo}
                        alt={c.name}
                        className="h-8 w-8 rounded-full border-2 border-card bg-white object-contain"
                      />
                    ) : (
                      <span
                        key={c._id}
                        title={c.name}
                        className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-card bg-primary text-[10px] font-semibold text-primary-foreground"
                      >
                        {initials(c.name)}
                      </span>
                    ),
                  )}
                </div>
                <span className="ml-3 text-sm font-bold text-accent">{clients.length}+</span>
              </div>
            </div>
          )}
        </HeroArchImage>
      </div>
    </section>
  )
}
