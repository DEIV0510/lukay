import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { site, waLink } from '@/data/site'
import { Button, LinkButton } from '@/components/ui/Button'

const HERO_IMAGE = '/products/slingback-tacon-bow-bicolor/vino-2-full.webp'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="container-lk grid min-h-[86vh] items-center gap-8 py-16 sm:min-h-[92vh] lg:grid-cols-2 lg:gap-4 lg:py-0">
        <div className="relative z-10 order-2 lg:order-1">
          <p className="eyebrow text-gold-soft">Calzado femenino colombiano</p>
          <h1 className="mt-3 font-display text-[13vw] leading-[0.95] text-marfil sm:text-6xl lg:text-7xl">
            Tu estilo
            <br />
            comienza aquí.
          </h1>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-marfil/70 sm:text-base">
            Calzado femenino diseñado y fabricado en Colombia.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/coleccion">
              <Button variant="gold">Ver colección</Button>
            </Link>
            <LinkButton
              as="a"
              href={waLink(`Hola ${site.name} 👋, quiero comprar por WhatsApp.`)}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              className="border-marfil/40 text-marfil hover:bg-marfil hover:text-ink"
              icon={<MessageCircle size={16} />}
            >
              Comprar por WhatsApp
            </LinkButton>
          </div>
        </div>

        <div className="relative order-1 aspect-[4/5] w-full overflow-hidden rounded-card bg-ink lg:order-2 lg:aspect-auto lg:h-[80vh]">
          <img
            src={HERO_IMAGE}
            alt="Calzado LUKAY — moño de charol en amarillo mantequilla y vino"
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent lg:bg-gradient-to-l" />
        </div>
      </div>
    </section>
  )
}
