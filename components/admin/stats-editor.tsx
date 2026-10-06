"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react"

type Stat = { value: string; label: string }

const inputCls =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"

/** Form-based editor for the trust stats strip; serialises to a hidden `stats` field. */
export function StatsEditor({ initial }: { initial: Stat[] }) {
  const [rows, setRows] = useState<Stat[]>(
    initial.length ? initial.map(({ value, label }) => ({ value: value ?? "", label: label ?? "" })) : [],
  )

  const update = (i: number, patch: Partial<Stat>) =>
    setRows((r) => r.map((row, idx) => (idx === i ? { ...row, ...patch } : row)))
  const move = (i: number, dir: -1 | 1) =>
    setRows((r) => {
      const j = i + dir
      if (j < 0 || j >= r.length) return r
      const next = [...r]
      ;[next[i], next[j]] = [next[j], next[i]]
      return next
    })

  const clean = rows.filter((r) => r.value.trim() || r.label.trim())

  return (
    <div>
      <input type="hidden" name="stats" value={JSON.stringify(clean)} />
      {rows.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
          No stats yet. Add one below.
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {rows.map((row, i) => (
            <li key={i} className="grid gap-3 rounded-lg border border-border bg-background p-3 sm:grid-cols-[140px_1fr_auto] sm:items-end">
              <div>
                <label htmlFor={`stat-value-${i}`} className="mb-1 block text-xs font-medium text-muted-foreground">
                  Number / value
                </label>
                <input
                  id={`stat-value-${i}`}
                  value={row.value}
                  placeholder="13+"
                  onChange={(e) => update(i, { value: e.target.value })}
                  className={inputCls}
                />
              </div>
              <div>
                <label htmlFor={`stat-label-${i}`} className="mb-1 block text-xs font-medium text-muted-foreground">
                  Label
                </label>
                <input
                  id={`stat-label-${i}`}
                  value={row.label}
                  placeholder="Years of operating heritage"
                  onChange={(e) => update(i, { label: e.target.value })}
                  className={inputCls}
                />
              </div>
              <div className="flex gap-1">
                <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="rounded-md border border-border p-2 text-muted-foreground hover:text-foreground disabled:opacity-40" aria-label="Move up">
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => move(i, 1)} disabled={i === rows.length - 1} className="rounded-md border border-border p-2 text-muted-foreground hover:text-foreground disabled:opacity-40" aria-label="Move down">
                  <ArrowDown className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => setRows((r) => r.filter((_, idx) => idx !== i))} className="rounded-md border border-border p-2 text-red-600 hover:bg-red-50" aria-label="Remove stat">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button
        type="button"
        onClick={() => setRows((r) => [...r, { value: "", label: "" }])}
        className="mt-3 inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
      >
        <Plus className="h-4 w-4" /> Add stat
      </button>
    </div>
  )
}
