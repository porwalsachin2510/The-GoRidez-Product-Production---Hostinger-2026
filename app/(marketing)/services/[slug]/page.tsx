import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/site/page-shell'
import { ServiceDetailHero } from '@/components/site/services/service-detail-hero'
import {
  ServiceOverview,
  ServiceIncluded,
  ServiceExplore,
  ServiceContactStrip,
} from '@/components/site/services/service-detail-sections'
import { ServicesCtaBanner } from '@/components/site/services/services-cta-banner'
import {
  getServices,
  getServiceBySlug,
  getSiteSettings,
  getClients,
} from '@/lib/data/queries'
import { buildMetadata, breadcrumbJsonLd, serviceJsonLd } from '@/lib/seo'

export async function generateStaticParams() {
  const services = await getServices()
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) return buildMetadata({ title: 'Service not found', path: `/services/${slug}` })
  return buildMetadata({
    seo: service.seo,
    title: service.title,
    description: service.excerpt,
    path: `/services/${service.slug}`,
    image: service.heroImage,
  })
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [service, allServices, settings, clients] = await Promise.all([
    getServiceBySlug(slug),
    getServices(),
    getSiteSettings(),
    getClients(),
  ])
  if (!service) notFound()

  const children = allServices.filter((s) => s.parent === service._id)
  const parent = service.parent ? allServices.find((s) => s._id === service.parent) : null
  const siblings = allServices
    .filter((s) => s._id !== service._id && s.parent && s.parent === service.parent)
    .slice(0, 3)

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    ...(parent ? [{ name: parent.title, href: `/services/${parent.slug}` }] : []),
    { name: service.title },
  ]

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(
            breadcrumbs.map((b) => ({ name: b.name, path: b.href || `/services/${service.slug}` })),
          ),
          serviceJsonLd({
            name: service.title,
            description: service.excerpt,
            path: `/services/${service.slug}`,
          }),
        ]}
      />

      <ServiceDetailHero
        eyebrow={parent ? parent.title : 'Service'}
        title={service.heroTitle || service.title}
        description={service.heroSubtitle || service.excerpt}
        image={service.heroImage}
        breadcrumbs={breadcrumbs}
        cta={settings.ctaPrimary}
        clients={clients}
      />

      <ServiceOverview service={service} />
      <ServiceIncluded features={service.features ?? []} />

      {children.length > 0 ? (
        <ServiceExplore eyebrow="Explore" title={service.title} items={children} />
      ) : (
        <ServiceExplore
          eyebrow="Keep exploring"
          title={parent ? parent.title : 'Related services'}
          items={siblings}
        />
      )}

      <ServicesCtaBanner
        primary={settings.ctaPrimary}
        eyebrow="Get started"
        title="Let's plan your programme"
        description="Get a tailored transport plan for your organisation — built around your shifts, safety standards and scale."
        showSecondary={false}
      />
      <ServiceContactStrip cta={settings.ctaSecondary} />
    </>
  )
}
