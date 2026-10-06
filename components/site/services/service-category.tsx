import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, CircleCheck, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Container } from '@/components/site/primitives'
import { Reveal } from '@/components/site/reveal'
import { ServiceCard } from '@/components/site/services/service-card'
import type { ServiceData } from '@/lib/data/queries'

function RouteDecoration() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute bottom-6 right-6 hidden h-40 w-[28rem] text-accent lg:block"
    >
      <svg viewBox="0 0 440 160" fill="none" className="h-full w-full">
        <path
          d="M40 150 C 20 110, 60 70, 110 90 S 200 150, 230 110 S 180 40, 250 50 S 380 60, 420 20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="5 6"
          opacity="0.6"
        />
      </svg>
      <MapPin className="absolute -right-1 -top-4 h-7 w-7 fill-accent text-white" />
    </div>
  )
}

export function ServiceCategory({
  parent,
  items,
  index,
}: {
  parent: ServiceData
  items: ServiceData[]
  index: number
}) {
  const tinted = index % 2 === 1
  const hasChildren = items.length > 0
  const leavesGap = hasChildren && items.length % 3 !== 0

  return (
    <section className={cn('py-8 sm:py-10', index === 0 && 'pt-16 sm:pt-20')}>
      <Container>
        <div
          className={cn(
            'relative grid gap-8 rounded-3xl lg:grid-cols-[17rem_1fr] lg:gap-10',
            tinted ? 'bg-accent/[0.06] p-6 sm:p-10' : 'px-0 py-4 sm:py-6',
          )}
        >
          <Reveal>
            <div className="flex h-full flex-col lg:py-2">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Category {String(index + 1).padStart(2, '0')}
              </span>
              <h2 className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight text-foreground text-balance">
                <Link href={`/services/${parent.slug}`} className="transition-colors hover:text-accent">
                  {parent.title}
                </Link>
              </h2>
              {parent.excerpt && (
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground text-pretty">
                  {parent.excerpt}
                </p>
              )}
              <Link
                href={`/services/${parent.slug}`}
                className="group mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
              >
                Explore Category
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          {hasChildren ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((child, i) => (
                <Reveal key={child._id} delay={i * 0.05}>
                  <ServiceCard service={child} index={i} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <div className="grid items-center gap-6 rounded-2xl border border-border bg-card p-5 shadow-sm md:grid-cols-[1.1fr_1fr] md:gap-8">
                {parent.heroImage && (
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                    <Image
                      src={parent.heroImage}
                      alt={parent.title}
                      fill
                      sizes="(min-width: 1024px) 30vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-teal/40 mix-blend-multiply" />
                  </div>
                )}
                <ul className="space-y-4">
                  {(parent.features ?? []).map((f) => (
                    <li key={f.title} className="flex items-start gap-3 text-sm">
                      <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 fill-accent text-white" aria-hidden="true" />
                      <span>
                        <span className="font-medium text-foreground">{f.title}</span>
                        {f.description && (
                          <span className="text-muted-foreground"> — {f.description}</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}

          {tinted && leavesGap && <RouteDecoration />}
        </div>
      </Container>
    </section>
  )
}
