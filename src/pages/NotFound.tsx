import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="container-lk flex min-h-[60vh] flex-col items-center justify-center gap-4 py-20 text-center">
      <p className="font-display text-6xl text-taupe">404</p>
      <h1 className="font-display text-3xl text-ink">Esta página no existe</h1>
      <p className="max-w-sm text-sm text-ink/60">
        El enlace que buscas no está disponible. Vuelve al inicio o explora la colección completa.
      </p>
      <Link to="/">
        <Button variant="primary">Volver al inicio</Button>
      </Link>
    </div>
  )
}
