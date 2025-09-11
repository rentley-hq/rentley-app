import React from "react";
import ComingSoonCard from "../components/ComingSoonCard";

export default function VermieterPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">Rentley</h1>
          <nav className="space-x-6 text-gray-600 font-medium">
            <a href="/mieter">Mieter-Services</a>
            <a href="/vermieter">Vermieter-Services</a>
          </nav>
        </div>
      </header>

      <section className="bg-indigo-600 text-white text-center py-16 px-6">
        <h2 className="text-4xl font-bold mb-4">Vermieter-Services</h2>
        <p className="text-lg mb-6">
          Tools, um Mieter besser kennenzulernen und Risiken zu reduzieren.
        </p>
      </section>

      <section className="max-w-6xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <ComingSoonCard title="Mieter-Screening" />
        <ComingSoonCard title="Nomaden-Check" />
        <ComingSoonCard title="Vermieter-Dashboard" />
      </section>
    </div>
  );
}
