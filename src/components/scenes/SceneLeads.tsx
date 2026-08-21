import { useEffect, useState } from 'react'
import type { SceneProps } from './types'

interface RankedLead {
  score: number
  color: string
  y: number
}

const RAW_LEADS = [
  { y: 130, delay: '0s' },
  { y: 45, delay: '0.35s' },
  { y: 155, delay: '0.7s' },
  { y: 80, delay: '1.05s' },
]

const RANKED: RankedLead[] = [
  { score: 92, color: '#4ADE80', y: 44 },
  { score: 78, color: '#60A5FA', y: 78 },
  { score: 55, color: '#60A5FA', y: 112 },
  { score: 31, color: '#5C6480', y: 146 },
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
    const DURATION = 3600 // ms, matches the old dur="3.6s"
    const TIMES = [0, 0.4, 0.5, 0.9, 1]
    let rafId: number
    const start = performance.now()

    function valueAt(score: number, frac: number) {
      const values = [0, 0, score, score, 0]
      for (let k = 0; k < TIMES.length - 1; k++) {
        const timeK = TIMES[k]
        const timeNext = TIMES[k + 1]
        if (timeK === undefined || timeNext === undefined) continue
        if (frac >= timeK && frac <= timeNext) {
          const span = timeNext - timeK || 1
          const segFrac = (frac - timeK) / span
          const valueK = values[k] ?? 0
          const valueNext = values[k + 1] ?? 0
          return valueK + (valueNext - valueK) * segFrac
        }
      }
      return values[values.length - 1] ?? 0
    }

    function tick(now: number) {
      const elapsed = now - start
      setCounts(
        RANKED.map((r, i) => {
          const delay = i * 900 // ms, matches the old begin={i*0.9s}
          const local = ((elapsed - delay) % DURATION + DURATION) % DURATION
          return Math.round(valueAt(r.score, local / DURATION))
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
        <text x="42" y="20" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#5C6480" textAnchor="middle">{labels[0]}</text>
        <text x="300" y="20" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#5C6480" textAnchor="middle">{labels[1]}</text>

        {/* raw, unordered leads continuously flowing toward the agent */}
        {RAW_LEADS.map((l, i) => {
          const path = `M 42 ${l.y} C 90 ${l.y}, 130 100, 172 100`
          return (
            <g key={i}>
              <circle r="3.6" fill="#5C6480" filter="url(#sceneGlow2)">
                <animateMotion dur="1.6s" begin={l.delay} repeatCount="indefinite" path={path} />
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.75;1" dur="1.6s" begin={l.delay} repeatCount="indefinite" />
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
          <rect x="-13" y="-13" width="26" height="26" rx="7" fill="#0B0F1A" stroke="url(#sceneGrad4)" strokeWidth="1.4" />
          {[-6, -1, 4].map((x, i) => (
            <rect key={i} x={x} y="-5" width="2" height="10" rx="1" fill="#C084FC">
              <animate attributeName="opacity" values="0.2;1;0.2" dur="1s" begin={`${i * 0.18}s`} repeatCount="indefinite" />
            </rect>
          ))}
        </g>
        <text x="190" y="150" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#5C6480" textAnchor="middle">score()</text>

        {/* rail into the ranked list */}
        <path d="M 216 100 C 240 100, 250 100, 260 100" stroke="#1C2440" strokeWidth="1.25" fill="none" />

        {/* sorted, readable priority list — bar width AND the score number
            both driven by the same counts[i] state, so they move together */}
        {RANKED.map((r, i) => {
          const particlePath = `M 206 100 C 230 100, 245 ${r.y}, 260 ${r.y}`
          const begin = `${i * 0.9}s`
          const count = counts[i] ?? 0
          const width = (count / 100) * MAX_BAR_WIDTH
          return (
            <g key={i}>
              <path d={particlePath} stroke="#161D33" strokeWidth="1" fill="none" opacity="0.5" />
              <circle r="3" fill={r.color} filter="url(#sceneGlow2)">
                <animateMotion
                  dur="3.6s"
                  begin={begin}
                  repeatCount="indefinite"
                  keyPoints="0;0;1;1"
                  keyTimes="0;0.30;0.40;1"
                  path={particlePath}
                />
                <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.28;0.32;0.42;0.46" dur="3.6s" begin={begin} repeatCount="indefinite" />
              </circle>

              <rect x="260" y={r.y - 7} width={MAX_BAR_WIDTH} height="14" rx="4" fill="#111729" stroke="#1C2440" strokeWidth="1" />
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
