import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import Reveal from './Reveal'
import { waLink } from '../../data/site'
import { WhatsAppIcon } from '../layout/WhatsAppFloat'

export default function CTASection({
  title = 'Ready for this week’s cardamom price?',
  text = 'Send your company name, country, grade, quantity and port. We reply with a specification sheet, a price quote and, on request, a free 200 g sample.',
}) {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-x">
        <Reveal from="scale">
          <div className="grain relative overflow-hidden rounded-[2rem] bg-forest-900 px-6 py-14 text-center text-cream-50 sm:px-12 sm:py-20">
            <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-64 w-[80%] -translate-x-1/2 rounded-full bg-pod-500/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -left-10 -z-10 size-72 rounded-full bg-gold-500/20 blur-3xl" />
            <p className="eyebrow justify-center !text-gold-400">Request a quote</p>
            <h2 className="mx-auto mt-5 max-w-3xl text-3xl leading-tight font-medium sm:text-5xl">{title}</h2>
            <p className="mx-auto mt-5 max-w-2xl text-cream-100/75 sm:text-lg">{text}</p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Link to="/contact" className="btn-primary">
                Request a Quote <ArrowRight className="size-4" />
              </Link>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-ghost text-cream-50">
                <WhatsAppIcon className="size-4" /> WhatsApp +91 93425 00730
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
