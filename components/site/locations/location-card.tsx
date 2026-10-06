import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Building2, Flag, Globe2, MapPin, Mountain, type LucideIcon } from 'lucide-react'
import type { LocationData } from '@/lib/data/queries'

type Visual = { icon: LucideIcon; image?: string | null }

function visualFor(loc: LocationData): Visual {
  const key = `${loc.countryCode ?? ''} ${loc.name} ${loc.slug}`.toLowerCase()
  if (loc.isPrimary) return { icon: Building2, image: '/media/locations/kuwait-towers.png' }
  if (key.includes('kuwait') || key.includes(' kw')) return { icon: Flag, image: '/media/locations/kuwait-skyline.png' }
  if (key.includes('india') || key.startsWith('in ')) return { icon: Globe2, image: '/media/locations/india-gate.png' }
  if (key.includes('nepal') || key.startsWith('np ')) return { icon: Mountain, image: '/media/locations/nepal-pagoda.png' }
  return { icon: MapPin, image: loc.heroImage }
}

export function LocationCard({ location }: { location: LocationData }) {
  const { icon: Icon, image } = visualFor(location)
  const label = `${location.type || 'Location'}${location.isPrimary ? ' • HQ' : ''}`

  return (
    <Link
      href={`/locations/${location.slug}`}
      className="group relative flex h-full min-h-64 overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {image && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-[45%] [mask-image:linear-gradient(to_right,transparent,black_35%)]"
        >
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 1024px) 18vw, 40vw"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <div className="relative flex w-full flex-col p-6 sm:w-[64%] sm:p-7">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-md shadow-accent/30">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>

        <span className="mt-7 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">{label}</span>
        <h2 className="mt-1.5 font-display text-2xl font-bold text-foreground">{location.name}</h2>
        {location.excerpt && (
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground text-pretty">{location.excerpt}</p>
        )}

        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
          Explore {location.name}
          <ArrowUpRight
            className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  )
}
