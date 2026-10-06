import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Container } from "@/components/site/primitives"
import { RoundedPhotoHero } from "@/components/site/rounded-photo-hero"
import { CmsSectionRenderer } from "@/components/site/cms-section-renderer"
import { PolicyDocument } from "@/components/site/legal/policy-document"
import { CookieDocument } from "@/components/site/legal/cookie-document"
import { PrivacyBanner } from "@/components/site/legal/privacy-banner"
import { buildMetadata } from "@/lib/seo"
import { getCmsPageBySlug } from "@/lib/data/queries"
import { legalDocs, legalSlugs, type LegalSection } from "@/lib/legal-content"

// Allow CMS-authored legal slugs beyond the built-in three to render on demand.
export const dynamicParams = true

export function generateStaticParams() {
  return legalSlugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const page = await getCmsPageBySlug(`legal-${slug}`)
  const doc = legalDocs[slug]
  if (!page && !doc) return { title: "Not found" }
  return buildMetadata({
    seo:
      page?.seo ??
      (doc ? { metaTitle: `${doc.title} | GoRidez`, metaDescription: doc.metaDescription } : undefined),
    title: page?.title ?? doc?.title,
    path: `/legal/${slug}`,
  })
}

const HERO_ART: Record<string, { image: string; alt: string }> = {
  "cookie-policy": {
    image: "/media/legal/cookie-hero-photo.png",
    alt: "Business professional browsing the GoRidez website on a laptop",
  },
}
const DEFAULT_ART = {
  image: "/media/legal/privacy-hero-photo.png",
  alt: "Executive reviewing a secure document in the back of a GoRidez car",
}

function formatDate(value?: string) {
  const date = value ? new Date(value) : null
  if (!date || Number.isNaN(date.getTime())) return undefined
  return date.toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })
}

/** "Cookie Policy" → "Cookie" + accented "Policy". */
function AccentLastWord({ title }: { title: string }) {
  const cut = title.lastIndexOf(" ")
  if (cut < 0) return <>{title}</>
  return (
    <>
      {title.slice(0, cut)} <span className="text-accent">{title.slice(cut + 1)}</span>
    </>
  )
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  // CMS content is authoritative when present; the static library is a fallback
  // so the pages keep working even before the content seed has run.
  const page = await getCmsPageBySlug(`legal-${slug}`)
  const doc = legalDocs[slug]
  if (!page && !doc) notFound()

  const isCookie = slug === "cookie-policy"
  const baseArt = HERO_ART[slug] ?? DEFAULT_ART
  const art = {
    image: page?.heroImage || baseArt.image,
    alt: page?.heroImageAlt || baseArt.alt,
  }
  const title = page?.heroTitle || page?.title || doc?.title || ""
  const description = page?.heroSubtitle || doc?.intro
  const cmsSections = page?.sections ?? []
  const legalBlock = cmsSections.find((s) => s.type === "legal")
  const otherBlocks = cmsSections.filter((s) => s !== legalBlock)

  // The admin-authored "Last updated: <date>" line wins; record edit time is only a fallback.
  const authoredDate = legalBlock?.body?.replace(/^\s*last\s+updated\s*:?\s*/i, "").trim()
  const lastUpdated =
    formatDate(authoredDate) ??
    formatDate((page as { updatedAt?: string } | null)?.updatedAt) ??
    formatDate(doc?.lastUpdated) ??
    ""

  const hero = (
    <RoundedPhotoHero
      eyebrow={page?.heroEyebrow || "Legal"}
      title={<AccentLastWord title={title} />}
      description={description}
      breadcrumbs={[{ name: "Home", href: "/" }, { name: "Legal" }]}
      image={art.image}
      imageAlt={art.alt}
    />
  )

  const cmsLegalSections: LegalSection[] = ((legalBlock?.items ?? []) as Array<{ heading?: string; body?: unknown }>)
    .filter((item) => item?.heading)
    .map((item) => ({
      heading: String(item.heading),
      body: (Array.isArray(item.body) ? item.body : [item.body]).filter(Boolean).map(String),
    }))
  const legalSections = cmsLegalSections.length ? cmsLegalSections : (doc?.sections ?? [])

  if (!legalSections.length) {
    return (
      <>
        {hero}
        <CmsSectionRenderer sections={cmsSections} />
      </>
    )
  }

  return (
    <>
      {hero}
      <section className="py-12 md:py-16">
        <Container>
          {isCookie ? (
            <CookieDocument sections={legalSections} lastUpdated={lastUpdated} />
          ) : (
            <>
              <PolicyDocument sections={legalSections} lastUpdated={lastUpdated} />
              {slug === "privacy-policy" ? (
                <PrivacyBanner
                  title={legalBlock?.heading || undefined}
                  text={legalBlock?.subheading || undefined}
                />
              ) : null}
            </>
          )}
        </Container>
      </section>
      {otherBlocks.length ? <CmsSectionRenderer sections={otherBlocks} /> : null}
    </>
  )
}
