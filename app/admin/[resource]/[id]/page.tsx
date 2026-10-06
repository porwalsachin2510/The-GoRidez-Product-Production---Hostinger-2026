import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { requireModule } from "@/lib/auth-helpers"
import { connectToDatabase } from "@/lib/db/mongoose"
import { getResource, loadRelationOptions } from "@/lib/admin/resources"
import { ResourceForm } from "@/components/admin/resource-form"
import { getPageDefinition } from "@/lib/page-content"

export const dynamic = "force-dynamic"

export default async function EditResourcePage({
  params,
}: {
  params: Promise<{ resource: string; id: string }>
}) {
  const { resource, id } = await params
  const cfg = getResource(resource)
  if (!cfg) notFound()
  await requireModule(cfg.moduleKey)

  await connectToDatabase()
  const doc = await cfg.model.findOne({ _id: id, deletedAt: null }).lean()
  if (!doc) notFound()

  const record = JSON.parse(JSON.stringify(doc)) as Record<string, unknown>
  // Show the live-site default hero text for empty fields on system pages so
  // editors see (and can tweak) exactly what visitors see.
  const def = cfg.key === "pages" ? getPageDefinition(String(record.slug ?? "")) : undefined
  if (def) {
    const defaults: Record<string, string> = {
      heroEyebrow: def.hero.eyebrow,
      heroTitle: def.hero.title,
      heroSubtitle: def.hero.subtitle,
      heroImage: def.hero.image,
      heroImageAlt: def.hero.imageAlt,
    }
    for (const [key, val] of Object.entries(defaults)) {
      if (!record[key]) record[key] = val
    }
  }
  const title = String(record[cfg.titleField] ?? cfg.singular)
  const relationOptions = await loadRelationOptions(cfg, id)

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href={`/admin/${cfg.key}`}
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to {cfg.label}
      </Link>
      <h1 className="mb-6 font-display text-2xl font-bold tracking-tight text-foreground">{title}</h1>
      <ResourceForm resourceKey={cfg.key} fields={cfg.fields} record={record} relationOptions={relationOptions} />
    </div>
  )
}
