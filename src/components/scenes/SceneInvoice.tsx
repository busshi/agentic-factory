import type { SceneProps } from './types'

export function SceneInvoice({ lang = 'fr' }: SceneProps) {
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
      <rect x="40" y="34" width="130" height="154" rx="10" fill="rgb(var(--color-surface))" stroke="rgb(var(--color-line))" strokeWidth="1.5" />
      <rect x="58" y="56" width="70" height="6" rx="3" fill="rgb(var(--color-muted2))" />
      <rect x="58" y="72" width="94" height="4" rx="2" fill="rgb(var(--color-line))" />
      <rect x="58" y="84" width="94" height="4" rx="2" fill="rgb(var(--color-line))" />
      <rect x="58" y="96" width="60" height="4" rx="2" fill="rgb(var(--color-line))" />
      <text x="122" y="157" fontFamily="JetBrains Mono, monospace" fontSize="12" fill="rgb(var(--color-violet-soft))" textAnchor="end">
        1 240 €
      </text>
      {/* status pill morphing */}
      <g>
        <rect x="52" y="112" width="76" height="18" rx="9" fill="none" stroke="url(#sceneGrad)" strokeWidth="1">
          <animate attributeName="opacity" values="1;1;0;0;1" keyTimes="0;0.35;0.4;0.95;1" dur="4s" repeatCount="indefinite" />
        </rect>
        <text x="90" y="124" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="rgb(var(--color-muted))" textAnchor="middle">
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
      <path d="M 170 100 C 220 100, 250 100, 300 100" stroke="rgb(var(--color-line))" strokeWidth="1.25" fill="none" />
      <circle opacity="0" r="2.6" fill="rgb(var(--color-violet-soft))">
        <animateMotion dur="2.4s" begin="1.2s" repeatCount="indefinite" path="M 170 100 C 220 100, 250 100, 300 100" />
        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.8;1" dur="2.4s" begin="1.2s" repeatCount="indefinite" />
      </circle>

      {/* envelope icon — gentle continuous 3D wobble (animate-tilt3d) on
          its own inner <g> with no position of its own, same split as the
          agent chip elsewhere: a CSS transform on the same <g> as a
          translate(...) attribute replaces it outright instead of
          combining with it. */}
      <g transform="translate(300 100)">
        <g className="[transform-box:fill-box] [transform-origin:center] animate-tilt3d">
          <rect x="-24" y="-17" width="48" height="34" rx="5" fill="rgb(var(--color-surface))" stroke="url(#sceneGrad)" strokeWidth="1.4" />
          <path d="M -24 -14 L 0 4 L 24 -14" stroke="url(#sceneGrad)" strokeWidth="1.2" fill="none" />
        </g>
      </g>
      <text x="300" y="150" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="rgb(var(--color-muted2))" textAnchor="middle">
        {s.sent}
      </text>
    </svg>
  )
}
