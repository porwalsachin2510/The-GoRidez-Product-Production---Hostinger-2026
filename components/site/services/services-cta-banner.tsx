import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/site/primitives'
import { Reveal } from '@/components/site/reveal'

type Cta = { label?: string; href?: string } | undefined

export function ServicesCtaBanner({
  primary,
  secondary,
  eyebrow,
  title = 'Ready to move your workforce with confidence?',
  description = "Tell us about your routes and headcount. We'll design a transport programme that fits your operation.",
  showSecondary = true,
}: {
  primary?: Cta
  secondary?: Cta
  eyebrow?: string
  title?: string
  description?: string
  showSecondary?: boolean
}) {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <Reveal>
          <div className="relative isolate grid overflow-hidden rounded-3xl bg-gradient-to-r from-navy via-navy to-teal text-white shadow-2xl shadow-primary/20 lg:grid-cols-2">
            <div className="relative z-10 px-8 py-12 sm:px-12 sm:py-14">
              {eyebrow && (
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  {eyebrow}
                </span>
              )}
              <h2 className="mt-3 max-w-md font-display text-3xl font-bold leading-tight tracking-tight text-balance">
                {title}
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80 text-pretty">
                {description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={primary?.href || '/contact'}
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg transition hover:brightness-110"
                >
                  {primary?.label || 'Get a Quote'}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
                {showSecondary && (
                  <Link
                    href={secondary?.href || '/contact'}
                    className="group inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    Talk to our team
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </Link>
                )}
              </div>
            </div>
            <div className="relative min-h-56 lg:min-h-0">
              <Image
                src="/images/services-cta-vehicles.png"
                alt="GoRidez coach and sedan"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-navy via-transparent to-transparent lg:bg-gradient-to-r" />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
