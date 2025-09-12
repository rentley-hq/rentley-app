import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm text-muted flex justify-between">
        <span>MietRadar (Arbeitsname) • DSGVO-freundlich • EU-Hosting</span>
        <div className="flex space-x-6">
          <a href="#">Impressum</a>
          <a href="#">Datenschutz</a>
          <a href="#">Richtlinien</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
