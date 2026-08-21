import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Routes, Route, Navigate, Link as RouterLink } from 'react-router-dom'
import { getT } from './i18n.jsx'
import juliaPhoto from './assets/testimonials/julia-georgi.jpeg'
import quentinPhoto from './assets/testimonials/quentin-chantelot.jpeg'
import {
  ArrowRight,
  Terminal,
  Workflow,
  Mail,
  FileSpreadsheet,
  Bot,
  GitBranch,
  Server,
  ChevronRight,
  Quote,
  CalendarCheck,
  BellRing,
  FileSearch,
  Radar,
} from 'lucide-react'

/* ---------------------------------------------------------
   Signature element: the "assembly line" — raw task streams
   flow along smooth bezier paths into a compiled agent core,
   then diverge into automated outcomes. Particles travel the
   paths natively via SVG animateMotion for a fluid, precise
   motion (no dashed-line flicker).
--------------------------------------------------------- */
function PipelineFlow({ className = '' }) {
  const inputs = [
    { path: 'M 30 30 C 170 30, 230 80, 335 88', label: 'factures', delay: '0s' },
    { path: 'M 30 90 C 170 90, 250 90, 335 90', label: 'emails', delay: '0.6s' },
    { path: 'M 30 150 C 170 150, 230 100, 335 92', label: 'tickets', delay: '1.2s' },
  ]
  const outputs = [
    { path: 'M 445 88 C 510 68, 590 40, 750 38', label: 'traité', delay: '0.3s' },
    { path: 'M 445 90 C 510 90, 590 90, 750 90', label: 'classé', delay: '0.9s' },
    { path: 'M 445 92 C 510 112, 590 140, 750 142', label: 'relancé', delay: '1.5s' },
  ]
  const CORE_X = 390
  const CORE_Y = 90

  return (
    <svg
      viewBox="0 0 780 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Schéma : des tâches brutes convergent vers un agent codé au centre, qui produit des actions automatisées"
    >
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
        <radialGradient id="coreGrad">
          <stop offset="0%" stopColor="#C084FC" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
        </radialGradient>
        <filter id="glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* static faint rails */}
      {[...inputs, ...outputs].map((p, i) => (
        <path key={`rail-${i}`} d={p.path} stroke="#161D33" strokeWidth="1.25" fill="none" />
      ))}

      {/* traveling particles on input rails */}
      {inputs.map((p, i) => (
        <circle key={`p-in-${i}`} r="2.6" fill="#60A5FA" filter="url(#glow)">
          <animateMotion dur="2.4s" begin={p.delay} repeatCount="indefinite" path={p.path} />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.85;1" dur="2.4s" begin={p.delay} repeatCount="indefinite" />
        </circle>
      ))}

      {/* traveling particles on output rails */}
      {outputs.map((p, i) => (
        <circle key={`p-out-${i}`} r="2.6" fill="#C084FC" filter="url(#glow)">
          <animateMotion dur="2.4s" begin={p.delay} repeatCount="indefinite" path={p.path} />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.85;1" dur="2.4s" begin={p.delay} repeatCount="indefinite" />
        </circle>
      ))}

      {/* origin + destination markers */}
      {inputs.map((p, i) => {
        const start = [30, [30, 90, 150][i]]
        return (
          <g key={`in-label-${i}`}>
            <circle cx={start[0]} cy={start[1]} r="3" fill="#3A4062" />
            <text x={start[0] - 6} y={start[1] - 10} fontFamily="JetBrains Mono, monospace" fontSize="9.5" fill="#5C6480" textAnchor="middle">
              {p.label}
            </text>
          </g>
        )
      })}
      {outputs.map((p, i) => {
        const end = [750, [38, 90, 142][i]]
        return (
          <g key={`out-label-${i}`}>
            <circle cx={end[0]} cy={end[1]} r="3" fill="#7C3AED" />
            <text x={end[0] + 6} y={end[1] - 10} fontFamily="JetBrains Mono, monospace" fontSize="9.5" fill="#8992AB" textAnchor="middle">
              {p.label}
            </text>
          </g>
        )
      })}

      {/* core: the agent "at work" — a chip-like unit with two counter-
          rotating orbit rings (reads as active processing, not a static
          dot) plus a diamond core casing */}
      <g transform={`translate(${CORE_X} ${CORE_Y})`}>
        <circle r="52" fill="url(#coreGrad)" opacity="0.45" />

        {/* outer orbit ring, slow rotation */}
        <circle r="36" fill="none" stroke="url(#lineGrad)" strokeWidth="1.1" strokeDasharray="3 7" opacity="0.55">
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="7s" repeatCount="indefinite" />
        </circle>
        {/* small satellite riding the outer ring */}
        <circle r="2.2" fill="#60A5FA" filter="url(#glow)">
          <animateMotion dur="7s" repeatCount="indefinite" path="M 36 0 A 36 36 0 1 1 -36 0 A 36 36 0 1 1 36 0" />
        </circle>

        {/* inner orbit ring, counter-rotation, slightly faster */}
        <circle r="26" fill="none" stroke="url(#lineGrad)" strokeWidth="1" strokeDasharray="2 5" opacity="0.4">
          <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="5s" repeatCount="indefinite" />
        </circle>

        {/* chip casing */}
        <rect
          x="-17" y="-17" width="34" height="34" rx="9"
          fill="#0B0F1A" stroke="url(#lineGrad)" strokeWidth="1.5"
        />
        {/* corner ticks, processor-style */}
        {[[-17, -17, -11, -17], [-17, -17, -17, -11], [17, -17, 11, -17], [17, -17, 17, -11],
          [-17, 17, -11, 17], [-17, 17, -17, 11], [17, 17, 11, 17], [17, 17, 17, 11]].map((c, i) => (
          <line key={`tick-${i}`} x1={c[0]} y1={c[1]} x2={c[2]} y2={c[3]} stroke="#3A4062" strokeWidth="1.5" />
        ))}
        {/* pulsing internal activity bars, like a working processor */}
        {[-8, -2, 4].map((x, i) => (
          <rect key={`bar-${i}`} x={x} y="-6" width="2.4" height="12" rx="1" fill="#C084FC">
            <animate
              attributeName="opacity"
              values="0.25;1;0.25"
              dur="1.6s"
              begin={`${i * 0.25}s`}
              repeatCount="indefinite"
            />
          </rect>
        ))}
      </g>
      <text x={CORE_X} y={CORE_Y + 38} fontFamily="JetBrains Mono, monospace" fontSize="9.5" fill="#5C6480" textAnchor="middle">
        agent()
      </text>
    </svg>
  )
}

