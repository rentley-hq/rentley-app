// App.tsx - KOMPLETTER CODE TEIL 1
import { useState, useEffect, useMemo, ReactNode } from 'react';

// Type Definitions
interface NavBarProps {
  isLandlord: boolean;
  onSwitch: (to: string) => void;
}

interface ScrollLinkProps {
  target: string;
  children: ReactNode;
  kind?: 'primary' | 'secondary';
}

interface StarProps {
  filled?: boolean;
}

interface SwitchProps {
  checked: boolean;
  onChange: (value: boolean) => void;
}

interface KPIProps {
  label: string;
  value: string;
  highlight?: boolean;
}

interface Country {
  code: string;
  label: string;
}

interface ReviewStars {
  comm: number;
  repair: number;
  fair: number;
  noise: number;
}

interface DiscountType {
  type: 'abs' | 'pct' | 'none';
  value: number;
}

// Main App Component
export default function App() {
  const getInitialRoute = (): string => {
    if (typeof window === 'undefined') return '/mieter';
    const hash = window.location.hash.replace('#', '');
    return hash || '/mieter';
  };

  const [route, setRoute] = useState<string>(getInitialRoute());
  
  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash.replace('#', '') || '/mieter');
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isLandlord = route === '/vermieter';
  
  const switchRoute = (to: string) => {
    window.location.hash = to;
    setRoute(to);
  };

  return (
    <div className={`min-h-screen ${isLandlord ? 'bg-white' : 'bg-gray-50'} text-gray-900 font-sans`}>
      <NavBar isLandlord={isLandlord} onSwitch={switchRoute} />
      {isLandlord ? <LandlordPage onSwitch={switchRoute} /> : <TenantPage onSwitch={switchRoute} />}
      <Footer />
    </div>
  );
}

