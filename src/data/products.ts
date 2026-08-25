// ─────────────────────────────────────────────────────────────────────────────
// CATÁLOGO LUKAY — fuente de verdad de los productos.
//
// Construido a partir de las 77 fotografías reales de Escritorio/LUKAY,
// agrupadas por producto y color (ver tools/optimize-images.mjs para el
// mapeo foto → producto). Nada aquí está inventado: nombres, materiales,
// color y tipo de taco vienen de observar cada fotografía directamente.
//
// Precio y tallas: LUKAY no tiene aún una lista de precios/tallas por
// referencia, así que quedan en null → la tienda muestra "Consultar
// disponibilidad" y dirige a WhatsApp, tal como pidió la marca.
//
// CÓMO ADMINISTRAR:
//   • Poner precio real   → price: 129000        (entero, sin puntos)
//   • Precio de oferta    → oldPrice: 159000      (se tacha automático)
//   • Tallas reales       → sizes: [35,36,37,38,39,40]
//   • Talla agotada       → soldOutSizes: [35]
//   • Destacar en home    → featured: true
// ─────────────────────────────────────────────────────────────────────────────
import type { Product, ProductImage } from '@/types'

function imgs(slug: string, colorId: string, count: number): ProductImage[] {
  return Array.from({ length: count }, (_, i) => ({
    full: `/products/${slug}/${colorId}-${i + 1}-full.webp`,
    card: `/products/${slug}/${colorId}-${i + 1}-card.webp`,
  }))
}

