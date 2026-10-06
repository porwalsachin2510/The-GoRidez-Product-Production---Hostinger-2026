import type { Metadata } from 'next'
import { getSiteSettings, getTeamMembers, getClients, getTestimonials, getCmsPageBySlug } from '@/lib/data/queries'
import { CmsSectionRenderer, splitSections } from '@/components/site/cms-section-renderer'
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo'
import { JsonLd } from '@/components/site/page-shell'
import { PageSplitHero } from '@/components/site/page-split-hero'
import { ServicesCtaBanner } from '@/components/site/services/services-cta-banner'
import {
  AboutClients,
  AboutLeadership,
  AboutMission,
  AboutStatement,
  AboutStats,
  AboutTestimonial,
  AboutValues,
  missionParagraphs,
} from '@/components/site/about/about-sections'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPageBySlug('about')
  return buildMetadata({
    seo: page?.seo,
    title: page?.title || 'About GoRidez | Corporate Transportation Partner',
    description:
      page?.heroSubtitle ||
      'GoRidez delivers reliable, compliant and technology-driven corporate transportation. Learn about our mission, values and team.',
    path: '/about',
    image: page?.heroImage,
  })
}

function splitTitle(title: string) {
  const match = title.match(/^(.*?\bwith)\s+(.+?)(\s+and\s+.+)$/i)
  return match ? { lead: match[1], highlight: match[2], tail: match[3] } : { lead: title, highlight: '', tail: '' }
}

export default async function AboutPage() {
  const [settings, team, clients, testimonials, cmsPage] = await Promise.all([
    getSiteSettings(),
    getTeamMembers(),
    getClients(),
    getTestimonials(),
    getCmsPageBySlug('about'),
  ])

  const { picked, rest } = splitSections(cmsPage, ['prose-split', 'stat-band', 'stat-bar', 'value-list', 'icon-cards'])
  const mission = picked['prose-split']
  const values = picked['value-list'] ?? picked['icon-cards']
  const statSection = picked['stat-band'] ?? picked['stat-bar']
  const sectionStats = (Array.isArray(statSection?.items) ? statSection.items : [])
    .map((r) => ({ value: String((r as Record<string, unknown>).value ?? ''), label: String((r as Record<string, unknown>).label ?? '') }))
    .filter((s) => s.value && s.label)
  const stats = sectionStats.length ? sectionStats : (settings.stats ?? [])
  const remaining = [
    ...rest,
    ...(picked['icon-cards'] && picked['value-list'] ? [picked['icon-cards']] : []),
    ...(picked['stat-bar'] && picked['stat-band'] ? [picked['stat-bar']] : []),
  ]
  const featured = testimonials[0]
  const { lead, highlight, tail } = splitTitle(
    cmsPage?.heroTitle || 'Moving people with precision, care and accountability',
  )
  const bodyParagraphs = cmsPage?.body ? cmsPage.body.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean) : []

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />
      <PageSplitHero
        eyebrow={cmsPage?.heroEyebrow || 'About us'}
        title={
          <>
            {lead} {highlight && <span className="text-accent">{highlight}</span>}
            {tail}
          </>
        }
        description={
          cmsPage?.heroSubtitle ||
          settings.tagline ||
          'GoRidez is a corporate transportation partner built for organisations that cannot afford to compromise on safety, punctuality or professionalism.'
        }
        image={cmsPage?.heroImage || '/images/services-hero-fleet.png'}
        imageAlt={cmsPage?.heroImageAlt || 'GoRidez fleet of coaches and executive cars'}
      />

      {/* Mission, stats and values are all editable in Admin → Content → Site Pages → About. */}
      {mission && <AboutMission section={mission} />}
      <AboutStats stats={stats} />
      {values && <AboutValues section={values} />}
      {bodyParagraphs.length > 0 ? (
        <AboutStatement paragraphs={bodyParagraphs} />
      ) : (
        mission && <AboutStatement heading={mission.heading} paragraphs={missionParagraphs(mission)} />
      )}
      <CmsSectionRenderer sections={remaining} stats={stats} />

      {featured && <AboutTestimonial testimonial={featured} />}
      <AboutLeadership team={team} />
      <AboutClients clients={clients} />

      <ServicesCtaBanner primary={settings.ctaPrimary} secondary={settings.ctaSecondary} />
    </>
  )
}
