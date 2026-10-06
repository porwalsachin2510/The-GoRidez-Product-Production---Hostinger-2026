import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ArrowRight, Calendar, CalendarClock, ChevronRight, Clock } from "lucide-react"
import { getBlogPostBySlug, getBlogPosts } from "@/lib/data/queries"
import type { BlogData } from "@/lib/data/queries"
import { buildMetadata, articleJsonLd } from "@/lib/seo"
import { Container } from "@/components/site/primitives"
import { JsonLd } from "@/components/site/page-shell"
import { IconCtaBanner } from "@/components/site/icon-cta-banner"
import { ReadingProgress } from "@/components/site/blog/reading-progress"
import { ArticleMarkdown } from "@/components/site/blog/article-markdown"
import { EngagementProvider, EngagementBar } from "@/components/site/blog/article-engagement"
import { ArticleComments } from "@/components/site/blog/article-comments"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) return { title: "Article not found" }
  return buildMetadata({
    seo: post.seo,
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.coverImage ?? undefined,
  })
}

function formatDate(iso?: string) {
  if (!iso) return ""
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
}

function authorInitials(name: string) {
  return (
    name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase() ?? "")
      .join("") || "V"
  )
}

function Avatar({ name, avatar, size, invert = false }: { name: string; avatar?: string | null; size: number; invert?: boolean }) {
  return (
    <span
      className={`relative shrink-0 overflow-hidden rounded-full ring-2 ${
        invert ? "bg-white/15 ring-white/20" : "bg-primary/10 ring-accent/20"
      }`}
      style={{ width: size, height: size }}
    >
      {avatar ? (
        <Image src={avatar} alt={`${name} avatar`} fill className="object-cover" sizes={`${size}px`} />
      ) : (
        <span
          aria-hidden="true"
          className={`flex h-full w-full items-center justify-center text-sm font-semibold ${invert ? "text-white" : "text-primary"}`}
        >
          {authorInitials(name)}
        </span>
      )}
    </span>
  )
}

