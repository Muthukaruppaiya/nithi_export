import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X, Phone, ArrowUpRight } from 'lucide-react'
import Logo from './Logo'
import { NAV, SITE } from '../../data/site'

export default function Header() {
  const { pathname } = useLocation()
  const [openOn, setOpenOn] = useState(null)
  const open = openOn === pathname
  const setOpen = (fn) => setOpenOn(fn(open) ? pathname : null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const solid = scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? 'bg-forest-950/90 shadow-lg shadow-black/10 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className={`container-x flex items-center justify-between transition-all duration-500 ${solid ? 'h-18' : 'h-22'}`}>
        <Link to="/" aria-label={`${SITE.name} home`} className="shrink-0">
          <Logo light />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.slice(1).map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `relative rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                      isActive ? 'text-gold-400' : 'text-cream-100/80 hover:text-cream-50'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-dot"
                          className="absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-gold-400"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={SITE.phoneHref} className="hidden items-center gap-2 text-sm font-semibold text-cream-100 xl:flex">
            <Phone className="size-4 text-gold-400" /> {SITE.phone}
          </a>
          <Link to="/contact" className="btn-primary hidden !px-5 !py-2.5 sm:inline-flex">
            Get a Quote <ArrowUpRight className="size-4" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="grid size-11 place-items-center rounded-full border border-cream-50/20 text-cream-50 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100dvh' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden bg-forest-950 lg:hidden"
          >
            <ul className="container-x flex flex-col gap-1 pt-4 pb-40">
              {NAV.map((item, i) => (
                <motion.li
                  key={item.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                >
                  <NavLink
                    to={item.to}
                    end
                    className={({ isActive }) =>
                      `flex items-center justify-between border-b border-cream-50/10 py-4 font-display text-2xl ${
                        isActive ? 'text-gold-400' : 'text-cream-50'
                      }`
                    }
                  >
                    {item.label}
                    <ArrowUpRight className="size-5 opacity-50" />
                  </NavLink>
                </motion.li>
              ))}
              <li className="mt-6 flex flex-col gap-3">
                <Link to="/contact" className="btn-primary">
                  Get a Quote
                </Link>
                <a href={SITE.phoneHref} className="btn-ghost text-cream-50">
                  <Phone className="size-4" /> {SITE.phone}
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
