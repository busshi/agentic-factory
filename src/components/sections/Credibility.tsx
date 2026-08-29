import { useEffect, useRef, useState } from 'react'
import { ChevronRight } from 'lucide-react'
import type { Translation } from '../../i18n'
import { Eyebrow } from '../ui/Eyebrow'
import { RevealSection } from '../ui/RevealSection'

// Freelancing since 2021 — computed from the current date (not hardcoded)
// so the number stays correct as years pass, instead of needing a manual
// edit every year. Keep in sync with the "X ans de freelance" claim in
// credibility.title (src/i18n.tsx) if this start year ever changes.
const START_YEAR = 2021

function YearsCounter({ label }: { label: string }) {
  const targetYears = new Date().getFullYear() - START_YEAR
  const ref = useRef<HTMLSpanElement>(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setCount(targetYears)
      return
    }

    let rafId: number
    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (!entry?.isIntersecting) return
        obs.disconnect()

        const DURATION = 1100
        const start = performance.now()
        function tick(now: number) {
          const frac = Math.min((now - start) / DURATION, 1)
          setCount(Math.round(frac * targetYears))
          if (frac < 1) rafId = requestAnimationFrame(tick)
        }
        rafId = requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(rafId)
    }
  }, [targetYears])

  return (
    <div className="flex md:flex-col items-baseline md:items-start gap-3 md:gap-1 shrink-0">
      <span ref={ref} className="font-display font-semibold text-7xl sm:text-8xl text-gradient leading-none tabular-nums">
        {count}
      </span>
      <span className="font-mono text-xs sm:text-sm text-muted2 uppercase tracking-widest">{label}</span>
    </div>
  )
}

export function Credibility({ t }: { t: Translation }) {
  return (
    <RevealSection className="px-6 py-24 border-t border-line bg-surface/30">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_auto] gap-14 items-center">
        <div>
          <Eyebrow>{t.credibility.eyebrow}</Eyebrow>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl mt-5 leading-tight">
            {t.credibility.title}
          </h2>
          <p className="text-muted text-lg leading-relaxed mt-6 max-w-xl">
            {t.credibility.text}
          </p>
          <a
            href="https://www.linkedin.com/in/alexandre-dubar"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-sm text-blue-soft hover:text-violet-soft transition-colors mt-6 cursor-pointer"
          >
            {t.credibility.linkedinCta}
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>
        <YearsCounter label={t.credibility.statLabel} />
      </div>
    </RevealSection>
  )
}
