'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Navigation, Star, Bus } from 'lucide-react'
import { Container } from '@/components/site/primitives'
import { staggerContainer, fadeUp, scaleIn, EASE_OUT } from '@/components/site/motion'
import type { SiteSettingsData } from '@/lib/data/queries'

/* --------------------- Mini animated live route map ---------------------- */

function LiveRouteMap({ reduce }: { reduce: boolean | null }) {
  return (
    <svg viewBox="0 0 200 70" className="h-full w-full" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <line
          key={`h${i}`}
          x1="0"
          x2="200"
          y1={i * 22}
          y2={i * 22}
          className="stroke-border"
          strokeWidth="0.5"
        />
      ))}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <line
          key={`v${i}`}
          y1="0"
          y2="70"
          x1={i * 30}
          x2={i * 30}
          className="stroke-border"
          strokeWidth="0.5"
        />
      ))}
      <motion.path
        d="M12 56 C 56 56, 56 20, 100 20 S 156 16, 188 12"
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
        className="stroke-accent"
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, delay: 0.8, ease: EASE_OUT }}
      />
      <circle cx="12" cy="56" r="4" className="fill-primary" />
      <circle cx="188" cy="12" r="4" className="fill-accent" />
      {!reduce && (
        <motion.circle
          cx="188"
          cy="12"
          r="4"
          className="fill-accent"
          initial={{ scale: 1, opacity: 0.7 }}
          animate={{ scale: 2.6, opacity: 0 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
          style={{ transformOrigin: '188px 12px' }}
        />
      )}
    </svg>
  )
}

type HeroCms = {
  heroTitle?: string
  heroSubtitle?: string
  heroImage?: string | null
  heroImageAlt?: string
} | null

function AccentLastWord({ title }: { title: string }) {
  const cut = title.trim().lastIndexOf(' ')
  if (cut < 0) return <span className="text-accent">{title}</span>
  return (
    <>
      {title.slice(0, cut)} <span className="text-accent">{title.slice(cut + 1)}</span>
    </>
  )
}

export function Hero({ settings, page }: { settings: SiteSettingsData; page?: HeroCms }) {
  const reduce = useReducedMotion()
  const { ctaPrimary } = settings

  return (
    <section className="relative isolate overflow-hidden bg-background">
      {/* Ambient brand aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-48 h-[42rem] w-[42rem] rounded-full bg-accent/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-40 h-[32rem] w-[32rem] rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:radial-gradient(var(--color-foreground)_1px,transparent_1px)] [background-size:30px_30px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]"
      />

      <Container className="relative grid items-center gap-14 pt-32 pb-20 lg:grid-cols-[1.02fr_1fr] lg:gap-12 lg:pt-36 lg:pb-28">
        {/* -------------------------------- Copy -------------------------------- */}
        <motion.div variants={staggerContainer} initial="hidden" animate="show">
          <motion.h1
            variants={fadeUp}
            className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-balance text-foreground sm:text-5xl lg:text-[3.75rem]"
          >
            {page?.heroTitle ? (
              <AccentLastWord title={page.heroTitle} />
            ) : (
              <>
                Move your workforce across <span className="text-accent">Kuwait</span> with{' '}
                <span className="text-accent">confidence.</span>
              </>
            )}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground"
          >
            {page?.heroSubtitle
              ? page.heroSubtitle
              : settings.tagline
              ? `${settings.tagline} — reliable transport, 24/7 operations and complete visibility so your people reach every destination safely, on time.`
              : 'Reliable transport solutions, 24/7 operations and complete visibility — so your people reach every destination safely, on time.'}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-4">
            {ctaPrimary?.href && (
              <Link
                href={ctaPrimary.href}
                target={ctaPrimary.external ? '_blank' : undefined}
                rel={ctaPrimary.external ? 'noopener noreferrer' : undefined}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/25 transition-all hover:-translate-y-0.5 hover:brightness-110"
              >
                {ctaPrimary.label || 'Get a Quote'}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:border-accent/50 hover:text-accent"
            >
              Explore Solutions
            </Link>
          </motion.div>

          {/* Avatar trust row */}
          <motion.div variants={fadeUp} className="mt-9 flex items-center gap-4">
            <div className="flex -space-x-3">
              {['bg-primary', 'bg-accent', 'bg-primary/80', 'bg-accent/80', 'bg-primary/60'].map(
                (c, i) => (
                  <span
                    key={i}
                    className={`grid h-9 w-9 place-items-center rounded-full ${c} text-[11px] font-bold text-white ring-2 ring-background`}
                    aria-hidden="true"
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                ),
              )}
            </div>
            <div className="leading-tight">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                ))}
              </div>
              <span className="mt-1 block text-sm text-muted-foreground">
                Trusted by 50+ enterprises across Kuwait
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* ------------------------------- Visual ------------------------------- */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="show"
          className="relative mx-auto w-full max-w-2xl lg:max-w-none"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-border bg-muted shadow-2xl shadow-primary/20">
            <Image
              src={page?.heroImage || '/images/hero-fleet-lineup.png'}
              alt={page?.heroImageAlt || 'GoRidez corporate fleet — coach, van and executive sedan on a Kuwait highway'}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent" />
          </div>

          {/* Live Operations card (top-right) */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: EASE_OUT }}
            className="absolute -right-3 top-8 hidden w-56 rounded-2xl border border-border bg-card/90 p-4 shadow-xl backdrop-blur-xl sm:block"
            aria-hidden="true"
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, -7, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                  Live Operations
                </span>
              </div>
              <div className="mt-3 space-y-3">
                <div>
                  <div className="text-[11px] text-muted-foreground">On-Time Performance</div>
                  <div className="font-display text-xl font-bold text-foreground">98.6%</div>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-2.5">
                  <div>
                    <div className="text-[11px] text-muted-foreground">Active Vehicles</div>
                    <div className="font-display text-xl font-bold text-foreground">162</div>
                  </div>
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent/12 text-accent">
                    <Bus className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Live Tracking card (bottom-left) */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: EASE_OUT }}
            className="absolute -left-4 bottom-10 hidden w-60 rounded-2xl border border-border bg-card/90 p-4 shadow-xl backdrop-blur-xl sm:block"
            aria-hidden="true"
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, 7, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  <Navigation className="h-3.5 w-3.5 text-accent" />
                  Live Tracking
                </span>
              </div>
              <div className="h-[60px] w-full overflow-hidden rounded-lg bg-secondary/50">
                <LiveRouteMap reduce={reduce} />
              </div>
              <div className="mt-2 text-[11px] font-semibold text-accent">All routes on time</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
