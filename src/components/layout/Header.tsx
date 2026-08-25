import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Search, ShoppingBag, Menu, MessageCircle } from 'lucide-react'
import { categories } from '@/data/categories'
import { site, waLink } from '@/data/site'
import { useStore } from '@/store/StoreContext'
import MobileNav from './MobileNav'
import SearchOverlay from './SearchOverlay'

const navLinks = [
  { label: 'Inicio', to: '/' },
  { label: 'Colección', to: '/coleccion' },
  ...categories.map((c) => ({ label: c.label, to: `/coleccion/${c.slug}` })),
]

export default function Header() {
  const { cartCount, setCartOpen, bump } = useStore()
  const [scrolled, setScrolled] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-ink text-marfil transition-shadow duration-300 ${
          scrolled ? 'shadow-[0_4px_24px_-8px_rgba(0,0,0,.5)]' : ''
        }`}
      >
        <div className="container-lk flex h-16 items-center justify-between gap-4 sm:h-[72px]">
          <button
            type="button"
            onClick={() => setNavOpen(true)}
            aria-label="Abrir menú"
            className="-ml-2 p-2 text-marfil lg:hidden"
          >
            <Menu size={22} />
          </button>

          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.slice(0, 3).map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `text-2xs font-medium uppercase tracking-wideish text-marfil/75 transition-colors hover:text-gold-soft ${
                    isActive ? 'text-gold-soft' : ''
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <Link to="/" className="flex shrink-0 items-center" aria-label="LUKAY — Inicio">
            <img src="/brand/logo-compact.webp" alt="LUKAY" className="h-11 w-auto sm:h-12" width={340} height={365} />
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {navLinks.slice(3).map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `text-2xs font-medium uppercase tracking-wideish text-marfil/75 transition-colors hover:text-gold-soft ${
                    isActive ? 'text-gold-soft' : ''
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Buscar"
              className="p-2 text-marfil transition-colors hover:text-gold-soft"
            >
              <Search size={19} />
            </button>
            <a
              href={waLink(`Hola ${site.name} 👋, quiero conocer más sobre el calzado disponible.`)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Escríbenos por WhatsApp"
              className="hidden p-2 text-marfil transition-colors hover:text-gold-soft sm:block"
            >
              <MessageCircle size={19} />
            </a>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label="Ver carrito"
              className="relative p-2 text-marfil transition-colors hover:text-gold-soft"
            >
              <ShoppingBag size={19} key={bump} className={bump ? 'animate-cart-bump' : ''} />
              {cartCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[10px] font-semibold text-ink">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <MobileNav open={navOpen} onClose={() => setNavOpen(false)} links={navLinks} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
