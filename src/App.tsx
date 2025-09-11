import React from "react";
import ServiceCard from "./components/ServiceCard";
import ComingSoonCard from "./components/ComingSoonCard";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">Rentley</h1>
          <nav className="space-x-6 text-gray-600 font-medium">
            <a href="#mieter">Mieter-Services</a>
            <a href="#vermieter">Vermieter-Services</a>
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

      {/* Footer */}
      <footer className="bg-white border-t py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-6 text-gray-500 text-sm flex justify-between">
          <p>© {new Date().getFullYear()} Rentley – Alle Rechte vorbehalten.</p>
          <p>Impressum · Datenschutz</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

