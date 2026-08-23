import { useEffect } from 'react'

// Legal pages set their own <title>, canonical, and robots=noindex
// (they shouldn't be indexed or show up with the marketing page's
// metadata) — and restore the previous values on unmount, since this is
// a client-routed SPA and navigating away doesn't reload index.html.
export function useLegalMeta(pageTitle: string, canonicalPath: string, htmlLang: string) {
  useEffect(() => {
    document.documentElement.lang = htmlLang
    const previousTitle = document.title
    document.title = pageTitle

    const canonical = document.querySelector('link[rel="canonical"]')
    const previousCanonical = canonical?.getAttribute('href') ?? null
    canonical?.setAttribute('href', `https://agentic-factory.fr${canonicalPath}`)

    const robots = document.querySelector('meta[name="robots"]')
    const previousRobots = robots?.getAttribute('content') ?? null
    robots?.setAttribute('content', 'noindex, follow')

    return () => {
      document.title = previousTitle
      if (previousCanonical) canonical?.setAttribute('href', previousCanonical)
      if (previousRobots) robots?.setAttribute('content', previousRobots)
    }
  }, [pageTitle, canonicalPath, htmlLang])
}