function RelatedCard({ post }: { post: BlogData }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-primary/5">
        {post.coverImage ? (
          <Image
            src={post.coverImage || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 320px"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary to-primary/70">
            <span className="font-display text-lg font-bold text-primary-foreground/90">GoRidez</span>
          </div>
        )}
      </div>
      <h3 className="mt-4 font-display text-[15px] font-semibold leading-snug text-[oklch(0.25_0.08_262)] transition-colors group-hover:text-accent">
        {post.title}
      </h3>
      {post.excerpt && <p className="mt-2 line-clamp-4 text-xs leading-relaxed text-muted-foreground">{post.excerpt}</p>}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-[11px] text-muted-foreground">
          {formatDate(post.publishedAt)}
          {post.readingTime ? <> &middot; {post.readingTime} min read</> : null}
        </span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-accent/40 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  )
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)
  if (!post) notFound()

  const authorName = post.authorName?.trim() || "GoRidez Editorial Team"
  const authorRole = post.authorRole?.trim() || "Corporate Mobility Insights"

  // Related posts ranked by shared-tag overlap, then recency as a tiebreaker.
  const currentTags = new Set((post.tags ?? []).map((t) => t.toLowerCase()))
  const related = (await getBlogPosts())
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ post: p, shared: (p.tags ?? []).filter((t) => currentTags.has(t.toLowerCase())).length }))
    .sort((a, b) => {
      if (b.shared !== a.shared) return b.shared - a.shared
      return new Date(b.post.publishedAt ?? 0).getTime() - new Date(a.post.publishedAt ?? 0).getTime()
    })
    .slice(0, 3)
    .map((r) => r.post)

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: post.title },
  ]

  return (
    <>
      <ReadingProgress />
      <JsonLd data={articleJsonLd(post)} />
      <article>
        {/* Dark header — the fixed transparent nav needs a dark backdrop. */}
        <header
          className={`relative isolate overflow-hidden bg-[oklch(0.2_0.07_262)] text-white ${
            post.coverImage ? "pb-56 sm:pb-72 lg:pb-80" : "pb-14"
          } pt-28 lg:pt-36`}
        >
          <div
            aria-hidden="true"
            className="absolute right-0 top-0 -z-10 h-72 w-[28rem] bg-[radial-gradient(circle,rgba(255,255,255,0.14)_1px,transparent_1.5px)] [background-size:14px_14px] [mask-image:linear-gradient(to_bottom_left,black,transparent)]"
          />
          <svg
            aria-hidden="true"
            className="absolute -right-20 top-24 -z-10 h-72 w-[40rem] text-accent/30"
            viewBox="0 0 640 280"
            fill="none"
          >
            <path d="M0 260C180 240 320 160 640 20" stroke="currentColor" strokeWidth="1.5" />
            <path d="M40 280C220 250 380 180 640 70" stroke="currentColor" strokeWidth="1" opacity="0.6" />
          </svg>
          <Container>
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/60">
                {breadcrumbs.map((b, i) => (
                  <li key={`${b.name}-${i}`} className="flex items-center gap-1.5">
                    {b.href ? (
                      <Link href={b.href} className="transition-colors hover:text-accent">
                        {b.name}
                      </Link>
                    ) : (
                      <span aria-current="page" className="line-clamp-1 text-white/90">
                        {b.name}
                      </span>
                    )}
                    {i < breadcrumbs.length - 1 && <ChevronRight className="h-3 w-3" aria-hidden="true" />}
                  </li>
                ))}
              </ol>
            </nav>
            <div className="mt-6 max-w-2xl">
              {post.tags && post.tags.length > 0 ? (
                <div className="mb-5 flex flex-wrap gap-2">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog?tag=${encodeURIComponent(tag)}`}
                      className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] font-medium capitalize text-white/85 transition-colors hover:border-accent hover:text-accent"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              ) : null}
              <h1 className="font-display text-3xl font-bold leading-[1.15] tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]">
                {post.title}
              </h1>
              <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">
                <div className="flex items-center gap-3">
                  <Avatar name={authorName} avatar={post.authorAvatar} size={40} invert />
                  <div className="leading-tight">
                    <p className="text-sm font-semibold text-white">{authorName}</p>
                    <p className="text-xs text-white/60">{authorRole}</p>
                  </div>
                </div>
                {post.publishedAt && (
                  <span className="inline-flex items-center gap-2 text-sm text-white/85">
                    <Calendar className="h-4 w-4 text-accent" aria-hidden="true" />
                    <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                  </span>
                )}
                {post.readingTime ? (
                  <span className="inline-flex items-center gap-2 text-sm text-white/85">
                    <Clock className="h-4 w-4 text-accent" aria-hidden="true" />
                    {post.readingTime} min read
                  </span>
                ) : null}
              </div>
            </div>
          </Container>
        </header>

        {post.coverImage && (
          <Container className="relative z-10 -mt-48 sm:-mt-64 lg:-mt-72">
            <div className="relative aspect-[16/8] w-full overflow-hidden rounded-2xl border-4 border-white bg-white shadow-2xl shadow-primary/20">
              <Image
                src={post.coverImage || "/placeholder.svg"}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1200px"
              />
            </div>
          </Container>
        )}

        <Container className="pb-12 pt-6">
          <EngagementProvider
            slug={post.slug}
            title={post.title}
            initialClaps={post.claps ?? 0}
            initialViews={post.views ?? 0}
          >
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-12">
              <div className="min-w-0">
                <EngagementBar />

                <div id="article-body" className="mt-8">
                  <ArticleMarkdown content={post.body?.trim() || post.excerpt || "_This article is coming soon._"} />
                </div>

                {post.tags && post.tags.length > 0 && (
                  <div className="mt-10 flex flex-wrap items-center gap-2">
                    {post.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/blog?tag=${encodeURIComponent(tag)}`}
                        className="rounded-full border border-border bg-muted/50 px-3.5 py-1.5 text-[11px] font-medium capitalize text-foreground transition-colors hover:border-accent hover:text-accent"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                )}

                <div className="mt-8">
                  <EngagementBar />
                </div>

                <div className="mt-8 flex items-center gap-4 rounded-2xl border border-border bg-muted/40 p-5">
                  <Avatar name={authorName} avatar={post.authorAvatar} size={56} />
                  <div className="leading-tight">
                    <p className="text-xs font-semibold text-accent">Written by</p>
                    <p className="mt-1 font-display text-base font-semibold text-foreground">{authorName}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{authorRole}</p>
                  </div>
                </div>

                <ArticleComments slug={post.slug} />

                <div className="mt-8">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    Back to all insights
                  </Link>
                </div>
              </div>

              {related.length > 0 && (
                <aside aria-labelledby="more-insights" className="lg:pt-0">
                  <div className="rounded-2xl border border-border bg-card p-5 shadow-sm lg:sticky lg:top-28">
                    <h2 id="more-insights" className="font-display text-base font-bold text-[oklch(0.25_0.08_262)]">
                      More insights
                    </h2>
                    <span aria-hidden="true" className="mt-2 block h-0.5 w-8 rounded-full bg-accent" />
                    <ul className="mt-6 flex flex-col gap-8">
                      {related.map((rp) => (
                        <li key={rp._id}>
                          <RelatedCard post={rp} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </aside>
              )}
            </div>
          </EngagementProvider>
        </Container>
      </article>

      <IconCtaBanner
        icon={CalendarClock}
        title="Ready to move your workforce with confidence?"
        description="Tell us about your routes and headcount. We'll design a transport programme that fits your operation."
      />
    </>
  )
}
