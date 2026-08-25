const items = [
  { emoji: '🇨🇴', label: 'Fabricado en Colombia' },
  { emoji: '📦', label: 'Envíos a todo Colombia' },
  { emoji: '✨', label: 'Diseño con detalle' },
  { emoji: '💬', label: 'Atención por WhatsApp' },
]

export default function Benefits() {
  return (
    <section className="border-y hairline bg-marfil">
      <div className="container-lk grid grid-cols-2 gap-y-6 py-10 sm:grid-cols-4 sm:py-8">
        {items.map((it) => (
          <div key={it.label} className="flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-center sm:gap-2.5">
            <span className="text-xl">{it.emoji}</span>
            <span className="text-2xs font-medium uppercase tracking-wideish text-ink/70 sm:text-xs">{it.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
