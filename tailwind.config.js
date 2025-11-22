/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#2E90FF',
          secondary: '#22C55E',
          dark: '#0F172A',
          light: '#E0F2FF',
        },
      },
      fontFamily: {
        display: ['"Poppins"', 'ui-sans-serif', 'system-ui'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        soft: '0 20px 45px rgba(37, 99, 235, 0.15)',
      },
    },
  },
  plugins: [],
}

