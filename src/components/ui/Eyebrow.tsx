import type { ReactNode } from 'react'

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-xs tracking-[0.2em] uppercase text-blue-soft/80 inline-flex items-center gap-2">
      <span className="w-6 h-px bg-gradient-to-r from-blue to-violet" />
      {children}
    </span>
  )
}
