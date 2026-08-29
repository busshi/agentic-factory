import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState, type ComponentType } from 'react'
import {
  FileSpreadsheet, Mail, CalendarCheck, Bot, Server, BellRing, FileSearch, Radar, type LucideIcon,
} from 'lucide-react'
import type { Lang, Translation } from '../../i18n'
import { Eyebrow } from '../ui/Eyebrow'
import { RevealSection } from '../ui/RevealSection'
import {
  SceneInvoice, SceneEmailSort, SceneAppointment, SceneSupport, SceneLeads, SceneMonitoring, SceneExtraction, SceneCompetitiveWatch,
  type SceneProps,
} from '../scenes'
import { CategoryCarousel } from './CategoryCarousel'

export interface UseCaseItem {
  title: string
  text: string
  icon: LucideIcon
  Scene: ComponentType<SceneProps>
  tag: string
}

const ICONS: LucideIcon[] = [FileSpreadsheet, Mail, CalendarCheck, Bot, Server, BellRing, FileSearch, Radar]
const SCENES: ComponentType<SceneProps>[] = [
  SceneInvoice, SceneEmailSort, SceneAppointment, SceneSupport, SceneLeads, SceneMonitoring, SceneExtraction, SceneCompetitiveWatch,
]
const TAG_KEYS = ['tagPME', 'tagPME', 'tagPME', 'tagStartup', 'tagStartup', 'tagStartup', 'tagPME', 'tagStartup'] as const

interface UseCasesProps {
  lang: Lang
  t: Translation
}

