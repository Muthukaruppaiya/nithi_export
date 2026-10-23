import { Camera, FlaskConical, Leaf, PackageCheck, ScanSearch } from 'lucide-react'
import Reveal from '../ui/Reveal'
import TiltCard from '../ui/TiltCard'
import { QUALITY_STEPS } from '../../data/content'

const ICONS = [Leaf, ScanSearch, FlaskConical, Camera, PackageCheck]

export default function QualitySteps({ light = true }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
      {QUALITY_STEPS.map((s, i) => {
        const Icon = ICONS[i]
        return (
          <Reveal key={s.title} delay={i * 0.08} className="h-full">
            <TiltCard
              className={`h-full rounded-3xl p-6 ${
                light ? 'border border-cream-50/10 bg-cream-50/[0.04] backdrop-blur' : 'card'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`grid size-12 place-items-center rounded-2xl ${
                    light ? 'bg-pod-500/15 text-pod-300' : 'bg-pod-100 text-pod-600'
                  }`}
                >
                  <Icon className="size-6" />
                </span>
                <span className={`font-display text-3xl ${light ? 'text-cream-50/15' : 'text-forest-900/10'}`}>
                  0{i + 1}
                </span>
              </div>
              <h3 className={`mt-6 text-lg font-semibold ${light ? 'text-cream-50' : 'text-forest-900'}`}>{s.title}</h3>
              <p className={`mt-2 text-sm leading-relaxed ${light ? 'text-cream-100/65' : 'text-muted'}`}>{s.text}</p>
            </TiltCard>
          </Reveal>
        )
      })}
    </div>
  )
}
