import { Head } from 'vite-react-ssg'
import type { Lang } from '../../i18n'

// Legal pages set their own <title>, canonical, and robots=noindex (they
// shouldn't be indexed or show up with the marketing page's metadata).
// <Head> bakes these into the prerendered HTML per route at build time.
export function LegalMeta({
  pageTitle,
  canonicalPath,
  lang,
}: {
  pageTitle: string
  canonicalPath: string
  lang: Lang
}) {
  return (
    <Head>
      <html lang={lang} />
      <title>{pageTitle}</title>
      <link rel="canonical" href={`https://agentic-factory.fr${canonicalPath}`} />
      <meta name="robots" content="noindex, follow" />
    </Head>
  )
}
