import { BadgeCheck, FileText } from 'lucide-react'
import Reveal from '../ui/Reveal'
import { DOCUMENTS, LICENCES } from '../../data/content'

export function DocumentsCard() {
  return (
    <Reveal from="left" className="card h-full p-7 sm:p-9">
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-2xl bg-pod-100 text-pod-600">
          <FileText className="size-5" />
        </span>
        <h3 className="text-2xl font-medium text-forest-900">Documents with every shipment</h3>
      </div>
      <ul className="mt-7 grid gap-3 sm:grid-cols-2">
        {DOCUMENTS.map((d) => (
          <li key={d} className="flex items-start gap-2.5 rounded-2xl bg-cream-100 px-4 py-3 text-sm font-medium text-forest-800">
            <BadgeCheck className="mt-0.5 size-4 shrink-0 text-pod-500" /> {d}
          </li>
        ))}
      </ul>
    </Reveal>
  )
}

export function LicencesCard() {
  return (
    <Reveal from="right" className="grain relative h-full overflow-hidden rounded-3xl bg-forest-900 p-7 text-cream-50 sm:p-9">
      <div className="pointer-events-none absolute -top-16 -right-16 -z-10 size-56 rounded-full bg-gold-500/20 blur-3xl" />
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-2xl bg-gold-500/15 text-gold-400">
          <BadgeCheck className="size-5" />
        </span>
        <h3 className="text-2xl font-medium">Licences and registrations</h3>
      </div>
      <dl className="mt-7 divide-y divide-cream-50/10">
        {LICENCES.map((l) => (
          <div key={l.label} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between">
            <dt className="text-sm text-cream-100/65">{l.label}</dt>
            <dd className="font-mono text-sm font-semibold tracking-wide text-gold-200">{l.value}</dd>
          </div>
        ))}
      </dl>
    </Reveal>
  )
}
