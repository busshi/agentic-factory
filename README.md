# agentic-factory.fr — Marketing site

React marketing site (Vite + TypeScript + Tailwind + Framer Motion + React
Router, statically prerendered via `vite-react-ssg`) for agentic-factory.fr,
available in French and English.

## Getting started

```bash
npm install
npm run dev
```

The site runs at http://localhost:5173 — the root `/` redirects
automatically to `/fr` or `/en` based on the browser's language.

## Production build

```bash
npm run build   # type-check (tsc --noEmit), then prerender every route to static HTML
npm run preview
```

Other useful scripts:

```bash
npm run type-check   # tsc --noEmit only, no build
```

## Project structure

- `src/App.tsx` — exports the `routes` array (`vite-react-ssg`'s
  `RouteRecord[]`) for `/`, `/fr`, `/en`, and the legal pages, plus the
  root layout (`<Analytics/>` + language-redirect logic)
- `src/main.tsx` — bootstraps the app via `ViteReactSSG`
- `src/components/` — one component per file, in TypeScript:
  - `layout/` — `Site`, `Nav`, `Footer` (the marketing page shell)
  - `sections/` — each section of the site (Hero, Problem, ValueProp,
    UseCases + CategoryCarousel, Credibility, Testimonials, TrustLogos,
    FinalCTA)
  - `scenes/` — the 8 SVG animations shown in the "use cases" stage panel
    (one per case)
  - `legal/` — shared layout (`LegalLayout`) and per-route `<Head>` tags
    (`LegalMeta`) for the legal pages
  - `ui/` — small shared elements (`Eyebrow`, `RevealSection`)
- `src/pages/` — `MentionsLegales` (legal notice) and `CGU` (terms of use),
  each rendered through `LegalPageShell` (same Nav/Footer as the marketing
  page)
- `src/i18n.tsx` — FR/EN translation dictionary for all page text (nav,
  hero, sections, CTAs), with a `Translation` type describing its exact
  shape. This is the only file to touch to fix or extend page copy.
- The project is TypeScript in strict mode (`tsconfig.json`, no `any`).
- `tailwind.config.js` — color palette (near-black + blue/violet gradient),
  fonts (Space Grotesk / Inter / JetBrains Mono), and animations (including
  the logo marquee)
- `src/index.css` — global styles, grain overlay, `prefers-reduced-motion`
  handling
- `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt` — SEO and
  GEO (see dedicated section below)
- `public/_redirects` (Netlify) and `vercel.json` (Vercel) — SPA fallback
  for any path that isn't one of the statically generated routes (see
  Deployment section)

## Internationalization (FR / EN)

- `/` detects `navigator.language` and redirects to `/fr` or `/en`; its
  prerendered HTML mirrors the French page (`canonical` points to `/fr`),
  so it still carries real content instead of an empty shell.
- Once on a locale URL, that URL is authoritative — no further automatic
  redirect, so a shared link always shows the language the sender intended.
- The FR/EN switcher in the nav toggles manually.
- Animation text (short labels, rotating questions) is translated too —
  each `Scene*` component takes a `lang` prop.

## Prerendering & SEO

Every route (`/`, `/fr`, `/en`, and the legal pages) is rendered to real,
static HTML at build time via `vite-react-ssg` — the raw HTML already
contains the actual page content (heading, copy, sections), not just an
empty `#root` div. React hydrates on top of it in the browser. This means
crawlers and AI agents that don't execute JavaScript still see the real
page, and social/link previews always get the correct per-locale metadata.

- **Per-route `<title>`, meta description, canonical, `robots`, and
  `og:*`/`twitter:*` tags**: set via `<Head>` (a React Helmet wrapper,
  from `vite-react-ssg`) in `Site.tsx` and `LegalMeta.tsx`, so they're
  correct in the prerendered HTML for each locale — not just applied
  client-side after the page loads.
- **hreflang**: `fr`/`en`/`x-default` alternates declared in `index.html`
  and in `sitemap.xml`.
- **`og-image.png` / `og-image-en.png`**: social share images (1200×630px)
  in `public/`, generated from the site's own design system (background,
  grid, blue/violet gradient, wordmark) — one per locale.
- **Structured data**: a `ProfessionalService` JSON-LD block (bilingual via
  `availableLanguage`) in `index.html`.
- **`llms.txt`**: a plain-text summary of the site for AI/LLM crawlers,
  following the [llms.txt](https://llmstxt.org/) convention — a short
  description followed by link sections.
- **`sitemap.xml`** / **`robots.txt`**: cover `/fr` and `/en`.
- These tags establish a clean technical baseline; actual ranking still
  depends on ongoing content and backlinks.

## Analytics

Page views and real-user performance are tracked via
[`@vercel/analytics`](https://vercel.com/docs/analytics) and
[`@vercel/speed-insights`](https://vercel.com/docs/speed-insights)
(`<Analytics/>` and `<SpeedInsights/>` mounted once in the root layout in
`src/App.tsx`). Both are a no-op outside of a Vercel deployment (locally,
or on another host, their scripts simply 404 harmlessly).

## Performance & accessibility notes

- Google Fonts is loaded non-blocking (`media="print"` swapped to `all` on
  load) so the third-party round-trip doesn't hold up first paint; text
  renders in the fallback font and swaps in via `font-display: swap`.
- Logo images are served as WebP, sized close to their actual on-page
  display size.
- Color tokens (`muted`, `muted2` in `tailwind.config.js`) are picked to
  clear a 4.5:1 contrast ratio against the page background.
- The page content is wrapped in a `<main>` landmark, with `Nav`/`Footer`
  as `<header>`/`<footer>`.

## Deployment

`npm run build` prerenders each route to its own static file (e.g.
`dist/fr/index.html`, `dist/fr/cgu/index.html`) — ready for Vercel or
Netlify. The `_redirects` file (Netlify) or `vercel.json` (Vercel) still
handles the fallback case (any path that isn't one of these known routes);
on another static host, configure an equivalent "serve index.html for
unmatched routes" rule.
