import type { ReactNode } from 'react'
import type { Crumb } from '@/components/site/page-split-hero'
import { RoundedPhotoHero } from '@/components/site/rounded-photo-hero'

/** Kept for existing callers; renders the shared rounded-arch hero. */
export function IllustrationHero({
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
  title: ReactNode
  description?: string
  image: string
  imageAlt: string
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
