'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Container, SectionHeading } from '@/components/site/primitives'
import type { ClientData } from '@/lib/data/queries'

/**
 * Logo trust rail rendered as a continuous marquee. Uses the real published
 * clients from the CMS; falls back to a lettered mark when a client has no
 * uploaded logo. Renders nothing when there are no clients.
 */
function LogoMark({ client }: { client: ClientData }) {
  return (
    <div className="mx-3 flex h-20 w-44 shrink-0 items-center justify-center gap-3 rounded-2xl border border-border bg-card px-5 shadow-sm">
      {client.logo ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={client.logo}
          alt={`${client.name} logo`}
          className="h-9 w-auto max-w-[120px] object-contain opacity-80 grayscale transition group-hover:opacity-100"
          loading="lazy"
        />
      ) : (
        <>
          <span
            aria-hidden="true"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-accent/15 to-primary/15 font-display text-base font-bold text-primary"
          >
            {client.name.trim().charAt(0).toUpperCase() || 'C'}
          </span>
          <span className="line-clamp-2 text-sm font-semibold leading-tight text-foreground">
            {client.name}
          </span>
        </>
      )}
    </div>
  )
}

export function ClientCarousel({
  clients,
  title = 'Enterprises that move with GoRidez',
}: {
  clients: ClientData[]
  title?: string
}) {
  const reduce = useReducedMotion()
  if (!clients?.length) return null

  const loop = [...clients, ...clients]

  return (
    <section className="py-14 sm:py-16">
      <Container>
        <SectionHeading align="center" title={title} className="mb-10" />
      </Container>

      <div
        className="group relative overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
      >
        <motion.div
          className="flex w-max"
          animate={reduce ? undefined : { x: ['0%', '-50%'] }}
          transition={{ duration: 32, ease: 'linear', repeat: Infinity }}
        >
          {loop.map((c, i) => (
            <LogoMark key={`${c._id}-${i}`} client={c} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
