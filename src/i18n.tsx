// Central translation dictionary. Two locales: fr (default/canonical) and
// en. Threaded through every section and scene component via a `lang`
// prop — see src/App.tsx.

import type { ReactNode } from 'react'

export type Lang = 'fr' | 'en'

export interface CopyBlock {
  title: string
  text: string
}

export interface TestimonialQuote {
  text: string
  name: string
  role: string
  context: string
}

export interface Translation {
  meta: { htmlLang: string; title: string; description: string }
  nav: { cta: string }
  hero: {
    eyebrow: string
    titleA: string
    titleB: string
    subtitle: string
    ctaPrimary: string
    ctaSecondary: string
  }
  problem: {
    eyebrow: string
    title: ReactNode
    p1: string
    p2: string
  }
  valueProp: {
    eyebrow: string
    title: string
    cards: CopyBlock[]
  }
  useCases: {
    eyebrow: string
    title: string
    tagPME: string
    tagStartup: string
    cases: CopyBlock[]
  }
  credibility: {
    eyebrow: string
    title: string
    text: string
    linkedinCta: string
    statLabel: string
  }
  testimonials: {
    eyebrow: string
    quotes: TestimonialQuote[]
  }
  trustLogos: { title: string }
  finalCta: {
    eyebrow: string
    title: string
    text: string
    cta: string
  }
  footer: { byBusshidev: string; legalMentions: string; legalCgu: string }
}

