import { useState } from 'react'
import { useLocation } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { CheckCircle2, Clock, Mail, MapPin, Phone, Send, User } from 'lucide-react'
import Seo from '../seo/Seo'
import PageHero from '../components/ui/PageHero'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import FaqList from '../components/sections/FaqList'
import { WhatsAppIcon } from '../components/layout/WhatsAppFloat'
import { SITE, waLink } from '../data/site'
import { FAQS, GRADES } from '../data/content'

const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT

const field =
  'mt-2 w-full rounded-xl border border-forest-900/15 bg-cream-50 px-4 py-3 text-sm text-ink transition outline-none placeholder:text-forest-900/35 focus:border-pod-500 focus:bg-white focus:ring-4 focus:ring-pod-500/15'
const label = 'text-xs font-bold tracking-wide text-forest-900'

function buildMessage(d) {
  return [
    'New cardamom enquiry',
    `Name: ${d.name}`,
    `Company: ${d.company}`,
    `Country: ${d.country}`,
    `Email: ${d.email}`,
    d.phone && `Phone/WhatsApp: ${d.phone}`,
    `Grade: ${d.grade}`,
    `Quantity: ${d.quantity}`,
    `Destination port: ${d.port}`,
    `Incoterm: ${d.incoterm}`,
    `Free 200 g sample: ${d.sample ? 'Yes' : 'No'}`,
    d.message && `Message: ${d.message}`,
  ]
    .filter(Boolean)
    .join('\n')
}

