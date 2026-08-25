import { Link } from 'react-router-dom'
import { site, waLink } from '@/data/site'
import { categories } from '@/data/categories'

const TikTokIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16.6 5.82c-1.02-.9-1.6-2.2-1.6-3.62h-3.16v13.3a2.7 2.7 0 1 1-1.9-2.58v-3.24a5.9 5.9 0 1 0 5.06 5.83V9.68a7.13 7.13 0 0 0 4.15 1.32V7.85a4.6 4.6 0 0 1-2.55-1.03Z" />
  </svg>
)
const FacebookIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.17 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.9 3.77-3.9 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34V22c4.78-.77 8.44-4.94 8.44-9.94Z" />
  </svg>
)

export default function Footer() {
  return (
    <footer className="bg-ink text-marfil">
      <div className="container-lk grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
        <div>
          <img src="/brand/logo-compact.webp" alt="LUKAY" className="h-14 w-auto" />
          <p className="mt-4 max-w-[26ch] text-sm leading-relaxed text-marfil/65">
            Calzado y accesorios femeninos hechos en Colombia. 🇨🇴
          </p>
          <div className="mt-5 flex items-center gap-3">
            {site.socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-marfil/25 text-marfil/80 transition-colors hover:border-gold-soft hover:text-gold-soft"
              >
                {s.name === 'TikTok' ? <TikTokIcon /> : <FacebookIcon />}
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="eyebrow text-marfil/50">Navegación</p>
          <ul className="mt-4 space-y-2.5 text-sm text-marfil/75">
            <li><Link to="/" className="hover:text-gold-soft">Inicio</Link></li>
            <li><Link to="/coleccion" className="hover:text-gold-soft">Colección</Link></li>
            {categories.map((c) => (
              <li key={c.id}>
                <Link to={`/coleccion/${c.slug}`} className="hover:text-gold-soft">{c.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow text-marfil/50">Ayuda</p>
          <ul className="mt-4 space-y-2.5 text-sm text-marfil/75">
            <li>
              <a href={waLink('Hola LUKAY 👋, quiero conocer más sobre el calzado disponible.')} target="_blank" rel="noopener noreferrer" className="hover:text-gold-soft">
                Contacto
              </a>
            </li>
            <li>
              <a href={waLink('Hola LUKAY 👋, tengo una pregunta sobre cambios o devoluciones.')} target="_blank" rel="noopener noreferrer" className="hover:text-gold-soft">
                Cambios y devoluciones
              </a>
            </li>
            <li>
              <a href={waLink('Hola LUKAY 👋, quiero saber cómo funcionan los envíos a mi ciudad.')} target="_blank" rel="noopener noreferrer" className="hover:text-gold-soft">
                Envíos
              </a>
            </li>
            <li><span className="text-marfil/40">Política de privacidad</span></li>
            <li><span className="text-marfil/40">Términos y condiciones</span></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow text-marfil/50">Contacto</p>
          <ul className="mt-4 space-y-2.5 text-sm text-marfil/75">
            <li>
              <a href={waLink('Hola LUKAY 👋, quiero conocer más sobre el calzado disponible.')} target="_blank" rel="noopener noreferrer" className="hover:text-gold-soft">
                WhatsApp {site.whatsappDisplay}
              </a>
            </li>
            <li>{site.operationLabel}</li>
            <li>{site.shippingLabel}</li>
            <li className="text-2xs uppercase tracking-wideish text-marfil/40">TikTok @lukaycalzado</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-marfil/10">
        <div className="container-lk flex flex-col items-center gap-2 py-6 text-2xs text-marfil/45 sm:flex-row sm:justify-between">
          <p>LUKAY © 2026 — Diseño colombiano. Manos colombianas. Tu propio estilo. 🇨🇴</p>
          <p>{site.country}</p>
        </div>
      </div>
    </footer>
  )
}
