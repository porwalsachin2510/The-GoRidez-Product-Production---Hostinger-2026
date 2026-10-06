import { Clock, ShieldCheck, Settings2 } from 'lucide-react'
import { AccentText } from '@/components/site/accent-text'
import { RoundedPhotoHero } from '@/components/site/rounded-photo-hero'

const BADGE_ICONS = [ShieldCheck, Clock, Settings2]

export function ServicesHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  badges,
}: {
  eyebrow: string
  title: string
  description: string
  image: string
  imageAlt: string
  badges: string[]
}) {
  const items = badges.filter(Boolean)
  return (
    <RoundedPhotoHero
      eyebrow={eyebrow}
      title={<AccentText text={title} />}
      description={description}
      image={image}
      imageAlt={imageAlt}
    >
      {items.length > 0 ? (
        <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-4">
          {items.map((label, i) => {
            const BadgeIcon = BADGE_ICONS[i % BADGE_ICONS.length]
            return (
              <li key={`${label}-${i}`} className="flex items-center gap-3 text-sm font-medium">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                  <BadgeIcon className="h-5 w-5" aria-hidden="true" />
                </span>
                {label}
              </li>
            )
          })}
        </ul>
      ) : null}
    </RoundedPhotoHero>
  )
}
