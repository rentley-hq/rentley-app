import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import MieterPage from "./pages/MieterPage";
import VermieterPage from "./pages/VermieterPage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/mieter" replace />} />
        <Route path="/mieter" element={<MieterPage />} />
        <Route path="/vermieter" element={<VermieterPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
