# agentic-factory.fr — Marketing site

React marketing site (Vite + TypeScript + Tailwind + Framer Motion + React
Router) for agentic-factory.fr, available in French and English.

## Getting started

```bash
npm install
npm run dev
```

The site runs at http://localhost:5173 — the root `/` redirects
automatically to `/fr` or `/en` based on the browser's language.

## Production build

```bash
npm run build   # runs a type-check (tsc --noEmit) before building
npm run preview
```

Other useful scripts:

```bash
npm run type-check   # tsc --noEmit only, no build
```

## Project structure

- `src/App.tsx` — routing only (`/`, `/fr`, `/en`); the page itself is
  rendered by `src/components/layout/Site.tsx`
- `src/components/` — one component per file, in TypeScript:
  - `layout/` — `Site`, `Nav`, `Footer` (the page shell)
  - `sections/` — each section of the site (Hero, Problem, ValueProp,
    UseCases + CategoryCarousel, Credibility, Testimonials, TrustLogos,
    FinalCTA)
  - `scenes/` — the 8 SVG animations shown in the "use cases" stage panel
    (one per case)
  - `ui/` — small shared elements (`Eyebrow`, `RevealSection`)
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
- `public/_redirects` (Netlify) and `vercel.json` (Vercel) — needed for
  `/fr` and `/en` to work on a direct page reload (see Deployment section)

## Internationalization (FR / EN)

- `/` detects `navigator.language` and redirects to `/fr` or `/en`.
- Once on a locale URL, that URL is authoritative — no further automatic
  redirect, so a shared link always shows the language the sender intended.
- The FR/EN switcher in the nav toggles manually.
- Animation text (short labels, rotating questions) is translated too —
  each `Scene*` component takes a `lang` prop.

### A known SEO limitation

This site is a client-rendered SPA (no SSR/prerendering). The `<title>`,
`canonical`, and `og:*` tags are updated per-locale in JS once the page has
loaded (a `useEffect` in the `Site` component). This works fine for a
browser or a crawler that executes JavaScript (Googlebot does). For a
crawler that doesn't, or a link preview generated without JS execution,
the raw HTML served is always `index.html`'s default (French) content —
so `/en` can show up with French metadata in those specific cases.

For airtight international SEO, the next step would be per-route
prerendering or SSR (e.g. `vite-plugin-ssr`, Next.js, or a prerendering
service like Prerender.io). That's a bigger architectural change and isn't
in place here.

## SEO / GEO

- **Standard tags**: title, meta description, canonical, Open Graph, and
  Twitter Card live in `index.html` (French defaults), then get adjusted
  per route via JS (see the limitation above).
- **hreflang**: `fr`/`en`/`x-default` alternates declared in `index.html`
  and in `sitemap.xml`.
- **`og-image.png` / `og-image-en.png`**: social share images (1200×630px)
  in `public/`, generated from the site's own design system (background,
  grid, blue/violet gradient, wordmark) — one per locale, swapped via the
  same per-route JS as the other `og:*` tags.
- **Structured data**: a `ProfessionalService` JSON-LD block (bilingual via
  `availableLanguage`) in `index.html`.
- **`llms.txt`**: a plain-text summary of the site for AI/LLM crawlers,
  following the [llms.txt](https://llmstxt.org/) convention — a short
  description followed by link sections.
- **`sitemap.xml`** / **`robots.txt`**: cover `/fr` and `/en`.
- These tags establish a clean technical baseline; actual ranking still
  depends on ongoing content and backlinks.

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

The project builds to a static `dist/` folder (`npm run build`) and is
ready for Vercel or Netlify. The `_redirects` file (Netlify) or
`vercel.json` (Vercel) is required for `/fr` and `/en` to work on a direct
reload instead of returning a 404 — on another static host, configure an
equivalent "serve index.html for every route" rule.
