import type { SceneProps } from './types'

export function SceneMonitoring({ lang = 'fr' }: SceneProps) {
  const s = {
    fr: { signaux: 'signaux', alerte: 'alerte', prevenue: 'équipe prévenue', latence: 'latence', erreurs: 'erreurs', trafic: 'trafic' },
    en: { signaux: 'signals', alerte: 'alert', prevenue: 'team notified', latence: 'latency', erreurs: 'errors', trafic: 'traffic' },
  }[lang]
  const signals = [
    { y: 40, color: 'rgb(var(--color-blue-soft))', label: s.latence },
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
        <text x="42" y="16" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="rgb(var(--color-muted2))" textAnchor="middle">{s.signaux}</text>
        <text x="330" y="16" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="rgb(var(--color-muted2))" textAnchor="middle">{s.alerte}</text>

        {/* multiple colored metric sources, each a tiny sparkline, all
            feeding into the agent — it's the one that decides which
            signal actually deserves a response */}
        {signals.map((sig, i) => {
          const path = `M 46 ${sig.y} C 80 ${sig.y}, 100 100, 125 100`
          return (
            <g key={i}>
              <path d={`M -10 4 L -3 -4 L 3 2 L 10 -5`} transform={`translate(30 ${sig.y})`} stroke={sig.color} strokeWidth="1.4" fill="none" opacity="0.85" />
              <path d={path} stroke="rgb(var(--color-surface2))" strokeWidth="1.1" fill="none" />
              {/* opacity="0" as a static base, not just the animate's first
                  keyframe — before `begin` elapses, the animate hasn't
                  taken effect yet and the circle would otherwise sit fully
                  visible at the SVG's default (0,0) origin. */}
              <circle opacity="0" r="2.6" fill={sig.color} filter="url(#sceneGlow3)">
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
          <rect x="-12" y="-12" width="24" height="24" rx="6" fill="rgb(var(--color-surface))" stroke="url(#sceneGrad6)" strokeWidth="1.4" />
          {[-6, -1, 4].map((x, i) => (
            <rect key={i} x={x} y="-5" width="2" height="10" rx="1" fill="rgb(var(--color-violet-soft))">
              <animate attributeName="opacity" values="0.2;1;0.2" dur="1s" begin={`${i * 0.18}s`} repeatCount="indefinite" />
            </rect>
          ))}
        </g>

        {/* rail from chip to the chosen response */}
        <path d="M 166 100 C 168 100, 168 105, 168 105" stroke="rgb(var(--color-line))" strokeWidth="1.25" fill="none" />

        {/* the response the agent picked — waveform with the one real
            anomaly, escalated */}
        <path d={wave} stroke="url(#sceneGrad6)" strokeWidth="1.6" fill="none" opacity="0.8" />

        <circle cx="245" cy="65" r="4" fill="#F87171" filter="url(#sceneGlow3)">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="1.2s" repeatCount="indefinite" />
        </circle>

        <path d="M 249 65 C 280 48, 300 48, 320 74" stroke="rgb(var(--color-line))" strokeWidth="1.25" fill="none" />
        <circle opacity="0" r="2.6" fill="#F87171">
          <animateMotion dur="1.6s" repeatCount="indefinite" path="M 249 65 C 280 48, 300 48, 320 74" />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.9;1" dur="1.6s" repeatCount="indefinite" />
        </circle>

        {/* bell + alert card */}
        <g transform="translate(320 100)">
          <circle r="26" fill="none" stroke="url(#sceneGrad6)" strokeWidth="1.2" strokeDasharray="2 6" opacity="0.5">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="5s" repeatCount="indefinite" />
          </circle>
          <rect x="-16" y="-16" width="32" height="32" rx="9" fill="rgb(var(--color-surface))" stroke="url(#sceneGrad6)" strokeWidth="1.4" />
          <path d="M -6 -6 q 6 -8 12 0 q 0 8 3 10 h -18 q 3 -2 3 -10" fill="none" stroke="#F87171" strokeWidth="1.4" strokeLinejoin="round" />
        </g>
        <text x="320" y="150" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="rgb(var(--color-muted2))" textAnchor="middle">
          {s.prevenue}
        </text>
      </g>
    </svg>
  )
}
