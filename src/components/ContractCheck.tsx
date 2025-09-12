import React from "react";

export default function ContractCheck() {
  return (
    <section id="mietcheck" className="bg-gray-100 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold mb-6">🧾 Mietvertrags-Check</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h4 className="font-semibold text-lg mb-2">Standard (49 €)</h4>
            <p className="text-sm text-gray-700">
              Analyse innerhalb von 24h, inkl. Stolperfallen und Zusammenfassung.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h4 className="font-semibold text-lg mb-2">Express (79 €)</h4>
            <p className="text-sm text-gray-700">
              Antwort garantiert innerhalb von 6h – ideal vor Unterzeichnung.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h4 className="font-semibold text-lg mb-2">Zusatzfrage (+24 €)</h4>
            <p className="text-sm text-gray-700">
              Spezialfrage einreichen – etwa Indexmiete, Haustiere oder Ablöse.
            </p>
          </div>
        </div>
        <button className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700">
          📤 Mietvertrag hochladen
        </button>
      </div>
    </section>
  );
}
