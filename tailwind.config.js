/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Montserrat', '-apple-system', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', '-apple-system', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', '-apple-system', 'sans-serif'],
        mono: ['"Space Grotesk"', 'monospace'],
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'sans-serif'],
      },
      colors: {
        bg: {
          base: '#0b0d12',
          surface: '#121620',
          elevated: '#1a202c',
        },
        ink: {
          hero: '#f8fafc',
          body: '#cbd5e1',
          muted: '#64748b',
        },
        edge: {
          subtle: '#1e293b',
          active: '#334155',
          accent: '#e2b714',
        },
        accent: {
          amber: '#e2b714',
          cyan: '#38bdf8',
        },
      },
      letterSpacing: {
        tighter: '-0.035em',
        tight: '-0.02em',
        normal: '0',
        wide: '+0.06em',
        wider: '+0.10em',
      },
      borderRadius: {
        'xs': '2px',
        'sm': '4px',
        'md': '6px',
        'lg': '8px',
        'xl': '12px',
      },
      transitionTimingFunction: {
        'tactile': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'reveal': 'ease-out',
        'disclosure': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'drawer': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'status': 'ease-in-out',
      },
      transitionDuration: {
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
      },
    },
  },
  plugins: [],
}
