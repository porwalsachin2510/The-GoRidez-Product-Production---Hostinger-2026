import Link from 'next/link'
import { ArrowRight, ShieldCheck, type LucideIcon } from 'lucide-react'
import { Container } from '@/components/site/primitives'
import { Reveal } from '@/components/site/reveal'

type Cta = { label?: string; href?: string } | undefined

export function ShieldCtaBanner({
  primary,
  secondary,
  eyebrow = 'Ready to move?',
  title = 'Ready to move your workforce with confidence?',
  description = "Tell us about your routes and headcount. We'll design a transport programme that fits your operation.",
  icon: Icon = ShieldCheck,
}: {
  primary?: Cta
  secondary?: Cta
  eyebrow?: string
  title?: string
  description?: string
  icon?: LucideIcon
}) {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-r from-navy via-[oklch(0.36_0.12_258)] to-teal px-8 py-10 text-white shadow-2xl shadow-primary/20 sm:px-12 sm:py-12">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 top-1/2 -z-10 hidden h-64 w-64 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 md:flex"
            >
              <div className="flex h-44 w-44 items-center justify-center rounded-full border border-white/15">
                <div className="flex h-24 w-24 items-center justify-center rounded-full border border-accent/40 bg-white/5">
                  <Icon className="h-12 w-12 text-accent" strokeWidth={1.5} />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:pr-56">
              <div className="max-w-xl">
                {eyebrow && (
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</span>
                )}
                <h2 className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight text-balance sm:text-3xl">
                  {title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-white/80 text-pretty">{description}</p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Link
                  href={primary?.href || '/contact'}
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg transition hover:brightness-110"
                >
                  {primary?.label || 'Get a Quote'}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
                <Link
                  href={secondary?.href || '/contact'}
                  className="inline-flex items-center gap-2 rounded-full border border-white/50 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Talk to our team
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
