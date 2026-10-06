"use client"

import { useActionState } from "react"
import { saveSettings, type SettingsState } from "@/app/actions/settings"
import { ImageField } from "@/components/admin/image-field"
import { MenuBuilder } from "@/components/admin/menu-builder"
import { StatsEditor } from "@/components/admin/stats-editor"
import type { NavItem, FooterColumn, LinkGroup } from "@/lib/data/queries"

const inputCls =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"

function Field({ name, label, defaultValue, placeholder }: { name: string; label: string; defaultValue?: string; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
      </label>
      <input id={name} name={name} defaultValue={defaultValue} placeholder={placeholder} className={inputCls} />
    </div>
  )
}

function UploadField({
  name,
  label,
  defaultValue,
  help,
}: {
  name: string
  label: string
  defaultValue?: string
  help?: string
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-foreground">{label}</label>
      <ImageField name={name} defaultValue={defaultValue} mode="image" />
      {help ? <p className="mt-2 text-xs text-muted-foreground">{help}</p> : null}
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <h2 className="mb-4 font-display text-lg font-semibold text-foreground">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </section>
  )
}

type Settings = Record<string, string>

export function SettingsForm({
  settings,
  stats,
  navigation,
  footerColumns,
  destinations,
}: {
  settings: Settings
  stats: { value: string; label: string }[]
  navigation: NavItem[]
  footerColumns: FooterColumn[]
  destinations: LinkGroup[]
}) {
  const [state, action] = useActionState<SettingsState, FormData>(saveSettings, null)

  return (
    <form action={action} className="space-y-6">
      <Section title="Company">
        <Field name="companyName" label="Company name" defaultValue={settings.companyName} />
        <Field name="tagline" label="Tagline" defaultValue={settings.tagline} />
      </Section>

      <Section title="Contact">
        <Field name="email" label="Email" defaultValue={settings.email} />
        <Field name="phone" label="Phone" defaultValue={settings.phone} />
        <Field name="whatsapp" label="WhatsApp number" defaultValue={settings.whatsapp} placeholder="+9715..." />
        <Field name="address" label="Address" defaultValue={settings.address} />
        <Field
          name="businessHours"
          label="Business hours"
          defaultValue={settings.businessHours}
          placeholder="Sun–Thu, 8:00–18:00"
        />
      </Section>

      <Section title="Header top bar & footer text">
        <Field
          name="topBarText"
          label="Top bar message"
          defaultValue={settings.topBarText}
          placeholder="24/7 operations across Kuwait. Always on the move for your business."
        />
        <Field name="brandSlogan" label="Brand slogan (under logo)" defaultValue={settings.brandSlogan} placeholder="Driven by Trust" />
        <Field name="footerExpertLabel" label="Footer secondary button label" defaultValue={settings.footerExpertLabel} placeholder="Talk to an Expert" />
        <Field name="newsletterTitle" label="Newsletter heading" defaultValue={settings.newsletterTitle} placeholder="Mobility insights, straight to your inbox" />
        <Field
          name="newsletterText"
          label="Newsletter description"
          defaultValue={settings.newsletterText}
          placeholder="Practical guidance on corporate transport, free-zone logistics and workforce mobility. No spam — unsubscribe anytime."
        />
        <Field name="copyrightText" label="Copyright text (year & company added automatically)" defaultValue={settings.copyrightText} placeholder="All rights reserved." />
      </Section>

      <Section title="Branding & calls to action">
        <UploadField
          name="logo"
          label="Primary logo"
          defaultValue={settings.logo}
          help="Dark version shown on light backgrounds (header when scrolled). Upload a PNG or SVG."
        />
        <UploadField
          name="logoMark"
          label="Inverted logo"
          defaultValue={settings.logoMark}
          help="Light/white version shown on dark backgrounds (hero header & footer)."
        />
        <Field name="ctaPrimary.label" label="Primary button label" defaultValue={settings.ctaPrimaryLabel} placeholder="Request a quote" />
        <Field name="ctaPrimary.href" label="Primary button link" defaultValue={settings.ctaPrimaryHref} placeholder="/contact" />
        <Field name="ctaSecondary.label" label="Secondary button label" defaultValue={settings.ctaSecondaryLabel} placeholder="Book now" />
        <Field name="ctaSecondary.href" label="Secondary button link" defaultValue={settings.ctaSecondaryHref} placeholder="/book-demo" />
      </Section>

      <Section title="Live chat">
        <Field name="chat.number" label="WhatsApp number" defaultValue={settings.chatNumber} placeholder="+9715..." />
        <Field name="chat.message" label="Opening message" defaultValue={settings.chatMessage} />
        <label className="flex items-center gap-2 text-sm text-foreground"><input name="chat.enabled" type="checkbox" value="true" defaultChecked={settings.chatEnabled !== "false"} /> Enable chat widget</label>
        <label className="flex items-center gap-2 text-sm text-foreground"><input name="chat.consentRequired" type="checkbox" value="true" defaultChecked={settings.chatConsentRequired !== "false"} /> Ask for consent before opening WhatsApp</label>
        <input type="hidden" name="chat.provider" value="whatsapp" />
      </Section>

      <Section title="Social profiles">
        <Field name="social.linkedin" label="LinkedIn" defaultValue={settings.linkedin} />
        <Field name="social.instagram" label="Instagram" defaultValue={settings.instagram} />
        <Field name="social.facebook" label="Facebook" defaultValue={settings.facebook} />
        <Field name="social.youtube" label="YouTube" defaultValue={settings.youtube} />
        <Field name="social.twitter" label="X / Twitter" defaultValue={settings.twitter} />
      </Section>

      <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <h2 className="mb-1 font-display text-lg font-semibold text-foreground">Menus &amp; footer</h2>
        <p className="mb-4 text-xs text-muted-foreground">
          Build the header navigation and footer visually. Every page and piece of content on your
          site appears in the left panel — add it to the navbar or a footer column, then drag to
          arrange. Newly created pages and services show up here automatically.
        </p>
        <MenuBuilder navigation={navigation} footerColumns={footerColumns} destinations={destinations} />
      </section>

      <section className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <h2 className="mb-1 font-display text-lg font-semibold text-foreground">Performance stats</h2>
        <p className="mb-4 text-xs text-muted-foreground">
          The numbers shown in the blue stats strip on the home and about pages (for example &ldquo;13+ Years of operating heritage&rdquo;).
        </p>
        <StatsEditor initial={stats} />
      </section>

      <div className="flex items-center gap-3">
        <button type="submit" className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground">
          Save settings
        </button>
        {state?.success ? <span className="text-sm text-emerald-600">{state.success}</span> : null}
        {state?.error ? <span className="text-sm text-red-600">{state.error}</span> : null}
      </div>
    </form>
  )
}
