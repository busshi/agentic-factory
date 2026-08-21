import { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import type { Lang, Translation } from '../../i18n'

interface NavProps {
  lang: Lang
  t: Translation
}

export function Nav({ lang, t }: NavProps) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const otherLang: Lang = lang === 'fr' ? 'en' : 'fr'

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-bg/80 backdrop-blur-md border-b border-line' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2">
        <a
          href="#top"
          className="font-display font-semibold text-lg sm:text-2xl tracking-tight flex items-center gap-1.5 sm:gap-2.5 cursor-pointer -my-3 py-3 sm:-my-4 sm:py-4 -ml-4 pl-4 sm:-ml-6 sm:pl-6 pr-2 shrink-0"
        >
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gradient-to-r from-blue to-violet shrink-0" />
          <span className="text-gradient whitespace-nowrap">agentic-factory.fr</span>
        </a>
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <RouterLink
            to={`/${otherLang}`}
            className="relative font-mono text-xs text-muted2 hover:text-text transition-colors cursor-pointer -my-3 py-3 sm:-my-4 sm:py-4 -mx-1 px-1 sm:-mx-2 sm:px-2"
            aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
          >
            {otherLang.toUpperCase()}
          </RouterLink>
          <a
            href="https://calendly.com/busshidev/meeting"
            target="_blank"
            rel="noreferrer"
            className="relative whitespace-nowrap font-mono text-[11px] sm:text-xs tracking-wide px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-line hover:border-violet/60 transition-colors cursor-pointer before:content-[''] before:absolute before:-inset-y-4 before:inset-x-0"
          >
            {t.nav.cta}
          </a>
        </div>
      </div>
    </header>
  )
}
