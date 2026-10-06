import type { Metadata } from "next"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { getSiteSettings, getCmsPageBySlug } from "@/lib/data/queries"
import { getPageContent } from "@/lib/data/page-content"
import { CmsPageContent, CmsNoteCard, splitSections } from "@/components/site/cms-section-renderer"
import { buildMetadata } from "@/lib/seo"
import { Container } from "@/components/site/primitives"
import { ContactHero } from "@/components/site/contact/contact-hero"
import { stripAccent } from "@/components/site/accent-text"
import {
  ContactFormPanel,
  ContactInfoCard,
  ContactMap,
  type ContactItem,
} from "@/components/site/contact/contact-sections"

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent("contact")
  return buildMetadata({
    seo: page.seo,
    title: "Contact Us",
    description: stripAccent(page.subtitle),
    path: "/contact",
    image: page.image,
  })
}

export default async function ContactPage() {
  const [settings, cmsPage, page] = await Promise.all([
    getSiteSettings(),
    getCmsPageBySlug("contact"),
    getPageContent("contact"),
  ])
  const { copy } = page

  // The navy sidebar card is authored as a CMS section; everything else flows below.
  const { picked, rest } = splitSections(cmsPage, ["note-card"])

  const contactItems = [
    settings.phone
      ? { icon: Phone, label: copy.phoneLabel, value: settings.phone, href: `tel:${settings.phone.replace(/\s/g, "")}` }
      : null,
    settings.email ? { icon: Mail, label: copy.emailLabel, value: settings.email, href: `mailto:${settings.email}` } : null,
    settings.address ? { icon: MapPin, label: copy.addressLabel, value: settings.address } : null,
    settings.businessHours ? { icon: Clock, label: copy.hoursLabel, value: settings.businessHours } : null,
  ].filter(Boolean) as ContactItem[]

  return (
    <>
      <ContactHero
        eyebrow={page.eyebrow}
        title={stripAccent(page.title)}
        description={page.subtitle}
        image={page.image || "/images/contact-hero-executive.png"}
      />

      <section className="bg-muted/40 py-14 sm:py-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1fr_1.7fr] lg:gap-8">
            <ContactInfoCard items={contactItems} title={copy.infoTitle}>
              <CmsNoteCard section={picked["note-card"]} />
            </ContactInfoCard>
            <ContactFormPanel />
          </div>

          {settings.address && (
            <ContactMap
              address={settings.address}
              title={`Map showing ${settings.companyName || "our"} head office`}
            />
          )}
        </Container>
      </section>

      {cmsPage && rest.length ? <CmsPageContent page={cmsPage} sections={rest} /> : null}
    </>
  )
}
