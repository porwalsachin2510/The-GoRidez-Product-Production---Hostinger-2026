import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Building2, Clock, Headset, Layers, ShieldCheck } from "lucide-react"
import { getSiteSettings, getCaseStudies, getClients } from "@/lib/data/queries"
import { getPageContent } from "@/lib/data/page-content"
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo"
import { Container } from "@/components/site/primitives"
import { JsonLd } from "@/components/site/page-shell"
import { Reveal } from "@/components/site/reveal"
import { PageSplitHero } from "@/components/site/page-split-hero"
import { AccentText, stripAccent } from "@/components/site/accent-text"
import { ShieldCtaBanner } from "@/components/site/shield-cta-banner"
import { CaseStudySpotlight } from "@/components/site/case-study-spotlight"
import { CaseStudiesExplorer } from "@/components/site/case-studies-explorer"
import { ClientWall, Eyebrow, OverlapStatStrip } from "@/components/site/case-studies/case-study-sections"

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent("case-studies")
  return buildMetadata({
    seo: page.seo,
    title: "Case Studies & Clients",
    description: stripAccent(page.subtitle),
    path: "/case-studies",
    image: page.image,
  })
}

export default async function CaseStudiesPage() {
  const [settings, caseStudies, clients, page] = await Promise.all([
    getSiteSettings(),
    getCaseStudies(),
    getClients(),
    getPageContent("case-studies"),
  ])
  const { copy } = page

  const featured = caseStudies.find((c) => c.featured) ?? caseStudies[0]
  const rest = featured ? caseStudies.filter((c) => c._id !== featured._id) : caseStudies

  const stats = [
    { icon: Layers, value: `${caseStudies.length}+`, label: copy.stat1Label },
    { icon: Clock, value: copy.stat2Value, label: copy.stat2Label },
    { icon: Headset, value: copy.stat3Value, label: copy.stat3Label },
    { icon: ShieldCheck, value: copy.stat4Value, label: copy.stat4Label },
  ].filter((s) => s.value && s.label)

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
        ])}
      />

      <PageSplitHero
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Case Studies" }]}
        eyebrow={page.eyebrow}
        eyebrowStyle="dash"
        title={<AccentText text={page.title} />}
        description={page.subtitle}
        image={page.image}
        imageAlt={page.imageAlt}
        shape="curved"
      >
        <div aria-hidden="true" className="h-10 sm:h-12" />
      </PageSplitHero>

      {caseStudies.length > 0 && stats.length > 0 && <OverlapStatStrip items={stats} />}

      <ClientWall clients={clients} heading={copy.clientsHeading} />

      {caseStudies.length > 0 ? (
        <>
          {featured && (
            <section className="py-14 sm:py-16">
              <Container>
                <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  {copy.featuredEyebrow}
                </span>
                <Reveal>
                  <CaseStudySpotlight cs={featured} />
                </Reveal>
              </Container>
            </section>
          )}

          {rest.length > 0 && (
            <section className="pb-16 sm:pb-20">
              <Container>
                <Eyebrow>{copy.listEyebrow}</Eyebrow>
                <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
                  {copy.listTitle}
                </h2>
                <p className="mt-3 text-sm text-muted-foreground">{copy.listText}</p>
                <div className="mt-8">
                  <CaseStudiesExplorer studies={rest} />
                </div>
              </Container>
            </section>
          )}
        </>
      ) : (
        <section className="py-16 sm:py-24">
          <Container>
            <div className="mx-auto max-w-2xl rounded-3xl border border-dashed border-border bg-card px-8 py-16 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                <Building2 className="h-7 w-7" aria-hidden="true" />
              </span>
              <h2 className="mt-6 font-display text-2xl font-semibold text-navy text-balance">{copy.emptyTitle}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{copy.emptyText}</p>
              <Link
                href={settings.ctaPrimary?.href || "/contact"}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground shadow-lg transition-all hover:brightness-110"
              >
                {copy.emptyButton}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Container>
        </section>
      )}

      <ShieldCtaBanner
        primary={settings.ctaPrimary}
        secondary={settings.ctaSecondary}
        eyebrow=""
        title={copy.ctaTitle}
        description={copy.ctaText}
      />
    </>
  )
}
