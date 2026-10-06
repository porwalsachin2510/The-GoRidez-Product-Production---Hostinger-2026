'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { CalendarDays, ChevronDown, Cookie, FileText, Settings, Shield, ShieldCheck, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { LegalSection } from '@/lib/legal-content'
import { slugify, useActiveSection } from './use-active-section'

function iconFor(heading: string): LucideIcon {
  if (/what/i.test(heading)) return Cookie
  if (/use/i.test(heading)) return Settings
  if (/manag/i.test(heading)) return Shield
  return FileText
}

const num = (i: number) => String(i + 1).padStart(2, '0')

export function CookieDocument({
  sections,
  lastUpdated,
}: {
  sections: LegalSection[]
  lastUpdated: string
}) {
  const ids = useMemo(() => sections.map((s) => `cookie-${slugify(s.heading)}`), [sections])
  const [active, setActive] = useActiveSection(ids)
  const [open, setOpen] = useState<string | null>(null)

  function jumpTo(id: string) {
    setActive(id)
    setOpen(id)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[15rem_1fr] lg:gap-10">
      <aside className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
        <nav aria-label="In this policy" className="rounded-2xl border border-border bg-card p-3 shadow-sm">
          <span aria-hidden="true" className="ml-2 mt-2 block h-0.5 w-8 rounded-full bg-accent" />
          <p className="mb-3 ml-2 mt-4 font-display text-lg font-semibold text-foreground">In This Policy</p>
          <ul className="flex flex-col gap-1">
            {sections.map((s, i) => {
              const Icon = iconFor(s.heading)
              const selected = active === ids[i]
              return (
                <li key={s.heading}>
                  <a
                    href={`#${ids[i]}`}
                    onClick={() => jumpTo(ids[i])}
                    aria-current={selected ? 'location' : undefined}
                    className={cn(
                      'flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-sm transition-colors',
                      selected ? 'bg-accent/10 font-medium text-foreground' : 'text-foreground hover:bg-secondary',
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
                        selected ? 'bg-accent text-accent-foreground' : 'text-foreground',
                      )}
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    {s.heading}
                  </a>
                </li>
              )
            })}
          </ul>
          <div className="mt-6 rounded-xl bg-accent/10 p-5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            </span>
            <p className="mt-4 font-display text-sm font-semibold text-foreground">Your privacy matters</p>
            <p className="mt-2 text-sm leading-relaxed text-accent">
              We use cookies to deliver a better, safer and more personalised experience for you.
            </p>
            <span aria-hidden="true" className="mt-4 block h-0.5 w-8 rounded-full bg-accent" />
          </div>
        </nav>
      </aside>

      <div className="flex min-w-0 flex-col gap-5">
        <div className="relative isolate overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-accent/5 to-card shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex-1 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Our cookie policy</p>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-foreground text-balance">
                A better experience,
                <br />
                powered by cookies
              </h2>
              {sections[0]?.body[0] ? (
                <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">{sections[0].body[0]}</p>
              ) : null}
            </div>
            <div className="relative m-4 aspect-[4/3] overflow-hidden rounded-xl shadow-lg shadow-primary/15 sm:w-72 sm:shrink-0 lg:w-80">
              <Image
                src="/media/legal/cookie-road.png"
                alt=""
                fill
                sizes="(min-width: 640px) 20rem, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <ul className="grid gap-5 md:grid-cols-3">
          {sections.map((s, i) => {
            const Icon = iconFor(s.heading)
            return (
              <li key={s.heading} className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
                <div className="flex items-start justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
                    <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-[0.7rem] font-semibold text-foreground">
                    {num(i)}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{s.heading}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body.join(' ')}</p>
              </li>
            )
          })}
        </ul>

        <div className="flex flex-col gap-3">
          {sections.map((s, i) => {
            const id = ids[i]
            const isOpen = open === id
            return (
              <div key={s.heading} id={id} className="scroll-mt-28 rounded-2xl border border-border bg-card shadow-sm">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`${id}-panel`}
                  onClick={() => setOpen(isOpen ? null : id)}
                  className="flex w-full items-start gap-5 p-5 text-left"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                    {num(i)}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-base font-semibold text-foreground">{s.heading}</span>
                    <span
                      id={`${id}-panel`}
                      className={cn('mt-1 block text-sm leading-relaxed text-teal', !isOpen && 'line-clamp-2')}
                    >
                      {isOpen
                        ? s.body.map((p, j) => (
                            <span key={j} className={cn('block', j > 0 && 'mt-2')}>
                              {p}
                            </span>
                          ))
                        : s.body.join(' ')}
                    </span>
                  </span>
                  <ChevronDown
                    className={cn('mt-2 h-5 w-5 shrink-0 text-foreground transition-transform', isOpen && 'rotate-180')}
                    aria-hidden="true"
                  />
                </button>
              </div>
            )
          })}
        </div>

        <div className="relative isolate flex items-center gap-3 overflow-hidden rounded-2xl bg-secondary/70 px-5 py-4">
          <CalendarDays className="h-5 w-5 shrink-0 text-foreground" strokeWidth={1.75} aria-hidden="true" />
          <p className="text-sm text-foreground">
            <span className="font-semibold">Last updated:</span> <span className="text-teal">{lastUpdated}</span>
          </p>
          <div aria-hidden="true" className="absolute -right-2 inset-y-0 -z-10 flex w-28 skew-x-[-35deg] gap-2">
            <span className="w-8 bg-accent" />
            <span className="w-10 bg-primary" />
          </div>
        </div>
      </div>
    </div>
  )
}
