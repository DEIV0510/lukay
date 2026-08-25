import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { X, MessageCircle } from 'lucide-react'
import { site, waLink } from '@/data/site'

interface MobileNavProps {
  open: boolean
  onClose: () => void
  links: { label: string; to: string }[]
}

export default function MobileNav({ open, onClose, links }: MobileNavProps) {
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] lg:hidden">
      <button
        aria-label="Cerrar menú"
        onClick={onClose}
        className="absolute inset-0 animate-fade-in bg-ink/50"
      />
      <div className="absolute left-0 top-0 flex h-full w-[82%] max-w-xs animate-slide-left flex-col bg-marfil">
        <div className="flex items-center justify-between border-b hairline px-5 py-5">
          <img src="/brand/logo-compact.webp" alt="LUKAY" className="h-9 w-auto" />
          <button onClick={onClose} aria-label="Cerrar" className="p-1 text-ink">
            <X size={22} />
          </button>
        </div>
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-5 py-6">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                `border-b hairline py-3.5 font-display text-xl ${isActive ? 'text-gold-deep' : 'text-ink'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t hairline px-5 py-5">
          <a
            href={waLink(`Hola ${site.name} 👋, quiero conocer más sobre el calzado disponible.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-card bg-[#25D366] py-3.5 text-sm font-medium uppercase tracking-wideish text-white"
          >
            <MessageCircle size={17} /> Escríbenos
          </a>
        </div>
      </div>
    </div>
  )
}
