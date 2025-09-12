/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        brand: "#111827",
        accent: "#2563eb",
        muted: "#6b7280",
        highlight: "#facc15",
        bg: "#f9fafb",
      },
    },
  },
  plugins: [],
};
