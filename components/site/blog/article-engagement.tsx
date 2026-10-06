"use client"

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react"
import { Check, Eye, Facebook, Hand, Link2, Linkedin, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"

function formatCount(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`
  return String(n)
}

interface EngagementState {
  slug: string
  title: string
  claps: number
  userClaps: number
  maxClaps: number
  views: number
  commentCount: number
  setCommentCount: (n: number) => void
  shareUrl: string
  copied: boolean
  clap: () => void
  copyLink: () => void
}

const EngagementContext = createContext<EngagementState | null>(null)

export function useEngagement() {
  return useContext(EngagementContext)
}

/**
 * Shared engagement state for one article so the top and bottom bars stay in
 * sync and the de-duplicated view is recorded once per page. Wires the real
 * backend: GET/POST /clap (per-visitor cap) and POST /view. The approved
 * comment count is reported by <ArticleComments> once it loads.
 */
export function EngagementProvider({
  slug,
  title,
  initialClaps,
  initialViews,
  children,
}: {
  slug: string
  title: string
  initialClaps: number
  initialViews: number
  children: ReactNode
}) {
  const [claps, setClaps] = useState(initialClaps)
  const [userClaps, setUserClaps] = useState(0)
  const [maxClaps, setMaxClaps] = useState(50)
  const [views, setViews] = useState(initialViews)
  const [commentCount, setCommentCount] = useState(0)
  const [copied, setCopied] = useState(false)
  const [shareUrl, setShareUrl] = useState("")

  useEffect(() => {
    setShareUrl(window.location.href)
  }, [])

  const pendingRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    let active = true
    ;(async () => {
      const [viewRes, clapRes] = await Promise.all([
        fetch(`/api/blog/${slug}/view`, { method: "POST" }).then((r) => r.json()).catch(() => null),
        fetch(`/api/blog/${slug}/clap`).then((r) => r.json()).catch(() => null),
      ])
      if (!active) return
      if (viewRes && typeof viewRes.views === "number") setViews(viewRes.views)
      if (clapRes) {
        if (typeof clapRes.claps === "number") setClaps(clapRes.claps)
        if (typeof clapRes.userClaps === "number") setUserClaps(clapRes.userClaps)
        if (typeof clapRes.max === "number") setMaxClaps(clapRes.max)
      }
    })()
    return () => {
      active = false
    }
  }, [slug])

  const flushClaps = useCallback(() => {
    const add = pendingRef.current
    pendingRef.current = 0
    if (add <= 0) return
    fetch(`/api/blog/${slug}/clap`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ add }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data && typeof data.claps === "number") setClaps(data.claps)
        if (data && typeof data.userClaps === "number") setUserClaps(data.userClaps)
      })
      .catch(() => {})
  }, [slug])

  const clap = useCallback(() => {
    setUserClaps((c) => {
      if (c >= maxClaps) return c
      pendingRef.current += 1
      setClaps((total) => total + 1)
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(flushClaps, 700)
      return c + 1
    })
  }, [maxClaps, flushClaps])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard blocked */
    }
  }, [])

  return (
    <EngagementContext.Provider
      value={{
        slug,
        title,
        claps,
        userClaps,
        maxClaps,
        views,
        commentCount,
        setCommentCount,
        shareUrl,
        copied,
        clap,
        copyLink,
      }}
    >
      {children}
    </EngagementContext.Provider>
  )
}

const shareBtn =
  "inline-flex h-8 w-8 items-center justify-center rounded-full border border-primary/30 text-primary transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"

/** Engagement strip: views, responses and claps on the left, share links on the right. */
export function EngagementBar() {
  const ctx = useContext(EngagementContext)
  if (!ctx) return null
  const { claps, userClaps, maxClaps, views, commentCount, copied, clap, copyLink, title, shareUrl } = ctx
  const capped = userClaps >= maxClaps
  const encodedUrl = encodeURIComponent(shareUrl)

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card px-3 py-2.5 shadow-sm">
      <div className="flex items-center gap-1.5">
        <span
          className="inline-flex items-center gap-2 rounded-full bg-muted px-3.5 py-1.5 text-xs font-semibold text-foreground"
          title={`${views} unique views`}
        >
          <Eye className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">Views:</span>
          {formatCount(views)}
        </span>
        <a
          href="#comments-heading"
          className="inline-flex items-center gap-2 rounded-full bg-muted px-3.5 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-accent/15"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">Responses:</span>
          {formatCount(commentCount)}
        </a>
        <button
          type="button"
          onClick={clap}
          disabled={capped}
          aria-label={capped ? "You've given the maximum claps" : "Clap for this article"}
          title={capped ? "Max claps reached" : `Clap (${userClaps}/${maxClaps})`}
          className={cn(
            "group inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors",
            userClaps > 0 ? "bg-accent text-accent-foreground" : "bg-muted text-foreground hover:bg-accent/15",
            capped && "opacity-70",
          )}
        >
          <Hand className="h-4 w-4 transition-transform group-active:scale-125" aria-hidden="true" />
          {formatCount(claps)}
        </button>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <span className="hidden text-xs text-muted-foreground sm:inline">Share this article</span>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
          className={shareBtn}
        >
          <Facebook className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodeURIComponent(title)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on LinkedIn"
          className={shareBtn}
        >
          <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
        <button type="button" onClick={copyLink} aria-label="Copy article link" className={shareBtn}>
          {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Link2 className="h-3.5 w-3.5" aria-hidden="true" />}
        </button>
      </div>
    </div>
  )
}
