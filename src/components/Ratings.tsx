import React from "react";

export default function Ratings() {
  return (
    <section id="bewertungen" className="max-w-4xl mx-auto py-16 px-6">
      <h3 className="text-2xl font-bold mb-6">🔎 Bewertungen durchsuchen</h3>
      <input
        type="text"
        placeholder="Adresse, Vermieter oder Hausverwaltung suchen..."
        className="w-full border px-4 py-2 rounded-md mb-8"
      />

      {/* Beispielbewertung */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h4 className="text-lg font-semibold mb-1">Musterstraße 12 / 1010 Wien</h4>
        <p className="text-sm text-gray-500 mb-2">Bewertet am 03.09.2025</p>
        <div className="flex items-center mb-4">
          <span className="text-yellow-500 text-xl">★★★★★</span>
          <span className="ml-2 text-sm text-gray-600">(4.6 Ø aus 3 Bewertungen)</span>
        </div>
        <ul className="list-disc list-inside text-sm text-gray-700 mb-4">
          <li>Wenig Lärm, gute Nachbarn</li>
          <li>Therme defekt bei Einzug – wurde aber rasch repariert</li>
          <li>Vermieter freundlich, aber langsam bei Rückmeldung</li>
        </ul>
        <p className="text-sm italic text-gray-500">
          “Ich würde wieder hier wohnen, aber man braucht Geduld bei der Hausverwaltung.”
        </p>
      </div>

      <div className="flex flex-col sm:flex-row sm:space-x-4 gap-4">
        <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700">
          📝 Neue Bewertung schreiben
        </button>
        <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300">
          📮 Vermieter kontaktieren
        </button>
      </div>
    </section>
  );
}
