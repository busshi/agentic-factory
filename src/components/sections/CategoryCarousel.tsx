import { useLayoutEffect, useRef, useState, type Dispatch, type MutableRefObject, type SetStateAction } from 'react'
import type { UseCaseItem } from './UseCases'

export interface CategoryCarouselItem extends UseCaseItem {
  idx: number
}

interface CategoryCarouselProps {
  tag: string
  items: CategoryCarouselItem[]
  active: number
  setActive: Dispatch<SetStateAction<number>>
  markInteraction: () => void
  hoveringRef: MutableRefObject<boolean>
}

/* One horizontally-scrolling column of use-case cards for a given
   audience (PME or Startup). Purely manual (swipe/drag/wheel) — a thin
   progress bar below the row tracks scroll position, both as a subtle
   invitation to scroll and as feedback on how far through the column
   you are. */
export function CategoryCarousel({ tag, items, active, setActive, markInteraction, hoveringRef }: CategoryCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [hasOverflow, setHasOverflow] = useState(false)

  const updateProgress = () => {
    const el = scrollRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setHasOverflow(max > 0)
    const raw = max > 0 ? el.scrollLeft / max : 0
    // smoothstep: lent au début (évite que la barre paraisse déjà pleine
    // dès la 2e carte) et lent en fin de course (évite le saut brutal à
    // l'approche de la dernière carte) — accélère seulement au milieu.
    setProgress(raw * raw * (3 - 2 * raw))
  }

  useLayoutEffect(() => {
    updateProgress()
    // whether the row overflows depends on viewport width — re-check on
    // resize so the progress bar appears/disappears as the layout crosses
    // the point where all cards fit without scrolling. useLayoutEffect (not
    // useEffect) so the bar doesn't flash visible for a frame on load
    // before this first measurement runs.
    window.addEventListener('resize', updateProgress)
    return () => window.removeEventListener('resize', updateProgress)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length])

  return (
    <div>
      <p className="font-mono text-xs tracking-widest uppercase text-muted2 mb-4">{tag}</p>
      <div
        ref={scrollRef}
        onScroll={() => {
          markInteraction()
          updateProgress()
        }}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-3 -mx-2 px-2"
      >
        {items.map((c) => (
          <div
            key={c.title}
            onMouseEnter={() => {
              hoveringRef.current = true
              markInteraction()
              setActive(c.idx)
            }}
            onMouseLeave={() => {
              hoveringRef.current = false
              markInteraction()
            }}
            onFocus={() => {
              hoveringRef.current = true
              markInteraction()
              setActive(c.idx)
            }}
            onBlur={() => {
              hoveringRef.current = false
              markInteraction()
            }}
            tabIndex={0}
            className={`group snap-start flex-1 min-w-[260px] p-6 rounded-2xl border bg-surface/40 hover:bg-surface2/60 transition-colors relative overflow-hidden cursor-default ${
              active === c.idx ? 'border-violet/50' : 'border-line'
            }`}
          >
            <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-gradient-to-br from-blue/10 to-violet/10 blur-2xl group-hover:opacity-100 opacity-0 transition-opacity" />
            <c.icon className="w-5 h-5 text-violet-soft" strokeWidth={1.6} />
            <h3 className="font-display font-medium text-lg mt-4">{c.title}</h3>
            <p className="text-muted text-sm leading-relaxed mt-2">{c.text}</p>
          </div>
        ))}
      </div>
      {hasOverflow && (
        <div className="h-1 rounded-full bg-line/60 overflow-hidden mt-1">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue to-violet transition-[width] duration-500 ease-out"
            style={{ width: `${Math.max(progress * 100, 8)}%` }}
          />
        </div>
      )}
    </div>
  )
}
