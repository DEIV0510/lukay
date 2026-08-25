import { useEffect } from 'react'
import Hero from '@/components/home/Hero'
import CategoryStrip from '@/components/home/CategoryStrip'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import Benefits from '@/components/home/Benefits'
import Editorial from '@/components/home/Editorial'
import AboutSection from '@/components/home/AboutSection'
import SocialSection from '@/components/home/SocialSection'
import WhatsAppCta from '@/components/home/WhatsAppCta'

export default function Home() {
  useEffect(() => {
    document.title = 'LUKAY | Calzado Femenino Colombiano'
    const meta = document.querySelector('meta[name="description"]')
    if (meta)
      meta.setAttribute(
        'content',
        'Descubre LUKAY, calzado femenino colombiano. Baletas, slingbacks, tacones, mocasines y accesorios diseñados para mujeres con estilo propio.'
      )
  }, [])

  return (
    <>
      <Hero />
      <CategoryStrip />
      <FeaturedProducts />
      <Benefits />
      <Editorial />
      <AboutSection />
      <SocialSection />
      <WhatsAppCta />
    </>
  )
}
