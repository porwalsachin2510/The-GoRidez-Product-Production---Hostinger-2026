import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { ArrowRight } from "lucide-react"
import { ContactForm } from "@/components/site/forms"
import { MapEmbed } from "@/components/site/map-embed"

export type ContactItem = { icon: LucideIcon; label: string; value: string; href?: string }

export function ContactInfoCard({
  items,
  title = 'Get in touch',
  children,
}: {
  items: ContactItem[]
  title?: string
  children?: React.ReactNode
}) {
  return (
    <aside className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div
        aria-hidden="true"
        className="absolute right-0 top-0 h-32 w-40 bg-[radial-gradient(circle,color-mix(in_oklch,var(--navy)_18%,transparent)_1px,transparent_1.5px)] [background-size:10px_10px] [mask-image:linear-gradient(to_bottom_left,black,transparent)]"
      />
      <h2 className="relative font-display text-xl font-semibold text-foreground">{title}</h2>
      <ul className="relative mt-6 flex flex-col gap-4">
        {items.map((item) => (
          <li
            key={item.label}
            className="flex items-center gap-4 rounded-xl border border-border/60 bg-background p-4 shadow-[0_4px_16px_-8px_rgba(15,23,42,0.12)]"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <item.icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{item.label}</p>
              {item.href ? (
                <a
                  href={item.href}
                  className="mt-0.5 block break-words text-sm font-semibold text-foreground transition-colors hover:text-accent"
                >
                  {item.value}
                </a>
              ) : (
                <p className="mt-0.5 text-sm font-semibold leading-relaxed text-foreground">{item.value}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
      {children ? <div className="relative mt-6">{children}</div> : null}
    </aside>
  )
}

export function ContactFormPanel() {
  return (
    <div className="rounded-2xl bg-navy p-6 text-white shadow-xl sm:p-8">
      <h2 className="font-display text-2xl font-semibold">Send us a message</h2>
      <p className="mt-2 text-sm text-white/70">
        Tell us how we can help and our team will reply within one business day.
      </p>
      <Link href="/get-quote" className="mt-1 inline-block text-sm font-semibold text-accent hover:underline">
        Request a quote.
      </Link>
      <div className="mt-6">
        <ContactForm tone="dark" />
      </div>
    </div>
  )
}

export function ContactMap({ address, title }: { address: string; title: string }) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
  return (
    <div className="mt-12">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-xl font-semibold text-foreground">Find us</h2>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-navy shadow-sm transition-colors hover:border-accent hover:text-accent"
        >
          Open in Google Maps
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
      <MapEmbed query={address} title={title} className="h-[320px] overflow-hidden rounded-2xl shadow-sm sm:h-[360px]" />
    </div>
  )
}
