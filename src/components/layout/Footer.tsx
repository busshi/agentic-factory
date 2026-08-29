import { Linkedin, Mail } from 'lucide-react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import type { Lang, Translation } from '../../i18n'
import busshidevLogo from '../../assets/brand/busshidev-logo.webp'

interface FooterProps {
  lang: Lang
  t: Translation
}

export function Footer({ lang, t }: FooterProps) {
  const mentionsPath = lang === 'fr' ? '/fr/mentions-legales' : '/en/legal-notice'
  const cguPath = lang === 'fr' ? '/fr/cgu' : '/en/terms'
  const location = useLocation()
  const homePath = `/${lang}`
  const isHome = location.pathname === homePath

  return (
    <footer className="px-6 py-10 border-t border-line">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted2">
        <RouterLink
          to={homePath}
          onClick={(e) => {
            if (isHome) {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
          className="font-mono cursor-pointer hover:opacity-80 transition-opacity"
        >
          <span className="text-gradient">agentic-factory.fr</span>
        </RouterLink>
        <div className="flex items-center gap-5">
          <a
            href="https://www.linkedin.com/in/alexandre-dubar"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="hover:text-text transition-colors cursor-pointer -m-2 p-2"
          >
            <Linkedin className="w-[18px] h-[18px]" strokeWidth={1.6} />
          </a>
          <a
            href="mailto:contact@agentic-factory.fr"
            aria-label="Email"
            className="hover:text-text transition-colors cursor-pointer -m-2 p-2"
          >
            <Mail className="w-[18px] h-[18px]" strokeWidth={1.6} />
          </a>
        </div>
      </div>
      {/* Same gap (gap-6, matching the mt-6 above) between every block here
          — the two dividers each get equal space above and below them,
          rather than the tighter/looser mix of a couple different spacing
          values. */}
      <div className="max-w-6xl mx-auto mt-6 flex flex-col items-center gap-6">
        <div className="w-10 h-px bg-line/60" />
        <a
          href="https://busshidev.fr"
          target="_blank"
          rel="noreferrer"
          className="group flex flex-col items-center gap-2 cursor-pointer"
        >
          {/* text-muted (not text-muted2) at full opacity — text-muted2
              falls below the 4.5:1 contrast ratio required for small text
              on bg-bg, and dimming it further with opacity made it worse.
              The logo below is decorative, so it can stay dimmed. */}
          <span className="font-mono text-xs text-muted group-hover:text-text transition-colors">{t.footer.byBusshidev}</span>
          {/* The source file is a black logo on transparent background — inverted
              to white so it reads on the dark theme's near-black background, but
              only in dark mode: in light mode the logo is already dark-on-light,
              so inverting it there would turn it white-on-white (invisible). */}
          <img
            src={busshidevLogo}
            alt="BusshiDev"
            className="h-9 w-auto dark:invert opacity-50 group-hover:opacity-90 transition-opacity"
          />
        </a>
        <div className="w-10 h-px bg-line/60" />
        <div className="flex items-center gap-3 font-mono text-xs text-muted2">
          <RouterLink to={mentionsPath} className="hover:text-text transition-colors cursor-pointer">
            {t.footer.legalMentions}
          </RouterLink>
          {/* text-muted2 (not text-line) — the hairline divider color reads
              as basically invisible at this small size, so the separator
              didn't register as one. Same color as the links around it. */}
          <span className="text-muted2">·</span>
          <RouterLink to={cguPath} className="hover:text-text transition-colors cursor-pointer">
            {t.footer.legalCgu}
          </RouterLink>
        </div>
      </div>
    </footer>
  )
}
