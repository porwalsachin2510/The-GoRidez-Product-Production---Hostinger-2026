import type { Metadata } from 'next'
import { Clock, ShieldCheck, Users } from 'lucide-react'
import { Container } from '@/components/site/primitives'
import { Reveal } from '@/components/site/reveal'
import { JsonLd } from '@/components/site/page-shell'
import { PageSplitHero } from '@/components/site/page-split-hero'
import { AccentText, stripAccent } from '@/components/site/accent-text'
import { IndustryCard, SectionIntro } from '@/components/site/industries/industry-sections'
import { ServicesCtaBanner } from '@/components/site/services/services-cta-banner'
import { getIndustries, getSiteSettings } from '@/lib/data/queries'
import { getPageContent } from '@/lib/data/page-content'
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent('industries')
  return buildMetadata({
    seo: page.seo,
    title: 'Industries We Serve',
    description: stripAccent(page.subtitle),
    path: '/industries',
    image: page.image,
  })
}

const BADGE_ICONS = [Clock, ShieldCheck, Users]

/** "24/7 Operations" → two short lines so badges stay compact. */
function splitBadge(label: string) {
  const cut = label.indexOf(' ')
  return cut > 0 ? [label.slice(0, cut), label.slice(cut + 1)] : [label, '']
}

export default async function IndustriesPage() {
  const [industries, settings, page] = await Promise.all([
    getIndustries(),
    getSiteSettings(),
    getPageContent('industries'),
  ])
  const { copy } = page
  const badges = [copy.badge1, copy.badge2, copy.badge3].filter(Boolean)

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Industries', path: '/industries' },
        ])}
      />
      <PageSplitHero
        breadcrumbs={[{ name: 'Home', href: '/' }, { name: 'Industries' }]}
        eyebrow={page.eyebrow}
        title={<AccentText text={page.title} />}
        description={page.subtitle}
        image={page.image}
        imageAlt={page.imageAlt}
      >
        {badges.length > 0 && (
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-5">
            {badges.map((label, i) => {
              const BadgeIcon = BADGE_ICONS[i % BADGE_ICONS.length]
              const [first, second] = splitBadge(label)
              return (
                <li key={`${label}-${i}`} className="flex items-center gap-3 text-sm font-medium leading-tight">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground shadow-lg shadow-accent/25">
                    <BadgeIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    {first}
                    {second && (
                      <>
                        <br />
                        {second}
                      </>
                    )}
                  </span>
                </li>
              )
            })}
          </ul>
        )}
      </PageSplitHero>

      <section className="py-16 sm:py-20">
        <Container>
          <Reveal>
            <SectionIntro eyebrow={copy.sectionEyebrow} title={copy.sectionTitle} description={copy.sectionText} />
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind, i) => (
              <Reveal key={ind._id} delay={i * 0.05}>
                <IndustryCard industry={ind} index={i} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <ServicesCtaBanner
        primary={settings.ctaPrimary}
        secondary={settings.ctaSecondary}
        title={copy.ctaTitle}
        description={copy.ctaText}
      />
    </>
  )
}
