export function LogoMark({ className = 'size-10' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="ngt-pod" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#bdd68c" />
          <stop offset="1" stopColor="#5f8a2c" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="23" fill="#10291c" />
      <circle cx="24" cy="24" r="21.5" fill="none" stroke="#c8a24c" strokeWidth="1" strokeDasharray="2 3" />
      <path d="M24 9c6.5 4.5 8.6 11.5 7.6 18.4C30.7 33.6 27.6 37.6 24 39.5c-3.6-1.9-6.7-5.9-7.6-12.1C15.4 20.5 17.5 13.5 24 9Z" fill="url(#ngt-pod)" />
      <path d="M24 11.5v26" stroke="#10291c" strokeOpacity=".35" strokeWidth="1.2" />
      <path d="M24 39.5v3.5" stroke="#c8a24c" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export default function Logo({ light = false }) {
  return (
    <span className="flex items-center gap-3">
      <LogoMark />
      <span className="leading-none">
        <span className={`block font-display text-lg font-semibold ${light ? 'text-cream-50' : 'text-forest-900'}`}>
          Nithi Global Traders
        </span>
        <span className={`mt-1 block text-[10px] font-bold tracking-[0.22em] uppercase ${light ? 'text-gold-400' : 'text-pod-600'}`}>
          Cardamom Exporter · India
        </span>
      </span>
    </span>
  )
}
