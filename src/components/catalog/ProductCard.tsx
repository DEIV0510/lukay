import { useState } from 'react'
import { Link } from 'react-router-dom'
import Price from '@/components/ui/Price'
import ColorSwatch from '@/components/ui/ColorSwatch'
import type { Product } from '@/types'

export default function ProductCard({ product }: { product: Product }) {
  const [colorIdx, setColorIdx] = useState(0)
  const color = product.colors[colorIdx]
  const image = color.images[0]
  const secondImage = color.images[1]

  const sizeLabel =
    product.sizes && product.sizes.length
      ? `Tallas ${product.sizes[0]}–${product.sizes[product.sizes.length - 1]}`
      : 'Consultar tallas'

  return (
    <div className="group flex flex-col">
      <Link to={`/producto/${product.slug}`} className="relative block overflow-hidden rounded-card bg-marfil-soft">
        <div className="aspect-[4/5] w-full">
          <img
            src={image.card}
            alt={`${product.name} — ${color.name}`}
            className="h-full w-full object-contain transition-opacity duration-300 sm:group-hover:opacity-0"
            loading="lazy"
            width={560}
            height={700}
          />
          {secondImage && (
            <img
              src={secondImage.card}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-300 sm:group-hover:opacity-100"
              loading="lazy"
            />
          )}
        </div>
        <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-ink/90 py-2.5 text-center text-2xs font-medium uppercase tracking-wideish text-marfil transition-transform duration-300 sm:group-hover:translate-y-0">
          Ver producto
        </span>
      </Link>

      <div className="mt-3 flex flex-col gap-1">
        <Link to={`/producto/${product.slug}`} className="font-display text-lg leading-tight text-ink">
          {product.name}
        </Link>
        <Price price={product.price} oldPrice={product.oldPrice} className="text-sm" />
        <p className="text-2xs uppercase tracking-wideish text-taupe">
          {color.name} · {sizeLabel}
        </p>

        {product.colors.length > 1 && (
          <div className="mt-1.5 flex items-center gap-1.5">
            {product.colors.map((c, i) => (
              <ColorSwatch
                key={c.id}
                hex={c.hex}
                name={c.name}
                size="sm"
                active={i === colorIdx}
                onClick={() => setColorIdx(i)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
