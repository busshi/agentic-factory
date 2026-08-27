import { Head } from 'vite-react-ssg'
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
   scene labels, <html lang>, canonical — switches together. <Head> bakes
   the per-locale metadata into the prerendered HTML at build time (not
   just after client hydration), so crawlers reading raw HTML see the
   correct title/description/canonical for whichever locale they fetched. */
export function Site({ lang }: { lang: Lang }) {
  const t = getT(lang)
  const url = `https://agentic-factory.fr/${lang}`
  const ogImage = `https://agentic-factory.fr/og-image${lang === 'en' ? '-en' : ''}.png`

  return (
    <div className="min-h-screen">
      <Head>
        <html lang={lang} />
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
        <link rel="canonical" href={url} />
        <meta name="robots" content="index, follow" />
        <meta property="og:url" content={url} />
        <meta property="og:locale" content={lang === 'fr' ? 'fr_FR' : 'en_US'} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:image" content={ogImage} />
      </Head>
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
      <Footer lang={lang} t={t} />
    </div>
  )
}
