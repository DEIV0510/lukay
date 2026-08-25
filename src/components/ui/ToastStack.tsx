import { Check, Info, X } from 'lucide-react'
import { useStore } from '@/store/StoreContext'

export default function ToastStack() {
  const { toasts, dismissToast } = useStore()

  return (
    <div className="pointer-events-none fixed bottom-24 left-1/2 z-[70] flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4 sm:bottom-6 sm:left-auto sm:right-6 sm:translate-x-0">
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className="pointer-events-auto flex animate-slide-up items-center gap-3 rounded-card border border-ink/10 bg-marfil px-4 py-3 shadow-soft-hover sm:animate-fade-up"
        >
          {t.image && (
            <img src={t.image} alt="" className="h-10 w-10 shrink-0 rounded-sm object-contain bg-crema" />
          )}
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink/5">
            {t.tone === 'success' && <Check size={13} className="text-ink" />}
            {t.tone === 'info' && <Info size={13} className="text-ink" />}
          </span>
          <p className="flex-1 text-sm text-ink">{t.message}</p>
          <button onClick={() => dismissToast(t.id)} aria-label="Cerrar" className="text-taupe hover:text-ink">
            <X size={15} />
          </button>
        </div>
      ))}
    </div>
  )
}