export const translations: Record<Lang, Translation> = {
  fr: {
    meta: {
      htmlLang: 'fr',
      title: 'AgenticFactory — Agents IA sur-mesure pour PME et startups',
      description:
        'AgenticFactory conçoit des agents IA sur-mesure pour PME et startups : facturation, support client, qualification de leads. Audit gratuit.',
    },
    nav: {
      cta: 'Audit gratuit',
    },
    hero: {
      eyebrow: 'Agents IA',
      titleA: 'Vos tâches répétitives méritent mieux qu’un stagiaire.',
      titleB: 'Elles méritent un agent.',
      subtitle:
        'Des agents IA codés sur-mesure, branchés sur vos outils réels — pas des scénarios no-code qui lâchent au premier imprévu. Moins de tâches répétitives, plus de temps pour ce qui compte vraiment.',
      ctaPrimary: 'Réserver mon audit gratuit',
      ctaSecondary: "Voir les cas d'usage",
    },
    problem: {
      eyebrow: 'Le constat',
      title: (
        <>
          Vous savez que vous perdez du temps.
          <br />
          Vous n'avez juste personne pour le récupérer.
        </>
      ),
      p1: 'Le lundi matin, ce sont encore les mêmes relances à envoyer à la main, la même boîte mail à trier, le même reporting à refaire depuis zéro.',
      p2: "Ni la PME ni la startup de cinq personnes n'ont de développeur IA sous la main pour changer ça — la seconde est déjà occupée à faire tourner le produit. Pas faute de solution : faute de quelqu'un pour la construire.",
    },
    valueProp: {
      eyebrow: 'Ce qui change',
      title:
        "Configurer une automatisation, tout le monde sait faire. La coder pour qu'elle tienne dans vos vrais systèmes, c'est une autre affaire.",
      cards: [
        {
          title: 'Codé, pas juste configuré',
          text: "Chaque agent s'intègre à votre stack réelle — API, base de données, outils métier — là où un scénario no-code casse au premier cas particulier.",
        },
        {
          title: 'Un audit avant tout engagement',
          text: "On identifie ensemble le process qui vous coûte le plus de temps, avant de parler d'implémentation. Pas de vente d'automatisation dont vous n'avez pas besoin.",
        },
        {
          title: 'Pensé pour la prod, pas pour la démo',
          text: 'Front, back, infra : un agent qui tourne réellement en production, pas une démo qui impressionne en réunion puis reste dans les cartons.',
        },
      ],
    },
    useCases: {
      eyebrow: "Cas d'usage",
      title: 'Adapté à votre structure, pas un template générique',
      tagPME: 'PME',
      tagStartup: 'Startup',
      cases: [
        {
          title: 'Facturation & relances',
          text: "Un agent qui suit vos factures impayées, relance automatiquement au bon ton et au bon moment, et vous alerte seulement quand une décision humaine est nécessaire.",
        },
        {
          title: 'Tri et réponse aux emails',
          text: "Classement automatique, réponses aux demandes récurrentes, remontée des urgences en tête de file. Votre boîte mail arrête de dicter votre journée.",
        },
        {
          title: 'Prise de rendez-vous automatisée',
          text: "Un agent qui propose vos créneaux libres, confirme le rendez-vous et programme le rappel — sans allers-retours par email pour trouver une heure qui convient.",
        },
        {
          title: 'Support client autonome',
          text: "Un agent entraîné sur votre doc produit et votre historique de tickets, qui répond directement aux questions récurrentes et n'escalade vers l'équipe que ce qui le mérite vraiment.",
        },
        {
          title: 'Qualification des leads inbound',
          text: "Chaque lead entrant (site, formulaire, waitlist) est enrichi et priorisé automatiquement avant qu'un humain n'y touche. L'équipe commerciale ne voit que ce qui vaut vraiment un call.",
        },
        {
          title: 'Veille & alerting produit',
          text: "Un agent qui surveille vos métriques en continu et ne prévient l'équipe que sur une vraie anomalie — fini le bruit de notifications qu'on finit par ignorer.",
        },
        {
          title: 'Extraction de données depuis vos documents',
          text: "Factures, bons de commande, devis scannés : un agent qui lit vos documents et en extrait les données utiles directement dans votre tableur ou votre logiciel de gestion.",
        },
        {
          title: 'Veille concurrentielle automatisée',
          text: "Un agent qui surveille en continu vos concurrents (prix, avis, nouvelles fonctionnalités) et vous livre un résumé chaque jour, plutôt qu'une heure de recherche manuelle.",
        },
      ],
    },
    credibility: {
      eyebrow: 'Comment je travaille',
      title: "5 ans de freelance, une pratique sérieuse de l'agentic",
      text: "Chaque agent que je livre est codé sur-mesure autour de l'API Claude et branché sur vos outils réels — pensé pour durer, pas pour impressionner en démo et lâcher au premier pic d'activité. Hébergé sur des infrastructures cloud fiables (AWS, GCP), il continue de tourner même quand votre activité s'accélère.",
      linkedinCta: 'Voir les recommandations sur LinkedIn',
      statLabel: 'ans de freelance',
    },
    testimonials: {
      eyebrow: "Ce qu'on dit de moi",
      quotes: [
        {
          text: "Alexandre a été clé pendant sa mission de plusieurs mois chez Notice. Il a su s'intégrer à une stack complexe, communiquer et se rendre utile dès le premier jour.",
          name: 'Quentin Chantelot',
          role: 'Founder & CTO, Notice',
          context: 'Client',
        },
        {
          text: "J'ai fait appel à Alexandre pour nous aider à construire une solution de tarification et de devis très complexe, et je ne le regrette pas une seconde. Une personne compétente, agréable et fiable.",
          name: 'Julia Georgi',
          role: 'Founder @ Georgia',
          context: 'Ex-supérieure',
        },
      ],
    },
    trustLogos: {
      title: 'Ils me font confiance',
    },
    finalCta: {
      eyebrow: 'Étape suivante',
      title: "Un audit gratuit pour identifier ce qui vaut la peine d'être automatisé",
      text: "30 minutes pour regarder votre process le plus chronophage, et vous dire honnêtement si un agent IA le vaut. Sans engagement.",
      cta: 'Réserver mon audit gratuit',
    },
    footer: {
      byBusshidev: 'Un produit de',
      legalMentions: 'Mentions légales',
      legalCgu: "CGU",
    },
  },

  en: {
    meta: {
      htmlLang: 'en',
      title: 'AgenticFactory — Custom AI Agents for SMEs and Startups',
      description:
        'AgenticFactory builds custom AI agents for SMEs and startups: invoicing, customer support, lead qualification. Free audit.',
    },
    nav: {
      cta: 'Free audit',
    },
    hero: {
      eyebrow: 'AI Agents',
      titleA: 'Your repetitive tasks deserve better than an intern.',
      titleB: 'They deserve an agent.',
      subtitle:
        "Custom-coded AI agents, wired into your real tools — not no-code scenarios that break the moment something unexpected happens. Fewer repetitive tasks, more time for what actually matters.",
      ctaPrimary: 'Book my free audit',
      ctaSecondary: 'See use cases',
    },
    problem: {
      eyebrow: 'The reality',
      title: (
        <>
          You know you're losing time.
          <br />
          You just don't have anyone to get it back.
        </>
      ),
      p1: "Monday morning, it's the same follow-ups to send by hand, the same inbox to sort, the same report to rebuild from scratch.",
      p2: "Neither the small business nor the five-person startup has an AI developer on hand to change that — the latter is already busy keeping the product running. Not for lack of a solution: for lack of someone to build it.",
    },
    valueProp: {
      eyebrow: "What's different",
      title:
        "Anyone can configure an automation. Coding one that actually holds up inside your real systems is another matter.",
      cards: [
        {
          title: 'Coded, not just configured',
          text: "Every agent plugs into your real stack — APIs, databases, business tools — right where a no-code scenario breaks on the first edge case.",
        },
        {
          title: 'An audit before any commitment',
          text: "We identify together which process is costing you the most time, before talking implementation. No automation sold that you don't actually need.",
        },
        {
          title: 'Built for production, not demos',
          text: 'Front, back, infra: an agent that actually runs in production, not a demo that impresses in a meeting and then gathers dust.',
        },
      ],
    },
    useCases: {
      eyebrow: 'Use cases',
      title: 'Built for your setup, not a generic template',
      tagPME: 'SME',
      tagStartup: 'Startup',
      cases: [
        {
          title: 'Invoicing & follow-ups',
          text: "An agent that tracks your unpaid invoices, follows up automatically with the right tone at the right time, and only alerts you when a human decision is actually needed.",
        },
        {
          title: 'Email sorting & replies',
          text: "Automatic sorting, replies to recurring requests, urgent items bumped to the front. Your inbox stops dictating your day.",
        },
        {
          title: 'Automated appointment booking',
          text: "An agent that offers your open slots, confirms the appointment, and schedules the reminder — no back-and-forth emails to find a time that works.",
        },
        {
          title: 'Autonomous customer support',
          text: "An agent trained on your product docs and ticket history, answering recurring questions directly and escalating to the team only what genuinely deserves it.",
        },
        {
          title: 'Inbound lead qualification',
          text: "Every inbound lead (site, form, waitlist) is enriched and prioritized automatically before a human touches it. Sales only sees what's actually worth a call.",
        },
        {
          title: 'Product monitoring & alerting',
          text: "An agent that watches your metrics continuously and only pings the team on a genuine anomaly — no more notification noise that ends up ignored.",
        },
        {
          title: 'Data extraction from your documents',
          text: "Invoices, purchase orders, scanned quotes: an agent that reads your documents and pulls the useful data straight into your spreadsheet or management software.",
        },
        {
          title: 'Automated competitive watch',
          text: "An agent that continuously tracks your competitors (pricing, reviews, new features) and delivers a daily summary instead of an hour of manual research.",
        },
      ],
    },
    credibility: {
      eyebrow: 'How I work',
      title: '5 years freelancing, a serious agentic practice',
      text: "Every agent I ship is custom-built around the Claude API and wired into your real tools — made to last, not to impress in a demo and fall over at the first real spike in activity. Hosted on reliable cloud infrastructure (AWS, GCP), it keeps running even as your activity scales up.",
      linkedinCta: 'See recommendations on LinkedIn',
      statLabel: 'years freelancing',
    },
    testimonials: {
      eyebrow: 'What people say',
      quotes: [
        {
          text: "Alexandre was key during his multi-month mission at Notice. He integrated into a complex stack, communicated well, and made himself useful from day one.",
          name: 'Quentin Chantelot',
          role: 'Founder & CTO, Notice',
          context: 'Client',
        },
        {
          text: "I brought Alexandre in to help us build a very complex pricing and quoting solution, and I don't regret it for a second. A skilled, pleasant, and reliable person.",
          name: 'Julia Georgi',
          role: 'Founder @ Georgia',
          context: 'Former manager',
        },
      ],
    },
    trustLogos: {
      title: 'Trusted by',
    },
    finalCta: {
      eyebrow: 'Next step',
      title: "A free audit to find out what's actually worth automating",
      text: "30 minutes to look at your most time-consuming process, and tell you honestly whether an AI agent is worth it. No commitment.",
      cta: 'Book my free audit',
    },
    footer: {
      byBusshidev: 'A product by',
      legalMentions: 'Legal notice',
      legalCgu: 'Terms of use',
    },
  },
}

export function getT(lang: Lang): Translation {
  return translations[lang] || translations.fr
}
