import { motion } from 'motion/react'

const variants = {
  up: { opacity: 0, y: 36 },
  left: { opacity: 0, x: -40 },
  right: { opacity: 0, x: 40 },
  scale: { opacity: 0, scale: 0.92 },
  fade: { opacity: 0 },
}

export default function Reveal({ children, from = 'up', delay = 0, className, as = 'div', ...rest }) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial={variants[from]}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Comp>
  )
}
