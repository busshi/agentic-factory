import type { Lang } from '../i18n'
import { LegalLayout, LegalSection } from '../components/legal/LegalLayout'
import { useLegalMeta } from '../components/legal/useLegalMeta'
import { LegalPageShell } from './LegalPageShell'

export function CGU({ lang }: { lang: Lang }) {
  const isEn = lang === 'en'

  useLegalMeta(
    isEn ? 'Terms of Use — AgenticFactory' : "Conditions Générales d'Utilisation — AgenticFactory",
    isEn ? '/en/terms' : '/fr/cgu',
    lang
  )

  return (
    <LegalPageShell lang={lang}>
    <LegalLayout
      title={isEn ? 'Terms of Use' : "Conditions Générales d'Utilisation"}
      updatedAt={isEn ? 'Last updated: August 23, 2026' : 'Dernière mise à jour : 23 août 2026'}
    >
      {isEn ? (
        <>
          <LegalSection title="1. Purpose">
            <p>
              These Terms of Use govern access to and use of the site agentic-factory.fr
              (hereafter &quot;the Site&quot;), published by BusshiDev. The Site presents
              custom-coded AI agents for automating the business processes of SMEs and small
              startups, as well as ways to get in touch. Access to the Site implies full
              acceptance of these Terms of Use.
            </p>
          </LegalSection>

          <LegalSection title="2. Site Access">
            <p>
              The Site is freely accessible to any user with an internet connection. All costs
              related to accessing the Site (hardware, connection, etc.) are the user&apos;s
              responsibility. BusshiDev uses reasonable means available to it to ensure
              continuous access to the Site, without any obligation of result, and cannot be held
              liable for any interruption, outage or unavailability, in particular for
              maintenance operations.
            </p>
          </LegalSection>

          <LegalSection title="3. Services Offered">
            <p>
              The Site is intended for commercial presentation purposes. Any AI agent automation
              engagement starts with a free initial audit to identify the process most worth
              automating, followed by a commercial proposal and, where applicable, a separate
              contract or quote specifying the scope, timeline and pricing terms. These Terms of
              Use do not constitute a contractual offer of services.
            </p>
          </LegalSection>

          <LegalSection title="4. Intellectual Property">
            <p>
              All elements of the Site (text, visuals, code, visual identity) are protected under
              intellectual property law. Any unauthorized reproduction or use is prohibited. See
              the <a href="/en/legal-notice">legal notice</a> for details.
            </p>
          </LegalSection>

          <LegalSection title="5. Personal Data">
            <p>
              agentic-factory.fr does not automatically collect or process any personal data: the
              Site has no form, no user account, and no cookie or tracker of any kind (see
              &quot;Cookies&quot; below).
            </p>
            <p>The only points of contact the Site offers redirect to third-party services, each governed by its own privacy policy:</p>
            <ul>
              <li>Calendly, for scheduling a call (external link, not embedded in the Site);</li>
              <li>LinkedIn, to view or contact the professional profile;</li>
              <li>your own email client, to send a message to contact@agentic-factory.fr.</li>
            </ul>
            <p>
              Any information you choose to send through one of these channels (name, email,
              content of the exchange) is used exclusively to respond to your request, on the
              basis of BusshiDev&apos;s legitimate interest in handling contact requests.
            </p>
            <p>
              In accordance with the General Data Protection Regulation (GDPR) and French data
              protection law, you have the right to access, rectify, erase and port the data you
              send us directly, as well as the right to object to its processing. You may
              exercise these rights by writing to{' '}
              <a href="mailto:contact@agentic-factory.fr">contact@agentic-factory.fr</a>. You also
              have the right to lodge a complaint with the{' '}
              <a href="https://www.cnil.fr" target="_blank" rel="noreferrer">CNIL</a> (the French
              data protection authority).
            </p>
            <p>
              Data controller: Alexandre Dubar, trading as BusshiDev (Sole proprietorship, SIREN
              911 127 835) — see the <a href="/en/legal-notice">legal notice</a> for details.
            </p>
          </LegalSection>

          <LegalSection title="6. Cookies">
            <p>
              agentic-factory.fr does not set any cookie or tracker, technical or third-party. The
              Site uses no audience measurement tool, live chat, or advertising service. If you
              follow a link to Calendly or LinkedIn, those third-party sites may set their own
              cookies once you visit them — refer to their respective privacy policies.
            </p>
          </LegalSection>

          <LegalSection title="7. Liability">
            <p>
              BusshiDev strives to ensure the accuracy of the information published on the Site,
              without guaranteeing the absence of errors or omissions. BusshiDev cannot be held
              liable for direct or indirect damages resulting from the use of the Site or the
              inability to access it.
            </p>
          </LegalSection>

          <LegalSection title="8. Changes to these Terms">
            <p>
              BusshiDev reserves the right to modify these Terms of Use at any time. The
              applicable Terms are those in effect on the date the Site is accessed, as indicated
              at the top of this page.
            </p>
          </LegalSection>

          <LegalSection title="9. Governing Law">
            <p>
              These Terms of Use are governed by French law. Any dispute relating to their
              interpretation or performance shall, in the absence of an amicable resolution, fall
              under the jurisdiction of the French courts.
            </p>
          </LegalSection>
        </>
      ) : (
        <>
          <LegalSection title="1. Objet">
            <p>
              Les présentes Conditions Générales d&apos;Utilisation (CGU) encadrent l&apos;accès
              et l&apos;utilisation du site agentic-factory.fr (ci-après « le Site »), édité par
              BusshiDev. Le Site présente des agents IA codés sur-mesure pour automatiser les
              process métier de PME et petites startups, ainsi que les moyens de le contacter.
              L&apos;accès au Site implique l&apos;acceptation pleine et entière des présentes
              CGU.
            </p>
          </LegalSection>

          <LegalSection title="2. Accès au site">
            <p>
              Le Site est accessible gratuitement à tout utilisateur disposant d&apos;un accès à
              Internet. Tous les frais liés à l&apos;accès au Site (matériel, connexion, etc.)
              sont à la charge de l&apos;utilisateur. BusshiDev met en œuvre les moyens
              raisonnables à sa disposition pour assurer un accès continu au Site, sans
              obligation de résultat, et ne saurait être tenu responsable de toute interruption,
              panne ou indisponibilité, notamment pour des opérations de maintenance.
            </p>
          </LegalSection>

          <LegalSection title="3. Services proposés">
            <p>
              Le Site a une vocation de présentation commerciale. Toute mission
              d&apos;automatisation par agent IA fait l&apos;objet d&apos;un audit gratuit
              initial, permettant d&apos;identifier le process le plus pertinent à automatiser,
              suivi d&apos;une proposition commerciale et, le cas échéant, d&apos;un contrat ou
              devis distinct précisant le périmètre, le calendrier et les conditions tarifaires.
              Les présentes CGU ne constituent pas une offre contractuelle de prestation de
              services.
            </p>
          </LegalSection>

          <LegalSection title="4. Propriété intellectuelle">
            <p>
              L&apos;ensemble des éléments du Site (textes, visuels, code, identité graphique)
              est protégé par le droit de la propriété intellectuelle. Toute reproduction ou
              exploitation non autorisée est interdite. Voir les{' '}
              <a href="/fr/mentions-legales">mentions légales</a> pour le détail.
            </p>
          </LegalSection>

          <LegalSection title="5. Données personnelles">
            <p>
              agentic-factory.fr ne collecte ni ne traite automatiquement aucune donnée
              personnelle : le Site ne comporte ni formulaire, ni compte utilisateur, ni cookie
              ni traceur d&apos;aucune sorte (voir « Cookies » ci-dessous).
            </p>
            <p>Les seuls points de contact proposés par le Site redirigent vers des services tiers, chacun soumis à sa propre politique de confidentialité :</p>
            <ul>
              <li>Calendly, pour la prise de rendez-vous (lien externe, non intégré au Site) ;</li>
              <li>LinkedIn, pour consulter ou contacter le profil professionnel ;</li>
              <li>votre client de messagerie, pour l&apos;envoi d&apos;un email à contact@agentic-factory.fr.</li>
            </ul>
            <p>
              Les informations que vous transmettez volontairement par l&apos;un de ces canaux
              (nom, email, contenu de l&apos;échange) sont utilisées exclusivement pour répondre
              à votre demande, sur la base de l&apos;intérêt légitime de BusshiDev à traiter les
              demandes de contact.
            </p>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi
              Informatique et Libertés, vous disposez d&apos;un droit d&apos;accès, de
              rectification, d&apos;effacement et de portabilité des données que vous nous
              transmettez directement, ainsi que du droit de vous opposer à leur traitement. Vous
              pouvez exercer ces droits en écrivant à{' '}
              <a href="mailto:contact@agentic-factory.fr">contact@agentic-factory.fr</a>. Vous
              disposez également du droit d&apos;introduire une réclamation auprès de la{' '}
              <a href="https://www.cnil.fr" target="_blank" rel="noreferrer">CNIL</a>.
            </p>
            <p>
              Responsable du traitement : Alexandre Dubar, exerçant sous le nom commercial
              BusshiDev (Entreprise individuelle, SIREN 911 127 835) — voir les{' '}
              <a href="/fr/mentions-legales">mentions légales</a> pour le détail.
            </p>
          </LegalSection>

          <LegalSection title="6. Cookies">
            <p>
              agentic-factory.fr ne dépose aucun cookie ni traceur, qu&apos;il soit technique ou
              tiers. Le Site ne fait appel à aucun outil de mesure d&apos;audience, de chat en
              ligne ou de publicité. Si vous suivez un lien vers Calendly ou LinkedIn, ces sites
              tiers peuvent déposer leurs propres cookies dès que vous les visitez — reportez-vous
              à leur politique de confidentialité respective.
            </p>
          </LegalSection>

          <LegalSection title="7. Responsabilité">
            <p>
              BusshiDev s&apos;efforce d&apos;assurer l&apos;exactitude des informations
              diffusées sur le Site, sans garantir l&apos;absence d&apos;erreur ou
              d&apos;omission. BusshiDev ne saurait être tenu responsable des dommages directs
              ou indirects résultant de l&apos;utilisation du Site ou de l&apos;impossibilité
              d&apos;y accéder.
            </p>
          </LegalSection>

          <LegalSection title="8. Modification des CGU">
            <p>
              BusshiDev se réserve le droit de modifier les présentes CGU à tout moment. Les CGU
              applicables sont celles en vigueur à la date de consultation du Site, indiquée en
              haut de cette page.
            </p>
          </LegalSection>

          <LegalSection title="9. Droit applicable">
            <p>
              Les présentes CGU sont soumises au droit français. Tout litige relatif à leur
              interprétation ou leur exécution relève, à défaut de résolution amiable, de la
              compétence des tribunaux français.
            </p>
          </LegalSection>
        </>
      )}
    </LegalLayout>
    </LegalPageShell>
  )
}
