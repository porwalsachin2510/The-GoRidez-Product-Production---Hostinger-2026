import { config as loadEnv } from 'dotenv'
loadEnv({ path: '.env.development.local' })
loadEnv()

async function main() {
  const { connectToDatabase } = await import('../lib/db/mongoose')
  const { FleetCategory } = await import('../models')
  await connectToDatabase()
  const slugs = ['sedans', 'suvs-luxury-cars', 'vans', 'minibuses', 'coaches']
  for (const slug of slugs) {
    const res = await FleetCategory.updateOne(
      { slug, $or: [{ thumbnail: null }, { thumbnail: { $exists: false } }, { thumbnail: '' }] },
      { $set: { thumbnail: `/media/fleet/cutouts/${slug}.png` } },
    )
    console.log(`${slug}: matched ${res.matchedCount}, modified ${res.modifiedCount}`)
  }
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
