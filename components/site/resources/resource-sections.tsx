import Image from "next/image"
import Link from "next/link"
import { RoundedPhotoHero } from "@/components/site/rounded-photo-hero"
import {
  ArrowUpRight,
  BookOpen,
  Building2,
  BusFront,
  CalendarCheck,
  ChevronRight,
  ClipboardList,
  Download,
  FileBarChart,
  FileText,
  LockKeyhole,
  UserRound,
  Users,
  UsersRound,
  type LucideIcon,
} from "lucide-react"
import type { ResourceData } from "@/lib/data/queries"
import { Container } from "@/components/site/primitives"
import { ResourceDownloadForm } from "@/components/site/resource-download-form"

const typeMeta: Record<string, { label: string; icon: LucideIcon }> = {
  guide: { label: "Guide", icon: FileText },
  report: { label: "Report", icon: FileBarChart },
  playbook: { label: "Playbook", icon: BookOpen },
  checklist: { label: "Checklist", icon: ClipboardList },
  "case-study": { label: "Case study", icon: FileText },
}

function metaFor(type?: string) {
  return typeMeta[type ?? "guide"] ?? { label: "Resource", icon: FileText }
}

const FALLBACK_COVER = "/media/resources/company-overview-brochure.png"

/* --------------------------------- Hero ---------------------------------- */

export function ResourcesHero({
  title,
  description,
  image,
}: {
  title: string
  description: string
  image: string
}) {
  return (
    <RoundedPhotoHero
      breadcrumbs={[{ name: "Home", href: "/" }, { name: "Resources" }]}
      eyebrow="Mobility resources"
      title={title}
      description={description}
      image={image}
      imageAlt="GoRidez mobility resources"
    />
  )
}

/* ----------------------------- Library header ----------------------------- */

export function LibraryHeading() {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-6 right-0 hidden h-24 w-80 bg-[radial-gradient(circle,color-mix(in_oklch,var(--primary)_18%,transparent)_1px,transparent_1.5px)] [background-size:12px_12px] [mask-image:linear-gradient(to_left,black,transparent)] md:block"
      />
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute right-10 top-4 hidden h-20 w-48 text-accent md:block"
        viewBox="0 0 200 80"
        fill="none"
      >
        <path
          d="M4 18C40 34 70 40 92 52c18 10 10 30-6 22-14-7 4-30 30-36 26-6 52-8 76-18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 5"
          strokeLinecap="round"
        />
        <path d="M188 14l8 6-10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        <span aria-hidden="true" className="h-px w-6 bg-accent" />
        The resource library
      </p>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[oklch(0.25_0.08_262)] text-balance sm:text-4xl">
        Useful thinking, ready when you are
      </h2>
      <p className="mt-3 text-base text-muted-foreground">Download the resources that match your next mobility decision.</p>
    </div>
  )
}

/* --------------------------- Download panel (right) ----------------------- */

function DownloadPanel({ resource }: { resource: ResourceData }) {
  return (
    <div className="flex flex-col justify-center bg-[oklch(0.22_0.08_262)] p-6 text-white sm:p-8">
      <h3 className="font-display text-lg font-semibold">
        {resource.gated ? "Unlock this resource" : "Download this resource"}
      </h3>
      <div className="mt-5">
        {resource.gated ? (
          <ResourceDownloadForm resourceId={resource._id} />
        ) : (
          <a
            href={resource.downloadUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition hover:brightness-110"
          >
            Download now
            <Download className="h-4 w-4" aria-hidden="true" />
          </a>
        )}
      </div>
    </div>
  )
}

function TagChips({ tags }: { tags?: string[] }) {
  if (!tags?.length) return null
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {tags.slice(0, 3).map((tag) => (
        <span key={tag} className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary first-letter:uppercase">
          {tag}
        </span>
      ))}
    </div>
  )
}

/* ---------------------------- Featured resource --------------------------- */