// Navigation Bar Component
function NavBar({ isLandlord, onSwitch }: NavBarProps) {
  const [countryOpen, setCountryOpen] = useState<boolean>(false);
  const [country, setCountry] = useState<Country>({ code: "AT", label: "Österreich" });
  
  const countries: Country[] = [
    { code: "AT", label: "Österreich" },
    { code: "DE", label: "Deutschland" },
    { code: "IT", label: "Italia" },
    { code: "UK", label: "United Kingdom" },
  ];

  return (
    <header className={`sticky top-0 z-40 backdrop-blur-md ${isLandlord ? 'bg-white/95' : 'bg-white/90'} border-b border-gray-200`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`h-9 w-9 rounded-xl ${isLandlord ? 'bg-blue-600' : 'bg-gray-900'} text-white grid place-items-center font-bold text-sm`}>
            M
          </div>
          <div className="font-semibold text-lg">
            MietRadar <span className="text-gray-400 font-normal text-sm">(Arbeitsname)</span>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
          {!isLandlord && (
            <>
              <ScrollLink target="ratings">Bewertungen</ScrollLink>
              <ScrollLink target="contract">Mietvertrags-Check</ScrollLink>
            </>
          )}
          {isLandlord && (
            <button onClick={() => onSwitch('/vermieter')} className="hover:text-gray-900">
              Vermieter-Services
            </button>
          )}
          <ScrollLink target="faq">FAQ</ScrollLink>
        </nav>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <button 
              onClick={() => setCountryOpen(!countryOpen)} 
              className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
            >
              <span className="inline-flex h-4 w-6 items-center justify-center rounded bg-gray-900 text-white text-[10px] font-semibold">
                {country.code}
              </span>
              <span className="hidden sm:inline">{country.label}</span>
            </button>
            {countryOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl border border-gray-200 bg-white shadow-xl">
                {countries.map((c) => (
                  <button 
                    key={c.code} 
                    onClick={() => { setCountry(c); setCountryOpen(false); }} 
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl"
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button 
            onClick={() => onSwitch(isLandlord ? '/mieter' : '/vermieter')} 
            className={`rounded-xl border px-4 py-2 text-sm font-medium transition-colors ${
              isLandlord 
                ? 'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100' 
                : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            {isLandlord ? '→ Zu Mieter-Services' : '→ Zu Vermieter-Services'}
          </button>
          
          <button className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50">
            Anmelden
          </button>
        </div>
      </div>
    </header>
  );
}

// Scroll Link Component
function ScrollLink({ target, children, kind }: ScrollLinkProps) {
  const classes = kind === 'primary'
    ? 'rounded-2xl bg-gray-900 text-white px-5 py-3 text-sm font-medium shadow hover:shadow-lg transition-shadow'
    : kind === 'secondary' 
    ? 'rounded-2xl bg-white text-gray-900 px-5 py-3 text-sm font-medium border border-gray-300 hover:bg-gray-50'
    : 'hover:text-gray-900 transition-colors cursor-pointer';
    
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  
  return <button onClick={onClick} className={classes}>{children}</button>;
}

// Star Rating Component
function Star({ filled = false }: StarProps) {
  return (
    <svg viewBox="0 0 20 20" className={`h-4 w-4 ${filled ? "fill-yellow-400" : "fill-gray-200"}`}>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.968 0 1.371 1.24.588 1.81l-2.802 2.035a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.802-2.035a1 1 0 00-1.175 0l-2.802 2.035c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.88 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
    </svg>
  );
}

// Switch Component
function Switch({ checked, onChange }: SwitchProps) {
  return (
    <button 
      onClick={() => onChange(!checked)} 
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? 'bg-gray-900' : 'bg-gray-300'
      }`}
    >
      <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
        checked ? 'translate-x-5' : 'translate-x-1'
      }`} />
    </button>
  );
}

// Hero Section
function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
            Mietvertrag verstehen. 
            <span className="text-gray-500 block mt-2">Vermieter & Wohnungen transparent bewerten.</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Hilf anderen Mieter:innen mit ehrlichen Erfahrungen – und schütze dich selbst vor bösen Überraschungen.
            Optional prüfen wir deinen Mietvertrag innerhalb von 24 Stunden.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ScrollLink target="contract" kind="primary">Mietvertrags-Check (49 €)</ScrollLink>
            <ScrollLink target="ratings" kind="secondary">Vermieter bewerten</ScrollLink>
          </div>
          <div className="mt-8 flex items-center gap-3 text-xs text-gray-500">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
              <path d="M12 3l7 4v5c0 5-3.5 9-7 9s-7-4-7-9V7l7-4z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            DSGVO-freundlich • Anonyme Bewertungen • Moderiert
          </div>
        </div>
        
        <div className="relative">
          <div className="rounded-3xl border border-gray-200 bg-white shadow-xl p-6">
            <MockupCard />
          </div>
          <div className="absolute -bottom-8 -left-8 hidden lg:block rounded-3xl border border-gray-200 bg-white shadow-lg p-5 rotate-[-3deg]">
            <div className="text-sm text-gray-500">Ø Weiterempfehlung</div>
            <div className="text-4xl font-bold mt-2">72<span className="text-lg align-super">%</span></div>
            <div className="mt-2 text-xs text-gray-500">basierend auf 128 Bewertungen</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Mockup Card
function MockupCard() {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="font-semibold">Musterstraße 5, 1200 Wien</div>
          <div className="text-sm text-gray-500 mt-1">Vermieter: C. Schinko (verifiziert)</div>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => <Star key={i} filled={i < 4} />)}
          <span className="ml-2 text-sm font-semibold">4,2</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Kommunikation", score: 4 },
          { label: "Reparaturen", score: 3 },
          { label: "Fairness", score: 4 },
          { label: "Lärm", score: 2 },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-gray-200 p-3 bg-gray-50">
            <div className="text-xs text-gray-500 mb-1">{item.label}</div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} filled={i < item.score} />)}
            </div>
          </div>
        ))}
      </div>
      
      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
        <div className="text-sm text-gray-700 line-clamp-3">
          „Heizung im Winter 10 Tage defekt, danach schnelle Lösung. Haus hellhörig (Hundebellen). 
          Vermieter reagiert inzwischen zügig."
        </div>
        <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
          <span>Anonym</span>
          <span>•</span>
          <span>12.08.2025</span>
          <span>•</span>
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-red-500"></span>
            Konfliktfall (fristgesetzt)
          </span>
        </div>
      </div>
    </div>
  );
}

// Ratings Section
function RatingsSection() {
  const [query, setQuery] = useState<string>("");
  const [showReview, setShowReview] = useState<boolean>(false);
  
  return (
    <section id="ratings" className="py-16">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Bewertungen entdecken</h2>
          <p className="text-gray-600 mt-2">
            Suche nach Adresse, Vermieter, <strong>Hausverwaltung</strong> oder <strong>Makler</strong>. 
            Teile deine Erfahrung anonym und hilf anderen.
          </p>
        </div>
        <button 
          onClick={() => setShowReview(true)} 
          className="rounded-2xl bg-gray-900 text-white px-5 py-2.5 text-sm font-medium shadow hover:shadow-lg"
        >
          Bewertung abgeben
        </button>
      </div>
      
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex gap-3">
          <input 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            placeholder="z.B. Musterstraße 5 / Max Beispiel GmbH / Hausverw. XY / Makler Z" 
            className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-900"
          />
          <button className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-medium hover:bg-gray-50">
            Suchen
          </button>
        </div>
        
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {[
            { address: "Musterstraße 3, 1200 Wien", landlord: "Hausverw. Beispiel", rating: 4 },
            { address: "Musterstraße 4, 1200 Wien", landlord: "Hausverw. Beispiel", rating: 3 },
            { address: "Musterstraße 5, 1200 Wien", landlord: "Hausverw. Beispiel", rating: 2 },
            { address: "Musterstraße 6, 1200 Wien", landlord: "Hausverw. Beispiel", rating: 2 },
          ].map((item, i) => (
            <div key={i} className="rounded-2xl border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-medium">{item.address}</div>
                  <div className="text-sm text-gray-500 mt-1">Vermieter: {item.landlord}</div>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, j) => <Star key={j} filled={j < item.rating} />)}
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                „Haus sauber, Reparaturen flott. Hellhörig am Wochenende. Insgesamt ok."
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {showReview && <ReviewModal onClose={() => setShowReview(false)} />}
    </section>
  );
}
// App.tsx - FORTSETZUNG TEIL 2

// Review Modal
function ReviewModal({ onClose }: { onClose: () => void }) {
  const [type, setType] = useState<string>('objekt');
  const [stars, setStars] = useState<ReviewStars>({ comm: 0, repair: 0, fair: 0, noise: 0 });
  const [text, setText] = useState<string>("");
  const [conflict, setConflict] = useState<boolean>(false);
  
  const ratingItem = (label: string, key: keyof ReviewStars) => (
    <div className="flex items-center justify-between py-2">
      <div className="text-sm text-gray-700">{label}</div>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <button 
            key={i} 
            onClick={() => setStars({...stars, [key]: i})} 
            className="p-0.5"
          >
            <Star filled={i <= stars[key]} />
          </button>
        ))}
      </div>
    </div>
  );
  
  return (
    <div className="fixed inset-0 z-50 bg-black/40 p-4 sm:p-8 overflow-y-auto">
      <div className="mx-auto max-w-2xl rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold">Bewertung abgeben</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
        </div>
        
        <div className="p-6 space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 font-medium">Was bewertest du?</label>
              <div className="mt-2 flex flex-wrap gap-2">
                {['objekt', 'vermieter', 'hausverwaltung', 'makler'].map((t) => (
                  <button 
                    key={t} 
                    onClick={() => setType(t)}
                    className={`px-3 py-2 rounded-xl border text-sm capitalize transition-colors ${
                      type === t 
                        ? 'border-gray-900 bg-gray-900 text-white' 
                        : 'border-gray-300 bg-white hover:bg-gray-50'
                    }`}
                  >
                    {t === 'objekt' ? 'Objekt/Adresse' : t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 font-medium">Adresse oder Name</label>
              <input 
                placeholder={type === 'objekt' ? 'z.B. Musterstraße 5, 1200 Wien' : 'z.B. Max Beispiel GmbH'} 
                className="mt-2 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
          </div>
          
          <div className="rounded-2xl border border-gray-200 p-4">
            <div className="text-sm font-medium mb-2">Sternebewertung</div>
            {ratingItem('Kommunikation', 'comm')}
            {ratingItem('Reparaturen', 'repair')}
            {ratingItem('Fairness', 'fair')}
            {ratingItem('Lärm', 'noise')}
          </div>
          
          <div>
            <label className="text-sm font-medium">Erfahrungsbericht</label>
            <textarea 
              value={text} 
              onChange={(e) => setText(e.target.value)} 
              rows={5} 
              placeholder="Bitte sachlich bleiben. Keine Beleidigungen, keine vollen Namen Dritter. Mind. 100 Zeichen empfohlen." 
              className="mt-2 w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
            />
            <div className="mt-2 text-xs text-gray-500">
              Durch das Absenden stimmst du unseren Richtlinien zu. Wir moderieren neue Beiträge.
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <input 
              id="conflict" 
              type="checkbox" 
              checked={conflict} 
              onChange={(e) => setConflict(e.target.checked)} 
              className="h-4 w-4 rounded"
            />
            <label htmlFor="conflict" className="text-sm">
              Konfliktfall aktiv (14-Tage-Schlichtungsfenster vor Veröffentlichung)
            </label>
          </div>
          
          <div className="flex justify-end gap-3">
            <button onClick={onClose} className="rounded-xl border border-gray-300 px-5 py-2.5 text-sm font-medium hover:bg-gray-50">
              Abbrechen
            </button>
            <button className="rounded-xl bg-gray-900 text-white px-5 py-2.5 text-sm font-medium hover:bg-gray-800">
              Senden
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Contract Check Section  
function ContractCheckSection() {
  const [express, setExpress] = useState<boolean>(false);
  const [extraQ, setExtraQ] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [discount, setDiscount] = useState<DiscountType>({ type: 'none', value: 0 });
  const [applying, setApplying] = useState<boolean>(false);
  const [msg, setMsg] = useState<string | undefined>(undefined);
  
  const base = 49;
  const expressFee = 20;
  const extraFee = 24;
  const subtotal = useMemo(() => base + (express ? expressFee : 0) + (extraQ ? extraFee : 0), [express, extraQ]);
  const discountValue = useMemo(() => {
    if (discount.type === 'abs') return Math.min(discount.value, subtotal);
    if (discount.type === 'pct') return Math.round(subtotal * discount.value * 100) / 100;
    return 0;
  }, [discount, subtotal]);
  const total = Math.max(0, Math.round((subtotal - discountValue) * 100) / 100);
  
  function applyVoucher(c: string) {
    const codeNorm = c.trim().toUpperCase();
    setApplying(true);
    setMsg(undefined);
    
    setTimeout(() => {
      let res: DiscountType = { type: 'none', value: 0 };
      if (codeNorm === 'START10') res = { type: 'abs', value: 10 };
      else if (codeNorm === 'BETA50') res = { type: 'pct', value: 0.5 };
      else if (codeNorm === 'FREECHECK') res = { type: 'pct', value: 1 };
      
      if (res.type === 'none') {
        setDiscount(res);
        setMsg('Code ungültig');
      } else {
        setDiscount(res);
        setMsg('Code angewendet');
      }
      setApplying(false);
    }, 700);
  }
  
  return (
    <section id="contract" className="py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold tracking-tight">Mietvertrags-Check (24h)</h2>
        <p className="text-gray-600 mt-2">
          Schnelle, verständliche Einschätzung deines Mietvertrags (KI-unterstützt, mit menschlicher Prüfung). 
          Kein Ersatz für Rechtsberatung.
        </p>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold">Standard</h3>
              <p className="text-sm text-gray-500 mt-1">Rückmeldung in 24 Stunden</p>
            </div>
            <div className="text-3xl font-bold">€{base}</div>
          </div>
          
          <ul className="space-y-2 text-sm text-gray-700 mb-6">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Zusammenfassung der wichtigsten Klauseln</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Hinweise auf Stolperfallen & unübliche Regelungen</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Checkliste für Rückfragen an Vermieter/Hausverwaltung</span>
            </li>
          </ul>
          
          <div className="h-px bg-gray-200 my-6" />
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Vertrag hochladen (PDF/JPG)</label>
              <div className="rounded-xl border-2 border-dashed border-gray-300 p-8 text-center text-sm text-gray-500 hover:border-gray-400 cursor-pointer">
                Drag & Drop oder Klicken zum Auswählen
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">E-Mail für Ergebnis</label>
              <input 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="name@mail.com" 
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm"
              />
            </div>
            
            <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
              <div>
                <div className="text-sm font-medium">Express (12h)</div>
                <div className="text-xs text-gray-500">Aufpreis +€{expressFee}</div>
              </div>
              <Switch checked={express} onChange={setExpress} />
            </div>
            
            <div className="rounded-xl border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Zusatzfrage / spezielles Thema</div>
                  <div className="text-xs text-gray-500">Wir gehen vertieft auf einen Punkt ein. Aufpreis +€{extraFee}</div>
                </div>
                <Switch checked={extraQ} onChange={setExtraQ} />
              </div>
              {extraQ && (
                <textarea 
                  value={question} 
                  onChange={(e) => setQuestion(e.target.value)} 
                  rows={3} 
                  placeholder="Deine Zusatzfrage (z.B. Indexierung, Betriebskosten, Staffelmiethöhe, Haustierregelungen)" 
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm mt-3"
                />
              )}
            </div>
            
            <div className="rounded-xl border border-gray-200 p-4">
              <label className="block text-sm font-medium mb-2">Gutschein-Code</label>
              <div className="flex gap-2">
                <input 
                  value={code} 
                  onChange={(e) => setCode(e.target.value)} 
                  placeholder="z.B. START10, BETA50" 
                  className="flex-1 rounded-xl border border-gray-300 px-3 py-2 text-sm"
                />
                <button 
                  disabled={applying} 
                  onClick={() => applyVoucher(code)} 
                  className="rounded-xl bg-gray-900 text-white px-4 py-2 text-sm disabled:opacity-60"
                >
                  {applying ? 'Prüfe…' : 'Anwenden'}
                </button>
              </div>
              {msg && (
                <div className={`mt-2 text-xs ${discount.type === 'none' ? 'text-red-600' : 'text-green-700'}`}>
                  {msg}
                </div>
              )}
            </div>
            
            <div className="space-y-2 pt-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">Zwischensumme</div>
                <div className="font-medium">€{subtotal.toFixed(2)}</div>
              </div>
              {discountValue > 0 && (
                <div className="flex items-center justify-between">
                  <div className="text-sm text-green-700">Rabatt</div>
                  <div className="font-medium text-green-700">–€{discountValue.toFixed(2)}</div>
                </div>
              )}
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="text-sm font-medium">Gesamt</div>
                <div className="text-2xl font-bold">€{total.toFixed(2)}</div>
              </div>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-3 pt-4">
              <button className="rounded-2xl bg-gray-900 text-white px-4 py-3 text-sm font-medium shadow hover:shadow-lg">
                Jetzt prüfen lassen
              </button>
              <button className="rounded-2xl border border-gray-300 bg-white px-4 py-3 text-sm font-medium hover:bg-gray-50">
                PayPal
              </button>
            </div>
            
            <p className="text-xs text-gray-500 mt-4">
              Hinweis: Dies ist eine <strong>informative Einschätzung</strong> und <strong>keine Rechtsberatung</strong>. 
              Für verbindliche Auskünfte empfehlen wir Mietervereinigung/Anwalt. 
              Dateien werden vertraulich behandelt & automatisiert gelöscht.
            </p>
          </div>
        </div>
        
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="text-sm text-gray-500 mb-4">Beispiel-Ergebnis (Auszug)</div>
          
          <div className="space-y-3">
            <KPI label="Kaution" value="3 Bruttomonatsmieten (üblich)" />
            <KPI label="Indexierung" value="VPI 2020, jährliche Anpassung – nachvollziehbar" />
            <KPI label="Betriebskosten" value="Pauschale, fehlende Aufschlüsselung → Rückfrage empfohlen" highlight />
            <KPI label="Tierhaltung" value="Generelles Verbot – rechtlich zweifelhaft, Formulierung prüfen" highlight />
            <KPI label="Schönheitsreparaturen" value="Übertragung an Mieter – in AT nur eingeschränkt zulässig" highlight />
          </div>
          
          <div className="mt-8 rounded-2xl bg-yellow-50 border border-yellow-200 p-5">
            <h4 className="font-semibold text-gray-900 mb-3">Checkliste für Rückfragen</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Detaillierte BK-Liste mit Vorjahresabrechnung anfordern</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Frist zur Mängelbehebung (Heizung, Feuchtigkeit) schriftlich festhalten</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Haustiere: Formulierung in Nebenabrede konkretisieren</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Übergabeprotokoll & Fotos Bestandteil des Vertrags</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// KPI Component
function KPI({ label, value, highlight = false }: KPIProps) {
  return (
    <div className={`rounded-xl border p-4 ${
      highlight ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200 bg-white'
    }`}>
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  );
}

// Conflict Management Section
function ConflictManagementSection() {
  interface Step {
    icon: string;
    title: string;
    desc: string;
  }
  
  const steps: Step[] = [
    { icon: "📝", title: "Problem melden", desc: "Sachlich + Forderung + Frist" },
    { icon: "📋", title: "Formalisierung", desc: "Standard-Schreiben an Vermieter/HV" },
    { icon: "⏰", title: "14-Tage-Fenster", desc: "Antwort & Lösung dokumentieren" },
    { icon: "✅", title: "Gelöst", desc: "Grünes Badge & Update" },
    { icon: "❌", title: "Nicht gelöst", desc: "Veröffentlichung mit rotem Badge" },
  ];
  
  return (
    <section id="conflict" className="py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold tracking-tight">Konflikt-Management</h2>
        <p className="text-gray-600 mt-2">
          Starte kostenlos einen Konfliktfall mit Fristsetzung. Optional: <strong>Forcieren</strong> für mehr Durchschlagskraft.
        </p>
      </div>
      
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="grid lg:grid-cols-5 gap-6 mb-8">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center relative">
              <div className="text-3xl mb-3">{step.icon}</div>
              <div className="text-sm font-semibold mb-1">{step.title}</div>
              <div className="text-xs text-gray-500">{step.desc}</div>
            </div>
          ))}
        </div>
        
        <div className="grid sm:grid-cols-2 gap-4">
          <button className="rounded-2xl bg-gray-900 text-white px-6 py-3 text-sm font-medium shadow hover:shadow-lg">
            Konflikt gratis starten
          </button>
          <button className="rounded-2xl border border-gray-300 bg-white px-6 py-3 text-sm font-medium hover:bg-gray-50">
            Forcieren (€29)
          </button>
        </div>
        
        <p className="text-xs text-gray-500 mt-4">
          Fair-Use: sachlich bleiben, keine Beleidigungen, keine vollen Namen Dritter. Moderation schützt vor Missbrauch.
        </p>
      </div>
    </section>
  );
}

// FAQ Section
function FAQSection() {
  const [openItems, setOpenItems] = useState<{ [key: number]: boolean }>({});
  
  const toggleItem = (key: number) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };
  
  const faqs = [
    {
      q: "Sind Bewertungen anonym?",
      a: "Ja. Öffentliche Anzeigen sind anonymisiert (z.B. Initialen bei Privat-Eigentümern). Intern speichern wir nur minimal notwendige Daten (z.B. E-Mail)."
    },
    {
      q: "Was passiert bei Rechtsstreit?",
      a: "Wir moderieren proaktiv. Bei Streitfällen greift ein 14-Tage-Schlichtungsfenster, bevor eine Bewertung live geht. Optional: Forcieren-Option für mehr Druck (Paywall)."
    },
    {
      q: "Kann ich meinen Mietvertrag hier prüfen lassen?",
      a: "Ja – Upload, Zahlung und innerhalb von 24 Stunden erhältst du eine verständliche, KI-unterstützte Einschätzung (49 €)."
    },
    {
      q: "Kommt die Plattform in mehrere Länder?",
      a: "Ja. Start in AT, Ausrollung nach DE, IT, UK. Sprachen & Rechtstexte sind modular geplant."
    }
  ];
  
  return (
    <section id="faq" className="py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold tracking-tight">FAQ</h2>
        <p className="text-gray-600 mt-2">Kurz & transparent. Mehr Details folgen nach dem MVP.</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        {faqs.map((faq, i) => (
          <div key={i} className="rounded-2xl border border-gray-200 bg-white p-5">
            <button 
              onClick={() => toggleItem(i)} 
              className="w-full text-left flex items-center justify-between gap-3"
            >
              <div className="font-medium">{faq.q}</div>
              <div className="text-xl text-gray-400">{openItems[i] ? '−' : '+'}</div>
            </button>
            {openItems[i] && (
              <div className="mt-3 text-sm text-gray-600">{faq.a}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="mt-24 border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gray-900 text-white grid place-items-center font-bold text-sm">
              M
            </div>
            <div>
              <div className="font-semibold">
                MietRadar <span className="text-gray-400 font-normal text-sm">(Arbeitsname)</span>
              </div>
              <div className="text-xs text-gray-500 mt-1">Datensparsam • DSGVO-freundlich • EU-Hosting</div>
            </div>
          </div>
          <div className="flex gap-6 text-sm text-gray-600">
            <a href="#" className="hover:text-gray-900">Impressum</a>
            <a href="#" className="hover:text-gray-900">Datenschutz</a>
            <a href="#" className="hover:text-gray-900">Richtlinien</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Tenant Page
function TenantPage({ onSwitch }: { onSwitch: (to: string) => void }) {
  return (
    <>
      <Hero />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RatingsSection />
        <ContractCheckSection />
        <ConflictManagementSection />
        <FAQSection />
      </main>
    </>
  );
}

// Landlord Page
function LandlordPage({ onSwitch }: { onSwitch: (to: string) => void }) {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Vermieter-Services</h1>
          <p className="text-gray-600 mt-2">Screenings und Tools, die Zeit sparen und Ausfälle reduzieren.</p>
        </div>
        <button 
          onClick={() => onSwitch('/mieter')} 
          className="rounded-2xl border border-blue-200 bg-blue-50 text-blue-700 px-5 py-2.5 text-sm font-medium hover:bg-blue-100"
        >
          → Zu Mieter-Services
        </button>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="text-xs font-semibold text-blue-600 mb-2">Aktiv</div>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Screening-Link</h3>
              <p className="text-sm text-gray-500 mt-1">
                Bewerber zur Bonitätsprüfung einladen. Ergebnis als Badge – keine Rohdaten.
              </p>
            </div>
            <div className="text-2xl font-bold">€29</div>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-2">E-Mail des Bewerbers</label>
              <input 
                placeholder="name@mail.com" 
                className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
            <button className="w-full rounded-2xl bg-blue-600 text-white px-4 py-3 text-sm font-medium shadow hover:bg-blue-700">
              Einladungs-Link senden
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Hinweis: Der Bewerber willigt in die Auskunft ein und erhält volle Kontrolle über seine Daten.
          </p>
        </div>
        
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm opacity-60">
          <div className="text-xs font-medium text-gray-500 mb-2 inline-block px-2 py-1 bg-gray-100 rounded-full">
            Coming Soon
          </div>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Mietnomaden-Check</h3>
              <p className="text-sm text-gray-500 mt-1">
                Case-basiert (Exekutionsregister). Ergebnis: Treffer/kein Treffer.
              </p>
            </div>
            <div className="text-2xl font-bold">€69</div>
          </div>
          <div className="rounded-xl border-2 border-dashed border-gray-300 p-8 text-center text-sm text-gray-500">
            Bald verfügbar
          </div>
        </div>
        
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm opacity-60">
          <div className="text-xs font-medium text-gray-500 mb-2 inline-block px-2 py-1 bg-gray-100 rounded-full">
            Coming Soon
          </div>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Tenant-Trust-Badge</h3>
              <p className="text-sm text-gray-500 mt-1">
                Opt-in Bonitätsnachweis des Bewerbers (KSV-Flow), Badge mit Ablaufdatum.
              </p>
            </div>
            <div className="text-2xl font-bold">—</div>
          </div>
          <div className="rounded-xl border-2 border-dashed border-gray-300 p-8 text-center text-sm text-gray-500">
            Bald verfügbar
          </div>
        </div>
      </div>
    </main>
  );
}