/* ---------------------------------------------------------
   Use-case scenes — one small illustrated SVG animation per
   card, shown in the stage panel on hover. Same visual
   language as PipelineFlow: thin rails, gradient particles,
   mono labels, dark chip surfaces.
--------------------------------------------------------- */
function SceneInvoice({ lang = 'fr' }) {
  const s = {
    fr: { pending: 'en attente', done: 'relancée ✓', sent: 'relance envoyée' },
    en: { pending: 'pending', done: 'followed up ✓', sent: 'follow-up sent' },
  }[lang]
  return (
    <svg viewBox="0 0 380 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sceneGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
      </defs>
      {/* invoice card */}
      <rect x="40" y="34" width="130" height="154" rx="10" fill="#0B0F1A" stroke="#1C2440" strokeWidth="1.5" />
      <rect x="58" y="56" width="70" height="6" rx="3" fill="#2A3352" />
      <rect x="58" y="72" width="94" height="4" rx="2" fill="#1C2440" />
      <rect x="58" y="84" width="94" height="4" rx="2" fill="#1C2440" />
      <rect x="58" y="96" width="60" height="4" rx="2" fill="#1C2440" />
      <rect x="58" y="140" width="94" height="1" fill="#1C2440" />
      <rect x="58" y="152" width="40" height="5" rx="2" fill="#2A3352" />
      <text x="122" y="157" fontFamily="JetBrains Mono, monospace" fontSize="12" fill="#C084FC" textAnchor="end">
        1 240 €
      </text>
      {/* status pill morphing */}
      <g>
        <rect x="52" y="112" width="76" height="18" rx="9" fill="none" stroke="url(#sceneGrad)" strokeWidth="1">
          <animate attributeName="opacity" values="1;1;0;0;1" keyTimes="0;0.35;0.4;0.95;1" dur="4s" repeatCount="indefinite" />
        </rect>
        <text x="90" y="124" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#8992AB" textAnchor="middle">
          <animate attributeName="opacity" values="1;1;0;0;1" keyTimes="0;0.35;0.4;0.95;1" dur="4s" repeatCount="indefinite" />
          {s.pending}
        </text>
        <rect x="52" y="112" width="76" height="18" rx="9" fill="none" stroke="#4ADE80" strokeWidth="1">
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.4;0.45;0.95;1" dur="4s" repeatCount="indefinite" />
        </rect>
        <text x="90" y="124" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#4ADE80" textAnchor="middle">
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.4;0.45;0.95;1" dur="4s" repeatCount="indefinite" />
          {s.done}
        </text>
      </g>

      {/* rail to envelope */}
      <path d="M 170 100 C 220 100, 250 100, 300 100" stroke="#1C2440" strokeWidth="1.25" fill="none" />
      <circle r="2.6" fill="#C084FC">
        <animateMotion dur="2.4s" begin="1.2s" repeatCount="indefinite" path="M 170 100 C 220 100, 250 100, 300 100" />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.8;1" dur="2.4s" begin="1.2s" repeatCount="indefinite" />
      </circle>

      {/* envelope icon */}
      <g transform="translate(300 100)">
        <rect x="-24" y="-17" width="48" height="34" rx="5" fill="#0B0F1A" stroke="url(#sceneGrad)" strokeWidth="1.4" />
        <path d="M -24 -14 L 0 4 L 24 -14" stroke="url(#sceneGrad)" strokeWidth="1.2" fill="none" />
      </g>
      <text x="300" y="150" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#5C6480" textAnchor="middle">
        {s.sent}
      </text>
    </svg>
  )
}

