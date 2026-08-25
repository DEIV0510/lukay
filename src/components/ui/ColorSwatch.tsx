interface ColorSwatchProps {
  hex: string
  name: string
  active?: boolean
  onClick?: () => void
  size?: 'sm' | 'md'
}

export default function ColorSwatch({ hex, name, active, onClick, size = 'md' }: ColorSwatchProps) {
  const dim = size === 'sm' ? 'h-6 w-6' : 'h-8 w-8'
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={name}
      aria-pressed={active}
      title={name}
      className={`relative rounded-full ${dim} shrink-0 transition-transform duration-150 ${
        active ? 'ring-2 ring-ink ring-offset-2 ring-offset-marfil' : 'ring-1 ring-ink/15 hover:ring-ink/40'
      }`}
      style={{ backgroundColor: hex }}
    />
  )
}
