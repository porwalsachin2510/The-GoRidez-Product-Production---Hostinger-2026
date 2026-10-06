import type { Metadata } from 'next'
import { JsonLd } from '@/components/site/page-shell'
import { ServicesHero } from '@/components/site/services/services-hero'
import { ServiceCategory } from '@/components/site/services/service-category'
import { ServicesCtaBanner } from '@/components/site/services/services-cta-banner'
import { stripAccent } from '@/components/site/accent-text'
import { getServices, getSiteSettings } from '@/lib/data/queries'
import { getPageContent } from '@/lib/data/page-content'
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent('services')
  return buildMetadata({
    seo: page.seo,
    title: 'Corporate Transportation Services',
    description: stripAccent(page.subtitle),
    path: '/services',
    image: page.image,
  })
}

export default async function ServicesPage() {
  const [services, settings, page] = await Promise.all([
    getServices(),
    getSiteSettings(),
    getPageContent('services'),
  ])
  const parents = services.filter((s) => !s.parent)
  const { copy } = page

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ])}
      />
      <ServicesHero
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.subtitle}
        image={page.image}
        imageAlt={page.imageAlt}
        badges={[copy.badge1, copy.badge2, copy.badge3]}
      />

      {parents.map((parent, idx) => (
        <ServiceCategory
          key={parent._id}
          parent={parent}
          items={services.filter((s) => s.parent === parent._id)}
          index={idx}
        />
      ))}

      <ServicesCtaBanner
        primary={settings.ctaPrimary}
        secondary={settings.ctaSecondary}
        title={copy.ctaTitle}
        description={copy.ctaText}
      />
    </>
  )
}
