import type { Metadata } from "next"
import { getFreeZones, getSiteSettings } from "@/lib/data/queries"
import { getPageContent } from "@/lib/data/page-content"
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo"
import { JsonLd } from "@/components/site/page-shell"
import { stripAccent } from "@/components/site/accent-text"
import {
  FreeZoneApproach,
  FreeZoneHero,
  FreeZoneServices,
  FreeZoneWhy,
  LeafCtaBanner,
} from "@/components/site/free-zones/free-zone-landing"

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent("free-zones")
  return buildMetadata({
    seo: page.seo,
    title: "Free Zone Shuttle Services",
    description: stripAccent(page.subtitle),
    path: "/free-zones",
    image: page.image,
  })
}

export default async function FreeZonesPage() {
  const [zones, settings, page] = await Promise.all([
    getFreeZones(),
    getSiteSettings(),
    getPageContent("free-zones"),
  ])
  const { copy } = page

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Free Zones", path: "/free-zones" },
        ])}
      />
      <FreeZoneHero
        eyebrow={page.eyebrow}
        title={page.title}
        subtitle={page.subtitle}
        image={page.image}
        imageAlt={page.imageAlt}
        copy={copy}
      />
      <FreeZoneWhy copy={copy} />
      <FreeZoneServices copy={copy} zones={zones} />
      <FreeZoneApproach copy={copy} />
      <LeafCtaBanner
        eyebrow={copy.ctaEyebrow}
        title={copy.ctaTitle}
        description={copy.ctaText}
        primary={settings.ctaPrimary}
        secondary={settings.ctaSecondary}
      />
    </>
  )
}
