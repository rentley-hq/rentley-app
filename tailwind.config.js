/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        brand: "#111827",    // Dunkles Grau/Navy für Texte
        accent: "#2563eb",   // Blau für Buttons & Links
        muted: "#6b7280",    // Grautöne
        highlight: "#facc15", // Gelb für Sterne
        bg: "#f9fafb",       // Heller Hintergrund
      },
    },
  },
  plugins: [],
};
