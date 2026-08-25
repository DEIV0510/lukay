import { Link } from 'react-router-dom'
import { featuredProducts } from '@/data/products'
import ProductCard from '@/components/catalog/ProductCard'
import { Button } from '@/components/ui/Button'

export default function FeaturedProducts() {
  return (
    <section className="bg-crema/40 py-16 sm:py-20">
      <div className="container-lk">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="eyebrow text-taupe">Descubre LUKAY</p>
            <h2 className="mt-1.5 font-display text-3xl text-ink sm:text-4xl">Destacados</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-4">
          {featuredProducts.slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link to="/coleccion">
            <Button variant="secondary">Ver colección completa</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
