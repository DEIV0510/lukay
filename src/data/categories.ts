// ─────────────────────────────────────────────────────────────────────────────
// Categorías reales del inventario LUKAY. Ajustadas a lo que existe de verdad
// en las fotos (no hay plataformas, deportivos ni accesorios todavía —
// cuando existan, se agregan aquí sin tocar el resto del catálogo).
// ─────────────────────────────────────────────────────────────────────────────
import type { CategoryId } from '@/types'

export interface Category {
  id: CategoryId
  slug: string
  label: string
  short: string
  description: string
  cover: string
}

export const categories: Category[] = [
  {
    id: 'baletas',
    slug: 'baletas',
    label: 'Baletas',
    short: 'Baletas',
    description: 'Comodidad con carácter, para caminar todo el día.',
    cover: '/products/baleta-peep-toe-flor/vino-1-card.webp',
  },
  {
    id: 'slingbacks',
    slug: 'slingbacks',
    label: 'Slingbacks',
    short: 'Slingbacks',
    description: 'La correa trasera que estiliza cada paso.',
    cover: '/products/slingback-combinada/crudo-1-card.webp',
  },
  {
    id: 'tacones',
    slug: 'tacones',
    label: 'Tacones',
    short: 'Tacones',
    description: 'Elegancia con altura justa, sin sacrificar el paso.',
    cover: '/products/slingback-tacon-amarillo/amarillo-1-card.webp',
  },
  {
    id: 'mocasines',
    slug: 'mocasines',
    label: 'Mocasines',
    short: 'Mocasines',
    description: 'La línea clásica, reinterpretada en charol.',
    cover: '/products/baleta-fina-charol/rojo-1-card.webp',
  },
]

export const categoryById = new Map(categories.map((c) => [c.id, c]))
