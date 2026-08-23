import type { ReactNode } from 'react'

interface LegalLayoutProps {
  title: string
  updatedAt: string
  children: ReactNode
}

export function LegalLayout({ title, updatedAt, children }: LegalLayoutProps) {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-40 pb-28">
      <h1 className="font-display font-semibold text-3xl sm:text-4xl leading-tight">{title}</h1>
      <p className="font-mono text-xs text-muted2 mt-3">{updatedAt}</p>
      <div className="mt-12 space-y-10">{children}</div>
    </div>
  )
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-display font-medium text-lg mb-3">{title}</h2>
      <div className="space-y-4 text-muted leading-relaxed [&_a]:text-blue-soft [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-violet-soft [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1.5">
        {children}
      </div>
    </section>
  )
}
