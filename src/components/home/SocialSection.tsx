import { site } from '@/data/site'

const gridImages = [
  '/products/slingback-fina-cubano/animal-1-card.webp',
  '/products/baleta-peep-toe-flor/vino-2-card.webp',
  '/products/slingback-mate-negro/negro-3-card.webp',
  '/products/slingback-tacon-bow-bicolor/amarillo-4-card.webp',
  '/products/slingback-animal-print/leopardo-1-card.webp',
  '/products/baleta-fina-charol/rojo-1-card.webp',
]

const TikTokIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16.6 5.82c-1.02-.9-1.6-2.2-1.6-3.62h-3.16v13.3a2.7 2.7 0 1 1-1.9-2.58v-3.24a5.9 5.9 0 1 0 5.06 5.83V9.68a7.13 7.13 0 0 0 4.15 1.32V7.85a4.6 4.6 0 0 1-2.55-1.03Z" />
  </svg>
)
const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.17 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34V22c4.78-.77 8.44-4.94 8.44-9.94Z" />
  </svg>
)

export default function SocialSection() {
  return (
    <section className="container-lk py-16 sm:py-20">
      <div className="mb-8 text-center">
        <p className="eyebrow text-taupe">Síguenos</p>
        <h2 className="mt-1.5 font-display text-3xl text-ink sm:text-4xl">@lukaycalzado</h2>
        <div className="mt-5 flex justify-center gap-3">
          {site.socials.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-pill border border-ink/15 px-5 py-2.5 text-2xs font-medium uppercase tracking-wideish text-ink transition-colors hover:border-ink hover:bg-ink hover:text-marfil"
            >
              {s.name === 'TikTok' ? <TikTokIcon /> : <FacebookIcon />}
              {s.name}
            </a>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-6">
        {gridImages.map((src) => (
          <div key={src} className="aspect-square overflow-hidden rounded-card bg-crema-dark/40">
            <img src={src} alt="Calzado LUKAY" className="h-full w-full object-contain p-2.5" loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  )
}
