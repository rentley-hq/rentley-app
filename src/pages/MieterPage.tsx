import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Hero from "../components/Hero";
import Ratings from "../components/Ratings";
import ContractCheck from "../components/ContractCheck";
import ConflictManagement from "../components/ConflictManagement"; // ✅ NEU
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

export default function MieterPage() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavBar />
      <Hero />
      <main className="flex-grow">
        <Ratings />
        <ContractCheck />
        <ConflictManagement /> {/* ✅ HIER eingefügt */}
        <FAQ faqOpen={faqOpen} setFaqOpen={setFaqOpen} />
      </main>
      <Footer />
    </div>
  );
}
