import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SecureWrapper from "./SecureWrapper";
import MieterPage from "./pages/MieterPage";
import VermieterPage from "./pages/VermieterPage";

export default function App() {
  return (
    <SecureWrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/mieter" replace />} />
          <Route path="/mieter" element={<MieterPage />} />
          <Route path="/vermieter" element={<VermieterPage />} />
        </Routes>
      </BrowserRouter>
    </SecureWrapper>
  );
}
