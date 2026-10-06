import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Bus, Headset, MapPinned, ShieldCheck, Route } from 'lucide-react'
import { Container } from '@/components/site/primitives'
import { Reveal } from '@/components/site/reveal'
import { CountUp } from '@/components/site/count-up'
import { TestimonialAvatar } from '@/components/site/testimonial-avatar'
import { Icon } from '@/lib/icons'
import { externalUrl } from '@/lib/external-url'
import type { CmsSection } from '@/components/site/cms-section-renderer'
import type { ClientData, TeamMemberData, TestimonialData } from '@/lib/data/queries'

type Row = Record<string, unknown>

function rowText(row: Row, ...keys: string[]) {
  for (const k of keys) {
    const v = row[k]
    if (typeof v === 'string' && v.trim()) return v
    if (typeof v === 'number') return String(v)
  }
  return ''
}

function sectionRows(section?: CmsSection | null): Row[] {
  return Array.isArray(section?.items) ? (section!.items as Row[]) : []
}

export function missionParagraphs(section?: CmsSection | null): string[] {
  const fromItems = sectionRows(section).map((r) => rowText(r, 'body', 'title')).filter(Boolean)
  if (fromItems.length) return fromItems
  return section?.body ? section.body.split(/\n{2,}|\r?\n/).map((s) => s.trim()).filter(Boolean) : []
}

function Eyebrow({ children, center }: { children: string; center?: boolean }) {
  return (
    <span
      className={`block text-xs font-semibold uppercase tracking-[0.2em] text-accent ${center ? 'text-center' : ''}`}
    >
      {children}
    </span>
  )
}

