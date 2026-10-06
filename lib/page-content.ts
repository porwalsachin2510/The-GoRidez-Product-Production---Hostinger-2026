/**
 * Registry of the fixed ("system") marketing pages whose hero and on-page text
 * are editable from Admin → Site Pages.
 *
 * Every entry declares the default hero content plus a list of labelled text
 * fields ("copy"). The admin editor renders each copy field as a plain input,
 * the public page reads the saved value and falls back to the default here, so
 * the site always renders even before an editor has touched a page.
 *
 * Shared by server and client code — keep it free of server-only imports.
 */

export type PageCopyFieldType = 'text' | 'textarea'

export interface PageCopyField {
  key: string
  label: string
  default: string
  type?: PageCopyFieldType
  group: string
}

export interface PageHeroDefaults {
  eyebrow: string
  title: string
  subtitle: string
  image: string
  imageAlt: string
}

export interface PageDefinition {
  slug: string
  title: string
  path: string
  hero: PageHeroDefaults
  copy: PageCopyField[]
}

const CTA_GROUP = 'Bottom call-to-action banner'
const ctaFields = (title: string, text: string): PageCopyField[] => [
  { key: 'ctaTitle', label: 'Banner title', default: title, group: CTA_GROUP },
  { key: 'ctaText', label: 'Banner text', default: text, type: 'textarea', group: CTA_GROUP },
]
const DEFAULT_CTA_TITLE = 'Ready to move your workforce with confidence?'
const DEFAULT_CTA_TEXT =
  "Tell us about your routes and headcount. We'll design a transport programme that fits your operation."

