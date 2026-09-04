import { useEffect, useState } from 'react'
import type { SceneProps } from './types'

interface RankedLead {
  score: number
  color: string
  y: number
}

// Same 4 colors as RANKED below, in the same order — the raw leads
// flowing in and the ranked bars flowing out read as one consistent
// palette instead of the input side being uniformly gray.
const LEAD_COLORS = ['#4ADE80', 'rgb(var(--color-blue-soft))', 'rgb(var(--color-violet-soft))', 'rgb(var(--color-muted2))']

// Per-row input delay (seconds), shared with the output side below so a
// dot's departure toward its bar can be computed as "whenever this same
// row's input dot last arrived at the chip", not an unrelated schedule.
const LEAD_OFFSETS = [0, 0.35, 0.7, 1.05]
const INPUT_DUR = 1.6 // seconds, matches the input dot's dur below
const HANDOFF_PAUSE = 0.15 // seconds the chip "holds" the lead before sending it out

const RAW_LEADS = [
  { y: 130, offset: LEAD_OFFSETS[0], color: LEAD_COLORS[0] },
  { y: 45, offset: LEAD_OFFSETS[1], color: LEAD_COLORS[1] },
  { y: 155, offset: LEAD_OFFSETS[2], color: LEAD_COLORS[2] },
  { y: 80, offset: LEAD_OFFSETS[3], color: LEAD_COLORS[3] },
]

// 4 distinct colors, one per rank — a gradient of priority from green
// (best lead) through the site's blue/violet accents down to muted
// (lowest). Each bar's traveling dot reuses the same color (r.color),
// so the two always match.
const RANKED: RankedLead[] = [
  { score: 92, color: LEAD_COLORS[0], y: 44 },
  { score: 78, color: LEAD_COLORS[1], y: 78 },
  { score: 55, color: LEAD_COLORS[2], y: 112 },
  { score: 31, color: LEAD_COLORS[3], y: 146 },
]

const MAX_BAR_WIDTH = 92
const LABELS: Record<'fr' | 'en', [string, string]> = {
  fr: ['leads bruts', 'priorisés'],
  en: ['raw leads', 'prioritized'],
}

