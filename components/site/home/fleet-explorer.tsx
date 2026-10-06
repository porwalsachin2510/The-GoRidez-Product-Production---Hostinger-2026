'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Users, Snowflake, Briefcase } from 'lucide-react'
import { Container, SectionHeading } from '@/components/site/primitives'
import { Icon } from '@/lib/icons'
import { cn } from '@/lib/utils'
import type { FleetCategoryData } from '@/lib/data/queries'

/**
 * "The right vehicle for every journey" — real fleet categories from the CMS,
 * with a client-side type filter. Each category renders as a vehicle card
 * (image, capacity + comfort specs) linking to its detail page.
 */
export function FleetExplorer({ fleet }: { fleet: FleetCategoryData[] }) {
  const [active, setActive] = useState('all')
  if (!fleet.length) return null

  const tabs = [{ id: 'all', label: 'All Vehicles' }, ...fleet.map((f) => ({ id: f.slug, label: f.name }))]
  const shown = active === 'all' ? fleet : fleet.filter((f) => f.slug === active)

  return (
    <section className="py-24">
      <Container>
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Our fleet"
            title="The right vehicle for every journey"
            description="A modern, meticulously maintained fleet — from executive sedans to full-size coaches — matched to your route, headcount and comfort requirements."
          />
          <Link
            href="/fleet"
            className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary hover:text-accent"
          >
            View all vehicles
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Filter pills */}
        <div className="mt-10 flex flex-wrap gap-2">
          {tabs.map((t) => {
            const on = t.id === active
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActive(t.id)}
                aria-pressed={on}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                  on
                    ? 'border-transparent bg-brand-gradient text-white shadow-sm'
                    : 'border-border bg-card text-muted-foreground hover:border-accent/40 hover:text-foreground',
                )}
              >
                {t.label}
              </button>
            )
          })}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((cat) => (
            <div
              key={cat._id}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl"
            >
              {/* Media */}
              <div className="relative aspect-[16/11] overflow-hidden bg-secondary">
                {cat.image ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-brand-gradient">
                    <Icon name={cat.icon} className="h-10 w-10 text-white/85" />
                  </div>
                )}
                {cat.capacityRange && (
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-background/85 px-3 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur">
                    <Users className="h-3.5 w-3.5 text-accent" />
                    {cat.capacityRange}
                  </span>
                )}
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-lg font-semibold text-foreground">{cat.name}</h3>
                  <span className="shrink-0 rounded-full bg-accent/12 px-2.5 py-0.5 text-[11px] font-semibold text-accent">
                    Fleet
                  </span>
                </div>
                {cat.description && (
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {cat.description}
                  </p>
                )}

                {/* Spec row */}
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-muted-foreground">
                  {cat.capacityRange && (
                    <span className="inline-flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-accent" />
                      {cat.capacityRange}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1.5">
                    <Snowflake className="h-4 w-4 text-accent" />
                    AC
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4 text-accent" />
                    Corporate
                  </span>
                </div>

                <Link
                  href={`/fleet/${cat.slug}`}
                  className="group/btn mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-border py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-transparent hover:bg-brand-gradient hover:text-white"
                >
                  View Details
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