export function FeaturedResource({ resource }: { resource: ResourceData }) {
  const { label, icon: Icon } = metaFor(resource.type)
  return (
    <article className="grid overflow-hidden rounded-2xl border border-border bg-card shadow-sm lg:grid-cols-[1.75fr_1fr]">
      <div className="relative grid gap-6 p-6 sm:p-8 md:grid-cols-[1.2fr_1fr] md:items-center">
        <div>
          <div className="flex items-start justify-between">
            {resource.featured ? (
              <span className="rounded-md bg-accent px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-accent-foreground">
                Featured
              </span>
            ) : (
              <span />
            )}
          </div>
          <div className="mt-7 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[oklch(0.28_0.12_262)] text-white">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
          </div>
          <h3 className="mt-5 font-display text-xl font-bold leading-snug text-[oklch(0.25_0.08_262)] text-balance sm:text-2xl">
            {resource.title}
          </h3>
          {resource.excerpt && (
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground text-pretty">{resource.excerpt}</p>
          )}
          <TagChips tags={resource.tags} />
        </div>
        <div className="relative mx-auto aspect-[3/4] w-full max-w-56">
          {resource.coverImage ? (
            <>
              <span aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rotate-3 rounded-md bg-[oklch(0.22_0.08_262)]/70 shadow-lg" />
              <span aria-hidden="true" className="absolute inset-0 translate-x-1.5 translate-y-1.5 rotate-[1.5deg] rounded-md bg-[oklch(0.22_0.08_262)]/85 shadow-lg" />
              <div className="absolute inset-0 overflow-hidden rounded-md shadow-2xl ring-1 ring-black/10">
                <Image src={resource.coverImage || "/placeholder.svg"} alt={`${resource.title} cover`} fill sizes="224px" className="object-cover" />
              </div>
            </>
          ) : (
            <Image src={FALLBACK_COVER || "/placeholder.svg"} alt={`${resource.title} cover`} fill sizes="224px" className="object-contain drop-shadow-xl" />
          )}
        </div>
        {resource.gated ? (
          <LockKeyhole className="absolute right-6 top-6 h-5 w-5 text-muted-foreground" aria-label="Email required" />
        ) : null}
      </div>
      <DownloadPanel resource={resource} />
    </article>
  )
}

/* ------------------------------ Other resources --------------------------- */

export function ResourceCard({ resource }: { resource: ResourceData }) {
  const { label, icon: Icon } = metaFor(resource.type)
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[oklch(0.28_0.12_262)] text-white">
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
          </div>
          {resource.gated ? <LockKeyhole className="h-4 w-4 text-muted-foreground" aria-label="Email required" /> : null}
        </div>
        <h3 className="mt-5 font-display text-lg font-semibold leading-snug text-[oklch(0.25_0.08_262)]">{resource.title}</h3>
        {resource.excerpt && <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{resource.excerpt}</p>}
        <TagChips tags={resource.tags} />
        {!resource.gated && (
          <a
            href={resource.downloadUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
          >
            Download resource <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        )}
      </div>
      {resource.gated && <DownloadPanel resource={resource} />}
    </article>
  )
}

/* ------------------------------- Topic tiles ------------------------------ */

function topicIcon(topic: string): LucideIcon {
  const t = topic.toLowerCase()
  if (t.includes("conference") || t.includes("event")) return CalendarCheck
  if (t.includes("mice")) return Users
  if (t.includes("coach")) return UserRound
  if (t.includes("minibus") || t.includes("bus") || t.includes("van")) return BusFront
  if (t.includes("staff") || t.includes("jafza") || t.includes("employee transport")) return UsersRound
  if (t.includes("cost") || t.includes("commute") || t.includes("office")) return Building2
  return FileText
}

export function TopicTiles({ topics }: { topics: string[] }) {
  if (!topics.length) return null
  return (
    <nav aria-label="Browse insights by topic">
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {topics.map((topic) => {
          const Icon = topicIcon(topic)
          return (
            <li key={topic}>
              <Link
                href={`/blog?tag=${encodeURIComponent(topic)}`}
                className="group flex h-full flex-col items-center gap-4 rounded-2xl border border-border bg-card px-4 py-6 text-center shadow-sm transition hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-md"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-accent/5 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="text-[11px] font-semibold uppercase leading-snug tracking-wide text-[oklch(0.25_0.08_262)]">
                  {topic}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
