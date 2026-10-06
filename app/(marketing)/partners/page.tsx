import type { Metadata } from "next"
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  ClipboardList,
  Handshake,
  Headset,
  IdCard,
  Route,
  ShieldCheck,
  TrendingUp,
  Wallet,
} from "lucide-react"
import { getSiteSettings, getCmsPageBySlug } from "@/lib/data/queries"
import { CmsPageContent } from "@/components/site/cms-section-renderer"
import { buildMetadata, breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo"
import { Container } from "@/components/site/primitives"
import { JsonLd } from "@/components/site/page-shell"
import { PhotoHero } from "@/components/site/careers/photo-hero"
import { IconCtaBanner } from "@/components/site/icon-cta-banner"
import { PartnerForm } from "@/components/site/forms"
import {
  PartnerBenefits,
  PartnerEligibility,
  PartnerSteps,
  type PartnerBenefit,
  type PartnerStep,
} from "@/components/site/partners/partner-sections"

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPageBySlug("partners")
  return buildMetadata({
    seo: page?.seo,
    title: page?.title || "Become a Fleet Partner | Attach Your Vehicles to GoRidez",
    description: page?.heroSubtitle || "Partner with GoRidez to keep your buses, coaches, vans and cars earning. Join our vetted supply network for corporate employee transportation with steady, contracted demand.",
    path: "/partners",
    image: page?.heroImage,
  })
}

const benefits: PartnerBenefit[] = [
  {
    icon: TrendingUp,
    title: "Steady, contracted demand",
    text: "Long-term corporate transport contracts mean predictable utilisation — not one-off trips.",
  },
  {
    icon: Wallet,
    title: "Reliable, on-time payments",
    text: "Transparent settlement cycles and clear rate cards, so you always know what you'll earn.",
  },
  {
    icon: Route,
    title: "Optimised routing",
    text: "Our planning team maximises trips per vehicle, reducing dead mileage and idle time.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance support",
    text: "We help you stay aligned with RTA and free-zone permit requirements across the Emirates.",
  },
  {
    icon: Headset,
    title: "Dedicated partner desk",
    text: "A single point of contact for scheduling, documentation and day-to-day operations.",
  },
  {
    icon: CalendarClock,
    title: "Grow with us",
    text: "Strong performers get first access to new routes and larger contracts as we scale.",
  },
]

const steps: PartnerStep[] = [
  { n: "01", icon: ClipboardList, title: "Apply", text: "Tell us about your company, fleet and coverage using the form." },
  { n: "02", icon: BadgeCheck, title: "Verification", text: "We review your permits, insurance, vehicle condition and safety record." },
  { n: "03", icon: IdCard, title: "Onboarding", text: "Sign the partner agreement, align on rate cards, SLAs and branding." },
  { n: "04", icon: Route, title: "Go live", text: "Start receiving optimised, contracted routes through our operations team." },
]

const requirements = [
  "Valid UAE trade licence and passenger transport permits",
  "Comprehensive vehicle and passenger insurance",
  "Well-maintained, roadworthy fleet (buses, vans, SUVs or sedans)",
  "Professional, licensed and background-checked drivers",
  "Ability to meet corporate punctuality and safety standards",
]

/** Highlights the final word of the hero title (the brand name) in the accent colour. */
function HeroTitle({ title }: { title: string }) {
  const cut = title.lastIndexOf(" ")
  if (cut < 0) return <>{title}</>
  return (
    <>
      {title.slice(0, cut)} <span className="text-accent">{title.slice(cut + 1)}</span>
    </>
  )
}

export default async function PartnersPage() {
  const [settings, cmsPage] = await Promise.all([getSiteSettings(), getCmsPageBySlug("partners")])

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Fleet Partners", path: "/partners" },
          ]),
          serviceJsonLd({
            name: "Fleet Partner Programme",
            description:
              "Vetted supply network for transport operators to attach their vehicles to GoRidez corporate mobility contracts.",
            path: "/partners",
          }),
        ]}
      />

      <PhotoHero
        eyebrow={cmsPage?.heroEyebrow || "Fleet partner programme"}
        title={<HeroTitle title={cmsPage?.heroTitle || "Put your fleet to work with GoRidez"} />}
        description={cmsPage?.heroSubtitle || "Join our vetted network of transport operators. Attach your buses, coaches, vans and cars to long-term corporate contracts and keep your vehicles earning."}
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Fleet Partners" }]}
        image={cmsPage?.heroImage || "/media/partners/partners-hero-fleet.png"}
        imageAlt={cmsPage?.heroImageAlt || "GoRidez partner vans and coach driving past the Kuwait City skyline at dusk"}
      >
        <a
          href="#apply"
          className="group mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 transition hover:brightness-110"
        >
          Apply to become a partner
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </a>
      </PhotoHero>

      {cmsPage?.sections?.length ? (
        <section className="py-16 sm:py-24">
          <Container>
            <CmsPageContent page={cmsPage} />
          </Container>
        </section>
      ) : null}

      <PartnerBenefits benefits={benefits} />
      <PartnerSteps steps={steps} />

      <section id="apply" className="scroll-mt-24 py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.55fr] lg:gap-12">
            <PartnerEligibility requirements={requirements} phone={settings?.phone} />

            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <h2 className="font-display text-xl font-semibold text-foreground">Fleet partner application</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Tell us about your company and fleet. Our team reviews every application personally.
              </p>
              <div className="mt-6">
                <PartnerForm />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <IconCtaBanner
        icon={Handshake}
        title="Ready to build long-term partnerships?"
        description="Join a network that keeps cities moving."
        primary={{ label: "Apply to become a partner", href: "#apply" }}
        secondary={null}
      />
    </>
  )
}
