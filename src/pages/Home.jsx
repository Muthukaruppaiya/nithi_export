import { Link } from 'react-router'
import { motion } from 'motion/react'
import { ArrowRight, ArrowUpRight, BadgeCheck, FlaskConical, MapPin, Package, ShieldCheck } from 'lucide-react'
import Seo from '../seo/Seo'
import { websiteSchema } from '../seo/schema'
import Scene from '../components/ui/Scene'
import Reveal from '../components/ui/Reveal'
import SectionHeading from '../components/ui/SectionHeading'
import TiltCard from '../components/ui/TiltCard'
import Img from '../components/ui/Img'
import CTASection from '../components/ui/CTASection'
import GradeCards from '../components/sections/GradeCards'
import QualitySteps from '../components/sections/QualitySteps'
import OrderSteps from '../components/sections/OrderSteps'
import ExportReach from '../components/sections/ExportReach'
import { DocumentsCard, LicencesCard } from '../components/sections/DocsAndLicences'
import { WhatsAppIcon } from '../components/layout/WhatsAppFloat'
import { PACKING, STATS } from '../data/content'
import { GALLERY } from '../data/gallery'
import { waLink } from '../data/site'

const loadHero = () => import('../three/HeroScene')

const TICKER = [
  'Green cardamom 8 mm',
  'Green cardamom 7 to 8 mm',
  'Green cardamom 6 to 7 mm',
  'FOB or CIF',
  'Pesticide residue lab-tested',
  'Photo and video of every lot',
  'Free 200 g sample',
  'Spices Board registered',
]

const ease = [0.22, 1, 0.36, 1]

function Hero() {
  return (
    <section className="grain relative flex min-h-[100svh] items-center overflow-hidden bg-forest-950 pt-28 pb-16 text-cream-50 lg:pt-24">
      <div className="absolute inset-0 -z-20 opacity-25">
        <Img src="/images/cardamom-hills" alt="" priority sizes="100vw" className="size-full object-cover" />
      </div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_45%,rgba(125,161,63,.28),transparent_55%),linear-gradient(to_bottom,rgba(8,24,15,.75),rgba(8,24,15,.92)_70%,#08180f)]" />

      <div className="container-x grid items-center gap-6 lg:grid-cols-[1.05fr_1fr]">
        <div className="relative z-10">
          <motion.p
            className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-500/10 px-4 py-1.5 text-xs font-bold tracking-wider text-gold-200"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <MapPin className="size-3.5" /> Idukki cardamom · Shipped from Kambam, India
          </motion.p>

          <motion.h1
            className="mt-7 text-[2.6rem] leading-[1.02] font-medium sm:text-6xl xl:text-7xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease }}
          >
            Export-quality <span className="text-gradient italic">green cardamom</span> from Idukki, India
          </motion.h1>

          <motion.p
            className="mt-6 max-w-xl text-base leading-relaxed text-cream-100/75 sm:text-lg"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease }}
          >
            We supply importers, wholesalers and spice packers in the UAE, Saudi Arabia and Bangladesh. The grade you
            order, checked and documented, shipped on the date we agree.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease }}
          >
            <Link to="/contact" className="btn-primary">
              Request this week’s price <ArrowRight className="size-4" />
            </Link>
            <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-ghost text-cream-50">
              <WhatsAppIcon className="size-4" /> Chat on WhatsApp
            </a>
          </motion.div>

          <motion.ul
            className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-cream-100/70 sm:flex sm:flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {[
              [BadgeCheck, 'Spices Board registered'],
              [FlaskConical, 'Lab-tested lots'],
              [ShieldCheck, 'IEC and FSSAI licensed'],
              [Package, 'Food-grade packing'],
            ].map(([Icon, t]) => (
              <li key={t} className="flex items-center gap-2">
                <Icon className="size-4 shrink-0 text-pod-300" /> {t}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          className="relative -mx-5 h-[360px] sm:h-[460px] lg:mx-0 lg:h-[640px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease }}
        >
          <div className="pointer-events-none absolute inset-[12%] rounded-full bg-pod-500/20 blur-3xl" />
          <div className="pointer-events-none absolute inset-[18%] rounded-full border border-gold-400/15" />
          <div className="pointer-events-none absolute inset-[6%] rounded-full border border-dashed border-cream-50/10" />
          <Scene load={loadHero} className="absolute inset-0" />
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-bold tracking-[0.3em] text-cream-100/40 uppercase lg:flex">
        Scroll
        <span className="h-10 w-px overflow-hidden bg-cream-50/10">
          <span className="block h-1/2 w-full animate-bounce bg-gold-400" />
        </span>
      </div>
    </section>
  )
}

function Ticker() {
  const items = [...TICKER, ...TICKER]
  return (
    <div className="overflow-hidden border-y border-gold-600/30 bg-gold-500 py-4 text-forest-950" aria-hidden="true">
      <div className="flex w-max animate-marquee gap-10">
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-10 text-sm font-bold tracking-wide whitespace-nowrap uppercase">
            {t}
            <span className="size-1.5 rounded-full bg-forest-900/50" />
          </span>
        ))}
      </div>
    </div>
  )
}

