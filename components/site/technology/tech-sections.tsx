import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, PlayCircle, ShieldCheck, UserRound } from 'lucide-react'
import { Container } from '@/components/site/primitives'
import { Reveal } from '@/components/site/reveal'
import type { ClientData } from '@/lib/data/queries'

function SectionEyebrow({ children }: { children: string }) {
  return (
    <span className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
      <span aria-hidden="true" className="h-px w-5 bg-accent" />
      {children}
    </span>
  )
}

export function ClientGrid({
  clients,
  eyebrow = 'Trusted by',
  title = 'Enterprises that move with GoRidez',
}: {
  clients: ClientData[]
  eyebrow?: string
  title?: string
}) {
  if (!clients.length) return null
  const industries = new Set(clients.map((c) => c.industry?.trim()).filter(Boolean))
  return (
    <section className="py-16 sm:py-20">
      <Container className="max-w-5xl">
        <SectionEyebrow>{eyebrow}</SectionEyebrow>
        <h2 className="mt-3 text-center font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
          {title}
        </h2>
        <ul className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {clients.map((client, i) => (
            <li key={client._id}>
              <Reveal delay={(i % 4) * 0.05}>
                <div className="flex h-full min-h-32 flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-card px-4 py-6 text-center transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md">
                  {client.logo ? (
                    <Image
                      src={client.logo || '/placeholder.svg'}
                      alt={`${client.name} logo`}
                      width={96}
                      height={32}
                      className="h-8 w-auto object-contain"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground"
                    >
                      {client.name.trim()[0]?.toUpperCase()}
                    </span>
                  )}
                  <span className="text-sm font-semibold leading-snug text-navy text-balance">{client.name}</span>
                  {client.industry && (
                    <span className="text-[11px] text-muted-foreground">{client.industry}</span>
                  )}
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          <span className="font-semibold text-accent">{clients.length}+</span> enterprise clients
          {industries.size > 0 && (
            <>
              <span aria-hidden="true" className="mx-2">
                {'·'}
              </span>
              <span className="font-semibold text-accent">{industries.size}</span> industries
            </>
          )}
        </p>
      </Container>
    </section>
  )
}

function Sparkline() {
  return (
    <svg viewBox="0 0 100 40" className="h-10 w-24 text-accent" aria-hidden="true">
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        points="0,34 12,28 22,31 34,22 46,25 58,15 70,19 82,8 100,4"
      />
    </svg>
  )
}

export function PlatformInAction({
  primary,
  secondary,
  stats,
}: {
  primary?: { label?: string; href?: string }
  secondary?: { label?: string; href?: string }
  stats: { onTime: string; activeVehicles: string; safetyIncidents: string }
}) {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl bg-[oklch(0.2_0.07_262)] px-6 py-10 text-white sm:px-10 lg:py-12">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_60%_50%,color-mix(in_oklch,var(--accent)_18%,transparent),transparent_60%)]"
            />
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.7fr_0.8fr]">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Platform in action</span>
                <h2 className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight text-balance sm:text-3xl">
                  See the GoRidez platform in action
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80 text-pretty">
                  Book a walkthrough and see how our platform gives your organisation live visibility, safer journeys
                  and data you can act on.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={primary?.href || '/book-demo'}
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition hover:brightness-110"
                  >
                    {primary?.label || 'See the platform in action'}
                    <PlayCircle className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <Link
                    href={secondary?.href || '/contact'}
                    className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Talk to our team
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <div className="relative mx-auto aspect-[3/4] w-full max-w-60">
                <Image
                  src="/media/technology/trip-tracking-phone.png"
                  alt="GoRidez rider app showing live trip tracking"
                  fill
                  sizes="240px"
                  className="object-contain"
                />
              </div>

              <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <li className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div>
                    <p className="text-xs text-white/70">On-time performance</p>
                    <p className="mt-1 font-display text-3xl font-bold text-accent">{stats.onTime}</p>
                  </div>
                  <Sparkline />
                </li>
                <li className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div>
                    <p className="text-xs text-white/70">Active vehicles</p>
                    <p className="mt-1 font-display text-3xl font-bold">{stats.activeVehicles}</p>
                  </div>
                  <UserRound className="h-9 w-9 text-accent/80" strokeWidth={1.5} aria-hidden="true" />
                </li>
                <li className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div>
                    <p className="text-xs text-white/70">Safety incidents</p>
                    <p className="mt-1 font-display text-3xl font-bold">{stats.safetyIncidents}</p>
                  </div>
                  <ShieldCheck className="h-9 w-9 text-accent" strokeWidth={1.5} aria-hidden="true" />
                </li>
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