export function UseCases({ lang, t }: UseCasesProps) {
  const cases: UseCaseItem[] = t.useCases.cases.map((c, i) => ({
    ...c,
    icon: ICONS[i] ?? FileSpreadsheet,
    Scene: SCENES[i] ?? SceneInvoice,
    tag: t.useCases[TAG_KEYS[i] ?? 'tagPME'],
  }))

  const [active, setActive] = useState(0)
  const ActiveScene = (cases[active] ?? cases[0])?.Scene ?? SceneInvoice
  const carouselRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    const container = carouselRef.current
    if (!container) return
    const observer = new IntersectionObserver(
      (entries) => {
        const best = entries.reduce<IntersectionObserverEntry | null>((acc, entry) => {
          if (entry.isIntersecting && (!acc || entry.intersectionRatio > acc.intersectionRatio)) {
            return entry
          }
          return acc
        }, null)
        if (best) {
          const idx = Number((best.target as HTMLElement).dataset.index)
          if (!Number.isNaN(idx)) setActive(idx)
        }
      },
      { root: container, threshold: [0.5, 0.75, 0.9] }
    )
    cardRefs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // keep a ref mirroring `active` so the auto-advance interval always reads
  // the latest value without needing to be recreated on every change
  const activeRef = useRef(active)
  useEffect(() => {
    activeRef.current = active
  }, [active])

  // mobile auto-advance: scrolls to the next card every 5s, but only if the
  // person hasn't touched the carousel in the last few seconds — a manual
  // swipe always wins and pauses the auto-advance for a while
  const lastInteractionRef = useRef(0)
  const markInteraction = () => {
    lastInteractionRef.current = Date.now()
  }
  // mouseenter/focus only fire once on entry, not for the whole time the
  // pointer rests on a card — without this, hovering longer than the idle
  // delay would let the cycle resume right under the cursor. This blocks it
  // outright for as long as a card stays hovered/focused.
  const hoveringRef = useRef(false)

  // only the carousel's own horizontal scroll should ever move — if the
  // section itself is off-screen (e.g. still on the hero), scrollIntoView
  // would otherwise drag the whole page down to reach it. Track page-level
  // visibility separately and skip auto-advance entirely while it's hidden.
  const carouselInViewRef = useRef(false)
  useEffect(() => {
    const container = carouselRef.current
    if (!container) return
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        carouselInViewRef.current = entry?.isIntersecting ?? false
      },
      { threshold: 0.4 }
    )
    visibilityObserver.observe(container)
    return () => visibilityObserver.disconnect()
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      if (!carouselInViewRef.current) return
      if (Date.now() - lastInteractionRef.current < 4500) return
      const next = (activeRef.current + 1) % cases.length
      // Drive the stage panel directly instead of waiting for the
      // IntersectionObserver above to notice the scroll and sync `active`
      // back — that round trip depends on the browser actually running
      // the observer promptly, which it won't always do (e.g. a
      // backgrounded/inactive tab), so the panel could sit frozen even
      // though the interval keeps firing. scrollIntoView below is then
      // just a best-effort visual follow-along, not load-bearing.
      setActive(next)
      const target = cardRefs.current[next]
      if (target && typeof target.scrollIntoView === 'function') {
        target.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
      }
    }, 5000)
    return () => clearInterval(id)
  }, [cases.length])

  // whole-section visibility, for the desktop/tablet idle cycle below — the
  // mobile carousel above is hidden (display:none) from sm upward, so its
  // own visibility observer can't be reused here.
  const sectionRef = useRef<HTMLDivElement>(null)
  const sectionInViewRef = useRef(false)
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        sectionInViewRef.current = entry?.isIntersecting ?? false
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // desktop/tablet: while idle (no hover/focus on any card for a while, or
  // by default before the first one), cycle the stage panel through a
  // random case every few seconds — gives the panel something to show
  // instead of sitting still, without auto-scrolling either column (that's
  // the "double scroll" behavior that was removed from CategoryCarousel).
  // Skipped below the sm breakpoint, where the mobile carousel above
  // already has its own sequential auto-advance.
  useEffect(() => {
    const IDLE_DELAY = 3000
    const id = setInterval(() => {
      if (window.innerWidth < 640) return
      if (!sectionInViewRef.current) return
      if (hoveringRef.current) return
      if (Date.now() - lastInteractionRef.current < IDLE_DELAY) return
      if (cases.length <= 1) return
      let next = activeRef.current
      while (next === activeRef.current) {
        next = Math.floor(Math.random() * cases.length)
      }
      setActive(next)
    }, 2200)
    return () => clearInterval(id)
  }, [cases.length])

  return (
    <RevealSection id="cas-usage" className="px-6 py-24 border-t border-line">
      <div ref={sectionRef} className="max-w-6xl mx-auto">
        <Eyebrow>{t.useCases.eyebrow}</Eyebrow>
        <h2 className="font-display font-semibold text-3xl sm:text-4xl mt-5 max-w-2xl leading-tight">
          {t.useCases.title}
        </h2>

        {/* stage panel — shows the illustrated scene for the hovered/focused/tapped card.
            The Scene* SVGs reference the same theme tokens as the rest of the
            site (rgb(var(--color-*)) instead of hardcoded dark-only hex — see
            src/components/scenes/), so this panel can just use the normal
            surface/line tokens too instead of a forced dark background. */}
        <div className="mt-12 rounded-2xl border border-line bg-surface backdrop-blur-sm h-[300px] sm:h-[360px] relative overflow-hidden">
          <div className="absolute inset-0 bg-grad-radial pointer-events-none" />
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 p-4 sm:p-6"
            >
              <ActiveScene lang={lang} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* mobile: horizontal swipeable carousel of case cards, tap to
            switch the stage panel above — much easier to browse on a
            phone than a tall stack of full cards */}
        <div
          ref={carouselRef}
          onTouchStart={markInteraction}
          onTouchEnd={markInteraction}
          onPointerDown={markInteraction}
          className="sm:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 mt-6 -mx-6 px-6"
        >
          {cases.map((c, i) => (
            <button
              key={c.title}
              ref={(el) => {
                cardRefs.current[i] = el
              }}
              data-index={i}
              onClick={() => {
                markInteraction()
                setActive(i)
              }}
              className={`snap-start shrink-0 w-[78%] text-left p-5 rounded-2xl border bg-surface/40 transition-colors ${
                active === i ? 'border-violet/50 bg-surface2/50' : 'border-line'
              }`}
            >
              <div className="flex items-center gap-3">
                <c.icon className="w-5 h-5 text-violet-soft" strokeWidth={1.6} />
                <span className="font-mono text-[11px] tracking-wider uppercase text-muted2 border border-line rounded-full px-2.5 py-0.5">
                  {c.tag}
                </span>
              </div>
              <h3 className="font-display font-medium text-lg mt-3">{c.title}</h3>
              <p className="text-muted text-sm leading-relaxed mt-2">{c.text}</p>
            </button>
          ))}
        </div>

        {/* tablet and up: two carousels, one per audience (PME / Startup),
            always stacked as two full-width rows regardless of screen size.
            Each one scrolls independently on manual swipe/drag, with a thin
            progress bar below it, and both feed the same shared stage
            panel above. */}
        <div className="hidden sm:grid sm:grid-cols-1 gap-8 mt-6">
          {[t.useCases.tagPME, t.useCases.tagStartup].map((tag) => {
            const columnCases = cases
              .map((c, i) => ({ ...c, idx: i }))
              .filter((c) => c.tag === tag)
            return (
              <CategoryCarousel
                key={tag}
                tag={tag}
                items={columnCases}
                active={active}
                setActive={setActive}
                markInteraction={markInteraction}
                hoveringRef={hoveringRef}
              />
            )
          })}
        </div>
      </div>
    </RevealSection>
  )
}
