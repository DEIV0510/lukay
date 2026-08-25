/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── Paleta LUKAY — lujo discreto, moda femenina colombiana ──────────
        // Neutros cálidos dominan la interfaz; el dorado es acento, con
        // moderación (nunca fondo, solo detalle: líneas, íconos, hover).
        marfil: {
          DEFAULT: '#FBF7F1',
          soft: '#F6F0E7',
        },
        crema: {
          DEFAULT: '#F1E6D6',
          dark: '#E7D8C1',
        },
        beige: {
          DEFAULT: '#E4D3BB',
          dark: '#D3BD9C',
        },
        nude: {
          DEFAULT: '#D9BB9C',
          dark: '#C8A47F',
        },
        taupe: {
          DEFAULT: '#A99178',
          dark: '#8C7863',
        },
        cafe: {
          light: '#8A6B4E',
          DEFAULT: '#5A3E2B',
          chocolate: '#3A2417',
        },
        rosa: {
          empolvado: '#E3C6BE',
          palo: '#C89A8E',
        },
        ink: {
          DEFAULT: '#181310',
          900: '#120D0A',
          800: '#1D1712',
        },
        gold: {
          soft: '#D9BD86',
          DEFAULT: '#B4914F',
          deep: '#8F7038',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', '"Segoe UI"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem', letterSpacing: '0.06em' }],
      },
      letterSpacing: {
        wideish: '0.08em',
        widest2: '0.28em',
      },
      borderRadius: {
        card: '2px',
        pill: '999px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(24,19,16,.04), 0 12px 32px -18px rgba(24,19,16,.28)',
        'soft-hover': '0 2px 4px rgba(24,19,16,.06), 0 28px 48px -24px rgba(24,19,16,.35)',
        gold: '0 0 0 1px rgba(180,145,79,.35)',
      },
      keyframes: {
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'fade-up': {
          from: { opacity: '0', transform: 'translate3d(0,16px,0)' },
          to: { opacity: '1', transform: 'none' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(.97)' },
          to: { opacity: '1', transform: 'none' },
        },
        'slide-left': {
          from: { transform: 'translate3d(100%,0,0)' },
          to: { transform: 'none' },
        },
        'slide-up': {
          from: { transform: 'translate3d(0,100%,0)' },
          to: { transform: 'none' },
        },
        'cart-bump': {
          '0%,100%': { transform: 'scale(1)' },
          '35%': { transform: 'scale(1.24)' },
        },
        marquee: { from: { transform: 'none' }, to: { transform: 'translateX(-50%)' } },
      },
      animation: {
        'fade-in': 'fade-in .5s ease-out both',
        'fade-up': 'fade-up .6s cubic-bezier(0.16,1,0.3,1) both',
        'scale-in': 'scale-in .3s cubic-bezier(0.16,1,0.3,1) both',
        'slide-left': 'slide-left .32s cubic-bezier(0.16,1,0.3,1) both',
        'slide-up': 'slide-up .32s cubic-bezier(0.16,1,0.3,1) both',
        'cart-bump': 'cart-bump .4s ease-out',
        marquee: 'marquee 32s linear infinite',
      },
    },
  },
  plugins: [],
}
