import type { Metadata } from "next"
import { Megaphone } from "lucide-react"
import { getBlogPosts, getSiteSettings } from "@/lib/data/queries"
import { getPageContent } from "@/lib/data/page-content"
import { buildMetadata } from "@/lib/seo"
import { Container } from "@/components/site/primitives"
import { BlogExplorer } from "@/components/site/blog-explorer"
import { IllustrationHero } from "@/components/site/illustration-hero"
import { IconCtaBanner } from "@/components/site/icon-cta-banner"
import { AccentText, stripAccent } from "@/components/site/accent-text"

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent("blog")
  return buildMetadata({
    seo: page.seo,
    title: "Insights & News",
    description: stripAccent(page.subtitle),
    path: "/blog",
    image: page.image,
  })
}

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ tag?: string }> }) {
  const [posts, settings, page, { tag }] = await Promise.all([
    getBlogPosts(),
    getSiteSettings(),
    getPageContent("blog"),
    searchParams,
  ])
  const { copy } = page

  return (
    <>
      <IllustrationHero
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Blog" }]}
        eyebrow={page.eyebrow}
        title={<AccentText text={page.title} />}
        description={page.subtitle}
        image={page.image}
        imageAlt={page.imageAlt}
      >
        <svg viewBox="0 0 90 10" className="mt-6 h-3 w-24 text-accent" aria-hidden="true">
          <path d="M1 8 C 30 1, 60 1, 89 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </IllustrationHero>

      <section className="py-12 sm:py-16">
        <Container>
          {posts.length === 0 ? (
            <p className="text-center text-muted-foreground">{copy.emptyText}</p>
          ) : (
            <BlogExplorer key={tag ?? "all"} posts={posts} initialTag={tag ?? null} />
          )}
        </Container>
      </section>

      <IconCtaBanner
        icon={Megaphone}
        title={copy.ctaTitle}
        description={copy.ctaText}
        primary={settings.ctaPrimary}
        secondary={settings.ctaSecondary}
      />
    </>
  )
}
