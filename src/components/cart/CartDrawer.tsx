import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Minus, Plus, X, MessageCircle, ShoppingBag } from 'lucide-react'
import { useStore } from '@/store/StoreContext'
import { cartWhatsappLink } from '@/lib/whatsapp'
import Price from '@/components/ui/Price'
import { LinkButton } from '@/components/ui/Button'

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, cartTotal, cartHasPending, setQty, removeFromCart } = useStore()

  useEffect(() => {
    if (!cartOpen) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [cartOpen])

  if (!cartOpen) return null

  return (
    <div className="fixed inset-0 z-[70]">
      <button aria-label="Cerrar carrito" onClick={() => setCartOpen(false)} className="absolute inset-0 animate-fade-in bg-ink/50" />
      <div className="absolute right-0 top-0 flex h-full w-full max-w-md animate-slide-left flex-col bg-marfil">
        <div className="flex items-center justify-between border-b hairline px-5 py-5">
          <p className="font-display text-xl">Tu carrito</p>
          <button onClick={() => setCartOpen(false)} aria-label="Cerrar" className="p-1 text-ink">
            <X size={22} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag size={36} className="text-taupe" />
            <p className="text-sm text-ink/60">Tu carrito está vacío.</p>
            <Link
              to="/coleccion"
              onClick={() => setCartOpen(false)}
              className="inline-flex items-center justify-center rounded-card border border-ink px-7 py-3.5 text-sm font-medium uppercase tracking-wideish text-ink transition-colors hover:bg-ink hover:text-marfil"
            >
              Ver colección
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-5">
              <ul className="flex flex-col gap-5">
                {cart.map(({ product, color, size, qty }) => (
                  <li key={`${product.slug}-${color.id}-${size}`} className="flex gap-3">
                    <Link
                      to={`/producto/${product.slug}`}
                      onClick={() => setCartOpen(false)}
                      className="h-20 w-20 shrink-0 overflow-hidden rounded-card bg-crema-dark/40"
                    >
                      <img src={color.images[0].card} alt={product.name} className="h-full w-full object-contain p-1.5" />
                    </Link>
                    <div className="flex flex-1 flex-col gap-1">
                      <div className="flex items-start justify-between gap-2">
                        <Link to={`/producto/${product.slug}`} onClick={() => setCartOpen(false)} className="text-sm text-ink">
                          {product.name}
                        </Link>
                        <button
                          onClick={() => removeFromCart(product.slug, color.id, size)}
                          aria-label="Quitar"
                          className="shrink-0 text-taupe hover:text-ink"
                        >
                          <X size={15} />
                        </button>
                      </div>
                      <p className="text-2xs uppercase tracking-wideish text-taupe">
                        {color.name}
                        {size != null ? ` · Talla ${size}` : ''}
                      </p>
                      <div className="mt-1 flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-card border border-ink/15">
                          <button
                            onClick={() => setQty(product.slug, color.id, size, qty - 1)}
                            className="p-1.5 text-ink"
                            aria-label="Restar"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="min-w-[1.2rem] text-center text-sm">{qty}</span>
                          <button
                            onClick={() => setQty(product.slug, color.id, size, qty + 1)}
                            className="p-1.5 text-ink"
                            aria-label="Sumar"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                        <Price price={product.price != null ? product.price * qty : null} className="text-sm" />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t hairline px-5 py-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink/70">Subtotal</span>
                <span className="font-medium text-ink">
                  {cartHasPending && cartTotal === 0
                    ? 'A consultar'
                    : `$${cartTotal.toLocaleString('es-CO')}${cartHasPending ? ' + a consultar' : ''}`}
                </span>
              </div>
              <p className="mt-1 text-2xs text-taupe">El total final se confirma por WhatsApp.</p>
              <LinkButton
                as="a"
                href={cartWhatsappLink(cart)}
                target="_blank"
                rel="noopener noreferrer"
                variant="whatsapp"
                fullWidth
                icon={<MessageCircle size={17} />}
                className="mt-4"
              >
                Finalizar pedido por WhatsApp
              </LinkButton>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
