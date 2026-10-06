import { LockKeyhole, ShieldCheck } from 'lucide-react'

export const PRIVACY_BANNER_DEFAULTS = {
  title: 'Your privacy. Our priority.',
  text: 'We follow the Kuwait Personal Data Protection Law and global best practices to keep your data safe.',
}

export function PrivacyBanner({
  title = PRIVACY_BANNER_DEFAULTS.title,
  text = PRIVACY_BANNER_DEFAULTS.text,
}: {
  title?: string
  text?: string
}) {
  return (
    <div className="relative isolate mt-8 flex items-center gap-5 overflow-hidden rounded-2xl border border-accent/20 bg-accent/10 px-6 py-6 sm:px-8">
      <ShieldCheck className="h-11 w-11 shrink-0 text-accent" strokeWidth={1.5} aria-hidden="true" />
      <div>
        <p className="font-display text-xl font-semibold text-foreground">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{text}</p>
      </div>
      <div
        aria-hidden="true"
        className="absolute right-8 top-1/2 -z-10 hidden -translate-y-1/2 items-center gap-6 text-accent/30 md:flex"
      >
        <span className="h-px w-40 border-t-2 border-dashed border-accent/30" />
        <span className="relative flex h-16 w-14 items-center justify-center">
          <svg viewBox="0 0 24 24" className="absolute inset-0 h-full w-full" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M12 2 4 5v6c0 5 3.4 9.5 8 11 4.6-1.5 8-6 8-11V5l-8-3Z" />
          </svg>
          <LockKeyhole className="h-5 w-5" strokeWidth={1.5} />
        </span>
      </div>
    </div>
  )
}
