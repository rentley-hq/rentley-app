import React, { useState } from 'react';

const ACCESS_CODE = import.meta.env.VITE_ACCESS_CODE;

export default function SecureWrapper({ children }: { children: React.ReactNode }) {
  const [input, setInput] = useState('');
  const [accessGranted, setAccessGranted] = useState(false);

  if (accessGranted) return <>{children}</>;

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>🔐 Beta-Zugang</h2>
      <p>Bitte Zugangscode eingeben:</p>
      <input
        type="password"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Zugangscode"
        style={{ padding: '0.5rem', fontSize: '1rem' }}
      />
      <br />
      <button
        onClick={() => setAccessGranted(input === ACCESS_CODE)}
        style={{ marginTop: '1rem' }}
      >
        Weiter
      </button>
    </div>
  );
}
