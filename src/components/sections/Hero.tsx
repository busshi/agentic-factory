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

  // Panel tilts in 3D toward the cursor — a spring keeps it smooth rather
  // than snapping straight to the pointer. Values are fractions (-0.5..0.5)
  // of the panel's own size, not raw pixels, so the tilt amount stays
  // consistent across panel sizes (mobile vs desktop). A wide range (±20°)
  // so the effect actually reads as 3D, not just a faint wobble.
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const springConfig = { stiffness: 120, damping: 14 }
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [20, -20]), springConfig)
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-20, 20]), springConfig)
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
        {/* initial={false}: the H1 is the page's LCP candidate — the
            prerendered HTML was shipping it at opacity:0 (Framer Motion's
            `initial` state gets baked into the SSR output), so it stayed
            invisible until JS hydrated and ran the fade-in. Skipping the
            mount animation lets it paint immediately instead. */}
        <motion.div initial={false}>
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
            Three nested layers so each animation stays independent: this
            outer one only handles the one-time fade/scale-in; the next one
            is a continuous idle float (so there's visible motion even
            before anyone touches the cursor — a tilt that only reacts to
            hover is invisible to someone who never happens to hover it
            exactly); the innermost owns the cursor-tracked 3D tilt itself. */}
        {/* initial={false}, same reason as the text block above — this
            panel is large enough to be the LCP candidate on some viewports,
            so it shouldn't sit at opacity:0 waiting on hydration either. */}
        <motion.div initial={false} className="mt-10 sm:mt-20">
          <motion.div
            animate={prefersReducedMotion ? undefined : { y: [0, -12, 0] }}
            transition={prefersReducedMotion ? undefined : { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div
              onMouseMove={handlePanelMouseMove}
              onMouseLeave={handlePanelMouseLeave}
              // Neon ring built from the site's own blue/violet tokens
              // (--color-blue #3B82F6, --color-violet #A855F7 — see
              // index.css), not invented colors: a crisp blue inner ring,
              // a violet outer ring just past it (the two read as one
              // blue-to-violet edge), then a blue bloom and a wider violet
              // bloom further out.
              whileHover={
                prefersReducedMotion
                  ? undefined
                  : {
                      boxShadow:
                        '0 0 0 2px rgba(59,130,246,0.95), 0 0 0 3.5px rgba(168,85,247,0.7), 0 0 50px 8px rgba(59,130,246,0.55), 0 0 100px 26px rgba(168,85,247,0.45), 0 30px 80px -20px rgba(96,88,246,0.35)',
                    }
              }
              transition={{ boxShadow: { duration: 0.8, ease: 'easeInOut' } }}
              style={{ rotateX, rotateY, transformPerspective: 1000, boxShadow: '0 30px 80px -20px rgba(96,88,246,0.35)' }}
              className="rounded-2xl border border-line bg-surface backdrop-blur-sm p-2 sm:p-8 h-[260px] sm:h-[340px] relative overflow-hidden [transform-style:preserve-3d]"
            >
              {/* same subtle top-centered glow as the use-cases stage panel
                  (UseCases.tsx), for a consistent look between the two */}
              <div className="absolute inset-0 bg-grad-radial pointer-events-none" />
              {/* initial={false} on the AnimatePresence itself: only skips
                  the very first scene's mount transition (so it's visible
                  immediately, same LCP reasoning as above) — later scene
                  changes on the 5s interval still get the full rotateY
                  flip, since those aren't in the critical path. */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={heroActive}
                  initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, rotateY: 65, scale: 0.85 }}
                  animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, rotateY: 0, scale: 1 }}
                  exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, rotateY: -65, scale: 0.85 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformPerspective: 1200 }}
                  className="absolute inset-2 sm:inset-5"
                >
                  <HeroScene lang={lang} />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
