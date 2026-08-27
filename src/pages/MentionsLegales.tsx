import type { Lang } from '../i18n'
import { LegalLayout, LegalSection } from '../components/legal/LegalLayout'
import { LegalMeta } from '../components/legal/LegalMeta'
import { LegalPageShell } from './LegalPageShell'

export function MentionsLegales({ lang }: { lang: Lang }) {
  const isEn = lang === 'en'

  return (
    <LegalPageShell lang={lang}>
    <LegalMeta
      pageTitle={isEn ? 'Legal Notice — AgenticFactory' : 'Mentions légales — AgenticFactory'}
      canonicalPath={isEn ? '/en/legal-notice' : '/fr/mentions-legales'}
      lang={lang}
    />
    <LegalLayout
      title={isEn ? 'Legal Notice' : 'Mentions légales'}
      updatedAt={isEn ? 'Last updated: August 23, 2026' : 'Dernière mise à jour : 23 août 2026'}
    >
      {isEn ? (
        <>
          <LegalSection title="1. Site Publisher">
            <p>This site, agentic-factory.fr (hereafter &quot;the Site&quot;), is published by:</p>
            <ul>
              <li>Name: Alexandre Dubar, trading as BusshiDev</li>
              <li>Legal status: Sole proprietorship (French &quot;entreprise individuelle&quot;)</li>
              <li>SIREN number: 911 127 835</li>
              <li>Intra-community VAT number: FR 5091112783</li>
              <li>Email: <a href="mailto:contact@agentic-factory.fr">contact@agentic-factory.fr</a></li>
              <li>Publication director: Alexandre Dubar</li>
            </ul>
          </LegalSection>

          <LegalSection title="2. Hosting">
            <p>The Site is hosted by:</p>
            <ul>
              <li>Company name: Vercel Inc.</li>
              <li>Address: 440 N Barranca Avenue #4133, Covina, CA 91723, United States</li>
              <li>Contact: <a href="mailto:privacy@vercel.com">privacy@vercel.com</a></li>
            </ul>
          </LegalSection>

          <LegalSection title="3. Intellectual Property">
            <p>
              All content on the Site (text, images, logos, graphics, layout, source code) is,
              unless stated otherwise, the exclusive property of BusshiDev or of the clients
              referenced for portfolio purposes, and is protected under French intellectual
              property law. Any reproduction, representation, modification or use of this
              content, in whole or in part, by any means whatsoever, without prior written
              authorization, is prohibited.
            </p>
            <p>
              The company and organization logos shown in the &quot;Trusted by&quot; and
              &quot;What people say&quot; sections are the property of their respective owners
              and are used for reference purposes, with the agreement of the parties concerned,
              to illustrate work actually carried out.
            </p>
          </LegalSection>

          <LegalSection title="4. Hyperlinks">
            <p>
              The Site contains links to third-party sites (LinkedIn, Calendly). BusshiDev has no
              control over these sites and disclaims any responsibility for their content or
              privacy practices.
            </p>
          </LegalSection>

          <LegalSection title="5. Cookies and Trackers">
            <p>
              The Site does not set any cookie or tracker of its own, technical or third-party —
              it uses no audience measurement tool, live chat, or advertising service. See the
              &quot;Cookies&quot; section of our <a href="/en/terms">Terms of Use</a> for detail.
            </p>
          </LegalSection>

          <LegalSection title="6. Governing Law">
            <p>
              This legal notice is governed by French law. In the event of a dispute, and failing
              an amicable settlement, the French courts shall have sole jurisdiction.
            </p>
          </LegalSection>
        </>
      ) : (
        <>
          <LegalSection title="1. Éditeur du site">
            <p>Le présent site agentic-factory.fr (ci-après « le Site ») est édité par :</p>
            <ul>
              <li>Nom et prénom : Alexandre Dubar, exerçant sous le nom commercial BusshiDev</li>
              <li>Statut juridique : Entreprise individuelle</li>
              <li>Numéro SIREN : 911 127 835</li>
              <li>Numéro de TVA intracommunautaire : FR 5091112783</li>
              <li>Email : <a href="mailto:contact@agentic-factory.fr">contact@agentic-factory.fr</a></li>
              <li>Directeur de la publication : Alexandre Dubar</li>
            </ul>
          </LegalSection>

          <LegalSection title="2. Hébergement">
            <p>Le Site est hébergé par :</p>
            <ul>
              <li>Raison sociale : Vercel Inc.</li>
              <li>Adresse : 440 N Barranca Avenue #4133, Covina, CA 91723, États-Unis</li>
              <li>Contact : <a href="mailto:privacy@vercel.com">privacy@vercel.com</a></li>
            </ul>
          </LegalSection>

          <LegalSection title="3. Propriété intellectuelle">
            <p>
              L&apos;ensemble des contenus présents sur le Site (textes, images, logos,
              graphismes, mise en page, code source) est, sauf mention contraire, la propriété
              exclusive de BusshiDev ou de ses clients cités à titre de référence, et est protégé
              par le Code de la propriété intellectuelle. Toute reproduction, représentation,
              modification ou exploitation, totale ou partielle, de ces contenus, par quelque
              procédé que ce soit, sans autorisation écrite préalable, est interdite.
            </p>
            <p>
              Les logos des entreprises et organisations présentés dans les sections « Ils m&apos;ont
              fait confiance » et « Ce qu&apos;on dit de moi » sont la propriété de leurs détenteurs
              respectifs et sont utilisés à titre de référence, avec l&apos;accord des personnes
              concernées, pour illustrer des missions réellement réalisées.
            </p>
          </LegalSection>

          <LegalSection title="4. Liens hypertextes">
            <p>
              Le Site contient des liens vers des sites tiers (LinkedIn, Calendly). BusshiDev
              n&apos;exerce aucun contrôle sur ces sites et décline toute responsabilité quant à
              leur contenu ou leur politique de confidentialité.
            </p>
          </LegalSection>

          <LegalSection title="5. Cookies et traceurs">
            <p>
              Le Site ne dépose aucun cookie ni traceur, qu&apos;il soit technique ou tiers — il
              ne fait appel à aucun outil de mesure d&apos;audience, de chat en ligne ou de
              publicité. Voir la section « Cookies » de nos{' '}
              <a href="/fr/cgu">Conditions Générales d&apos;Utilisation</a> pour plus de détails.
            </p>
          </LegalSection>

          <LegalSection title="6. Droit applicable">
            <p>
              Les présentes mentions légales sont soumises au droit français. En cas de litige et
              à défaut d&apos;accord amiable, les tribunaux français seront seuls compétents.
            </p>
          </LegalSection>
        </>
      )}
    </LegalLayout>
    </LegalPageShell>
  )
}
