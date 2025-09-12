import React, { useState } from "react";
import Layout from "../components/Layout";
import Ratings from "../components/Ratings";
import ContractCheck from "../components/ContractCheck";
import ConflictManagement from "../components/ConflictManagement";
import FAQ from "../components/FAQ";

export default function MieterPage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-accent text-white text-center py-20 px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Miettransparenz für alle
        </h1>
        <p className="text-lg max-w-2xl mx-auto mb-8 text-white/90">
          Bewerte deinen Vermieter oder deine Wohnung. Lass deinen Mietvertrag
          prüfen. Schütze dich – und hilf anderen Mietern in ganz Österreich.
        </p>
        <a
          href="#bewertungen"
          className="bg-white text-accent font-semibold py-3 px-6 rounded-lg shadow hover:bg-gray-100"
        >
          Jetzt starten
        </a>
      </section>

      {/* Bewertungen */}
      <Ratings />

      {/* Mietvertrags-Check */}
      <ContractCheck />

      {/* Konfliktmanagement */}
      <ConflictManagement />

      {/* FAQ */}
      <FAQ faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
    </Layout>
  );
}
