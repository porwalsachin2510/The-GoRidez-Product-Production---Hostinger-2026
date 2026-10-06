import type { Metadata } from 'next'
import { MapPin } from 'lucide-react'
import { Container } from '@/components/site/primitives'
import { Reveal } from '@/components/site/reveal'
import { JsonLd } from '@/components/site/page-shell'
import { ShieldCtaBanner } from '@/components/site/shield-cta-banner'
import { LocationsHero } from '@/components/site/locations/locations-hero'
import { LocationCard } from '@/components/site/locations/location-card'
import { stripAccent } from '@/components/site/accent-text'
import { getLocations, getSiteSettings } from '@/lib/data/queries'
import { getPageContent } from '@/lib/data/page-content'
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent('locations')
  return buildMetadata({
    seo: page.seo,
    title: 'Locations',
    description: stripAccent(page.subtitle),
    path: '/locations',
    image: page.image,
  })
}

export default async function LocationsPage() {
  const [locations, settings, page] = await Promise.all([
    getLocations(),
    getSiteSettings(),
    getPageContent('locations'),
  ])
  const { copy } = page

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Locations', path: '/locations' },
        ])}
      />

      <LocationsHero
        eyebrow={page.eyebrow}
        title={page.title}
        description={page.subtitle}
        image={page.image}
        imageAlt={page.imageAlt}
      />

      <section className="relative isolate overflow-hidden bg-secondary/40 py-16 sm:py-20">
        <div
          aria-hidden="true"
          className="absolute -left-10 top-0 -z-10 h-56 w-96 bg-[radial-gradient(circle,color-mix(in_oklch,var(--primary)_18%,transparent)_1px,transparent_1.5px)] [background-size:10px_10px] [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]"
        />
        <Container>
          <Reveal className="text-center">
            {copy.sectionEyebrow && (
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                <span aria-hidden="true" className="h-px w-6 border-t border-dashed border-accent" />
                {copy.sectionEyebrow}
                <span aria-hidden="true" className="h-px w-6 border-t border-dashed border-accent" />
              </span>
            )}
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground text-balance sm:text-4xl">
              {copy.sectionTitle}
            </h2>
          </Reveal>

          {locations.length > 0 ? (
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {locations.map((loc, i) => (
                <Reveal key={loc._id} delay={i * 0.05}>
                  <LocationCard location={loc} />
                </Reveal>
              ))}
            </div>
          ) : (
            <p className="mt-10 text-center text-sm text-muted-foreground">{copy.emptyText}</p>
          )}
        </Container>
      </section>

      <ShieldCtaBanner
        primary={settings.ctaPrimary}
        secondary={settings.ctaSecondary}
        eyebrow=""
        icon={MapPin}
        title={copy.ctaTitle}
        description={copy.ctaText}
      />
    </>
  )
}
