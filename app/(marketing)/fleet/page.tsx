import type { Metadata } from 'next'
import { JsonLd } from '@/components/site/page-shell'
import { PageSplitHero } from '@/components/site/page-split-hero'
import { AccentTitle } from '@/components/site/accent-title'
import { AccentText, stripAccent } from '@/components/site/accent-text'
import { ShieldCtaBanner } from '@/components/site/shield-cta-banner'
import { FleetOptionsGrid } from '@/components/site/fleet/fleet-sections'
import { getFleetCategories, getSiteSettings } from '@/lib/data/queries'
import { getPageContent } from '@/lib/data/page-content'
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent('fleet')
  return buildMetadata({
    seo: page.seo,
    title: 'Our Fleet — Corporate Vehicles & Coaches',
    description: stripAccent(page.subtitle),
    path: '/fleet',
    image: page.image,
  })
}

export default async function FleetPage() {
  const [fleet, settings, page] = await Promise.all([
    getFleetCategories(),
    getSiteSettings(),
    getPageContent('fleet'),
  ])

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Fleet', path: '/fleet' },
        ])}
      />
      <PageSplitHero
        eyebrow={page.eyebrow}
        title={page.title.includes('*') ? <AccentText text={page.title} /> : <AccentTitle title={page.title} />}
        description={page.subtitle}
        image={page.image}
        imageAlt={page.imageAlt}
        shape="curved"
      />

      <FleetOptionsGrid fleet={fleet} />

      <div className="bg-surface pb-4">
        <ShieldCtaBanner
          primary={settings.ctaPrimary}
          secondary={settings.ctaSecondary}
          title={page.copy.ctaTitle}
          description={page.copy.ctaText}
        />
      </div>
    </>
  )
}
