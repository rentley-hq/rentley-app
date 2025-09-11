import React from "react";
import ComingSoonCard from "../components/ComingSoonCard";

export default function VermieterPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">Rentley</h1>
          <nav className="space-x-6 text-gray-600 font-medium">
            <a href="/mieter">Mieter</a>
            <a href="/vermieter">Vermieter</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-indigo-600 text-white text-center py-16 px-6">
        <h2 className="text-4xl font-bold mb-4">Für Vermieter</h2>
        <p className="text-lg mb-6">
          Mehr Sicherheit bei der Mieterauswahl und klare Tools gegen Mietnomaden.
        </p>
      </section>

      {/* Services */}
      <section className="max-w-6xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <ComingSoonCard title="Mieter-Screening (29 €)" />
        <ComingSoonCard title="Nomaden-Check (69 €)" />
        <ComingSoonCard title="Dashboard & Reports" />
      </section>

      {/* Info-Block */}
      <section className="bg-gray-100 py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">Demnächst verfügbar</h3>
          <p className="text-gray-600">
            Vermieter-Services befinden sich aktuell im Aufbau. Bald können Sie zuverlässige Screenings durchführen und
            Risikoindikatoren nutzen, um bessere Entscheidungen zu treffen.
          </p>
        </div>
      </section>
    </div>
  );
}
