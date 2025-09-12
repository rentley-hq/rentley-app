import React from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

export default function VermieterPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      <main className="flex-grow max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8">Vermieter-Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Mieter-Screening</h3>
            <p className="text-gray-600">Prüfen Sie Bonität und Zuverlässigkeit zukünftiger Mieter.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Nomaden-Check</h3>
            <p className="text-gray-600">Schützen Sie sich vor Mietnomaden durch Risikodatenbanken.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Grundbuch-Service</h3>
            <p className="text-gray-600">Lassen Sie Eigentumsverhältnisse schnell und einfach prüfen.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
