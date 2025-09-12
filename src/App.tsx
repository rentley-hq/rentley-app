import React, { useState } from "react";

export default function App() {
  const [activeTab, setActiveTab] = useState("mieter");

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">MietRadar</h1>
          <nav className="space-x-6 text-gray-600 font-medium">
            <button onClick={() => setActiveTab("mieter")} className={activeTab === "mieter" ? "text-indigo-600 font-bold" : ""}>
              Mieter-Services
            </button>
            <button onClick={() => setActiveTab("vermieter")} className={activeTab === "vermieter" ? "text-indigo-600 font-bold" : ""}>
              Vermieter-Services
            </button>
            <button onClick={() => setActiveTab("faq")} className={activeTab === "faq" ? "text-indigo-600 font-bold" : ""}>
              FAQ
            </button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-indigo-600 text-white text-center py-16 px-6">
        <h2 className="text-4xl font-bold mb-2">Miettransparenz für alle</h2>
        <p className="text-lg max-w-2xl mx-auto">
          Bewerte deinen Vermieter oder deine Wohnung. Lass deinen Mietvertrag prüfen. Schütze dich – und hilf anderen.
        </p>
      </section>

      {/* Tabs */}
      <main className="max-w-6xl mx-auto py-12 px-6">
        {activeTab === "mieter" && (
          <>
            {/* Bewertungen */}
            <section className="mb-16">
              <h3 className="text-2xl font-bold mb-6">🔎 Bewertungen durchsuchen</h3>
              <input
                type="text"
                placeholder="Adresse, Vermieter oder Hausverwaltung suchen..."
                className="w-full border px-4 py-2 rounded-md mb-8"
              />
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

            {/* Mietvertrags-Check */}
            <section className="bg-gray-100 rounded-lg p-6 mb-16">
              <h3 className="text-2xl font-bold mb-6">🧾 Mietvertrags-Check</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h4 className="font-semibold text-lg mb-2">Standard (49 €)</h4>
                  <p className="text-sm text-gray-700">Analyse innerhalb von 24h, inkl. Stolperfallen und Zusammenfassung.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h4 className="font-semibold text-lg mb-2">Express (79 €)</h4>
                  <p className="text-sm text-gray-700">Antwort garantiert innerhalb von 6h – ideal vor Unterzeichnung.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <h4 className="font-semibold text-lg mb-2">Zusatzfrage (+24 €)</h4>
                  <p className="text-sm text-gray-700">Spezialfrage einreichen – etwa Indexmiete, Haustiere oder Ablöse.</p>
                </div>
              </div>
              <button className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700">
                📤 Mietvertrag hochladen
              </button>
            </section>

            {/* Konfliktmanagement */}
            <section className="bg-white shadow rounded-lg p-6 mb-16">
              <h3 className="text-2xl font-bold mb-8 text-center">⚖️ Konfliktfall aktiv begleiten</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center text-center">
                {["Problem melden", "Vermieter kontaktieren", "14 Tage Frist setzen", "Öffentliche Bewertung freigeben"].map((step, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="h-16 w-16 rounded-full bg-indigo-600 text-white grid place-items-center text-2xl font-bold">
                      {i + 1}
                    </div>
                    <p className="mt-3 text-gray-700">{step}</p>
                  </div>
                ))}
              </div>
              <button className="mt-8 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700">
                ➕ Konfliktfall starten
              </button>
            </section>
          </>
        )}

        {activeTab === "vermieter" && (
          <section className="mb-16">
            <h3 className="text-2xl font-bold mb-8">🏠 Vermieter-Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white shadow-md rounded-lg p-6">
                <h4 className="text-xl font-semibold mb-2">Mieter-Screening</h4>
                <p className="text-gray-600">Prüfen Sie Bonität und Zuverlässigkeit zukünftiger Mieter.</p>
              </div>
              <div className="bg-white shadow-md rounded-lg p-6">
                <h4 className="text-xl font-semibold mb-2">Nomaden-Check</h4>
                <p className="text-gray-600">Schützen Sie sich vor Mietnomaden durch Risikodatenbanken.</p>
              </div>
              <div className="bg-white shadow-md rounded-lg p-6">
                <h4 className="text-xl font-semibold mb-2">Grundbuch-Service</h4>
                <p className="text-gray-600">Lassen Sie Eigentumsverhältnisse schnell und einfach prüfen.</p>
              </div>
            </div>
          </section>
        )}

        {activeTab === "faq" && (
          <section className="max-w-4xl mx-auto py-16">
            <h3 className="text-2xl font-bold mb-8 text-center">🤔 Häufige Fragen</h3>
            <div className="space-y-4">
              {[
                {
                  q: "Wie funktioniert der Mietvertrags-Check?",
                  a: "Du lädst deinen Vertrag hoch, wir analysieren ihn und geben dir innerhalb von 24 h eine Rückmeldung mit Stolperfallen.",
                },
                {
                  q: "Ist meine Bewertung anonym?",
                  a: "Ja. Nur verifizierte Nutzer dürfen bewerten, aber dein Name erscheint nicht öffentlich.",
                },
                {
                  q: "Was passiert bei einem Konfliktfall?",
                  a: "Du kannst ein offizielles Konfliktverfahren starten. Wir setzen eine Frist und veröffentlichen ggf. die Bewertung nach Ablauf.",
                },
              ].map((item, i) => (
                <details key={i} className="bg-white rounded-lg shadow p-4">
                  <summary className="font-semibold cursor-pointer">{item.q}</summary>
                  <p className="mt-2 text-sm text-gray-700">{item.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-6 text-gray-500 text-sm flex flex-col sm:flex-row justify-between">
          <p>© {new Date().getFullYear()} Rentley – Alle Rechte vorbehalten.</p>
          <p>Impressum · Datenschutz · Kontakt</p>
        </div>
      </footer>
    </div>
  );
}
