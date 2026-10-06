import Link from 'next/link'
import { ArrowRight, type LucideIcon } from 'lucide-react'
import { Container } from '@/components/site/primitives'
import { Reveal } from '@/components/site/reveal'

type Cta = { label?: string; href?: string } | undefined

/** Gradient call-to-action banner with a circular icon badge on the left. */
export function IconCtaBanner({
  icon: Icon,
  title,
  description,
  primary,
  secondary,
}: {
  icon: LucideIcon
  title: string
  description: string
  primary?: Cta
  /** Pass `null` to hide the secondary "Talk to our team" button. */
  secondary?: Cta | null
}) {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-r from-[oklch(0.3_0.13_262)] via-[oklch(0.3_0.12_258)] to-[oklch(0.42_0.1_170)] px-6 py-8 text-white shadow-2xl shadow-primary/20 sm:px-10 sm:py-10">
            <div
              aria-hidden="true"
              className="absolute right-6 top-4 -z-10 h-20 w-32 bg-[radial-gradient(circle,rgba(255,255,255,0.22)_1px,transparent_1.5px)] [background-size:10px_10px]"
            />
            <div
              aria-hidden="true"
              className="absolute bottom-4 left-4 -z-10 h-20 w-24 bg-[radial-gradient(circle,color-mix(in_oklch,var(--accent)_60%,transparent)_1px,transparent_1.5px)] [background-size:10px_10px]"
            />
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full ring-1 ring-white/20 ring-offset-8 ring-offset-transparent">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg">
                  <Icon className="h-9 w-9 text-accent" strokeWidth={1.75} aria-hidden="true" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-balance">{title}</h2>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/80 text-pretty">{description}</p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <Link
                  href={primary?.href || '/get-a-quote'}
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg transition hover:brightness-110"
                >
                  {primary?.label || 'Get a Quote'}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
                {secondary === null ? null : (
                  <Link
                    href={secondary?.href || '/contact'}
                    className="inline-flex items-center gap-2 rounded-full border border-white/50 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Talk to our team
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
