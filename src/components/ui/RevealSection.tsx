import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface RevealSectionProps {
  children: ReactNode
  className?: string
  id?: string
}

export function RevealSection({ children, className = '', id }: RevealSectionProps) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  )
}
