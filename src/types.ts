export type CategoryId = 'baletas' | 'slingbacks' | 'tacones' | 'mocasines'

export interface ProductImage {
  full: string
  card: string
}

export interface ProductColor {
  id: string
  name: string
  hex: string
  images: ProductImage[]
}

export interface Product {
  id: string
  slug: string
  name: string
  category: CategoryId
  colors: ProductColor[]
  /** Precio en COP, o null si aún no hay dato real → "Consultar disponibilidad". */
  price: number | null
  oldPrice: number | null
  /** Tallas reales disponibles, o null si no hay dato real → "Consultar tallas". */
  sizes: number[] | null
  soldOutSizes: number[]
  /** Nota corta sobre tallas fuera del rango estándar, ej. "Talla 42 disponible sobre pedido". */
  sizeNote?: string
  material: string
  heel: string
  closure: string
  toe: string
  description: string
  features: string[]
  featured: boolean
  tags: string[]
}

export interface CartLine {
  slug: string
  colorId: string
  size: number | null
  qty: number
}

export interface CartEntry {
  product: Product
  color: ProductColor
  size: number | null
  qty: number
}
