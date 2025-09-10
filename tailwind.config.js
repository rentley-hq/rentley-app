/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#d9ecff',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        accent: {
          50: '#fefbe7',
          400: '#facc15'
        }
      },
      borderRadius: {
        xl: '0.9rem',
        '2xl': '1.25rem',
      }
    },
  },
  plugins: [],
};