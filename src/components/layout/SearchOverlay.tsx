import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { products } from '@/data/products'
import { categoryById } from '@/data/categories'
import Price from '@/components/ui/Price'

interface SearchOverlayProps {
  open: boolean
  onClose: () => void
}

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}

export default function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [q, setQ] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      document.body.style.overflow = ''
      setQ('')
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const results = useMemo(() => {
    const term = normalize(q.trim())
    if (term.length < 2) return []
    return products
      .filter((p) => {
        const haystack = normalize(
          [p.name, categoryById.get(p.category)?.label ?? '', p.material, ...p.colors.map((c) => c.name), ...p.tags].join(
            ' '
          )
        )
        return haystack.includes(term)
      })
      .slice(0, 8)
  }, [q])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[65]">
      <button aria-label="Cerrar búsqueda" onClick={onClose} className="absolute inset-0 animate-fade-in bg-ink/60" />
      <div className="absolute inset-x-0 top-0 max-h-[85vh] animate-slide-up overflow-y-auto bg-marfil sm:animate-fade-up">
        <div className="container-lk sticky top-0 z-10 flex items-center gap-3 border-b hairline bg-marfil py-5">
          <Search size={19} className="shrink-0 text-taupe" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            type="search"
            placeholder="Buscar baleta, tacón, negro, animal print…"
            className="w-full bg-transparent font-display text-xl text-ink placeholder:text-taupe/70 focus:outline-none"
          />
          <button onClick={onClose} aria-label="Cerrar" className="shrink-0 p-1 text-ink">
            <X size={22} />
          </button>
        </div>

        <div className="container-lk py-6">
          {q.trim().length >= 2 && results.length === 0 && (
            <p className="py-10 text-center text-sm text-taupe">
              No encontramos nada con “{q}”. Prueba con otra palabra o consulta por WhatsApp.
            </p>
          )}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {results.map((p) => (
              <Link
                key={p.id}
                to={`/producto/${p.slug}`}
                onClick={onClose}
                className="group flex flex-col gap-2"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-card bg-crema-dark/40">
                  <img
                    src={p.colors[0].images[0].card}
                    alt={p.name}
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="text-sm text-ink">{p.name}</p>
                  <Price price={p.price} className="text-xs" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
