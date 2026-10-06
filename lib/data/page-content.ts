import 'server-only'
import { cache } from 'react'
import { connectToDatabase } from '@/lib/db/mongoose'
import { Page } from '@/models'
import { PAGE_DEFINITIONS, getPageDefinition } from '@/lib/page-content'
import type { SeoData } from '@/lib/data/queries'

export interface ResolvedPageContent {
  eyebrow: string
  title: string
  subtitle: string
  image: string
  imageAlt: string
  copy: Record<string, string>
  seo?: SeoData
  metaTitle?: string
}

type StoredPage = {
  title?: string
  heroEyebrow?: string
  heroTitle?: string
  heroSubtitle?: string
  heroImage?: string | null
  heroImageAlt?: string
  copy?: Record<string, unknown>
  seo?: SeoData
}

const pick = (value: unknown, fallback: string) =>
  typeof value === 'string' && value.trim() ? value : fallback

/**
 * Hero + on-page text for a system page: the saved CMS values, with every
 * blank field falling back to the registry default. Draft or missing pages
 * (or an unreachable database) render the defaults so the site never breaks.
 */
export const getPageContent = cache(async (slug: string): Promise<ResolvedPageContent> => {
  const def = getPageDefinition(slug)
  let stored: StoredPage | null = null
  try {
    await connectToDatabase()
    stored = (await Page.findOne({ slug, isDeleted: false, status: 'published' }).lean()) as StoredPage | null
  } catch (error) {
    console.error('[v0] getPageContent failed, using defaults:', (error as Error).message)
  }

  const copy: Record<string, string> = {}
  for (const field of def?.copy ?? []) copy[field.key] = pick(stored?.copy?.[field.key], field.default)

  return {
    eyebrow: pick(stored?.heroEyebrow, def?.hero.eyebrow ?? ''),
    title: pick(stored?.heroTitle, def?.hero.title ?? ''),
    subtitle: pick(stored?.heroSubtitle, def?.hero.subtitle ?? ''),
    image: pick(stored?.heroImage, def?.hero.image ?? ''),
    imageAlt: pick(stored?.heroImageAlt, def?.hero.imageAlt ?? ''),
    copy,
    seo: stored?.seo,
    metaTitle: stored?.title,
  }
})

/**
 * Makes sure every system page exists in the Site Pages list so admins can
 * find and edit it. Existing documents are never overwritten.
 */
export async function ensureSystemPages() {
  await connectToDatabase()
  await Page.bulkWrite(
    PAGE_DEFINITIONS.map((def) => ({
      updateOne: {
        filter: { slug: def.slug },
        update: {
          $setOnInsert: {
            title: def.title,
            slug: def.slug,
            heroEyebrow: def.hero.eyebrow,
            heroTitle: def.hero.title,
            heroSubtitle: def.hero.subtitle,
            heroImage: def.hero.image || null,
            heroImageAlt: def.hero.imageAlt,
            copy: Object.fromEntries(def.copy.map((f) => [f.key, f.default])),
            status: 'published',
            isDeleted: false,
          },
        },
        upsert: true,
      },
    })),
    { ordered: false },
  )
}