function EnquiryForm() {
  const { state } = useLocation()
  const [status, setStatus] = useState('idle')

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    data.sample = form.sample.checked
    const via = e.nativeEvent.submitter?.value || 'whatsapp'
    const text = buildMessage(data)

    if (FORM_ENDPOINT && via === 'form') {
      setStatus('sending')
      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...data, _subject: `Cardamom enquiry from ${data.company}` }),
        })
        setStatus(res.ok ? 'sent' : 'error')
        if (res.ok) form.reset()
      } catch {
        setStatus('error')
      }
      return
    }

    if (via === 'email') {
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
        `Cardamom enquiry from ${data.company}`,
      )}&body=${encodeURIComponent(text)}`
    } else {
      window.open(waLink(text), '_blank', 'noopener')
    }
    setStatus('sent')
  }

  return (
    <form onSubmit={onSubmit} className="card relative p-6 sm:p-10">
      <h2 className="text-3xl font-medium text-forest-900">Request a price quote</h2>
      <p className="mt-2 text-sm text-muted">
        We reply with the specification sheet, this week’s price and, on request, a free 200 g sample.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className={label}>Your name *</span>
          <input name="name" required autoComplete="name" className={field} placeholder="Full name" />
        </label>
        <label className="block">
          <span className={label}>Company *</span>
          <input name="company" required autoComplete="organization" className={field} placeholder="Company name" />
        </label>
        <label className="block">
          <span className={label}>Country *</span>
          <input name="country" required autoComplete="country-name" className={field} placeholder="e.g. United Arab Emirates" />
        </label>
        <label className="block">
          <span className={label}>Email *</span>
          <input name="email" type="email" required autoComplete="email" className={field} placeholder="you@company.com" />
        </label>
        <label className="block">
          <span className={label}>Phone / WhatsApp</span>
          <input name="phone" type="tel" autoComplete="tel" className={field} placeholder="+971 ..." />
        </label>
        <label className="block">
          <span className={label}>Grade *</span>
          <select name="grade" required defaultValue={state?.grade || ''} className={field}>
            <option value="" disabled>
              Select a grade
            </option>
            {GRADES.map((g) => (
              <option key={g.id}>{g.name}</option>
            ))}
            <option>Not sure yet, please advise</option>
          </select>
        </label>
        <label className="block">
          <span className={label}>Quantity *</span>
          <input name="quantity" required className={field} placeholder="e.g. 2 ton trial / 1 x 20ft" />
        </label>
        <label className="block">
          <span className={label}>Destination port *</span>
          <input name="port" required className={field} placeholder="e.g. Jebel Ali, Jeddah, Chattogram" />
        </label>
        <fieldset className="sm:col-span-2">
          <legend className={label}>Incoterm</legend>
          <div className="mt-2 flex gap-3">
            {['FOB', 'CIF', 'Not sure'].map((t, i) => (
              <label key={t} className="flex cursor-pointer items-center gap-2 rounded-xl border border-forest-900/15 bg-cream-50 px-4 py-2.5 text-sm font-semibold has-[:checked]:border-pod-500 has-[:checked]:bg-pod-100">
                <input type="radio" name="incoterm" value={t} defaultChecked={i === 0} className="accent-pod-600" /> {t}
              </label>
            ))}
          </div>
        </fieldset>
        <label className="block sm:col-span-2">
          <span className={label}>Message</span>
          <textarea name="message" rows={4} className={field} placeholder="Packing preference, delivery date, anything else we should know" />
        </label>
        <label className="flex items-center gap-3 text-sm font-semibold text-forest-900 sm:col-span-2">
          <input type="checkbox" name="sample" className="size-4 accent-pod-600" /> Please send a free 200 g sample
        </label>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        {FORM_ENDPOINT && (
          <button type="submit" value="form" disabled={status === 'sending'} className="btn-primary">
            <Send className="size-4" /> {status === 'sending' ? 'Sending…' : 'Send enquiry'}
          </button>
        )}
        <button type="submit" value="whatsapp" className={FORM_ENDPOINT ? 'btn-ghost text-forest-900' : 'btn-primary'}>
          <WhatsAppIcon className="size-4" /> Send via WhatsApp
        </button>
        <button type="submit" value="email" className="btn-ghost text-forest-900">
          <Mail className="size-4" /> Send via Email
        </button>
      </div>

      <AnimatePresence>
        {(status === 'sent' || status === 'error') && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="status"
            className={`mt-6 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold ${
              status === 'sent' ? 'bg-pod-100 text-forest-800' : 'bg-red-50 text-red-700'
            }`}
          >
            <CheckCircle2 className="size-4" />
            {status === 'sent'
              ? 'Thank you. Your enquiry is ready to send. We will get back to you with a quote.'
              : `Something went wrong. Please email ${SITE.email} or WhatsApp ${SITE.phone}.`}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  )
}

const DETAILS = [
  { icon: User, label: SITE.ownerTitle, value: SITE.owner, sub: SITE.ownerEmail, href: `mailto:${SITE.ownerEmail}` },
  { icon: Phone, label: 'Phone and WhatsApp', value: SITE.phone, href: SITE.phoneHref },
  { icon: Mail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
  {
    icon: MapPin,
    label: 'Office',
    value: `${SITE.address.street}, ${SITE.address.locality}, ${SITE.address.district}, ${SITE.address.region} ${SITE.address.postalCode}, India`,
    href: SITE.mapLink,
  },
  { icon: Clock, label: 'Price quotes', value: 'Quoted weekly, valid for 3 to 5 days' },
]

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact Us – Request a Cardamom Price Quote"
        description="Request this week’s green cardamom price from Nithi Global Traders, Kambam, Theni, India. Phone and WhatsApp +91 9342500730, email connect@nithiglobaltrader.com."
        path="/contact"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ]}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact Nithi Global Traders',
            url: `${SITE.url}/contact`,
            about: { '@id': `${SITE.url}/#organization` },
          },
        ]}
      />
      <PageHero
        eyebrow="Contact"
        title="Tell us your grade, quantity and port"
        intro="We send the specification sheet, a price quote and, on request, a free 200 g sample."
        image="/images/cardamom-pods-bowl"
        crumbs={['Contact']}
      />

      <section className="py-16 sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <div className="space-y-4">
            {DETAILS.map((d, i) => {
              const Inner = (
                <>
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-forest-900 text-gold-400">
                    <d.icon className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-bold tracking-widest text-pod-600 uppercase">{d.label}</span>
                    <span className="mt-1 block font-semibold break-words text-forest-900">{d.value}</span>
                    {d.sub && <span className="block text-sm break-all text-muted">{d.sub}</span>}
                  </span>
                </>
              )
              return (
                <Reveal key={d.label} from="left" delay={i * 0.06}>
                  {d.href ? (
                    <a
                      href={d.href}
                      target={d.href.startsWith('http') ? '_blank' : undefined}
                      rel={d.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="card flex items-start gap-4 p-5 transition hover:-translate-y-0.5 hover:shadow-xl"
                    >
                      {Inner}
                    </a>
                  ) : (
                    <div className="card flex items-start gap-4 p-5">{Inner}</div>
                  )}
                </Reveal>
              )
            })}
            <Reveal from="left" delay={0.35}>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn w-full bg-[#25D366] text-white hover:-translate-y-0.5">
                <WhatsAppIcon className="size-5" /> Chat on WhatsApp now
              </a>
            </Reveal>
          </div>

          <Reveal from="right">
            <EnquiryForm />
          </Reveal>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="container-x">
          <Reveal className="card overflow-hidden">
            <iframe
              title="Map to Nithi Global Traders, Kambam"
              src={SITE.mapEmbed}
              className="h-[380px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-100/60 py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading eyebrow="Before you write" title="Quick answers" />
          <Reveal from="right">
            <FaqList items={FAQS.slice(0, 5)} />
          </Reveal>
        </div>
      </section>
    </>
  )
}
