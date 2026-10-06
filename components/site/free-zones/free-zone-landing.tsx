import { RoundedPhotoHero } from "@/components/site/rounded-photo-hero"
import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowRight,
  ClipboardCheck,
  Clock,
  Gauge,
  Leaf,
  MapPin,
  ShieldCheck,
  Smile,
  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react'
import { Container } from '@/components/site/primitives'
import { Reveal } from '@/components/site/reveal'
import { AccentText } from '@/components/site/accent-text'
import { cn } from '@/lib/utils'
import type { CtaData } from '@/lib/data/queries'

type Copy = Record<string, string>
const c = (copy: Copy, key: string, fallback = '') => copy[key]?.trim() || fallback

export function DashEyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn('flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent', className)}>
      <span aria-hidden="true" className="h-px w-6 bg-accent" />
      {children}
    </span>
  )
}

/** "Plain *bold* text" — starred parts render bold. */
function BoldStars({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/g).filter(Boolean).map((part, i) =>
        part.startsWith('*') && part.endsWith('*') ? (
          <strong key={i} className="font-bold">
            {part.slice(1, -1)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  )
}

function FeatureIcon({ icon: Icon, title, text }: { icon: LucideIcon; title: string; text: string }) {
  return (
    <li className="flex flex-col gap-3">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span>
        <span className="block font-display text-sm font-semibold text-foreground">{title}</span>
        <span className="block text-xs leading-relaxed text-muted-foreground">{text}</span>
      </span>
    </li>
  )
}

/* --------------------------------- Hero --------------------------------- */

export function FreeZoneHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt,
  copy,
}: {
  eyebrow: string
  title: string
  subtitle: string
  image: string
  imageAlt: string
  copy: Copy
}) {
  const badges: { icon: LucideIcon; label: string }[] = [
    { icon: ShieldCheck, label: c(copy, 'heroBadge1', 'Safe & Compliant Operations') },
    { icon: Clock, label: c(copy, 'heroBadge2', 'On-Time Every Time') },
    { icon: Leaf, label: c(copy, 'heroBadge3', 'Sustainable Transport') },
  ]
  return (
    <RoundedPhotoHero
      eyebrow={eyebrow}
      title={<AccentText text={title} />}
      description={subtitle}
      image={image}
      imageAlt={imageAlt}
      overlay={
        <div className="absolute bottom-6 right-4 flex items-center gap-3 rounded-xl border border-navy-foreground/15 bg-navy/85 px-4 py-3 backdrop-blur sm:right-8">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/60 text-accent">
            <MapPin className="h-4 w-4" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-sm font-semibold">{c(copy, 'heroCardTitle', 'Free Zone Coverage')}</span>
            <span className="block text-[11px] text-navy-foreground/70">
              {c(copy, 'heroCardText', 'Connecting People · Enabling Business')}
            </span>
          </span>
        </div>
      }
    >
            <Link
              href={c(copy, 'heroCtaHref', '/get-quote')}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition hover:brightness-110"
            >
              {c(copy, 'heroCtaLabel', 'Plan a lower-impact programme')}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
              {badges.map(({ icon: Icon, label }) => (
                <li key={label} className="flex max-w-36 items-center gap-3 text-xs font-medium leading-snug">
                  <Icon className="h-7 w-7 shrink-0 text-accent" strokeWidth={1.5} aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
    </RoundedPhotoHero>
  )
}

/* ------------------------------ Why section ------------------------------ */

export function FreeZoneWhy({ copy }: { copy: Copy }) {
  const features = [
    { icon: ClipboardCheck, title: c(copy, 'why1Title', 'Compliance'), text: c(copy, 'why1Text') },
    { icon: Gauge, title: c(copy, 'why2Title', 'Efficient'), text: c(copy, 'why2Text') },
    { icon: ShieldCheck, title: c(copy, 'why3Title', 'Reliable'), text: c(copy, 'why3Text') },
    { icon: Smile, title: c(copy, 'why4Title', 'Comfortable'), text: c(copy, 'why4Text') },
  ]
  return (
    <section className="py-16 sm:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <DashEyebrow>{c(copy, 'whyEyebrow', 'Why free zone shuttle')}</DashEyebrow>
          <h2 className="mt-4 max-w-md font-display text-3xl font-bold leading-tight tracking-tight text-foreground text-balance sm:text-4xl">
            {c(copy, 'whyTitle')}
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-muted-foreground text-pretty">{c(copy, 'whyText')}</p>
          <ul className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {features.map((f) => (
              <FeatureIcon key={f.title} {...f} />
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-2xl shadow-primary/15">
            <div className="absolute inset-0">
              <Image
                src={c(copy, 'whyImage', '/media/free-zones/free-zone-aerial.png')}
                alt="Aerial view of a free zone business district"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 flex w-56 flex-col gap-3 rounded-tl-2xl bg-navy/95 p-6 text-navy-foreground">
              <Leaf className="h-6 w-6 text-accent" aria-hidden="true" />
              <p className="font-display text-lg leading-snug">
                <BoldStars text={c(copy, 'whyCardText', 'Powered by *experience.*')} />
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

/* ---------------------------- Services section --------------------------- */

export type ZoneCard = { _id: string; slug: string; name: string; abbreviation?: string; excerpt?: string }

export function FreeZoneServices({ copy, zones }: { copy: Copy; zones: ZoneCard[] }) {
  const prefix = c(copy, 'cardLinkPrefix', 'Explore')
  return (
    <section className="bg-accent/5 py-16 sm:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[2fr_3fr]">
        <Reveal>
          <DashEyebrow>{c(copy, 'sectionEyebrow')}</DashEyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-foreground text-balance sm:text-4xl">
            {c(copy, 'sectionTitle')}
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-muted-foreground text-pretty">{c(copy, 'sectionText')}</p>
          <Link
            href={c(copy, 'exploreAllHref', '/contact')}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition hover:brightness-110"
          >
            {c(copy, 'exploreAllLabel', 'Explore All Zones')}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
        {zones.length > 0 ? (
          <ul className="grid gap-5 sm:grid-cols-2">
            {zones.map((zone, i) => (
              <Reveal key={zone._id} delay={i * 0.06}>
                <li className="h-full">
                  <Link
                    href={`/free-zones/${zone.slug}`}
                    className="group flex h-full gap-4 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-lg"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <MapPin className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="flex flex-1 flex-col">
                      <span className="font-display text-base font-semibold text-foreground">{zone.name}</span>
                      {zone.abbreviation ? (
                        <span className="text-xs font-medium text-accent">{zone.abbreviation}</span>
                      ) : null}
                      {zone.excerpt ? (
                        <span className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{zone.excerpt}</span>
                      ) : null}
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                        {prefix} {zone.abbreviation || zone.name}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    </span>
                  </Link>
                </li>
              </Reveal>
            ))}
          </ul>
        ) : (
          <p className="text-center text-sm text-muted-foreground">Free zone pages will be published soon.</p>
        )}
      </Container>
    </section>
  )
}

/* ---------------------------- Approach section --------------------------- */

export function FreeZoneApproach({ copy }: { copy: Copy }) {
  const items = [
    { icon: Leaf, title: c(copy, 'approach1Title'), text: c(copy, 'approach1Text') },
    { icon: Users, title: c(copy, 'approach2Title'), text: c(copy, 'approach2Text') },
    { icon: ShieldCheck, title: c(copy, 'approach3Title'), text: c(copy, 'approach3Text') },
    { icon: TrendingUp, title: c(copy, 'approach4Title'), text: c(copy, 'approach4Text') },
  ]
  return (
    <section className="py-16 sm:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <DashEyebrow>{c(copy, 'approachEyebrow', 'Our approach')}</DashEyebrow>
          <h2 className="mt-4 max-w-md font-display text-3xl font-bold leading-tight tracking-tight text-foreground text-balance sm:text-4xl">
            {c(copy, 'approachTitle')}
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-muted-foreground text-pretty">{c(copy, 'approachText')}</p>
          <ul className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {items.map((f) => (
              <FeatureIcon key={f.title + f.text} {...f} />
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative flex aspect-[16/9] w-full gap-4">
            <div className="relative flex-1 overflow-hidden rounded-2xl shadow-2xl shadow-primary/15">
              <Image
                src={c(copy, 'approachImage', '/media/free-zones/free-zone-approach.png')}
                alt="Staff shuttle bus driving through a business district"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <Link
              href={c(copy, 'approachCardHref', '/sustainability')}
              className="group relative flex w-40 shrink-0 flex-col justify-between gap-4 rounded-2xl bg-navy p-6 text-navy-foreground sm:w-48"
            >
              <Leaf className="h-6 w-6 text-accent" aria-hidden="true" />
              <span className="font-display text-lg font-semibold leading-snug">{c(copy, 'approachCardText')}</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-navy-foreground/40 transition group-hover:border-accent group-hover:text-accent">
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">Learn more</span>
              </span>
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

/* ------------------------------- CTA banner ------------------------------ */

export function LeafCtaBanner({
  eyebrow,
  title,
  description,
  primary,
  secondary,
  image,
}: {
  eyebrow?: string
  title: string
  description?: string
  primary: CtaData
  secondary: CtaData
  image?: string
}) {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl bg-navy text-navy-foreground">
            {image ? (
              <div className="absolute inset-y-0 right-0 -z-10 hidden w-1/2 md:block">
                <Image src={image} alt="" fill sizes="50vw" className="object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/40 to-transparent" />
              </div>
            ) : null}
            <div className="flex flex-col gap-8 px-8 py-10 sm:px-12 md:flex-row md:items-center">
              <Leaf className="h-16 w-16 shrink-0 text-accent" strokeWidth={1.25} aria-hidden="true" />
              <div className="flex-1">
                {eyebrow ? (
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
                ) : null}
                <h2 className="mt-2 max-w-lg font-display text-2xl font-bold leading-tight text-balance sm:text-3xl">{title}</h2>
                {description ? (
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-navy-foreground/80 text-pretty">{description}</p>
                ) : null}
                {image ? <CtaButtons primary={primary} secondary={secondary} className="mt-6 flex-row" /> : null}
              </div>
              {image ? null : <CtaButtons primary={primary} secondary={secondary} className="flex-row md:flex-col" />}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

function CtaButtons({ primary, secondary, className }: { primary: CtaData; secondary: CtaData; className?: string }) {
  return (
    <div className={cn('flex flex-wrap gap-3', className)}>
      <Link
        href={primary.href}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-accent-foreground transition hover:brightness-110"
      >
        {primary.label}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
      <Link
        href={secondary.href}
        className="inline-flex items-center justify-center rounded-full border border-navy-foreground/40 px-6 py-2.5 text-sm font-semibold transition hover:border-accent hover:text-accent"
      >
        {secondary.label}
      </Link>
    </div>
  )
}
