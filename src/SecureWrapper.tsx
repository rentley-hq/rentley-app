import React, { useState, useEffect } from "react";

const ACCESS_CODE = import.meta.env.VITE_ACCESS_CODE;

export default function SecureWrapper({ children }: { children: React.ReactNode }) {
  const [accessGranted, setAccessGranted] = useState(false);
  const [input, setInput] = useState("");

  // beim Laden prüfen, ob schon freigegeben
  useEffect(() => {
    const stored = localStorage.getItem("rentley_access");
    if (stored === "true") {
      setAccessGranted(true);
    }
  }, []);

  const handleLogin = () => {
    if (input === ACCESS_CODE) {
      setAccessGranted(true);
      localStorage.setItem("rentley_access", "true");
    }
  };

  if (accessGranted) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white shadow-md rounded-xl p-8 w-80 text-center">
        <h2 className="text-xl font-bold mb-4">🔐 Beta-Zugang</h2>
        <input
          type="password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Zugangscode"
          className="w-full border rounded-md px-3 py-2 mb-4"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
        >
          Weiter
        </button>
      </div>
    </div>
  );
}
