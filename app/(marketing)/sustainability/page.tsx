import type { Metadata } from 'next'
import { getCmsPageBySlug, getSiteSettings } from '@/lib/data/queries'
import { buildMetadata, breadcrumbJsonLd, serviceJsonLd } from '@/lib/seo'
import { JsonLd } from '@/components/site/page-shell'
import { CmsSectionRenderer } from '@/components/site/cms-section-renderer'
import {
  SustainabilityApproach,
  SustainabilityCommitments,
  SustainabilityCta,
  SustainabilityHero,
  SustainabilityImpactBand,
  type CmsSection,
} from '@/components/site/sustainability/sustainability-landing'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPageBySlug('sustainability')
  return buildMetadata({
    seo: page?.seo,
    title: page?.title || 'Sustainability',
    description: page?.heroSubtitle || 'Lower-impact employee transportation through smarter routes and cleaner fleets.',
    path: '/sustainability',
    image: page?.heroImage,
  })
}

const text = (value: unknown, fallback: string) => (typeof value === 'string' && value.trim() ? value : fallback)

function renderSection(section: CmsSection, key: string) {
  if (section.type === 'split-highlights') return <SustainabilityApproach key={key} section={section} />
  if (section.type === 'icon-cards' && section.variant === 'band') return <SustainabilityImpactBand key={key} section={section} />
  if (section.type === 'icon-cards') return <SustainabilityCommitments key={key} section={section} />
  return <CmsSectionRenderer key={key} sections={[section]} />
}

export default async function SustainabilityPage() {
  const [page, settings] = await Promise.all([getCmsPageBySlug('sustainability'), getSiteSettings()])
  const copy = page?.copy ?? {}
  const title = page?.heroTitle || 'A more *responsible* way to move people'
  const subtitle =
    page?.heroSubtitle ||
    'Sustainability is practical at GoRidez: optimise the network, improve utilisation and transition to cleaner vehicles with evidence.'

  // Every section below is editable in Admin → Content → Site Pages → Sustainability.
  const sections = page?.sections ?? []
  const ctaSection = sections.find((s) => s.type === 'cta')
  const bodySections = sections.filter((s) => s !== ctaSection)

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: 'Home', path: '/' }, { name: 'Sustainability', path: '/sustainability' }]),
          serviceJsonLd({ name: 'Sustainable employee transportation', description: subtitle, path: '/sustainability' }),
        ]}
      />
      <SustainabilityHero
        eyebrow={page?.heroEyebrow || 'Sustainability'}
        title={title.includes('*') ? title : title.replace(/\bresponsible\b/i, (m) => `*${m}*`)}
        subtitle={subtitle}
        image={page?.heroImage || '/media/sections/sustainability.png'}
        imageAlt={page?.heroImageAlt || 'GoRidez shuttle bus surrounded by greenery'}
        ctaLabel={text(copy.heroCtaLabel, 'Our Sustainability Journey')}
        ctaHref={text(copy.heroCtaHref, '/contact')}
        tagline={text(copy.heroTagline, 'Cleaner *Mobility* *Greener* Tomorrow')}
      />

      {bodySections.map((section, i) => renderSection(section, `${section.type}-${i}`))}

      <SustainabilityCta
        section={ctaSection}
        fallbackPrimary={settings.ctaPrimary}
        fallbackSecondary={settings.ctaSecondary}
      />
    </>
  )
}
