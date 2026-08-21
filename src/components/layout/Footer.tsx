import { Linkedin, Mail } from 'lucide-react'
import type { Translation } from '../../i18n'
import busshidevLogo from '../../assets/brand/busshidev-logo.png'

export function Footer({ t }: { t: Translation }) {
  return (
    <footer className="px-6 py-10 border-t border-line">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted2">
        <a href="#top" className="font-mono cursor-pointer hover:opacity-80 transition-opacity">
          <span className="text-gradient">agentic-factory.fr</span>
        </a>
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
      <div className="max-w-6xl mx-auto mt-6 flex flex-col items-center gap-4">
        <div className="w-10 h-px bg-line/60" />
        <a
          href="https://busshidev.fr"
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center gap-2 opacity-50 hover:opacity-90 transition-opacity cursor-pointer"
        >
          <span className="font-mono text-xs text-muted2">{t.footer.byBusshidev}</span>
          <img
            src={busshidevLogo}
            alt="BusshiDev"
            className="h-9 w-auto invert"
          />
        </a>
      </div>
    </footer>
  )
}
