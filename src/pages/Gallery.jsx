import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import Seo from '../seo/Seo'
import PageHero from '../components/ui/PageHero'
import Img from '../components/ui/Img'
import CTASection from '../components/ui/CTASection'
import { GALLERY, GALLERY_CATEGORIES } from '../data/gallery'
import { SITE } from '../data/site'

function Lightbox({ items, index, onClose, onNav }) {
  const item = items[index]

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNav(1)
      if (e.key === 'ArrowLeft') onNav(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onNav])

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={item.caption}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-forest-950/95 p-4 backdrop-blur-md sm:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <button type="button" aria-label="Close" onClick={onClose} className="absolute top-5 right-5 grid size-12 place-items-center rounded-full bg-cream-50/10 text-cream-50 hover:bg-cream-50/20">
        <X className="size-6" />
      </button>
      <button
        type="button"
        aria-label="Previous photo"
        onClick={(e) => {
          e.stopPropagation()
          onNav(-1)
        }}
        className="absolute left-3 z-10 grid size-12 place-items-center rounded-full bg-cream-50/10 text-cream-50 hover:bg-cream-50/20 sm:left-6"
      >
        <ChevronLeft className="size-6" />
      </button>
      <button
        type="button"
        aria-label="Next photo"
        onClick={(e) => {
          e.stopPropagation()
          onNav(1)
        }}
        className="absolute right-3 z-10 grid size-12 place-items-center rounded-full bg-cream-50/10 text-cream-50 hover:bg-cream-50/20 sm:right-6"
      >
        <ChevronRight className="size-6" />
      </button>

      <AnimatePresence mode="wait">
        <motion.figure
          key={item.src}
          initial={{ opacity: 0, scale: 0.94, rotateY: -12 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: 0.96, rotateY: 12 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="max-h-full max-w-5xl [perspective:1200px]"
          onClick={(e) => e.stopPropagation()}
        >
          <img src={`${item.src}.webp`} alt={item.alt} className="max-h-[78vh] w-auto rounded-2xl object-contain shadow-2xl" />
          <figcaption className="mt-4 text-center text-cream-50">
            <span className="font-display text-xl">{item.caption}</span>
            <span className="mt-1 block text-xs text-cream-100/50">
              {index + 1} / {items.length}
            </span>
          </figcaption>
        </motion.figure>
      </AnimatePresence>
    </motion.div>
  )
}

export default function Gallery() {
  const [filter, setFilter] = useState('All')
  const [open, setOpen] = useState(-1)
  const items = filter === 'All' ? GALLERY : GALLERY.filter((g) => g.category === filter)

  const close = useCallback(() => setOpen(-1), [])
  const nav = useCallback((d) => setOpen((i) => (i + d + items.length) % items.length), [items.length])

  return (
    <>
      <Seo
        title="Gallery – Cardamom, Plantations and Shipping"
        description="Photos of Idukki green cardamom, the cardamom hills of Kerala, and export shipping from Nithi Global Traders."
        path="/gallery"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Gallery', path: '/gallery' },
        ]}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'ImageGallery',
            name: `${SITE.name} gallery`,
            image: GALLERY.map((g) => ({
              '@type': 'ImageObject',
              contentUrl: `${SITE.url}${g.src}.webp`,
              caption: g.caption,
              description: g.alt,
            })),
          },
        ]}
      />
      <PageHero
        eyebrow="Gallery"
        title="From the hills of Idukki to your port"
        intro="The cardamom we trade, the hills it grows in, and how it travels."
        image="/images/idukki-hills"
        crumbs={['Gallery']}
      />

      <section className="py-16 sm:py-24">
        <div className="container-x">
          <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Filter photos">
            {GALLERY_CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                role="tab"
                aria-selected={filter === c}
                onClick={() => setFilter(c)}
                className={`relative rounded-full px-5 py-2.5 text-sm font-bold transition ${
                  filter === c ? 'text-cream-50' : 'bg-white text-forest-900 ring-1 ring-forest-900/10 hover:ring-forest-900/30'
                }`}
              >
                {filter === c && <motion.span layoutId="gallery-pill" className="absolute inset-0 rounded-full bg-forest-900" />}
                <span className="relative">{c}</span>
              </button>
            ))}
          </div>

          <motion.div layout className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
            <AnimatePresence mode="popLayout">
              {items.map((g, i) => (
                <motion.figure
                  layout
                  key={g.src}
                  initial={{ opacity: 0, y: 30, rotateX: 12 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, margin: '0px 0px -60px 0px' }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative mb-5 break-inside-avoid overflow-hidden rounded-3xl [perspective:1000px]"
                >
                  <button type="button" onClick={() => setOpen(i)} className="block w-full text-left" aria-label={`Open photo: ${g.caption}`}>
                    <Img
                      src={g.src}
                      alt={g.alt}
                      width={g.w}
                      height={g.h}
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      className="w-full transition duration-700 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-950/0 opacity-70 transition group-hover:opacity-100" />
                    <span className="absolute top-4 right-4 grid size-10 scale-75 place-items-center rounded-full bg-cream-50/90 text-forest-900 opacity-0 transition group-hover:scale-100 group-hover:opacity-100">
                      <Expand className="size-4" />
                    </span>
                    <figcaption className="absolute bottom-4 left-5 right-5 text-cream-50">
                      <span className="text-[10px] font-bold tracking-[0.2em] text-gold-400 uppercase">{g.category}</span>
                      <span className="mt-1 block font-display text-lg">{g.caption}</span>
                    </figcaption>
                  </button>
                </motion.figure>
              ))}
            </AnimatePresence>
          </motion.div>

          <details className="mt-12 rounded-2xl border border-forest-900/10 bg-white p-5 text-xs text-muted">
            <summary className="cursor-pointer font-semibold text-forest-900">Photo credits</summary>
            <ul className="mt-3 space-y-1">
              {GALLERY.map((g) => (
                <li key={g.src}>{g.credit}</li>
              ))}
            </ul>
          </details>
        </div>
      </section>

      <AnimatePresence>{open >= 0 && <Lightbox items={items} index={open} onClose={close} onNav={nav} />}</AnimatePresence>

      <CTASection />
    </>
  )
}
