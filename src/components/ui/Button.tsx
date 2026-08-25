import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'

const base =
  'inline-flex items-center justify-center gap-2 rounded-card font-sans text-sm font-medium uppercase tracking-wideish transition-colors duration-200 disabled:opacity-40 disabled:pointer-events-none'

const variants = {
  primary: 'bg-ink text-marfil hover:bg-cafe-chocolate px-7 py-3.5',
  secondary: 'border border-ink text-ink hover:bg-ink hover:text-marfil px-7 py-3.5',
  whatsapp: 'bg-[#25D366] text-white hover:bg-[#1DA851] px-7 py-3.5',
  ghost: 'text-ink hover:text-gold px-2 py-1',
  gold: 'bg-gold text-ink hover:bg-gold-deep px-7 py-3.5',
}

type Variant = keyof typeof variants

interface CommonProps {
  variant?: Variant
  fullWidth?: boolean
  children: ReactNode
  icon?: ReactNode
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>
type LinkButtonProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a' }

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', fullWidth, className = '', children, icon, ...props }, ref) => (
    <button
      ref={ref}
      className={`${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
      {icon}
    </button>
  )
)
Button.displayName = 'Button'

export function LinkButton({ variant = 'primary', fullWidth, className = '', children, icon, ...props }: LinkButtonProps) {
  return (
    <a className={`${base} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`} {...props}>
      {children}
      {icon}
    </a>
  )
}
