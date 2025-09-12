import React from "react";

export default function FAQ({
  faqOpen,
  setFaqOpen,
}: {
  faqOpen: number | null;
  setFaqOpen: (val: number | null) => void;
}) {
  const faqs = [
    {
      q: "Wie funktioniert der Mietvertrags-Check?",
      a: "Du lädst deinen Vertrag hoch, wir analysieren ihn und geben dir innerhalb von 24 h eine Rückmeldung mit Stolperfallen.",
    },
    {
      q: "Ist meine Bewertung anonym?",
      a: "Ja. Nur verifizierte Nutzer dürfen bewerten, aber dein Name erscheint nicht öffentlich.",
    },
    {
      q: "Was passiert bei einem Konfliktfall?",
      a: "Du kannst ein offizielles Konfliktverfahren starten. Wir setzen eine Frist und veröffentlichen ggf. die Bewertung nach Ablauf.",
    },
  ];

  return (
    <section id="faq" className="max-w-4xl mx-auto py-16 px-6">
      <h3 className="text-2xl font-bold mb-8 text-center">🤔 Häufige Fragen</h3>
      <div className="space-y-4">
        {faqs.map((item, i) => (
          <div key={i} className="bg-white shadow rounded-lg p-4">
            <button
              onClick={() => setFaqOpen(faqOpen === i ? null : i)}
              className="w-full flex justify-between items-center font-semibold"
            >
              {item.q}
              <span>{faqOpen === i ? "−" : "+"}</span>
            </button>
            {faqOpen === i && <p className="mt-2 text-gray-600">{item.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
