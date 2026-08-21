import { ArrowRight } from 'lucide-react'
import type { Translation } from '../../i18n'
import { Eyebrow } from '../ui/Eyebrow'
import { RevealSection } from '../ui/RevealSection'

export function FinalCTA({ t }: { t: Translation }) {
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
          className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue to-violet text-white font-medium px-7 py-4 rounded-full hover:opacity-90 transition-opacity mt-9 cursor-pointer"
        >
          {t.finalCta.cta}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </RevealSection>
  )
}
