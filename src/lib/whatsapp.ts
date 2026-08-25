import { site, waLink } from '@/data/site'
import type { CartEntry, Product, ProductColor } from '@/types'

function formatPrice(price: number | null): string {
  return price == null ? 'Consultar disponibilidad' : `$${price.toLocaleString('es-CO')}`
}

/** Mensaje de WhatsApp para un solo producto (ficha de producto). */
export function productWhatsappLink(product: Product, color: ProductColor, size: number | null): string {
  const lines = [
    'Hola LUKAY 👋',
    'Estoy interesada en:',
    `Producto: ${product.name}`,
    `Color: ${color.name}`,
  ]
  if (size != null) lines.push(`Talla: ${size}`)
  lines.push(`Precio: ${formatPrice(product.price)}`)
  lines.push('Quiero realizar mi pedido.')
  return waLink(lines.join('\n'))
}

/** Mensaje de WhatsApp para todo el carrito (checkout). */
export function cartWhatsappLink(entries: CartEntry[]): string {
  const lines = ['Hola LUKAY 👋, quiero finalizar mi pedido:', '']
  let total = 0
  let hasPending = false

  for (const { product, color, size, qty } of entries) {
    const priceLabel = product.price == null ? 'consultar' : `$${(product.price * qty).toLocaleString('es-CO')}`
    if (product.price == null) hasPending = true
    else total += product.price * qty
    lines.push(
      `• ${product.name} — ${color.name}${size != null ? ` — Talla ${size}` : ''} — Cant. ${qty} — ${priceLabel}`
    )
  }

  lines.push('')
  if (hasPending && total === 0) {
    lines.push('Todos los productos están sujetos a confirmación de precio.')
  } else if (hasPending) {
    lines.push(`Total estimado: $${total.toLocaleString('es-CO')} + productos a consultar`)
  } else {
    lines.push(`Total: $${total.toLocaleString('es-CO')}`)
  }
  lines.push('')
  lines.push('Quiero confirmar disponibilidad y realizar mi pedido.')

  return waLink(lines.join('\n'))
}

export { formatPrice }
export const whatsappFloatLink = waLink(
  `Hola ${site.name} 👋, quiero conocer más sobre el calzado disponible.`
)
