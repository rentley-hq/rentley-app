import { useMemo, useState } from "react";

// --- Minimalistisch moderner MVP-Mockup ---
// Hinweise:
// - Arbeitsname/Brand ist Platzhalter. Bitte später ersetzen.
// - Buttons, Upload und Payment sind Dummies für Demo & Feedback.
// - Tailwind-Klassen, keine externen UI-Libs nötig.

export default function App() {
  const initialRoute = (() => {
    if (typeof window === 'undefined') return '/mieter';
    const host = window.location.hostname.toLowerCase();
    if (host.startsWith('vermieter.')) return '/vermieter';
    if (host.startsWith('mieter.')) return '/mieter';
    return window.location.hash ? window.location.hash.replace('#', '') : '/mieter';
  })();

  const [route, setRoute] = useState(initialRoute);
  if (typeof window !== 'undefined') {
    window.onhashchange = () => setRoute(window.location.hash.replace('#', '') || '/mieter');
  }
  const isLandlord = route === '/vermieter';
  const switchRoute = (to: string) => {
    try { if (typeof window !== 'undefined') window.location.hash = to; } catch {}
    console.log('[analytics] route_switch', { from: route, to });
    setRoute(to);
  };

  return (
    <div className={`min-h-screen ${isLandlord ? 'bg-white' : 'bg-gray-50'} text-gray-900`}>
      <NavBar isLandlord={isLandlord} onSwitch={switchRoute} />
      {isLandlord ? <LandlordPage onSwitch={switchRoute} /> : <TenantPage onSwitch={switchRoute} />}
      <Footer />
    </div>
  );
}

function NavBar({ isLandlord, onSwitch }: { isLandlord: boolean; onSwitch: (to:string)=>void }) {
  return (
    <header className={`sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 ${isLandlord ? 'bg-white' : 'bg-white/70'} border-b border-gray-200`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`h-9 w-9 rounded-2xl ${isLandlord ? 'bg-blue-700' : 'bg-gray-900'} text-white grid place-items-center font-bold`}>M</div>
          <div className="font-semibold tracking-tight">MietRadar <span className="text-gray-400 font-normal">(Arbeitsname)</span></div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          {!isLandlord && <ScrollLink target="ratings">Bewertungen</ScrollLink>}
          {!isLandlord && <ScrollLink target="contract">Mietvertrags‑Check</ScrollLink>}
          {isLandlord && <button onClick={()=> onSwitch('/vermieter')} className="hover:text-gray-900">Vermieter‑Services</button>}
          <ScrollLink target="faq">FAQ</ScrollLink>
        </nav>
        <div className="flex items-center gap-3">
          <CountrySwitcher />
          <button onClick={()=> onSwitch(isLandlord ? '/mieter' : '/vermieter')} className={`rounded-xl border ${isLandlord ? 'border-blue-200 bg-blue-50 text-blue-900' : 'border-gray-300 bg-white text-gray-900'} px-3 py-2 text-sm hover:bg-gray-100`}>{isLandlord ? '→ Zu Mieter‑Services' : '→ Zu Vermieter‑Services'}</button>
          <button className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-100">Anmelden</button>
        </div>
      </div>
    </header>
  );
}

function CountrySwitcher() {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState({ code: "AT", label: "Österreich" });
  const items = [
    { code: "AT", label: "Österreich" },
    { code: "DE", label: "Deutschland" },
    { code: "IT", label: "Italia" },
    { code: "UK", label: "United Kingdom" },
  ];
  return (
    <div className="relative">
      <button onClick={() => setOpen((v) => !v)} className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-100 flex items-center gap-2">
        <span className="inline-flex h-4 w-6 items-center justify-center rounded-md bg-gray-900 text-white text-[10px] font-semibold">{country.code}</span>
        <span className="hidden sm:inline">{country.label}</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl border border-gray-200 bg-white shadow-xl">
          {items.map((it) => (
            <button key={it.code} onClick={() => { setCountry(it); setOpen(false); }} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50">
              {it.label}
            </button>
          ))}
        </div>
      )}
    </div>
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
            Optional prüfen wir deinen Mietvertrag innerhalb von 24 Stunden.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ScrollLink target="contract" kind="primary">Mietvertrags‑Check (49 €)</ScrollLink>
            <ScrollLink target="ratings">Vermieter bewerten</ScrollLink>
          </div>
          <div className="mt-6 flex items-center gap-3 text-xs text-gray-500">
            <ShieldIcon /> DSGVO‑freundlich • Anonyme Bewertungen • Moderiert
          </div>
        </div>
        <div className="relative">
          <div className="rounded-3xl border border-gray-200 bg-white shadow-sm p-6">
            <MockupCard />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden md:block rounded-3xl border border-gray-200 bg-white shadow-sm p-4 rotate-[-3deg]">
            <MiniStat />
          </div>
        </div>
      </div>
    </section>
  );
}

