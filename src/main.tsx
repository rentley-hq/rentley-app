import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import MieterPage from "./pages/MieterPage";
import VermieterPage from "./pages/VermieterPage";
import SecureWrapper from "./SecureWrapper";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SecureWrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/mieter" replace />} />
          <Route path="/mieter" element={<MieterPage />} />
          <Route path="/vermieter" element={<VermieterPage />} />
        </Routes>
      </BrowserRouter>
    </SecureWrapper>
  </React.StrictMode>
);
