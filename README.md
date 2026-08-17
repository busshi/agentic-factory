# AgenticFactory — Site vitrine

Site vitrine React (Vite + Tailwind + Framer Motion) pour AgenticFactory.

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

## Structure

- `src/App.jsx` — toutes les sections du site (Hero, Problème, Proposition de
  valeur, Cas d'usage, Crédibilité, Témoignages, Logos clients, CTA final)
- `src/assets/testimonials/` — photos de Quentin Chantelot et Julia Georgi
- `tailwind.config.js` — la palette de couleurs (noir + dégradé bleu/violet),
  les polices (Space Grotesk / Inter / JetBrains Mono) et les animations
  (dont le marquee de la section logos)
- `src/index.css` — styles globaux, effet de grain, respect de
  `prefers-reduced-motion`
- `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt` — SEO et GEO
  (voir section dédiée ci-dessous)

## SEO / GEO

- **Balises classiques** : title, meta description, canonical, Open Graph et
  Twitter Card sont dans `index.html`. Elles pointent vers
  `https://agentic-factory.fr/` — à corriger si le domaine final diffère.
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
  one-page. Le sitemap est à étoffer si tu ajoutes des pages (blog,
  cas clients détaillés) plus tard.
- **Fondations, pas garantie** : ces balises posent une base technique
  propre. Le classement effectif dépendra aussi de contenu publié dans la
  durée et de backlinks — pas de raccourci possible sur ce point.

## À faire avant mise en ligne

- **Logos clients** : affichés en "chips" stylées avec un défilement en
  marquee (grayscale → couleur au survol/pause) en attendant de vrais
  fichiers logo. Pour intégrer les logos officiels (PriceBee/XBE, Notice,
  Octolo, La Poste, Ministère de l'Éducation nationale), vérifie d'abord
  l'autorisation d'usage commercial — particulièrement sensible pour les
  logos institutionnels. Une fois les fichiers (SVG/PNG) en main, dépose-les
  dans `src/assets/logos/` et remplace le texte du composant `TrustLogos`
  par une balise `<img>`.
- **Nom de domaine** : le site utilise `agentic-factory.fr` partout (email,
  canonical, JSON-LD, Open Graph). `.ia` n'est pas encore une extension
  attribuable publiquement — si tu confirmes un autre domaine, un
  rechercher/remplacer global sur `agentic-factory.fr` suffit.
- **`og-image.png`** : à créer, voir section SEO/GEO ci-dessus.
- **CTA de contact** : pointe vers https://calendly.com/busshidev/meeting
  (Hero, Nav, CTA final).
- **Déploiement** : le projet est prêt pour Vercel, Netlify ou tout
  hébergeur statique après `npm run build` (dossier `dist/`).

## Note technique

Ce projet n'a pas pu être installé/buildé dans l'environnement de génération
(pas d'accès réseau côté sandbox). Le code a été relu attentivement mais
lance `npm install && npm run dev` en premier pour repérer une éventuelle
coquille avant d'aller plus loin.
