import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BarChart3, Route, ShieldCheck } from 'lucide-react'
import { Container } from '@/components/site/primitives'
import { JsonLd } from '@/components/site/page-shell'
import { PageSplitHero } from '@/components/site/page-split-hero'
import {
  ChallengesSolutions,
  CompactCta,
  IndustryOverview,
  OtherIndustries,
} from '@/components/site/industries/industry-sections'
import { ServicesCtaBanner } from '@/components/site/services/services-cta-banner'
import { getIndustries, getIndustryBySlug, getSiteSettings } from '@/lib/data/queries'
import { buildMetadata, breadcrumbJsonLd, serviceJsonLd } from '@/lib/seo'

export async function generateStaticParams() {
  const industries = await getIndustries()
  return industries.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const industry = await getIndustryBySlug(slug)
  if (!industry) return buildMetadata({ title: 'Industry not found', path: `/industries/${slug}` })
  return buildMetadata({
    seo: industry.seo,
    title: industry.name,
    description: industry.excerpt,
    path: `/industries/${industry.slug}`,
    image: industry.heroImage,
  })
}

const HIGHLIGHTS = [
  { icon: ShieldCheck, title: 'Fully Compliant', text: 'RTA-compliant fleet and vetted drivers' },
  { icon: Route, title: 'Route Coverage', text: 'Optimised routes around your sites' },
  { icon: BarChart3, title: 'Transparent', text: 'Enterprise reporting you can trust' },
]

function splitTitle(title: string) {
  const match = title.match(/^(.*?\bfor)\s+(.+)$/i)
  return match ? { lead: match[1], highlight: match[2] } : { lead: '', highlight: title }
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [industry, allIndustries, settings] = await Promise.all([
    getIndustryBySlug(slug),
    getIndustries(),
    getSiteSettings(),
  ])
  if (!industry) notFound()

  const others = allIndustries.filter((i) => i._id !== industry._id).slice(0, 3)
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Industries', href: '/industries' },
    { name: industry.name },
  ]
  const { lead, highlight } = splitTitle(industry.heroTitle || industry.name)

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(
            breadcrumbs.map((b) => ({ name: b.name, path: b.href || `/industries/${industry.slug}` })),
          ),
          serviceJsonLd({
            name: `${industry.name} Transportation`,
            description: industry.excerpt,
            path: `/industries/${industry.slug}`,
          }),
        ]}
      />
      <PageSplitHero
        breadcrumbs={breadcrumbs}
        shape="curved"
        title={
          <>
            {lead}
            {lead && ' '}
            <span className="text-accent">{highlight}</span>
          </>
        }
        description={industry.excerpt}
        image={industry.heroImage}
        imageAlt={industry.name}
      >
        <ul className="mt-10 grid gap-6 sm:grid-cols-3 sm:gap-0">
          {HIGHLIGHTS.map(({ icon: HIcon, title, text }, i) => (
            <li key={title} className={i > 0 ? 'sm:border-l sm:border-white/15 sm:pl-5' : 'sm:pr-5'}>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-accent/60 text-accent">
                <HIcon className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="mt-3 text-sm font-semibold text-white">{title}</p>
              <p className="mt-1 text-xs leading-relaxed text-white/70">{text}</p>
            </li>
          ))}
        </ul>
      </PageSplitHero>

      <div className="bg-surface pb-4 pt-16 sm:pt-20">
        <Container className="space-y-12 sm:space-y-14">
          {industry.body && <IndustryOverview name={industry.name} body={industry.body} />}
          <ChallengesSolutions challenges={industry.challenges ?? []} solutions={industry.solutions ?? []} />
        </Container>
      </div>

      <div className="bg-surface">
        <ServicesCtaBanner
          primary={settings.ctaPrimary}
          eyebrow="Get started"
          title="Design a programme for your team"
          description={`Tell us about your shifts, sites and headcount — we'll tailor a safe, reliable transport programme for ${industry.name}.`}
          showSecondary={false}
        />
      </div>

      <div className="bg-surface pb-16 sm:pb-20">
        <Container className="space-y-12">
          <OtherIndustries industries={others} />
          <CompactCta primary={settings.ctaPrimary} secondary={settings.ctaSecondary} />
        </Container>
      </div>
    </>
  )
}
