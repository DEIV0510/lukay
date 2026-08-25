import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { StoreProvider } from '@/store/StoreContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppFloat from '@/components/layout/WhatsAppFloat'
import CartDrawer from '@/components/cart/CartDrawer'
import ToastStack from '@/components/ui/ToastStack'
import Home from '@/pages/Home'
import Catalog from '@/pages/Catalog'
import ProductPage from '@/pages/ProductPage'
import NotFound from '@/pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <StoreProvider>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coleccion" element={<Catalog />} />
            <Route path="/coleccion/:category" element={<Catalog />} />
            <Route path="/producto/:slug" element={<ProductPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <WhatsAppFloat />
      <CartDrawer />
      <ToastStack />
    </StoreProvider>
  )
}
