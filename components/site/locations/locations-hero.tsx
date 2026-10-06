import { AccentText } from '@/components/site/accent-text'
import { RoundedPhotoHero } from '@/components/site/rounded-photo-hero'

export function LocationsHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt = 'GoRidez operating locations',
}: {
  eyebrow: string
  title: string
  description: string
  image?: string
  imageAlt?: string
}) {
  // Legacy titles without *accent* markers keep the old "lead, accent" split.
  const hasMarkers = title.includes('*')
  const [lead, ...rest] = title.split(',')
  const accent = hasMarkers ? '' : rest.join(',').trim()

  return (
    <RoundedPhotoHero
      breadcrumbs={[{ name: 'Home', href: '/' }, { name: 'Locations' }]}
      eyebrow={eyebrow}
      title={
        accent ? (
          <>
            {lead},<span className="block text-accent">{accent}</span>
          </>
        ) : (
          <AccentText text={title} />
        )
      }
      description={description}
      image={image || '/media/locations/globe-hero.png'}
      imageAlt={imageAlt}
    />
  )
}