function SceneEmailSort({ lang = 'fr' }) {
  const mails = [
    { path: 'M 78 40 C 140 40, 195 90, 262 68', delay: '0s', color: '#3B82F6' },
    { path: 'M 78 100 C 140 100, 195 100, 262 100', delay: '0.9s', color: '#A855F7' },
    { path: 'M 78 160 C 140 160, 195 112, 262 132', delay: '1.8s', color: '#3B82F6' },
  ]
  return (
    <svg viewBox="0 0 380 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="sceneGlow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* source inbox */}
      <g transform="translate(40 100)">
        <rect x="-34" y="-24" width="68" height="48" rx="7" fill="#0B0F1A" stroke="#1C2440" strokeWidth="1.5" />
        <path d="M -34 -17 L 0 8 L 34 -17" stroke="#3A4062" strokeWidth="1.3" fill="none" />
      </g>
      <text x="40" y="140" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#5C6480" textAnchor="middle">
        {lang === 'fr' ? 'inbox' : 'inbox'}
      </text>

      {/* traveling envelopes, each with its own fade/motion + a tiny glowing "read" flash on arrival */}
      {mails.map((m, i) => (
        <g key={i}>
          <path d={m.path} stroke="#161D33" strokeWidth="1.25" fill="none" />
          <g filter="url(#sceneGlow)">
            <animateMotion dur="3s" begin={m.delay} repeatCount="indefinite" path={m.path} />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.85;1" dur="3s" begin={m.delay} repeatCount="indefinite" />
            <rect x="-10" y="-7" width="20" height="14" rx="2.5" fill="#0B0F1A" stroke={m.color} strokeWidth="1.3" />
            <path d={`M -10 -5 L 0 3 L 10 -5`} stroke={m.color} strokeWidth="1" fill="none" />
          </g>
        </g>
      ))}

      {/* folder: traité */}
      <g transform="translate(304 62)">
        <path d="M -32 -17 h 22 l 6 8 h 36 v 32 h -64 z" fill="#0B0F1A" stroke="#3B82F6" strokeWidth="1.4" />
        <text y="38" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#60A5FA" textAnchor="middle">
          {lang === 'fr' ? 'traité' : 'handled'}
        </text>
      </g>
      {/* folder: urgent */}
      <g transform="translate(304 142)">
        <path d="M -32 -17 h 22 l 6 8 h 36 v 32 h -64 z" fill="#0B0F1A" stroke="#A855F7" strokeWidth="1.4" />
        <text y="38" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#C084FC" textAnchor="middle">
          {lang === 'fr' ? 'urgent' : 'urgent'}
        </text>
      </g>
    </svg>
  )
}

function SceneSupport({ lang = 'fr' }) {
  const questions = {
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
  }[lang]
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
  }, [lang])

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
                {questions[qIndex][0]}
              </text>
              <text x="42" y="84" fontFamily="Inter, sans-serif" fontSize="10.5" fill="#C7CCDC">
                {questions[qIndex][1]}
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

