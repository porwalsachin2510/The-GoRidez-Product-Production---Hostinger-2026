import type { ComponentType, ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Check,
  Cpu,
  HeartPulse,
  Hotel,
  Landmark,
  Quote,
  Truck,
} from 'lucide-react'
import { Container } from '@/components/site/primitives'
import { Reveal } from '@/components/site/reveal'
import { CountUp } from '@/components/site/count-up'
import { cn } from '@/lib/utils'
import type { CaseStudyData, ClientData } from '@/lib/data/queries'

type IconType = ComponentType<{ className?: string; strokeWidth?: number }>

export function Eyebrow({ children, center }: { children: ReactNode; center?: boolean }) {
  return (
    <span
      className={cn(
        'flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent',
        center && 'justify-center',
      )}
    >
      <span aria-hidden="true" className="h-px w-5 bg-accent" />
      {children}
    </span>
  )
}

export type StripItem = { icon: IconType; value: string; label: string }

/** Overlapping white stat card that sits on the bottom edge of the hero. */
export function OverlapStatStrip({
  items,
  variant = 'stat',
}: {
  items: StripItem[]
  variant?: 'stat' | 'glance'
}) {
  if (!items.length) return null
  return (
    <div className="relative z-10 -mt-12 sm:-mt-14">
      <Container className={variant === 'glance' ? 'max-w-6xl' : undefined}>
        <Reveal>
          <dl className="grid grid-cols-2 rounded-2xl border border-border bg-card shadow-xl shadow-primary/5 lg:grid-cols-4">
            {items.slice(0, 4).map((s, i) => {
              const ItemIcon = s.icon
              return (
                <div
                  key={`${s.label}-${i}`}
                  className="flex flex-col gap-4 border-border p-6 sm:p-8 [&:not(:last-child)]:lg:border-r max-lg:[&:nth-child(odd)]:border-r max-lg:[&:nth-child(-n+2)]:border-b"
                >
                  <span
                    className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-full',
                      i % 2 === 0 ? 'bg-accent text-accent-foreground' : 'bg-navy text-white',
                    )}
                  >
                    <ItemIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  {variant === 'stat' ? (
                    <div className="flex flex-col-reverse">
                      <dt className="mt-1 max-w-[9rem] text-sm leading-snug text-muted-foreground">{s.label}</dt>
                      <dd className="font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                        <CountUp value={s.value} />
                      </dd>
                    </div>
                  ) : (
                    <div>
                      <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        {s.label}
                      </dt>
                      <dd className="mt-1.5 text-sm font-semibold leading-snug text-navy">{s.value}</dd>
                    </div>
                  )}
                </div>
              )
            })}
          </dl>
        </Reveal>
      </Container>
    </div>
  )
}

const INDUSTRY_ICONS: [RegExp, IconType][] = [
  [/it|bpo|tech/i, Cpu],
  [/free zone/i, Building2],
  [/health/i, HeartPulse],
  [/event|mice/i, CalendarDays],
  [/bank|financ/i, Landmark],
  [/hospital|touris/i, Hotel],
  [/logistic/i, Truck],
]

function iconForIndustry(industry?: string): IconType {
  if (!industry) return Building2
  return INDUSTRY_ICONS.find(([re]) => re.test(industry))?.[1] ?? Building2
}

