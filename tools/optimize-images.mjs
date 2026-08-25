// ─────────────────────────────────────────────────────────────────────────────
// Procesa las fotos reales de Escritorio/LUKAY hacia public/products/<slug>/.
// Fuente de verdad del agrupamiento: MANIFEST (mismo mapeo usado en
// src/data/products.ts). No recorta ni retoca el producto: solo redimensiona
// y comprime a WebP en 2 anchos (full para galería, card para grillas).
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
  'baleta-bow-terracota': {
    terracota: ['baleta.png', 'baleta2.png', 'baleta3.png', 'baleta4.png', 'baleta5.png'],
  },
  'baleta-bow-celeste': {
    celeste: ['baletaazul2.png'],
  },
  'baleta-fina-charol': {
    rojo: ['baletafinacharol.png', 'baletafinacharol2.png', 'baletafinacharol3.png'],
    negro: ['baletafinacharolnegra.png', 'baletafinacharolnegra2.png', 'baletafinacharolnegra3.png'],
  },
  'baleta-peep-toe-flor': {
    vino: ['baletasintetica.png', 'baletasintetica2.png', 'baletasintetica3.png', 'baletasintetica4.png', 'baletasintetica5.png'],
  },
  'slingback-hebilla-aqua': {
    aqua: ['baletazul.png', 'slingack.png', 'slingback2.png', 'slinback3.png'],
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
  { suffix: 'full', width: 1100 },
  { suffix: 'card', width: 560 },
]

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
          try {
            await sharp(srcPath)
              .resize({ width: size.width, withoutEnlargement: true })
              .webp({ quality: 84 })
              .toFile(destPath)
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
  const sourceFiles = (await readdir(SOURCE_DIR)).filter((f) => f.toLowerCase().endsWith('.png'))
  const unused = sourceFiles.filter((f) => !used.has(f.toLowerCase()))
  if (unused.length) {
    console.warn(`\n⚠ ${unused.length} foto(s) de LUKAY no están en el manifiesto:`, unused)
  } else {
    console.log(`\n✓ Las ${sourceFiles.length} fotos de LUKAY están cubiertas por el manifiesto.`)
  }

  console.log(`\nGeneradas ${total} imágenes WebP${missing ? ` (${missing} con error)` : ''}.`)
}

run()