export const products: Product[] = [
  {
    id: 'baleta-bow-terracota',
    slug: 'baleta-bow-terracota',
    name: 'Baleta Bow Terracota',
    category: 'baletas',
    colors: [
      { id: 'terracota', name: 'Terracota', hex: '#B5694B', images: imgs('baleta-bow-terracota', 'terracota', 5) },
    ],
    price: null,
    oldPrice: null,
    sizes: null,
    soldOutSizes: [],
    material: 'Sintético tipo charol',
    heel: 'Taco bajo, aprox. 2 cm',
    closure: 'Correa trasera',
    toe: 'Punta redonda',
    description:
      'Una baleta versátil en terracota, con moño decorativo al frente y taco bajo para acompañar el paso todo el día. Correa trasera que ajusta el calce sin sacrificar comodidad.',
    features: ['Moño decorativo frontal', 'Taco bajo de apoyo', 'Correa trasera ajustable', 'Punta redonda'],
    featured: true,
    tags: ['baleta', 'moño', 'terracota', 'casual'],
  },
  {
    id: 'baleta-bow-celeste',
    slug: 'baleta-bow-celeste',
    name: 'Baleta Bow Celeste',
    category: 'baletas',
    colors: [
      { id: 'celeste', name: 'Celeste', hex: '#B7DCE3', images: imgs('baleta-bow-celeste', 'celeste', 1) },
    ],
    price: null,
    oldPrice: null,
    sizes: null,
    soldOutSizes: [],
    material: 'Sintético tipo charol',
    heel: 'Plana',
    closure: 'Correa trasera',
    toe: 'Punta redonda',
    description:
      'La misma silueta de moño en un celeste fresco, ideal para looks diurnos. Base plana y correa trasera para un calce firme y liviano.',
    features: ['Moño decorativo frontal', 'Base plana', 'Correa trasera ajustable'],
    featured: false,
    tags: ['baleta', 'moño', 'celeste', 'casual'],
  },
  {
    id: 'baleta-fina-charol',
    slug: 'baleta-fina-charol',
    name: 'Mocasín Fina Charol',
    category: 'mocasines',
    colors: [
      { id: 'rojo', name: 'Rojo', hex: '#7A1B23', images: imgs('baleta-fina-charol', 'rojo', 3) },
      { id: 'negro', name: 'Negro', hex: '#151515', images: imgs('baleta-fina-charol', 'negro', 3) },
    ],
    price: null,
    oldPrice: null,
    sizes: null,
    soldOutSizes: [],
    material: 'Charol bicolor',
    heel: 'Taco bajo, aprox. 1.5 cm',
    closure: 'Sin correa (mocasín cerrado)',
    toe: 'Punta afilada',
    description:
      'Mocasín de charol con hebilla geométrica en contraste blanco/color. Silueta cerrada y elegante, pensada para uso diario con un guiño clásico.',
    features: ['Hebilla geométrica de adorno', 'Charol brillante bicolor', 'Taco bajo de apoyo', 'Disponible en rojo y negro'],
    featured: true,
    tags: ['mocasin', 'charol', 'hebilla', 'clasico'],
  },
  {
    id: 'baleta-peep-toe-flor',
    slug: 'baleta-peep-toe-flor',
    name: 'Baleta Peep Toe Flor',
    category: 'baletas',
    colors: [
      { id: 'vino', name: 'Vino', hex: '#5C1420', images: imgs('baleta-peep-toe-flor', 'vino', 5) },
    ],
    price: null,
    oldPrice: null,
    sizes: null,
    soldOutSizes: [],
    material: 'Charol y gamuza combinados',
    heel: 'Taco bajo, aprox. 2 cm',
    closure: 'Cerrada, sin correa',
    toe: 'Peep toe (punta abierta)',
    description:
      'Baleta de punta abierta en vino, con flor dorada de adorno y combinación de charol y gamuza. Un detalle femenino para looks que piden un poco más de vuelo.',
    features: ['Punta abierta (peep toe)', 'Flor decorativa dorada', 'Combinación charol + gamuza', 'Taco bajo de apoyo'],
    featured: true,
    tags: ['baleta', 'peep toe', 'vino', 'flor'],
  },
  {
    id: 'slingback-hebilla-aqua',
    slug: 'slingback-hebilla-aqua',
    name: 'Slingback Hebilla Aqua',
    category: 'slingbacks',
    colors: [
      { id: 'aqua', name: 'Aqua', hex: '#8FD0C6', images: imgs('slingback-hebilla-aqua', 'aqua', 4) },
    ],
    price: null,
    oldPrice: null,
    sizes: null,
    soldOutSizes: [],
    material: 'Sintético tipo charol',
    heel: 'Plana',
    closure: 'Correa trasera con hebilla',
    toe: 'Punta cuadrada',
    description:
      'Slingback en aqua con placa dorada cuadrada de adorno sobre la punta. Correa trasera con hebilla ajustable para un calce seguro y un color que refresca cualquier outfit.',
    features: ['Placa dorada decorativa', 'Correa trasera con hebilla', 'Punta cuadrada', 'Base plana'],
    featured: true,
    tags: ['slingback', 'aqua', 'hebilla'],
  },
  {
    id: 'slingback-animal-print',
    slug: 'slingback-animal-print',
    name: 'Slingback Animal Print',
    category: 'slingbacks',
    colors: [
      { id: 'leopardo', name: 'Leopardo', hex: '#9C7A45', images: imgs('slingback-animal-print', 'leopardo', 5) },
    ],
    price: null,
    oldPrice: null,
    sizes: null,
    soldOutSizes: [],
    material: 'Gamuza animal print',
    heel: 'Taco bajo, aprox. 2 cm',
    closure: 'Correa trasera con hebilla',
    toe: 'Punta afilada',
    description:
      'El estampado animal print en gamuza, con barra dorada de adorno y correa trasera. Un básico con carácter que combina con todo.',
    features: ['Estampado animal print', 'Barra dorada decorativa', 'Correa trasera con hebilla', 'Taco bajo de apoyo'],
    featured: true,
    tags: ['slingback', 'animal print', 'leopardo'],
  },
  {
    id: 'slingback-bicolor',
    slug: 'slingback-bicolor',
    name: 'Slingback Bicolor',
    category: 'slingbacks',
    colors: [
      { id: 'crema-negro', name: 'Crema y Negro', hex: '#EDE6DA', images: imgs('slingback-bicolor', 'crema-negro', 4) },
    ],
    price: null,
    oldPrice: null,
    sizes: null,
    soldOutSizes: [],
    material: 'Sintético liso',
    heel: 'Taco bajo, aprox. 3 cm',
    closure: 'Correa trasera con hebilla',
    toe: 'Punta afilada',
    description:
      'Contraste crema y negro con placa geométrica de adorno sobre la punta. Un slingback de taco bajo que estiliza el paso sin perder comodidad.',
    features: ['Placa geométrica en contraste', 'Correa trasera con hebilla', 'Taco bajo estable', 'Punta afilada'],
    featured: false,
    tags: ['slingback', 'bicolor', 'crema', 'negro'],
  },
  {
    id: 'slingback-combinada',
    slug: 'slingback-combinada',
    name: 'Slingback Combinada',
    category: 'slingbacks',
    colors: [
      { id: 'crudo', name: 'Crudo', hex: '#E7D7BE', images: imgs('slingback-combinada', 'crudo', 6) },
    ],
    price: null,
    oldPrice: null,
    sizes: null,
    soldOutSizes: [],
    material: 'Efecto pitón con tiras texturizadas',
    heel: 'Taco bajo, aprox. 2 cm',
    closure: 'Tiras cruzadas con doble hebilla',
    toe: 'Punta afilada',
    description:
      'Base en efecto pitón con tiras cruzadas texturizadas y doble hebilla dorada. Esta línea también existe en azul y leopardo — consulta disponibilidad por WhatsApp.',
    features: ['Tiras cruzadas con doble hebilla', 'Textura efecto pitón', 'Taco bajo de apoyo', 'También disponible en azul y leopardo (consultar)'],
    featured: true,
    tags: ['slingback', 'combinada', 'piton', 'crudo'],
  },
  {
    id: 'slingback-elegante',
    slug: 'slingback-elegante',
    name: 'Slingback Elegante Camel',
    category: 'slingbacks',
    colors: [
      { id: 'camel', name: 'Camel', hex: '#C69C68', images: imgs('slingback-elegante', 'camel', 4) },
    ],
    price: null,
    oldPrice: null,
    sizes: null,
    soldOutSizes: [],
    material: 'Efecto pitón',
    heel: 'Taco bajo, aprox. 2 cm',
    closure: 'Correa trasera con hebilla',
    toe: 'Punta afilada',
    description:
      'Vamp limpio en efecto pitón camel, sin adornos, para quien prefiere la elegancia discreta. Correa trasera con hebilla y taco bajo cómodo para el día completo.',
    features: ['Vamp limpio sin adornos', 'Textura efecto pitón', 'Correa trasera con hebilla', 'Taco bajo de apoyo'],
    featured: false,
    tags: ['slingback', 'camel', 'piton', 'elegante'],
  },
  {
    id: 'slingback-fina-coquette',
    slug: 'slingback-fina-coquette',
    name: 'Slingback Fina Coquette',
    category: 'tacones',
    colors: [
      { id: 'chocolate', name: 'Chocolate', hex: '#4A3320', images: imgs('slingback-fina-coquette', 'chocolate', 4) },
    ],
    price: null,
    oldPrice: null,
    sizes: null,
    soldOutSizes: [],
    material: 'Gamuza con micro-lunares dorados',
    heel: 'Tacón medio, aprox. 6 cm',
    closure: 'Correa trasera con hebilla',
    toe: 'Punta afilada',
    description:
      'Gamuza chocolate salpicada de micro-lunares dorados, con moño al frente y tacón medio de silueta acopada. El punto justo entre cómodo y elegante.',
    features: ['Micro-lunares dorados', 'Moño decorativo', 'Tacón medio acopado', 'Correa trasera con hebilla'],
    featured: true,
    tags: ['tacon', 'coquette', 'chocolate', 'lunares'],
  },
  {
    id: 'slingback-fina-cubano',
    slug: 'slingback-fina-cubano',
    name: 'Slingback Fina Cubano',
    category: 'tacones',
    colors: [
      { id: 'natural', name: 'Natural', hex: '#E3D0B4', images: imgs('slingback-fina-cubano', 'natural', 3) },
      { id: 'animal', name: 'Animal Print', hex: '#8A6534', images: imgs('slingback-fina-cubano', 'animal', 5) },
      { id: 'negro', name: 'Negro', hex: '#171717', images: imgs('slingback-fina-cubano', 'negro', 4) },
    ],
    price: null,
    oldPrice: null,
    sizes: null,
    soldOutSizes: [],
    material: 'Charol y gamuza según color',
    heel: 'Tacón cubano, aprox. 5 cm',
    closure: 'Correa trasera con hebilla',
    toe: 'Punta afilada',
    description:
      'Moño con micro-tachuelas y tacón cubano de 5 cm, en tres versiones: natural, animal print y negro. La línea más versátil para pasar del día a la noche.',
    features: ['Moño con micro-tachuelas', 'Tacón cubano estable', 'Correa trasera con hebilla', 'Disponible en 3 colores'],
    featured: true,
    tags: ['tacon', 'cubano', 'moño', 'animal print'],
  },
  {
    id: 'slingback-tacon-crema-negro',
    slug: 'slingback-tacon-crema-negro',
    name: 'Tacón Hebilla Crema y Negro',
    category: 'tacones',
    colors: [
      { id: 'crema-negro', name: 'Crema y Negro', hex: '#EDE6DA', images: imgs('slingback-tacon-crema-negro', 'crema-negro', 6) },
    ],
    price: null,
    oldPrice: null,
    sizes: null,
    soldOutSizes: [],
    material: 'Sintético liso',
    heel: 'Tacón carrete, aprox. 5 cm',
    closure: 'Correa trasera con hebilla',
    toe: 'Punta afilada',
    description:
      'Placa geométrica en negro sobre base crema y tacón carrete estable. Un contraste clásico que se acomoda a la oficina y a la noche por igual.',
    features: ['Placa geométrica en contraste', 'Tacón carrete estable', 'Correa trasera con hebilla', 'Punta afilada'],
    featured: false,
    tags: ['tacon', 'crema', 'negro', 'hebilla'],
  },
  {
    id: 'slingback-tacon-bow-bicolor',
    slug: 'slingback-tacon-bow-bicolor',
    name: 'Tacón Bow Amarillo y Vino',
    category: 'tacones',
    colors: [
      { id: 'amarillo', name: 'Amarillo Mantequilla', hex: '#F1E6A8', images: imgs('slingback-tacon-bow-bicolor', 'amarillo', 4) },
      { id: 'vino', name: 'Vino', hex: '#601A28', images: imgs('slingback-tacon-bow-bicolor', 'vino', 2) },
    ],
    price: null,
    oldPrice: null,
    sizes: null,
    soldOutSizes: [],
    material: 'Charol brillante',
    heel: 'Tacón medio, aprox. 5 cm',
    closure: 'Correa trasera con hebilla',
    toe: 'Punta afilada',
    description:
      'Moño de charol brillante sobre tacón medio, en amarillo mantequilla y vino. Un statement de color para quien no le teme a destacar.',
    features: ['Moño de charol brillante', 'Tacón medio acopado', 'Correa trasera con hebilla', 'Disponible en 2 colores'],
    featured: true,
    tags: ['tacon', 'moño', 'amarillo', 'vino'],
  },
  {
    id: 'slingback-mate-negro',
    slug: 'slingback-mate-negro',
    name: 'Slingback Mate Negro',
    category: 'tacones',
    colors: [
      { id: 'negro', name: 'Negro', hex: '#1B1B1B', images: imgs('slingback-mate-negro', 'negro', 6) },
    ],
    price: null,
    oldPrice: null,
    sizes: null,
    soldOutSizes: [],
    material: 'Gamuza mate',
    heel: 'Tacón medio, aprox. 5 cm',
    closure: 'Correa trasera con hebilla',
    toe: 'Punta afilada',
    description:
      'El negro absoluto en gamuza mate, con moño de micro-tachuelas y tacón medio acopado. El infalible que combina con todo el clóset.',
    features: ['Gamuza mate', 'Moño con micro-tachuelas', 'Tacón medio acopado', 'Correa trasera con hebilla'],
    featured: false,
    tags: ['tacon', 'negro', 'mate', 'moño'],
  },
  {
    id: 'slingback-punta-nude',
    slug: 'slingback-punta-nude',
    name: 'Slingback Punta Nude',
    category: 'tacones',
    colors: [
      { id: 'nude', name: 'Nude', hex: '#E2B79C', images: imgs('slingback-punta-nude', 'nude', 3) },
    ],
    price: null,
    oldPrice: null,
    sizes: null,
    soldOutSizes: [],
    material: 'Sintético tipo charol',
    heel: 'Tacón bajo, aprox. 4 cm',
    closure: 'Correa trasera con hebilla',
    toe: 'Punta afilada',
    description:
      'Nude versátil con placa dorada geométrica de adorno y tacón bajo cómodo. El básico que estiliza la pierna sin esfuerzo.',
    features: ['Placa dorada decorativa', 'Tacón bajo cómodo', 'Correa trasera con hebilla', 'Punta afilada'],
    featured: false,
    tags: ['tacon', 'nude', 'hebilla'],
  },
]

export const productBySlug = new Map(products.map((p) => [p.slug, p]))
export const featuredProducts = products.filter((p) => p.featured)
