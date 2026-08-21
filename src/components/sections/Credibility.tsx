import { ChevronRight } from 'lucide-react'
import type { Translation } from '../../i18n'
import { Eyebrow } from '../ui/Eyebrow'
import { RevealSection } from '../ui/RevealSection'

const STACK = [
  'TypeScript', 'React / Next.js', 'NestJS', 'Node.js', 'Python / Django', 'GraphQL',
  'PostgreSQL', 'MongoDB', 'Docker', 'CI/CD', 'Camunda / BPMN',
]

export function Credibility({ t }: { t: Translation }) {
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
            className="inline-flex items-center gap-1.5 font-mono text-sm text-blue-soft hover:text-violet-soft transition-colors mt-6 cursor-pointer"
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
            {STACK.map((s) => (
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
