import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Quote, Star, Check, Award, Building2, Users, Headset, Bus } from 'lucide-react'
import { Container, SectionHeading } from '@/components/site/primitives'
import { Reveal } from '@/components/site/reveal'
import { HoverCard } from '@/components/site/motion'
import { CountUp } from '@/components/site/count-up'
import { TestimonialAvatar } from '@/components/site/testimonial-avatar'
import { Icon } from '@/lib/icons'
import type { LucideIcon } from 'lucide-react'
import type {
  ServiceData,
  IndustryData,
  FleetCategoryData,
  TestimonialData,
  LocationData,
  SiteSettingsData,
} from "@/lib/data/queries";

export { FleetExplorer as FleetSection } from '@/components/site/home/fleet-explorer'

/* --------------------------------- Stats --------------------------------- */

function statIcon(label: string): LucideIcon {
  const l = label.toLowerCase()
  if (/(year|experience|heritage)/.test(l)) return Award
  if (/(depot|zone|location|city|area)/.test(l)) return Building2
  if (/(client|enterprise|customer|compan)/.test(l)) return Users
  if (/(coach|fleet|vehicle|seat|bus|van)/.test(l)) return Bus
  return Headset
}

export function StatsBar({
  stats = [],
}: {
  stats?: { value: string; label: string }[];
}) {
  if (!stats.length) return null;
  return (
    <section className="py-8">
      <Container>
        <div className="grid grid-cols-2 gap-y-8 rounded-3xl bg-primary px-6 py-8 text-primary-foreground shadow-xl shadow-primary/20 sm:px-8 lg:grid-cols-4 lg:gap-y-0 lg:divide-x lg:divide-primary-foreground/15">
          {stats.map((s) => {
            const StatIcon = statIcon(s.label);
            return (
              <div key={s.label} className="flex items-center gap-4 lg:px-8">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary-foreground/10 text-accent ring-1 ring-inset ring-primary-foreground/10">
                  <StatIcon className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <CountUp
                    value={s.value}
                    className="block font-display text-2xl font-bold tabular-nums sm:text-3xl"
                  />
                  <div className="mt-0.5 text-sm leading-snug text-primary-foreground/70">
                    {s.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}


/* ------------------------------ Industries ------------------------------- */

export function IndustriesSection({ industries }: { industries: IndustryData[] }) {
  if (!industries.length) return null
  const shown = industries.slice(0, 8)
  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          align="left"
          eyebrow="Industries we serve"
          title="Trusted across sectors that never stop moving"
          description="We tailor transport programmes to the operational realities of each industry — shift patterns, safety standards and scale."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((ind, i) => (
            <Reveal key={ind._id} delay={i * 0.05}>
              <Link
                href={`/industries/${ind.slug}`}
                className="group flex h-full flex-col rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/12 text-accent transition-colors group-hover:bg-brand-gradient group-hover:text-white">
                  <Icon name={ind.icon} hint={ind.name} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-foreground">
                  {ind.name}
                </h3>
                {ind.excerpt && (
                  <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {ind.excerpt}
                  </p>
                )}
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}


/* ------------------------------- Services -------------------------------- */
/* Bento layout: one featured (navy) card + supporting cards. */

function ServiceMiniCard({ service }: { service: ServiceData }) {
  return (
    <HoverCard>
      <Link
        href={`/services/${service.slug}`}
        className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card p-7 transition-colors hover:border-accent/40 hover:shadow-xl"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-accent/15 to-primary/15 text-primary transition-all duration-300 group-hover:bg-brand-gradient group-hover:text-white">
          <Icon name={service.icon} hint={service.title} className="h-5 w-5" />
        </div>
        <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{service.title}</h3>
        {service.excerpt && (
          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
            {service.excerpt}
          </p>
        )}
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors group-hover:text-accent">
          Learn more
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Link>
    </HoverCard>
  )
}

export function ServicesSection({ services }: { services: ServiceData[] }) {
  if (!services.length) return null
  const [featured, ...rest] = services
  const supporting = rest.slice(0, 3)

  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          eyebrow="What we do"
          title="Mobility solutions built for how Kuwait works"
          description="From daily staff shuttles to executive chauffeur programmes — each service is managed end-to-end with compliance, safety and reliability at its core."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3 lg:grid-rows-2">
          {/* Featured navy card */}
          <Reveal className="lg:row-span-2">
            <Link
              href={`/services/${featured.slug}`}
              className="group relative flex h-full min-h-[22rem] flex-col overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground shadow-xl transition-transform hover:-translate-y-1"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent/25 blur-3xl"
              />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/20 text-accent">
                <Icon name={featured.icon} hint={featured.title} className="h-6 w-6" />
              </div>
              <h3 className="relative mt-6 font-display text-2xl font-semibold">{featured.title}</h3>
              {featured.excerpt && (
                <p className="relative mt-3 max-w-sm text-sm leading-relaxed text-primary-foreground/75">
                  {featured.excerpt}
                </p>
              )}
              <span className="relative mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                Learn more
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>

              {/* Image anchored to the bottom of the tall card */}
              {featured.heroImage && (
                <div className="relative mt-auto -mb-8 -mx-8 pt-8">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featured.heroImage}
                    alt={featured.title}
                    className="h-48 w-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
            </Link>
          </Reveal>

          {supporting.map((service, i) => (
            <Reveal
              key={service._id}
              delay={i * 0.05}
              className={i === 2 ? 'lg:col-span-2' : undefined}
            >
              <ServiceMiniCard service={service} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* ----------------------------- How it works ------------------------------ */

const processSteps = [
  {
    icon: 'phone',
    title: 'Connect',
    description: 'Share your requirement with our mobility experts and we map how your people move.',
  },
  {
    icon: 'clipboard-list',
    title: 'Plan',
    description: 'We design a solution that fits your teams, routes and operations — balancing time, comfort and cost.',
  },
  {
    icon: 'bus',
    title: 'Operate',
    description: 'Vetted drivers and compliant vehicles run your daily operations with safety and transparency.',
  },
  {
    icon: 'line-chart',
    title: 'Optimize',
    description: 'Continuous improvement using ridership and punctuality data to deliver more value every day.',
  },
]

export function ProcessSection() {
  return (
    <section className="bg-secondary py-24">
      <Container>
        <SectionHeading
          align="left"
          eyebrow="How it works"
          title="From first call to fully managed programme"
          description="A structured onboarding that gets your workforce moving reliably — without the operational burden landing on your team."
        />
        <div className="relative mt-16">
          <div
            className="pointer-events-none absolute left-0 right-0 top-7 hidden border-t-2 border-dashed border-border lg:block"
            aria-hidden="true"
          />
          <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.1}>
                <li className="relative flex flex-col items-start">
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-brand-gradient text-white shadow-lg shadow-accent/20 ring-8 ring-secondary">
                    <Icon name={step.icon} className="h-6 w-6" />
                    <span className="absolute -right-1.5 -top-1.5 grid h-6 w-6 place-items-center rounded-full border border-border bg-card font-display text-xs font-bold text-primary">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}

/* ------------------------------ Technology ------------------------------- */

const platformFeatures = [
  'Real-time fleet tracking',
  'Smart route optimization',
  'Automated reporting',
  'Driver & compliance management',
  'Cost control & analytics',
]

export function TechnologySection() {
  return (
    <section className="py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-primary px-6 py-14 text-primary-foreground sm:px-12 lg:px-16 lg:py-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(var(--color-primary-foreground)_1px,transparent_1px)] [background-size:26px_26px]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/30 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                Technology
              </span>
              <h2 className="mt-5 font-display text-3xl font-bold leading-[1.1] tracking-tight text-balance sm:text-4xl">
                One platform to run your entire mobility programme
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-primary-foreground/75">
                GoRidez pairs a professionally managed fleet with software that gives your team
                complete visibility — from the first pickup to the monthly report.
              </p>

              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {platformFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-accent/20 text-accent">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-sm font-medium text-primary-foreground/90">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                  href="/book-demo"
                  className="group inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5"
                >
                  Request a Demo
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/technology"
                  className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
                >
                  See how it works
                </Link>
              </div>
            </div>

            <Reveal delay={0.1}>
              <div className="relative overflow-hidden rounded-3xl border border-primary-foreground/15 shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/media/technology/platform-dashboard.png"
                  alt="GoRidez operations dashboard showing live fleet tracking and route cards"
                  className="aspect-[4/3] h-full w-full object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center gap-2 p-6">
                  <span className="inline-flex items-center gap-2 rounded-full bg-primary/70 px-4 py-2 text-sm font-medium text-primary-foreground backdrop-blur-sm ring-1 ring-primary-foreground/20">
                    <Icon name="navigation" className="h-4 w-4 text-accent" />
                    24/7 operations & live fleet visibility
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}

/* -------------------------------- Why us --------------------------------- */

const reliabilityPoints = [
  {
    icon: 'headset',
    title: '24/7 Operations Control Center',
    description: 'A dedicated desk monitors every route around the clock, ready to act the moment anything changes.',
  },
  {
    icon: 'shield-check',
    title: 'Strict safety & maintenance standards',
    description: 'Compliant, insured vehicles on enforced maintenance schedules keep every trip safe.',
  },
  {
    icon: 'user-check',
    title: 'Trained drivers & compliance checks',
    description: 'Vetted professional drivers with continuous compliance and conduct checks on every shift.',
  },
  {
    icon: 'radar',
    title: 'Real-time monitoring & incident response',
    description: 'Live GPS and route monitoring with a rapid, structured response to any incident.',
  },
]

export function WhySection() {
  return (
    <section className="py-24">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Why GoRidez"
              title="Reliability engineered into every trip"
              description="We treat corporate transport as critical infrastructure — because for your operations, it is."
            />
            <ul className="mt-10 space-y-6">
              {reliabilityPoints.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.08}>
                  <li className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/12 text-accent">
                      <Icon name={p.icon} className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold text-foreground">{p.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal delay={0.1}>
            <div className="relative">
              <div className="relative overflow-hidden rounded-[2rem] border border-border shadow-2xl shadow-primary/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/media/sections/operations.png"
                  alt="GoRidez operations control room monitoring live fleet GPS tracking"
                  className="aspect-[4/4] h-full w-full object-cover"
                />
              </div>
              {/* floating control-center callout */}
              <div className="absolute -bottom-5 -left-5 max-w-[15rem] rounded-2xl border border-border bg-card p-5 shadow-xl">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                  <span className="font-display text-lg font-bold text-brand-gradient">24/7</span>
                </div>
                <div className="mt-1 text-sm font-semibold text-foreground">Operations Control Center</div>
                <div className="mt-0.5 text-xs leading-snug text-muted-foreground">
                  Always monitoring. Always live.
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

/* ----------------------------- Testimonials ------------------------------ */

function TestimonialCard({ t }: { t: TestimonialData }) {
  return (
    <figure className="flex h-full flex-col rounded-3xl border border-border bg-card p-7 transition-shadow hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-brand-gradient text-white">
          <Quote className="h-4 w-4" aria-hidden="true" />
        </div>
        <div className="flex gap-0.5" aria-label={`${t.rating ?? 5} out of 5`}>
          {Array.from({ length: t.rating ?? 5 }).map((_, idx) => (
            <Star key={idx} className="h-4 w-4 fill-accent text-accent" />
          ))}
        </div>
      </div>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
        <TestimonialAvatar name={t.author} avatar={t.avatar} size="md" />
        <div className="min-w-0">
          <div className="text-sm font-semibold text-foreground">{t.author}</div>
          {(t.role || t.company) && (
            <div className="text-xs text-muted-foreground">
              {[t.role, t.company].filter(Boolean).join(', ')}
            </div>
          )}
        </div>
      </figcaption>
    </figure>
  )
}

export function TestimonialsSection({
  testimonials,
  eyebrow = 'Client voices',
  title = 'Operations leaders trust GoRidez',
  description = 'Real feedback from the operations, HR and facilities leaders who rely on us across sectors.',
  limit = 6,
}: {
  testimonials: TestimonialData[]
  eyebrow?: string
  title?: string
  description?: string
  limit?: number
}) {
  if (!testimonials.length) return null
  const shown = testimonials.slice(0, limit)
  return (
    <section className="bg-secondary py-24">
      <Container>
        <SectionHeading align="center" eyebrow={eyebrow} title={title} description={description} />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((t, i) => (
            <Reveal key={t._id} delay={i * 0.06}>
              <TestimonialCard t={t} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* ------------------------------- Coverage -------------------------------- */

export function CoverageSection({
  locations,
  testimonials = [],
  stats = [],
}: {
  locations: LocationData[]
  testimonials?: TestimonialData[]
  stats?: { value: string; label: string }[]
}) {
  if (!locations.length) return null
  const coverageStats = stats
    .filter((s) => /(client|enterprise|depot|zone|location|area)/i.test(s.label))
    .slice(0, 2)
  const operatform = testimonials.slice(0, 3)

  return (
    <section className="py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeading
              eyebrow="Where we operate"
              title="Serving businesses across Kuwait"
              description="From Kuwait City to the industrial and free-trade zones — one accountable mobility partner with local operations and nationwide reach."
            />
            {coverageStats.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-4">
                {coverageStats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-border bg-card px-5 py-4 shadow-sm"
                  >
                    <div className="font-display text-2xl font-bold text-brand-gradient">{s.value}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Map panel with location pills */}
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-secondary/40 p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/media/sections/kuwait-map.png"
              alt="Map of Kuwait showing GoRidez coverage areas"
              className="absolute inset-0 h-full w-full object-cover opacity-70"
              aria-hidden="true"
            />
            <div className="relative grid gap-3 sm:grid-cols-2">
              {locations.map((loc) => (
                <Link
                  key={loc._id}
                  href={`/locations/${loc.slug}`}
                  className="group flex items-center gap-3 rounded-2xl border border-border bg-card/90 px-4 py-3 shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/12 text-accent">
                    <Icon name="map-pin" className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-2">
                      <span className="truncate font-display text-sm font-semibold text-foreground">
                        {loc.name}
                      </span>
                      {loc.isPrimary && (
                        <span className="rounded-full bg-brand-gradient px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white">
                          HQ
                        </span>
                      )}
                    </span>
                    <span className="mt-0.5 flex items-center gap-1 text-xs font-medium text-primary transition-colors group-hover:text-accent">
                      View coverage
                      <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Operatform leaders testimonials */}
        {operatform.length > 0 && (
          <div className="mt-20">
            <SectionHeading align="center" eyebrow="Client voices" title="Operations leaders trust GoRidez" />
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {operatform.map((t, i) => (
                <Reveal key={t._id} delay={i * 0.06}>
                  <TestimonialCard t={t} />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  )
}
