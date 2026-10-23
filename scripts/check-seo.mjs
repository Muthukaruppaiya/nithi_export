// Quick sanity check of the prerendered pages: title, description, canonical,
// structured data blocks and an H1 present on each.
import fs from 'node:fs'

const pages = ['index.html', 'about/index.html', 'products/index.html', 'quality/index.html', 'export-process/index.html', 'gallery/index.html', 'contact/index.html', '404.html']

for (const p of pages) {
  const h = fs.readFileSync(`dist/${p}`, 'utf8')
  const title = h.match(/<title>(.*?)<\/title>/)?.[1]
  const desc = h.match(/name="description" content="(.*?)"/)?.[1]
  const canonical = h.match(/rel="canonical" href="(.*?)"/)?.[1]
  const ld = (h.match(/application\/ld\+json/g) || []).length
  const h1 = (h.match(/<h1/g) || []).length
  const titles = (h.match(/<title>/g) || []).length
  console.log(`${p}\n  title(${titles}): ${title} [${title?.length}]\n  desc: [${desc?.length}] canonical: ${canonical}\n  json-ld: ${ld}  h1: ${h1}`)
  for (const block of h.matchAll(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/g)) JSON.parse(block[1])
}
console.log('priceRange:', fs.readFileSync('dist/index.html', 'utf8').match(/"priceRange":"([^"]*)"/)[1])
