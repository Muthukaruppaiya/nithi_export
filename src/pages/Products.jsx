import { useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'motion/react'
import { ArrowRight, Box, FileText, Hand, Package } from 'lucide-react'
import Seo from '../seo/Seo'
import { productsSchema } from '../seo/schema'
import PageHero from '../components/ui/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/ui/Reveal'
import Scene from '../components/ui/Scene'
import TiltCard from '../components/ui/TiltCard'
import CTASection from '../components/ui/CTASection'
import GradeCards from '../components/sections/GradeCards'
import { GRADES, PACKING } from '../data/content'

const loadViewer = () => import('../three/PodViewer')

const SPEC_ROWS = [
  ['Product', 'Green cardamom (Elettaria cardamomum), whole pods'],
  ['Origin', 'Idukki, Kerala, India'],
  ['Grades', '8 mm · 7 to 8 mm · 6 to 7 mm'],
  ['Checks on every lot', 'Sieve size, moisture meter, colour, foreign matter and split pods'],
  ['Lab testing', 'Pesticide residue, accredited laboratory, report shared with buyer'],
  ['Packing', '10 kg cartons or 25 kg / 50 kg PP bags, all with food-grade liner'],
  ['Incoterms', 'FOB or CIF to your port'],
  ['Trial order', '1 to 2 ton'],
  ['20ft container', 'About 12 to 14 ton'],
  ['Sample', 'Free 200 g sample on request'],
]

const PACK_ICONS = [Box, Package, Package]

function GradeExplorer() {
  const [active, setActive] = useState(GRADES[0].id)
  const grade = GRADES.find((g) => g.id === active)

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Compare grades in 3D"
            title="See the size difference"
            intro="Grades are measured by sieve: the size of the hole a pod will not pass through. Pick a grade to compare."
          />
          <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Cardamom grades">
            {GRADES.map((g) => (
              <button
                key={g.id}
                type="button"
                role="tab"
                aria-selected={active === g.id}
                onClick={() => setActive(g.id)}
                className={`relative rounded-full px-5 py-2.5 text-sm font-bold transition ${
                  active === g.id ? 'text-cream-50' : 'bg-white text-forest-900 ring-1 ring-forest-900/10 hover:ring-forest-900/30'
                }`}
              >
                {active === g.id && (
                  <motion.span layoutId="grade-pill" className="absolute inset-0 -z-0 rounded-full bg-forest-900" />
                )}
                <span className="relative">{g.size}</span>
              </button>
            ))}
          </Reveal>
          <motion.div
            key={grade.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 rounded-3xl border border-forest-900/10 bg-white p-6"
          >
            <p className="text-xs font-bold tracking-widest text-pod-600 uppercase">{grade.badge}</p>
            <h3 className="mt-2 text-2xl font-medium text-forest-900">{grade.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{grade.summary}</p>
            <Link to="/contact" state={{ grade: grade.name }} className="btn-primary mt-6">
              Get a quote for {grade.size} <ArrowRight className="size-4" />
            </Link>
          </motion.div>
        </div>

        <Reveal from="scale" className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-gradient-to-br from-pod-100 via-cream-100 to-gold-200/60">
            <div className="absolute inset-x-[15%] top-[20%] h-1/2 rounded-full bg-white/70 blur-3xl" />
            <Scene load={loadViewer} active={active} className="absolute inset-0 cursor-grab active:cursor-grabbing" />
            <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-around px-6 text-center">
              {GRADES.map((g) => (
                <span key={g.id} className={`text-xs font-bold transition ${active === g.id ? 'text-forest-900' : 'text-forest-900/40'}`}>
                  {g.size}
                </span>
              ))}
            </div>
            <p className="pointer-events-none absolute top-4 right-5 flex items-center gap-1.5 text-xs font-semibold text-forest-900/50">
              <Hand className="size-3.5" /> Drag to rotate
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default function Products() {
  return (
    <>
      <Seo
        title="Green Cardamom Grades – 8 mm, 7–8 mm, 6–7 mm"
        description="Export grades of Idukki green cardamom: 8 mm, 7 to 8 mm and 6 to 7 mm. Packed in 10 kg cartons or 25/50 kg PP bags with food-grade liner. FOB or CIF. Free 200 g sample."
        path="/products"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Products', path: '/products' },
        ]}
        jsonLd={productsSchema()}
      />
      <PageHero
        eyebrow="Our products"
        title="Idukki green cardamom in three export grades"
        intro="Whole green cardamom pods, graded by size, checked lot by lot and packed in food-grade liners for importers, wholesalers and spice packers."
        image="/images/cardamom-pods-bowl"
        crumbs={['Products']}
      />

      <GradeExplorer />

      <section className="bg-cream-100/60 py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Grades" title="Choose the grade that fits your market" />
          <div className="mt-12">
            <GradeCards detailed />
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <SectionHeading
              eyebrow="Specifications"
              title="Product specification"
              intro="A full specification sheet is sent with every quote. Here is a summary of what we supply."
            />
            <Reveal delay={0.1} className="mt-8 flex items-start gap-4 rounded-3xl bg-forest-900 p-6 text-cream-50">
              <FileText className="size-6 shrink-0 text-gold-400" />
              <p className="text-sm leading-relaxed text-cream-100/80">
                Need the full specification sheet or a lab report from a recent lot?{' '}
                <Link to="/contact" className="font-bold text-gold-400 underline-offset-4 hover:underline">
                  Ask us
                </Link>{' '}
                and we will send it with this week’s price.
              </p>
            </Reveal>
          </div>
          <Reveal from="right">
            <div className="card overflow-hidden">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">Green cardamom export specification</caption>
                <tbody className="divide-y divide-forest-900/8">
                  {SPEC_ROWS.map(([k, v]) => (
                    <tr key={k} className="transition hover:bg-pod-100/50">
                      <th scope="row" className="w-2/5 px-6 py-4 font-semibold text-forest-900">
                        {k}
                      </th>
                      <td className="px-6 py-4 text-muted">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="grain relative overflow-hidden bg-forest-900 py-20 text-cream-50 sm:py-28">
        <div className="container-x">
          <SectionHeading light eyebrow="Packing options" title="Packed to arrive the way it left" intro="Every pack uses a food-grade inner liner to protect colour and aroma in transit." />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PACKING.map((p, i) => {
              const Icon = PACK_ICONS[i]
              return (
                <Reveal key={p.title} delay={i * 0.1}>
                  <TiltCard className="h-full rounded-3xl border border-cream-50/10 bg-cream-50/[0.04] p-8">
                    <Icon className="size-8 text-gold-400" />
                    <h3 className="mt-6 text-2xl font-medium">{p.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-cream-100/70">{p.detail}</p>
                  </TiltCard>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <CTASection title="Get this week’s price for your grade" />
    </>
  )
}
