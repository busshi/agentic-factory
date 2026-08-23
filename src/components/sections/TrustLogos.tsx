import type { Translation } from '../../i18n'
import { RevealSection } from '../ui/RevealSection'
import laPosteLogo from '../../assets/logos/la-poste.webp'
import ministereLogo from '../../assets/logos/ministere-education-nationale.webp'
import noticeLogo from '../../assets/logos/notice.webp'
import octoloLogo from '../../assets/logos/octolo.svg'
import pricebeeLogo from '../../assets/logos/pricebee.webp'
import stationFLogo from '../../assets/logos/station-f.webp'

interface TrustLogo {
  name: string
  src: string
  invert?: boolean
  scale?: boolean
  // Notice's file is just the bulb mark — on its own it's not recognizable
  // enough in the chip, so the company name is set beside it.
  showLabel?: boolean
  // Fills the whole chip (not just a small plate around the logo) with
  // white, matching the logo file's own white margin so there's no visible
  // seam between "card" and "logo background". For a multi-element lockup
  // like the ministère's (tricolour + wordmark + emblem), that reads as an
  // intentional badge on the dark row instead of floating loose the way
  // the single-color logos do.
  plate?: boolean
}

// "invert" flags logos whose file is dark ink on a white background — a
// CSS invert flips them to light ink so they read on the dark chip, same
// trick already used for the BusshiDev footer logo. Most of these logos
// are full-color on real alpha transparency already (keyed out from their
// white background rather than inverted, to keep their actual brand
// colors), so only Station F (flat black wordmark) still needs it.
const LOGOS: TrustLogo[] = [
  { name: 'PriceBee', src: pricebeeLogo },
  { name: 'Notice', src: noticeLogo, showLabel: true },
  { name: 'Octolo', src: octoloLogo },
  { name: 'La Poste', src: laPosteLogo },
  { name: "Ministère de l'Éducation nationale", src: ministereLogo, scale: true, plate: true },
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
          {track.map((l, i) => {
            const img = (
              <img
                src={l.src}
                alt={l.name}
                className={`${l.scale ? 'h-14' : 'h-10'} w-auto max-w-[150px] object-contain ${l.invert ? 'invert' : ''}`}
              />
            )
            return (
              <div
                key={`${l.name}-${i}`}
                className={`flex items-center justify-center h-20 w-[200px] px-6 rounded-xl border grayscale opacity-70 hover:grayscale-0 hover:opacity-100 hover:border-violet/40 transition-all shrink-0 ${
                  l.plate ? 'bg-white border-white' : 'bg-surface2/40 border-line'
                }`}
              >
                {l.showLabel ? (
                  <div className="flex items-center gap-2.5">
                    {img}
                    <span className="font-mono text-sm text-text whitespace-nowrap">{l.name}</span>
                  </div>
                ) : (
                  img
                )}
              </div>
            )
          })}
        </div>
      </div>
    </RevealSection>
  )
}
