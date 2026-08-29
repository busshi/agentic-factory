import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { SceneProps } from './types'

const REQUESTS: Record<'fr' | 'en', [string, string][]> = {
  fr: [
    ['Vous êtes dispo', 'demain 14h ?'],
    ['Un créneau libre', 'cette semaine ?'],
    ['On peut se voir', 'vendredi matin ?'],
    ['Dispo pour un appel', 'lundi prochain ?'],
  ],
  en: [
    ['Are you free', 'tomorrow at 2pm?'],
    ['Any slot open', 'this week?'],
    ['Can we meet', 'Friday morning?'],
    ['Free for a call', 'next Monday?'],
  ],
}

export function SceneAppointment({ lang = 'fr' }: SceneProps) {
  const requests = REQUESTS[lang]
  const t = {
    fr: { demande: 'demande', creneau: 'créneau libre', confirme: 'confirmé', demain: 'demain', rappel: 'rappel programmé' },
    en: { demande: 'request', creneau: 'open slot', confirme: 'confirmed', demain: 'tomorrow', rappel: 'reminder set' },
  }[lang]
  const [qIndex, setQIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setQIndex((i) => (i + 1) % requests.length), 5000)
    return () => clearInterval(id)
  }, [lang, requests.length])

  const request = requests[qIndex]

  return (
    <svg viewBox="0 0 380 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sceneGrad5" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
        <radialGradient id="coreGradScene3">
          <stop offset="0%" stopColor="#C084FC" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g transform="translate(0 31)">
        <text x="86" y="26" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="rgb(var(--color-muted2))" textAnchor="middle">{t.demande}</text>
        <text x="210" y="26" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="rgb(var(--color-muted2))" textAnchor="middle">{t.creneau}</text>
        <text x="318" y="26" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="rgb(var(--color-muted2))" textAnchor="middle">{t.confirme}</text>

        {/* incoming request bubble — text rotates through a few realistic
            requests every 5s, cross-fading like the support scene */}
        <g>
          <rect x="24" y="46" width="128" height="50" rx="14" fill="rgb(var(--color-surface))" stroke="rgb(var(--color-line))" strokeWidth="1.5" />
          <path d="M 44 96 l -10 14 l 20 -8 z" fill="rgb(var(--color-surface))" stroke="rgb(var(--color-line))" strokeWidth="1.5" />
          <AnimatePresence mode="wait">
            <motion.g
              key={qIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <text x="40" y="68" fontFamily="Inter, sans-serif" fontSize="10.5" fill="rgb(var(--color-text))">
                {request?.[0]}
              </text>
              <text x="40" y="84" fontFamily="Inter, sans-serif" fontSize="10.5" fill="rgb(var(--color-text))">
                {request?.[1]}
              </text>
            </motion.g>
          </AnimatePresence>
        </g>

        {/* rail to agent chip */}
        <path d="M 152 71 C 176 71, 176 90, 195 90" stroke="rgb(var(--color-line))" strokeWidth="1.25" fill="none" />
        <circle r="2.6" fill="rgb(var(--color-blue-soft))">
          <animateMotion dur="1.4s" repeatCount="indefinite" path="M 152 71 C 176 71, 176 90, 195 90" />
        </circle>

        {/* mini agent chip, center */}
        <g transform="translate(210 100)">
          <circle r="32" fill="url(#coreGradScene3)" opacity="0.45" />
          <circle r="23" fill="none" stroke="url(#sceneGrad5)" strokeWidth="1.1" strokeDasharray="2 6" opacity="0.6">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="2.6s" repeatCount="indefinite" />
          </circle>
          <rect x="-14" y="-14" width="28" height="28" rx="7" fill="rgb(var(--color-surface))" stroke="url(#sceneGrad5)" strokeWidth="1.4" />
          {[-7, -1.5, 4].map((x, i) => (
            <rect key={i} x={x} y="-6" width="2.2" height="12" rx="1.1" fill="rgb(var(--color-violet-soft))">
              <animate attributeName="opacity" values="0.2;1;0.2" dur="0.8s" begin={`${i * 0.15}s`} repeatCount="indefinite" />
            </rect>
          ))}
        </g>

        {/* rail to calendar */}
        <path d="M 242 90 C 262 90, 262 90, 282 90" stroke="rgb(var(--color-line))" strokeWidth="1.25" fill="none" />
        <circle r="2.6" fill="rgb(var(--color-violet-soft))">
          <animateMotion dur="1.4s" begin="1.3s" repeatCount="indefinite" path="M 242 90 C 262 90, 262 90, 282 90" />
        </circle>

        {/* calendar card confirming the slot */}
        <g transform="translate(282 66)">
          <rect width="76" height="46" rx="10" fill="rgb(var(--color-surface))" stroke="url(#sceneGrad5)" strokeWidth="1.4" />
          <rect x="0" y="0" width="76" height="13" rx="10" fill="rgb(var(--color-surface2))" />
          <text x="38" y="10" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="rgb(var(--color-muted))" textAnchor="middle">{t.demain}</text>
          <text x="38" y="34" fontFamily="JetBrains Mono, monospace" fontSize="13" fill="#4ADE80" textAnchor="middle">14:00</text>
          {/* confirmation badge — sits on the gradient border, top-right
              corner, rather than overlapping the time text */}
          <g transform="translate(76 0)">
            <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.4;0.5;0.9;1" dur="3s" repeatCount="indefinite" />
            <circle r="9" fill="rgb(var(--color-surface))" stroke="#4ADE80" strokeWidth="1.6" />
            <path d="M -4 0 l 3 3.5 l 6 -7" fill="none" stroke="#4ADE80" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>
        <text x="320" y="128" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="rgb(var(--color-muted2))" textAnchor="middle">
          {t.rappel}
        </text>
      </g>
    </svg>
  )
}
