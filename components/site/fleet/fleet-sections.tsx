import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  ArrowUpRight,
  Navigation,
  ShieldCheck,
  SlidersHorizontal,
  User,
  Users,
} from 'lucide-react'
import { Container } from '@/components/site/primitives'
import { Reveal } from '@/components/site/reveal'
import { Icon } from '@/lib/icons'
import type { FleetCategoryData } from '@/lib/data/queries'

function SectionEyebrow({ children, lines = 'both' }: { children: string; lines?: 'both' | 'none' }) {
  return (
    <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
      {lines === 'both' && <span aria-hidden="true" className="h-px w-6 bg-accent" />}
      {children}
      {lines === 'both' && <span aria-hidden="true" className="h-px w-6 bg-accent" />}
    </span>
  )
}

/* ----------------------------- fleet listing ---------------------------- */

export function FleetOptionsGrid({ fleet }: { fleet: FleetCategoryData[] }) {
  return (
    <section className="bg-surface py-16 sm:py-20">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionEyebrow>Our fleet options</SectionEyebrow>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
            Vehicles built for comfort, safety &amp; every need
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base">
            From executive travel to group transport, our RTA-compliant fleet is ready to move your
            people—anytime, anywhere.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {fleet.map((cat, i) => (
            <Reveal key={cat._id} delay={i * 0.05}>
              <FleetCard cat={cat} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

function FleetCard({ cat }: { cat: FleetCategoryData }) {
  return (
    <Link
      href={`/fleet/${cat.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {cat.image ? (
          <Image
            src={cat.image}
            alt={cat.name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-navy to-primary">
            <Icon name={cat.icon} className="h-12 w-12 text-white/80" />
          </div>
        )}
        {cat.capacityRange && (
          <span className="absolute left-0 top-0 inline-flex items-center gap-1.5 rounded-br-2xl bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground">
            <User className="h-3.5 w-3.5" aria-hidden="true" />
            {cat.capacityRange}
          </span>
        )}
      </div>
      <div className="relative flex flex-1 flex-col px-6 pb-6 pt-10">
        <div className="absolute -top-7 left-6 flex h-14 w-14 items-center justify-center rounded-full border border-border bg-card text-primary shadow-md">
          <Icon name={cat.icon} className="h-6 w-6" />
        </div>
        <h3 className="font-display text-lg font-semibold text-foreground">{cat.name}</h3>
        {cat.description && (
          <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground">{cat.description}</p>
        )}
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
          View details
          <ArrowUpRight
            className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  )
}

/* ---------------------------- fleet sub-page ---------------------------- */

const standardFeatures = [
  { icon: ShieldCheck, title: 'RTA-compliant & insured', desc: 'Every vehicle meets UAE safety and licensing standards.' },
  { icon: Navigation, title: 'Live GPS tracking', desc: 'Real-time location and route monitoring on every trip.' },
  { icon: SlidersHorizontal, title: 'Climate controlled', desc: 'Clean, comfortable cabins maintained to a high standard.' },
  { icon: Users, title: 'Professional drivers', desc: 'Vetted, trained and uniformed chauffeurs.' },
]

export function FleetOverview({
  cat,
  cta,
}: {
  cat: FleetCategoryData
  cta?: { label?: string; href?: string }
}) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2">
      <Reveal className="relative">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted shadow-lg ring-1 ring-border">
          {cat.image ? (
            <Image
              src={cat.image}
              alt={cat.name}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-navy to-primary">
              <Icon name={cat.icon} className="h-20 w-20 text-white/80" />
            </div>
          )}
        </div>
        <div className="absolute bottom-5 left-3 flex items-center gap-3 rounded-xl border-b-4 border-accent bg-card px-5 py-4 shadow-xl sm:left-5">
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-primary">
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
          </span>
          <p className="text-sm leading-snug text-foreground">
            Your journey.
            <br />
            Our responsibility.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <SectionEyebrow lines="none">Built for comfort, safety &amp; reliability</SectionEyebrow>
        <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Built for comfort, safety and reliability
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {cat.description} Our {cat.name.toLowerCase()} are ideal for corporate contracts that demand
          punctuality and a premium passenger experience, every single day.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {standardFeatures.map((f) => (
            <div key={f.title} className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                <f.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{f.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <Link
          href={cta?.href || '/contact'}
          className="group mt-9 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground shadow-lg transition hover:brightness-110"
        >
          {cta?.label || 'Get a Quote'}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </Reveal>
    </div>
  )
}

export function OtherVehicleTypes({ others }: { others: FleetCategoryData[] }) {
  if (!others.length) return null
  return (
    <div className="mt-16 border-t border-border pt-8">
      <div className="text-center">
        <SectionEyebrow lines="none">Explore our fleet</SectionEyebrow>
        <h2 className="mt-2 font-display text-xl font-bold text-foreground sm:text-2xl">Other vehicle types we offer</h2>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {others.map((o, i) => (
          <Reveal key={o._id} delay={i * 0.05}>
            <Link
              href={`/fleet/${o.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary">
                <Icon name={o.icon} className="h-4 w-4" />
              </span>
              <div className="relative mt-2 aspect-[16/9]">
                {o.thumbnail || o.image ? (
                  <Image
                    src={(o.thumbnail || o.image) as string}
                    alt={o.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className={
                      o.thumbnail
                        ? 'object-contain transition-transform duration-500 group-hover:scale-105'
                        : 'rounded-lg object-cover'
                    }
                  />
                ) : null}
              </div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-foreground">{o.name}</span>
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-accent transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
