import type { Metadata } from "next"
import { notFound } from "next/navigation"
import {
  BadgeCheck,
  Building2,
  Bus,
  CalendarDays,
  Check,
  Clock,
  MapPin,
  ShieldCheck,
  Siren,
  UserCog,
  UserRound,
  Wallet,
} from "lucide-react"
import { getSiteSettings, getCaseStudies, getCaseStudyBySlug, getRelatedCaseStudies } from "@/lib/data/queries"
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo"
import { Container } from "@/components/site/primitives"
import { JsonLd } from "@/components/site/page-shell"
import { Reveal } from "@/components/site/reveal"
import { CountUp } from "@/components/site/count-up"
import { PageSplitHero } from "@/components/site/page-split-hero"
import { ShieldCtaBanner } from "@/components/site/shield-cta-banner"
import { ArticleMarkdown } from "@/components/site/blog/article-markdown"
import { GalleryCarousel } from "@/components/site/case-studies/gallery-carousel"
import {
  ChecklistCard,
  Eyebrow,
  NarrativeTimeline,
  OverlapStatStrip,
  QuoteBanner,
  RelatedCaseStudies,
  type StripItem,
} from "@/components/site/case-studies/case-study-sections"
import { cn } from "@/lib/utils"

export async function generateStaticParams() {
  const studies = await getCaseStudies()
  return studies.map((cs) => ({ slug: cs.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const cs = await getCaseStudyBySlug(slug)
  if (!cs) return { title: "Case study not found" }
  return buildMetadata({
    seo: cs.seo,
    title: cs.title,
    description: cs.excerpt,
    path: `/case-studies/${slug}`,
    image: cs.coverImage,
  })
}

function metricIcon(label: string) {
  if (/time|arriv|wait|handover/i.test(label)) return Clock
  if (/cost|saved|price/i.test(label)) return Wallet
  if (/safety|incident/i.test(label)) return ShieldCheck
  if (/missed|alert/i.test(label)) return Siren
  if (/rating|retention|utilis/i.test(label)) return BadgeCheck
  if (/vehicle|fleet/i.test(label)) return Bus
  return UserRound
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [settings, cs, related] = await Promise.all([
    getSiteSettings(),
    getCaseStudyBySlug(slug),
    getRelatedCaseStudies(slug, 3),
  ])
  if (!cs) notFound()

  const glance = [
    cs.client ? { icon: Building2, label: "Client", value: cs.client } : null,
    cs.location ? { icon: MapPin, label: "Location", value: cs.location } : null,
    cs.fleetSize ? { icon: Bus, label: "Scale", value: cs.fleetSize } : null,
    cs.duration ? { icon: CalendarDays, label: "Programme", value: cs.duration } : null,
  ].filter(Boolean) as StripItem[]

  const steps = [
    cs.challenge ? { icon: UserCog, heading: "The challenge", body: cs.challenge, tone: "accent" as const } : null,
    cs.solution ? { icon: UserRound, heading: "Our solution", body: cs.solution, tone: "navy" as const } : null,
    cs.result ? { icon: Check, heading: "The result", body: cs.result, tone: "accent" as const } : null,
  ].filter(Boolean) as Parameters<typeof NarrativeTimeline>[0]["steps"]

  const hasAside = Boolean(cs.services?.length || cs.highlights?.length)

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
          { name: cs.title, path: `/case-studies/${slug}` },
        ])}
      />

      <PageSplitHero
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Case Studies", href: "/case-studies" }, { name: cs.title }]}
        eyebrow={cs.industry || "Case study"}
        eyebrowStyle="pill"
        title={cs.title}
        description={cs.excerpt}
        image={cs.coverImage || "/media/case-studies/tech-park-shuttle.png"}
        imageAlt={cs.title}
        shape="curved"
      >
        <div aria-hidden="true" className="h-10 sm:h-12" />
      </PageSplitHero>

      <OverlapStatStrip items={glance} variant="glance" />

      {cs.metrics && cs.metrics.length > 0 && (
        <section className="pt-14 sm:pt-16">
          <Container className="max-w-5xl">
            <Eyebrow center>The outcome</Eyebrow>
            <h2 className="mt-3 text-center font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              Results that moved the needle
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {cs.metrics.map((m, i) => {
                const MetricIcon = metricIcon(m.label)
                return (
                  <Reveal key={m.label} delay={i * 0.05}>
                    <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm">
                      <span
                        className={cn(
                          "flex h-11 w-11 items-center justify-center rounded-xl",
                          i % 2 === 0 ? "bg-accent text-accent-foreground" : "bg-navy text-white",
                        )}
                      >
                        <MetricIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div
                        className={cn(
                          "mt-4 font-display text-3xl font-bold sm:text-4xl",
                          i % 2 === 0 ? "text-accent" : "text-navy",
                        )}
                      >
                        <CountUp value={m.value} />
                      </div>
                      <div className="mt-1 text-sm leading-tight text-muted-foreground">{m.label}</div>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </Container>
        </section>
      )}

      {(steps.length > 0 || hasAside) && (
        <section className="pt-10">
          <Container className="max-w-5xl">
            <div className={cn("grid gap-6", hasAside && "lg:grid-cols-[1fr_20rem]")}>
              <Reveal>
                <NarrativeTimeline steps={steps} />
              </Reveal>
              {hasAside && (
                <div className="flex flex-col gap-6">
                  <ChecklistCard title="Services delivered" items={cs.services} />
                  <ChecklistCard title="Solution highlights" items={cs.highlights} />
                </div>
              )}
            </div>
          </Container>
        </section>
      )}

      {cs.body && (
        <section className="pt-10">
          <Container className="max-w-3xl">
            <ArticleMarkdown content={cs.body} />
          </Container>
        </section>
      )}

      {cs.testimonialQuote && (
        <section className="pt-10">
          <Container className="max-w-5xl">
            <Reveal>
              <QuoteBanner quote={cs.testimonialQuote} author={cs.testimonialAuthor} role={cs.testimonialRole} />
            </Reveal>
          </Container>
        </section>
      )}

      {cs.gallery && cs.gallery.length > 0 && (
        <section className="pt-14 sm:pt-16">
          <Container>
            <GalleryCarousel images={cs.gallery.filter(Boolean)} title={cs.title} />
          </Container>
        </section>
      )}

      <RelatedCaseStudies studies={related} />

      <ShieldCtaBanner primary={settings.ctaPrimary} secondary={settings.ctaSecondary} eyebrow="" />
    </>
  )
}
