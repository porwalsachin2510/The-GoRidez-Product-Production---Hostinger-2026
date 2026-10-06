import { CircleCheck, Phone, type LucideIcon } from 'lucide-react'
import { Container } from '@/components/site/primitives'
import { Reveal } from '@/components/site/reveal'

export interface PartnerBenefit {
  icon: LucideIcon
  title: string
  text: string
}

export interface PartnerStep {
  n: string
  icon: LucideIcon
  title: string
  text: string
}

function CenteredEyebrow({ children }: { children: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
      <span aria-hidden="true" className="h-px w-6 bg-accent" />
      {children}
      <span aria-hidden="true" className="h-px w-6 bg-accent" />
    </span>
  )
}

export function PartnerBenefits({ benefits }: { benefits: PartnerBenefit[] }) {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <CenteredEyebrow>Why partner with us</CenteredEyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
            Keep your vehicles moving and earning
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted-foreground text-pretty">
            We connect trusted operators with enterprise clients who need dependable, professional transport at scale.
          </p>
        </Reveal>
        <ul className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => (
            <li key={b.title}>
            <Reveal delay={i * 0.05} className="h-full">
              <div className="group h-full rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 ring-8 ring-accent/5">
                  <b.icon className="h-5 w-5 text-accent" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-display text-base font-semibold text-foreground">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.text}</p>
              </div>
            </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

export function PartnerSteps({ steps }: { steps: PartnerStep[] }) {
  return (
    <section className="border-y border-border bg-secondary/60 py-16 sm:py-20">
      <Container>
        <Reveal className="text-center">
          <CenteredEyebrow>How it works</CenteredEyebrow>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
            From application to your first route
          </h2>
        </Reveal>
        <ol className="mx-auto mt-12 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((s, i) => (
            <li key={s.n} className="relative">
              {i < steps.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute -right-8 top-1/2 hidden w-8 items-center lg:flex"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span className="h-px flex-1 border-t border-dashed border-accent/60" />
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                </span>
              ) : null}
              <Reveal delay={i * 0.06} className="h-full">
              <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <s.icon className="h-5 w-5 text-accent" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <div>
                    <span className="font-display text-lg font-bold leading-none text-accent">{s.n}</span>
                    <h3 className="mt-1 font-display text-sm font-semibold text-foreground">{s.title}</h3>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}

export function PartnerEligibility({ requirements, phone }: { requirements: string[]; phone?: string }) {
  return (
    <aside className="flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
      <div>
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          <span aria-hidden="true" className="h-px w-6 bg-accent" />
          Eligibility
        </span>
        <h2 className="mt-4 max-w-xs font-display text-3xl font-bold leading-tight tracking-tight text-foreground text-balance">
          What we look for in a partner
        </h2>
      </div>
      <ul className="flex flex-col gap-3.5">
        {requirements.map((r) => (
          <li key={r} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
            <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
            <span>{r}</span>
          </li>
        ))}
      </ul>
      {phone ? (
        <div className="relative isolate overflow-hidden rounded-2xl bg-gradient-to-br from-[oklch(0.24_0.08_262)] via-[oklch(0.26_0.08_250)] to-[oklch(0.38_0.09_175)] p-6 text-white shadow-xl shadow-primary/10">
          <div
            aria-hidden="true"
            className="absolute -right-6 -top-6 -z-10 h-28 w-28 rounded-full border-[14px] border-white/5"
          />
          <p className="font-display text-lg font-semibold">Questions first?</p>
          <p className="mt-2 max-w-[15rem] text-sm leading-relaxed text-white/75">
            Speak to our fleet partnerships desk before you apply.
          </p>
          <a
            href={`tel:${phone.replace(/\s/g, '')}`}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-white"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {phone}
          </a>
        </div>
      ) : null}
    </aside>
  )
}
