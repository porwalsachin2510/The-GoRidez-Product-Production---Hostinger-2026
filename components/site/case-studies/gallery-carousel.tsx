'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Eyebrow } from '@/components/site/case-studies/case-study-sections'

export function GalleryCarousel({ images, title }: { images: string[]; title: string }) {
  const trackRef = useRef<HTMLDivElement>(null)

  function scrollBy(direction: 1 | -1) {
    const track = trackRef.current
    if (!track) return
    const slide = track.querySelector<HTMLElement>('[data-slide]')
    const step = slide ? slide.offsetWidth + 20 : track.clientWidth
    track.scrollBy({ left: step * direction, behavior: 'smooth' })
  }

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <Eyebrow>On the ground</Eyebrow>
          <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
            From the programme
          </h2>
        </div>
        {images.length > 1 && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Previous photo"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-navy transition hover:border-accent hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Next photo"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-navy transition hover:border-accent hover:text-accent"
            >
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
      <div
        ref={trackRef}
        className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((src, i) => (
          <div
            key={src + i}
            data-slide
            className="relative aspect-[16/7] w-[85%] shrink-0 snap-start overflow-hidden rounded-2xl border border-border sm:w-[calc(50%-0.625rem)]"
          >
            <Image
              src={src}
              alt={`${title} — photo ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 85vw, 50vw"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
