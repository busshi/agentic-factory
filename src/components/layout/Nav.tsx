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
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#top" className="font-display font-semibold text-2xl tracking-tight flex items-center gap-2.5 cursor-pointer -my-4 py-4 -ml-6 pl-6 pr-2">
          <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue to-violet" />
          <span className="text-gradient">agentic-factory.fr</span>
        </a>
        <div className="flex items-center gap-4">
          <RouterLink
            to={`/${otherLang}`}
            className="relative font-mono text-xs text-muted2 hover:text-text transition-colors cursor-pointer -my-4 py-4 -mx-2 px-2"
            aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
          >
            {otherLang.toUpperCase()}
          </RouterLink>
          <a
            href="https://calendly.com/busshidev/meeting"
            target="_blank"
            rel="noreferrer"
            className="relative font-mono text-xs tracking-wide px-4 py-2 rounded-full border border-line hover:border-violet/60 transition-colors cursor-pointer before:content-[''] before:absolute before:-inset-y-4 before:inset-x-0"
          >
            {t.nav.cta}
          </a>
        </div>
      </div>
    </header>
  )
}
