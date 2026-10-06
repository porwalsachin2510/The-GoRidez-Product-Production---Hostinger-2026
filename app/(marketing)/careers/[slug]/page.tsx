import type { Metadata } from "next"
import { notFound } from "next/navigation"
import {
  MapPin,
  Briefcase,
  Clock,
  Check,
  Wallet,
  TrendingUp,
  Users,
  CalendarClock,
  Layers,
  Gift,
} from "lucide-react"
import { getCareers, getCareerBySlug, getSiteSettings } from "@/lib/data/queries"
import { buildMetadata } from "@/lib/seo"
import { Container } from "@/components/site/primitives"
import { PhotoHero } from "@/components/site/careers/photo-hero"
import { IconCtaBanner } from "@/components/site/icon-cta-banner"
import { Reveal } from "@/components/site/reveal"
import { ApplicationForm } from "@/components/site/forms"
import {
  employmentTypeLabel,
  workModeLabel,
  experienceLevelLabel,
  experienceLabel,
  salaryLabel,
  deadlineInfo,
  postedLabel,
} from "@/lib/careers"

export async function generateStaticParams() {
  const careers = await getCareers()
  return careers.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const role = await getCareerBySlug(slug)
  if (!role) return buildMetadata({ title: "Role Not Found", path: `/careers/${slug}` })
  return buildMetadata({
    title: role.seo?.metaTitle || `${role.title} | Careers at GoRidez`,
    description: role.seo?.metaDescription || role.excerpt || `Apply for the ${role.title} role at GoRidez.`,
    path: `/careers/${slug}`,
  })
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Wallet
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-4 shadow-sm">
      <Icon className="h-7 w-7 shrink-0 text-accent" strokeWidth={1.5} aria-hidden="true" />
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="mt-0.5 truncate text-sm font-semibold text-foreground">{value}</p>
      </div>
    </div>
  )
}

