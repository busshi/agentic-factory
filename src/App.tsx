import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import type { RouteRecord } from 'vite-react-ssg'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Site } from './components/layout/Site'
import { MentionsLegales } from './pages/MentionsLegales'
import { CGU } from './pages/CGU'

/* Root layout every route mounts under. Its only job is to keep
   <Analytics/>/<SpeedInsights/> alive as single, persistent instances
   across client-side navigation — both are guarded for the server (they
   only touch `window` inside an effect), so they're a no-op during the
   SSG build. */
function RootLayout() {
  return (
    <>
      <Outlet />
      <Analytics />
      <SpeedInsights />
    </>
  )
}

/* Detects the browser's language on first load and sends the person to
   /fr or /en accordingly. Only used at the bare "/" — once someone is on
   a locale URL, that URL is the source of truth (no further redirects),
   so a shared link always shows what the sender intended. Redirects must
   happen client-side (in an effect) rather than via <Navigate> at render
   time, so the prerendered "/" page still resolves to real, crawlable
   HTML during the SSG build.

   Rendering <Site lang="fr" /> as the actual content (instead of nothing)
   means a crawler or JS-less agent hitting the bare domain sees the real
   page — heading, copy, everything — rather than an empty shell; a
   real browser only sees it for the instant before the redirect fires.
   Site's own <Head> sets canonical to /fr, so this is explicitly a
   mirror of /fr rather than competing with it for indexing. */
function LanguageRedirect() {
  const navigate = useNavigate()

  useEffect(() => {
    const browserLang = typeof navigator !== 'undefined' ? navigator.language : 'fr'
    const target = browserLang.toLowerCase().startsWith('fr') ? '/fr' : '/en'
    navigate(target, { replace: true })
  }, [navigate])

  return <Site lang="fr" />
}

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <LanguageRedirect /> },
      { path: 'fr', element: <Site lang="fr" /> },
      { path: 'en', element: <Site lang="en" /> },
      { path: 'fr/mentions-legales', element: <MentionsLegales lang="fr" /> },
      { path: 'en/legal-notice', element: <MentionsLegales lang="en" /> },
      { path: 'fr/cgu', element: <CGU lang="fr" /> },
      { path: 'en/terms', element: <CGU lang="en" /> },
      { path: '*', element: <LanguageRedirect /> },
    ],
  },
]