function Intro() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <Reveal from="left">
            <TiltCard className="overflow-hidden rounded-[2rem] shadow-2xl shadow-forest-900/25">
              <Img
                src="/images/cardamom-plantation-view"
                alt="Cardamom plantation on the hills of Idukki, Kerala"
                className="aspect-[4/5] w-full object-cover"
                width={1280}
                height={960}
              />
            </TiltCard>
          </Reveal>
          <Reveal from="up" delay={0.25} className="absolute -right-4 -bottom-10 w-[48%] sm:-right-8">
            <TiltCard className="overflow-hidden rounded-3xl border-8 border-cream-50 shadow-2xl shadow-forest-900/30">
              <Img
                src="/images/cardamom-pods-bowl"
                alt="Graded green cardamom pods"
                sizes="300px"
                className="aspect-square w-full object-cover"
              />
            </TiltCard>
          </Reveal>
          <Reveal delay={0.4} className="absolute top-8 -left-3 sm:-left-8">
            <div className="animate-float-slow rounded-2xl bg-forest-900 px-5 py-4 text-cream-50 shadow-xl">
              <p className="font-display text-3xl text-gold-400">Idukki</p>
              <p className="text-xs text-cream-100/70">Kerala’s cardamom hills</p>
            </div>
          </Reveal>
        </div>

        <div className="lg:pl-6">
          <SectionHeading
            eyebrow="Who we are"
            title="A cardamom exporter on the doorstep of the growing hills"
            intro="Nithi Global Traders is an India-based exporter of green cardamom from the Idukki region of Kerala. Our office is in Kambam, Theni, close to the Kerala border and the cardamom-growing hills, so we see and check every lot ourselves before it is packed."
          />
          <Reveal delay={0.15} className="mt-10 grid grid-cols-2 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-2xl border border-forest-900/10 bg-white p-5">
                <p className="font-display text-3xl font-semibold text-forest-900 sm:text-4xl">{s.value}</p>
                <p className="mt-1 text-xs font-semibold text-muted sm:text-sm">{s.label}</p>
              </div>
            ))}
          </Reveal>
          <Reveal delay={0.25}>
            <Link to="/about" className="btn-dark mt-10">
              More about us <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Packing() {
  return (
    <div className="mt-16 grid gap-4 rounded-3xl border border-forest-900/10 bg-cream-100 p-6 sm:grid-cols-[auto_1fr_1fr_1fr] sm:items-center sm:p-8">
      <div className="pr-4">
        <p className="eyebrow">Packing</p>
        <p className="mt-2 font-display text-2xl text-forest-900">Packed for export</p>
      </div>
      {PACKING.map((p) => (
        <div key={p.title} className="rounded-2xl bg-white p-5">
          <p className="font-semibold text-forest-900">{p.title}</p>
          <p className="mt-1 text-sm text-muted">{p.detail}</p>
        </div>
      ))}
    </div>
  )
}

function GalleryPreview() {
  const pics = [GALLERY[1], GALLERY[0], GALLERY[4], GALLERY[6]]
  return (
    <section className="py-20 sm:py-28">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Gallery"
            title="From the hills to the container"
            intro="A look at the cardamom we trade, the hills it grows in, and how it travels."
          />
          <Reveal>
            <Link to="/gallery" className="btn-dark shrink-0">
              View gallery <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>
        </div>
        <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-4 sm:auto-rows-[220px] lg:grid-cols-4">
          {pics.map((p, i) => (
            <Reveal
              key={p.src}
              delay={i * 0.07}
              className={`group relative overflow-hidden rounded-3xl ${i === 0 ? 'col-span-2 row-span-2' : ''} ${i === 3 ? 'col-span-2' : ''}`}
            >
              <Img
                src={p.src}
                alt={p.alt}
                sizes={i === 0 ? '(min-width:1024px) 50vw, 100vw' : '(min-width:1024px) 25vw, 50vw'}
                className="size-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent opacity-80" />
              <p className="absolute bottom-4 left-4 text-sm font-semibold text-cream-50">{p.caption}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Seo
        title="Green Cardamom Exporter from India | Nithi Global Traders"
        description="Exporter of Idukki green cardamom: 8 mm, 7–8 mm and 6–7 mm grades, lab-tested and documented, shipped FOB or CIF to the UAE, Saudi Arabia and Bangladesh."
        path="/"
        jsonLd={[websiteSchema()]}
      />
      <Hero />
      <Ticker />
      <Intro />

      <section className="bg-cream-100/60 py-20 sm:py-28">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="What we supply"
              title="Three export grades of Idukki green cardamom"
              intro="Graded by sieve, checked for moisture and colour, and packed in food-grade liners."
            />
            <Reveal>
              <Link to="/products" className="btn-dark shrink-0">
                All product details <ArrowUpRight className="size-4" />
              </Link>
            </Reveal>
          </div>
          <div className="mt-12">
            <GradeCards />
          </div>
          <Reveal>
            <Packing />
          </Reveal>
        </div>
      </section>

      <section className="grain relative overflow-hidden bg-forest-900 py-20 text-cream-50 sm:py-28">
        <div className="pointer-events-none absolute -top-40 right-0 -z-10 size-[480px] rounded-full bg-gold-500/10 blur-3xl" />
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              light
              eyebrow="How we protect quality"
              title="Every lot checked, tested and filmed before it ships"
            />
            <Reveal>
              <Link to="/quality" className="btn-ghost shrink-0 text-cream-50">
                Our quality process <ArrowUpRight className="size-4" />
              </Link>
            </Reveal>
          </div>
          <div className="mt-12">
            <QualitySteps />
          </div>
        </div>
      </section>

      <ExportReach />

      <section className="py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="How to order"
            title="Six clear steps from enquiry to delivery"
            intro="No surprises. You see the sample, the lot, the weighing and the loading before your cardamom leaves India."
          />
          <div className="mt-14">
            <OrderSteps />
          </div>
        </div>
      </section>

      <section className="bg-cream-100/60 py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="Paperwork done right"
            title="Fully documented and properly registered"
            intro="Customs-ready paperwork with every shipment, from a business registered with the Spices Board of India."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <DocumentsCard />
            <LicencesCard />
          </div>
        </div>
      </section>

      <GalleryPreview />
      <CTASection />
    </>
  )
}
