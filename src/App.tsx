import React, { useState } from "react";
import SecureWrapper from "./SecureWrapper";

// Simple Card-Komponenten
const ServiceCard = ({ title, description, price, cta }: { title: string; description: string; price?: string; cta?: string }) => (
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
  const [showFAQ, setShowFAQ] = useState(false);

  return (
    <SecureWrapper>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-md sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-indigo-600">Rentley</h1>
            <nav className="space-x-6 text-gray-600 font-medium">
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
            Schnell, anonym und fair – unsere Plattform unterstützt Mieter & Vermieter mit digitalen Services.
          </p>
          <a
            href="#mieter"
            className="bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg shadow hover:bg-gray-100"
          >
            Jetzt starten
          </a>
        </section>

        {/* Mieter Services */}
        <section id="mieter" className="max-w-6xl mx-auto py-16 px-6">
          <h3 className="text-2xl font-bold mb-8">Für Mieter</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard
              title="Mietvertrags-Check"
              description="Laden Sie Ihren Mietvertrag hoch und erhalten Sie innerhalb von 24h eine strukturierte Analyse."
              price="49 €"
              cta="Vertrag prüfen"
            />
            <ServiceCard
              title="Zusatzfragen"
              description="Haben Sie eine spezielle Frage zu Ihrem Vertrag oder einem Paragraphen?"
              price="+24 €"
              cta="Frage stellen"
            />
            <ServiceCard
              title="Konfliktmanagement"
              description="Offizielles Tracking von Problemen, Mediation & Androhung von öffentlicher Bewertung."
              price="ab 49 €"
              cta="Konflikt melden"
            />
          </div>
        </section>

        {/* Konfliktmanagement Flow */}
        <section className="bg-gray-100 py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-8">Konfliktmanagement – So funktioniert es</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
              <div className="flex flex-col items-center">
                <div className="h-16 w-16 rounded-full bg-indigo-600 text-white grid place-items-center text-2xl">1</div>
                <p className="mt-3 text-gray-700">Problem melden</p>
              </div>
              <div className="text-3xl text-gray-400 hidden md:block">➔</div>
              <div className="flex flex-col items-center">
                <div className="h-16 w-16 rounded-full bg-indigo-600 text-white grid place-items-center text-2xl">2</div>
                <p className="mt-3 text-gray-700">Vermieter benachrichtigen</p>
              </div>
              <div className="text-3xl text-gray-400 hidden md:block">➔</div>
              <div className="flex flex-col items-center">
                <div className="h-16 w-16 rounded-full bg-indigo-600 text-white grid place-items-center text-2xl">3</div>
                <p className="mt-3 text-gray-700">14 Tage Reaktionsfrist</p>
              </div>
              <div className="text-3xl text-gray-400 hidden md:block">➔</div>
              <div className="flex flex-col items-center">
                <div className="h-16 w-16 rounded-full bg-indigo-600 text-white grid place-items-center text-2xl">4</div>
                <p className="mt-3 text-gray-700">Öffentliche Bewertung</p>
              </div>
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
              <ComingSoonCard title="Dashboard & Reports" />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="max-w-4xl mx-auto py-16 px-6">
          <h3 className="text-2xl font-bold mb-8 text-center">FAQ</h3>
          <div className="space-y-4">
            <div className="bg-white shadow rounded-lg p-4">
              <button
                onClick={() => setShowFAQ(!showFAQ)}
                className="w-full flex justify-between items-center font-semibold"
              >
                Wie funktioniert der Mietvertrags-Check?
                <span>{showFAQ ? "−" : "+"}</span>
              </button>
              {showFAQ && (
                <p className="mt-2 text-gray-600">
                  Sie laden Ihren Mietvertrag hoch, unser System analysiert die wichtigsten Klauseln,
                  markiert potenzielle Stolperfallen und liefert eine strukturierte Übersicht – keine Rechtsberatung.
                </p>
              )}
            </div>
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
