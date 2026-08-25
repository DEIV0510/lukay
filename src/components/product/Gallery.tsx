import { useRef, useState } from 'react'
import type { ProductImage } from '@/types'

interface GalleryProps {
  images: ProductImage[]
  productName: string
}

export default function Gallery({ images, productName }: GalleryProps) {
  const [active, setActive] = useState(0)
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 })
  const [zooming, setZooming] = useState(false)
  const mobileScrollRef = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setZoomPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  const scrollToMobile = (i: number) => {
    setActive(i)
    mobileScrollRef.current?.children[i]?.scrollIntoView({ behavior: 'smooth', inline: 'center' })
  }

  const onMobileScroll = () => {
    const el = mobileScrollRef.current
    if (!el) return
    const idx = Math.round(el.scrollLeft / el.clientWidth)
    if (idx !== active) setActive(idx)
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row-reverse sm:gap-4">
      {/* Imagen principal — desktop con zoom al hover */}
      <div className="hidden flex-1 sm:block">
        <div
          className="relative aspect-[4/5] cursor-zoom-in overflow-hidden rounded-card bg-marfil-soft"
          onMouseEnter={() => setZooming(true)}
          onMouseLeave={() => setZooming(false)}
          onMouseMove={onMouseMove}
        >
          <img
            src={images[active].full}
            alt={`${productName} — foto ${active + 1}`}
            className="h-full w-full object-contain p-6 transition-transform duration-200 ease-out"
            style={
              zooming
                ? { transform: 'scale(1.8)', transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` }
                : undefined
            }
          />
        </div>
      </div>

      {/* Miniaturas — desktop columna */}
      <div className="hidden w-20 shrink-0 flex-col gap-3 sm:flex">
        {images.map((img, i) => (
          <button
            key={img.card}
            onClick={() => setActive(i)}
            className={`aspect-[4/5] overflow-hidden rounded-card bg-marfil-soft ring-1 transition-all ${
              i === active ? 'ring-2 ring-ink' : 'ring-ink/10 hover:ring-ink/30'
            }`}
          >
            <img src={img.card} alt="" className="h-full w-full object-contain p-1.5" loading="lazy" />
          </button>
        ))}
      </div>

      {/* Mobile: carrusel con swipe nativo */}
      <div className="sm:hidden">
        <div
          ref={mobileScrollRef}
          onScroll={onMobileScroll}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto rounded-card bg-marfil-soft"
        >
          {images.map((img, i) => (
            <div key={img.full} className="aspect-[4/5] w-full shrink-0 snap-center">
              <img
                src={img.full}
                alt={`${productName} — foto ${i + 1}`}
                className="h-full w-full object-contain p-4"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>
        {images.length > 1 && (
          <div className="mt-3 flex justify-center gap-1.5">
            {images.map((img, i) => (
              <button
                key={img.full}
                aria-label={`Ver foto ${i + 1}`}
                onClick={() => scrollToMobile(i)}
                className={`h-1.5 rounded-full transition-all ${i === active ? 'w-5 bg-ink' : 'w-1.5 bg-ink/20'}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
