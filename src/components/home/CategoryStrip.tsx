import { Link } from 'react-router-dom'
import { categories } from '@/data/categories'

export default function CategoryStrip() {
  return (
    <section className="container-lk py-16 sm:py-20">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="eyebrow text-taupe">Explora</p>
          <h2 className="mt-1.5 font-display text-3xl text-ink sm:text-4xl">Por categoría</h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {categories.map((c) => (
          <Link key={c.id} to={`/coleccion/${c.slug}`} className="group relative block overflow-hidden rounded-card bg-crema-dark/40">
            <div className="aspect-[3/4]">
              <img
                src={c.cover}
                alt={c.label}
                className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end gap-1 bg-gradient-to-t from-ink/70 via-ink/0 to-transparent p-4 pb-5 text-center">
              <p className="font-display text-xl text-marfil sm:text-2xl">{c.label}</p>
              <span className="text-2xs font-medium uppercase tracking-wideish text-marfil/80 opacity-0 transition-opacity group-hover:opacity-100">
                Ver colección
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
