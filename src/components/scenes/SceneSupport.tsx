import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { SceneProps } from './types'

const QUESTIONS: Record<'fr' | 'en', [string, string][]> = {
  fr: [
    ['Comment réinitialiser', 'mon mot de passe ?'],
    ['Où trouver ma facture', 'du mois dernier ?'],
    ['Puis-je changer de plan', 'à tout moment ?'],
    ["Comment annuler mon", 'abonnement ?'],
    ["L'export CSV ne", 'fonctionne plus ?'],
  ],
  en: [
    ['How do I reset', 'my password?'],
    ['Where do I find', "last month's invoice?"],
    ['Can I change plans', 'at any time?'],
    ['How do I cancel', 'my subscription?'],
    ['The CSV export', "isn't working?"],
  ],
}

export function SceneSupport({ lang = 'fr' }: SceneProps) {
  const questions = QUESTIONS[lang]
  const s = {
    fr: { received: 'question reçue', analysis: 'analyse', reply: 'réponse', resolved: 'résolu, sans escalade' },
    en: { received: 'question received', analysis: 'analysis', reply: 'reply', resolved: 'resolved, no escalation' },
  }[lang]
  const [qIndex, setQIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setQIndex((i) => (i + 1) % questions.length)
    }, 5000)
    return () => clearInterval(id)
  }, [lang, questions.length])

  const question = questions[qIndex]

  return (
    <svg viewBox="0 0 380 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sceneGrad3" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
        <radialGradient id="coreGradScene">
          <stop offset="0%" stopColor="#C084FC" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g transform="translate(0 31)">
        <text x="90" y="26" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#5C6480" textAnchor="middle">{s.received}</text>
        <text x="210" y="26" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#5C6480" textAnchor="middle">{s.analysis}</text>
        <text x="318" y="26" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#5C6480" textAnchor="middle">{s.reply}</text>

        {/* incoming question bubble — text rotates through a few realistic
            questions every 5s, cross-fading so it never feels like a jump-cut */}
        <g>
          <rect x="26" y="46" width="128" height="50" rx="14" fill="#0B0F1A" stroke="#1C2440" strokeWidth="1.5" />
          <path d="M 46 96 l -10 14 l 20 -8 z" fill="#0B0F1A" stroke="#1C2440" strokeWidth="1.5" />
          <AnimatePresence mode="wait">
            <motion.g
              key={qIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <text x="42" y="68" fontFamily="Inter, sans-serif" fontSize="10.5" fill="#C7CCDC">
                {question?.[0]}
              </text>
              <text x="42" y="84" fontFamily="Inter, sans-serif" fontSize="10.5" fill="#C7CCDC">
                {question?.[1]}
              </text>
            </motion.g>
          </AnimatePresence>
        </g>

        {/* rail to agent chip */}
        <path d="M 154 71 C 178 71, 178 90, 195 90" stroke="#1C2440" strokeWidth="1.25" fill="none" />
        <circle r="2.6" fill="#60A5FA">
          <animateMotion dur="1.1s" repeatCount="indefinite" path="M 154 71 C 178 71, 178 90, 195 90" />
        </circle>

        {/* mini agent chip, center — pulses faster to read as "actively working" */}
        <g transform="translate(210 100)">
          <circle r="32" fill="url(#coreGradScene)" opacity="0.45" />
          <circle r="23" fill="none" stroke="url(#sceneGrad3)" strokeWidth="1.1" strokeDasharray="2 6" opacity="0.6">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="2.2s" repeatCount="indefinite" />
          </circle>
          <rect x="-14" y="-14" width="28" height="28" rx="7" fill="#0B0F1A" stroke="url(#sceneGrad3)" strokeWidth="1.4" />
          {[-7, -1.5, 4].map((x, i) => (
            <rect key={i} x={x} y="-6" width="2.2" height="12" rx="1.1" fill="#C084FC">
              <animate attributeName="opacity" values="0.2;1;0.2" dur="0.7s" begin={`${i * 0.15}s`} repeatCount="indefinite" />
            </rect>
          ))}
        </g>

        {/* rail to reply bubble */}
        <path d="M 242 90 C 262 90, 262 90, 282 90" stroke="#1C2440" strokeWidth="1.25" fill="none" />
        <circle r="2.6" fill="#C084FC">
          <animateMotion dur="1.1s" begin="1.1s" repeatCount="indefinite" path="M 242 90 C 262 90, 262 90, 282 90" />
        </circle>

        {/* reply bubble with checkmark, clear on/off cycle synced to the rest */}
        <g>
          <rect x="282" y="66" width="76" height="42" rx="12" fill="#0B0F1A" stroke="url(#sceneGrad3)" strokeWidth="1.4">
            <animate attributeName="opacity" values="0.25;0.25;1;1;0.25" keyTimes="0;0.45;0.55;0.9;1" dur="2.2s" repeatCount="indefinite" />
          </rect>
          <path d="M 307 87 l 8 8 l 16 -16" fill="none" stroke="#4ADE80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.5;0.6;0.9;1" dur="2.2s" repeatCount="indefinite" />
          </path>
        </g>
        <text x="320" y="128" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#5C6480" textAnchor="middle">
          {s.resolved}
        </text>
      </g>
    </svg>
  )
}
