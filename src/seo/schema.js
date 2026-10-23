import { SITE } from '../data/site'
import { GRADES, FAQS, LICENCES } from '../data/content'

const ORG_ID = `${SITE.url}/#organization`

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    '@id': ORG_ID,
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/logo.png`,
    image: `${SITE.url}${SITE.defaultImage}`,
    description:
      'India-based exporter of green cardamom from the Idukki region of Kerala, supplying importers, wholesalers and spice packers in the UAE, Saudi Arabia and Bangladesh.',
    slogan: SITE.tagline,
    founder: { '@type': 'Person', name: SITE.owner, jobTitle: SITE.ownerTitle },
    telephone: '+91-9342500730',
    email: SITE.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.countryCode,
    },
    geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    areaServed: SITE.markets.map((name) => ({ '@type': 'Country', name })),
    knowsAbout: ['Green cardamom', 'Spice export', 'Idukki cardamom', 'Elettaria cardamomum'],
    identifier: LICENCES.map((l) => ({ '@type': 'PropertyValue', name: l.label, value: l.value })),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-9342500730',
      email: SITE.email,
      contactType: 'sales',
      availableLanguage: ['English', 'Tamil'],
      areaServed: ['AE', 'SA', 'BD'],
    },
  }
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  }
}

export function productsSchema() {
  return GRADES.map((g) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: g.name,
    description: g.summary,
    image: `${SITE.url}${g.image}.webp`,
    category: 'Spices > Cardamom',
    brand: { '@type': 'Brand', name: SITE.name },
    manufacturer: { '@id': ORG_ID },
    countryOfOrigin: 'IN',
    size: g.size,
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Origin', value: 'Idukki, Kerala, India' },
      { '@type': 'PropertyValue', name: 'Packing', value: '10 kg cartons, 25 kg or 50 kg PP bags with food-grade liner' },
      { '@type': 'PropertyValue', name: 'Incoterms', value: 'FOB, CIF' },
    ],
  }))
}

export function faqSchema(faqs = FAQS) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en',
  }
}
