import React, { useState } from "react";
import SecureWrapper from "./SecureWrapper";

// Hilfskomponenten
const Card = ({ title, description, price, cta }: { title: string; description: string; price?: string; cta?: string }) => (
  <div className="bg-white shadow-md rounded-2xl p-6 flex flex-col justify-between hover:shadow-lg transition">
    <div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
    </div>
    <div>
      {price && <p className="text-lg font-bold mb-2">{price}</p>}
      {cta && (
        <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700">
          {cta}
        </button>
      )}
    </div>
  </div>
);

const ComingSoonCard = ({ title }: { title: string }) => (
  <div className="bg-gray-100 border border-dashed border-gray-400 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-500">Coming soon…</p>
  </div>
);

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
              <a href="#vermieter">Vermieter-Services</a>
              <a href="#faq">FAQ</a>
            </nav>
          </div>
        </header>

        {/* Hero */}
        <section className="bg-indigo-600 text-white text-center py-16 px-6">
          <h2 className="text-4xl font-bold mb-4">Transparenz & Sicherheit im Mietmarkt</h2>
          <p className="text-lg mb-6">
            Bewertungen, Mietvertrags-Check, Konflikt-Management & Services – alles auf einer Plattform.
          </p>
          <a
            href="#mieter"
            className="bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg shadow hover:bg-gray-100"
          >
            Jetzt starten
          </a>
        </section>

        {/* Bewertungen */}
        <section id="bewertungen" className="max-w-6xl mx-auto py-16 px-6">
          <h3 className="text-2xl font-bold mb-8">Bewertungen</h3>
          <div className="bg-white shadow rounded-xl p-6">
            <input
              type="text"
              placeholder="Adresse, Vermieter oder Hausverwaltung suchen..."
              className="w-full border px-4 py-2 rounded-md mb-4"
            />
            <p className="text-gray-500">🔍 Beispiel: „Musterstraße 12, Wien“</p>
          </div>
        </section>

        {/* Mieter Services */}
        <section id="mieter" className="max-w-6xl mx-auto py-16 px-6">
          <h3 className="text-2xl font-bold mb-8">Für Mieter</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card
              title="Mietvertrags-Check"
              description="Vertrag hochladen und innerhalb von 24h eine Analyse der wichtigsten Klauseln erhalten."
              price="49 €"
              cta="Vertrag prüfen"
            />
            <Card
              title="Express-Check"
              description="Dringend? Erhalten Sie Ihre Auswertung garantiert innerhalb von 6h."
              price="79 €"
              cta="Express buchen"
            />
            <Card
              title="Zusatzfrage"
              description="Spezielle Fragen zu Paragraphen oder Klauseln? Individuelle Rückmeldung."
              price="+24 €"
              cta="Frage stellen"
            />
          </div>
        </section>

        {/* Konfliktmanagement Flow */}
        <section className="bg-gray-100 py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-8">Konfliktmanagement – So funktioniert es</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
              {["Problem melden", "Vermieter benachrichtigen", "14 Tage Reaktionsfrist", "Öffentliche Bewertung"].map(
                (step, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="h-16 w-16 rounded-full bg-indigo-600 text-white grid place-items-center text-2xl">
                      {i + 1}
                    </div>
                    <p className="mt-3 text-gray-700">{step}</p>
                  </div>
                )
              )}
            </div>
          </div>
        </section>

        {/* Vermieter Services */}
        <section id="vermieter" className="bg-gray-100 py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-bold mb-8">Für Vermieter</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ComingSoonCard title="Mieter-Screening" />
              <ComingSoonCard title="Nomaden-Check" />
              <ComingSoonCard title="Grundbuch-Service" />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="max-w-4xl mx-auto py-16 px-6">
          <h3 className="text-2xl font-bold mb-8 text-center">FAQ</h3>
          <div className="space-y-4">
            {[
              {
                q: "Wie funktioniert der Mietvertrags-Check?",
                a: "Sie laden Ihren Mietvertrag hoch, unser System analysiert die wichtigsten Klauseln und liefert eine Übersicht – keine Rechtsberatung."
              },
              {
                q: "Wie funktioniert der Konfliktservice?",
                a: "Sie melden ein Problem, der Vermieter wird informiert und hat 14 Tage Zeit. Danach kann eine öffentliche Bewertung freigeschaltet werden."
              },
              {
                q: "Sind meine Daten sicher?",
                a: "Ja, wir speichern Verträge verschlüsselt und löschen sie nach definierter Frist automatisch."
              }
            ].map((item, i) => (
              <div key={i} className="bg-white shadow rounded-lg p-4">
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex justify-between items-center font-semibold"
                >
                  {item.q}
                  <span>{faqOpen === i ? "−" : "+"}</span>
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
