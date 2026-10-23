import { Anchor, CalendarClock, CreditCard, Scale, Tag } from 'lucide-react'
import Seo from '../seo/Seo'
import { faqSchema } from '../seo/schema'
import PageHero from '../components/ui/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/ui/Reveal'
import TiltCard from '../components/ui/TiltCard'
import CTASection from '../components/ui/CTASection'
import OrderSteps from '../components/sections/OrderSteps'
import ExportReach from '../components/sections/ExportReach'
import FaqList from '../components/sections/FaqList'
import { DocumentsCard } from '../components/sections/DocsAndLicences'
import { TERMS } from '../data/content'

const TERM_ICONS = [Anchor, CreditCard, CalendarClock, Scale, Tag]

export default function ExportProcess() {
  return (
    <>
      <Seo
        title="How to Import Cardamom – Terms & FAQ"
        description="Import green cardamom from India in 6 steps: FOB or CIF, TT or LC at sight, about 7 days to shipment, 1–2 ton trial orders and full export documents."
        path="/export-process"
        image="/images/og-shipping.jpg"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Export Process', path: '/export-process' },
        ]}
        jsonLd={[faqSchema()]}
      />
      <PageHero
        eyebrow="Export process"
        title="Importing cardamom from India, made simple"
        intro="Clear terms, a six-step process and complete paperwork. Here is exactly how an order with us works."
        image="/images/container-ship-sunset"
        crumbs={['Export Process']}
      />

      <section className="py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="How to order" title="From enquiry to delivery in six steps" />
          <div className="mt-12">
            <OrderSteps />
          </div>
        </div>
      </section>

      <section className="bg-cream-100/60 py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Terms in brief" title="Trade terms" intro="Agreed in writing before shipping. Terms for repeat buyers by agreement." />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {TERMS.map((t, i) => {
              const Icon = TERM_ICONS[i]
              return (
                <Reveal key={t.label} delay={i * 0.07} className={i === 1 ? 'sm:col-span-2 lg:col-span-1' : ''}>
                  <TiltCard className="card h-full p-6">
                    <span className="grid size-11 place-items-center rounded-2xl bg-forest-900 text-gold-400">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="mt-5 font-sans text-xs font-bold tracking-widest text-pod-600 uppercase">{t.label}</h3>
                    <p className="mt-2 text-sm leading-relaxed font-medium text-forest-900">{t.value}</p>
                  </TiltCard>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      <ExportReach />

      <section className="py-20 sm:py-28">
        <div className="container-x">
          <DocumentsCard />
        </div>
      </section>

      <section className="bg-cream-100/60 py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions importers ask us"
            intro="Can’t find your answer? Message us on WhatsApp or send an enquiry."
          />
          <Reveal from="right">
            <FaqList />
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  )
}
