import { Hero } from '@/components/site/home/hero'
import {
  StatsBar,
  IndustriesSection,
  ServicesSection,
  ProcessSection,
  FleetSection,
  TechnologySection,
  WhySection,
  CoverageSection,
  TestimonialsSection,
} from "@/components/site/home/sections";
import { ClientCarousel } from '@/components/site/home/client-carousel'
import {
  getSiteSettings,
  getParentServices,
  getFleetCategories,
  getTestimonials,
  getLocations,
  getClients,
  getIndustries,
} from "@/lib/data/queries";
import { getCmsPageBySlug } from '@/lib/data/queries'
import { buildMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPageBySlug('home')
  return buildMetadata({
    seo: page?.seo,
    title: page?.title || 'Corporate Transportation & Employee Mobility in Kuwait',
    description: page?.heroSubtitle || 'Reliable, compliant and technology-driven corporate transportation, staff shuttles and airport transfers across Kuwait.',
    path: '/',
    image: page?.heroImage,
  })
}

export default async function HomePage() {
  const [
    settings,
    services,
    fleet,
    testimonials,
    locations,
    clients,
    industries,
    homePage,
  ] = await Promise.all([
    getSiteSettings(),
    getParentServices(),
    getFleetCategories(),
    getTestimonials(),
    getLocations(),
    getClients(),
    getIndustries(),
    getCmsPageBySlug('home'),
  ]);

  return (
    <>
      <Hero settings={settings} page={homePage} />
      <StatsBar stats={settings.stats} />
      <IndustriesSection industries={industries} />
      <ServicesSection services={services} />
      {/* <TestimonialsSection
        testimonials={testimonials}
        eyebrow="Industries we serve"
        title="Trusted across sectors that never stop moving"
        description="We tailor transport programmes to each industry's shift patterns, safety standards and scale."
        limit={6}
      /> */}
      <ProcessSection />
      <FleetSection fleet={fleet} />
      <TechnologySection />
      <WhySection />
      <CoverageSection
        locations={locations}
        testimonials={testimonials}
        stats={settings.stats}
      />
      <ClientCarousel clients={clients} />
    </>
  );
}
