import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import type { RouteRecord } from 'vite-react-ssg'
import { Site } from './components/layout/Site'
import { MentionsLegales } from './pages/MentionsLegales'
import { CGU } from './pages/CGU'
import { getT } from './i18n'

/* Detects the browser's language on first load and sends the person to
   /fr or /en accordingly. Only used at the bare "/" — once someone is on
   a locale URL, that URL is the source of truth (no further redirects),
   so a shared link always shows what the sender intended. Redirects must
   happen client-side (in an effect) rather than via <Navigate> at render
   time, so the prerendered "/" page still resolves to real, crawlable
   HTML during the SSG build — carrying French metadata as a sensible
   static fallback for anyone/anything that sees it before the redirect
   fires. */
function LanguageRedirect() {
  const navigate = useNavigate()
  const t = getT('fr')

  useEffect(() => {
    const browserLang = typeof navigator !== 'undefined' ? navigator.language : 'fr'
    const target = browserLang.toLowerCase().startsWith('fr') ? '/fr' : '/en'
    navigate(target, { replace: true })
  }, [navigate])

  return (
    <Head>
      <html lang="fr" />
      <title>{t.meta.title}</title>
      <meta name="description" content={t.meta.description} />
      <link rel="canonical" href="https://agentic-factory.fr/" />
      <meta name="robots" content="index, follow" />
    </Head>
  )
}

export const routes: RouteRecord[] = [
  { path: '/', element: <LanguageRedirect /> },
  { path: '/fr', element: <Site lang="fr" /> },
  { path: '/en', element: <Site lang="en" /> },
  { path: '/fr/mentions-legales', element: <MentionsLegales lang="fr" /> },
  { path: '/en/legal-notice', element: <MentionsLegales lang="en" /> },
  { path: '/fr/cgu', element: <CGU lang="fr" /> },
  { path: '/en/terms', element: <CGU lang="en" /> },
  { path: '*', element: <LanguageRedirect /> },
]
