import type { ReactNode } from 'react'
import Link from 'next/link'
import { ChevronRight, ArrowRight } from 'lucide-react'
import { Container } from '@/components/site/primitives'
import { cn } from '@/lib/utils'
import { RoundedPhotoHero } from '@/components/site/rounded-photo-hero'

/* -------------------------------- JSON-LD --------------------------------- */

export function JsonLd({ data }: { data: unknown | unknown[] }) {
  const items = Array.isArray(data) ? data : [data]
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  )
}

/* ------------------------------ Breadcrumbs ------------------------------- */

export function Breadcrumbs({
  items,
  invert = false,
}: {
  items: { name: string; href?: string }[]
  invert?: boolean
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol
        className={cn(
          'flex flex-wrap items-center gap-1.5 text-sm',
          invert ? 'text-primary-foreground/70' : 'text-muted-foreground',
        )}
      >
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={item.name} className="flex items-center gap-1.5">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className={cn(
                    'transition-colors hover:text-accent',
                    invert && 'hover:text-accent',
                  )}
                >
                  {item.name}
                </Link>
              ) : (
                <span className={last ? (invert ? 'text-primary-foreground' : 'text-foreground') : ''} aria-current={last ? 'page' : undefined}>
                  {item.name}
                </span>
              )}
              {!last && <ChevronRight className="h-3.5 w-3.5 opacity-50" aria-hidden="true" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

/* ------------------------------- Page hero -------------------------------- */

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  image,
  children,
}: {
  eyebrow?: string
  title: string
  description?: string
  breadcrumbs?: { name: string; href?: string }[]
  image?: string | null
  children?: ReactNode
}) {
  return (
    <RoundedPhotoHero
      breadcrumbs={breadcrumbs}
      eyebrow={eyebrow}
      title={title}
      description={description}
      image={image}
      imageAlt={title}
    >
      {children ? <div className="mt-8">{children}</div> : null}
    </RoundedPhotoHero>
  )
}

/* ------------------------------- CTA section ------------------------------ */

export function CtaSection({
  cta,
  title = 'Ready to move your workforce with confidence?',
  description = "Tell us about your routes and headcount. We'll design a transport programme that fits your operation.",
}: {
  cta?: { label: string; href: string; external?: boolean }
  title?: string
  description?: string
}) {
  return (
    <section className="py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-[oklch(0.30_0.07_245)] px-8 py-16 text-center sm:px-16">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/20 blur-3xl"
            aria-hidden="true"
          />
          <h2 className="relative font-display text-3xl font-bold tracking-tight text-balance text-primary-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-base leading-relaxed text-primary-foreground/75">
            {description}
          </p>
          <div className="relative mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={cta?.href || '/contact'}
              target={cta?.external ? '_blank' : undefined}
              rel={cta?.external ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg transition-all hover:brightness-110"
            >
              {cta?.label || 'Get a Quote'}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              Talk to our team
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
