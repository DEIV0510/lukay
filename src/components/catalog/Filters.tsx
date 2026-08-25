import { useMemo } from 'react'
import { X } from 'lucide-react'
import { categories } from '@/data/categories'
import { products } from '@/data/products'
import ColorSwatch from '@/components/ui/ColorSwatch'
import type { CategoryId } from '@/types'

export interface FilterState {
  categories: CategoryId[]
  colors: string[]
}

interface FiltersProps {
  state: FilterState
  onChange: (next: FilterState) => void
  mobileOpen?: boolean
  onCloseMobile?: () => void
  resultCount: number
}

function useColorFacets() {
  return useMemo(() => {
    const map = new Map<string, { name: string; hex: string; count: number }>()
    for (const p of products) {
      for (const c of p.colors) {
        const key = c.name
        const existing = map.get(key)
        if (existing) existing.count++
        else map.set(key, { name: c.name, hex: c.hex, count: 1 })
      }
    }
    return Array.from(map.values()).sort((a, b) => b.count - a.count)
  }, [])
}

function useCategoryFacets() {
  return useMemo(() => {
    const counts = new Map<CategoryId, number>()
    for (const p of products) counts.set(p.category, (counts.get(p.category) ?? 0) + 1)
    return categories.map((c) => ({ ...c, count: counts.get(c.id) ?? 0 }))
  }, [])
}

function FilterBody({ state, onChange }: Pick<FiltersProps, 'state' | 'onChange'>) {
  const colorFacets = useColorFacets()
  const categoryFacets = useCategoryFacets()

  const toggleCategory = (id: CategoryId) => {
    const has = state.categories.includes(id)
    onChange({ ...state, categories: has ? state.categories.filter((c) => c !== id) : [...state.categories, id] })
  }
  const toggleColor = (name: string) => {
    const has = state.colors.includes(name)
    onChange({ ...state, colors: has ? state.colors.filter((c) => c !== name) : [...state.colors, name] })
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="eyebrow text-ink/50">Categoría</p>
        <ul className="mt-3 space-y-2.5">
          {categoryFacets.map((c) => (
            <li key={c.id}>
              <label className="flex cursor-pointer items-center justify-between gap-2 text-sm text-ink/80">
                <span className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={state.categories.includes(c.id)}
                    onChange={() => toggleCategory(c.id)}
                    className="h-4 w-4 rounded-sm border-taupe accent-ink"
                  />
                  {c.label}
                </span>
                <span className="text-2xs text-taupe">{c.count}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="eyebrow text-ink/50">Color</p>
        <div className="mt-3 flex flex-wrap gap-2.5">
          {colorFacets.map((c) => (
            <ColorSwatch
              key={c.name}
              hex={c.hex}
              name={c.name}
              active={state.colors.includes(c.name)}
              onClick={() => toggleColor(c.name)}
            />
          ))}
        </div>
      </div>

      {(state.categories.length > 0 || state.colors.length > 0) && (
        <button
          onClick={() => onChange({ categories: [], colors: [] })}
          className="self-start text-2xs font-medium uppercase tracking-wideish text-taupe underline underline-offset-4 hover:text-ink"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  )
}

export default function Filters({ state, onChange, mobileOpen, onCloseMobile, resultCount }: FiltersProps) {
  return (
    <>
      {/* Desktop: sidebar */}
      <aside className="hidden w-56 shrink-0 lg:block">
        <FilterBody state={state} onChange={onChange} />
      </aside>

      {/* Mobile: bottom sheet */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button aria-label="Cerrar filtros" onClick={onCloseMobile} className="absolute inset-0 animate-fade-in bg-ink/50" />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] animate-slide-up overflow-y-auto rounded-t-2xl bg-marfil">
            <div className="sticky top-0 flex items-center justify-between border-b hairline bg-marfil px-5 py-4">
              <p className="font-display text-lg">Filtrar</p>
              <button onClick={onCloseMobile} aria-label="Cerrar" className="p-1 text-ink">
                <X size={20} />
              </button>
            </div>
            <div className="px-5 py-6">
              <FilterBody state={state} onChange={onChange} />
            </div>
            <div className="sticky bottom-0 border-t hairline bg-marfil px-5 py-4">
              <button
                onClick={onCloseMobile}
                className="w-full rounded-card bg-ink py-3.5 text-sm font-medium uppercase tracking-wideish text-marfil"
              >
                Ver {resultCount} resultado{resultCount === 1 ? '' : 's'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
