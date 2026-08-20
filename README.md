# agentic-factory

Site vitrine React (Vite + Tailwind + Framer Motion) pour agentic-factory.

## Installation

```bash
npm install
npm run dev
```

Le site sera disponible sur http://localhost:5173

## Build de production

```bash
npm run build
npm run preview
```

## SEO / GEO

- **Balises classiques** : title, meta description, canonical, Open Graph et
  Twitter Card sont dans `index.html`. Elles pointent vers
  `https://agentic-factory.fr/`
- **`og-image.png`** : référencée dans les balises Open Graph/Twitter mais le
  fichier n'existe pas encore — génère un visuel de partage (1200×630px) et
  dépose-le dans `public/og-image.png` avant mise en ligne, sinon les
  aperçus de lien (LinkedIn, etc.) n'afficheront pas d'image.
- **Données structurées** : un bloc JSON-LD `ProfessionalService` est inclus
  dans `index.html` pour aider moteurs classiques et IA à identifier
  l'activité, la zone couverte et l'offre.
- **`llms.txt`** : résumé en clair de l'activité pour les moteurs IA
  (ChatGPT, Perplexity, etc.) — norme émergente, gratuite à maintenir.
- **`sitemap.xml`** / **`robots.txt`** : basiques, adaptés à un site
  one-page. 
- **Fondations** : ces balises posent une base technique
  propre. Le classement effectif dépendra aussi de contenu publié dans la
  durée et de backlinks — pas de raccourci possible sur ce point.

