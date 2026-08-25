import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ChevronRight, MessageCircle, ShoppingBag } from 'lucide-react'
import { productBySlug, products } from '@/data/products'
import { categoryById } from '@/data/categories'
import { useStore } from '@/store/StoreContext'
import { productWhatsappLink } from '@/lib/whatsapp'
import Gallery from '@/components/product/Gallery'
import ColorSwatch from '@/components/ui/ColorSwatch'
import Price from '@/components/ui/Price'
import { Button, LinkButton } from '@/components/ui/Button'
import ProductCard from '@/components/catalog/ProductCard'

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>()
  const product = slug ? productBySlug.get(slug) : undefined

  const [colorIdx, setColorIdx] = useState(0)
  const [size, setSize] = useState<number | null>(null)
  const { addToCart, setCartOpen } = useStore()

  useEffect(() => {
    setColorIdx(0)
    setSize(null)
  }, [slug])

  useEffect(() => {
    if (!product) return
    document.title = `${product.name} | LUKAY`
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', `${product.name} — ${product.description}`)
  }, [product])

  const related = useMemo(() => {
    if (!product) return []
    return products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4)
  }, [product])

  if (!product) return <Navigate to="/coleccion" replace />

  const color = product.colors[colorIdx]
  const category = categoryById.get(product.category)!
  const needsSize = !!product.sizes?.length

  const canOrder = !needsSize || size != null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: color.images.map((i) => i.full),
    category: category.label,
    brand: { '@type': 'Brand', name: 'LUKAY' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'COP',
      availability: 'https://schema.org/InStock',
      ...(product.price != null ? { price: product.price } : {}),
    },
  }

  return (
    <div className="container-lk py-8 sm:py-12">
      {/* eslint-disable-next-line react/no-danger */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <nav className="mb-6 flex items-center gap-1.5 text-2xs uppercase tracking-wideish text-taupe">
        <Link to="/" className="hover:text-ink">Inicio</Link>
        <ChevronRight size={12} />
        <Link to={`/coleccion/${category.slug}`} className="hover:text-ink">{category.label}</Link>
        <ChevronRight size={12} />
        <span className="text-ink/70">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <Gallery images={color.images} productName={product.name} />

        <div className="lg:max-w-md">
          <h1 className="font-display text-3xl leading-tight text-ink sm:text-4xl">{product.name}</h1>
          <Price price={product.price} oldPrice={product.oldPrice} className="mt-3 text-lg" />

          {product.colors.length > 1 && (
            <div className="mt-6">
              <p className="eyebrow text-ink/50">Color — {color.name}</p>
              <div className="mt-2.5 flex flex-wrap gap-2.5">
                {product.colors.map((c, i) => (
                  <ColorSwatch key={c.id} hex={c.hex} name={c.name} active={i === colorIdx} onClick={() => setColorIdx(i)} />
                ))}
              </div>
            </div>
          )}
          {product.colors.length === 1 && <p className="mt-6 text-sm text-ink/70">Color: {color.name}</p>}

          <div className="mt-6">
            <p className="eyebrow text-ink/50">Talla</p>
            {needsSize ? (
              <div className="mt-2.5 flex flex-wrap gap-2">
                {product.sizes!.map((s) => {
                  const soldOut = product.soldOutSizes.includes(s)
                  return (
                    <button
                      key={s}
                      disabled={soldOut}
                      onClick={() => setSize(s)}
                      className={`h-11 w-11 rounded-card border text-sm transition-colors ${
                        soldOut
                          ? 'cursor-not-allowed border-ink/10 text-taupe/40 line-through'
                          : s === size
                            ? 'border-ink bg-ink text-marfil'
                            : 'border-ink/20 text-ink hover:border-ink'
                      }`}
                    >
                      {s}
                    </button>
                  )
                })}
              </div>
            ) : (
              <p className="mt-2 text-sm text-ink/70">Consultar tallas disponibles por WhatsApp.</p>
            )}
            {product.sizeNote && <p className="mt-2 text-2xs text-taupe">{product.sizeNote}</p>}
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <LinkButton
              as="a"
              href={productWhatsappLink(product, color, size)}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              fullWidth
              icon={<MessageCircle size={17} />}
            >
              Comprar por WhatsApp
            </LinkButton>
            <Button
              variant="secondary"
              fullWidth
              icon={<ShoppingBag size={16} />}
              disabled={!canOrder}
              onClick={() => {
                addToCart(product, color.id, size)
                setCartOpen(true)
              }}
            >
              Agregar al carrito
            </Button>
            {needsSize && !canOrder && (
              <p className="text-center text-2xs text-taupe">Elige una talla para continuar.</p>
            )}
          </div>

          <p className="mt-6 text-sm leading-relaxed text-ink/70">{product.description}</p>

          <dl className="mt-6 divide-y hairline border-y hairline text-sm">
            <div className="flex justify-between py-3">
              <dt className="text-taupe">Material</dt>
              <dd className="text-ink">{product.material}</dd>
            </div>
            <div className="flex justify-between py-3">
              <dt className="text-taupe">Tacón</dt>
              <dd className="text-ink">{product.heel}</dd>
            </div>
            <div className="flex justify-between py-3">
              <dt className="text-taupe">Cierre</dt>
              <dd className="text-ink">{product.closure}</dd>
            </div>
            <div className="flex justify-between py-3">
              <dt className="text-taupe">Punta</dt>
              <dd className="text-ink">{product.toe}</dd>
            </div>
          </dl>

          <div className="mt-6">
            <p className="eyebrow text-ink/50">Características</p>
            <ul className="mt-2.5 space-y-1.5 text-sm text-ink/70">
              {product.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="text-gold-deep">—</span> {f}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 text-2xs text-taupe">🇨🇴 Fabricado en Colombia · Envíos a todo Colombia</p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <p className="eyebrow text-taupe">También te puede gustar</p>
          <h2 className="mt-1.5 font-display text-2xl text-ink sm:text-3xl">Más de {category.label}</h2>
          <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Barra fija móvil: compra rápida sin perder el CTA de vista */}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-2 border-t hairline bg-marfil/95 p-3 backdrop-blur sm:hidden">
        <div className="flex-1 truncate">
          <p className="truncate text-xs text-ink">{product.name}</p>
          <Price price={product.price} className="text-xs" />
        </div>
        <a
          href={productWhatsappLink(product, color, size)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 whitespace-nowrap rounded-card bg-[#25D366] px-4 py-3 text-xs font-medium uppercase tracking-wideish text-white"
        >
          <MessageCircle size={15} /> Comprar
        </a>
      </div>
      <div className="h-16 sm:hidden" />
    </div>
  )
}
