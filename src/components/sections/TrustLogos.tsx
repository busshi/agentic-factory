import type { Translation } from '../../i18n'
import { RevealSection } from '../ui/RevealSection'
import laPosteLogo from '../../assets/logos/la-poste.jpeg'
import ministereLogo from '../../assets/logos/ministere-education-nationale.webp'
import noticeLogo from '../../assets/logos/notice.jpeg'
import octoloLogo from '../../assets/logos/octolo.svg'
import pricebeeLogo from '../../assets/logos/pricebee.webp'
import stationFLogo from '../../assets/logos/station-f.webp'

interface TrustLogo {
  name: string
  src: string
  invert?: boolean
  scale?: boolean
}

// "invert" flags logos whose file is dark ink on a white background — a
// CSS invert flips them to light ink so they read on the dark chip, same
// trick already used for the BusshiDev footer logo. Octolo (white
// wordmark) and PriceBee (own navy tile) are already designed for a dark
// background. The ministère logo is tricolour (bleu-blanc-rouge) so
// invert would distort its actual colors — its white background was
// keyed out to real alpha transparency instead.
const LOGOS: TrustLogo[] = [
  { name: 'PriceBee', src: pricebeeLogo },
  { name: 'Notice', src: noticeLogo, invert: true },
  { name: 'Octolo', src: octoloLogo },
  { name: 'La Poste', src: laPosteLogo, invert: true },
  { name: "Ministère de l'Éducation nationale", src: ministereLogo, scale: true },
  { name: 'Station F', src: stationFLogo, invert: true },
]

/* Trust bar — styled as a real logo wall (bordered chips, grayscale→color
   on hover). See README for notes on licensing when swapping/adding
   institutional client logos. */
export function TrustLogos({ t }: { t: Translation }) {
  const track = [...LOGOS, ...LOGOS]

  return (
    <RevealSection className="py-16 border-t border-line overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="font-mono text-xs tracking-widest uppercase text-muted2">
          {t.trustLogos.title}
        </p>
      </div>
      <div className="relative mt-8 max-w-6xl mx-auto group overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max gap-3.5 animate-marquee group-hover:[animation-play-state:paused]">
          {track.map((l, i) => (
            <div
              key={`${l.name}-${i}`}
              className="flex items-center justify-center h-20 min-w-[130px] px-6 rounded-xl border border-line bg-surface2/40 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 hover:border-violet/40 transition-all shrink-0"
            >
              <img
                src={l.src}
                alt={l.name}
                className={`${l.scale ? 'h-14' : 'h-10'} w-auto max-w-[150px] object-contain ${l.invert ? 'invert' : ''}`}
              />
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  )
}