export default async function CareerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [role, settings] = await Promise.all([getCareerBySlug(slug), getSiteSettings()])
  if (!role) notFound()

  const deadline = deadlineInfo(role.closingDate)
  const exp = experienceLabel(role)
  const posted = postedLabel(role.createdAt)

  const meta = [
    role.department ? { icon: Briefcase, label: role.department } : null,
    role.location ? { icon: MapPin, label: role.location } : null,
    role.workMode ? { icon: Briefcase, label: workModeLabel(role.workMode) } : null,
    role.employmentType ? { icon: Clock, label: employmentTypeLabel(role.employmentType) } : null,
  ].filter(Boolean) as { icon: typeof Briefcase; label: string }[]

  const stats = [
    { icon: Wallet, label: "Salary", value: salaryLabel(role) },
    exp ? { icon: TrendingUp, label: "Experience", value: exp } : null,
    role.experienceLevel ? { icon: Layers, label: "Level", value: experienceLevelLabel(role.experienceLevel) } : null,
    role.openings ? { icon: Users, label: "Openings", value: String(role.openings) } : null,
  ].filter(Boolean) as { icon: typeof Wallet; label: string; value: string }[]

  // JobPosting structured data for search engines / job aggregators.
  const jobLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: role.title,
    description: role.excerpt || role.description || role.title,
    datePosted: role.createdAt,
    ...(role.closingDate ? { validThrough: role.closingDate } : {}),
    employmentType: (role.employmentType || "full-time").toUpperCase().replace("-", "_"),
    hiringOrganization: {
      "@type": "Organization",
      name: settings.companyName || "GoRidez",
    },
    ...(role.location
      ? {
          jobLocation: {
            "@type": "Place",
            address: { "@type": "PostalAddress", addressLocality: role.location },
          },
        }
      : {}),
    ...(role.salaryDisclosed && (role.salaryMin || role.salaryMax)
      ? {
          baseSalary: {
            "@type": "MonetaryAmount",
            currency: role.salaryCurrency || "AED",
            value: {
              "@type": "QuantitativeValue",
              minValue: role.salaryMin || undefined,
              maxValue: role.salaryMax || undefined,
              unitText: role.salaryPeriod === "yearly" ? "YEAR" : "MONTH",
            },
          },
        }
      : {}),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobLd) }}
      />
      <PhotoHero
        eyebrow="Careers"
        title={role.title}
        description={role.excerpt}
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Careers", href: "/careers" },
          { name: role.title },
        ]}
        image="/media/careers/career-role-van.png"
        imageAlt="White GoRidez passenger van parked in Kuwait City"
        arc
      >
        {meta.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/90">
            {meta.map((m, i) => (
              <span key={`${m.label}-${i}`} className="inline-flex items-center gap-1.5">
                <m.icon className="h-4 w-4 text-accent" aria-hidden="true" />
                {m.label}
              </span>
            ))}
          </div>
        )}
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/70">
          {posted ? <span>{posted}</span> : null}
          {deadline.hasDeadline ? (
            <span className={`inline-flex items-center gap-1 font-medium ${deadline.closed ? "text-destructive" : "text-accent"}`}>
              <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" />
              {deadline.label}
            </span>
          ) : null}
        </div>
      </PhotoHero>

      <section className="pt-12 sm:pt-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-14">
            {/* Details */}
            <div className="space-y-10">
              {/* Snapshot stats */}
              {stats.length > 0 && (
                <div className="grid gap-3 sm:grid-cols-2">
                  {stats.map((s) => (
                    <StatCard key={s.label} icon={s.icon} label={s.label} value={s.value} />
                  ))}
                </div>
              )}

              {role.description && (
                <div className="space-y-4 leading-relaxed text-muted-foreground">
                  {role.description.split("\n").filter(Boolean).map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              )}

              {role.responsibilities && role.responsibilities.length > 0 && (
                <div>
                  <h2 className="font-display text-xl font-semibold text-foreground">What you&apos;ll do</h2>
                  <ul className="mt-5 space-y-3">
                    {role.responsibilities.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {role.requirements && role.requirements.length > 0 && (
                <div>
                  <h2 className="font-display text-xl font-semibold text-foreground">What we&apos;re looking for</h2>
                  <ul className="mt-5 space-y-3">
                    {role.requirements.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {role.skills && role.skills.length > 0 && (
                <div>
                  <h2 className="font-display text-xl font-semibold text-foreground">Skills</h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {role.skills.map((s) => (
                      <span
                        key={s}
                        className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-sm text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {role.benefits && role.benefits.length > 0 && (
                <div>
                  <h2 className="font-display text-xl font-semibold text-foreground">Benefits &amp; perks</h2>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {role.benefits.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                        <Gift className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Application form */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <div className="rounded-2xl border border-accent/30 bg-gradient-to-b from-accent/[0.06] to-card p-6 shadow-sm sm:p-8">
                  {deadline.closed ? (
                    <div className="text-center">
                      <CalendarClock className="mx-auto h-10 w-10 text-muted-foreground" aria-hidden="true" />
                      <h2 className="mt-3 font-display text-lg font-semibold text-foreground">Applications closed</h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        This role is no longer accepting applications. Explore our{" "}
                        <a href="/careers" className="font-semibold text-accent hover:underline">
                          other open roles
                        </a>
                        .
                      </p>
                    </div>
                  ) : (
                    <>
                      <h2 className="font-display text-xl font-bold text-foreground">Apply for this role</h2>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Tell us about yourself and we&apos;ll be in touch if there&apos;s a match.
                      </p>
                      <div className="mt-6">
                        <ApplicationForm
                          position={role.title}
                          careerSlug={role.slug}
                          screeningQuestions={role.screeningQuestions ?? []}
                        />
                      </div>
                    </>
                  )}
                </div>
              </Reveal>
            </aside>
          </div>
        </Container>
      </section>

      <IconCtaBanner
        icon={Briefcase}
        title="Built for people who keep operations moving."
        description="Be part of a team that values safety, service and precision."
        primary={{ label: "View all open roles", href: "/careers#open-roles" }}
        secondary={null}
      />
    </>
  )
}
