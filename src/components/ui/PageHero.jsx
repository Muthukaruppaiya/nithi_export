import { Link } from 'react-router'
import { motion } from 'motion/react'
import { ChevronRight } from 'lucide-react'
import Img from './Img'

export default function PageHero({ eyebrow, title, intro, image, crumbs = [], children }) {
  return (
    <section className="grain relative overflow-hidden bg-forest-950 pt-36 pb-20 text-cream-50 sm:pt-44 sm:pb-28">
      {image && (
        <div className="absolute inset-0 -z-20">
          <Img src={image} alt="" priority sizes="100vw" className="size-full scale-105 object-cover opacity-35" />
        </div>
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-forest-950/70 via-forest-950/80 to-forest-950" />
      <div className="pointer-events-none absolute top-1/3 -left-32 -z-10 size-96 rounded-full bg-pod-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 -z-10 size-80 rounded-full bg-gold-500/15 blur-3xl" />

      <div className="container-x relative">
        <motion.nav
          aria-label="Breadcrumb"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ol className="flex flex-wrap items-center gap-1.5 text-xs font-semibold text-cream-100/60">
            <li>
              <Link to="/" className="hover:text-gold-400">
                Home
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c} className="flex items-center gap-1.5">
                <ChevronRight className="size-3.5" />
                <span aria-current="page" className="text-gold-400">
                  {c}
                </span>
              </li>
            ))}
          </ol>
        </motion.nav>

        <motion.p
          className="eyebrow mt-8 !text-gold-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          className="mt-5 max-w-4xl text-4xl leading-[1.05] font-medium sm:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}
        </motion.h1>
        {intro && (
          <motion.p
            className="mt-6 max-w-2xl text-base leading-relaxed text-cream-100/75 sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {intro}
          </motion.p>
        )}
        {children}
      </div>
    </section>
  )
}
