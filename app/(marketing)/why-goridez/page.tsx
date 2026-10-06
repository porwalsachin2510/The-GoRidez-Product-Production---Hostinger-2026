import type { Metadata } from "next"
import { getSiteSettings, getCmsPageBySlug } from "@/lib/data/queries"
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo"
import { JsonLd } from "@/components/site/page-shell"
import { PageSplitHero } from "@/components/site/page-split-hero"
import { AccentTitle } from "@/components/site/accent-title"
import { ShieldCtaBanner } from "@/components/site/shield-cta-banner"
import { WhyStats, WhyReasons, WhyDifference } from "@/components/site/why/why-sections"

// The CMS page was seeded under the brand slug; keep the legacy slug as a fallback.
async function getWhyPage() {
  return (await getCmsPageBySlug("why-GoRidez")) ?? (await getCmsPageBySlug("why-goridez"))
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getWhyPage()
  return buildMetadata({
    seo: page?.seo || {
      metaTitle: "Why GoRidez | Trusted Corporate Transport in Kuwait",
      metaDescription:
        "Why enterprises choose GoRidez: RTA-compliant fleet, vetted drivers, live tracking, transparent reporting and a 24/7 operations desk across Kuwait.",
      keywords: ["reliable corporate transport Kuwait", "RTA compliant staff transport", "safe employee transportation Kuwait"],
    },
    title: page?.title,
    description: page?.heroSubtitle,
    path: "/why-goridez",
    image: page?.heroImage,
  })
}

export default async function WhyGoRidezPage() {
  const [settings, cmsPage] = await Promise.all([getSiteSettings(), getWhyPage()])

  const sections = cmsPage?.sections ?? []
  const reasons = sections.find((s) => s.type === "icon-cards")
  const difference = sections.find((s) => s.type === "prose-columns")
  const stats = settings.stats ?? []

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Why GoRidez", path: "/why-goridez" },
        ])}
      />

      <PageSplitHero
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Why GoRidez" }]}
        title={<AccentTitle title={cmsPage?.heroTitle || "Reliability engineered into every trip"} />}
        description={
          cmsPage?.heroSubtitle ||
          "For your operations, corporate transport is critical infrastructure. We build, run and report on it that way — safe, compliant and accountable, every single day."
        }
        image={cmsPage?.heroImage || "/media/fleet/sedans.png"}
        imageAlt={cmsPage?.heroImageAlt || "GoRidez executive arriving at a corporate destination"}
        shape="curved"
      >
        <div aria-hidden="true" className="h-10 sm:h-12" />
      </PageSplitHero>

      <WhyStats stats={stats} />
      <WhyReasons section={reasons} />
      <WhyDifference section={difference} />

      <ShieldCtaBanner primary={settings.ctaPrimary} secondary={settings.ctaSecondary} eyebrow="" />
    </>
  )
}
