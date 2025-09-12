import React from "react";

export default function NavBar() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">MietRadar</h1>
        <nav className="space-x-6 text-gray-600 font-medium">
          <a href="/mieter">Mieter</a>
          <a href="/vermieter">Vermieter</a>
          <a href="#faq">FAQ</a>
        </nav>
      </div>
    </header>
  );
}
