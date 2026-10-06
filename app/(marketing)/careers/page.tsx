import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Briefcase, Bus, ChartNoAxesColumnIncreasing, CirclePlay, ShieldCheck, Target } from "lucide-react"
import { getCareers, getSiteSettings } from "@/lib/data/queries"
import { getPageContent } from "@/lib/data/page-content"
import { buildMetadata } from "@/lib/seo"
import { Container, SectionHeading } from "@/components/site/primitives"
import { Reveal } from "@/components/site/reveal"
import { CareersExplorer } from "@/components/site/careers-explorer"
import { PhotoHero } from "@/components/site/careers/photo-hero"
import { IconCtaBanner } from "@/components/site/icon-cta-banner"
import { AccentText, stripAccent } from "@/components/site/accent-text"
import type { JobRole } from "@/lib/careers"

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent("careers")
  return buildMetadata({
    seo: page.seo,
    title: "Careers",
    description: stripAccent(page.subtitle),
    path: "/careers",
    image: page.image,
  })
}

const PERK_ICONS = [Target, ChartNoAxesColumnIncreasing, ShieldCheck, Bus]

export default async function CareersPage() {
  const [careers, settings, page] = await Promise.all([getCareers(), getSiteSettings(), getPageContent("careers")])
  const { copy } = page

  const perks = [1, 2, 3, 4]
    .map((n, i) => ({ icon: PERK_ICONS[i], title: copy[`perk${n}Title`], description: copy[`perk${n}Text`] }))
    .filter((p) => p.title)

  return (
    <>
      <PhotoHero
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Careers" }]}
        eyebrow={page.eyebrow}
        title={<AccentText text={page.title} />}
        description={page.subtitle}
        image={page.image}
        imageAlt={page.imageAlt}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          {copy.heroButton1 && (
            <Link
              href="#open-roles"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg transition hover:brightness-110"
            >
              {copy.heroButton1}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          )}
          {copy.heroButton2 && (
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full border border-white/60 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {copy.heroButton2}
              <CirclePlay className="h-4 w-4" aria-hidden="true" />
            </Link>
          )}
        </div>
      </PhotoHero>

      {perks.length > 0 && (
        <section className="py-16 sm:py-24">
          <Container>
            <SectionHeading
              eyebrow={copy.perksEyebrow}
              title={copy.perksTitle}
              description={copy.perksText}
              className="max-w-md"
            />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {perks.map((perk, i) => (
                <Reveal key={`${perk.title}-${i}`} delay={i * 0.06} className="h-full">
                  <div className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg">
                    <perk.icon className="h-9 w-9 text-accent" strokeWidth={1.5} aria-hidden="true" />
                    <h3 className="mt-6 font-display text-base font-semibold text-foreground">{perk.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{perk.description}</p>
                    <span aria-hidden="true" className="mt-6 block h-0.5 w-8 rounded-full bg-accent transition-all group-hover:w-14" />
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section id="open-roles" className="scroll-mt-24 bg-surface pb-4 pt-16 sm:pt-24">
        <Container>
          <SectionHeading eyebrow={copy.rolesEyebrow} title={copy.rolesTitle} />
          {careers.length > 0 ? (
            <CareersExplorer roles={careers as JobRole[]} />
          ) : (
            <div className="mt-12 rounded-2xl border border-dashed border-border bg-background p-12 text-center">
              <p className="text-muted-foreground">
                {copy.noRolesText}{" "}
                {settings.email && (
                  <a href={`mailto:${settings.email}`} className="font-semibold text-accent hover:underline">
                    {settings.email}
                  </a>
                )}
              </p>
            </div>
          )}
        </Container>
        <IconCtaBanner
          icon={Briefcase}
          title={copy.ctaTitle}
          description={copy.ctaText}
          primary={{ label: "Contact our team", href: "/contact" }}
          secondary={{ href: "/contact" }}
        />
      </section>
    </>
  )
}
