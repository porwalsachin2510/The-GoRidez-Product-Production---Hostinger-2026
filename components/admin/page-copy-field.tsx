import type { PageDefinition, PageCopyField as CopyField } from "@/lib/page-content"

const inputCls =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"

/**
 * Plain, grouped text inputs for every heading / label / message on a system
 * page. Inputs are pre-filled with the saved value, or the default text shown
 * on the live site, so editors always see exactly what visitors see.
 */
export function PageCopyField({
  name,
  label,
  help,
  definition,
  value,
}: {
  name: string
  label: string
  help?: string
  definition: PageDefinition
  value: unknown
}) {
  const stored = value && typeof value === "object" ? (value as Record<string, unknown>) : {}
  const groups = new Map<string, CopyField[]>()
  for (const f of definition.copy) groups.set(f.group, [...(groups.get(f.group) ?? []), f])

  return (
    <fieldset className="rounded-xl border border-border bg-muted/20 p-5">
      <legend className="px-1 text-sm font-semibold text-foreground">{label}</legend>
      {help ? <p className="text-xs text-muted-foreground">{help}</p> : null}
      <div className="mt-4 grid gap-6">
        {[...groups.entries()].map(([group, fields]) => (
          <div key={group}>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{group}</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {fields.map((f) => {
                const id = `${name}-${f.key}`
                const saved = stored[f.key]
                const current = typeof saved === "string" && saved.trim() ? saved : f.default
                return (
                  <div key={f.key} className={f.type === "textarea" ? "sm:col-span-2" : undefined}>
                    <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-foreground">
                      {f.label}
                    </label>
                    {f.type === "textarea" ? (
                      <textarea
                        id={id}
                        name={`${name}.${f.key}`}
                        rows={3}
                        defaultValue={current}
                        placeholder={f.default}
                        className={inputCls}
                      />
                    ) : (
                      <input
                        id={id}
                        type="text"
                        name={`${name}.${f.key}`}
                        defaultValue={current}
                        placeholder={f.default}
                        className={inputCls}
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </fieldset>
  )
}
