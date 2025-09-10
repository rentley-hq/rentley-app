import { useState } from 'react';

export default function App(){
  const [role, setRole] = useState<'mieter'|'vermieter'>('mieter');
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header onSwitch={()=> setRole(r => r==='mieter'?'vermieter':'mieter')} role={role} />
      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        {role==='mieter' ? <TenantHome/> : <LandlordHome/>}
      </main>
      <Footer/>
    </div>
  );
}

function Header({ onSwitch, role }:{ onSwitch: ()=>void; role:'mieter'|'vermieter'}){
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/70 border-b border-gray-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl bg-gray-900 text-white grid place-items-center font-bold">R</div>
          <div className="font-semibold tracking-tight">Rentley <span className="text-gray-400 font-normal">(MVP)</span></div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          <a className="hover:text-gray-900" href="#services">Services</a>
          <a className="hover:text-gray-900" href="#faq">FAQ</a>
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={onSwitch} className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-100">
            {role==='mieter' ? 'Zu Vermieter-Services' : 'Zu Mieter-Services'}
          </button>
          <button className="rounded-xl bg-gray-900 text-white px-3 py-2 text-sm">Anmelden</button>
        </div>
      </div>
    </header>
  );
}

function Card({title, children}:{title:string; children:React.ReactNode}){
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="text-lg font-semibold">{title}</div>
      <div className="mt-2 text-sm text-gray-600">{children}</div>
    </div>
  );
}

function TenantHome(){
  return (
    <section className="grid md:grid-cols-2 gap-6" id="services">
      <Card title="Mietvertrags‑Check (24h) – 49 €">
        Lade deinen Mietvertrag hoch und erhalte eine verständliche Zusammenfassung samt Stolperfallen. Dies ist eine **informative Einschätzung** – keine Rechtsberatung.
        <div className="mt-4 flex gap-2">
          <button className="rounded-2xl bg-gray-900 text-white px-4 py-2 text-sm">Jetzt prüfen lassen</button>
          <button className="rounded-2xl border border-gray-300 bg-white px-4 py-2 text-sm">Mehr erfahren</button>
        </div>
      </Card>
      <Card title="Bewertungen: Vermieter & Objekte">
        Suche nach Adresse oder Vermieternamen und teile anonym deine Erfahrung. Moderiert, DSGVO‑freundlich.
      </Card>
      <Card title="Konflikt‑Management (Coming Soon)">
        Offizielles, dokumentiertes Schlichtungsfenster (14 Tage) mit fairen Erinnerungen und optionaler Mediation.
      </Card>
    </section>
  );
}

function LandlordHome(){
  return (
    <section className="grid md:grid-cols-2 gap-6" id="services">
      <Card title="Tenant Trust Badge (Coming Soon)">
        Einladungslink zur Bonitäts-/Identitätsprüfung des Mieters. DSGVO‑konform, transparent.
      </Card>
      <Card title="Nomaden‑Check (Coming Soon)">
        Case‑basierter Risikoindikator mit rechtssicherer Dokumentation.
      </Card>
      <Card title="Screening‑Link – 29 € (Beta)">
        Einmaliger Screening‑Link pro Interessent: strukturierte Angaben + Uploads + Einwilligung. Ergebnisse in deinem Dashboard.
      </Card>
    </section>
  );
}

function Footer(){
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 text-sm text-gray-600">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-2xl bg-gray-900 text-white grid place-items-center font-bold">R</div>
            <div>
              <div className="font-semibold">Rentley</div>
              <div className="text-xs text-gray-500">Datensparsam • DSGVO‑freundlich • EU‑Hosting</div>
            </div>
          </div>
          <div className="flex gap-4 text-xs">
            <a href="#" className="hover:text-gray-900">Impressum</a>
            <a href="#" className="hover:text-gray-900">Datenschutz</a>
            <a href="#" className="hover:text-gray-900">Richtlinien</a>
          </div>
        </div>
      </div>
    </footer>
  );
}