import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  CircleCheck,
  Headset,
  TriangleAlert,
  Users,
} from 'lucide-react'
import { Container } from '@/components/site/primitives'
import { Reveal } from '@/components/site/reveal'
import { Icon } from '@/lib/icons'
import type { IndustryData } from '@/lib/data/queries'

type Cta = { label?: string; href?: string } | undefined

export function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</span>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">{description}</p>
      )}
    </div>
  )
}

export function IndustryCard({ industry, index }: { industry: IndustryData; index: number }) {
  return (
    <Link
      href={`/industries/${industry.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_24px_50px_-24px] hover:shadow-primary/30"
    >
      <div className="relative aspect-[16/11] overflow-hidden bg-secondary">
        {industry.heroImage ? (
          <Image
            src={industry.heroImage}
            alt={industry.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-brand-gradient text-white">
            <Icon name={industry.icon} hint={industry.name} className="h-10 w-10" />
          </div>
        )}
        <span className="absolute right-3 top-3 rounded-lg bg-accent px-2.5 py-1 font-display text-xs font-bold tabular-nums text-accent-foreground shadow-md">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-lg font-semibold text-foreground text-balance transition-colors group-hover:text-accent">
          {industry.name}
        </h3>
        {industry.excerpt && (
          <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground">{industry.excerpt}</p>
        )}
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
          View programme
          <ArrowUpRight
            className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  )
}

export function IndustryOverview({ name, body }: { name: string; body: string }) {
  return (
    <Reveal>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-12">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Overview</span>
          <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-foreground text-balance sm:text-3xl">
            Built for {name}
          </h2>
        </div>
        <div className="space-y-4 text-base leading-relaxed text-muted-foreground lg:border-l lg:border-border lg:pl-12">
          {body.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>
    </Reveal>
  )
}

function ListLabel({ children, tone }: { children: string; tone: 'danger' | 'accent' }) {
  return (
    <span className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-foreground">
      {children}
      <span aria-hidden="true" className={tone === 'danger' ? 'h-px w-6 bg-destructive' : 'h-px w-6 bg-accent'} />
    </span>
  )
}

export function ChallengesSolutions({
  challenges,
  solutions,
}: {
  challenges: string[]
  solutions: string[]
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {challenges.length > 0 && (
        <Reveal>
          <div className="relative h-full overflow-hidden rounded-2xl border border-destructive/20 bg-destructive/[0.03] p-8">
            <TriangleAlert
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-4 right-6 h-32 w-32 text-destructive/[0.07]"
            />
            <ListLabel tone="danger">The challenges</ListLabel>
            <ul className="relative mt-7 space-y-6">
              {challenges.map((c) => (
                <li key={c} className="flex items-center gap-4 text-sm text-foreground">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                    <TriangleAlert className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      )}
      {solutions.length > 0 && (
        <Reveal delay={0.08}>
          <div className="relative h-full overflow-hidden rounded-2xl border border-accent/30 bg-accent/[0.03] p-8">
            <Users
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-4 right-6 h-32 w-32 text-accent/[0.08]"
            />
            <ListLabel tone="accent">How GoRidez helps</ListLabel>
            <ul className="relative mt-7 space-y-6">
              {solutions.map((s) => (
                <li key={s} className="flex items-center gap-4 text-sm text-foreground">
                  <CircleCheck className="h-7 w-7 shrink-0 fill-accent text-white" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      )}
    </div>
  )
}

export function OtherIndustries({ industries }: { industries: IndustryData[] }) {
  if (!industries.length) return null
  return (
    <div>
      <Reveal>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Keep exploring</span>
        <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-foreground">Other industries</h2>
      </Reveal>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {industries.map((o, i) => (
          <Reveal key={o._id} delay={i * 0.05}>
            <Link
              href={`/industries/${o.slug}`}
              className="group relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10"
            >
              <span className="absolute right-5 top-5 flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors group-hover:border-accent group-hover:text-accent">
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <div className="flex items-center gap-3 pr-10">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-white shadow-sm">
                  <Icon name={o.icon} hint={o.name} className="h-5 w-5" />
                </span>
                <h3 className="font-display text-base font-semibold text-foreground transition-colors group-hover:text-accent">
                  {o.name}
                </h3>
              </div>
              {o.excerpt && (
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{o.excerpt}</p>
              )}
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                View programme
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  )
}

export function CompactCta({ primary, secondary }: { primary?: Cta; secondary?: Cta }) {
  return (
    <Reveal>
      <div className="flex flex-col gap-6 rounded-2xl bg-navy p-6 text-white shadow-xl shadow-primary/20 sm:p-8 lg:flex-row lg:items-center">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg shadow-accent/30">
          <Headset className="h-7 w-7" aria-hidden="true" />
        </span>
        <div className="flex-1">
          <h2 className="font-display text-xl font-bold text-balance sm:text-2xl">
            Ready to move your workforce with confidence?
          </h2>
          <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-white/75">
            Tell us about your routes and headcount. We&apos;ll design a transport programme that fits your
            operation.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href={primary?.href || '/get-quote'}
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition hover:brightness-110"
          >
            {primary?.label || 'Get a Quote'}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          <Link
            href={secondary?.href || '/contact'}
            className="inline-flex items-center rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Talk to our team
          </Link>
        </div>
      </div>
    </Reveal>
  )
}
