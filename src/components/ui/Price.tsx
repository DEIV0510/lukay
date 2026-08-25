interface PriceProps {
  price: number | null
  oldPrice?: number | null
  className?: string
}

export default function Price({ price, oldPrice, className = '' }: PriceProps) {
  if (price == null) {
    return <span className={`font-medium text-taupe ${className}`}>Consultar disponibilidad</span>
  }
  return (
    <span className={`inline-flex items-baseline gap-2 ${className}`}>
      <span className="font-medium text-ink">${price.toLocaleString('es-CO')}</span>
      {oldPrice != null && oldPrice > price && (
        <span className="text-sm text-taupe line-through">${oldPrice.toLocaleString('es-CO')}</span>
      )}
    </span>
  )
}
