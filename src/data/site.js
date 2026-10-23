export const SITE = {
  name: 'Nithi Global Traders',
  shortName: 'NGT',
  tagline: 'Export-quality green cardamom from Idukki, India',
  url: 'https://nithiglobaltrader.com',
  owner: 'Nithesh Kumar',
  ownerTitle: 'Proprietor',
  phone: '+91 93425 00730',
  phoneHref: 'tel:+919342500730',
  whatsapp: '919342500730',
  email: 'connect@nithiglobaltrader.com',
  ownerEmail: 'nithesh@nithiglobaltrader.com',
  address: {
    street: 'Nanda Gopal Samy Street',
    locality: 'Kambam',
    district: 'Theni',
    region: 'Tamil Nadu',
    postalCode: '625516',
    country: 'India',
    countryCode: 'IN',
  },
  geo: { lat: 9.7346, lng: 77.2826 },
  mapEmbed:
    'https://www.google.com/maps?q=Nanda+Gopal+Samy+Street,+Kambam,+Tamil+Nadu+625516&output=embed',
  mapLink: 'https://www.google.com/maps/search/?api=1&query=Nanda+Gopal+Samy+Street+Kambam+Tamil+Nadu+625516',
  markets: ['United Arab Emirates', 'Saudi Arabia', 'Bangladesh'],
  defaultImage: '/images/og-cardamom.jpg',
}

export const waLink = (text = 'Hello Nithi Global Traders, I would like a price quote for green cardamom.') =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`

export const NAV = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/products', label: 'Products' },
  { to: '/quality', label: 'Quality' },
  { to: '/export-process', label: 'Export Process' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]
