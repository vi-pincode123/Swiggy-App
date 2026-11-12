import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const outDir = path.resolve('public/images/grocery')
await mkdir(outDir, { recursive: true })

const dummy = {
  apple: 'groceries/apple',
  cucumber: 'groceries/cucumber',
  capsicum: 'groceries/green-bell-pepper',
  chillies: 'groceries/green-chili-pepper',
  lemon: 'groceries/lemon',
  potatoes: 'groceries/potatoes',
  onions: 'groceries/red-onions',
  strawberry: 'groceries/strawberry',
  kiwi: 'groceries/kiwi',
  mulberry: 'groceries/mulberry',
  milk: 'groceries/milk',
  eggs: 'groceries/eggs',
  icecream: 'groceries/ice-cream',
  honey: 'groceries/honey-jar',
  coffee: 'groceries/nescafe-coffee',
  juice: 'groceries/juice',
  cola: 'groceries/soft-drinks',
  water: 'groceries/water',
  oil: 'groceries/cooking-oil',
  rice: 'groceries/rice',
  protein: 'groceries/protein-powder',
  tissues: 'groceries/tissue-paper-box',
  choppingBoard: 'kitchen-accessories/chopping-board',
  spiceRack: 'kitchen-accessories/spice-rack',
  lunchBox: 'kitchen-accessories/lunch-box',
  handWash: 'skin-care/attitude-super-leaves-hand-soap',
  bodyWash: 'skin-care/olay-ultra-moisture-shea-butter-body-wash',
  lotion: 'skin-care/vaseline-men-body-and-face-lotion',
  eyeshadow: 'beauty/eyeshadow-palette-with-mirror',
  lipstick: 'beauty/red-lipstick',
  perfume: 'fragrances/chanel-coco-noir-eau-de',
  charger: 'mobile-accessories/apple-iphone-charger',
  wirelessCharger: 'mobile-accessories/apple-airpower-wireless-charger',
  speaker: 'mobile-accessories/amazon-echo-plus',
}

const unsplash = {
  chips: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=800&h=800&q=80',
  chocolate: 'https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=800&h=800&q=80',
  cookies: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=800&h=800&q=80',
  popcorn: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=800&h=800&q=80',
  almonds: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=800&h=800&q=80',
  icedCoffee: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&h=800&q=80',
  gift: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1400&h=800&q=80',
}

const jobs = []
for (const [name, folder] of Object.entries(dummy)) {
  jobs.push({
    name,
    ext: 'webp',
    url: `https://cdn.dummyjson.com/product-images/${folder}/thumbnail.webp`,
    referer: 'https://dummyjson.com/',
  })
}
for (const [name, url] of Object.entries(unsplash)) {
  jobs.push({ name, ext: 'jpg', url })
}

const failures = []
const queue = [...jobs]

async function download(job) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(job.url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) FoodieDemo/1.0',
          ...(job.referer ? { Referer: job.referer } : {}),
        },
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const buf = Buffer.from(await res.arrayBuffer())
      if (buf.length < 4000) throw new Error(`too small (${buf.length}b)`)
      const sig = buf.subarray(0, 12)
      const isJpg = sig[0] === 0xff && sig[1] === 0xd8
      const isPng = sig[0] === 0x89 && sig[1] === 0x50
      const isWebp = sig.subarray(0, 4).toString() === 'RIFF' && sig.subarray(8, 12).toString() === 'WEBP'
      if (!isJpg && !isPng && !isWebp) throw new Error('not an image')
      await writeFile(path.join(outDir, `${job.name}.${job.ext}`), buf)
      return { name: job.name, bytes: buf.length, kind: isWebp ? 'webp' : isJpg ? 'jpg' : 'png' }
    } catch (err) {
      if (attempt === 3) failures.push({ name: job.name, error: err.message })
      else await new Promise((r) => setTimeout(r, 900 * attempt))
    }
  }
  return null
}

const results = []
const workers = Array.from({ length: 5 }, async () => {
  while (queue.length) {
    const job = queue.shift()
    const result = await download(job)
    if (result) results.push(result)
  }
})
await Promise.all(workers)

console.log(`Downloaded ${results.length}/${jobs.length} images`)
results.sort((a, b) => a.name.localeCompare(b.name))
for (const r of results) console.log(` ${r.name}.${r.kind} ${r.bytes}`)
if (failures.length) {
  console.log('FAILURES:')
  failures.forEach((f) => console.log(` - ${f.name}: ${f.error}`))
  process.exitCode = 1
}
