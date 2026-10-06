import { Building2, ShieldCheck, Smartphone, MapPin, Bus, Headset } from 'lucide-react'
import { Container } from '@/components/site/primitives'
import { Reveal } from '@/components/site/reveal'
import { CountUp } from '@/components/site/count-up'
import { Icon } from '@/lib/icons'
import type { CmsSection } from '@/components/site/cms-section-renderer'

type Row = Record<string, unknown>
const rows = (s?: CmsSection): Row[] => (Array.isArray(s?.items) ? (s!.items as Row[]) : [])
const text = (r: Row, ...keys: string[]) => {
  for (const k of keys) if (typeof r[k] === 'string' && (r[k] as string).trim()) return r[k] as string
  return ''
}

const STAT_ICONS = [ShieldCheck, MapPin, Bus, Headset]

export function WhyStats({ stats }: { stats: { value: string; label: string }[] }) {
  if (!stats.length) return null
  return (
    <div className="relative z-10 -mt-10 sm:-mt-12">
      <Container>
        <Reveal>
          <dl className="grid grid-cols-2 rounded-2xl border border-border bg-card shadow-xl shadow-primary/5 lg:grid-cols-4">
            {stats.slice(0, 4).map((s, i) => {
              const StatIcon = STAT_ICONS[i % STAT_ICONS.length]
              return (
                <div
                  key={`${s.label}-${i}`}
                  className="flex flex-col gap-4 border-border p-6 sm:p-8 [&:not(:last-child)]:lg:border-r max-lg:[&:nth-child(odd)]:border-r max-lg:[&:nth-child(-n+2)]:border-b"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-accent">
                    <StatIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <dd className="font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                      <CountUp value={s.value} />
                    </dd>
                    <dt className="mt-1 text-sm text-muted-foreground">{s.label}</dt>
                  </div>
                </div>
              )
            })}
          </dl>
        </Reveal>
      </Container>
    </div>
  )
}

export function WhyReasons({ section }: { section?: CmsSection }) {
  const items = rows(section)
  if (!items.length) return null
  return (
    <section className="relative py-16 sm:py-24">
      <div
        aria-hidden="true"
        className="absolute right-0 top-16 -z-10 hidden h-40 w-96 bg-[radial-gradient(circle,color-mix(in_oklch,var(--primary)_14%,transparent)_1px,transparent_1.5px)] [background-size:14px_14px] [mask-image:linear-gradient(to_left,black,transparent)] lg:block"
      />
      <Container>
        <Reveal className="max-w-xl">
          {section?.eyebrow && (
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{section.eyebrow}</span>
          )}
          {section?.heading && (
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy text-balance sm:text-4xl">
              {section.heading}
            </h2>
          )}
          {section?.subheading && (
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base">
              {section.subheading}
            </p>
          )}
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={`${text(item, 'title')}-${i}`} delay={(i % 4) * 0.05}>
              <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
                <span className="w-fit rounded-md bg-accent px-2 py-0.5 text-xs font-bold text-accent-foreground">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="mx-auto mt-2 flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-primary">
                  <Icon name={text(item, 'icon')} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-base font-semibold leading-snug text-navy">
                  {text(item, 'title', 'heading')}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text(item, 'body', 'description')}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

const DIFF_ICONS = [Building2, ShieldCheck, Smartphone]

export function WhyDifference({ section }: { section?: CmsSection }) {
  const items = rows(section)
  if (!items.length) return null
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[oklch(0.36_0.13_262)] to-navy py-16 text-white sm:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute -z-10 hidden lg:block lg:right-40 lg:top-10">
        <div className="flex h-24 w-24 items-center justify-center rounded-full border border-white/15">
          <Building2 className="h-8 w-8 text-white/25" strokeWidth={1.25} />
        </div>
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute right-12 top-32 -z-10 hidden lg:block">
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/15">
          <Smartphone className="h-7 w-7 text-white/25" strokeWidth={1.25} />
        </div>
      </div>
      <Container>
        <Reveal className="max-w-md">
          {section?.eyebrow && (
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{section.eyebrow}</span>
          )}
          {section?.heading && (
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              {section.heading}
            </h2>
          )}
        </Reveal>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {items.map((item, i) => {
            const DiffIcon = DIFF_ICONS[i % DIFF_ICONS.length]
            return (
              <Reveal key={`${text(item, 'heading')}-${i}`} delay={i * 0.06}>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <DiffIcon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-6 max-w-[16rem] font-display text-xl font-semibold leading-snug">
                  {text(item, 'heading', 'title')}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/75">{text(item, 'body', 'description')}</p>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
