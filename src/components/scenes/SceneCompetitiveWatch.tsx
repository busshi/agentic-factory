import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { SceneProps } from './types'

const DIGESTS: Record<'fr' | 'en', [string, string][]> = {
  fr: [
    ['Concurrent A : -12%', 'sur les prix'],
    ['3 avis négatifs chez', 'le concurrent B'],
    ['Concurrent C lance', 'une feature IA'],
  ],
  en: [
    ['Competitor A: -12%', 'on pricing'],
    ['3 negative reviews', 'for competitor B'],
    ['Competitor C ships', 'an AI feature'],
  ],
}

export function SceneCompetitiveWatch({ lang = 'fr' }: SceneProps) {
  const digests = DIGESTS[lang]
  const s = {
    fr: { sources: 'sources', digest: 'digest', updated: 'mis à jour chaque jour' },
    en: { sources: 'sources', digest: 'digest', updated: 'updated every day' },
  }[lang]
  const [dIndex, setDIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setDIndex((i) => (i + 1) % digests.length), 4200)
    return () => clearInterval(id)
  }, [lang, digests.length])

  const digest = digests[dIndex]
  const sources = [
    { y: 40, path: 'M 26 40 C 70 40, 95 88, 132 90' },
    { y: 100, path: 'M 26 100 C 70 100, 95 100, 132 100' },
    { y: 160, path: 'M 26 160 C 70 160, 95 112, 132 110' },
  ]

  return (
    <svg viewBox="0 0 380 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sceneGrad8" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
      </defs>

      <g transform="translate(0 26)">
        <text x="46" y="16" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#5C6480" textAnchor="middle">{s.sources}</text>
        <text x="300" y="16" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#5C6480" textAnchor="middle">{s.digest}</text>

        {/* watched sources — pulled in tighter to the left so the digest
            card on the right has plenty of room for real sentences */}
        {sources.map((src, i) => (
          <g key={i}>
            <circle cx="26" cy={src.y} r="7" fill="none" stroke="#3A4062" strokeWidth="1.4" />
            <circle cx="26" cy={src.y} r="2.5" fill="#3A4062" />
            <path d={src.path} stroke="#161D33" strokeWidth="1.25" fill="none" />
            <circle r="2.6" fill="#60A5FA">
              <animateMotion dur="2.2s" begin={`${i * 0.6}s`} repeatCount="indefinite" path={src.path} />
              <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.8;1" dur="2.2s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}

        {/* mini agent chip */}
        <g transform="translate(150 100)">
          <circle r="26" fill="#A855F7" opacity="0.15" />
          <circle r="19" fill="none" stroke="url(#sceneGrad8)" strokeWidth="1.1" strokeDasharray="2 6" opacity="0.55">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="3.4s" repeatCount="indefinite" />
          </circle>
          <rect x="-11" y="-11" width="22" height="22" rx="6" fill="#0B0F1A" stroke="url(#sceneGrad8)" strokeWidth="1.4" />
          {[-5.5, -1, 3.5].map((x, i) => (
            <rect key={i} x={x} y="-4.5" width="1.8" height="9" rx="0.9" fill="#C084FC">
              <animate attributeName="opacity" values="0.2;1;0.2" dur="1s" begin={`${i * 0.18}s`} repeatCount="indefinite" />
            </rect>
          ))}
        </g>

        <path d="M 168 100 C 178 100, 182 100, 190 100" stroke="#1C2440" strokeWidth="1.25" fill="none" />

        {/* digest card, much wider now — text rotates through insights,
            comfortably inside the card at this width */}
        <g>
          <rect x="190" y="60" width="172" height="80" rx="12" fill="#0B0F1A" stroke="url(#sceneGrad8)" strokeWidth="1.4" />
          <AnimatePresence mode="wait">
            <motion.g
              key={dIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <circle cx="206" cy="82" r="2.5" fill="#4ADE80" />
              <text x="216" y="86" fontFamily="Inter, sans-serif" fontSize="10.5" fill="#C7CCDC">
                {digest?.[0]}
              </text>
              <text x="206" y="104" fontFamily="Inter, sans-serif" fontSize="10.5" fill="#C7CCDC">
                {digest?.[1]}
              </text>
            </motion.g>
          </AnimatePresence>
        </g>
        <text x="276" y="162" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#5C6480" textAnchor="middle">
          {s.updated}
        </text>
      </g>
    </svg>
  )
}
