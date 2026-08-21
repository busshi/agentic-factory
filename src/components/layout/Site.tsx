import { useEffect } from 'react'
import { getT, type Lang } from '../../i18n'
import { Nav } from './Nav'
import { Footer } from './Footer'
import { Hero } from '../sections/Hero'
import { Problem } from '../sections/Problem'
import { ValueProp } from '../sections/ValueProp'
import { UseCases } from '../sections/UseCases'
import { Credibility } from '../sections/Credibility'
import { Testimonials } from '../sections/Testimonials'
import { TrustLogos } from '../sections/TrustLogos'
import { FinalCTA } from '../sections/FinalCTA'

/* One full render of the site for a given locale. Both /fr and /en mount
   this same component with a different `lang`, so the whole page — copy,
   scene labels, <html lang>, canonical — switches together. */
export function Site({ lang }: { lang: Lang }) {
  const t = getT(lang)

  useEffect(() => {
    document.documentElement.lang = lang

    // canonical + og:url should reflect whichever locale is actually being
    // viewed, not always the French default
    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) canonical.setAttribute('href', `https://agentic-factory.fr/${lang}`)
    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) ogUrl.setAttribute('content', `https://agentic-factory.fr/${lang}`)
    const ogLocale = document.querySelector('meta[property="og:locale"]')
    if (ogLocale) ogLocale.setAttribute('content', lang === 'fr' ? 'fr_FR' : 'en_US')

    const ogImageUrl = `https://agentic-factory.fr/og-image${lang === 'en' ? '-en' : ''}.png`
    const ogImage = document.querySelector('meta[property="og:image"]')
    if (ogImage) ogImage.setAttribute('content', ogImageUrl)
    const twitterImage = document.querySelector('meta[name="twitter:image"]')
    if (twitterImage) twitterImage.setAttribute('content', ogImageUrl)
  }, [lang])

  return (
    <div className="min-h-screen">
      <Nav lang={lang} t={t} />
      <main>
        <Hero lang={lang} t={t} />
        <Problem t={t} />
        <ValueProp t={t} />
        <UseCases lang={lang} t={t} />
        <Credibility t={t} />
        <Testimonials t={t} />
        <TrustLogos t={t} />
        <FinalCTA t={t} />
      </main>
      <Footer t={t} />
    </div>
  )
}
