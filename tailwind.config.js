/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#000000',
        surface: '#0a0a0a',
        'surface-light': '#141414',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 30px -5px rgba(249, 115, 22, 0.4)',
        'glow-lg': '0 0 50px -10px rgba(249, 115, 22, 0.3)',
        'soft': '0 8px 32px -8px rgba(0,0,0,0.5)',
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'blob-drift-1': 'blobDrift1 35s ease-in-out infinite',
        'blob-drift-2': 'blobDrift2 40s ease-in-out infinite',
        'blob-drift-3': 'blobDrift3 30s ease-in-out infinite',
        'gradient-rotate': 'gradientRotate 3s linear infinite',
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
        blobDrift1: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(50px, -30px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.95)' },
        },
        blobDrift2: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(-40px, 40px) scale(1.05)' },
          '66%': { transform: 'translate(30px, -20px) scale(1.1)' },
        },
        blobDrift3: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, 20px) scale(0.95)' },
          '66%': { transform: 'translate(-50px, -30px) scale(1.05)' },
        },
        gradientRotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}
