import type { Lang } from '../i18n'

// Maps the current path to its equivalent in another language, so the
// nav's language switcher lands on the same page (not just the homepage)
// regardless of which route you're on.
export function localizedPath(pathname: string, targetLang: Lang): string {
  if (pathname === '/fr/mentions-legales' || pathname === '/en/legal-notice') {
    return targetLang === 'fr' ? '/fr/mentions-legales' : '/en/legal-notice'
  }
  if (pathname === '/fr/cgu' || pathname === '/en/terms') {
    return targetLang === 'fr' ? '/fr/cgu' : '/en/terms'
  }
  return `/${targetLang}`
}
