import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Users } from 'lucide-react'
import { Container } from '@/components/site/primitives'
import { JsonLd } from '@/components/site/page-shell'
import { PageSplitHero } from '@/components/site/page-split-hero'
import { AccentTitle } from '@/components/site/accent-title'
import { ShieldCtaBanner } from '@/components/site/shield-cta-banner'
import { FleetOverview, OtherVehicleTypes } from '@/components/site/fleet/fleet-sections'
import {
  getFleetCategories,
  getFleetCategoryBySlug,
  getSiteSettings,
} from '@/lib/data/queries'
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo'

export async function generateStaticParams() {
  const fleet = await getFleetCategories()
  return fleet.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const cat = await getFleetCategoryBySlug(slug)
  if (!cat) return buildMetadata({ title: 'Vehicle not found', path: `/fleet/${slug}` })
  return buildMetadata({
    seo: cat.seo,
    title: cat.name,
    description: cat.description,
    path: `/fleet/${cat.slug}`,
    image: cat.image,
  })
}

export default async function FleetDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [cat, allFleet, settings] = await Promise.all([
    getFleetCategoryBySlug(slug),
    getFleetCategories(),
    getSiteSettings(),
  ])
  if (!cat) notFound()

  const others = allFleet.filter((c) => c._id !== cat._id)
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Fleet', href: '/fleet' },
    { name: cat.name },
  ]

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(
          breadcrumbs.map((b) => ({ name: b.name, path: b.href || `/fleet/${cat.slug}` })),
        )}
      />
      <PageSplitHero
        breadcrumbs={breadcrumbs}
        eyebrow="Our fleet"
        title={<AccentTitle title={cat.name} />}
        description={cat.description}
        image={cat.image}
        imageAlt={cat.name}
        shape="curved"
      >
        {cat.capacityRange && (
          <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-accent ring-1 ring-white/10">
            <Users className="h-4 w-4" aria-hidden="true" />
            Capacity: {cat.capacityRange}
          </span>
        )}
      </PageSplitHero>

      <div className="bg-surface pt-16 sm:pt-20">
        <Container>
          <FleetOverview cat={cat} cta={settings.ctaPrimary} />
          <OtherVehicleTypes others={others} />
        </Container>
        <ShieldCtaBanner primary={settings.ctaPrimary} secondary={settings.ctaSecondary} />
      </div>
    </>
  )
}
