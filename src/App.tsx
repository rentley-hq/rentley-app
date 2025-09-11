import React from "react";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">MietRadar</h1>
          <nav className="space-x-6 text-gray-600 font-medium">
            <a href="#bewertungen">Bewertungen</a>
            <a href="#mietcheck">Mietvertrags-Check</a>
            <a href="#faq">FAQ</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-indigo-600 text-white text-center py-16 px-6">
        <h2 className="text-4xl font-bold mb-2">Miettransparenz für alle</h2>
        <p className="text-lg max-w-2xl mx-auto">Bewerte deinen Vermieter oder deine Wohnung. Lass deinen Mietvertrag prüfen. Schütze dich – und hilf anderen.</p>
      </section>

      {/* Bewertungssuche */}
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
          <p className="text-sm italic text-gray-500">“Ich würde wieder hier wohnen, aber man braucht Geduld bei der Hausverwaltung.”</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:space-x-4 gap-4">
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700">📝 Neue Bewertung schreiben</button>
          <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300">📮 Vermieter kontaktieren</button>
        </div>
      </section>

      {/* Mietvertragscheck */}
      <section id="mietcheck" className="bg-gray-100 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6">🧾 Mietvertrags-Check</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-semibold text-lg mb-2">Standard (49 €)</h4>
              <p className="text-sm text-gray-700">Analyse innerhalb von 24h, inkl. Stolperfallen und Zusammenfassung.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-semibold text-lg mb-2">Express (79 €)</h4>
              <p className="text-sm text-gray-700">Antwort garantiert innerhalb von 6h – ideal vor Unterzeichnung.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="font-semibold text-lg mb-2">Zusatzfrage (+24 €)</h4>
              <p className="text-sm text-gray-700">Spezialfrage einreichen – etwa Indexmiete, Haustiere oder Ablöse.</p>
            </div>
          </div>
          <button className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700">📤 Mietvertrag hochladen</button>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-4xl mx-auto py-16 px-6">
        <h3 className="text-2xl font-bold mb-8 text-center">🤔 Häufige Fragen</h3>
        <div className="space-y-4">
          <details className="bg-white rounded-lg shadow p-4">
            <summary className="font-semibold cursor-pointer">Wie funktioniert der Mietvertrags-Check?</summary>
            <p className="mt-2 text-sm text-gray-700">Du lädst deinen Vertrag hoch, wir analysieren ihn und geben dir innerhalb von 24 h eine Rückmeldung mit Stolperfallen.</p>
          </details>
          <details className="bg-white rounded-lg shadow p-4">
            <summary className="font-semibold cursor-pointer">Ist meine Bewertung anonym?</summary>
            <p className="mt-2 text-sm text-gray-700">Ja. Nur verifizierte Nutzer dürfen bewerten, aber dein Name erscheint nicht öffentlich.</p>
          </details>
          <details className="bg-white rounded-lg shadow p-4">
            <summary className="font-semibold cursor-pointer">Was passiert bei einem Konfliktfall?</summary>
            <p className="mt-2 text-sm text-gray-700">Du kannst ein offizielles Konfliktverfahren starten. Wir setzen eine Frist und veröffentlichen ggf. die Bewertung nach Ablauf.</p>
          </details>
        </div>
      </section>

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
