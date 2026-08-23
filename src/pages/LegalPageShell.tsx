import type { ReactNode } from 'react'
import { getT, type Lang } from '../i18n'
import { Nav } from '../components/layout/Nav'
import { Footer } from '../components/layout/Footer'

/* Same page shell as Site.tsx (Nav + Footer), reused for legal pages —
   those don't touch the og:image/canonical logic Site.tsx owns for the
   marketing page, so they don't render Site itself. */
export function LegalPageShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  const t = getT(lang)
  return (
    <div className="min-h-screen">
      <Nav lang={lang} t={t} />
      <main>{children}</main>
      <Footer lang={lang} t={t} />
    </div>
  )
}
