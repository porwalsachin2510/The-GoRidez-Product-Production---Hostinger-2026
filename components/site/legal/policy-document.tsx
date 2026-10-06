'use client'

import { useMemo } from 'react'
import {
  CalendarDays,
  DatabaseZap,
  FileLock2,
  FileText,
  Gavel,
  Globe,
  Scale,
  ShieldCheck,
  ShieldUser,
  User,
  UserCog,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { LegalSection } from '@/lib/legal-content'
import { slugify, useActiveSection } from './use-active-section'

const ICON_RULES: [RegExp, LucideIcon, LucideIcon][] = [
  // [match, sidebar icon, card icon]
  [/collect/i, ShieldCheck, FileLock2],
  [/use/i, UserCog, User],
  [/shar|retention/i, DatabaseZap, DatabaseZap],
  [/right/i, User, ShieldUser],
  [/liabil/i, Scale, Scale],
  [/law/i, Gavel, Gavel],
  [/website/i, Globe, Globe],
]

function iconsFor(heading: string): [LucideIcon, LucideIcon] {
  const rule = ICON_RULES.find(([re]) => re.test(heading))
  return rule ? [rule[1], rule[2]] : [FileText, FileText]
}

export function PolicyDocument({
  sections,
  lastUpdated,
}: {
  sections: LegalSection[]
  lastUpdated: string
}) {
  const ids = useMemo(() => sections.map((s) => slugify(s.heading)), [sections])
  const [active, setActive] = useActiveSection(ids)

  return (
    <div className="grid gap-6 lg:grid-cols-[15rem_1fr] lg:gap-6">
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <nav
          aria-label="Policy sections"
          className="rounded-2xl border border-border bg-secondary/60 p-2.5"
        >
          <ul className="flex flex-col gap-1">
            {sections.map((s, i) => {
              const [Icon] = iconsFor(s.heading)
              const selected = active === ids[i]
              return (
                <li key={s.heading}>
                  <a
                    href={`#${ids[i]}`}
                    onClick={() => setActive(ids[i])}
                    aria-current={selected ? 'location' : undefined}
                    className={cn(
                      'flex items-center gap-3 rounded-xl px-3 py-3.5 text-sm font-medium transition-colors',
                      selected ? 'bg-accent/10 text-accent' : 'text-foreground hover:bg-card',
                    )}
                  >
                    <Icon className="h-5 w-5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                    <span className="leading-snug">{s.heading}</span>
                  </a>
                </li>
              )
            })}
            <li className="flex items-center gap-3 px-3 py-3.5 text-sm text-foreground">
              <CalendarDays className="h-5 w-5 shrink-0" strokeWidth={1.75} aria-hidden="true" />
              <span className="leading-snug">
                <span className="block font-medium">Last updated</span>
                <span className="block text-muted-foreground">{lastUpdated}</span>
              </span>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="flex flex-col gap-5">
        {sections.map((s, i) => {
          const [, CardIcon] = iconsFor(s.heading)
          return (
            <article
              key={s.heading}
              id={ids[i]}
              className="flex scroll-mt-28 flex-col gap-5 rounded-2xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:gap-8 sm:p-6"
            >
              <div className="relative h-20 w-20 shrink-0">
                <span className="flex h-20 w-20 items-center justify-center rounded-full border border-border bg-secondary">
                  <CardIcon className="h-8 w-8 text-primary" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground ring-4 ring-card">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  {s.heading}
                </h2>
                <div className="mt-3 flex flex-col gap-3">
                  {s.body.map((p, j) => (
                    <p key={j} className="text-sm leading-relaxed text-muted-foreground">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
