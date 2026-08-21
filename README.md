# agentic-factory — Site vitrine

Site vitrine React (Vite + Tailwind + Framer Motion + React Router) pour
agentic-factory, disponible en français et en anglais.

## Installation

```bash
npm install
npm run dev
```

Le site sera disponible sur http://localhost:5173 — la racine `/` redirige
automatiquement vers `/fr` ou `/en` selon la langue du navigateur.

## Build de production

```bash
npm run build
npm run preview
```

## Structure

- `src/App.jsx` — toutes les sections du site (Hero, Problème, Proposition de
  valeur, Cas d'usage, Crédibilité, Témoignages, Logos clients, CTA final) +
  le routing (`/`, `/fr`, `/en`)
- `src/i18n.jsx` — dictionnaire de traduction FR/EN pour tout le texte du
  site (nav, hero, sections, CTA). C'est le seul fichier à modifier pour
  corriger ou enrichir une traduction de contenu "de page".
- `src/assets/testimonials/` — photos de témoignants
- `tailwind.config.js` — la palette de couleurs (noir + dégradé bleu/violet),
  les polices (Space Grotesk / Inter / JetBrains Mono) et les animations
  (dont le marquee de la section logos)
- `src/index.css` — styles globaux, effet de grain, respect de
  `prefers-reduced-motion`
- `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt` — SEO et GEO
  (voir section dédiée ci-dessous)
- `public/_redirects` (Netlify) et `vercel.json` (Vercel) — nécessaires pour
  que `/fr` et `/en` fonctionnent au rechargement direct (voir section
  Déploiement)

## Internationalisation (FR / EN)

- `/` détecte `navigator.language` et redirige vers `/fr` ou `/en`.
- Une fois sur une URL de langue, celle-ci fait foi — pas de redirection
  automatique supplémentaire, donc un lien partagé affiche toujours la
  langue prévue par l'expéditeur.
- Le sélecteur de langue dans la nav (FR/EN) bascule manuellement.
- Le texte des animations (labels courts, questions qui tournent) est aussi
  traduit — chaque composant `Scene*` accepte une prop `lang`.
- Les témoignages LinkedIn sont traduits en anglais sur `/en` (traduction
  fidèle du sens, pas une citation alternative

### Limite SEO importante à connaître

Ce site est une SPA (rendu côté client, pas de SSR/prerendering). Les
balises `<title>`, `canonical`, `og:*` par langue sont mises à jour en JS
une fois la page chargée (`useEffect` dans le composant `Site`). Pour un
navigateur ou un crawler qui exécute le JavaScript (Googlebot le fait), ça
fonctionne. Mais pour un crawler qui ne l'exécute pas, ou un aperçu de lien
généré sans exécution JS, le HTML brut servi est toujours celui
d'`index.html` (contenu français par défaut) — donc `/en` pourrait
apparaître avec des métadonnées françaises dans ces cas précis.

Pour un SEO international irréprochable, l'étape suivante serait du
prerendering ou du SSR par route (ex. `vite-plugin-ssr`, Next.js, ou un
service de prerendering comme Prerender.io).

## SEO / GEO

- **Balises classiques** : title, meta description, canonical, Open Graph et
  Twitter Card sont dans `index.html` (valeurs par défaut FR), puis ajustées
  par route via JS (voir limite ci-dessus).
- **hreflang** : alternates `fr`/`en`/`x-default` déclarés dans
  `index.html` et dans `sitemap.xml`.
- **`og-image.png`** : référencée dans les balises Open Graph/Twitter mais le
  fichier n'existe pas encore — génère un visuel de partage (1200×630px) et
  dépose-le dans `public/og-image.png` avant mise en ligne.
- **Données structurées** : un bloc JSON-LD `ProfessionalService` (bilingue
  via `availableLanguage`) dans `index.html`.
- **`llms.txt`** : résumé en clair de l'activité pour les moteurs IA — encore
  en français uniquement, à dupliquer en anglais si tu veux couvrir GEO pour
  les deux langues.
- **`sitemap.xml`** / **`robots.txt`** : couvrent `/fr` et `/en`.

## À faire avant mise en ligne

- **`og-image.png`** : à créer, voir section SEO/GEO ci-dessus.
- **CTA de contact** : pointe vers https://calendly.com/busshidev/meeting
  (Hero, Nav, CTA final).
- **Déploiement** : le projet est prêt pour Vercel ou Netlify après
  `npm run build` (dossier `dist/`). Le fichier `_redirects` (Netlify) ou
  `vercel.json` (Vercel) est indispensable pour que `/fr` et `/en`
  fonctionnent au rechargement direct plutôt que de renvoyer une 404 — sur
  un autre hébergeur statique, configure une règle équivalente ("toute
  route sert index.html").

