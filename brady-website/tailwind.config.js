/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brady-white': '#FFFFFF',
        'brady-beige': '#F5F5DC',
        'brady-gray-100': '#F7F7F7',
        'brady-gray-200': '#E5E5E5',
        'brady-gray-300': '#D4D4D4',
        'brady-gray-400': '#A3A3A3',
        'brady-gray-500': '#737373',
        'brady-gray-600': '#525252',
        'brady-gray-700': '#404040',
        'brady-gray-800': '#262626',
        'brady-gray-900': '#171717',
        'brady-charcoal': '#36454F',
        'brady-dark': '#1A1A1A',
        'brady-darker': '#121212',
        'brady-gold': '#DAAA36',      // Enhanced champagne gold with more glow
        'brady-gold-light': '#F0C351', // Brighter gold for accents and glow effects
        'brady-gold-dark': '#8A6E20',  // Darker gold with black mix for rich depth
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Montserrat', 'sans-serif'],
        'heading': ['Roboto Condensed', 'sans-serif'],
        'mono': ['Consolas', 'monospace'],
      },
      backdropBlur: {
        'xs': '2px',
      },
      backgroundImage: {
        'gradient-dark': 'linear-gradient(135deg, #121212 0%, #1A1A1A 100%)',
        'gradient-gold': 'linear-gradient(135deg, #DAAA36 0%, #F0C351 100%)',
        'gradient-gold-rich': 'linear-gradient(135deg, #8A6E20 0%, #DAAA36 100%)',
      }
    },
  },
  plugins: [],
}
