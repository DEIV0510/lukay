import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'

const EDITORIAL_IMAGE = '/products/slingback-combinada/crudo-4-full.webp'

export default function Editorial() {
  return (
    <section className="container-lk py-16 sm:py-24">
      <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
        <div className="aspect-[4/3] overflow-hidden rounded-card bg-crema-dark/40">
          <img
            src={EDITORIAL_IMAGE}
            alt="Slingback LUKAY en tejido texturizado, composición editorial"
            className="h-full w-full object-cover object-top"
            loading="lazy"
          />
        </div>
        <div className="max-w-md">
          <p className="eyebrow text-taupe">Campaña LUKAY</p>
          <h2 className="mt-2 font-display text-4xl leading-[1.05] text-ink sm:text-5xl">Camina a tu manera.</h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/65">
            Diseño colombiano para mujeres con estilo propio.
          </p>
          <Link to="/coleccion" className="mt-7 inline-block">
            <Button variant="secondary">Ver colección</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
