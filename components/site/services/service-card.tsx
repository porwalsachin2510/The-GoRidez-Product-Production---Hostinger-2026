import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Icon } from '@/lib/icons'
import type { ServiceData } from '@/lib/data/queries'

export function ServiceCard({ service, index }: { service: ServiceData; index: number }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/10"
    >
      <div className="flex items-start justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
          <Icon name={service.icon} hint={service.title} className="h-5 w-5" />
        </span>
        <span className="font-display text-2xl font-bold text-foreground/[0.07]" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <h3 className="mt-6 font-display text-base font-semibold leading-snug text-foreground">
        {service.title}
      </h3>
      {service.excerpt && (
        <p className="mt-3 line-clamp-4 flex-1 text-sm leading-relaxed text-muted-foreground">
          {service.excerpt}
        </p>
      )}
      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
        Learn More
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  )
}
