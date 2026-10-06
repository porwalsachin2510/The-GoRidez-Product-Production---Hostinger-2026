import type { Metadata } from 'next'
import { MessageCircleQuestion } from 'lucide-react'
import { getFAQs, getSiteSettings, getCmsPageBySlug } from '@/lib/data/queries'
import { CmsPageContent } from '@/components/site/cms-section-renderer'
import { buildMetadata, faqJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import { Container } from '@/components/site/primitives'
import { JsonLd } from '@/components/site/page-shell'
import { PhotoHero } from '@/components/site/careers/photo-hero'
import { IconCtaBanner } from '@/components/site/icon-cta-banner'
import { FaqBrowser, type FaqGroup } from '@/components/site/faq/faq-browser'

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPageBySlug('faq')
  return buildMetadata({
    seo: page?.seo,
    title: page?.title || 'Frequently Asked Questions',
    description: page?.heroSubtitle || 'Answers to common questions about GoRidez employee transportation, corporate shuttles, fleet, free-zone routes, safety, billing and service coverage across the UAE and beyond.',
    path: '/faq',
    image: page?.heroImage,
  })
}

/** Turn a category key into a readable heading. */
function label(cat?: string) {
  if (!cat) return 'General'
  return cat.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export default async function FaqPage() {
  const [faqs, settings, cmsPage] = await Promise.all([getFAQs(), getSiteSettings(), getCmsPageBySlug('faq')])

  // Group by category, preserving DB order within each group.
  const groupMap = new Map<string, FaqGroup>()
  for (const f of faqs) {
    const key = f.category || 'general'
    if (!groupMap.has(key)) groupMap.set(key, { key, label: label(key), items: [] })
    groupMap.get(key)!.items.push({ _id: f._id, question: f.question, answer: f.answer })
  }
  const groups = Array.from(groupMap.values())

  return (
    <>
      <JsonLd
        data={[
          faqJsonLd(faqs.map((f) => ({ question: f.question, answer: f.answer }))),
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'FAQ', path: '/faq' },
          ]),
        ]}
      />

      <PhotoHero
        eyebrow={cmsPage?.heroEyebrow || 'Answers'}
        title={cmsPage?.heroTitle || 'Frequently asked questions'}
        description={cmsPage?.heroSubtitle || "Everything corporate mobility managers ask us — from onboarding and safety to billing, coverage and technology. Can't find your answer? Talk to our team."}
        breadcrumbs={[{ name: 'Home', href: '/' }, { name: 'FAQ' }]}
        image={cmsPage?.heroImage || '/media/faq/faq-hero-3d.png'}
        imageAlt={cmsPage?.heroImageAlt || "3D FAQ letters with a chat bubble and question mark"}
      />

      {cmsPage?.sections?.length ? (
        <section className="py-16 sm:py-24">
          <Container>
            <CmsPageContent page={cmsPage} />
          </Container>
        </section>
      ) : null}

      <section className="pt-12 sm:pt-16">
        <Container>
          {groups.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">
              FAQs are being updated. Please{' '}
              <a href="/contact" className="text-accent underline underline-offset-2">
                contact us
              </a>{' '}
              in the meantime.
            </p>
          ) : (
            <FaqBrowser groups={groups} />
          )}
        </Container>
      </section>

      <IconCtaBanner
        icon={MessageCircleQuestion}
        title="Still have questions?"
        description="Our mobility specialists are happy to walk you through routes, pricing and onboarding."
        primary={settings.ctaPrimary}
      />
    </>
  )
}
