import React, { useState } from "react";
import Layout from "../components/Layout";
import Ratings from "../components/Ratings";
import ContractCheck from "../components/ContractCheck";
import ConflictManagement from "../components/ConflictManagement";
import FAQ from "../components/FAQ";
import ReviewModal from "../components/ReviewModal";

export default function MieterPage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-accent text-white text-center py-20 px-6">
        <h1 className="text-5xl font-bold mb-4">Miettransparenz für alle</h1>
        <p className="text-lg max-w-2xl mx-auto mb-6 text-gray-100">
          Bewertungen lesen und schreiben, Mietverträge prüfen lassen und
          Konflikte offiziell dokumentieren – alles auf einer Plattform.
        </p>
        <button
          onClick={() => setReviewModalOpen(true)}
          className="bg-white text-accent font-semibold py-3 px-6 rounded-lg shadow hover:bg-gray-100"
        >
          ⭐ Erste Bewertung abgeben
        </button>
      </section>

      {/* Bewertungen */}
      <Ratings onOpenReview={() => setReviewModalOpen(true)} />

      {/* Mietvertrags-Check */}
      <ContractCheck />

      {/* Konfliktmanagement */}
      <ConflictManagement />

      {/* FAQ */}
      <FAQ faqOpen={faqOpen} setFaqOpen={setFaqOpen} />

      {/* Review Modal */}
      <ReviewModal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
      />
    </Layout>
  );
}