export function SceneLeads({ lang = 'fr' }: SceneProps) {
  const labels = LABELS[lang]

  // drives both the bar width AND the displayed number together, so the
  // score visibly counts up as the bar grows instead of the number just
  // appearing. Implemented as a plain requestAnimationFrame loop rather
  // than framer-motion's standalone animate() — that call was throwing
  // ("WeakMap keys must be objects") when fed a raw keyframes array with
  // no attached subject/element, so a small hand-rolled interpolator is
  // both simpler and more reliable here.
  const [counts, setCounts] = useState<number[]>(() => RANKED.map(() => 0))

  useEffect(() => {
    // Matches the traveling dot's own animateMotion below exactly: same
    // 1.6s loop, same per-row offset (the input dot's arrival + handoff
    // pause) — so "the dot arrives" and "the score bumps" are the same
    // event, not two independently-timed animations that happen to look
    // related.
    const DURATION = 1600 // ms, matches the dot's dur="1.6s"
    const RAMP_START = 0.8 // fraction of the cycle where the bump starts — the
    // dot's opacity fades out over 0.75–1 (see the animateMotion/animate
    // pair below), so this lands the number's jump right as it disappears
    // into the bar.
    let rafId: number
    const start = performance.now()

    // Each arrival bumps that row's score by +1 over the last one — reads
    // as the score genuinely climbing over time rather than resetting.
    // Wraps back to the base score every 8 arrivals (capped a few points
    // under 100) so it never grows without bound or overflows the bar.
    const CYCLE_BAND = 8
    function targetAtCycle(r: RankedLead, n: number) {
      return n === 0 ? 0 : Math.min(99, r.score + ((n - 1) % CYCLE_BAND))
    }

    function tick(now: number) {
      const elapsed = now - start
      setCounts(
        RANKED.map((r, i) => {
          const delay = (LEAD_OFFSETS[i] + INPUT_DUR + HANDOFF_PAUSE) * 1000 // ms, matches the dot's begin
          const t = Math.max(0, elapsed - delay)
          const cycleIndex = Math.floor(t / DURATION)
          const frac = (t % DURATION) / DURATION
          const prevTarget = targetAtCycle(r, cycleIndex)
          if (frac < RAMP_START) return prevTarget
          const nextTarget = targetAtCycle(r, cycleIndex + 1)
          const rampFrac = (frac - RAMP_START) / (1 - RAMP_START)
          return Math.round(prevTarget + (nextTarget - prevTarget) * rampFrac)
        })
      )
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <svg viewBox="0 0 380 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sceneGrad4" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
        <radialGradient id="coreGradScene2">
          <stop offset="0%" stopColor="#C084FC" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
        </radialGradient>
        <filter id="sceneGlow2" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <g transform="translate(2 26)">
        <text x="42" y="20" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="rgb(var(--color-muted2))" textAnchor="middle">{labels[0]}</text>
        <text x="300" y="20" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="rgb(var(--color-muted2))" textAnchor="middle">{labels[1]}</text>

        {/* raw, unordered leads continuously flowing toward the agent */}
        {RAW_LEADS.map((l, i) => {
          const path = `M 42 ${l.y} C 90 ${l.y}, 130 100, 172 100`
          const begin = `${l.offset}s`
          return (
            <g key={i}>
              {/* opacity="0" as a static base, not just the animate's first
                  keyframe — before `begin` elapses, the animate hasn't
                  taken effect yet and the circle would otherwise sit fully
                  visible at the SVG's default (0,0) origin. */}
              <circle opacity="0" r="3.6" fill={l.color} filter="url(#sceneGlow2)">
                <animateMotion dur={`${INPUT_DUR}s`} begin={begin} repeatCount="indefinite" path={path} />
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.75;1" dur={`${INPUT_DUR}s`} begin={begin} repeatCount="indefinite" />
              </circle>
            </g>
          )
        })}

        {/* mini agent chip = the scoring engine */}
        <g transform="translate(190 100)">
          <circle r="30" fill="url(#coreGradScene2)" opacity="0.45" />
          <circle r="21" fill="none" stroke="url(#sceneGrad4)" strokeWidth="1.1" strokeDasharray="2 6" opacity="0.55">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="3s" repeatCount="indefinite" />
          </circle>
          <rect x="-13" y="-13" width="26" height="26" rx="7" fill="rgb(var(--color-surface))" stroke="url(#sceneGrad4)" strokeWidth="1.4" />
          {[-6, -1, 4].map((x, i) => (
            <rect key={i} x={x} y="-5" width="2" height="10" rx="1" fill="rgb(var(--color-violet-soft))">
              <animate attributeName="opacity" values="0.2;1;0.2" dur="1s" begin={`${i * 0.18}s`} repeatCount="indefinite" />
            </rect>
          ))}
        </g>
        <text x="190" y="150" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="rgb(var(--color-muted2))" textAnchor="middle">score()</text>

        {/* sorted, readable priority list — bar width AND the score number
            both driven by the same counts[i] state, so they move together */}
        {RANKED.map((r, i) => {
          const particlePath = `M 206 100 C 230 100, 245 ${r.y}, 260 ${r.y}`
          // Waits for row i's own input dot to actually arrive at the chip
          // (offset + INPUT_DUR), plus a short handoff pause, before this
          // one departs — and since both loop on the same 1.6s period,
          // that "arrives, then departs" relationship holds on every
          // cycle, not just the first. Plain animateMotion, no keyPoints —
          // see the raw-leads dots above for why (the keyPoints/calcMode
          // version never visibly left the chip in testing).
          const begin = `${LEAD_OFFSETS[i] + INPUT_DUR + HANDOFF_PAUSE}s`
          const count = counts[i] ?? 0
          const width = (count / 100) * MAX_BAR_WIDTH
          return (
            <g key={i}>
              <path d={particlePath} stroke="rgb(var(--color-surface2))" strokeWidth="1" fill="none" opacity="0.5" />
              <circle opacity="0" r="3" fill={r.color} filter="url(#sceneGlow2)">
                <animateMotion dur="1.6s" begin={begin} repeatCount="indefinite" path={particlePath} />
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.75;1" dur="1.6s" begin={begin} repeatCount="indefinite" />
              </circle>

              <rect x="260" y={r.y - 7} width={MAX_BAR_WIDTH} height="14" rx="4" fill="rgb(var(--color-surface2))" stroke="rgb(var(--color-line))" strokeWidth="1" />
              <rect x="260" y={r.y - 7} width={width} height="14" rx="4" fill={r.color} opacity="0.9" />
              <text x={260 + MAX_BAR_WIDTH + 12} y={r.y + 4} fontFamily="JetBrains Mono, monospace" fontSize="11" fill={r.color} textAnchor="start">
                {count > 0 ? count : ''}
              </text>
            </g>
          )
        })}
      </g>
    </svg>
  )
}
