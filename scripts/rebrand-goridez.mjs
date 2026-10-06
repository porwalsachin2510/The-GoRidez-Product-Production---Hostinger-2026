// Replaces every remaining "ViaRidez" brand reference stored in MongoDB with "GoRidez".
// Usage: node scripts/rebrand-goridez.mjs [--apply]   (dry run without --apply)
import mongoose from "mongoose"
import dotenv from "dotenv"

for (const file of [".env.development.local", ".env.local", ".env"]) dotenv.config({ path: file })

const APPLY = process.argv.includes("--apply")
const uri = (process.env.MONGODB_URI || "").trim()
if (!uri) throw new Error("MONGODB_URI is not set")

const PATTERN = /via[ _-]?ridez/i

// Strings that must not be rewritten: uploaded asset URLs (the files really live in the
// old Cloudinary folder) and login credentials.
const isProtected = (value, key) =>
  /res\.cloudinary\.com|cloudinary:\/\//i.test(value) || key === "password" || key === "passwordHash"

function rebrand(value) {
  return value
    .replace(/\/why-viaridez/gi, "/why-goridez")
    .replace(/\bwhy-viaridez\b/gi, "why-goridez")
    .replace(/viaridez-logo/gi, "goridez-logo")
    .replace(/@viaridez\.(ae|com)/gi, "@goridez.com")
    .replace(/(www\.)?viaridez\.(com|ae)/gi, (_m, www) => `${www || ""}goridez.com`)
    .replace(/VIARIDEZ/g, "GoRidez")
    .replace(/via[ _-]?ridez/gi, (m) => (m === m.toLowerCase() ? "goridez" : "GoRidez"))
}

function walk(node, path, changes, key) {
  if (typeof node === "string") {
    if (PATTERN.test(node) && !isProtected(node, key)) {
      const next = rebrand(node)
      if (next !== node) changes.push({ path, from: node, to: next })
    }
    return
  }
  if (Array.isArray(node)) return node.forEach((item, i) => walk(item, `${path}.${i}`, changes, key))
  if (node && typeof node === "object" && !(node instanceof Date) && !(node._bsontype)) {
    for (const [k, v] of Object.entries(node)) walk(v, path ? `${path}.${k}` : k, changes, k)
  }
}

await mongoose.connect(uri)
const db = mongoose.connection.db
const collections = await db.listCollections().toArray()
let total = 0

for (const { name } of collections) {
  if (name.startsWith("system.")) continue
  const col = db.collection(name)
  for await (const doc of col.find({})) {
    const changes = []
    walk(doc, "", changes)
    const updates = changes.filter((c) => c.path !== "_id" && !(name === "users" && /(^|\.)email$/.test(c.path)))
    if (!updates.length) continue
    total += updates.length
    for (const c of updates) console.log(`${name} ${doc._id} ${c.path}: ${c.from.slice(0, 90)} -> ${c.to.slice(0, 90)}`)
    if (APPLY) {
      await col.updateOne({ _id: doc._id }, { $set: Object.fromEntries(updates.map((c) => [c.path, c.to])) })
    }
  }
}

console.log(`\n${APPLY ? "Updated" : "Would update"} ${total} field(s).`)
await mongoose.disconnect()
