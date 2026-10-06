import type { Metadata } from "next"
import { Download } from "lucide-react"
import { getResources, getCmsPageBySlug, getBlogPosts } from "@/lib/data/queries"
import { CmsPageContent } from "@/components/site/cms-section-renderer"
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo"
import { Container } from "@/components/site/primitives"
import { JsonLd } from "@/components/site/page-shell"
import { IconCtaBanner } from "@/components/site/icon-cta-banner"
import {
  FeaturedResource,
  LibraryHeading,
  ResourceCard,
  ResourcesHero,
  TopicTiles,
} from "@/components/site/resources/resource-sections"

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPageBySlug("resources")
  return buildMetadata({
    seo: page?.seo,
    title: page?.title || "Mobility Resources | GoRidez",
    description: page?.heroSubtitle || "Practical guides, reports and playbooks for better corporate transportation across the UAE.",
    path: "/resources",
    image: page?.heroImage,
  })
}

/** Topic tiles come from real blog tags, ranked by how many articles use them. */
function topTopics(tagLists: (string[] | undefined)[], limit = 6) {
  const counts = new Map<string, number>()
  for (const tags of tagLists) for (const t of tags ?? []) counts.set(t, (counts.get(t) ?? 0) + 1)
  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([t]) => t)
}

export default async function ResourcesPage() {
  const [resources, cmsPage, posts] = await Promise.all([
    getResources(),
    getCmsPageBySlug("resources"),
    getBlogPosts(),
  ])

  const [featured, ...rest] = resources
  const topics = topTopics(posts.map((p) => p.tags))

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Resources", path: "/resources" }])} />
      <ResourcesHero
        title={cmsPage?.heroTitle || "Ideas and tools for moving people better"}
        description={
          cmsPage?.heroSubtitle ||
          "Explore practical guides, benchmark reports and playbooks to help your organisation build safer, more efficient employee transportation."
        }
        image={cmsPage?.heroImage || "/media/sections/fleet-partners.png"}
      />

      {cmsPage?.sections?.length ? (
        <section className="py-16 sm:py-20">
          <Container>
            <CmsPageContent page={cmsPage} />
          </Container>
        </section>
      ) : null}

      <section className="pb-4 pt-12 sm:pt-16">
        <Container className="flex flex-col gap-8">
          <LibraryHeading />
          {featured ? (
            <>
              <FeaturedResource resource={featured} />
              {rest.length > 0 && (
                <div className="grid gap-6 md:grid-cols-2">
                  {rest.map((r) => (
                    <ResourceCard key={r._id} resource={r} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
              New resources are on the way. Check back soon.
            </div>
          )}
          <TopicTiles topics={topics} />
        </Container>
      </section>

      <IconCtaBanner
        icon={Download}
        title="Ready to move your workforce with confidence?"
        description="Tell us about your routes and headcount. We'll design a transport programme that fits your operation."
      />
    </>
  )
}
