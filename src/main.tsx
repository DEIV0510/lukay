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

// Oculta la pantalla de carga apenas React monta. Duración mínima de ~350ms
// para que el fade-in del logo alcance a verse aunque la app cargue casi
// instantáneo (nunca esconde una página lenta: solo evita el parpadeo de un
// flash sin contenido). setTimeout puro a propósito — sin requestAnimationFrame,
// que se pausa si la pestaña no está pintando activamente (background/inactiva)
// y dejaría el overlay bloqueando clics indefinidamente.
window.setTimeout(() => {
  document.getElementById('lk-boot')?.setAttribute('data-hide', 'true')
}, 350)
