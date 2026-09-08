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
        display: ['Montserrat', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        mono: ['Space Grotesk', 'monospace'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        space: {
          950: '#030305',
          900: '#07080c',
          850: '#0d1017',
          800: '#141824',
        },
        accent: {
          lime: '#a3e635',
          emerald: '#10b981',
          cyan: '#06b6d4',
          silver: '#e2e8f0',
        }
      },
      animation: {
        'marquee': 'marquee 28s linear infinite',
        'pulse-slow': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        }
      }
    },
  },
  plugins: [],
}
