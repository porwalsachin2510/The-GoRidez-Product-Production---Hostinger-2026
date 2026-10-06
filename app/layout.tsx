import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import { getSiteSettings } from '@/lib/data/queries'
import { SITE_URL, DEFAULT_TWITTER, DEFAULT_OG_IMAGE } from '@/lib/seo'
import './globals.css'

const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const FALLBACK_TITLE =
  'GoRidez | Corporate Transportation & Employee Mobility in Kuwait'
const FALLBACK_DESCRIPTION =
  'GoRidez delivers reliable, technology-driven employee transportation, corporate shuttles, airport transfers and managed mobility across Kuwait.'
const FALLBACK_KEYWORDS = [
  'employee transportation Kuwait',
  'corporate mobility Kuwait',
  'staff transport Kuwait',
  'company shuttle Kuwait',
  'airport transfer Kuwait',
  'executive chauffeur Kuwait',
  'fleet management',
]

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const seo = settings.seo ?? {}

  const defaultTitle = settings.defaultSeo?.metaTitle || FALLBACK_TITLE
  const template = seo.titleTemplate || '%s | GoRidez'
  const description = settings.defaultSeo?.metaDescription || FALLBACK_DESCRIPTION
  const keywords = seo.defaultKeywords?.length ? seo.defaultKeywords : FALLBACK_KEYWORDS
  const ogImage = seo.defaultOgImage || settings.defaultSeo?.ogImage || DEFAULT_OG_IMAGE
  const twitterSite = seo.twitterSite || DEFAULT_TWITTER
  const v = seo.verification ?? {}
  const otherVerification: Record<string, string> = {}
  if (v.bing) otherVerification['msvalidate.01'] = v.bing
  if (v.pinterest) otherVerification['p:domain_verify'] = v.pinterest

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: defaultTitle, template },
    description,
    generator: 'v0.app',
    applicationName: 'GoRidez',
    keywords,
    ...(v.google || v.yandex || Object.keys(otherVerification).length
      ? {
          verification: {
            ...(v.google ? { google: v.google } : {}),
            ...(v.yandex ? { yandex: v.yandex } : {}),
            ...(Object.keys(otherVerification).length ? { other: otherVerification } : {}),
          },
        }
      : {}),
    openGraph: {
      type: 'website',
      siteName: 'GoRidez',
      locale: 'en_KW',
      title: defaultTitle,
      description,
      url: SITE_URL,
      images: [{ url: ogImage, width: 1200, height: 630, alt: 'GoRidez' }],
    },
    twitter: {
      card: 'summary_large_image',
      site: twitterSite,
      creator: seo.twitterCreator || twitterSite,
      title: defaultTitle,
      description,
      images: [ogImage],
    },
    icons: {
      icon: '/icon.svg',
    },
  }
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#1E3A8A' },
    { media: '(prefers-color-scheme: dark)', color: '#1E3A8A' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} bg-background`}>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
