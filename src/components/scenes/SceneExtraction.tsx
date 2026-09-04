import type { SceneProps } from './types'

export function SceneExtraction({ lang = 'fr' }: SceneProps) {
  const s = {
    fr: { scanned: 'document scanné', structured: 'données structurées', client: 'client', montant: 'montant', date: 'date' },
    en: { scanned: 'scanned document', structured: 'structured data', client: 'client', montant: 'amount', date: 'date' },
  }[lang]

  const fields = [
    { label: s.client, value: 'SARL Dupont', y: 56 },
    { label: s.montant, value: '1 240 €', y: 88 },
    { label: s.date, value: '12/03', y: 120 },
  ]

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
        <text x="66" y="16" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="rgb(var(--color-muted2))" textAnchor="middle">{s.scanned}</text>
        <text x="310" y="16" fontFamily="JetBrains Mono, monospace" fontSize="11" fill="rgb(var(--color-muted2))" textAnchor="middle">{s.structured}</text>

        {/* scanned document, with a scan-line sweeping down it on loop */}
        <g transform="translate(50 100)">
          <rect x="-38" y="-56" width="76" height="112" rx="8" fill="rgb(var(--color-surface))" stroke="rgb(var(--color-line))" strokeWidth="1.5" />
          {[-38, -22, -6, 10, 26].map((y, i) => (
            <rect key={i} x="-26" y={y} width="52" height="4" rx="2" fill="rgb(var(--color-line))" />
          ))}
          <rect x="-38" y="-56" width="76" height="6" fill="url(#sceneGrad7)" opacity="0.8">
            <animate attributeName="y" values="-56;50;-56" dur="2.6s" repeatCount="indefinite" />
          </rect>
        </g>

        {/* rail to agent chip */}
        <path d="M 92 100 C 130 100, 150 100, 172 100" stroke="rgb(var(--color-line))" strokeWidth="1.25" fill="none" />
        <circle opacity="0" r="2.6" fill="rgb(var(--color-blue-soft))" filter="url(#sceneGlow4)">
          <animateMotion dur="1.5s" repeatCount="indefinite" path="M 92 100 C 130 100, 150 100, 172 100" />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.9;1" dur="1.5s" repeatCount="indefinite" />
        </circle>

        {/* mini agent chip */}
        <g transform="translate(190 100)">
          <circle r="30" fill="rgb(var(--color-violet))" opacity="0.15" />
          <circle r="21" fill="none" stroke="url(#sceneGrad7)" strokeWidth="1.1" strokeDasharray="2 6" opacity="0.55">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="3s" repeatCount="indefinite" />
          </circle>
          <rect x="-13" y="-13" width="26" height="26" rx="7" fill="rgb(var(--color-surface))" stroke="url(#sceneGrad7)" strokeWidth="1.4" />
          {[-6, -1, 4].map((x, i) => (
            <rect key={i} x={x} y="-5" width="2" height="10" rx="1" fill="rgb(var(--color-violet-soft))">
              <animate attributeName="opacity" values="0.2;1;0.2" dur="0.9s" begin={`${i * 0.15}s`} repeatCount="indefinite" />
            </rect>
          ))}
        </g>

        {/* rail to structured output */}
        <path d="M 208 100 C 240 100, 250 100, 262 100" stroke="rgb(var(--color-line))" strokeWidth="1.25" fill="none" />
        <circle opacity="0" r="2.6" fill="rgb(var(--color-violet-soft))">
          <animateMotion dur="1.5s" begin="0.75s" repeatCount="indefinite" path="M 208 100 C 240 100, 250 100, 262 100" />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.9;1" dur="1.5s" begin="0.75s" repeatCount="indefinite" />
        </circle>

        {/* structured fields appearing one by one */}
        {fields.map((f, i) => (
          <g key={i}>
            <rect x="262" y={f.y - 14} width="100" height="28" rx="6" fill="rgb(var(--color-surface2))" stroke="rgb(var(--color-line))" strokeWidth="1">
              <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.15;0.3;1" dur="3.2s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
            </rect>
            <text x="272" y={f.y - 2} fontFamily="JetBrains Mono, monospace" fontSize="8" fill="rgb(var(--color-muted2))">
              <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.15;0.3;1" dur="3.2s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
              {f.label}
            </text>
            <text x="272" y={f.y + 10} fontFamily="JetBrains Mono, monospace" fontSize="10" fill="rgb(var(--color-violet-soft))">
              <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.15;0.3;1" dur="3.2s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
              {f.value}
            </text>
          </g>
        ))}
      </g>
    </svg>
  )
}
