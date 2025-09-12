import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-t py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-6 text-gray-500 text-sm flex flex-col sm:flex-row justify-between">
        <p>© {new Date().getFullYear()} Rentley – Alle Rechte vorbehalten.</p>
        <p>Impressum · Datenschutz · Kontakt</p>
      </div>
    </footer>
  );
}
