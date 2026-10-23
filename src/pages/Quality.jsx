import { Droplets, Eye, FlaskConical, Lock, Ruler, Video } from 'lucide-react'
import Seo from '../seo/Seo'
import PageHero from '../components/ui/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/ui/Reveal'
import TiltCard from '../components/ui/TiltCard'
import Img from '../components/ui/Img'
import CTASection from '../components/ui/CTASection'
import QualitySteps from '../components/sections/QualitySteps'
import { DocumentsCard, LicencesCard } from '../components/sections/DocsAndLicences'

const CHECKS = [
  { icon: Ruler, title: 'Size by sieve', text: 'Each lot is sieved to confirm it matches the grade you ordered: 8 mm, 7 to 8 mm or 6 to 7 mm.' },
  { icon: Droplets, title: 'Moisture by meter', text: 'Moisture is measured with a meter to confirm the pods are properly dried before packing.' },
  { icon: Eye, title: 'Colour by eye', text: 'Pods are inspected for an even green colour, the first thing your customers will see.' },
  { icon: FlaskConical, title: 'Foreign matter and splits', text: 'We check for foreign matter and split pods, which lower the value of a lot.' },
]

const PROOF = [
  {
    icon: FlaskConical,
    title: 'Accredited lab report',
    text: 'Each export lot is tested for pesticide residue at an accredited laboratory, and the report is shared with you before shipping.',
    image: '/images/cardamom-capsules-seeds',
  },
  {
    icon: Video,
    title: 'Photos and video of your lot',
    text: 'We photograph and video each lot, the weighing and the loading, and send them to you before the container leaves.',
    image: '/images/container-ship',
  },
  {
    icon: Lock,
    title: 'Sealed 200 g reference sample',
    text: 'We keep a sealed 200 g sample of every lot for 6 months. If a question ever comes up, we check it against the original.',
    image: '/images/green-cardamom-pods',
  },
]

export default function Quality() {
  return (
    <>
      <Seo
        title="Quality Control – Lab-Tested Cardamom"
        description="Sample-approved sourcing, sieve, moisture and colour checks, pesticide residue lab tests, photo and video proof of every lot, and sealed 200 g reference samples."
        path="/quality"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Quality', path: '/quality' },
        ]}
      />
      <PageHero
        eyebrow="How we protect quality"
        title="Checked, tested and documented. Lot by lot."
        intro="Quality is not a promise on paper. It is a set of checks we run on every lot, with proof sent to you before shipping."
        image="/images/cardamom-close-up"
        crumbs={['Quality']}
      />

      <section className="grain relative overflow-hidden bg-forest-900 py-20 text-cream-50 sm:py-24">
        <div className="container-x">
          <SectionHeading light eyebrow="Five steps" title="Our quality process, from hill to container" />
          <div className="mt-12">
            <QualitySteps />
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal from="left" className="relative">
            <TiltCard className="overflow-hidden rounded-[2rem] shadow-2xl shadow-forest-900/20">
              <Img src="/images/cardamom-hundred-pods" alt="Dried green cardamom pods ready for inspection" className="aspect-[4/3] w-full object-cover" />
            </TiltCard>
            <div className="absolute -bottom-6 left-6 rounded-2xl bg-gold-500 px-5 py-4 text-forest-950 shadow-xl">
              <p className="text-xs font-bold tracking-widest uppercase">Every lot</p>
              <p className="font-display text-2xl">Checked on arrival</p>
            </div>
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="On arrival"
              title="Four checks before a lot is accepted"
              intro="We buy graded lots from trusted growers and dealers in Idukki, and approve a sample before any bag is bought. When the lot arrives, it is checked again."
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {CHECKS.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.08} className="rounded-2xl border border-forest-900/10 bg-white p-5">
                  <c.icon className="size-6 text-pod-500" />
                  <h3 className="mt-3 font-sans text-base font-bold text-forest-900">{c.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{c.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream-100/60 py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading align="center" eyebrow="Proof, not promises" title="What you receive before shipping" />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {PROOF.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <TiltCard className="card group h-full overflow-hidden">
                  <div className="aspect-[16/10] overflow-hidden">
                    <Img src={p.image} alt="" sizes="(min-width:768px) 33vw, 100vw" className="size-full object-cover transition duration-700 group-hover/tilt:scale-110" />
                  </div>
                  <div className="p-7">
                    <span className="-mt-14 grid size-14 place-items-center rounded-2xl bg-forest-900 text-gold-400 shadow-lg ring-4 ring-white">
                      <p.icon className="size-6" />
                    </span>
                    <h3 className="mt-5 text-xl font-medium text-forest-900">{p.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted">{p.text}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-x grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <DocumentsCard />
          <LicencesCard />
        </div>
      </section>

      <CTASection title="Ask for a sample and a recent lab report" />
    </>
  )
}
