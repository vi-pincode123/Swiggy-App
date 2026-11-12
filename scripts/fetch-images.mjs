import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

const images = {
  'hero-main': 'photo-1504674900247-0877df9cc836',
  'hero-pizza': 'photo-1565299624946-b28f40a0ae38',
  'hero-dessert': 'photo-1565958011703-44f9829ba187',
  'hero-burger': 'photo-1568901346375-23c9450c58cd',
  'hero-biryani': 'photo-1563379091339-03b21ab4a4f8',
  'hero-grocery': 'photo-1542838132-92c53300491e',

  'cat-pizza': 'photo-1513104890138-7c749659a591',
  'cat-burger': 'photo-1568901346375-23c9450c58cd',
  'cat-biryani': 'photo-1563379091339-03b21ab4a4f8',
  'cat-dosa': 'photo-1630383249896-424e482df921',
  'cat-cakes': 'photo-1578985545062-69928b1d9587',
  'cat-chinese': 'photo-1585032226651-759b368d7246',
  'cat-south-indian': 'photo-1589301760014-d929f3979dbc',
  'cat-north-indian': 'photo-1585937421612-70a008356fbe',
  'cat-desserts': 'photo-1551024506-0bccd828d307',
  'cat-rolls': 'photo-1626700051175-6818013e1d4f',
  'cat-momos': 'photo-1534422298391-e4f8c172dddb',
  'cat-sandwich': 'photo-1528735602780-2552fd46c7af',
  'cat-pasta': 'photo-1621996346565-e3dbc646d9a9',
  'cat-icecream': 'photo-1497034825429-c343d7c6a68f',
  'cat-tea': 'photo-1544787219-7f47ccb76574',

  'groc-vegetables': 'photo-1542838132-92c53300491e',
  'groc-fruits': 'photo-1610832958506-aa56368176cf',
  'groc-dairy': 'photo-1628088062854-d1870b4553da',
  'groc-rice': 'photo-1586201375761-83865001e31c',
  'groc-snacks': 'photo-1599490659213-e2b9527bd087',
  'groc-drinks': 'photo-1622483767028-3f66f32aef97',
  'groc-bakery': 'photo-1509440159596-0249088772ff',
  'groc-meat': 'photo-1607623814075-e51df1bdc82f',
  'groc-eggs': 'photo-1518569656558-1f25e69d93d7',
  'groc-spices': 'photo-1596040033229-a9821ebd058d',
  'groc-household': 'photo-1585421514738-01798e348b17',
  'groc-frozen': 'photo-1541592106381-b31e9677c0e5',
  'groc-sweets': 'photo-1601050690597-df0568f70950',
  'groc-atta': 'photo-1574323347407-f5e1ad6d020b',

  'dine-1': 'photo-1517248135467-4c7edcad34c4',
  'dine-2': 'photo-1552566626-52f8b828add9',
  'dine-3': 'photo-1414235077428-338989a2e8c0',
  'dine-4': 'photo-1555396273-367ea4eb4db5',
  'dine-5': 'photo-1590846406792-0adc7f938f1d',
  'dine-6': 'photo-1466978913421-dad2ebd01d17',
  'dine-7': 'photo-1544148103-0773bf10d330',
  'dine-8': 'photo-1600891964092-4316c288032e',
  'dine-9': 'photo-1476224203421-9ac39bcb3327',
  'dine-10': 'photo-1559339352-11d035aa65de',
  'dine-11': 'photo-1550966871-3ed3cdb5ed0c',
  'dine-12': 'photo-1424847651672-bf20a4b0982b',
}

const outDir = path.resolve('public/images')
await mkdir(outDir, { recursive: true })

const failures = []

async function download(name, id) {
  const url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&h=700&q=78`
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const buf = Buffer.from(await res.arrayBuffer())
      if (buf.length < 5000) throw new Error(`too small (${buf.length}b)`)
      await writeFile(path.join(outDir, `${name}.jpg`), buf)
      return { name, bytes: buf.length }
    } catch (err) {
      if (attempt === 3) failures.push({ name, id, error: err.message })
      else await new Promise((r) => setTimeout(r, 800 * attempt))
    }
  }
}

const results = []
const queue = Object.entries(images)
const workers = Array.from({ length: 6 }, async () => {
  while (queue.length) {
    const [name, id] = queue.shift()
    const result = await download(name, id)
    if (result) results.push(result)
  }
})
await Promise.all(workers)

console.log(`Downloaded ${results.length}/${Object.keys(images).length} images`)
if (failures.length) {
  console.log('FAILURES:')
  failures.forEach((f) => console.log(` - ${f.name} (${f.id}): ${f.error}`))
  process.exitCode = 1
}
