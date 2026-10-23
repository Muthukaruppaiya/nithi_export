import { createContext, useContext, useEffect } from 'react'
import { SITE } from '../data/site'
import { organizationSchema, breadcrumbSchema } from './schema'

export const SeoContext = createContext(null)

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function buildHead({ title, description, path = '/', image, type = 'website', noindex, jsonLd = [], breadcrumbs }) {
  const fullTitle = path === '/' ? title : `${title} | ${SITE.name}`
  const url = `${SITE.url}${path === '/' ? '/' : path}`
  const img = `${SITE.url}${image || SITE.defaultImage}`
  const ld = [organizationSchema(), ...(breadcrumbs ? [breadcrumbSchema(breadcrumbs)] : []), ...jsonLd]

  const meta = [
    ['name', 'description', description],
    ['name', 'robots', noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'],
    ['property', 'og:type', type],
    ['property', 'og:site_name', SITE.name],
    ['property', 'og:title', fullTitle],
    ['property', 'og:description', description],
    ['property', 'og:url', url],
    ['property', 'og:image', img],
    ['property', 'og:image:width', '1200'],
    ['property', 'og:image:height', '630'],
    ['property', 'og:locale', 'en_IN'],
    ['name', 'twitter:card', 'summary_large_image'],
    ['name', 'twitter:title', fullTitle],
    ['name', 'twitter:description', description],
    ['name', 'twitter:image', img],
  ]

  return { title: fullTitle, url, meta, ld }
}

export function headToHtml(head) {
  if (!head) return ''
  return [
    `<title>${esc(head.title)}</title>`,
    `<link rel="canonical" href="${esc(head.url)}" data-seo />`,
    ...head.meta.map(([attr, key, val]) => `<meta ${attr}="${key}" content="${esc(val)}" data-seo />`),
    ...head.ld.map(
      (obj) => `<script type="application/ld+json" data-seo>${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`,
    ),
  ].join('\n    ')
}

function applyHead(head) {
  document.title = head.title
  document.head.querySelectorAll('[data-seo]').forEach((el) => el.remove())
  const frag = document.createDocumentFragment()

  const link = document.createElement('link')
  link.rel = 'canonical'
  link.href = head.url
  link.setAttribute('data-seo', '')
  frag.appendChild(link)

  for (const [attr, key, val] of head.meta) {
    const m = document.createElement('meta')
    m.setAttribute(attr, key)
    m.setAttribute('content', val)
    m.setAttribute('data-seo', '')
    frag.appendChild(m)
  }
  for (const obj of head.ld) {
    const s = document.createElement('script')
    s.type = 'application/ld+json'
    s.textContent = JSON.stringify(obj)
    s.setAttribute('data-seo', '')
    frag.appendChild(s)
  }
  document.head.appendChild(frag)
}

export default function Seo(props) {
  const collector = useContext(SeoContext)
  const head = buildHead(props)
  if (collector) collector.head = head

  const key = JSON.stringify(head)
  useEffect(() => {
    applyHead(JSON.parse(key))
  }, [key])

  return null
}
