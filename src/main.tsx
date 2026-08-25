import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

const root = createRoot(document.getElementById('root')!)
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Oculta la pantalla de carga apenas React pinta el primer frame real.
// Duración mínima de ~350ms para que el fade-in del logo alcance a verse
// aunque la app cargue casi instantáneo (nunca esconde una página lenta:
// solo evita el parpadeo de un flash sin contenido).
requestAnimationFrame(() => {
  window.setTimeout(() => {
    document.getElementById('lk-boot')?.setAttribute('data-hide', 'true')
  }, 350)
})
