import { Link } from 'react-router'
import { Mail, MapPin, Phone } from 'lucide-react'
import Logo from './Logo'
import { NAV, SITE, waLink } from '../../data/site'
import { GRADES, LICENCES } from '../../data/content'
import { WhatsAppIcon } from './WhatsAppFloat'

export default function Footer() {
  return (
    <footer className="grain relative overflow-hidden bg-forest-950 text-cream-100">
      <div className="pointer-events-none absolute -top-40 -right-40 size-[520px] rounded-full bg-pod-600/10 blur-3xl" />
      <div className="container-x relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-4">
          <Logo light />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-cream-100/70">
            Exporter of green cardamom from the Idukki region of Kerala, India. The grade you order, checked and
            documented, shipped on the date we agree.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="grid size-11 place-items-center rounded-full border border-cream-50/15 transition hover:border-gold-400 hover:text-gold-400"
            >
              <WhatsAppIcon className="size-5" />
            </a>
            <a
              href={`mailto:${SITE.email}`}
              aria-label="Email"
              className="grid size-11 place-items-center rounded-full border border-cream-50/15 transition hover:border-gold-400 hover:text-gold-400"
            >
              <Mail className="size-5" />
            </a>
            <a
              href={SITE.phoneHref}
              aria-label="Call"
              className="grid size-11 place-items-center rounded-full border border-cream-50/15 transition hover:border-gold-400 hover:text-gold-400"
            >
              <Phone className="size-5" />
            </a>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h2 className="font-sans text-xs font-bold tracking-[0.2em] text-gold-400 uppercase">Company</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="text-cream-100/75 transition hover:text-cream-50">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h2 className="font-sans text-xs font-bold tracking-[0.2em] text-gold-400 uppercase">Products</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {GRADES.map((g) => (
              <li key={g.id}>
                <Link to="/products" className="text-cream-100/75 transition hover:text-cream-50">
                  {g.name}
                </Link>
              </li>
            ))}
          </ul>
          <h2 className="mt-8 font-sans text-xs font-bold tracking-[0.2em] text-gold-400 uppercase">Registered with</h2>
          <ul className="mt-4 space-y-1.5 text-xs text-cream-100/60">
            {LICENCES.map((l) => (
              <li key={l.label}>
                {l.label}: <span className="text-cream-100/85">{l.value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h2 className="font-sans text-xs font-bold tracking-[0.2em] text-gold-400 uppercase">Contact</h2>
          <address className="mt-5 space-y-4 text-sm not-italic">
            <p className="flex gap-3 text-cream-100/75">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold-400" />
              <span>
                {SITE.address.street}, {SITE.address.locality}, {SITE.address.district}, {SITE.address.region}{' '}
                {SITE.address.postalCode}, {SITE.address.country}
              </span>
            </p>
            <a href={SITE.phoneHref} className="flex gap-3 text-cream-100/75 hover:text-cream-50">
              <Phone className="size-4 shrink-0 text-gold-400" /> {SITE.phone} (Phone and WhatsApp)
            </a>
            <a href={`mailto:${SITE.email}`} className="flex gap-3 break-all text-cream-100/75 hover:text-cream-50">
              <Mail className="size-4 shrink-0 text-gold-400" /> {SITE.email}
            </a>
          </address>
        </div>
      </div>

      <div className="border-t border-cream-50/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream-100/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p>Green cardamom exporter · Kambam, Theni, Tamil Nadu, India</p>
        </div>
      </div>
    </footer>
  )
}
