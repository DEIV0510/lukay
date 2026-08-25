// ─────────────────────────────────────────────────────────────────────────────
// Datos oficiales de LUKAY. Único lugar donde se edita esta información.
// Nada aquí es inventado: viene directo del brief de la marca.
// ─────────────────────────────────────────────────────────────────────────────

export const site = {
  name: 'LUKAY',
  fullName: 'LUKAY Calzado y Accesorios',
  tagline: 'Diseño colombiano. Manos colombianas. Tu propio estilo.',

  whatsapp: '3135054610',
  whatsappIntl: '573135054610',
  whatsappDisplay: '313 505 4610',

  // Cali y Palmira son centros de operación y logística — LUKAY NO tiene
  // tienda física abierta al público. No mostrar dirección exacta.
  operationLabel: 'Cali / Palmira, Colombia',
  country: 'Colombia',
  shippingLabel: 'Envíos a todo Colombia',

  // El usuario dio el @handle de TikTok (link directo y confiable) pero solo
  // el NOMBRE de la página de Facebook, sin URL — no se inventa un slug: se
  // enlaza a la búsqueda exacta de ese nombre en Facebook.
  socials: [
    { name: 'TikTok', handle: '@lukaycalzado', url: 'https://www.tiktok.com/@lukaycalzado' },
    {
      name: 'Facebook',
      handle: 'Lukay Calzado & Accesorios',
      url: 'https://www.facebook.com/search/top?q=Lukay%20Calzado%20%26%20Accesorios',
    },
  ],

  url: 'https://lukaycalzado.com',
} as const

export const waLink = (message: string) =>
  `https://wa.me/${site.whatsappIntl}?text=${encodeURIComponent(message)}`

export const MESSAGES = {
  general: 'Hola LUKAY 👋, quiero conocer más sobre el calzado disponible.',
  catalog: 'Hola LUKAY 👋, quiero ver el catálogo completo y precios.',
  baletas: 'Hola LUKAY 👋, quiero ver las baletas disponibles y sus precios.',
  slingbacks: 'Hola LUKAY 👋, quiero ver los slingbacks disponibles y sus precios.',
  tacones: 'Hola LUKAY 👋, quiero ver los tacones disponibles y sus precios.',
  mocasines: 'Hola LUKAY 👋, quiero ver los mocasines disponibles y sus precios.',
  shipping: 'Hola LUKAY 👋, quiero saber cómo funcionan los envíos a mi ciudad.',
  sizeGuide: 'Hola LUKAY 👋, necesito ayuda para elegir mi talla correcta.',
} as const
