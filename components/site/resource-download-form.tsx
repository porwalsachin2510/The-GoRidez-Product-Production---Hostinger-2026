"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { CheckCircle2, Download } from "lucide-react"
import { requestResourceDownload, type ResourceDownloadState } from "@/app/actions/resources"

const initialState: ResourceDownloadState = { ok: false }

const inputCls =
  "w-full rounded-lg border border-white/20 bg-white/5 px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-accent focus:ring-2 focus:ring-accent/30"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-lg shadow-accent/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Preparing download…" : "Unlock download"}
      <Download className="h-4 w-4" aria-hidden="true" />
    </button>
  )
}

/** Gated lead-capture form for a resource, styled for the dark navy panel. */
export function ResourceDownloadForm({ resourceId }: { resourceId: string }) {
  const [state, action] = useActionState(requestResourceDownload, initialState)

  if (state.ok && state.downloadUrl) {
    return (
      <div className="flex flex-col gap-4 rounded-xl border border-accent/40 bg-accent/10 p-5">
        <p className="flex items-start gap-2 text-sm font-medium text-white">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
          {state.message}
        </p>
        <a
          href={state.downloadUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground transition hover:brightness-110"
        >
          Download resource
          <Download className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    )
  }

  return (
    <form action={action} className="flex flex-col gap-4">
      <input type="hidden" name="resourceId" value={resourceId} />
      <label className="flex flex-col gap-1.5 text-xs font-medium text-white/85">
        Name (optional)
        <input name="name" maxLength={120} className={inputCls} placeholder="Your name" autoComplete="name" />
      </label>
      <label className="flex flex-col gap-1.5 text-xs font-medium text-white/85">
        Company (optional)
        <input name="company" className={inputCls} placeholder="Company name" autoComplete="organization" />
      </label>
      <label className="flex flex-col gap-1.5 text-xs font-medium text-white/85">
        Work email
        <input
          name="email"
          type="email"
          required
          maxLength={160}
          className={inputCls}
          placeholder="you@company.com"
          autoComplete="email"
        />
        {state.errors?.email ? <span className="text-xs font-normal text-red-300">{state.errors.email}</span> : null}
      </label>
      <label className="flex items-start gap-2.5 text-xs leading-relaxed text-white/80">
        <input name="consent" type="checkbox" required className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent)]" />
        <span>I agree to receive this resource and occasional mobility insights from GoRidez.</span>
      </label>
      {state.errors?.consent || state.message ? (
        <p className="text-sm text-red-300">{state.errors?.consent ?? state.message}</p>
      ) : null}
      <SubmitButton />
    </form>
  )
}
