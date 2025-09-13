import { useState, useMemo } from "react";

// ===== Tenant (Mieter) Page =====
export default function TenantPage() {
  return (
    <>
      <Hero />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionDivider />
        <RatingsSection />
        <SectionDivider />
        <ContractCheckSection />
        <SectionDivider />
        <ConflictManagementSection />
        <SectionDivider />
        <FAQSection />
      </main>
    </>
  );
}

function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
            Mietvertrag verstehen. <span className="text-gray-500">Vermieter & Wohnungen transparent bewerten.</span>
          </h1>
          <p className="mt-5 text-lg text-gray-600 max-w-prose">
            Hilf anderen Mieter:innen mit ehrlichen Erfahrungen – und schütze dich selbst vor bösen Überraschungen.
            Optional prüfen wir deinen Mietvertrag innerhalb von 24 Stunden.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#contract" className="rounded-2xl bg-gray-900 text-white px-5 py-3 text-sm font-medium shadow hover:shadow-md">Mietvertrags-Check (49 €)</a>
            <a href="#ratings" className="rounded-2xl bg-white text-gray-900 px-5 py-3 text-sm font-medium border border-gray-300 hover:bg-gray-100">Vermieter bewerten</a>
          </div>
          <div className="mt-6 flex items-center gap-3 text-xs text-gray-500">
            DSGVO-freundlich • Anonyme Bewertungen • Moderiert
          </div>
        </div>
        <div className="relative">
          <div className="rounded-3xl border border-gray-200 bg-white shadow-sm p-6">
            <MockupCard />
          </div>
        </div>
      </div>
    </section>
  );
}

function MockupCard() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">Musterstraße 5, 1200 Wien</div>
          <div className="text-xs text-gray-500">Vermieter: C. Schinko (verifiziert)</div>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < 4 ? "text-yellow-400" : "text-gray-300"}>★</span>
          ))}
          <span className="ml-2 text-sm font-medium">4,2</span>
        </div>
      </div>
      <div className="text-sm text-gray-600">„Heizung im Winter 10 Tage defekt, danach schnelle Lösung. Hellhörig.“</div>
    </div>
  );
}

function SectionDivider(){
  return <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent my-12"/>;
}

function RatingsSection(){
  return (
    <section id="ratings">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">Bewertungen entdecken</h2>
      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <p className="text-sm text-gray-600">Suche nach Adresse, Vermieter, Hausverwaltung oder Makler. Teile deine Erfahrung anonym und hilf anderen.</p>
      </div>
    </section>
  );
}

function ContractCheckSection(){
  const [express, setExpress] = useState(false);
  const [extraQ, setExtraQ] = useState(false);
  const base = 49;
  const expressFee = 20;
  const extraFee = 24;
  const subtotal = useMemo(()=> base + (express?expressFee:0) + (extraQ?extraFee:0), [express, extraQ]);

  return (
    <section id="contract">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">Mietvertrags-Check (24h)</h2>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-600">Schnelle Einschätzung deines Mietvertrags. Kein Ersatz für Rechtsberatung.</p>
        <div className="mt-4 text-sm text-gray-700">Gesamt: €{subtotal}</div>
        <div className="mt-4 flex gap-2">
          <button onClick={()=>setExpress(!express)} className="px-3 py-2 border rounded-xl text-sm">Express (+20€)</button>
          <button onClick={()=>setExtraQ(!extraQ)} className="px-3 py-2 border rounded-xl text-sm">Zusatzfrage (+24€)</button>
        </div>
      </div>
    </section>
  );
}

function ConflictManagementSection(){
  return (
    <section id="conflict">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">Konflikt-Management</h2>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-sm text-gray-600">Starte kostenlos einen Konfliktfall mit Fristsetzung. Optional: Forcieren für mehr Druck.</p>
        <div className="mt-4 flex gap-2">
          <button className="rounded-2xl bg-gray-900 text-white px-4 py-2 text-sm">Gratis starten</button>
          <button className="rounded-2xl border border-gray-300 bg-white px-4 py-2 text-sm">Forcieren (29€)</button>
        </div>
      </div>
    </section>
  );
}

function FAQSection(){
  return (
    <section id="faq">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-4">FAQ</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <FAQItem q="Sind Bewertungen anonym?" a="Ja, öffentliche Anzeigen sind anonymisiert." />
        <FAQItem q="Was passiert bei Rechtsstreit?" a="14-Tage-Schlichtungsfenster, Moderation, optional Forcieren." />
      </div>
    </section>
  );
}

function FAQItem({ q, a }:{ q:string; a:string }){
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <button onClick={()=> setOpen(!open)} className="w-full text-left flex items-center justify-between gap-3">
        <div className="text-sm font-medium">{q}</div>
        <div className="text-xl text-gray-400">{open? '–' : '+'}</div>
      </button>
      {open && <div className="mt-3 text-sm text-gray-600">{a}</div>}
    </div>
  );
}
