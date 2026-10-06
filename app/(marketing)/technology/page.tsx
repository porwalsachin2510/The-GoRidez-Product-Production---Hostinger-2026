import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CalendarDays, PlayCircle } from 'lucide-react'
import {
  getCmsPageBySlug,
  getSiteSettings,
  getTestimonials,
  getClients,
} from '@/lib/data/queries'
import { buildMetadata, breadcrumbJsonLd, serviceJsonLd } from '@/lib/seo'
import { JsonLd } from '@/components/site/page-shell'
import { TestimonialsSection } from '@/components/site/home/sections'
import { CmsSectionRenderer } from '@/components/site/cms-section-renderer'
import { IllustrationHero } from '@/components/site/illustration-hero'
import { IconCtaBanner } from '@/components/site/icon-cta-banner'
import { ClientGrid, PlatformInAction } from '@/components/site/technology/tech-sections'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPageBySlug('technology')
  return buildMetadata({
    seo: page?.seo,
    title: page?.title || 'Technology Platform',
    description:
      page?.heroSubtitle ||
      'One connected platform to plan, track and manage corporate transport — with live GPS tracking, onboard cameras and operational analytics.',
    path: '/technology',
    image: page?.heroImage,
  })
}

function HeroTitle({ title }: { title: string }) {
  const match = title.match(/^(.*?)(GoRidez trip)$/i)
  if (!match) return <>{title}</>
  return (
    <>
      {match[1]}
      <span className="text-accent">{match[2]}</span>
    </>
  )
}

export default async function TechnologyPage() {
  const [page, settings, testimonials, clients] = await Promise.all([
    getCmsPageBySlug('technology'),
    getSiteSettings(),
    getTestimonials(),
    getClients(),
  ])

  const title = page?.heroTitle || 'The technology platform behind every GoRidez trip'
  const subtitle =
    page?.heroSubtitle ||
    'One connected platform to plan, track and manage corporate transport — giving your teams live visibility, safer journeys and data they can act on.'

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Technology', path: '/technology' },
          ]),
          serviceJsonLd({
            name: 'Corporate mobility technology platform',
            description: subtitle,
            path: '/technology',
          }),
        ]}
      />

      <IllustrationHero
        breadcrumbs={[{ name: 'Home', href: '/' }, { name: 'Technology' }]}
        eyebrow={page?.heroEyebrow || 'Technology & platform'}
        title={<HeroTitle title={title} />}
        description={subtitle}
        image={page?.heroImage || '/media/technology/tech-hero-laptop.png'}
        imageAlt={page?.heroImageAlt || 'GoRidez live operations dashboard showing ongoing trips and a live vehicle map'}
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/book-demo"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition hover:brightness-110"
          >
            See the platform in action
            <PlayCircle className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            Talk to our team
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </IllustrationHero>

      {/* Fully CMS-managed body: stat bar, overview, capabilities, modules,
          steps, personas, mobile app and trust sections are all editable
          from Admin → Content → Landing Pages → Technology. */}
      <CmsSectionRenderer sections={page?.sections} />

      <ClientGrid clients={clients} />
      <TestimonialsSection testimonials={testimonials} />

      <PlatformInAction
        primary={{ label: 'See the platform in action', href: '/book-demo' }}
        secondary={settings.ctaSecondary}
        stats={{ onTime: '99%', activeVehicles: '1,890', safetyIncidents: '0' }}
      />

      <IconCtaBanner
        icon={CalendarDays}
        title="Ready to modernise your corporate transport?"
        description="Let's design a connected mobility program that fits your operation."
        primary={settings.ctaPrimary}
        secondary={settings.ctaSecondary}
      />
    </>
  )
}
