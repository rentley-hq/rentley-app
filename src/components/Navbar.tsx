import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="text-xl font-bold text-brand">MietRadar</div>
        <div className="flex space-x-6 text-muted">
          <Link to="/mieter" className="hover:text-accent">Mieter-Services</Link>
          <Link to="/vermieter" className="hover:text-accent">Vermieter-Services</Link>
          <Link to="/faq" className="hover:text-accent">FAQ</Link>
        </div>
        <button className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-blue-700">
          Anmelden
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
