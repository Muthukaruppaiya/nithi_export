import { motion } from 'motion/react'
import Reveal from '../ui/Reveal'
import { ORDER_STEPS } from '../../data/content'

export default function OrderSteps() {
  return (
    <ol className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {ORDER_STEPS.map((s, i) => (
        <Reveal as="li" key={s.title} delay={i * 0.08} className="group relative">
          <div className="card relative h-full overflow-hidden p-7 transition duration-500 hover:-translate-y-1.5">
            <motion.div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-1 origin-left bg-gradient-to-r from-pod-500 to-gold-500"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 + i * 0.12 }}
            />
            <div className="flex items-baseline gap-4">
              <span className="font-display text-5xl font-semibold text-pod-500/30 transition group-hover:text-gold-500">
                {i + 1}
              </span>
              <h3 className="text-lg font-semibold text-forest-900">{s.title}</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted">{s.text}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  )
}
