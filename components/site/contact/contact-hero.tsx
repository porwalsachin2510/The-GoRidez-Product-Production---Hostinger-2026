import Image from "next/image"
import { Headphones, ShieldCheck, Users } from "lucide-react"
import { Container } from "@/components/site/primitives"
import { Reveal } from "@/components/site/reveal"

const HIGHLIGHTS = [
  { icon: Headphones, title: "Quick Response", text: "We reply within one business day" },
  { icon: ShieldCheck, title: "RTA Compliant", text: "Safe, insured and RTA-compliant fleet" },
  { icon: Users, title: "Tailored Solutions", text: "Solutions built around your business needs" },
]

function splitTitle(title: string) {
  const match = title.match(/^(.*?\byour)\s+(.+)$/i)
  return match ? { lead: match[1], highlight: match[2] } : { lead: title, highlight: "" }
}

export function ContactHero({
  eyebrow,
  title,
  description,
  image,
}: {
  eyebrow: string
  title: string
  description: string
  image: string
}) {
  const { lead, highlight } = splitTitle(title)

  return (
    <section className="relative isolate overflow-hidden bg-navy pt-20 text-white lg:pt-[7.5rem]">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,color-mix(in_oklch,var(--accent)_16%,transparent),transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="absolute left-0 top-20 -z-10 h-40 w-64 bg-[radial-gradient(circle,rgba(255,255,255,0.18)_1px,transparent_1.5px)] [background-size:12px_12px] [mask-image:linear-gradient(to_bottom_right,black,transparent)] lg:top-[7.5rem]"
      />
      <div className="grid lg:grid-cols-2">
        <Container className="py-14 sm:py-16 lg:mr-0 lg:max-w-[40rem] lg:py-20 lg:pr-10">
          <Reveal>
            <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              <span aria-hidden="true" className="h-px w-4 bg-accent" />
              {eyebrow}
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.1] tracking-tight text-balance sm:text-5xl lg:text-[3.25rem]">
              {lead}
              {highlight && <span className="block text-accent">{highlight}</span>}
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/80 text-pretty">{description}</p>

            <ul className="mt-10 grid gap-5 sm:grid-cols-3">
              {HIGHLIGHTS.map(({ icon: Icon, title: t, text }) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{t}</p>
                    <p className="mt-1 text-xs leading-relaxed text-white/65">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>

        <div className="relative min-h-[18rem] sm:min-h-[24rem] lg:min-h-full">
          <div className="absolute inset-0 overflow-hidden rounded-tl-[6rem] lg:rounded-l-[10rem]">
            <Image
              src={image}
              alt="GoRidez executive chauffeur service"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-navy/40 via-transparent to-transparent" />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-3 -top-3 bottom-0 right-0 rounded-tl-[6.5rem] border-l-2 border-t-2 border-accent/70 lg:-bottom-3 lg:rounded-l-[10.5rem] lg:border-b-2"
          />
        </div>
      </div>
    </section>
  )
}
