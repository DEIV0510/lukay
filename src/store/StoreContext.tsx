import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { productBySlug } from '@/data/products'
import type { CartEntry, CartLine, Product } from '@/types'

const CART_KEY = 'lukay.cart.v1'
const FAV_KEY = 'lukay.fav.v1'

// ── Persistencia segura (Safari privado / localStorage bloqueado puede lanzar) ──
function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}
function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* almacenamiento no disponible: la sesión sigue en memoria */
  }
}

function lineKey(l: Pick<CartLine, 'slug' | 'colorId' | 'size'>) {
  return `${l.slug}__${l.colorId}__${l.size ?? 'na'}`
}

// ── Carrito ─────────────────────────────────────────────────────────────────
type CartAction =
  | { type: 'add'; slug: string; colorId: string; size: number | null; qty?: number }
  | { type: 'remove'; slug: string; colorId: string; size: number | null }
  | { type: 'setQty'; slug: string; colorId: string; size: number | null; qty: number }
  | { type: 'clear' }

function cartReducer(state: CartLine[], action: CartAction): CartLine[] {
  switch (action.type) {
    case 'add': {
      const qty = action.qty ?? 1
      const key = lineKey(action)
      const existing = state.find((l) => lineKey(l) === key)
      if (existing) {
        return state.map((l) => (lineKey(l) === key ? { ...l, qty: Math.min(l.qty + qty, 99) } : l))
      }
      return [...state, { slug: action.slug, colorId: action.colorId, size: action.size, qty }]
    }
    case 'remove':
      return state.filter((l) => lineKey(l) !== lineKey(action))
    case 'setQty':
      if (action.qty <= 0) return state.filter((l) => lineKey(l) !== lineKey(action))
      return state.map((l) => (lineKey(l) === lineKey(action) ? { ...l, qty: Math.min(action.qty, 99) } : l))
    case 'clear':
      return []
  }
}

// ── Toasts ──────────────────────────────────────────────────────────────────
export interface Toast {
  id: number
  message: string
  tone: 'success' | 'info' | 'error'
  image?: string
}

interface StoreValue {
  cart: CartEntry[]
  cartCount: number
  cartTotal: number
  cartHasPending: boolean
  addToCart: (p: Product, colorId: string, size: number | null, qty?: number) => void
  removeFromCart: (slug: string, colorId: string, size: number | null) => void
  setQty: (slug: string, colorId: string, size: number | null, qty: number) => void
  clearCart: () => void
  cartOpen: boolean
  setCartOpen: (v: boolean) => void
  bump: number
  toasts: Toast[]
  notify: (message: string, tone?: Toast['tone'], image?: string) => void
  dismissToast: (id: number) => void
}

const StoreContext = createContext<StoreValue | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(cartReducer, [], () =>
    read<CartLine[]>(CART_KEY, []).filter((l) => productBySlug.has(l.slug))
  )
  const [cartOpen, setCartOpen] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [bump, setBump] = useState(0)
  const toastId = useRef(0)

  useEffect(() => write(CART_KEY, lines), [lines])

  const dismissToast = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id))
  }, [])

  const notify = useCallback(
    (message: string, tone: Toast['tone'] = 'success', image?: string) => {
      const id = ++toastId.current
      setToasts((t) => [...t.slice(-2), { id, message, tone, image }])
      window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3600)
    },
    []
  )

  const cart = useMemo<CartEntry[]>(
    () =>
      lines
        .map((l) => {
          const product = productBySlug.get(l.slug)
          const color = product?.colors.find((c) => c.id === l.colorId)
          return product && color ? { product, color, size: l.size, qty: l.qty } : null
        })
        .filter((x): x is CartEntry => x !== null),
    [lines]
  )

  const cartCount = useMemo(() => cart.reduce((n, e) => n + e.qty, 0), [cart])
  const cartTotal = useMemo(
    () => cart.reduce((n, e) => n + (e.product.price ?? 0) * e.qty, 0),
    [cart]
  )
  const cartHasPending = useMemo(() => cart.some((e) => e.product.price === null), [cart])

  const addToCart = useCallback(
    (p: Product, colorId: string, size: number | null, qty = 1) => {
      dispatch({ type: 'add', slug: p.slug, colorId, size, qty })
      setBump((b) => b + 1)
      const color = p.colors.find((c) => c.id === colorId)
      notify(`${p.name} se agregó al carrito`, 'success', color?.images[0]?.card)
    },
    [notify]
  )

  const removeFromCart = useCallback((slug: string, colorId: string, size: number | null) => {
    dispatch({ type: 'remove', slug, colorId, size })
  }, [])

  const setQty = useCallback((slug: string, colorId: string, size: number | null, qty: number) => {
    dispatch({ type: 'setQty', slug, colorId, size, qty })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: 'clear' })
    notify('Vaciaste el carrito', 'info')
  }, [notify])

  const value = useMemo<StoreValue>(
    () => ({
      cart,
      cartCount,
      cartTotal,
      cartHasPending,
      addToCart,
      removeFromCart,
      setQty,
      clearCart,
      cartOpen,
      setCartOpen,
      bump,
      toasts,
      notify,
      dismissToast,
    }),
    [cart, cartCount, cartTotal, cartHasPending, addToCart, removeFromCart, setQty, clearCart, cartOpen, bump, toasts, notify, dismissToast]
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore debe usarse dentro de <StoreProvider>')
  return ctx
}
