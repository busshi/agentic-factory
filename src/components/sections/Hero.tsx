import { useEffect, useState } from 'react'
import type { MouseEvent } from 'react'
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, ChevronRight } from 'lucide-react'
import type { Lang, Translation } from '../../i18n'
import { Eyebrow } from '../ui/Eyebrow'
import {
  SceneInvoice,
  SceneEmailSort,
  SceneAppointment,
  SceneSupport,
  SceneLeads,
  SceneMonitoring,
  SceneExtraction,
  SceneCompetitiveWatch,
} from '../scenes'

const HERO_SCENES = [
  SceneInvoice,
  SceneEmailSort,
  SceneAppointment,
  SceneSupport,
  SceneLeads,
  SceneMonitoring,
  SceneExtraction,
  SceneCompetitiveWatch,
]

interface HeroProps {
  lang: Lang
  t: Translation
}

export function Hero({ lang, t }: HeroProps) {
  const [heroActive, setHeroActive] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const id = setInterval(() => {
      setHeroActive((i) => (i + 1) % HERO_SCENES.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  const HeroScene = HERO_SCENES[heroActive] ?? SceneInvoice

  // Panel gently tilts in 3D toward the cursor — a spring keeps it smooth
  // rather than snapping straight to the pointer. Values are fractions
  // (-0.5..0.5) of the panel's own size, not raw pixels, so the tilt
  // amount stays consistent across panel sizes (mobile vs desktop).
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const springConfig = { stiffness: 150, damping: 20 }
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [8, -8]), springConfig)
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-8, 8]), springConfig)

  const handlePanelMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5)
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handlePanelMouseLeave = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

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
              className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue to-violet text-white font-medium px-6 py-3.5 rounded-full hover:opacity-90 transition-opacity cursor-pointer"
            >
              {t.hero.ctaPrimary}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
            <a
              href="#cas-usage"
              className="font-mono text-sm text-muted hover:text-text transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              {t.hero.ctaSecondary}
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>

        {/* The Scene* SVGs now reference the same theme tokens as the rest of
            the site (rgb(var(--color-*)) instead of hardcoded dark-only hex —
            see src/components/scenes/), so this panel can just use the normal
            surface/line tokens too instead of a forced dark background.
            rotateX/rotateY give it a gentle 3D tilt toward the cursor —
            transformPerspective sets up the perspective for this element
            specifically, no separate wrapper needed. Inert (springs stay at
            0) when the user prefers reduced motion. */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onMouseMove={handlePanelMouseMove}
          onMouseLeave={handlePanelMouseLeave}
          style={{ rotateX, rotateY, transformPerspective: 1000 }}
          className="mt-10 sm:mt-20 rounded-2xl border border-line bg-surface backdrop-blur-sm p-2 sm:p-8 h-[260px] sm:h-[340px] relative overflow-hidden [transform-style:preserve-3d]"
        >
          {/* same subtle top-centered glow as the use-cases stage panel
              (UseCases.tsx), for a consistent look between the two */}
          <div className="absolute inset-0 bg-grad-radial pointer-events-none" />
          <AnimatePresence mode="wait">
            <motion.div
              key={heroActive}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, rotateY: 40, scale: 0.94 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, rotateY: 0, scale: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, rotateY: -40, scale: 0.94 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformPerspective: 1200 }}
              className="absolute inset-2 sm:inset-5"
            >
              <HeroScene lang={lang} />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