function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
      <path d="M12 3l7 4v5c0 5-3.5 9-7 9s-7-4-7-9V7l7-4z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

function Star({ filled }: { filled?: boolean }) {
  return (
    <svg viewBox="0 0 20 20" className={`h-4 w-4 ${filled ? "fill-yellow-400" : "fill-gray-200"}`}>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.968 0 1.371 1.24.588 1.81l-2.802 2.035a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.035a1 1 0 00-1.175 0l-2.802 2.035c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.88 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
    </svg>
  );
}

function MockupCard() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold">Musterstraße 5, 1200 Wien</div>
          <div className="text-xs text-gray-500">Vermieter: C. Schinko (verifiziert)</div>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => <Star key={i} filled={i<4} />)}
          <span className="ml-2 text-sm font-medium">4,2</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 text-xs">
        {[
          { label: "Kommunikation", score: 4 },
          { label: "Reparaturen", score: 3 },
          { label: "Fairness", score: 4 },
          { label: "Lärm", score: 2 },
        ].map((k)=> (
          <div key={k.label} className="rounded-xl border border-gray-200 p-3">
            <div className="mb-1 text-gray-500">{k.label}</div>
            <div className="flex items-center gap-1">{[...Array(5)].map((_,i)=> <Star key={i} filled={i<k.score} />)}</div>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-gray-200 p-3 text-sm">
        <div className="text-gray-700 line-clamp-3">
          „Heizung im Winter 10 Tage defekt, danach schnelle Lösung. Haus hellhörig (Hundebellen). Vermieter reagiert inzwischen zügig.“
        </div>
        <div className="mt-2 text-xs text-gray-500">Anonym • 12.08.2025 • <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-red-500"></span> Konfliktfall (fristgesetzt)</span></div>
      </div>
    </div>
  );
}

function MiniStat() {
  return (
    <div className="text-sm">
      <div className="text-gray-500">Ø Weiterempfehlung</div>
      <div className="text-3xl font-semibold">72<span className="text-base align-super">%</span></div>
      <div className="mt-2 text-gray-500">basierend auf 128 Bewertungen</div>
    </div>
  );
}

function SectionDivider(){
  return <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent my-12"/>;
}

function ScrollLink({ target, children, kind }:{ target:string; children:React.ReactNode; kind?:'primary'|'secondary'}){
  const classes = kind==='primary'
    ? 'rounded-2xl bg-gray-900 text-white px-5 py-3 text-sm font-medium shadow hover:shadow-md'
    : 'rounded-2xl bg-white text-gray-900 px-5 py-3 text-sm font-medium border border-gray-300 hover:bg-gray-100';
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  return <button onClick={onClick} className={classes}>{children}</button>;
}

function RatingsSection(){
  const [query, setQuery] = useState("");
  const [showReview, setShowReview] = useState(false);
  return (
    <section id="ratings" className="">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Bewertungen entdecken</h2>
          <p className="text-gray-600 mt-2 text-sm">Suche nach Adresse, Vermieter, <strong>Hausverwaltung</strong> oder <strong>Makler</strong>. Teile deine Erfahrung anonym und hilf anderen.</p>
        </div>
        <button onClick={()=>setShowReview(true)} className="rounded-2xl bg-gray-900 text-white px-4 py-2 text-sm font-medium shadow hover:shadow-md">Bewertung abgeben</button>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-3 sm:p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label className="sr-only">Suche</label>
            <input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="z.B. Musterstraße 5 / Max Beispiel GmbH / Hausverw. XY / Makler Z" className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:ring-4 focus:ring-gray-200"/>
          </div>
          <button className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm hover:bg-gray-50">Suchen</button>
        </div>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          {[1,2,3,4].map((i)=> (
            <div key={i} className="rounded-2xl border border-gray-200 p-4 hover:shadow-sm transition">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Musterstraße {i+2}, 1200 Wien</div>
                  <div className="text-xs text-gray-500">Vermieter: Hausverw. Beispiel</div>
                </div>
                <div className="flex items-center gap-1">{[...Array(5)].map((_,j)=>(<Star key={j} filled={j<Math.max(2, 5-i)} />))}</div>
              </div>
              <p className="mt-2 text-sm text-gray-600 line-clamp-2">„Haus sauber, Reparaturen flott. Hellhörig am Wochenende. Insgesamt ok.“</p>
            </div>
          ))}
        </div>
      </div>

      {showReview && <ReviewModal onClose={()=>setShowReview(false)} />}
    </section>
  );
}

function ReviewModal({ onClose }: { onClose: ()=>void }){
  const [type, setType] = useState<'objekt'|'vermieter'|'hausverwaltung'|'makler'>('objekt');
  const [stars, setStars] = useState({ comm: 0, repair: 0, fair: 0, noise: 0});
  const [text, setText] = useState("");
  const [conflict, setConflict] = useState(false);
  const ratingItem = (label: string, key: keyof typeof stars) => (
    <div className="flex items-center justify-between py-2">
      <div className="text-sm text-gray-700">{label}</div>
      <div className="flex items-center gap-1">
        {[1,2,3,4,5].map((i)=> (
          <button key={i} onClick={()=> setStars({...stars, [key]: i})} className="p-1" aria-label={`${label} ${i} Sterne`}>
            <Star filled={i <= stars[key]} />
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/40 p-4 sm:p-8 overflow-y-auto">
      <div className="mx-auto max-w-2xl rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="text-lg font-semibold">Bewertung abgeben</div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-900">✕</button>
        </div>
        <div className="p-5 grid gap-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500">Was bewertest du?</label>
              <div className="mt-2 flex flex-wrap gap-2">
                <button onClick={()=>setType('objekt')} className={`px-3 py-2 rounded-xl border text-sm ${type==='objekt' ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 bg-white'}`}>Objekt/Adresse</button>
                <button onClick={()=>setType('vermieter')} className={`px-3 py-2 rounded-xl border text-sm ${type==='vermieter' ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 bg-white'}`}>Vermieter</button>
                <button onClick={()=>setType('hausverwaltung')} className={`px-3 py-2 rounded-xl border text-sm ${type==='hausverwaltung' ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 bg-white'}`}>Hausverwaltung</button>
                <button onClick={()=>setType('makler')} className={`px-3 py-2 rounded-xl border text-sm ${type==='makler' ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 bg-white'}`}>Makler</button>
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500">Adresse oder Name</label>
              <input placeholder={type==='objekt' ? 'z.B. Musterstraße 5, 1200 Wien' : 'z. B. Max Beispiel GmbH / Hausverw. XY / Makler Z'} className="mt-2 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm" />
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 p-4">
            <div className="text-sm font-medium">Sternebewertung</div>
            {ratingItem('Kommunikation', 'comm')}
            {ratingItem('Reparaturen', 'repair')}
            {ratingItem('Fairness', 'fair')}
            {ratingItem('Lärm', 'noise')}
          </div>

          <div>
            <label className="text-sm font-medium">Erfahrungsbericht</label>
            <textarea value={text} onChange={(e)=> setText(e.target.value)} rows={5} placeholder="Bitte sachlich bleiben. Keine Beleidigungen, keine vollen Namen Dritter. Mind. 100 Zeichen empfohlen." className="mt-2 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm" />
            <div className="mt-2 text-xs text-gray-500">Durch das Absenden stimmst du unseren Richtlinien zu. Wir moderieren neue Beiträge.</div>
          </div>

          <div className="flex items-center gap-2">
            <input id="conflict" type="checkbox" checked={conflict} onChange={(e)=> setConflict(e.target.checked)} className="h-4 w-4" />
            <label htmlFor="conflict" className="text-sm">Konfliktfall aktiv (14‑Tage‑Schlichtungsfenster vor Veröffentlichung)</label>
          </div>

          <div className="flex justify-end gap-3">
            <button onClick={onClose} className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm">Abbrechen</button>
            <button className="rounded-xl bg-gray-900 text-white px-4 py-2 text-sm">Senden</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContractCheckSection(){
  const [express, setExpress] = useState(false);
  const [extraQ, setExtraQ] = useState(false);
  const [question, setQuestion] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState<{type:'abs'|'pct'|'none', value:number}>({type:'none', value:0});
  const [applying, setApplying] = useState(false);
  const [msg, setMsg] = useState<string|undefined>();

  const base = 49;
  const expressFee = 20;
  const extraFee = 24; // angepasst
  const subtotal = useMemo(()=> base + (express?expressFee:0) + (extraQ?extraFee:0), [express, extraQ]);
  const discountValue = useMemo(()=> {
    if (discount.type==='abs') return Math.min(discount.value, subtotal);
    if (discount.type==='pct') return Math.round(subtotal * discount.value * 100) / 100;
    return 0;
  }, [discount, subtotal]);
  const total = Math.max(0, Math.round((subtotal - discountValue) * 100) / 100);

  function applyVoucher(c:string){
    const codeNorm = c.trim().toUpperCase();
    setApplying(true); setMsg(undefined);
    // Fake-Backend: simuliert API-Check
    setTimeout(()=>{
      let res: {type:'abs'|'pct'|'none', value:number} = {type:'none', value:0};
      if (codeNorm === 'START10') res = {type:'abs', value:10};
      else if (codeNorm === 'BETA50') res = {type:'pct', value:0.5};
      else if (codeNorm === 'FREECHECK') res = {type:'pct', value:1};

      if (res.type==='none') { setDiscount(res); setMsg('Code ungültig'); }
      else { setDiscount(res); setMsg('Code angewendet'); }
      setApplying(false);
      console.log('[analytics] voucher_applied', { code: codeNorm, res });
    }, 700);
  }

  return (
    <section id="contract" className="">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Mietvertrags‑Check (24h)</h2>
        <p className="text-gray-600 mt-2 text-sm">Schnelle, verständliche Einschätzung deines Mietvertrags (KI‑unterstützt, mit menschlicher Prüfung). Kein Ersatz für Rechtsberatung.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xl font-semibold">Standard</div>
              <div className="text-sm text-gray-500">Rückmeldung in 24 Stunden</div>
            </div>
            <div className="text-3xl font-semibold">€{base}</div>
          </div>

          <ul className="mt-4 space-y-2 text-sm text-gray-700">
            <li>• Zusammenfassung der wichtigsten Klauseln</li>
            <li>• Hinweise auf Stolperfallen & unübliche Regelungen</li>
            <li>• Checkliste für Rückfragen an Vermieter/Hausverwaltung</li>
          </ul>

          <div className="mt-5 h-px bg-gray-200"/>

          <div className="mt-4 space-y-3">
            <label className="block text-sm font-medium">Vertrag hochladen (PDF/JPG)</label>
            <div className="rounded-xl border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">Drag & Drop oder Klicken zum Auswählen</div>

            <label className="block text-sm font-medium mt-4">E‑Mail für Ergebnis</label>
            <input value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="name@mail.com" className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"/>

            <div className="flex items-center justify-between rounded-xl border border-gray-200 p-3">
              <div>
                <div className="text-sm font-medium">Express (12h)</div>
                <div className="text-xs text-gray-500">Aufpreis +€{expressFee}</div>
              </div>
              <Switch checked={express} onChange={setExpress} />
            </div>

            <div className="rounded-2xl border border-gray-200 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Zusatzfrage / spezielles Thema</div>
                  <div className="text-xs text-gray-500">Wir gehen vertieft auf einen Punkt ein. Aufpreis +€{extraFee}</div>
                </div>
                <Switch checked={extraQ} onChange={setExtraQ} />
              </div>
              {extraQ && (
                <textarea value={question} onChange={(e)=> setQuestion(e.target.value)} rows={3} placeholder="Deine Zusatzfrage (z. B. Indexierung, Betriebskosten, Staffelmiethöhe, Haustierregelungen)" className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"/>
              )}
            </div>

            <div className="rounded-2xl border border-gray-200 p-3">
              <label className="block text-sm font-medium">Gutschein‑Code</label>
              <div className="mt-2 flex gap-2">
                <input value={code} onChange={(e)=> setCode(e.target.value)} placeholder="z. B. START10, BETA50" className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm"/>
                <button disabled={applying} onClick={()=> applyVoucher(code)} className="rounded-2xl bg-gray-900 text-white px-4 py-2 text-sm disabled:opacity-60">{applying? 'Prüfe…' : 'Anwenden'}</button>
              </div>
              {msg && <div className={`mt-2 text-xs ${discount.type==='none' ? 'text-red-600' : 'text-green-700'}`}>{msg}</div>}
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="text-sm text-gray-600">Zwischensumme</div>
              <div className="text-base font-medium">€{subtotal.toFixed(2)}</div>
            </div>
            {discountValue>0 && (
              <div className="flex items-center justify-between -mt-1">
                <div className="text-sm text-green-700">Rabatt</div>
                <div className="text-base font-medium text-green-700">–€{discountValue.toFixed(2)}</div>
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-900 font-medium">Gesamt</div>
              <div className="text-2xl font-semibold">€{total.toFixed(2)}</div>
            </div>

            <div className="grid sm:grid-cols-2 gap-2">
              <button className="rounded-2xl bg-gray-900 text-white px-4 py-3 text-sm font-medium shadow hover:shadow-md" onClick={()=> console.log('[order] mv_check', {email, express, extraQ, question, total})}>Jetzt prüfen lassen</button>
              <button className="rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm">PayPal</button>
            </div>

            <p className="text-xs text-gray-500 mt-3">
              Hinweis: Dies ist eine **informative Einschätzung** und **keine Rechtsberatung**. Für verbindliche Auskünfte empfehlen wir Mietervereinigung/Anwalt. Dateien werden vertraulich behandelt & automatisiert gelöscht.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-gray-500">Beispiel‑Ergebnis (Auszug)</div>
          <div className="mt-3 space-y-3 text-sm">
            <KPI label="Kaution" value="3 Bruttomonatsmieten (üblich)" />
            <KPI label="Indexierung" value="VPI 2020, jährliche Anpassung – nachvollziehbar" />
            <KPI label="Betriebskosten" value="Pauschale, fehlende Aufschlüsselung → Rückfrage empfohlen" highlight />
            <KPI label="Tierhaltung" value="Generelles Verbot – rechtlich zweifelhaft, Formulierung prüfen" highlight />
            <KPI label="Schönheitsreparaturen" value="Übertragung an Mieter – in AT nur eingeschränkt zulässig" highlight />
          </div>
          <div className="mt-6 rounded-2xl bg-gray-50 p-4 text-xs text-gray-600">
            <div className="font-medium text-gray-800 mb-2">Checkliste für Rückfragen</div>
            <ul className="list-disc ml-4 space-y-1">
              <li>Detaillierte BK‑Liste mit Vorjahresabrechnung anfordern</li>
              <li>Frist zur Mängelbehebung (Heizung, Feuchtigkeit) schriftlich festhalten</li>
              <li>Haustiere: Formulierung in Nebenabrede konkretisieren</li>
              <li>Übergabeprotokoll & Fotos Bestandteil des Vertrags</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function KPI({ label, value, highlight=false }:{ label:string; value:string; highlight?:boolean }){
  return (
    <div className={`rounded-xl border p-3 ${highlight? 'border-amber-300 bg-amber-50' : 'border-gray-200 bg-white'}`}>
      <div className="text-gray-500 text-xs">{label}</div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  );
}

function Switch({ checked, onChange }:{ checked: boolean; onChange: (v:boolean)=>void }){
  return (
    <button onClick={()=> onChange(!checked)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${checked? 'bg-gray-900' : 'bg-gray-300'}`}>
      <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${checked? 'translate-x-5' : 'translate-x-1'}`} />
    </button>
  );
}

function ConflictManagementSection(){
  const [force, setForce] = useState(false);
  const forceFee = 29;
  return (
    <section id="conflict" className="">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Konflikt‑Management</h2>
        <p className="text-gray-600 mt-2 text-sm">Starte kostenlos einen Konfliktfall mit Fristsetzung. Optional: <b>Forcieren</b> für mehr Durchschlagskraft.</p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="grid lg:grid-cols-7 items-center gap-4">
          <Step icon={
            <svg viewBox="0 0 24 24" className="h-8 w-8"><path d="M12 3l7 4v10l-7 4-7-4V7l7-4z" fill="currentColor"/></svg>
          } title="Problem melden" desc="Sachlich + Forderung + Frist" />
          <Arrow />
          <Step icon={
            <svg viewBox="0 0 24 24" className="h-8 w-8"><path d="M3 5h18v2H3zM3 11h12v2H3zM3 17h18v2H3z" fill="currentColor"/></svg>
          } title="Formalisierung" desc="Standard‑Schreiben an Vermieter/HV" />
          <Arrow />
          <Step icon={
            <svg viewBox="0 0 24 24" className="h-8 w-8"><circle cx="12" cy="12" r="10" fill="#e5e7eb"/><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          } title="14‑Tage‑Fenster" desc="Antwort & Lösung dokumentieren" />
          <Arrow />
          <Step icon={
            <svg viewBox="0 0 24 24" className="h-8 w-8"><path d="M5 12l4 4L19 6" stroke="currentColor" strokeWidth="2" fill="none"/></svg>
          } title="Gelöst" desc="Grünes Badge & Update" />
          <Arrow />
          <Step icon={
            <svg viewBox="0 0 24 24" className="h-8 w-8"><path d="M12 3l9 9-9 9-9-9 9-9z" fill="#fee2e2"/><path d="M9 9l6 6M15 9l-6 6" stroke="#ef4444" strokeWidth="2"/></svg>
          } title="Nicht gelöst" desc="Veröffentlichung mit rotem Badge" />
        </div>

        <div className="mt-6 grid sm:grid-cols-2 gap-3">
          <button className="rounded-2xl bg-gray-900 text-white px-4 py-3 text-sm font-medium shadow hover:shadow-md">Konflikt gratis starten</button>
          <button onClick={()=> setForce(true)} className="rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm">Forcieren (€{forceFee})</button>
        </div>
        <p className="text-xs text-gray-500 mt-3">Fair‑Use: sachlich bleiben, keine Beleidigungen, keine vollen Namen Dritter. Moderation schützt vor Missbrauch.</p>
      </div>
    </section>
  );
}

function Step({ icon, title, desc }:{ icon: React.ReactNode; title:string; desc:string }){
  return (
    <div className="col-span-7 lg:col-span-1 flex flex-col items-center text-center">
      <div className="h-12 w-12 rounded-2xl bg-gray-100 text-gray-900 grid place-items-center">{icon}</div>
      <div className="mt-2 text-sm font-medium">{title}</div>
      <div className="text-xs text-gray-500">{desc}</div>
    </div>
  );
}

function Arrow(){
  return (
    <div className="hidden lg:flex items-center justify-center">
      <svg viewBox="0 0 24 24" className="h-6 w-6 text-gray-400"><path d="M8 5l8 7-8 7" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
    </div>
  );
}

function FAQSection(){
  return (
    <section id="faq" className="">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">FAQ</h2>
        <p className="text-gray-600 mt-2 text-sm">Kurz & transparent. Mehr Details folgen nach dem MVP.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <FAQItem q="Sind Bewertungen anonym?" a="Ja. Öffentliche Anzeigen sind anonymisiert (z. B. Initialen bei Privat‑Eigentümern). Intern speichern wir nur minimal notwendige Daten (z. B. E‑Mail)." />
        <FAQItem q="Was passiert bei Rechtsstreit?" a="Wir moderieren proaktiv. Bei Streitfällen greift ein 14‑Tage‑Schlichtungsfenster, bevor eine Bewertung live geht. Optional: Forcieren‑Option für mehr Druck (Paywall)." />
        <FAQItem q="Kann ich meinen Mietvertrag hier prüfen lassen?" a="Ja – Upload, Zahlung und innerhalb von 24 Stunden erhältst du eine verständliche, KI‑unterstützte Einschätzung (49 €)." />
        <FAQItem q="Kommt die Plattform in mehrere Länder?" a="Ja. Start in AT, Ausrollung nach DE, IT, UK. Sprachen & Rechtstexte sind modular geplant." />
      </div>
    </section>
  );
}

function FAQItem({ q, a }:{ q:string; a:string }){
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <button onClick={()=> setOpen((v)=>!v)} className="w-full text-left flex items-center justify-between gap-3">
        <div className="text-sm font-medium">{q}</div>
        <div className="text-xl text-gray-400">{open? '–' : '+'}</div>
      </button>
      {open && <div className="mt-3 text-sm text-gray-600">{a}</div>}
    </div>
  );
}

function Footer(){
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 text-sm text-gray-600">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-2xl bg-gray-900 text-white grid place-items-center font-bold">M</div>
            <div>
              <div className="font-semibold">MietRadar <span className="text-gray-400 font-normal">(Arbeitsname)</span></div>
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

// ===== Tenant (Mieter) Page =====
function TenantPage({ onSwitch }:{ onSwitch:(to:string)=>void }){
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

// ===== Landlord (Vermieter) Page =====
function LandlordPage({ onSwitch }:{ onSwitch:(to:string)=>void }){
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Vermieter‑Services</h1>
          <p className="text-gray-600 mt-2">Screenings und Tools, die Zeit sparen und Ausfälle reduzieren.</p>
        </div>
        <button onClick={()=> onSwitch('/mieter')} className="rounded-2xl border border-blue-200 bg-blue-50 text-blue-900 px-4 py-2 text-sm">→ Zu Mieter‑Services</button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-blue-700 font-semibold mb-1">Aktiv</div>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-lg font-semibold">Screening‑Link</div>
              <div className="text-sm text-gray-500">Bewerber zur Bonitätsprüfung einladen. Ergebnis als Badge – keine Rohdaten.</div>
            </div>
            <div className="text-2xl font-semibold">€29</div>
          </div>
          <div className="mt-4 space-y-2">
            <label className="block text-sm font-medium">E‑Mail des Bewerbers</label>
            <input placeholder="name@mail.com" className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"/>
            <button className="w-full mt-2 rounded-2xl bg-blue-700 text-white px-4 py-3 text-sm font-medium shadow hover:shadow-md">Einladungs‑Link senden</button>
          </div>
          <p className="text-xs text-gray-500 mt-3">Hinweis: Der Bewerber willigt in die Auskunft ein und erhält volle Kontrolle über seine Daten.</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm opacity-70">
          <div className="text-xs inline-flex items-center gap-2 rounded-full bg-gray-100 px-2.5 py-1 text-gray-600 mb-2">Coming Soon</div>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-lg font-semibold">Mietnomaden‑Check</div>
              <div className="text-sm text-gray-500">Case‑basiert (Exekutionsregister). Ergebnis: Treffer/kein Treffer.</div>
            </div>
            <div className="text-2xl font-semibold">€69</div>
          </div>
          <div className="mt-4">
            <div className="rounded-xl border border-dashed border-gray-300 p-4 text-center text-sm text-gray-500">Bald verfügbar</div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm opacity-70">
          <div className="text-xs inline-flex items-center gap-2 rounded-full bg-gray-100 px-2.5 py-1 text-gray-600 mb-2">Coming Soon</div>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-lg font-semibold">Tenant‑Trust‑Badge</div>
              <div className="text-sm text-gray-500">Opt‑in Bonitätsnachweis des Bewerbers (KSV‑Flow), Badge mit Ablaufdatum.</div>
            </div>
            <div className="text-2xl font-semibold">—</div>
          </div>
          <div className="mt-4">
            <div className="rounded-xl border border-dashed border-gray-300 p-4 text-center text-sm text-gray-500">Bald verfügbar</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mt-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm opacity-70">
          <div className="text-xs inline-flex items-center gap-2 rounded-full bg-gray-100 px-2.5 py-1 text-gray-600 mb-2">Coming Soon</div>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-lg font-semibold">Vermieter‑Dashboard</div>
              <div className="text-sm text-gray-500">Bewerberverwaltung, Alerts, Analysen. Basic gratis, Pro als Abo.</div>
            </div>
            <div className="text-2xl font-semibold">—</div>
          </div>
          <div className="mt-4">
            <div className="rounded-xl border border-dashed border-gray-300 p-4 text-center text-sm text-gray-500">Bald verfügbar</div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-blue-700 font-semibold mb-1">Zusatzservice</div>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-lg font-semibold">Grundbuch‑Eigentümer‑Check</div>
              <div className="text-sm text-gray-500">Eigentümer verifizieren (Badge). Download nur im Konto. Preis: 12 € + Staatstaxe.</div>
            </div>
            <div className="text-2xl font-semibold">€12+</div>
          </div>
          <div className="mt-4">
            <button className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm">Bestellen</button>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="text-sm text-blue-700 font-semibold mb-1">Konflikt‑Premium</div>
          <div className="flex items-start justify-between">
            <div>
              <div className="text-lg font-semibold">Moderierte Schlichtung</div>
              <div className="text-sm text-gray-500">Priorisierte Benachrichtigungen, Moderation & Status‑Tools.</div>
            </div>
            <div className="text-2xl font-semibold">€49</div>
          </div>
          <div className="mt-4">
            <button className="w-full rounded-2xl bg-blue-700 text-white px-4 py-3 text-sm font-medium shadow hover:shadow-md">Buchen</button>
          </div>
        </div>
      </div>
    </main>
  );
}
