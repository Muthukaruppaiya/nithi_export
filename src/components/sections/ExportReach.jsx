import { Anchor, Clock, Ship, Wallet } from 'lucide-react'
import Scene from '../ui/Scene'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import { MARKETS } from '../../data/content'

const loadGlobe = () => import('../../three/GlobeScene')

const FACTS = [
  { icon: Ship, label: 'Incoterms', value: 'FOB or CIF to your port' },
  { icon: Clock, label: 'Lead time', value: '~7 days from advance to shipment' },
  { icon: Anchor, label: 'Container', value: '20ft carries about 12 to 14 ton' },
  { icon: Wallet, label: 'Payment', value: 'Advance TT, LC at sight or agreed split' },
]

const GlobeFallback = (
  <div className="grid size-full place-items-center">
    <div className="size-[70%] animate-pulse rounded-full bg-gradient-to-br from-forest-700/60 to-forest-900" />
  </div>
)

export default function ExportReach() {
  const countries = [...new Set(MARKETS.map((m) => m.country))]
  return (
    <section className="grain relative overflow-hidden bg-forest-950 py-20 text-cream-50 sm:py-28">
      <div className="pointer-events-none absolute top-1/2 left-1/4 -z-10 size-[520px] -translate-y-1/2 rounded-full bg-pod-600/15 blur-3xl" />
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <Reveal from="scale" className="relative order-2 aspect-square w-full lg:order-1">
          <Scene load={loadGlobe} className="size-full cursor-grab active:cursor-grabbing" fallback={GlobeFallback} />
          <p className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-cream-100/40">
            Drag to rotate
          </p>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading
            light
            eyebrow="Where we ship"
            title="From the Kerala border to the ports of the Gulf and Bangladesh"
            intro="We supply importers, wholesalers and spice packers in the UAE, Saudi Arabia and Bangladesh, shipping from South India on the date we agree."
          />
          <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-2">
            {countries.map((c) => (
              <span key={c} className="rounded-full border border-gold-400/30 bg-gold-500/10 px-4 py-2 text-sm font-semibold text-gold-200">
                {c}
              </span>
            ))}
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {FACTS.map((f, i) => (
              <Reveal key={f.label} delay={0.15 + i * 0.07} className="rounded-2xl border border-cream-50/10 bg-cream-50/[0.04] p-5">
                <f.icon className="size-5 text-pod-300" />
                <p className="mt-3 text-xs font-bold tracking-widest text-cream-100/50 uppercase">{f.label}</p>
                <p className="mt-1 text-sm font-semibold">{f.value}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
