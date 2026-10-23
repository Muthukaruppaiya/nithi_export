import { CalendarCheck, Eye, Handshake, MapPin, Mountain, Quote, Truck } from 'lucide-react'
import Seo from '../seo/Seo'
import PageHero from '../components/ui/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/ui/Reveal'
import TiltCard from '../components/ui/TiltCard'
import Img from '../components/ui/Img'
import CTASection from '../components/ui/CTASection'
import { LicencesCard } from '../components/sections/DocsAndLicences'
import { SITE } from '../data/site'

const VALUES = [
  {
    icon: Eye,
    title: 'You see what you buy',
    text: 'Specification sheet, free sample, then photos and video of your actual lot, its weighing and its loading.',
  },
  {
    icon: CalendarCheck,
    title: 'Shipped on the agreed date',
    text: 'About 7 days from advance payment to shipment, with the date fixed with you before we start.',
  },
  {
    icon: Handshake,
    title: 'Clear, written terms',
    text: 'FOB or CIF, payment by advance TT, LC at sight or an agreed split, always agreed in writing before shipping.',
  },
  {
    icon: Truck,
    title: 'Long-term partnerships',
    text: 'After every delivery we ask for your feedback and plan your next order around your market.',
  },
]

const LOCATION = [
  { icon: Mountain, title: 'Close to the source', text: 'Kambam sits at the foot of the Western Ghats, minutes from the Kerala border and the Idukki cardamom hills.' },
  { icon: MapPin, title: 'On the trading route', text: 'Kambam and nearby Bodinayakanur are long-standing trading centres for Idukki cardamom.' },
]

export default function About() {
  return (
    <>
      <Seo
        title="About Us – Cardamom Exporter, Kambam"
        description="Nithi Global Traders is a green cardamom exporter in Kambam, Theni, beside the Idukki cardamom hills. Learn about our promise, our location and our registrations."
        path="/about"
        image="/images/og-plantation.jpg"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ]}
      />
      <PageHero
        eyebrow="About Nithi Global Traders"
        title="The grade you order. Checked, documented and shipped on time."
        intro="An India-based exporter of green cardamom from the Idukki region of Kerala, supplying importers, wholesalers and spice packers in the UAE, Saudi Arabia and Bangladesh."
        image="/images/cardamom-hills"
        crumbs={['About']}
      />

      <section className="py-20 sm:py-28">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Our story" title="Rooted where India’s finest cardamom grows" />
            <Reveal delay={0.1} className="mt-6 space-y-5 text-base leading-relaxed text-muted sm:text-lg">
              <p>
                Idukki in Kerala is home to the Cardamom Hills, where green cardamom grows under forest shade in cool,
                misty highland air. Its bold, green, aromatic pods are valued by buyers across the Middle East and
                South Asia.
              </p>
              <p>
                Our office is in Kambam, Theni, close to the Kerala border and the cardamom-growing hills. Being this
                close lets us buy graded lots from trusted growers and dealers, approve a sample before any bag is
                bought, and check every lot ourselves before it is packed for export.
              </p>
              <p>
                Our promise is simple: the grade you order, checked and documented, shipped on the date we agree.
              </p>
            </Reveal>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Reveal from="up" className="row-span-2">
              <TiltCard className="h-full overflow-hidden rounded-3xl">
                <Img
                  src="/images/cardamom-plantation-ghats"
                  alt="Cardamom plants growing under forest shade in the Western Ghats"
                  sizes="(min-width:1024px) 25vw, 50vw"
                  className="size-full object-cover"
                />
              </TiltCard>
            </Reveal>
            <Reveal from="up" delay={0.1}>
              <TiltCard className="overflow-hidden rounded-3xl">
                <Img src="/images/cardamom-flower-fruit" alt="Cardamom flowers and young pods" sizes="25vw" className="aspect-square w-full object-cover" />
              </TiltCard>
            </Reveal>
            <Reveal from="up" delay={0.2}>
              <TiltCard className="overflow-hidden rounded-3xl">
                <Img src="/images/cardamom-close-up" alt="Close-up of dried green cardamom pods" sizes="25vw" className="aspect-square w-full object-cover" />
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="grain relative overflow-hidden bg-forest-900 py-20 text-cream-50 sm:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]">
          <Reveal from="left">
            <Quote className="size-12 text-gold-500" />
            <blockquote className="mt-6 font-display text-3xl leading-snug font-light sm:text-4xl lg:text-5xl">
              We photograph and video each lot, the weighing and the loading, and send them to you before shipping.
            </blockquote>
            <p className="mt-8 font-semibold">
              {SITE.owner}
              <span className="block text-sm font-normal text-cream-100/60">
                {SITE.ownerTitle}, {SITE.name}
              </span>
            </p>
          </Reveal>
          <div className="grid gap-4">
            {LOCATION.map((l, i) => (
              <Reveal key={l.title} from="right" delay={i * 0.1} className="rounded-3xl border border-cream-50/10 bg-cream-50/[0.04] p-6">
                <l.icon className="size-6 text-gold-400" />
                <h3 className="mt-4 text-xl font-medium">{l.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream-100/70">{l.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading align="center" eyebrow="What we stand for" title="How we work with buyers" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <TiltCard className="card h-full p-7">
                  <span className="grid size-12 place-items-center rounded-2xl bg-pod-100 text-pod-600">
                    <v.icon className="size-6" />
                  </span>
                  <h3 className="mt-6 text-xl font-medium text-forest-900">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{v.text}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream-100/60 py-20 sm:py-28">
        <div className="container-x grid items-stretch gap-6 lg:grid-cols-2">
          <Reveal from="left" className="card overflow-hidden">
            <iframe
              title="Nithi Global Traders office location in Kambam, Theni"
              src={SITE.mapEmbed}
              className="h-full min-h-[360px] w-full border-0 grayscale-[30%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Reveal>
          <LicencesCard />
        </div>
      </section>

      <CTASection />
    </>
  )
}