export function AboutMission({ section }: { section: CmsSection }) {
  const paras = missionParagraphs(section)
  return (
    <section className="pb-10 pt-16 sm:pt-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <div>
              {section.eyebrow && <Eyebrow>{section.eyebrow}</Eyebrow>}
              <h2 className="mt-3 max-w-md font-display text-3xl font-bold leading-tight tracking-tight text-foreground text-balance">
                {section.heading}
              </h2>
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {paras.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <Link
                href={section.ctaHref || '/why-GoRidez'}
                className="group mt-7 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow-md shadow-accent/25 transition hover:brightness-110"
              >
                {section.ctaLabel || 'Learn More'}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
          {section.image && (
            <Reveal delay={0.1}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl shadow-primary/15">
                <Image
                  src={section.image}
                  alt={section.imageAlt || section.heading || ''}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-xl bg-card px-4 py-3 text-card-foreground shadow-xl">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Route className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <p className="text-sm font-semibold leading-snug">
                    Driven by trust.
                    <br />
                    Built around people.
                  </p>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  )
}

const STAT_ICONS = [ShieldCheck, MapPinned, Bus, Headset]

export function AboutStats({ stats }: { stats: { value: string; label: string }[] }) {
  if (!stats.length) return null
  return (
    <section className="pb-16">
      <Container>
        <Reveal>
          <dl className="grid grid-cols-2 gap-y-6 rounded-2xl border border-border bg-card px-4 py-7 shadow-sm lg:grid-cols-4 lg:divide-x lg:divide-border">
            {stats.slice(0, 4).map((s, i) => {
              const StatIcon = STAT_ICONS[i % STAT_ICONS.length]
              return (
                <div key={s.label} className="flex items-center gap-4 px-4 lg:px-6">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <StatIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <dt className="sr-only">{s.label}</dt>
                    <dd>
                      <CountUp
                        value={s.value}
                        className="block font-display text-3xl font-bold text-primary tabular-nums"
                      />
                      <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{s.label}</span>
                    </dd>
                  </div>
                </div>
              )
            })}
          </dl>
        </Reveal>
      </Container>
    </section>
  )
}

export function AboutValues({ section }: { section: CmsSection }) {
  const items = sectionRows(section)
  return (
    <section className="pb-16">
      <Container>
        <Reveal>
          <div className="text-center">
            {section.eyebrow && <Eyebrow center>{section.eyebrow}</Eyebrow>}
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground text-balance">
              {section.heading}
            </h2>
            {section.subheading && <p className="mt-3 text-sm text-muted-foreground">{section.subheading}</p>}
          </div>
        </Reveal>
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {items.map((row, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <div className="flex h-full gap-4 bg-card p-6 transition-colors hover:bg-accent/[0.03]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-md shadow-accent/25">
                  <Icon name={rowText(row, 'icon')} hint={rowText(row, 'title')} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground">{rowText(row, 'title')}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {rowText(row, 'body', 'description')}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

export function AboutStatement({ heading, paragraphs }: { heading?: string; paragraphs: string[] }) {
  if (!heading && !paragraphs.length) return null
  return (
    <section className="relative pb-16">
      <div
        aria-hidden="true"
        className="absolute left-4 top-0 hidden h-32 w-40 bg-[radial-gradient(circle,var(--accent)_1px,transparent_1.5px)] opacity-40 [background-size:14px_14px] md:block lg:left-20"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-6 right-4 hidden h-32 w-40 bg-[radial-gradient(circle,var(--accent)_1px,transparent_1.5px)] opacity-30 [background-size:14px_14px] md:block lg:right-20"
      />
      <Container className="relative max-w-2xl text-center">
        <Reveal>
          {heading && <p className="font-medium text-foreground text-balance">{heading}</p>}
          <div className="mt-3 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? 'text-foreground' : undefined}>
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

export function AboutTestimonial({ testimonial }: { testimonial: TestimonialData }) {
  return (
    <section className="pb-16">
      <Container>
        <Reveal>
          <figure className="relative isolate grid overflow-hidden rounded-3xl bg-gradient-to-r from-navy via-navy to-teal text-white shadow-2xl shadow-primary/20 lg:grid-cols-[1.2fr_1fr]">
            <div
              aria-hidden="true"
              className="absolute bottom-6 left-6 -z-10 h-24 w-32 bg-[radial-gradient(circle,var(--accent)_1px,transparent_1.5px)] opacity-40 [background-size:12px_12px]"
            />
            <div className="flex gap-5 px-7 py-10 sm:px-10 sm:py-12">
              <span aria-hidden="true" className="font-display text-7xl font-bold leading-none text-accent">
                &ldquo;
              </span>
              <div>
                <blockquote className="font-display text-xl font-semibold leading-snug text-balance sm:text-2xl">
                  {testimonial.quote}
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3 border-t border-white/15 pt-6">
                  <TestimonialAvatar name={testimonial.author} avatar={testimonial.avatar} />
                  <span className="text-sm text-white/80">
                    <span className="font-semibold text-white">{testimonial.author}</span>
                    {testimonial.role ? `, ${testimonial.role}` : ''}
                    {testimonial.company ? ` — ${testimonial.company}` : ''}
                  </span>
                </figcaption>
              </div>
            </div>
            <div className="relative min-h-56">
              <Image
                src="/images/services-cta-vehicles.png"
                alt="GoRidez coach"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-navy via-transparent to-transparent lg:bg-gradient-to-r" />
            </div>
          </figure>
        </Reveal>
      </Container>
    </section>
  )
}

export function AboutLeadership({ team }: { team: TeamMemberData[] }) {
  if (!team.length) return null
  return (
    <section className="pb-16">
      <Container>
        <Reveal>
          <Eyebrow center>Leadership</Eyebrow>
          <h2 className="mt-3 text-center font-display text-3xl font-bold tracking-tight text-foreground">
            The people behind <span className="text-accent">GoRidez</span>
          </h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {team.map((m, i) => (
            <Reveal key={m._id} delay={i * 0.05}>
              <article className="group h-full rounded-2xl border border-border bg-card p-3 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-secondary">
                  {m.photo ? (
                    <Image
                      src={m.photo}
                      alt={m.name}
                      fill
                      sizes="(min-width: 1024px) 20vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center font-display text-3xl font-bold text-primary/40">
                      {m.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="px-1 pb-1 pt-3 text-center">
                  <h3 className="font-display text-sm font-semibold text-foreground">
                    {m.linkedin ? (
                      <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                        {m.name}
                      </a>
                    ) : (
                      m.name
                    )}
                  </h3>
                  {m.role && <p className="mt-0.5 text-xs text-accent">{m.role}</p>}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

function ClientTile({ client, linked }: { client: ClientData; linked: boolean }) {
  return (
    <div className="relative flex h-full flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-card px-4 py-6 text-center transition-all group-hover:-translate-y-1 group-hover:border-accent/40 group-hover:shadow-lg">
      {linked && (
        <ArrowUpRight
          aria-hidden="true"
          className="absolute right-3 top-3 h-3.5 w-3.5 text-muted-foreground/0 transition-colors group-hover:text-accent"
        />
      )}
      {client.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={client.logo} alt={`${client.name} logo`} className="h-10 w-auto max-w-[120px] object-contain" loading="lazy" />
      ) : (
        <span
          aria-hidden="true"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 font-display text-sm font-bold text-primary"
        >
          {client.name.trim().charAt(0).toUpperCase() || 'C'}
        </span>
      )}
      <div>
        <p className="text-xs font-semibold leading-snug text-foreground text-pretty">{client.name}</p>
        {client.industry && <p className="mt-1 text-[11px] text-muted-foreground">{client.industry}</p>}
      </div>
    </div>
  )
}

export function AboutClients({ clients }: { clients: ClientData[] }) {
  if (!clients.length) return null
  const sectors = new Set(clients.map((c) => c.industry).filter(Boolean)).size
  return (
    <section className="pb-8">
      <Container>
        <Reveal>
          <Eyebrow center>Trusted by</Eyebrow>
          <h2 className="mt-3 text-center font-display text-3xl font-bold tracking-tight text-foreground">
            Trusted by leading organisations
          </h2>
        </Reveal>
        <ul className="mx-auto mt-10 flex max-w-6xl flex-wrap justify-center gap-4">
          {clients.map((c) => {
            const href = externalUrl(c.website)
            return (
              <li key={c._id} className="group w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.75rem)] lg:w-[calc(20%-0.8rem)]">
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${c.name} — visit website (opens in a new tab)`}
                    className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <ClientTile client={c} linked />
                  </a>
                ) : (
                  <ClientTile client={c} linked={false} />
                )}
              </li>
            )
          })}
        </ul>
        <p className="mt-6 text-center text-xs text-muted-foreground">
          <span className="font-semibold text-accent">{clients.length}+</span> enterprise clients
          {sectors > 0 && (
            <>
              <span aria-hidden="true" className="mx-2">
                {'•'}
              </span>
              <span className="font-semibold text-accent">{sectors}</span> industries
            </>
          )}
        </p>
      </Container>
    </section>
  )
}
