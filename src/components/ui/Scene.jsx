import { Suspense, useEffect, useRef, useState } from 'react'

// Mounts a lazily-loaded WebGL scene only on the client and only once it is
// near the viewport, so pages stay fast and the prerendered HTML stays clean.
export default function Scene({ load, className = '', fallback = null, ...props }) {
  const ref = useRef(null)
  const [Comp, setComp] = useState(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let cancelled = false
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        load().then((m) => !cancelled && setComp(() => m.default))
      },
      { rootMargin: '300px' },
    )
    io.observe(el)
    return () => {
      cancelled = true
      io.disconnect()
    }
  }, [load])

  return (
    <div ref={ref} className={className}>
      {Comp ? (
        <Suspense fallback={fallback}>
          <Comp {...props} />
        </Suspense>
      ) : (
        fallback
      )}
    </div>
  )
}
