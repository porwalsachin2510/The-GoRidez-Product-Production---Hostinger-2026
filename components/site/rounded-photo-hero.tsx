import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Container } from "@/components/site/primitives"
import { Reveal } from "@/components/site/reveal"

export type HeroCrumb = { name: string; href?: string }

export const DEFAULT_HERO_IMAGE = "/images/contact-hero-executive.png"

/** Photo set inside the large rounded arch with an offset accent outline (Contact page style). */
export function HeroArchImage({
  image,
  imageAlt,
  children,
  className = "",
}: {
  image?: string | null
  imageAlt: string
  children?: ReactNode
  className?: string
}) {
  return (
    <div className={`relative min-h-[18rem] sm:min-h-[24rem] lg:min-h-[34rem] ${className}`}>
      <div className="absolute inset-0 overflow-hidden rounded-tl-[6rem] lg:rounded-l-[10rem]">
        <Image
          src={image || DEFAULT_HERO_IMAGE}
          alt={imageAlt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-navy/40 via-transparent to-transparent" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-3 -top-3 bottom-0 right-0 rounded-tl-[6.5rem] border-l-2 border-t-2 border-accent/70 lg:-bottom-3 lg:rounded-l-[10.5rem] lg:border-b-2"
      />
      {children}
    </div>
  )
}

export function HeroBreadcrumbs({ items }: { items?: HeroCrumb[] }) {
  if (!items || items.length === 0) return null
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-navy-foreground/60">
        {items.map((b, i) => (
          <li key={`${b.name}-${i}`} className="flex items-center gap-1.5">
            {b.href ? (
              <Link href={b.href} className="transition-colors hover:text-accent">
                {b.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-navy-foreground/90">
                {b.name}
              </span>
            )}
            {i < items.length - 1 ? <ChevronRight className="h-3 w-3" aria-hidden="true" /> : null}
          </li>
        ))}
      </ol>
    </nav>
  )
}

/**
 * The single site-wide page hero: navy band, copy on the left and a photo set
 * inside a large rounded arch on the right. Every marketing page uses this.
 */
export function RoundedPhotoHero({
  breadcrumbs,
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  children,
  overlay,
}: {
  breadcrumbs?: HeroCrumb[]
  eyebrow?: string
  title: ReactNode
  description?: string
  image?: string | null
  imageAlt: string
  children?: ReactNode
  overlay?: ReactNode
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy pt-20 text-navy-foreground lg:pt-[7.5rem]">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,color-mix(in_oklch,var(--accent)_16%,transparent),transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="absolute left-0 top-20 -z-10 h-40 w-64 bg-[radial-gradient(circle,rgba(255,255,255,0.18)_1px,transparent_1.5px)] [background-size:12px_12px] [mask-image:linear-gradient(to_bottom_right,black,transparent)] lg:top-[7.5rem]"
      />
      <div className="grid lg:grid-cols-2">
        <Container className="py-14 sm:py-16 lg:mr-0 lg:max-w-[40rem] lg:py-20 lg:pr-10">
          <Reveal>
            <HeroBreadcrumbs items={breadcrumbs} />
            {eyebrow ? (
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                <span aria-hidden="true" className="h-px w-4 bg-accent" />
                {eyebrow}
              </span>
            ) : null}
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.1] tracking-tight text-balance sm:text-5xl lg:text-[3.25rem]">
              {title}
            </h1>
            {description ? (
              <p className="mt-6 max-w-lg text-base leading-relaxed text-navy-foreground/80 text-pretty">{description}</p>
            ) : null}
            {children}
          </Reveal>
        </Container>

        <HeroArchImage image={image} imageAlt={imageAlt}>
          {overlay}
        </HeroArchImage>
      </div>
    </section>
  )
}
