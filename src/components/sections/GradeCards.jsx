import { Link } from 'react-router'
import { ArrowUpRight, Check } from 'lucide-react'
import Reveal from '../ui/Reveal'
import TiltCard from '../ui/TiltCard'
import Img from '../ui/Img'
import { GRADES } from '../../data/content'

export default function GradeCards({ detailed = false }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {GRADES.map((g, i) => (
        <Reveal key={g.id} delay={i * 0.1}>
          <TiltCard className="card h-full overflow-hidden">
            <article className="flex h-full flex-col">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Img
                  src={g.image}
                  alt={`${g.name} export grade`}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="size-full object-cover transition duration-700 group-hover/tilt:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent" />
                <span className="absolute top-4 left-4 rounded-full bg-cream-50/95 px-3 py-1 text-xs font-bold text-forest-900">
                  {g.badge}
                </span>
                <span className="absolute right-4 bottom-4 font-display text-4xl font-semibold text-cream-50 [text-shadow:0_2px_20px_rgba(0,0,0,.4)]">
                  {g.size}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <h3 className="text-xl font-semibold text-forest-900">{g.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{g.summary}</p>
                {detailed && (
                  <ul className="mt-5 space-y-2 text-sm">
                    {g.uses.map((u) => (
                      <li key={u} className="flex items-center gap-2 text-forest-800">
                        <Check className="size-4 text-pod-500" /> {u}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-auto pt-6">
                  <Link
                    to="/contact"
                    state={{ grade: g.name }}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-pod-600 transition hover:gap-2.5 hover:text-forest-900"
                  >
                    Get price for {g.size} <ArrowUpRight className="size-4" />
                  </Link>
                </div>
              </div>
            </article>
          </TiltCard>
        </Reveal>
      ))}
    </div>
  )
}
