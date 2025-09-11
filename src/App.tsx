import React, { useState } from "react";
import SecureWrapper from "./SecureWrapper";

export default function App() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <SecureWrapper>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-indigo-600">Rentley</h1>
            <nav className="space-x-6 text-gray-600 font-medium">
              <a href="#bewertungen">Bewertungen</a>
              <a href="#mieter">Mieter-Services</a>
              <a href="#konflikt">Konflikt</a>
              <a href="#faq">FAQ</a>
            </nav>
          </div>
        </header>

        {/* Hero */}
        <section className="bg-indigo-600 text-white text-center py-16 px-6">
          <h2 className="text-4xl font-bold mb-4">Miettransparenz neu gedacht</h2>
          <p className="text-lg mb-6">Bewerte Vermieter & Immobilien. Erhalte Hilfe bei Mietverträgen. Schaffe Veränderung.</p>
          <a href="#mieter" className="bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg shadow hover:bg-gray-100">
            Jetzt starten
          </a>
        </section>

        {/* Bewertungen */}
        <section id="bewertungen" className="max-w-6xl mx-auto py-16 px-6">
          <h3 className="text-2xl font-bold mb-8">🔎 Bewertung suchen oder hinzufügen</h3>
          <div className="bg-white shadow rounded-xl p-6">
            <input
              type="text"
              placeholder="Adresse, Vermieter oder Hausverwaltung suchen..."
              className="w-full border px-4 py-2 rounded-md mb-4"
            />
            <p className="text-gray-500">Beispiel: Musterstraße 12, 1010 Wien</p>
          </div>
        </section>

        {/* Mieter-Services */}
        <section id="mieter" className="max-w-6xl mx-auto py-16 px-6">
          <h3 className="text-2xl font-bold mb-8">🧾 Mietvertrags-Check</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard title="Standard-Check" price="49 €" description="Innerhalb von 24h. Übersicht der wichtigsten Klauseln & Hinweise auf Stolperfallen." />
            <ServiceCard title="Express-Check" price="79 €" description="Garantiert innerhalb von 6h. Für dringende Entscheidungen vor Vertragsunterzeichnung." />
            <ServiceCard title="Zusatzfrage" price="+24 €" description="Spezifische Anliegen wie z.B. Indexklausel oder Haustierhaltung. Individuell beantwortet." />
          </div>
          <p className="mt-4 text-gray-500">Gutschein-Code eingeben → -10 % Rabatt sichern</p>
        </section>

        {/* Konfliktmanagement */}
        <section id="konflikt" className="bg-gray-100 py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-8">⚖️ Konfliktfall aktiv begleiten</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
              {[
                "Problem melden",
                "Vermieter kontaktieren",
                "14 Tage Frist setzen",
                "Öffentliche Bewertung freigeben"
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="h-16 w-16 rounded-full bg-indigo-600 text-white grid place-items-center text-2xl">{i + 1}</div>
                  <p className="mt-3 text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="max-w-4xl mx-auto py-16 px-6">
          <h3 className="text-2xl font-bold mb-8 text-center">🤔 FAQ</h3>
          <div className="space-y-4">
            {[{
              q: "Wie funktioniert der Mietvertrags-Check?",
              a: "Sie laden Ihren Mietvertrag hoch. Unsere KI analysiert die wichtigsten Klauseln und markiert kritische Punkte."
            }, {
              q: "Was ist der Unterschied zwischen Express und Standard?",
              a: "Express-Checks werden priorisiert und innerhalb von 6h garantiert geliefert."
            }, {
              q: "Was passiert bei einem Konfliktfall?",
              a: "Wir informieren den Vermieter offiziell. Erfolgt keine Reaktion innerhalb von 14 Tagen, kann die Bewertung veröffentlicht werden."
            }].map((item, i) => (
              <div key={i} className="bg-white shadow rounded-lg p-4">
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex justify-between items-center font-semibold"
                >
                  {item.q} <span>{faqOpen === i ? "−" : "+"}</span>
                </button>
                {faqOpen === i && <p className="mt-2 text-gray-600">{item.a}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t py-6 mt-auto">
          <div className="max-w-6xl mx-auto px-6 text-gray-500 text-sm flex justify-between">
            <p>© {new Date().getFullYear()} Rentley – Alle Rechte vorbehalten.</p>
            <p>Impressum · Datenschutz</p>
          </div>
        </footer>
      </div>
    </SecureWrapper>
  );
}

function ServiceCard({ title, price, description }: { title: string; price: string; description: string }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg transition">
      <div>
        <h4 className="text-xl font-semibold mb-2">{title}</h4>
        <p className="text-gray-600 mb-4">{description}</p>
      </div>
      <p className="text-lg font-bold">{price}</p>
    </div>
  );
}
