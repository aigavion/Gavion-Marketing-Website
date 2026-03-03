/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          400: '#ff6b00',
          500: '#ff6b00',
          600: '#e65c00',
        },
        dark: {
          900: '#000000',
          800: '#0a0a0a',
          700: '#111111',
          600: '#1a1a1a',
        },
        light: {
          50: '#ffffff',
          100: '#f5f5f5',
          200: '#e5e5e5',
        },
        background: '#000000',
        surface: '#0a0a0a',
        text: '#ffffff',
        'text-muted': 'rgba(255, 255, 255, 0.7)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 30px -5px rgba(255, 107, 0, 0.5)',
        'soft': '0 8px 32px -8px rgba(0,0,0,0.5)',
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
