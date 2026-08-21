import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import type { Translation } from '../../i18n'
import { Eyebrow } from '../ui/Eyebrow'
import { RevealSection } from '../ui/RevealSection'
import quentinPhoto from '../../assets/testimonials/quentin-chantelot.jpeg'
import juliaPhoto from '../../assets/testimonials/julia-georgi.jpeg'

const PHOTOS = [quentinPhoto, juliaPhoto]

export function Testimonials({ t }: { t: Translation }) {
  const quotes = t.testimonials.quotes.map((q, i) => ({ ...q, photo: PHOTOS[i] ?? quentinPhoto }))

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
