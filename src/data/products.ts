// ─────────────────────────────────────────────────────────────────────────────
// CATÁLOGO LUKAY — fuente de verdad de los productos.
//
// Construido a partir de las 77 fotografías reales de Escritorio/LUKAY,
// agrupadas por producto y color (ver tools/optimize-images.mjs para el
// mapeo foto → producto). Nada aquí está inventado: nombres, materiales,
// color y tipo de taco vienen de observar cada fotografía directamente.
//
// Precio y tallas: se fueron cargando con los datos reales que pasó LUKAY.
// Los productos que aún no tienen dato real quedan en null → la tienda
// muestra "Consultar disponibilidad"/"Consultar tallas" y dirige a WhatsApp.
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
    id: 'baleta-bow',
    slug: 'baleta-bow',
    name: 'Baleta Bow',
    category: 'baletas',
    colors: [
      { id: 'terracota', name: 'Terracota', hex: '#B5694B', images: imgs('baleta-bow', 'terracota', 5) },
      { id: 'azul', name: 'Azul', hex: '#7FA0BC', images: imgs('baleta-bow', 'azul', 1) },
      { id: 'celeste', name: 'Celeste', hex: '#B7DCE3', images: imgs('baleta-bow', 'celeste', 1) },
    ],
    price: 75000,
    oldPrice: null,
    sizes: [35, 36, 37, 38, 39, 40],
    soldOutSizes: [],
    sizeNote: 'Tallas 34 y 41 disponibles sobre pedido',
    material: 'Sintético tipo Lince',
    heel: 'Bajo, 2 cm',
    closure: 'Correa trasera',
    toe: 'Punta redonda',
    description:
      'Baleta versátil en Lince, con moño decorativo al frente y taco bajo de 2 cm para acompañar el paso todo el día. Correa trasera que ajusta el calce sin sacrificar comodidad.',
    features: ['Moño decorativo frontal', 'Material Lince', 'Correa trasera ajustable', 'Disponible en 3 colores'],
    featured: true,
    tags: ['baleta', 'moño', 'terracota', 'azul', 'celeste', 'casual'],
  },
  {
    id: 'slingback-hebilla-mint',
    slug: 'slingback-hebilla-mint',
    name: 'Slingback Hebilla Mint',
    category: 'slingbacks',
    colors: [
      { id: 'mint', name: 'Mint', hex: '#B9DEDD', images: imgs('slingback-hebilla-mint', 'mint', 3) },
    ],
    price: 75000,
    oldPrice: null,
    sizes: [35, 36, 37, 38, 39, 40, 41],
    soldOutSizes: [],
    material: 'Sintético tipo charol',
    heel: 'Bajo, 2 cm',
    closure: 'Correa trasera con hebilla',
    toe: 'Punta cuadrada',
    description:
      'Slingback en charol mint con placa cuadrada de adorno sobre la punta. Correa trasera con hebilla ajustable para un calce seguro y un color que refresca cualquier outfit.',
    features: ['Placa decorativa', 'Charol de brillo elegante', 'Correa trasera con hebilla', 'Taco bajo de 2 cm'],
    featured: true,
    tags: ['slingback', 'mint', 'hebilla', 'charol'],
  },
  {
    id: 'baleta-fina-charol',
    slug: 'baleta-fina-charol',
    name: 'Baleta Fina Charol',
    category: 'mocasines',
    colors: [
      { id: 'rojo', name: 'Rojo con Marfil', hex: '#7A1B23', images: imgs('baleta-fina-charol', 'rojo', 3) },
      { id: 'negro', name: 'Negro con Marfil', hex: '#151515', images: imgs('baleta-fina-charol', 'negro', 3) },
    ],
    price: 85000,
    oldPrice: null,
    sizes: [35, 36, 37, 38, 39, 40],
    soldOutSizes: [],
    material: 'Sintético premium de acabado charol',
    heel: 'Bajo, 2 cm',
    closure: 'Sin correa (mocasín cerrado)',
    toe: 'Punta fina',
    description:
      'Baleta de punta fina en charol con tacón bajo de 2 cm, un diseño clásico renovado con contrastes que le dan personalidad. Banda frontal contrastante con textura y hebilla geométrica forrada al tono, el detalle protagonista de la referencia.',
    features: ['Banda contrastante texturizada', 'Hebilla geométrica forrada al tono', 'Charol brillante', 'Taco bajo de 2 cm'],
    featured: true,
    tags: ['baleta', 'charol', 'hebilla', 'clasico'],
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
    price: 85000,
    oldPrice: null,
    sizes: [35, 36, 37, 38, 39, 40, 41],
    soldOutSizes: [],
    material: 'Sintético de alta calidad',
    heel: 'Bajo, 2 cm',
    closure: 'Correa trasera con hebilla forrada',
    toe: 'Punta afilada',
    description:
      'Contraste crema y negro con hebilla forrada y suela texana. Un slingback en sintéticos de alta calidad, de taco bajo que estiliza el paso sin perder comodidad.',
    features: ['Hebilla forrada al tono', 'Suela texana', 'Sintético de alta calidad', 'Taco bajo de 2 cm'],
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
    price: 75000,
    oldPrice: null,
    sizes: null,
    soldOutSizes: [],
    material: 'Efecto pitón con tiras texturizadas',
    heel: 'Bajo, 2 cm, forrado',
    closure: 'Tiras cruzadas con hebillas redondas forradas',
    toe: 'Punta afilada',
    description:
      'Disponible en 3 combinaciones de color. Tiras cruzadas con hebillas redondas forradas y tacón bajo forrado de 2 cm. La foto muestra la combinación crudo — también existe en azul y leopardo, consulta disponibilidad por WhatsApp.',
    features: ['Disponible en 3 combinaciones de color', 'Tiras cruzadas con hebillas redondas forradas', 'Tacón forrado de 2 cm', 'También disponible en azul y leopardo (consultar)'],
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
    price: 68000,
    oldPrice: null,
    sizes: [35, 36, 37, 38, 39, 40],
    soldOutSizes: [],
    material: 'Charol en textura elegante (efecto pitón)',
    heel: 'Bajo, 2 cm',
    closure: 'Correa trasera con hebilla',
    toe: 'Punta afilada',
    description:
      'Vamp limpio en charol con textura elegante tipo pitón, sin adornos, para quien prefiere la elegancia discreta. Correa trasera con hebilla y taco bajo cómodo para el día completo.',
    features: ['Vamp limpio sin adornos', 'Charol textura pitón', 'Correa trasera con hebilla', 'Taco bajo de 2 cm'],
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
    price: 125000,
    oldPrice: null,
    sizes: [35, 36, 37, 38, 39, 40, 41],
    soldOutSizes: [],
    material: 'Acabado aterciopelado con detalles dorados',
    heel: 'Medio tipo carrete, 5.5 cm, forrado',
    closure: 'Correa trasera con hebilla',
    toe: 'Punta fina',
    description:
      'Estilo coquette con moño al tono como detalle protagonista. Acabado aterciopelado en café realzado con pequeños puntos dorados, y tacón medio tipo carrete de 5,5 cm que ofrece una base más estable que un tacón fino tradicional.',
    features: ['Acabado aterciopelado con puntos dorados', 'Moño al tono', 'Tacón carrete forrado de 5,5 cm', 'Correa trasera con hebilla'],
    featured: true,
    tags: ['tacon', 'coquette', 'chocolate', 'lunares'],
  },
  {
    id: 'slingback-fina-cubano',
    slug: 'slingback-fina-cubano',
    name: 'Slingback Fina Cubano',
    category: 'tacones',
    colors: [
      { id: 'natural', name: 'Marfil', hex: '#E3D0B4', images: imgs('slingback-fina-cubano', 'natural', 3) },
      { id: 'negro', name: 'Negro', hex: '#171717', images: imgs('slingback-fina-cubano', 'negro', 4) },
    ],
    price: 135000,
    oldPrice: null,
    sizes: [35, 36, 37, 38, 39, 40, 41],
    soldOutSizes: [],
    material: 'Sintético tipo lince de tacto suave con microbrillos',
    heel: 'Cubano forrado, 5.5 cm',
    closure: 'Correa trasera con hebilla',
    toe: 'Punta fina',
    description:
      'Diseño femenino y elegante en sintético tipo lince de tacto suave, con delicados microbrillos que aportan luminosidad sin perder su acabado sofisticado. Moño frontal al tono y tacón cubano forrado de 5,5 cm, ideal para quienes buscan altura media con mayor estabilidad.',
    features: ['Microbrillos sobre el material', 'Moño al tono', 'Tacón cubano forrado de 5,5 cm', 'Correa trasera con hebilla'],
    featured: true,
    tags: ['tacon', 'cubano', 'moño', 'lince'],
  },
  {
    id: 'slingback-cubano-animal',
    slug: 'slingback-cubano-animal',
    name: 'Slingback Cubano Animal Print',
    category: 'tacones',
    colors: [
      { id: 'animal', name: 'Animal Print', hex: '#8A6534', images: imgs('slingback-fina-cubano', 'animal', 5) },
    ],
    price: 115000,
    oldPrice: null,
    sizes: null,
    soldOutSizes: [],
    material: 'Sintético premium de acabado charol',
    heel: 'Cubano forrado, 3.5 cm',
    closure: 'Correa trasera con hebilla',
    toe: 'Punta fina',
    description:
      'Diseño clásico con un detalle animal print lleno de personalidad: moño frontal en sintético de alta calidad con estampado animal print (negro y moca) sobre charol de superficie lisa y brillo elegante. Tacón cubano forrado de 3,5 cm, altura baja y estable.',
    features: ['Moño en sintético animal print', 'Charol de brillo elegante', 'Tacón cubano forrado de 3,5 cm', 'Correa trasera con hebilla'],
    featured: false,
    tags: ['tacon', 'cubano', 'animal print', 'moño'],
  },
  {
    id: 'slingback-tacon-crema-negro',
    slug: 'slingback-tacon-crema-negro',
    name: 'Tacón Hebilla Marfil y Negro',
    category: 'tacones',
    colors: [
      { id: 'crema-negro', name: 'Marfil y Negro', hex: '#EDE6DA', images: imgs('slingback-tacon-crema-negro', 'crema-negro', 6) },
    ],
    price: 110000,
    oldPrice: null,
    sizes: [35, 36, 37, 38, 39, 40],
    soldOutSizes: [],
    material: 'Sintético premium de acabado mate y tacto suave',
    heel: 'Kitten heel bajo, 3 cm',
    closure: 'Correa trasera con hebilla dorada',
    toe: 'Punta fina',
    description:
      'Cerrado en la parte delantera con un elegante aplique geométrico negro que crea un contraste moderno y sofisticado. Tacón kitten heel bajo de 3 cm, ligeramente acampanado, ideal para oficina o para elevar un look diario sin necesidad de un tacón alto.',
    features: ['Aplique geométrico negro', 'Acabado mate y tacto suave', 'Kitten heel bajo de 3 cm', 'Correa trasera con hebilla'],
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
      { id: 'vino', name: 'Vino/Borgoña', hex: '#601A28', images: imgs('slingback-tacon-bow-bicolor', 'vino', 2) },
    ],
    price: 95000,
    oldPrice: null,
    sizes: [35, 36, 37, 38, 39, 40],
    soldOutSizes: [],
    material: 'Sintético premium de acabado charol',
    heel: 'Kitten heel bajo, 3 cm',
    closure: 'Correa trasera con hebilla',
    toe: 'Punta fina',
    description:
      'Diseño femenino y fácil de llevar de día o de noche. Moño frontal al tono en charol de brillo elegante, con tacón bajo tipo kitten heel de 3 cm forrado al tono que ofrece una silueta estilizada sin necesidad de un tacón alto.',
    features: ['Moño al tono en charol', 'Kitten heel bajo de 3 cm', 'Correa trasera con hebilla', 'Disponible en 2 colores'],
    featured: true,
    tags: ['tacon', 'moño', 'amarillo', 'vino'],
  },
  {
    id: 'slingback-mate-nude',
    slug: 'slingback-mate-nude',
    name: 'Slingback Mate Nude',
    category: 'slingbacks',
    colors: [
      { id: 'nude', name: 'Nude', hex: '#E8C4B8', images: imgs('slingback-mate-nude', 'nude', 6) },
    ],
    price: null,
    oldPrice: null,
    sizes: [35, 36, 37, 38, 39, 40, 41],
    soldOutSizes: [],
    material: 'Sintético mate con textura tejida',
    heel: 'Bajo, 2 cm',
    closure: 'Correa trasera con hebilla dorada',
    toe: 'Punta afilada',
    description:
      'Nude en sintético mate con textura tejida y hebilla dorada. Un básico versátil de taco bajo que combina con todo el clóset.',
    features: ['Textura tejida mate', 'Hebilla dorada', 'Correa trasera ajustable', 'Taco bajo de 2 cm'],
    featured: false,
    tags: ['slingback', 'nude', 'mate', 'tejido'],
  },
  {
    id: 'slingback-punta-nude',
    slug: 'slingback-punta-nude',
    name: 'Slingback Punta Nude',
    category: 'tacones',
    colors: [
      { id: 'nude', name: 'Nude', hex: '#E2B79C', images: imgs('slingback-punta-nude', 'nude', 3) },
    ],
    price: 125000,
    oldPrice: null,
    sizes: [35, 36, 37, 38, 39, 40, 41],
    soldOutSizes: [],
    sizeNote: 'Talla 42 disponible sobre pedido',
    material: 'Sintético premium de acabado tipo charol',
    heel: 'Medio, 5.5 cm, forrado al tono',
    closure: 'Correa trasera con hebilla dorada',
    toe: 'Punta fina',
    description:
      'Cerrado adelante y realzado con un elegante herraje geométrico dorado que aporta un toque sofisticado y femenino. Superficie lisa y brillo elegante, con tacón forrado al tono que logra una silueta estilizada y versátil para looks ejecutivos, eventos o conjuntos más casuales. También disponible en Verde Salvia — consulta disponibilidad por WhatsApp.',
    features: ['Herraje geométrico dorado', 'Tacón forrado al tono, 5,5 cm', 'Correa slingback con hebilla', 'También disponible en Verde Salvia (consultar)'],
    featured: false,
    tags: ['tacon', 'nude', 'hebilla'],
  },
]

export const productBySlug = new Map(products.map((p) => [p.slug, p]))
export const featuredProducts = products.filter((p) => p.featured)
