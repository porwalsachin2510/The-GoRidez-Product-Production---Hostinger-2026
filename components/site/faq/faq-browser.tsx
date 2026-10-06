'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Bus,
  ChevronDown,
  Cpu,
  CircleHelp,
  Headset,
  LayoutGrid,
  MapPin,
  ShieldCheck,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export interface FaqGroup {
  key: string
  label: string
  items: { _id: string; question: string; answer: string }[]
}

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  general: LayoutGrid,
  fleet: Bus,
  corporate: Users,
  safety: ShieldCheck,
  billing: Wallet,
  pricing: Wallet,
  technology: Cpu,
  coverage: MapPin,
}

function iconFor(key: string): LucideIcon {
  return CATEGORY_ICONS[key.toLowerCase()] ?? CircleHelp
}

export function FaqBrowser({ groups }: { groups: FaqGroup[] }) {
  const [activeKey, setActiveKey] = useState(groups[0]?.key ?? '')
  const active = groups.find((g) => g.key === activeKey) ?? groups[0]
  const [openId, setOpenId] = useState<string | null>(active?.items[0]?._id ?? null)

  function selectGroup(key: string) {
    setActiveKey(key)
    setOpenId(groups.find((g) => g.key === key)?.items[0]?._id ?? null)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[17rem_1fr] lg:gap-6">
      <aside className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
        <nav aria-label="FAQ categories" className="overflow-hidden rounded-2xl border border-border bg-card">
          <ul role="tablist" aria-orientation="vertical" className="divide-y divide-border">
            {groups.map((g) => {
              const Icon = iconFor(g.key)
              const selected = g.key === active?.key
              return (
                <li key={g.key}>
                  <button
                    type="button"
                    role="tab"
                    id={`faq-tab-${g.key}`}
                    aria-selected={selected}
                    aria-controls="faq-panel"
                    onClick={() => selectGroup(g.key)}
                    className={cn(
                      'flex w-full items-center gap-4 px-4 py-4 text-left transition-colors',
                      selected
                        ? 'bg-gradient-to-r from-[oklch(0.3_0.13_262)] to-[oklch(0.5_0.1_170)] text-white'
                        : 'hover:bg-surface',
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-11 w-11 shrink-0 items-center justify-center rounded-full',
                        selected ? 'bg-white text-primary' : 'border border-border bg-surface text-foreground',
                      )}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-sm font-semibold">{g.label}</span>
                      <span className={cn('block text-xs', selected ? 'text-white/75' : 'text-muted-foreground')}>
                        {g.items.length} {g.items.length === 1 ? 'question' : 'questions'}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="rounded-2xl bg-accent/10 p-6">
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <Headset className="h-5 w-5" aria-hidden="true" />
            </span>
            <h2 className="font-display text-base font-semibold leading-snug text-foreground">
              Can&apos;t find your answer?
            </h2>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Our mobility specialists are here to help.</p>
          <Link
            href="/contact"
            className="group mt-5 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition hover:brightness-110"
          >
            Talk to our team
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </aside>

      <div
        id="faq-panel"
        role="tabpanel"
        aria-labelledby={active ? `faq-tab-${active.key}` : undefined}
        className="divide-y divide-border self-start overflow-hidden rounded-2xl border border-border bg-card"
      >
        {active?.items.map((item, i) => {
          const isOpen = openId === item._id
          return (
            <div key={item._id}>
              <h3>
                <button
                  type="button"
                  id={`faq-btn-${item._id}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-ans-${item._id}`}
                  onClick={() => setOpenId(isOpen ? null : item._id)}
                  className="flex w-full items-center gap-4 px-5 py-5 text-left sm:px-6"
                >
                  <span
                    className={cn(
                      'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold',
                      isOpen ? 'bg-accent/15 text-accent' : 'bg-surface text-foreground',
                    )}
                  >
                    {i + 1}
                  </span>
                  <span className="flex-1 text-sm font-semibold text-foreground sm:text-base">{item.question}</span>
                  <span
                    className={cn(
                      'flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors',
                      isOpen ? 'bg-accent text-accent-foreground' : 'bg-surface text-foreground',
                    )}
                  >
                    <ChevronDown
                      className={cn('h-4 w-4 transition-transform', isOpen && 'rotate-180')}
                      aria-hidden="true"
                    />
                  </span>
                </button>
              </h3>
              <div
                id={`faq-ans-${item._id}`}
                role="region"
                aria-labelledby={`faq-btn-${item._id}`}
                hidden={!isOpen}
                className="px-5 pb-6 pl-[4.25rem] text-sm leading-relaxed text-muted-foreground sm:px-6 sm:pl-[4.5rem]"
              >
                {item.answer}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
