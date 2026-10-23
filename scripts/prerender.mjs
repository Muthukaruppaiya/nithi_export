// Renders every route to static HTML so search engines and link previews get
// full content and meta tags without running JavaScript. Also writes sitemap.xml.
import fs from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = path.resolve('dist')
const { render, ROUTES } = await import(pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href)
const { SITE } = await import(pathToFileURL(path.resolve('src/data/site.js')).href)
const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8')
if (!template.includes('<!--app-html-->')) {
  throw new Error('dist/index.html is already prerendered. Run the full `npm run build` instead.')
}

function page(url) {
  const { html, head } = render(url)
  return template
    .replace(/<title>[\s\S]*?<\/title>/, '')
    .replace('<!--app-head-->', () => head)
    .replace('<!--app-html-->', () => html)
}

for (const url of ROUTES) {
  const file = url === '/' ? path.join(dist, 'index.html') : path.join(dist, url.slice(1), 'index.html')
  await fs.mkdir(path.dirname(file), { recursive: true })
  await fs.writeFile(file, page(url))
  console.log(`prerendered ${url}`)
}

await fs.writeFile(path.join(dist, '404.html'), page('/404'))
console.log('prerendered 404.html')

const today = new Date().toISOString().slice(0, 10)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(
  (r) => `  <url>
    <loc>${SITE.url}${r}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r === '/' || r === '/products' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${r === '/' ? '1.0' : r === '/products' || r === '/contact' ? '0.9' : '0.7'}</priority>
  </url>`,
).join('\n')}
</urlset>
`
await fs.writeFile(path.join(dist, 'sitemap.xml'), sitemap)
console.log('wrote sitemap.xml')