export const PAGE_DEFINITIONS: PageDefinition[] = [
  {
    slug: 'home',
    title: 'Home',
    path: '/',
    hero: {
      eyebrow: '',
      title: 'Move your workforce across Kuwait with confidence.',
      subtitle:
        'Reliable transport solutions, 24/7 operations and complete visibility — so your people reach every destination safely, on time.',
      image: '/images/hero-fleet-lineup.png',
      imageAlt: 'GoRidez corporate fleet — coach, van and executive sedan on a Kuwait highway',
    },
    copy: [],
  },
  {
    slug: 'services',
    title: 'Services',
    path: '/services',
    hero: {
      eyebrow: 'Our services',
      title: 'Enterprise mobility, engineered *end to end*',
      subtitle:
        'From daily employee transportation to executive chauffeur and large-scale event mobility — every GoRidez programme is managed with compliance, safety and reliability at its core.',
      image: '/images/services-hero-fleet.png',
      imageAlt: 'GoRidez coach, van and sedan in front of the Kuwait Towers',
    },
    copy: [
      { key: 'badge1', label: 'Hero badge 1', default: 'Safe & Compliant', group: 'Hero badges' },
      { key: 'badge2', label: 'Hero badge 2', default: 'On-time Guarantee', group: 'Hero badges' },
      { key: 'badge3', label: 'Hero badge 3', default: 'Customised Solutions', group: 'Hero badges' },
      ...ctaFields(DEFAULT_CTA_TITLE, DEFAULT_CTA_TEXT),
    ],
  },
  {
    slug: 'industries',
    title: 'Industries',
    path: '/industries',
    hero: {
      eyebrow: 'Industries we serve',
      title: 'Transport programmes built around your sector',
      subtitle:
        'We tailor mobility to the operational realities of each industry — from 24/7 IT shift shuttles to free zone employee transport and executive corporate travel.',
      image: '/media/industries/it-ites-bpo.png',
      imageAlt: 'GoRidez shuttle collecting corporate employees',
    },
    copy: [
      { key: 'badge1', label: 'Hero badge 1', default: '24/7 Operations', group: 'Hero badges' },
      { key: 'badge2', label: 'Hero badge 2', default: 'Safe & Compliant', group: 'Hero badges' },
      { key: 'badge3', label: 'Hero badge 3', default: 'Industry Focused', group: 'Hero badges' },
      { key: 'sectionEyebrow', label: 'Small label', default: 'Sectors we power', group: 'Industries section' },
      {
        key: 'sectionTitle',
        label: 'Heading',
        default: 'Mobility, tuned to how your industry actually runs',
        group: 'Industries section',
      },
      {
        key: 'sectionText',
        label: 'Description',
        type: 'textarea',
        default:
          'Every sector moves differently. Explore how GoRidez designs safe, reliable transport programmes around each one.',
        group: 'Industries section',
      },
      ...ctaFields(DEFAULT_CTA_TITLE, DEFAULT_CTA_TEXT),
    ],
  },
  {
    slug: 'fleet',
    title: 'Fleet',
    path: '/fleet',
    hero: {
      eyebrow: 'Our fleet',
      title: 'The right vehicle *for every journey*',
      subtitle:
        'Meticulously maintained, RTA-compliant vehicles matched to your route, headcount and comfort requirements — from executive sedans to full-size coaches.',
      image: '/media/fleet/fleet-hero-kuwait.png',
      imageAlt: 'GoRidez coach, van and executive sedan against the Kuwait City skyline',
    },
    copy: [...ctaFields(DEFAULT_CTA_TITLE, DEFAULT_CTA_TEXT)],
  },
  {
    slug: 'locations',
    title: 'Locations',
    path: '/locations',
    hero: {
      eyebrow: 'Where we operate',
      title: 'Regional reach, *local expertise*',
      subtitle:
        'Headquartered in Kuwait, with an operational footprint that extends across the region, India and Nepal.',
      image: '/media/locations/globe-hero.png',
      imageAlt: 'Globe highlighting the regions GoRidez operates in',
    },
    copy: [
      { key: 'sectionEyebrow', label: 'Small label', default: 'Our locations', group: 'Locations section' },
      { key: 'sectionTitle', label: 'Heading', default: 'Operating across key markets', group: 'Locations section' },
      {
        key: 'emptyText',
        label: 'Message when no locations are published',
        default: 'Locations will be published soon.',
        group: 'Locations section',
      },
      ...ctaFields(DEFAULT_CTA_TITLE, DEFAULT_CTA_TEXT),
    ],
  },
  {
    slug: 'free-zones',
    title: 'Free Zones',
    path: '/free-zones',
    hero: {
      eyebrow: 'Free Zone Mobility',
      title: 'Free Zone Shuttle Services *Across Kuwait*',
      subtitle:
        "Purpose-built staff transport for the most important economic zones — engineered for compliance, punctuality and scale.",
      image: '/media/free-zones/free-zones-hero.png',
      imageAlt: 'GoRidez shuttle serving a free zone business district',
    },
    copy: [
      { key: 'heroCtaLabel', label: 'Hero button label', default: 'Plan a lower-impact programme', group: 'Hero extras' },
      { key: 'heroCtaHref', label: 'Hero button link', default: '/get-quote', group: 'Hero extras' },
      { key: 'heroBadge1', label: 'Trust badge 1', default: 'Safe & Compliant Operations', group: 'Hero extras' },
      { key: 'heroBadge2', label: 'Trust badge 2', default: 'On-Time Every Time', group: 'Hero extras' },
      { key: 'heroBadge3', label: 'Trust badge 3', default: 'Sustainable Transport', group: 'Hero extras' },
      { key: 'heroCardTitle', label: 'Floating card title', default: 'Free Zone Coverage', group: 'Hero extras' },
      { key: 'heroCardText', label: 'Floating card text', default: 'Connecting People · Enabling Business', group: 'Hero extras' },
      { key: 'whyEyebrow', label: 'Small label', default: 'Why free zone shuttle', group: 'Why section' },
      { key: 'whyTitle', label: 'Heading', default: 'Dedicated transport for every major free zone', group: 'Why section' },
      {
        key: 'whyText',
        label: 'Description',
        type: 'textarea',
        default: 'Every free zone has its own routes, timing patterns and access protocols. We tailor operations to fit.',
        group: 'Why section',
      },
      { key: 'why1Title', label: 'Feature 1 title', default: 'Compliance', group: 'Why section' },
      { key: 'why1Text', label: 'Feature 1 text', default: 'with zone regulations', group: 'Why section' },
      { key: 'why2Title', label: 'Feature 2 title', default: 'Efficient', group: 'Why section' },
      { key: 'why2Text', label: 'Feature 2 text', default: 'route planning', group: 'Why section' },
      { key: 'why3Title', label: 'Feature 3 title', default: 'Reliable', group: 'Why section' },
      { key: 'why3Text', label: 'Feature 3 text', default: '& punctual', group: 'Why section' },
      { key: 'why4Title', label: 'Feature 4 title', default: 'Comfortable', group: 'Why section' },
      { key: 'why4Text', label: 'Feature 4 text', default: 'and safe travel', group: 'Why section' },
      { key: 'whyCardText', label: 'Image card text (use *stars* to bold)', default: 'Powered by *experience. Built for you.*', group: 'Why section' },
      { key: 'whyImage', label: 'Image URL', default: '/media/free-zones/free-zone-aerial.png', group: 'Why section' },
      { key: 'exploreAllLabel', label: 'Explore all button label', default: 'Explore All Zones', group: 'Free zones section' },
      { key: 'exploreAllHref', label: 'Explore all button link', default: '/contact', group: 'Free zones section' },
      { key: 'approachEyebrow', label: 'Small label', default: 'Our approach', group: 'Approach section' },
      { key: 'approachTitle', label: 'Heading', default: 'Practical changes with measurable impact', group: 'Approach section' },
      {
        key: 'approachText',
        label: 'Description',
        type: 'textarea',
        default:
          'We focus on smart planning, efficient operations and continuous improvement to deliver sustainable mobility solutions for every free zone.',
        group: 'Approach section',
      },
      { key: 'approach1Title', label: 'Item 1 title', default: 'Lower', group: 'Approach section' },
      { key: 'approach1Text', label: 'Item 1 text', default: 'Emissions', group: 'Approach section' },
      { key: 'approach2Title', label: 'Item 2 title', default: 'Better', group: 'Approach section' },
      { key: 'approach2Text', label: 'Item 2 text', default: 'Planning', group: 'Approach section' },
      { key: 'approach3Title', label: 'Item 3 title', default: 'Safer', group: 'Approach section' },
      { key: 'approach3Text', label: 'Item 3 text', default: 'Journeys', group: 'Approach section' },
      { key: 'approach4Title', label: 'Item 4 title', default: 'Greater', group: 'Approach section' },
      { key: 'approach4Text', label: 'Item 4 text', default: 'Efficiency', group: 'Approach section' },
      { key: 'approachCardText', label: 'Image card text', default: 'Greener Mobility for a Brighter Tomorrow', group: 'Approach section' },
      { key: 'approachCardHref', label: 'Image card link', default: '/sustainability', group: 'Approach section' },
      { key: 'approachImage', label: 'Image URL', default: '/media/free-zones/free-zone-approach.png', group: 'Approach section' },
      { key: 'ctaEyebrow', label: 'Banner small label', default: "Let's build a greener tomorrow", group: CTA_GROUP },
      { key: 'sectionEyebrow', label: 'Small label', default: 'Where we operate', group: 'Free zones section' },
      {
        key: 'sectionTitle',
        label: 'Heading',
        default: 'Dedicated coverage for every major free zone',
        group: 'Free zones section',
      },
      {
        key: 'sectionText',
        label: 'Description',
        type: 'textarea',
        default: 'Each zone has its own routes, timing patterns and access protocols. We tailor operations to fit.',
        group: 'Free zones section',
      },
      { key: 'cardLinkPrefix', label: 'Card link text (before zone name)', default: 'Explore', group: 'Free zones section' },
      ...ctaFields(DEFAULT_CTA_TITLE, DEFAULT_CTA_TEXT),
    ],
  },
  {
    slug: 'case-studies',
    title: 'Case Studies',
    path: '/case-studies',
    hero: {
      eyebrow: 'Case studies & clients',
      title: 'Transport programmes that keep organisations *moving*',
      subtitle:
        'Real outcomes for enterprises, free-zone companies and event organisers who rely on GoRidez to move their people safely and on time.',
      image: '/media/fleet/fleet-hero-kuwait.png',
      imageAlt: 'GoRidez vans lined up against the Kuwait City skyline at dusk',
    },
    copy: [
      { key: 'stat1Label', label: 'Stat 1 label (value = number of case studies)', default: 'Programmes delivered', group: 'Stats strip' },
      { key: 'stat2Value', label: 'Stat 2 value', default: '99%', group: 'Stats strip' },
      { key: 'stat2Label', label: 'Stat 2 label', default: 'Average on-time arrival', group: 'Stats strip' },
      { key: 'stat3Value', label: 'Stat 3 value', default: '24/7', group: 'Stats strip' },
      { key: 'stat3Label', label: 'Stat 3 label', default: 'Live operations desk', group: 'Stats strip' },
      { key: 'stat4Value', label: 'Stat 4 value', default: '13+', group: 'Stats strip' },
      { key: 'stat4Label', label: 'Stat 4 label', default: 'Years of heritage', group: 'Stats strip' },
      { key: 'clientsHeading', label: 'Client logos heading', default: 'Trusted by leading organisations', group: 'Clients & featured' },
      { key: 'featuredEyebrow', label: 'Featured case study label', default: 'Featured case study', group: 'Clients & featured' },
      { key: 'listEyebrow', label: 'Small label', default: 'Selected work', group: 'Case study list' },
      { key: 'listTitle', label: 'Heading', default: 'Browse every case study', group: 'Case study list' },
      {
        key: 'listText',
        label: 'Description',
        type: 'textarea',
        default: 'Filter by industry or service to find the programme closest to your operation.',
        group: 'Case study list',
      },
      { key: 'emptyTitle', label: 'Heading', default: 'Detailed case studies are on the way', group: 'When no case studies are published' },
      {
        key: 'emptyText',
        label: 'Message',
        type: 'textarea',
        default:
          "We're preparing published case studies with our clients' permission. In the meantime, we'd be glad to share relevant references and outcomes directly for your sector.",
        group: 'When no case studies are published',
      },
      { key: 'emptyButton', label: 'Button label', default: 'Request references', group: 'When no case studies are published' },
      ...ctaFields(DEFAULT_CTA_TITLE, DEFAULT_CTA_TEXT),
    ],
  },
  {
    slug: 'blog',
    title: 'Blog',
    path: '/blog',
    hero: {
      eyebrow: 'Insights & updates',
      title: 'Mobility insights *& company news*',
      subtitle:
        'Perspectives on corporate transportation, operations, technology and sustainable mobility from the GoRidez team.',
      image: '/media/blog/blog-hero-laptop.png',
      imageAlt: 'Laptop showing the GoRidez blog surrounded by chat, document and team icons',
    },
    copy: [
      { key: 'emptyText', label: 'Message when no articles are published', default: 'New articles are on the way. Check back soon.', group: 'Articles' },
      ...ctaFields(
        'Stay ahead with the latest mobility insights',
        'Expert perspectives on corporate transport, operations, technology and sustainable mobility.',
      ),
    ],
  },
  {
    slug: 'careers',
    title: 'Careers',
    path: '/careers',
    hero: {
      eyebrow: 'Careers',
      title: 'Move your career forward with *GoRidez*',
      subtitle:
        "We're building the most reliable corporate mobility network in the region — and we're looking for people who take pride in service, safety and precision.",
      image: '/media/careers/careers-hero-fleet.png',
      imageAlt: 'GoRidez vans and coach driving along a Kuwait City highway at dusk',
    },
    copy: [
      { key: 'heroButton1', label: 'Primary button', default: 'Explore open roles', group: 'Hero buttons' },
      { key: 'heroButton2', label: 'Secondary button', default: 'Life at GoRidez', group: 'Hero buttons' },
      { key: 'perksEyebrow', label: 'Small label', default: 'Why join us', group: 'Why join us' },
      { key: 'perksTitle', label: 'Heading', default: 'A place to do your best work', group: 'Why join us' },
      {
        key: 'perksText',
        label: 'Description',
        type: 'textarea',
        default: 'We invest in our people because they are the reason our clients trust us.',
        group: 'Why join us',
      },
      { key: 'perk1Title', label: 'Perk 1 title', default: 'Purpose-driven work', group: 'Perks' },
      { key: 'perk1Text', label: 'Perk 1 text', default: 'Keep thousands of professionals moving safely every day.', group: 'Perks' },
      { key: 'perk2Title', label: 'Perk 2 title', default: 'Growth & training', group: 'Perks' },
      { key: 'perk2Text', label: 'Perk 2 text', default: 'Structured development paths and continuous upskilling.', group: 'Perks' },
      { key: 'perk3Title', label: 'Perk 3 title', default: 'Stable & compliant', group: 'Perks' },
      { key: 'perk3Text', label: 'Perk 3 text', default: 'Salaried roles with full compliance and welfare standards.', group: 'Perks' },
      { key: 'perk4Title', label: 'Perk 4 title', default: 'Modern fleet & tools', group: 'Perks' },
      { key: 'perk4Text', label: 'Perk 4 text', default: 'Work with a well-maintained fleet and smart dispatch technology.', group: 'Perks' },
      { key: 'rolesEyebrow', label: 'Small label', default: 'Open positions', group: 'Open roles' },
      { key: 'rolesTitle', label: 'Heading', default: 'Current opportunities', group: 'Open roles' },
      {
        key: 'noRolesText',
        label: 'Message when there are no open roles (email is added after)',
        type: 'textarea',
        default: 'There are no open positions right now. Send your CV to',
        group: 'Open roles',
      },
      ...ctaFields(
        "Don't see the right role?",
        "We're always keen to meet talented people. Reach out and tell us how you can contribute.",
      ),
    ],
  },
  {
    slug: 'contact',
    title: 'Contact GoRidez',
    path: '/contact',
    hero: {
      eyebrow: 'Contact us',
      title: "Let's design your mobility programme",
      subtitle:
        'Tell us about your routes, headcount and timelines. A GoRidez specialist will prepare a tailored proposal — usually within one business day.',
      image: '/images/contact-hero-executive.png',
      imageAlt: 'GoRidez executive chauffeur service',
    },
    copy: [
      { key: 'infoTitle', label: 'Contact card heading', default: 'Get in touch', group: 'Contact details card' },
      { key: 'phoneLabel', label: 'Phone label', default: 'Call us', group: 'Contact details card' },
      { key: 'emailLabel', label: 'Email label', default: 'Email', group: 'Contact details card' },
      { key: 'addressLabel', label: 'Address label', default: 'Head office', group: 'Contact details card' },
      { key: 'hoursLabel', label: 'Hours label (the timings are set in Site Settings → Contact)', default: 'Hours', group: 'Contact details card' },
    ],
  },
]

export function getPageDefinition(slug: string | undefined | null): PageDefinition | undefined {
  if (!slug) return undefined
  return PAGE_DEFINITIONS.find((p) => p.slug === slug)
}
