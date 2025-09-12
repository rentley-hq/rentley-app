import React from "react";

export default function ConflictManagement() {
  const steps = [
    "Problem melden",
    "Vermieter kontaktieren",
    "14 Tage Frist setzen",
    "Öffentliche Bewertung freigeben",
  ];

  return (
    <section id="konflikt" className="bg-gray-100 py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h3 className="text-2xl font-bold mb-8">⚖️ Konfliktfall aktiv begleiten</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="h-16 w-16 rounded-full bg-indigo-600 text-white grid place-items-center text-2xl font-bold">
                {i + 1}
              </div>
              <p className="mt-3 text-gray-700">{step}</p>
            </div>
          ))}
        </div>
        <button className="mt-8 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700">
          ➕ Konfliktfall starten
        </button>
      </div>
    </section>
  );
}