export function ClientWall({
  clients,
  heading = 'Trusted by leading organisations',
}: {
  clients: ClientData[]
  heading?: string
}) {
  if (!clients.length) return null
  return (
    <section className="pb-4 pt-16 sm:pt-20">
      <Container className="max-w-5xl">
        <div className="flex items-center justify-center gap-4">
          <span aria-hidden="true" className="h-px w-12 bg-accent/60" />
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-navy">
            {heading}
          </p>
          <span aria-hidden="true" className="h-px w-12 bg-accent/60" />
        </div>
        <ul className="mt-8 flex flex-wrap justify-center gap-4">
          {clients.map((client, i) => {
            const ClientIcon = iconForIndustry(client.industry)
            return (
              <li key={client._id} className="w-[calc(50%-0.5rem)] sm:w-40">
                <Reveal delay={(i % 5) * 0.04}>
                  <div className="flex h-24 flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card px-3 text-center transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md">
                    {client.logo ? (
                      <Image
                        src={client.logo}
                        alt={`${client.name} logo`}
                        width={120}
                        height={40}
                        className="h-9 w-auto object-contain"
                      />
                    ) : (
                      <ClientIcon className="h-7 w-7 text-navy" strokeWidth={1.5} aria-hidden="true" />
                    )}
                    <span className="text-[11px] font-medium leading-tight text-muted-foreground">
                      {client.name}
                    </span>
                  </div>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}

/** Challenge → solution → result as a connected vertical timeline. */
export function NarrativeTimeline({
  steps,
}: {
  steps: { icon: IconType; heading: string; body: string; tone: 'accent' | 'navy' }[]
}) {
  if (!steps.length) return null
  return (
    <ol className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      {steps.map(({ icon: StepIcon, heading, body, tone }, i) => (
        <li key={heading} className="relative flex gap-5 pb-10 last:pb-0">
          {i < steps.length - 1 && (
            <span aria-hidden="true" className="absolute left-5 top-12 bottom-2 w-px bg-border" />
          )}
          <span
            className={cn(
              'relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
              tone === 'accent' ? 'bg-accent text-accent-foreground' : 'bg-navy text-white',
            )}
          >
            <StepIcon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="pt-1.5">
            <h2 className="font-display text-lg font-semibold text-navy">{heading}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">{body}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

export function ChecklistCard({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null
  return (
    <aside className="rounded-2xl border border-border bg-card p-6 sm:p-7">
      <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{title}</h3>
      <ul className="mt-5 space-y-3.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export function QuoteBanner({ quote, author, role }: { quote: string; author?: string; role?: string }) {
  return (
    <figure className="relative isolate flex flex-col gap-6 overflow-hidden rounded-2xl bg-gradient-to-r from-navy via-[oklch(0.36_0.12_258)] to-teal px-6 py-8 text-white shadow-xl shadow-primary/15 sm:flex-row sm:items-center sm:gap-8 sm:px-10">
      <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-lg">
        <Quote className="h-8 w-8 fill-current" aria-hidden="true" />
      </span>
      <span aria-hidden="true" className="hidden h-16 w-px bg-white/20 sm:block" />
      <div>
        <blockquote className="font-display text-lg font-semibold leading-relaxed text-balance sm:text-xl">
          {quote}
        </blockquote>
        {author && (
          <figcaption className="mt-3 text-xs text-white/75">
            <span className="font-semibold text-white">{author}</span>
            {role ? <span className="mx-2">&bull;</span> : null}
            {role}
          </figcaption>
        )}
      </div>
    </figure>
  )
}

export function RelatedCaseStudies({ studies }: { studies: CaseStudyData[] }) {
  if (!studies.length) return null
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <Eyebrow>Keep exploring</Eyebrow>
        <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
          Related case studies
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {studies.map((r, i) => (
            <Reveal key={r._id} delay={i * 0.06}>
              <Link
                href={`/case-studies/${r.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-lg"
              >
                <div className="relative aspect-[16/7] overflow-hidden bg-secondary">
                  {r.coverImage ? (
                    <Image
                      src={r.coverImage}
                      alt={r.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-primary/30">
                      <Building2 className="h-10 w-10" aria-hidden="true" />
                    </div>
                  )}
                  {r.industry && (
                    <span className="absolute left-3 top-3 rounded-md bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-foreground shadow">
                      {r.industry}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="flex-1 font-display text-base font-semibold leading-snug text-navy text-balance">
                    {r.title}
                  </h3>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                    Read case study
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
