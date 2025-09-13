import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TenantPage from "./pages/TenantPage";
import LandlordPage from "./pages/LandlordPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/mieter" replace />} />
        <Route path="/mieter" element={<TenantPage />} />
        <Route path="/vermieter" element={<LandlordPage />} />
      </Routes>
    </Router>
  );
}
