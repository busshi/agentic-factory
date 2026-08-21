import { motion } from 'framer-motion'
import { Terminal, Workflow, GitBranch, type LucideIcon } from 'lucide-react'
import type { Translation } from '../../i18n'
import { Eyebrow } from '../ui/Eyebrow'
import { RevealSection } from '../ui/RevealSection'

const ICONS: LucideIcon[] = [Terminal, Workflow, GitBranch]

export function ValueProp({ t }: { t: Translation }) {
  const points = t.valueProp.cards.map((c, i) => ({ ...c, icon: ICONS[i] ?? Terminal }))

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