function SceneLeads({ lang = 'fr' }) {
  const rawLeads = [
    { y: 130, delay: '0s' },
    { y: 45, delay: '0.35s' },
    { y: 155, delay: '0.7s' },
    { y: 80, delay: '1.05s' },
  ]
  const ranked = [
    { score: 92, color: '#4ADE80', y: 44 },
    { score: 78, color: '#60A5FA', y: 78 },
    { score: 55, color: '#60A5FA', y: 112 },
    { score: 31, color: '#5C6480', y: 146 },
  ]
  const maxBarWidth = 92
  const labels = { fr: ['leads bruts', 'priorisés'], en: ['raw leads', 'prioritized'] }[lang]

  // drives both the bar width AND the displayed number together, so the
  // score visibly counts up as the bar grows instead of the number just
  // appearing. Implemented as a plain requestAnimationFrame loop rather
  // than framer-motion's standalone animate() — that call was throwing
  // ("WeakMap keys must be objects") when fed a raw keyframes array with
  // no attached subject/element, so a small hand-rolled interpolator is
  // both simpler and more reliable here.
  const [counts, setCounts] = useState(ranked.map(() => 0))

  useEffect(() => {
    const DURATION = 3600 // ms, matches the old dur="3.6s"
    const TIMES = [0, 0.4, 0.5, 0.9, 1]
    let rafId
    const start = performance.now()

    function valueAt(score, frac) {
      const values = [0, 0, score, score, 0]
      for (let k = 0; k < TIMES.length - 1; k++) {
        if (frac >= TIMES[k] && frac <= TIMES[k + 1]) {
          const span = TIMES[k + 1] - TIMES[k] || 1
          const segFrac = (frac - TIMES[k]) / span
          return values[k] + (values[k + 1] - values[k]) * segFrac
        }
      }
      return values[values.length - 1]
    }

    function tick(now) {
      const elapsed = now - start
      setCounts(
        ranked.map((r, i) => {
          const delay = i * 900 // ms, matches the old begin={i*0.9s}
          const local = ((elapsed - delay) % DURATION + DURATION) % DURATION
          return Math.round(valueAt(r.score, local / DURATION))
        })
      )
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        {rawLeads.map((l, i) => {
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
        {ranked.map((r, i) => {
          const particlePath = `M 206 100 C 230 100, 245 ${r.y}, 260 ${r.y}`
          const begin = `${i * 0.9}s`
          const width = (counts[i] / 100) * maxBarWidth
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

              <rect x="260" y={r.y - 7} width={maxBarWidth} height="14" rx="4" fill="#111729" stroke="#1C2440" strokeWidth="1" />
              <rect x="260" y={r.y - 7} width={width} height="14" rx="4" fill={r.color} opacity="0.9" />
              <text x={260 + maxBarWidth + 12} y={r.y + 4} fontFamily="JetBrains Mono, monospace" fontSize="11" fill={r.color} textAnchor="start">
                {counts[i] > 0 ? counts[i] : ''}
              </text>
            </g>
          )
        })}
      </g>
    </svg>
  )
}

function SceneAppointment({ lang = 'fr' }) {
  const requests = {
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
  const t = {
    fr: { demande: 'demande', creneau: 'créneau libre', confirme: 'confirmé', demain: 'demain', rappel: 'rappel programmé' },
    en: { demande: 'request', creneau: 'open slot', confirme: 'confirmed', demain: 'tomorrow', rappel: 'reminder set' },
  }[lang]
  const [qIndex, setQIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setQIndex((i) => (i + 1) % requests[lang].length), 5000)
    return () => clearInterval(id)
  }, [lang])

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
        <text x="86" y="26" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#5C6480" textAnchor="middle">{t.demande}</text>
        <text x="210" y="26" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#5C6480" textAnchor="middle">{t.creneau}</text>
        <text x="318" y="26" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#5C6480" textAnchor="middle">{t.confirme}</text>

        {/* incoming request bubble — text rotates through a few realistic
            requests every 5s, cross-fading like the support scene */}
        <g>
          <rect x="24" y="46" width="128" height="50" rx="14" fill="#0B0F1A" stroke="#1C2440" strokeWidth="1.5" />
          <path d="M 44 96 l -10 14 l 20 -8 z" fill="#0B0F1A" stroke="#1C2440" strokeWidth="1.5" />
          <AnimatePresence mode="wait">
            <motion.g
              key={qIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <text x="40" y="68" fontFamily="Inter, sans-serif" fontSize="10.5" fill="#C7CCDC">
                {requests[lang][qIndex][0]}
              </text>
              <text x="40" y="84" fontFamily="Inter, sans-serif" fontSize="10.5" fill="#C7CCDC">
                {requests[lang][qIndex][1]}
              </text>
            </motion.g>
          </AnimatePresence>
        </g>

        {/* rail to agent chip */}
        <path d="M 152 71 C 176 71, 176 90, 195 90" stroke="#1C2440" strokeWidth="1.25" fill="none" />
        <circle r="2.6" fill="#60A5FA">
          <animateMotion dur="1.4s" repeatCount="indefinite" path="M 152 71 C 176 71, 176 90, 195 90" />
        </circle>

        {/* mini agent chip, center */}
        <g transform="translate(210 100)">
          <circle r="32" fill="url(#coreGradScene3)" opacity="0.45" />
          <circle r="23" fill="none" stroke="url(#sceneGrad5)" strokeWidth="1.1" strokeDasharray="2 6" opacity="0.6">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="2.6s" repeatCount="indefinite" />
          </circle>
          <rect x="-14" y="-14" width="28" height="28" rx="7" fill="#0B0F1A" stroke="url(#sceneGrad5)" strokeWidth="1.4" />
          {[-7, -1.5, 4].map((x, i) => (
            <rect key={i} x={x} y="-6" width="2.2" height="12" rx="1.1" fill="#C084FC">
              <animate attributeName="opacity" values="0.2;1;0.2" dur="0.8s" begin={`${i * 0.15}s`} repeatCount="indefinite" />
            </rect>
          ))}
        </g>

        {/* rail to calendar */}
        <path d="M 242 90 C 262 90, 262 90, 282 90" stroke="#1C2440" strokeWidth="1.25" fill="none" />
        <circle r="2.6" fill="#C084FC">
          <animateMotion dur="1.4s" begin="1.3s" repeatCount="indefinite" path="M 242 90 C 262 90, 262 90, 282 90" />
        </circle>

        {/* calendar card confirming the slot */}
        <g transform="translate(282 66)">
          <rect width="76" height="46" rx="10" fill="#0B0F1A" stroke="url(#sceneGrad5)" strokeWidth="1.4" />
          <rect x="0" y="0" width="76" height="13" rx="10" fill="#161D33" />
          <text x="38" y="10" fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#8992AB" textAnchor="middle">{t.demain}</text>
          <text x="38" y="34" fontFamily="JetBrains Mono, monospace" fontSize="13" fill="#4ADE80" textAnchor="middle">14:00</text>
          {/* confirmation badge — sits on the gradient border, top-right
              corner, rather than overlapping the time text */}
          <g transform="translate(76 0)">
            <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.4;0.5;0.9;1" dur="3s" repeatCount="indefinite" />
            <circle r="9" fill="#0B0F1A" stroke="#4ADE80" strokeWidth="1.6" />
            <path d="M -4 0 l 3 3.5 l 6 -7" fill="none" stroke="#4ADE80" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>
        <text x="320" y="128" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#5C6480" textAnchor="middle">
          {t.rappel}
        </text>
      </g>
    </svg>
  )
}

function SceneMonitoring({ lang = 'fr' }) {
  const s = {
    fr: { signaux: 'signaux', alerte: 'alerte', prevenue: 'équipe prévenue', latence: 'latence', erreurs: 'erreurs', trafic: 'trafic' },
    en: { signaux: 'signals', alerte: 'alert', prevenue: 'team notified', latence: 'latency', erreurs: 'errors', trafic: 'traffic' },
  }[lang]
  const signals = [
    { y: 40, color: '#60A5FA', label: s.latence },
    { y: 100, color: '#FBBF24', label: s.erreurs },
    { y: 160, color: '#4ADE80', label: s.trafic },
  ]
  const wave = 'M 168 105 L 186 103 L 200 107 L 215 101 L 230 105 L 245 65 L 258 125 L 275 103 L 300 104'

  return (
    <svg viewBox="0 0 380 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sceneGrad6" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
        <radialGradient id="coreGradScene4">
          <stop offset="0%" stopColor="#C084FC" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
        </radialGradient>
        <filter id="sceneGlow3" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <g transform="translate(0 26)">
        <text x="42" y="16" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#5C6480" textAnchor="middle">{s.signaux}</text>
        <text x="330" y="16" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#5C6480" textAnchor="middle">{s.alerte}</text>

        {/* multiple colored metric sources, each a tiny sparkline, all
            feeding into the agent — it's the one that decides which
            signal actually deserves a response */}
        {signals.map((s, i) => {
          const path = `M 46 ${s.y} C 80 ${s.y}, 100 100, 125 100`
          return (
            <g key={i}>
              <path d={`M -10 4 L -3 -4 L 3 2 L 10 -5`} transform={`translate(30 ${s.y})`} stroke={s.color} strokeWidth="1.4" fill="none" opacity="0.85" />
              <path d={path} stroke="#161D33" strokeWidth="1.1" fill="none" />
              <circle r="2.6" fill={s.color} filter="url(#sceneGlow3)">
                <animateMotion dur="2.4s" begin={`${i * 0.7}s`} repeatCount="indefinite" path={path} />
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.8;1" dur="2.4s" begin={`${i * 0.7}s`} repeatCount="indefinite" />
              </circle>
            </g>
          )
        })}

        {/* mini agent chip = the triage engine, deciding which signal matters */}
        <g transform="translate(148 100)">
          <circle r="28" fill="url(#coreGradScene4)" opacity="0.45" />
          <circle r="20" fill="none" stroke="url(#sceneGrad6)" strokeWidth="1.1" strokeDasharray="2 6" opacity="0.55">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="3s" repeatCount="indefinite" />
          </circle>
          <rect x="-12" y="-12" width="24" height="24" rx="6" fill="#0B0F1A" stroke="url(#sceneGrad6)" strokeWidth="1.4" />
          {[-6, -1, 4].map((x, i) => (
            <rect key={i} x={x} y="-5" width="2" height="10" rx="1" fill="#C084FC">
              <animate attributeName="opacity" values="0.2;1;0.2" dur="1s" begin={`${i * 0.18}s`} repeatCount="indefinite" />
            </rect>
          ))}
        </g>

        {/* rail from chip to the chosen response */}
        <path d="M 166 100 C 168 100, 168 105, 168 105" stroke="#1C2440" strokeWidth="1.25" fill="none" />

        {/* the response the agent picked — waveform with the one real
            anomaly, escalated */}
        <path d={wave} stroke="url(#sceneGrad6)" strokeWidth="1.6" fill="none" opacity="0.8" />

        <circle cx="245" cy="65" r="4" fill="#F87171" filter="url(#sceneGlow3)">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="1.2s" repeatCount="indefinite" />
        </circle>

        <path d="M 249 65 C 280 48, 300 48, 320 74" stroke="#1C2440" strokeWidth="1.25" fill="none" />
        <circle r="2.6" fill="#F87171">
          <animateMotion dur="1.6s" repeatCount="indefinite" path="M 249 65 C 280 48, 300 48, 320 74" />
        </circle>

        {/* bell + alert card */}
        <g transform="translate(320 100)">
          <circle r="26" fill="none" stroke="url(#sceneGrad6)" strokeWidth="1.2" strokeDasharray="2 6" opacity="0.5">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="5s" repeatCount="indefinite" />
          </circle>
          <rect x="-16" y="-16" width="32" height="32" rx="9" fill="#0B0F1A" stroke="url(#sceneGrad6)" strokeWidth="1.4" />
          <path d="M -6 -6 q 6 -8 12 0 q 0 8 3 10 h -18 q 3 -2 3 -10" fill="none" stroke="#F87171" strokeWidth="1.4" strokeLinejoin="round" />
        </g>
        <text x="320" y="150" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#5C6480" textAnchor="middle">
          {s.prevenue}
        </text>
      </g>
    </svg>
  )
}

function SceneExtraction({ lang = 'fr' }) {
  const s = {
    fr: { scanned: 'document scanné', structured: 'données structurées', client: 'client', montant: 'montant', date: 'date' },
    en: { scanned: 'scanned document', structured: 'structured data', client: 'client', montant: 'amount', date: 'date' },
  }[lang]
  return (
    <svg viewBox="0 0 380 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sceneGrad7" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
        <filter id="sceneGlow4" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <g transform="translate(0 26)">
        <text x="66" y="16" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#5C6480" textAnchor="middle">{s.scanned}</text>
        <text x="310" y="16" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#5C6480" textAnchor="middle">{s.structured}</text>

        {/* scanned document, with a scan-line sweeping down it on loop */}
        <g transform="translate(50 100)">
          <rect x="-38" y="-56" width="76" height="112" rx="8" fill="#0B0F1A" stroke="#1C2440" strokeWidth="1.5" />
          {[-38, -22, -6, 10, 26].map((y, i) => (
            <rect key={i} x="-26" y={y} width="52" height="4" rx="2" fill="#1C2440" />
          ))}
          <rect x="-38" y="-56" width="76" height="6" fill="url(#sceneGrad7)" opacity="0.8">
            <animate attributeName="y" values="-56;50;-56" dur="2.6s" repeatCount="indefinite" />
          </rect>
        </g>

        {/* rail to agent chip */}
        <path d="M 92 100 C 130 100, 150 100, 172 100" stroke="#1C2440" strokeWidth="1.25" fill="none" />
        <circle r="2.6" fill="#60A5FA" filter="url(#sceneGlow4)">
          <animateMotion dur="1.5s" repeatCount="indefinite" path="M 92 100 C 130 100, 150 100, 172 100" />
        </circle>

        {/* mini agent chip */}
        <g transform="translate(190 100)">
          <circle r="30" fill="#A855F7" opacity="0.15" />
          <circle r="21" fill="none" stroke="url(#sceneGrad7)" strokeWidth="1.1" strokeDasharray="2 6" opacity="0.55">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="3s" repeatCount="indefinite" />
          </circle>
          <rect x="-13" y="-13" width="26" height="26" rx="7" fill="#0B0F1A" stroke="url(#sceneGrad7)" strokeWidth="1.4" />
          {[-6, -1, 4].map((x, i) => (
            <rect key={i} x={x} y="-5" width="2" height="10" rx="1" fill="#C084FC">
              <animate attributeName="opacity" values="0.2;1;0.2" dur="0.9s" begin={`${i * 0.15}s`} repeatCount="indefinite" />
            </rect>
          ))}
        </g>

        {/* rail to structured output */}
        <path d="M 208 100 C 240 100, 250 100, 262 100" stroke="#1C2440" strokeWidth="1.25" fill="none" />

        {/* structured fields appearing one by one */}
        {[
          { label: s.client, value: 'SARL Dupont', y: 56 },
          { label: s.montant, value: '1 240 €', y: 88 },
          { label: s.date, value: '12/03', y: 120 },
        ].map((f, i) => (
          <g key={i}>
            <rect x="262" y={f.y - 14} width="100" height="28" rx="6" fill="#111729" stroke="#1C2440" strokeWidth="1">
              <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.15;0.3;1" dur="3.2s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
            </rect>
            <text x="272" y={f.y - 2} fontFamily="JetBrains Mono, monospace" fontSize="8" fill="#5C6480">
              <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.15;0.3;1" dur="3.2s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
              {f.label}
            </text>
            <text x="272" y={f.y + 10} fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#C084FC">
              <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.15;0.3;1" dur="3.2s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
              {f.value}
            </text>
          </g>
        ))}
      </g>
    </svg>
  )
}

function SceneCompetitiveWatch({ lang = 'fr' }) {
  const digests = {
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
  }[lang]
  const s = {
    fr: { sources: 'sources', digest: 'digest', updated: 'mis à jour chaque jour' },
    en: { sources: 'sources', digest: 'digest', updated: 'updated every day' },
  }[lang]
  const [dIndex, setDIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setDIndex((i) => (i + 1) % digests.length), 4200)
    return () => clearInterval(id)
  }, [lang])

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
        {[
          { y: 40, path: 'M 26 40 C 70 40, 95 88, 132 90' },
          { y: 100, path: 'M 26 100 C 70 100, 95 100, 132 100' },
          { y: 160, path: 'M 26 160 C 70 160, 95 112, 132 110' },
        ].map((s, i) => (
          <g key={i}>
            <circle cx="26" cy={s.y} r="7" fill="none" stroke="#3A4062" strokeWidth="1.4" />
            <circle cx="26" cy={s.y} r="2.5" fill="#3A4062" />
            <path d={s.path} stroke="#161D33" strokeWidth="1.25" fill="none" />
            <circle r="2.6" fill="#60A5FA">
              <animateMotion dur="2.2s" begin={`${i * 0.6}s`} repeatCount="indefinite" path={s.path} />
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
                {digests[dIndex][0]}
              </text>
              <text x="206" y="104" fontFamily="Inter, sans-serif" fontSize="10.5" fill="#C7CCDC">
                {digests[dIndex][1]}
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

function Eyebrow({ children }) {
  return (
    <span className="font-mono text-xs tracking-[0.2em] uppercase text-blue-soft/80 inline-flex items-center gap-2">
      <span className="w-6 h-px bg-gradient-to-r from-blue to-violet" />
      {children}
    </span>
  )
}

function RevealSection({ children, className = '', id }) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  )
}

function Nav({ lang, t }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const otherLang = lang === 'fr' ? 'en' : 'fr'

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-bg/80 backdrop-blur-md border-b border-line' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#top" className="font-display font-semibold text-2xl tracking-tight flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue to-violet" />
          <span className="text-gradient">agentic-factory</span>
        </a>
        <div className="flex items-center gap-4">
          <RouterLink
            to={`/${otherLang}`}
            className="font-mono text-xs text-muted2 hover:text-text transition-colors"
            aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
          >
            {otherLang.toUpperCase()}
          </RouterLink>
          <a
            href="https://calendly.com/busshidev/meeting"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs tracking-wide px-4 py-2 rounded-full border border-line hover:border-violet/60 transition-colors"
          >
            {t.nav.cta}
          </a>
        </div>
      </div>
    </header>
  )
}

function Hero({ lang, t }) {
  const heroScenes = [SceneInvoice, SceneEmailSort, SceneAppointment, SceneSupport, SceneLeads, SceneMonitoring, SceneExtraction, SceneCompetitiveWatch]
  const [heroActive, setHeroActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setHeroActive((i) => (i + 1) % heroScenes.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  const HeroScene = heroScenes[heroActive]

  return (
    <section id="top" className="relative pt-40 pb-28 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-grad-radial pointer-events-none" />
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Eyebrow>{t.hero.eyebrow}</Eyebrow>
          <h1 className="font-display font-semibold text-4xl sm:text-5xl md:text-6xl leading-[1.08] mt-6 max-w-3xl">
            {t.hero.titleA}{' '}
            <span className="text-gradient">{t.hero.titleB}</span>
          </h1>
          <p className="text-muted text-lg mt-6 max-w-xl leading-relaxed">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-4 mt-9">
            <a
              href="https://calendly.com/busshidev/meeting"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue to-violet text-white font-medium px-6 py-3.5 rounded-full hover:opacity-90 transition-opacity"
            >
              {t.hero.ctaPrimary}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="#cas-usage"
              className="font-mono text-sm text-muted hover:text-text transition-colors inline-flex items-center gap-1"
            >
              {t.hero.ctaSecondary}
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 sm:mt-20 rounded-2xl border border-line bg-surface/60 backdrop-blur-sm p-2 sm:p-10 h-[320px] sm:h-[420px] relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={heroActive}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-2 sm:inset-6"
            >
              <HeroScene lang={lang} />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

function Problem({ t }) {
  return (
    <RevealSection className="px-6 py-24 border-t border-line">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_1.2fr] gap-12 items-start">
        <div>
          <Eyebrow>{t.problem.eyebrow}</Eyebrow>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl mt-5 leading-tight">
            {t.problem.title}
          </h2>
        </div>
        <div className="space-y-5 text-muted text-lg leading-relaxed">
          <p>{t.problem.p1}</p>
          <p>{t.problem.p2}</p>
        </div>
      </div>
    </RevealSection>
  )
}

function ValueProp({ t }) {
  const icons = [Terminal, Workflow, GitBranch]
  const points = t.valueProp.cards.map((c, i) => ({ ...c, icon: icons[i] }))

  return (
    <RevealSection className="px-6 py-24 border-t border-line bg-surface/30">
      <div className="max-w-6xl mx-auto">
        <Eyebrow>{t.valueProp.eyebrow}</Eyebrow>
        <h2 className="font-display font-semibold text-3xl sm:text-4xl mt-5 max-w-2xl leading-tight">
          {t.valueProp.title}
        </h2>
        <div className="grid sm:grid-cols-3 gap-6 mt-14">
          {points.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-line bg-surface2/40 hover:border-violet/40 transition-colors"
            >
              <p.icon className="w-6 h-6 text-blue-soft" strokeWidth={1.6} />
              <h3 className="font-display font-medium text-lg mt-4">{p.title}</h3>
              <p className="text-muted text-sm leading-relaxed mt-2">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </RevealSection>
  )
}

function UseCases({ lang, t }) {
  const icons = [FileSpreadsheet, Mail, CalendarCheck, Bot, Server, BellRing, FileSearch, Radar]
  const scenes = [SceneInvoice, SceneEmailSort, SceneAppointment, SceneSupport, SceneLeads, SceneMonitoring, SceneExtraction, SceneCompetitiveWatch]
  const tagKeys = ['tagPME', 'tagPME', 'tagPME', 'tagStartup', 'tagStartup', 'tagStartup', 'tagPME', 'tagStartup']

  const cases = t.useCases.cases.map((c, i) => ({
    ...c,
    icon: icons[i],
    Scene: scenes[i],
    tag: t.useCases[tagKeys[i]],
  }))

  const [active, setActive] = useState(0)
  const ActiveScene = cases[active].Scene
  const carouselRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    const container = carouselRef.current
    if (!container) return
    const observer = new IntersectionObserver(
      (entries) => {
        let best = null
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!best || entry.intersectionRatio > best.intersectionRatio)) {
            best = entry
          }
        })
        if (best) {
          const idx = Number(best.target.dataset.index)
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
        carouselInViewRef.current = entry.isIntersecting
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
      const target = cardRefs.current[next]
      if (target && typeof target.scrollIntoView === 'function') {
        target.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
      }
    }, 5000)
    return () => clearInterval(id)
  }, [cases.length])

  return (
    <RevealSection id="cas-usage" className="px-6 py-24 border-t border-line">
      <div className="max-w-6xl mx-auto">
        <Eyebrow>{t.useCases.eyebrow}</Eyebrow>
        <h2 className="font-display font-semibold text-3xl sm:text-4xl mt-5 max-w-2xl leading-tight">
          {t.useCases.title}
        </h2>

        {/* stage panel — shows the illustrated scene for the hovered/focused/tapped card */}
        <div className="mt-12 rounded-2xl border border-line bg-surface/60 backdrop-blur-sm h-[300px] sm:h-[400px] relative overflow-hidden">
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
              ref={(el) => (cardRefs.current[i] = el)}
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

        {/* desktop/tablet: full grid, hover or focus swaps the stage panel */}
        <div className="hidden sm:grid sm:grid-cols-2 gap-5 mt-6">
          {cases.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              tabIndex={0}
              className={`group p-7 rounded-2xl border bg-surface/40 hover:bg-surface2/60 transition-colors relative overflow-hidden cursor-default ${
                active === i ? 'border-violet/50' : 'border-line'
              }`}
            >
              <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-gradient-to-br from-blue/10 to-violet/10 blur-2xl group-hover:opacity-100 opacity-0 transition-opacity" />
              <div className="flex items-center gap-3">
                <c.icon className="w-5 h-5 text-violet-soft" strokeWidth={1.6} />
                <span className="font-mono text-[11px] tracking-wider uppercase text-muted2 border border-line rounded-full px-2.5 py-0.5">
                  {c.tag}
                </span>
              </div>
              <h3 className="font-display font-medium text-xl mt-4">{c.title}</h3>
              <p className="text-muted text-sm leading-relaxed mt-2">{c.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </RevealSection>
  )
}

function Credibility({ t }) {
  const stack = [
    'TypeScript', 'React / Next.js', 'NestJS', 'Node.js', 'Python / Django', 'GraphQL', 'PostgreSQL', 'Docker',
  ]

  return (
    <RevealSection className="px-6 py-24 border-t border-line bg-surface/30">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-start">
        <div>
          <Eyebrow>{t.credibility.eyebrow}</Eyebrow>
          <h2 className="font-display font-semibold text-3xl sm:text-4xl mt-5 leading-tight">
            {t.credibility.title}
          </h2>
          <p className="text-muted text-lg leading-relaxed mt-6">
            {t.credibility.text}
          </p>
          <a
            href="https://www.linkedin.com/in/alexandre-dubar"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-sm text-blue-soft hover:text-violet-soft transition-colors mt-6"
          >
            {t.credibility.linkedinCta}
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>
        <div>
          <p className="font-mono text-xs tracking-widest uppercase text-muted2 mb-4">
            {t.credibility.stackLabel}
          </p>
          <div className="flex flex-wrap gap-2.5">
            {stack.map((s) => (
              <span
                key={s}
                className="font-mono text-sm px-3.5 py-1.5 rounded-full border border-line text-muted hover:border-blue/50 hover:text-text transition-colors"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </RevealSection>
  )
}

function Testimonials({ t }) {
  const photos = [quentinPhoto, juliaPhoto]
  const quotes = t.testimonials.quotes.map((q, i) => ({ ...q, photo: photos[i] }))

  return (
    <RevealSection className="px-6 py-20 border-t border-line">
      <div className="max-w-6xl mx-auto">
        <Eyebrow>{t.testimonials.eyebrow}</Eyebrow>
        <div className="grid sm:grid-cols-2 gap-6 mt-10">
          {quotes.map((q, i) => (
            <motion.div
              key={q.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-7 rounded-2xl border border-line bg-surface2/40"
            >
              <Quote className="w-5 h-5 text-violet-soft/70" strokeWidth={1.5} />
              <p className="text-text text-[15px] leading-relaxed mt-4">{q.text}</p>
              <div className="flex items-center gap-3 mt-5 pt-4 border-t border-line/70">
                <img
                  src={q.photo}
                  alt={q.name}
                  className="w-10 h-10 rounded-full object-cover border border-line"
                  loading="lazy"
                />
                <div>
                  <p className="font-display text-sm font-medium">{q.name}</p>
                  <p className="font-mono text-xs text-muted2 mt-0.5">
                    {q.role} · {q.context}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </RevealSection>
  )
}

/* Trust bar — styled as a real logo wall (bordered chips, grayscale→color
   on hover) rather than plain inline text. Swap in real logo files by
   passing a `logo` (image src) per entry — see README for instructions.
   Kept as styled wordmarks for now: reproducing official trademarked
   logos (especially institutional ones) requires the client's explicit
   authorization to use them commercially. */
function TrustLogos({ t }) {
  const logos = [
    { name: 'PriceBee', note: 'racheté par XBE' },
    { name: 'Notice' },
    { name: 'Octolo' },
    { name: 'La Poste' },
    { name: "Ministère de l'Éducation nationale" },
  ]
  const track = [...logos, ...logos]

  return (
    <RevealSection className="py-16 border-t border-line overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="font-mono text-xs tracking-widest uppercase text-muted2">
          {t.trustLogos.title}
        </p>
      </div>
      <div className="relative mt-8 group [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max gap-3.5 animate-marquee group-hover:[animation-play-state:paused]">
          {track.map((l, i) => (
            <div
              key={`${l.name}-${i}`}
              className="flex items-center justify-center px-6 py-4 rounded-xl border border-line bg-surface2/40 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 hover:border-violet/40 transition-all min-w-[140px] shrink-0"
            >
              <span className="font-display text-base text-text whitespace-nowrap">{l.name}</span>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  )
}

function FinalCTA({ t }) {
  return (
    <RevealSection id="contact" className="px-6 py-28 border-t border-line relative overflow-hidden">
      <div className="absolute inset-0 bg-grad-radial pointer-events-none" />
      <div className="max-w-3xl mx-auto text-center relative">
        <Eyebrow>{t.finalCta.eyebrow}</Eyebrow>
        <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl mt-5 leading-tight">
          {t.finalCta.title}
        </h2>
        <p className="text-muted text-lg mt-6 max-w-xl mx-auto leading-relaxed">
          {t.finalCta.text}
        </p>
        <a
          href="https://calendly.com/busshidev/meeting"
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue to-violet text-white font-medium px-7 py-4 rounded-full hover:opacity-90 transition-opacity mt-9"
        >
          {t.finalCta.cta}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </RevealSection>
  )
}

function Footer() {
  return (
    <footer className="px-6 py-10 border-t border-line">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted2">
        <span className="font-mono">
          <span className="text-gradient">agentic-factory</span>
        </span>
        <div className="flex items-center gap-6">
          <a href="https://www.linkedin.com/in/alexandre-dubar" target="_blank" rel="noreferrer" className="hover:text-text transition-colors">
            LinkedIn
          </a>
          <a href="mailto:contact@agentic-factory.fr" className="hover:text-text transition-colors">
            contact@agentic-factory.fr
          </a>
        </div>
      </div>
    </footer>
  )
}

/* One full render of the site for a given locale. Both /fr and /en mount
   this same component with a different `lang`, so the whole page — copy,
   scene labels, <html lang>, canonical — switches together. */
function Site({ lang }) {
  const t = getT(lang)

  useEffect(() => {
    document.documentElement.lang = lang

    // canonical + og:url should reflect whichever locale is actually being
    // viewed, not always the French default
    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) canonical.setAttribute('href', `https://agentic-factory.fr/${lang}`)
    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) ogUrl.setAttribute('content', `https://agentic-factory.fr/${lang}`)
    const ogLocale = document.querySelector('meta[property="og:locale"]')
    if (ogLocale) ogLocale.setAttribute('content', lang === 'fr' ? 'fr_FR' : 'en_US')
  }, [lang])

  return (
    <div className="min-h-screen">
      <Nav lang={lang} t={t} />
      <Hero lang={lang} t={t} />
      <Problem t={t} />
      <ValueProp t={t} />
      <UseCases lang={lang} t={t} />
      <Credibility t={t} />
      <Testimonials t={t} />
      <TrustLogos t={t} />
      <FinalCTA t={t} />
      <Footer />
    </div>
  )
}

/* Detects the browser's language on first load and sends the person to
   /fr or /en accordingly. Only used at the bare "/" — once someone is on
   a locale URL, that URL is the source of truth (no further redirects),
   so a shared link always shows what the sender intended. */
function LanguageRedirect() {
  const browserLang = typeof navigator !== 'undefined' ? navigator.language : 'fr'
  const target = browserLang.toLowerCase().startsWith('fr') ? '/fr' : '/en'
  return <Navigate to={target} replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LanguageRedirect />} />
      <Route path="/fr" element={<Site lang="fr" />} />
      <Route path="/en" element={<Site lang="en" />} />
      <Route path="*" element={<LanguageRedirect />} />
    </Routes>
  )
}
