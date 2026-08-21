import type { SceneProps } from './types'

export function SceneEmailSort({ lang = 'fr' }: SceneProps) {
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
