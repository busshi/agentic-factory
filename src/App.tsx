import { Routes, Route, Navigate } from 'react-router-dom'
import { Site } from './components/layout/Site'

/* Detects the browser's language on first load and sends the person to
   /fr or /en accordingly. Only used at the bare "/" — once someone is on
   a locale URL, that URL is the source of truth (no further redirects),
   so a shared link always shows what the sender intended. */
function LanguageRedirect() {
  const browserLang = typeof navigator !== 'undefined' ? navigator.language : 'fr'
  const target = browserLang.toLowerCase().startsWith('fr') ? '/fr' : '/en'
  return <Navigate to={target} replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LanguageRedirect />} />
      <Route path="/fr" element={<Site lang="fr" />} />
      <Route path="/en" element={<Site lang="en" />} />
      <Route path="*" element={<LanguageRedirect />} />
    </Routes>
  )
}
