import type { Translation } from '../../i18n'
import { Eyebrow } from '../ui/Eyebrow'
import { RevealSection } from '../ui/RevealSection'

export function Problem({ t }: { t: Translation }) {
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
