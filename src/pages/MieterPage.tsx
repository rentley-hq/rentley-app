import React from "react";
import ServiceCard from "../components/ServiceCard";

export default function MieterPage() {
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
        <h2 className="text-4xl font-bold mb-4">Für Mieter</h2>
        <p className="text-lg mb-6">
          Verständliche Mietvertrags-Checks, transparente Bewertungen und professionelles Konfliktmanagement.
        </p>
      </section>

      {/* Services */}
      <section className="max-w-6xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <ServiceCard
          title="Mietvertrags-Check"
          description="Lade deinen Mietvertrag hoch und erhalte in 24h eine klare Analyse mit verständlichen Hinweisen."
          price="49 €"
          cta="Jetzt prüfen lassen"
        />
        <ServiceCard
          title="Zusatzfrage"
          description="Individuelle Detailfragen oder spezielle Klauseln können zusätzlich erklärt werden."
          price="+24 €"
          cta="Frage stellen"
        />
        <ServiceCard
          title="Konfliktmanagement"
          description="Dokumentierte Schlichtung, Mediation und Androhung öffentlicher Bewertung."
          price="ab 49 €"
          cta="Konflikt starten"
        />
      </section>

      {/* Konfliktmanagement Prozess */}
      <section className="bg-gray-100 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-8">So funktioniert unser Konfliktmanagement</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-indigo-600 text-white grid place-items-center">1</div>
              <p className="mt-2 text-sm font-medium">Problem melden</p>
            </div>
            <div className="text-gray-400 text-2xl">→</div>
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-indigo-600 text-white grid place-items-center">2</div>
              <p className="mt-2 text-sm font-medium">Vermieter wird benachrichtigt</p>
            </div>
            <div className="text-gray-400 text-2xl">→</div>
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-indigo-600 text-white grid place-items-center">3</div>
              <p className="mt-2 text-sm font-medium">Frist & Mediation</p>
            </div>
            <div className="text-gray-400 text-2xl">→</div>
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-indigo-600 text-white grid place-items-center">4</div>
              <p className="mt-2 text-sm font-medium">Öffentliche Bewertung</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
