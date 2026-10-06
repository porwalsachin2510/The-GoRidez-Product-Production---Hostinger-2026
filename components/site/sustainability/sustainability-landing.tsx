import { RoundedPhotoHero } from "@/components/site/rounded-photo-hero"
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/site/primitives'
import { Reveal } from '@/components/site/reveal'
import { AccentText } from '@/components/site/accent-text'
import { Icon } from '@/lib/icons'
import { DashEyebrow, LeafCtaBanner } from '@/components/site/free-zones/free-zone-landing'
import { cn } from '@/lib/utils'
import type { CmsPageData, CtaData } from '@/lib/data/queries'

export type CmsSection = NonNullable<CmsPageData['sections']>[number]
type Item = { icon?: string; title?: string; body?: string; label?: string; href?: string }
const items = (s: CmsSection): Item[] => (Array.isArray(s.items) ? (s.items as Item[]) : [])

/* --------------------------------- Hero --------------------------------- */

export function SustainabilityHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt,
  ctaLabel,
  ctaHref,
  tagline,
}: {
  eyebrow: string
  title: string
  subtitle: string
  image: string
  imageAlt: string
  ctaLabel: string
  ctaHref: string
  tagline: string
}) {
  const taglineWords = tagline.split(/\s+/).filter(Boolean)
  return (
    <RoundedPhotoHero
      eyebrow={eyebrow}
      title={<AccentText text={title} />}
      description={subtitle}
      image={image}
      imageAlt={imageAlt}
      overlay={
        taglineWords.length > 0 ? (
          <p className="absolute bottom-8 right-6 flex flex-col font-display text-lg font-semibold leading-tight text-navy-foreground sm:right-10">
            {taglineWords.map((word, i) => (
              <span key={i}>
                <AccentText text={word} />
              </span>
            ))}
            <span aria-hidden="true" className="mt-3 h-0.5 w-14 bg-accent" />
          </p>
        ) : null
      }
    >
      <Link
        href={ctaHref}
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition hover:brightness-110"
      >
        {ctaLabel}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </RoundedPhotoHero>
  )
}

/* ------------------------------ Approach -------------------------------- */

export function SustainabilityApproach({ section }: { section: CmsSection }) {
  return (
    <section className="py-16 sm:py-24">
      <Container className="grid items-center gap-10 lg:grid-cols-[5fr_7fr]">
        <Reveal>
          {section.eyebrow ? <DashEyebrow>{section.eyebrow}</DashEyebrow> : null}
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-foreground text-balance sm:text-4xl">
            {section.heading}
          </h2>
          {section.subheading ? (
            <p className="mt-5 leading-relaxed text-muted-foreground text-pretty">{section.subheading}</p>
          ) : null}
        </Reveal>
        <ul className="grid gap-5 sm:grid-cols-2">
          {items(section).map((item, i) => {
            const featured = i === 0
            return (
              <Reveal key={`${item.title}-${i}`} delay={i * 0.08}>
                <li
                  className={cn(
                    'flex h-full flex-col rounded-2xl p-7',
                    featured ? 'bg-navy text-navy-foreground shadow-xl shadow-navy/20' : 'border border-border bg-card',
                  )}
                >
                  <div className="flex items-start justify-between">
                    <Icon name={item.icon} hint={item.title} className="h-7 w-7 text-accent" />
                    {featured ? (
                      <span className="flex h-8 w-8 items-center justify-center rounded-full border border-accent text-accent">
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    ) : null}
                  </div>
                  <h3 className={cn('mt-6 font-display text-lg font-semibold', featured ? '' : 'text-foreground')}>{item.title}</h3>
                  <p className={cn('mt-2 text-sm leading-relaxed', featured ? 'text-navy-foreground/75' : 'text-muted-foreground')}>
                    {item.body}
                  </p>
                </li>
              </Reveal>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}

/* ------------------------------ Impact band ------------------------------ */

export function SustainabilityImpactBand({ section }: { section: CmsSection }) {
  return (
    <section className="pb-16 sm:pb-24">
      <Container>
        <Reveal>
          <div className="flex flex-col overflow-hidden rounded-2xl bg-accent/10 lg:flex-row">
            <div className="relative min-h-64 overflow-hidden rounded-2xl shadow-2xl shadow-primary/15 lg:w-2/5">
              {section.image ? (
                <Image
                  src={section.image}
                  alt={section.imageAlt || ''}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/30 to-transparent" />
              <div className="relative flex h-full flex-col justify-center p-8 text-navy-foreground">
                <h2 className="max-w-56 font-display text-2xl font-bold leading-tight text-balance sm:text-3xl">
                  {section.heading}
                </h2>
                <span aria-hidden="true" className="mt-5 h-0.5 w-14 bg-accent" />
              </div>
            </div>
            <ul className="grid flex-1 gap-6 p-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:p-10">
              {items(section).map((item, i) => (
                <li key={`${item.title}-${i}`} className={cn('flex flex-col gap-3 lg:px-5', i > 0 && 'lg:border-l lg:border-border')}>
                  <Icon name={item.icon} hint={item.title} className="h-7 w-7 text-accent" />
                  <h3 className="font-display text-sm font-semibold text-foreground">{item.title}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

/* ------------------------------ Commitments ------------------------------ */

export function SustainabilityCommitments({ section }: { section: CmsSection }) {
  return (
    <section className="pb-16 sm:pb-24">
      <Container>
        <Reveal>
          {section.eyebrow ? <DashEyebrow>{section.eyebrow}</DashEyebrow> : null}
          <h2 className="mt-4 max-w-md font-display text-3xl font-bold leading-tight tracking-tight text-foreground text-balance sm:text-4xl">
            {section.heading}
          </h2>
          {section.subheading ? (
            <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">{section.subheading}</p>
          ) : null}
        </Reveal>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items(section).map((item, i) => (
            <Reveal key={`${item.title}-${i}`} delay={i * 0.06}>
              <li className="flex h-full flex-col rounded-2xl border border-border bg-card p-7 transition hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-lg">
                <Icon name={item.icon} hint={item.title} className="h-8 w-8 text-accent" />
                <h3 className="mt-6 font-display text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}

/* ---------------------------------- CTA ---------------------------------- */

export function SustainabilityCta({
  section,
  fallbackPrimary,
  fallbackSecondary,
}: {
  section?: CmsSection
  fallbackPrimary: CtaData
  fallbackSecondary: CtaData
}) {
  const secondaryItem = section ? items(section)[0] : undefined
  const primary: CtaData = section?.ctaLabel
    ? { label: section.ctaLabel, href: section.ctaHref || fallbackPrimary.href }
    : fallbackPrimary
  const secondary: CtaData =
    secondaryItem?.label && secondaryItem.href ? { label: secondaryItem.label, href: secondaryItem.href } : fallbackSecondary
  return (
    <LeafCtaBanner
      eyebrow={section?.eyebrow || 'Our future'}
      title={section?.heading || 'Make your next mobility decision count'}
      description={
        section?.subheading ||
        'We will help you identify practical improvements that support people, performance and the planet.'
      }
      primary={primary}
      secondary={secondary}
      image={section?.image || '/media/sections/sustainability.png'}
    />
  )
}
