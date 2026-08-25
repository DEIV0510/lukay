// ─────────────────────────────────────────────────────────────────────────────
// Procesa las fotos reales de Escritorio/LUKAY hacia public/products/<slug>/.
// Fuente de verdad del agrupamiento: MANIFEST (mismo mapeo usado en
// src/data/products.ts).
//
// Normalización de encuadre: las fotos originales traen cantidades de margen
// MUY distintas alrededor del producto (unas son un acercamiento, otras
// muestran el par completo con mucho fondo vacío), lo que hacía que el
// calzado se viera de tamaños distintos tarjeta a tarjeta. Este script:
//   1. Recorta un borde negro delgado (artefacto de exportación, ~4-8px).
//   2. Recorta el fondo de estudio (uniforme, detectado automáticamente).
//   3. Reencuadra el producto ya recortado sobre un lienzo fijo, ocupando
//      siempre el mismo porcentaje del cuadro → tamaño aparente consistente.
// No se toca el diseño/color del producto en ningún punto, solo el encuadre.
// ─────────────────────────────────────────────────────────────────────────────
import sharp from 'sharp'
import { mkdir, readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SOURCE_DIR = 'C:/Users/Lenovo/Desktop/LUKAY'
const DEST_DIR = path.join(__dirname, '..', 'public', 'products')

// slug > color id > archivos fuente en orden de galería
const MANIFEST = {
  // Verificado con la marca: "Baleta Bow Terracota" y la foto de portada de
  // lo que antes era "Slingback Hebilla Aqua" (baletazul.png) son EL MISMO
  // producto — solo cambia el color. baletaazul2.png es la misma silueta en
  // un celeste más claro. Las otras 3 fotos del grupo aqua (slingack,
  // slingback2, slinback3) son un zapato con hebilla totalmente distinto,
  // sin moño — se separan en su propio producto.
  'baleta-bow': {
    terracota: ['baleta.png', 'baleta2.png', 'baleta3.png', 'baleta4.png', 'baleta5.png'],
    azul: ['baletazul.png'],
    celeste: ['baletaazul2.png'],
  },
  'slingback-hebilla-mint': {
    mint: ['slingack.png', 'slingback2.png', 'slinback3.png'],
  },
  'baleta-fina-charol': {
    rojo: ['baletafinacharol.png', 'baletafinacharol2.png', 'baletafinacharol3.png'],
    negro: ['baletafinacharolnegra.png', 'baletafinacharolnegra2.png', 'baletafinacharolnegra3.png'],
  },
  'baleta-peep-toe-flor': {
    vino: ['baletasintetica.png', 'baletasintetica2.png', 'baletasintetica3.png', 'baletasintetica4.png', 'baletasintetica5.png'],
  },
  'slingback-animal-print': {
    leopardo: ['slingbackanimal.png', 'slingbackanimal2.png', 'slingbackanimal3.png', 'slingbackanimal4.png', 'slingbackanimal5.png'],
  },
  'slingback-bicolor': {
    'crema-negro': ['slingbackbicolor.png', 'slingbackbicolor2.png', 'slingbackbicolor3.png', 'slingbackbicolor4.png'],
  },
  'slingback-combinada': {
    crudo: ['slingbackcombinada.png', 'slingbackcombinada2.png', 'slingbackcombinada3.png', 'slingbackcombinada4.png', 'slingbackcombinada5.png', 'slingbackcombinada6.png'],
  },
  'slingback-elegante': {
    camel: ['slingbackelegante.png', 'slingbackelegante2.png', 'slingbackelegante3.png', 'slingbackelegante4.png'],
  },
  'slingback-fina-coquette': {
    chocolate: ['slingbackfinacoquette.png', 'slingbackfinacoquette2.png', 'slingbackfinacoquette3.png', 'slingbackfinacoquette4.png'],
  },
  'slingback-fina-cubano': {
    natural: ['slingbackfinacubano.png', 'slingbackfinacubano2.png', 'slingbackfinacubano3.png'],
    animal: ['slingbackfinacubanoanimal.png', 'slingbackfinacubanoanimal2.png', 'slingbackfinacubanoanimal3.png', 'slingbackfinacubanoanimal4.png', 'slingbackfinacubanoanimal5.png'],
    negro: ['slingbackfinacubanonegra.png', 'slingbackfinacubanonegra2.png', 'slingbackfinacubanonegra3.png', 'slingbackfinacubanonegra4.png'],
  },
  // Verificado foto a foto: "slingbackfinatacon" (1-6) es SIEMPRE el zapato
  // crema/negro de hebilla — el amarillo/vino vive en "slingbackfinataconbajo".
  'slingback-tacon-crema-negro': {
    'crema-negro': ['slingbackfinatacon.png', 'slingbackfinatacon2.png', 'slingbackfinatacon3.png', 'slingbackfinatacon4.png', 'slingbackfinatacon5.png', 'slingbackfinatacon6.png'],
  },
  'slingback-tacon-bow-bicolor': {
    // Fotos 3-6 son tomas dedicadas en amarillo mantequilla; 1-2 son las
    // únicas fotos reales del vino (par compartido) — no hay tomas propias.
    amarillo: ['slingbackfinataconbajo3.png', 'slingbackfinataconbajo4.png', 'slingbackfinataconbajo5.png', 'slingbackfinataconbajo6.png'],
    vino: ['slingbackfinataconbajo.png', 'slingbackfinataconbajo2.png'],
  },
  'slingback-mate-negro': {
    negro: ['slingbackmate.png', 'slingbackmate2.png', 'slingbackmate3.png', 'slingbackmate4.png', 'slingbackmate5.png', 'slingbackmate6.png'],
  },
  'slingback-punta-nude': {
    nude: ['slingbackpunta.png', 'slingbackpunta2.png', 'slingbackpunta3.png'],
  },
}

const SIZES = [
  { suffix: 'full', canvas: 1400, ratio: 5 / 4 }, // ancho x alto = canvas x canvas*ratio
  { suffix: 'card', canvas: 800, ratio: 5 / 4 },
]
const BORDER_INSET = 8 // px — borde negro delgado presente en casi todas las fotos originales
const TRIM_THRESHOLD = 22
const CONTENT_FILL = 0.86 // el producto ocupa ~86% del lienzo final
const PAD_COLOR = '#F6F0E7' // marfil-soft — mismo tono que el fondo de las tarjetas del sitio

async function normalizeToCanvas(srcPath, canvasW, canvasH) {
  const meta = await sharp(srcPath).metadata()
  const w = Math.max(1, meta.width - BORDER_INSET * 2)
  const h = Math.max(1, meta.height - BORDER_INSET * 2)

  const insetBuf = await sharp(srcPath)
    .extract({ left: BORDER_INSET, top: BORDER_INSET, width: w, height: h })
    .png()
    .toBuffer()

  // Materializar el buffer entre extract() y trim() es necesario: encadenados
  // en un mismo pipeline, sharp/vips 0.33 no recalcula bien el bounding box.
  const trimBuf = await sharp(insetBuf).trim({ threshold: TRIM_THRESHOLD }).png().toBuffer()

  const innerW = Math.round(canvasW * CONTENT_FILL)
  const innerH = Math.round(canvasH * CONTENT_FILL)

  return sharp(trimBuf)
    .resize(innerW, innerH, { fit: 'contain', background: PAD_COLOR })
    .resize(canvasW, canvasH, { fit: 'contain', background: PAD_COLOR })
    .webp({ quality: 88 })
    .toBuffer()
}

async function run() {
  let total = 0
  let missing = 0
  const used = new Set()

  for (const [slug, colors] of Object.entries(MANIFEST)) {
    for (const [colorId, files] of Object.entries(colors)) {
      const outDir = path.join(DEST_DIR, slug)
      await mkdir(outDir, { recursive: true })

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        used.add(file.toLowerCase())
        const srcPath = path.join(SOURCE_DIR, file)
        const base = `${colorId}-${i + 1}`

        for (const size of SIZES) {
          const destPath = path.join(outDir, `${base}-${size.suffix}.webp`)
          const canvasW = size.canvas
          const canvasH = Math.round(size.canvas * size.ratio)
          try {
            const buf = await normalizeToCanvas(srcPath, canvasW, canvasH)
            await sharp(buf).toFile(destPath)
            total++
          } catch (err) {
            missing++
            console.error(`✗ ${file} → ${destPath}:`, err.message)
          }
        }
      }
      console.log(`✓ ${slug}/${colorId} — ${files.length} fotos`)
    }
  }

  // Chequeo de cobertura: ¿algún archivo de origen quedó fuera del manifiesto?
  const sourceFiles = (await readdir(SOURCE_DIR)).filter((f) => f.toLowerCase().endsWith('.png') && f.toLowerCase() !== 'logo.png' && f.toLowerCase() !== 'logomejor.png')
  const unused = sourceFiles.filter((f) => !used.has(f.toLowerCase()))
  if (unused.length) {
    console.warn(`\n⚠ ${unused.length} foto(s) de LUKAY no están en el manifiesto:`, unused)
  } else {
    console.log(`\n✓ Las ${sourceFiles.length} fotos de LUKAY están cubiertas por el manifiesto.`)
  }

  console.log(`\nGeneradas ${total} imágenes WebP${missing ? ` (${missing} con error)` : ''}.`)
}

run()
