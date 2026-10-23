import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, intro, align = 'left', light = false, className = '' }) {
  const center = align === 'center'
  return (
    <Reveal className={`${center ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      {eyebrow && <p className={`eyebrow ${light ? '!text-gold-400' : ''} ${center ? 'justify-center' : ''}`}>{eyebrow}</p>}
      <h2
        className={`mt-4 text-3xl leading-[1.1] font-medium sm:text-4xl lg:text-5xl ${light ? 'text-cream-50' : 'text-forest-900'}`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-5 text-base leading-relaxed sm:text-lg ${light ? 'text-cream-100/75' : 'text-muted'}`}>{intro}</p>
      )}
    </Reveal>
  )
}
