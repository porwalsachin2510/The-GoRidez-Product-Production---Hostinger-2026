import type { ReactNode } from 'react'
import { RoundedPhotoHero } from '@/components/site/rounded-photo-hero'

export type Crumb = { name: string; href?: string }

/** Kept for existing callers; renders the shared rounded-arch hero. */
export function PageSplitHero({
  breadcrumbs,
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  children,
}: {
  breadcrumbs?: Crumb[]
  eyebrow?: string
  eyebrowStyle?: 'text' | 'dash' | 'pill'
  title: ReactNode
  description?: string
  image?: string | null
  imageAlt: string
  shape?: 'angled' | 'curved'
  children?: ReactNode
}) {
  return (
    <RoundedPhotoHero
      breadcrumbs={breadcrumbs}
      eyebrow={eyebrow}
      title={title}
      description={description}
      image={image}
      imageAlt={imageAlt}
    >
      {children}
    </RoundedPhotoHero>
  )
}
