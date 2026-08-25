import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SlidersHorizontal } from 'lucide-react'
import { products } from '@/data/products'
import { categoryById } from '@/data/categories'
import ProductCard from '@/components/catalog/ProductCard'
import Filters, { type FilterState } from '@/components/catalog/Filters'
import { Button } from '@/components/ui/Button'
import type { CategoryId } from '@/types'

const PAGE_SIZE = 8

export default function Catalog() {
  const { category } = useParams<{ category?: string }>()
  const activeCategory = category && categoryById.has(category as CategoryId) ? (category as CategoryId) : null

  const [filters, setFilters] = useState<FilterState>({ categories: [], colors: [] })
  const [visible, setVisible] = useState(PAGE_SIZE)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  useEffect(() => {
    setFilters({ categories: [], colors: [] })
    setVisible(PAGE_SIZE)
  }, [category])

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (activeCategory && p.category !== activeCategory) return false
      if (filters.categories.length && !filters.categories.includes(p.category)) return false
      if (filters.colors.length && !p.colors.some((c) => filters.colors.includes(c.name))) return false
      return true
    })
  }, [activeCategory, filters])

  const pageTitle = activeCategory ? categoryById.get(activeCategory)!.label : 'Colección'
  const pageSub = activeCategory
    ? categoryById.get(activeCategory)!.description
    : 'Diseños colombianos para cada forma de caminar.'

  return (
    <div className="container-lk py-10 sm:py-14">
      <header className="mb-8 max-w-xl">
        <p className="eyebrow text-taupe">Colección LUKAY</p>
        <h1 className="mt-1.5 font-display text-4xl text-ink sm:text-5xl">{pageTitle}</h1>
        <p className="mt-2 text-sm text-ink/60">{pageSub}</p>
      </header>

      <div className="flex items-center justify-between border-b hairline pb-4 lg:hidden">
        <p className="text-sm text-taupe">{filtered.length} resultado{filtered.length === 1 ? '' : 's'}</p>
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="flex items-center gap-1.5 text-2xs font-medium uppercase tracking-wideish text-ink"
        >
          <SlidersHorizontal size={15} /> Filtrar
        </button>
      </div>

      <div className="mt-8 flex gap-10">
        <Filters
          state={filters}
          onChange={setFilters}
          mobileOpen={mobileFiltersOpen}
          onCloseMobile={() => setMobileFiltersOpen(false)}
          resultCount={filtered.length}
        />

        <div className="flex-1">
          <p className="mb-5 hidden text-sm text-taupe lg:block">
            {filtered.length} resultado{filtered.length === 1 ? '' : 's'}
          </p>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-20 text-center">
              <p className="font-display text-2xl text-ink">Sin resultados con estos filtros</p>
              <p className="max-w-sm text-sm text-ink/60">
                Prueba con otra combinación, o escríbenos por WhatsApp y te ayudamos a encontrar tu par ideal.
              </p>
              <Button variant="secondary" onClick={() => setFilters({ categories: [], colors: [] })}>
                Limpiar filtros
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 xl:grid-cols-4">
                {filtered.slice(0, visible).map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
              {visible < filtered.length && (
                <div className="mt-12 flex justify-center">
                  <Button variant="secondary" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
                    Ver más
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
