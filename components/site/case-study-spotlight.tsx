import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Building2, MapPin, Quote } from "lucide-react"
import type { CaseStudyData } from "@/lib/data/queries"

/**
 * Large editorial spotlight for the single most important (first featured)
 * case study. Photo panel on one side, outcome metrics + quote on the other.
 */
export function CaseStudySpotlight({ cs }: { cs: CaseStudyData }) {
  const metrics = cs.metrics?.slice(0, 3) ?? []

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-primary/5">
      <div className="grid lg:grid-cols-[1.05fr_1fr]">
        <div className="relative min-h-[280px] bg-secondary sm:min-h-[360px] lg:min-h-full lg:border-r-4 lg:border-accent">
          {cs.coverImage ? (
            <Image
              src={cs.coverImage}
              alt={cs.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-primary/30">
              <Building2 className="h-16 w-16" aria-hidden="true" />
            </div>
          )}
        </div>

        <div className="flex flex-col justify-center p-7 sm:p-10">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
            {cs.industry ? (
              <span className="rounded-md bg-secondary px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary">
                {cs.industry}
              </span>
            ) : null}
            {cs.client ? <span className="font-semibold text-navy">{cs.client}</span> : null}
            {cs.location ? (
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                {cs.location}
              </span>
            ) : null}
          </div>

          <h2 className="mt-5 font-display text-2xl font-bold leading-tight tracking-tight text-navy text-balance sm:text-[1.7rem]">
            {cs.title}
          </h2>
          {cs.excerpt ? (
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">{cs.excerpt}</p>
          ) : null}

          {metrics.length > 0 ? (
            <div className="mt-7 grid grid-cols-3 divide-x divide-border border-y border-border py-5">
              {metrics.map((m, i) => (
                <div key={m.label} className={i === 0 ? "pr-4" : "px-4"}>
                  <div className="font-display text-2xl font-bold text-accent sm:text-3xl">{m.value}</div>
                  <div className="mt-1 text-[11px] leading-tight text-muted-foreground">{m.label}</div>
                </div>
              ))}
            </div>
          ) : null}

          {cs.testimonialQuote ? (
            <figure className="mt-6">
              <Quote className="h-6 w-6 fill-navy text-navy" aria-hidden="true" />
              <blockquote className="mt-2 text-sm italic leading-relaxed text-foreground">
                {cs.testimonialQuote}
              </blockquote>
              {cs.testimonialAuthor ? (
                <figcaption className="mt-3 text-xs text-muted-foreground">
                  {cs.testimonialAuthor}
                  {cs.testimonialRole ? `, ${cs.testimonialRole}` : ""}
                </figcaption>
              ) : null}
            </figure>
          ) : null}

          <Link
            href={`/case-studies/${cs.slug}`}
            className="group mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition-all hover:brightness-110"
          >
            Read the full story
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  )
}
