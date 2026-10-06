import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ClipboardCheck, Handshake, Headset, Layers } from 'lucide-react'
import { Container } from '@/components/site/primitives'
import { Reveal } from '@/components/site/reveal'
import { Icon } from '@/lib/icons'
import type { ServiceData } from '@/lib/data/queries'

const benefitIcons = [ClipboardCheck, Layers, Handshake]

function CenteredHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</span>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground text-balance">
        {title}
      </h2>
      <span className="mx-auto mt-4 block h-0.5 w-10 rounded-full bg-accent" aria-hidden="true" />
    </div>
  )
}

export function ServiceOverview({ service }: { service: ServiceData }) {
  const paragraphs = (service.body || service.excerpt || '').split('\n\n').filter(Boolean)
  const benefits = service.benefits ?? []
  if (paragraphs.length === 0 && benefits.length === 0) return null

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_22rem] lg:gap-16">
          <Reveal>
            <div className="flex gap-5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-white shadow-lg shadow-accent/20">
                <Icon name={service.icon} hint={service.title} className="h-5 w-5" />
              </span>
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  Overview
                </span>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <span className="mt-6 block h-0.5 w-10 rounded-full bg-accent" aria-hidden="true" />
              </div>
            </div>
          </Reveal>

          {benefits.length > 0 && (
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-border bg-card p-7 shadow-xl shadow-foreground/[0.04]">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Key benefits
                </span>
                <ul className="mt-5 divide-y divide-border">
                  {benefits.map((b, i) => {
                    const BenefitIcon = benefitIcons[i % benefitIcons.length]
                    return (
                      <li key={b} className="flex items-start gap-4 py-4 text-sm leading-relaxed text-foreground first:pt-0 last:pb-0">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gradient text-white">
                          <BenefitIcon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        {b}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  )
}

export function ServiceIncluded({ features }: { features: NonNullable<ServiceData['features']> }) {
  if (features.length === 0) return null
  return (
    <section className="relative py-12 sm:py-16">
      <Container>
        <Reveal>
          <CenteredHeading eyebrow="What's included" title="Every detail, handled for you" />
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <div className="group flex h-full flex-col items-center rounded-2xl border border-border bg-card px-6 py-9 text-center transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient text-white shadow-lg shadow-accent/20">
                  <Icon name={f.icon} hint={f.title} className="h-6 w-6" />
                </span>
                <h3 className="mt-6 font-display text-base font-semibold text-foreground">{f.title}</h3>
                {f.description && (
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

export function ServiceExplore({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string
  title: string
  items: ServiceData[]
}) {
  if (items.length === 0) return null
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <Reveal>
          <CenteredHeading eyebrow={eyebrow} title={title} />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item._id} delay={i * 0.05}>
              <Link
                href={`/services/${item.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10"
              >
                <div className="relative aspect-[16/8] overflow-hidden bg-muted">
                  {item.heroImage && (
                    <Image
                      src={item.heroImage}
                      alt={item.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="relative flex flex-1 flex-col px-6 pb-6 pt-9">
                  <span className="absolute -top-6 left-6 flex h-12 w-12 items-center justify-center rounded-xl bg-card text-accent shadow-lg">
                    <Icon name={item.icon} hint={item.title} className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-base font-semibold text-foreground">{item.title}</h3>
                  {item.excerpt && (
                    <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {item.excerpt}
                    </p>
                  )}
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                    Learn More
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
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

export function ServiceContactStrip({ cta }: { cta?: { label?: string; href?: string } }) {
  return (
    <section className="pb-16 sm:pb-20">
      <Container>
        <Reveal>
          <div className="flex flex-col items-start gap-6 rounded-2xl bg-muted px-6 py-6 sm:flex-row sm:items-center sm:px-10">
            <Headset className="h-12 w-12 shrink-0 text-accent" strokeWidth={1.5} aria-hidden="true" />
            <div className="flex-1">
              <h2 className="font-display text-xl font-bold text-foreground text-balance">
                Ready to move your workforce with confidence?
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {"Tell us about your routes and headcount. We'll design a transport programme that fits your operation."}
              </p>
            </div>
            <Link
              href={cta?.href || '/contact'}
              className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 transition hover:brightness-110"
            >
              Talk to our team
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
